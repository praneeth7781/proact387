var express = require("express");
var app = express();
var cors = require("cors");
var bodyparser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");


// Emails
require("dotenv").config();
const nodemailer = require('nodemailer');
const {google} = require('googleapis');
const OAuth2 = google.auth.OAuth2;


const createTransporter = async () => {
	console.log("Entered Create Transporter Function");
	const oauth2client = new OAuth2(
		process.env.CLIENT_ID,
		process.env.CLIENT_SECRET,
		"https://developers.google.com/oauthplayground"
	);
	console.log("Done 1");
	oauth2client.setCredentials({
		refresh_token: process.env.REFRESH_TOKEN2
	});
	console.log("Done 2");

	const accessToken = await new Promise((resolve, reject)=>{
		oauth2client.getAccessToken((err, token)=>{
			if(err){
				reject("Failed");
			}
			resolve(token);
		});
	});

	// accessToken.then((message)=>{
	// 	console.log("Access Token");
	// }).catch((error)=>{
	// 	console.log(error);
	// })
	console.log("Done 3");
	
	const transporter = nodemailer.createTransport({
		// service: "gmail",
		service: "gmail",
		host: "smtp.gmail.com",
		// port: 587,
		// secure: false,
		auth: {
			// user: "manipraneeth2307@gmail.com",
			// pass: "mfkjlnwqysznmefm"
			type: "OAuth2",
			user: process.env.EMAIL,
			accessToken,
			clientId: process.env.CLIENT_ID,
			clientSecret: process.env.CLIENT_SECRET,
			refreshToken: process.env.REFRESH_TOKEN2
		}
	});
	console.log("Done 4");

	return transporter;
};

const sendEmail = async (emailOptions) => {
	console.log("Entered server-side Send Email");
	let emailTransporter = await createTransporter();
	console.log(emailTransporter);
	// console.log("env_variables", process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.EMAIL)
	const result = await emailTransporter.sendMail(emailOptions);
	console.log(JSON.stringify(result,null,4));
}













app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(
	cors({
		origin: ["http://localhost:3000"],
		methods: ["GET", "POST"],
		credentials: true,
	})
)
app.use(cookieParser());
app.use(
	session({
		key: "id",
		secret: "good",
		resave: false,
		saveUninitialized: false,
		cookie: {
			expires: 60 * 60 * 24 * 1000,
		},
	})
);

var pool = require("./connect.js");



app.get("/", (req, res) => {
	pool.query("SELECT * FROM student", (err, result) => {
		if (err) {
			res.send(err);
		} else {
			res.send(result);
		}
	});
});

app.get("/login", (req, res) => {
	if (req.session.user) {
		res.send({
			loggedIn: true,
			user: req.session.user,
		});
	} else {
		res.send({
			loggedIn: false,
		});
	}
});


app.get("/logout", (req, res) => {
	res.clearCookie("id", { path: "/" });
	req.session.destroy(() => {
		res.send("Logged Out!");
	});
	// res.clearCookie("id", {path: '/'});
	// res.redirect('/login');
});


app.post("/studentlogin", async (req, res) => {
	console.log("Entered server side student login");
	const user_id = req.body.user_id;
	const password = req.body.password;
	console.log(user_id, password);
	var resul = await pool.query(
		"SELECT * FROM auth WHERE user_id=$1 and password=$2 and type=$3",
		[user_id, password, 0]
	).then((result) => {
		// console.log(err);
		return result;
	});
	console.log("aha");
	// console.log(req.session.user);
	if (resul.rowCount > 0) {
		req.session.user = resul;
		var check = await pool.query("SELECT * FROM student WHERE roll_num=$1", [resul.rows[0].user_id]).then((check) => { return check; })
		console.log(check);
		if (check.rowCount > 0) {
			res.send({ pres: true, resul: resul });
		} else {
			res.send({ pres: false, resul: resul });
		}
	} else {
		res.send({ message: "Incorrect Credentials!" });
	}
});

app.post("/instlogin", async (req, res) => {
	console.log("Entered server side instructor login");
	const user_id = req.body.user_id;
	const password = req.body.password;
	console.log(user_id, password);
	var resul = await pool.query(
		"SELECT * FROM auth WHERE user_id=$1 and password=$2 and type=$3",
		[user_id, password, 1]
	).then((result) => {
		return result;
	});
	if (resul.rowCount > 0) {
		req.session.user = resul;
		res.send({ success: "Logged In" });
	} else {
		res.send({ message: "Incorrect Credentials!" });
	}
})

app.post("/register", (req, res) => {
	console.log("Entered register");
	const rollnumber = req.body.rollnumber;
	const password = req.body.password;
	const name = req.body.name;
	console.log(rollnumber, password, name);
	pool.query(
		"INSERT INTO auth VALUES ($1,$2,0);", [rollnumber, password],
		(err, result) => {
			console.log(err);
			console.log(result);
			res.send(result);
			console.log("sent");
		})
});

app.post("/infogather", async (req, res) => {
	console.log("Entered Info Gather");
	const name = req.body.name;
	const hostel = req.body.hostel;
	const room = req.body.room;
	const dept_name = req.body.dept_name;
	const friend1 = req.body.friend1;
	const friend2 = req.body.friend2;
	const friend3 = req.body.friend3;
	const friend4 = req.body.friend4;
	const friend5 = req.body.friend5;
	if (req.session.user) {
		var result = await pool.query(
			"SELECT * FROM student WHERE roll_num = $1 AND EXISTS(" +
			"SELECT * FROM student WHERE roll_num = $2 AND EXISTS(" +
			"SELECT * FROM student WHERE roll_num = $3 AND EXISTS(" +
			"SELECT * FROM student WHERE roll_num = $4 AND EXISTS(" +
			"SELECT * FROM student WHERE roll_num = $5))));",
			[friend1, friend2, friend3, friend4, friend5]
		).then((result) => {
			return result;
		});

		console.log("Session Details: ");
		console.log(req.session.user);
		if (req.session.user.rows[0].user_id) {
			var roll_num = req.session.user.rows[0].user_id;
			console.log("Roll Number is ", req.session.user.rows[0].user_id);
			if (result.rowCount > 0) {
				var result2 = await pool.query(
					"INSERT INTO student VALUES ($1, $2, $5, 30, $3, $4);",
					[roll_num, name, hostel, room, dept_name]
				).then((result) => {
					return result;
				});
				result2 = await pool.query(
					"INSERT INTO friends VALUES ($1, $2);",
					[roll_num, friend1]
				).then((result) => {
					return result;
				});
				result2 = await pool.query(
					"INSERT INTO friends VALUES ($1, $2);",
					[roll_num, friend2]
				).then((result) => {
					return result;
				});
				result2 = await pool.query(
					"INSERT INTO friends VALUES ($1, $2);",
					[roll_num, friend3]
				).then((result) => {
					return result;
				});
				result2 = await pool.query(
					"INSERT INTO friends VALUES ($1, $2);",
					[roll_num, friend4]
				).then((result) => {
					return result;
				});
				result2 = await pool.query(
					"INSERT INTO friends VALUES ($1, $2);",
					[roll_num, friend5]
				).then((result) => {
					return result;
				});
				res.send({ good: "Well Done Good!" });
			} else {
				res.send({ error: "I am afraid few of your friends haven't yet come onboard our platform!" });
			}
		} else {
			console.log("Not found");
		}
		// console.log("Result: ")
		// console.log(result);
	} else {
		console.log("Session error, session ", req.session.user);
		res.send({ message: "Session Error" });
	}
});

app.post("/parentdetails", async (req, res) => {
	console.log("Entered server-side parent details");
	const parentname = req.body.parentname;
	const parentmail = req.body.parentmail;
	const facadname = req.body.facadname;
	const facadmail = req.body.facadmail;

	if (req.session.user) {
		var result = await pool.query(
			"INSERT INTO receiver VALUES ($1, $2, 0, $3)",
			[req.session.user.rows[0].user_id, parentname, parentmail]
		).then((result) => {
			return result;
		});
		result = await pool.query(
			"INSERT INTO receiver VALUES ($1, $2, 1, $3);",
			[req.session.user.rows[0].user_id, facadname, facadmail]
		).then((result) => {
			return result;
		})
		res.send({ success: "Success" });
	} else {
		res.send({ message: "Session Error" });
	}
})

app.get("/instructorinfo", async (req, res) => {
	console.log("Entered server-side Instructor Info Fetching");
	if (req.session.user) {
		var result = await pool.query(
			"SELECT * FROM instructor WHERE id=$1;",
			[req.session.user.rows[0].user_id]
		).then((result) => {
			return result;
		});
		if (result.rowCount > 0) {
			var instname = result.rows[0].name;
			var instid = result.rows[0].id;
			var instdept = result.rows[0].dept_name;
			result = await pool.query(
				"SELECT * FROM teaches natural join course where inst_id=$1",
				[instid]
			).then((result) => {
				return result;
			});
			if (result.rowCount > 0) {
				const d = new Date();
				let day = d.getDay();
				console.log("Today: ", day);
				var instinfo = result;
				result = await pool.query(
					"SELECT * FROM (teaches natural join course) natural join time_slot where inst_id=$1 and day=$2 order by start_hr, start_min",
					[instid, day]
				).then((result) => {
					return result;
				});
				console.log("This result: ", result);
				if (result.rowCount > 0) {
					result.rows.forEach(myfunction);
					function myfunction(value, index, array) {
						if (value.start_hr < 12 && value.end_hr < 12) {
							value['start'] = 'AM';
							value['end'] = 'AM';
						} else if (value.start_hr < 12 && value.end_hr >= 12) {
							value['start'] = 'AM';
							value['end'] = 'PM';
						} else if (value.start_hr >= 12) {
							value['start'] = 'PM';
							value['end'] = 'PM';
						}
						if (value.start_min == 0) {
							console.log("Yep");
							value['start_min'] = '00';
						}
						if (value.end_min == 0) {
							value['end_min'] = "00";
						}
					}
					console.log(result);
					res.send({
						instname: instname,
						instid: instid,
						instdept: instdept,
						instinfo: instinfo,
						today: result
					})
				} else {
					res.send({
						instname: instname,
						instid: instid,
						instdept: instdept,
						instinfo: instinfo,
						noclassestoday: true
					});
				}
			} else {
				res.send({
					nocourses: "No courses present!",
					instname: instname,
					instid: instid,
					instdept: instdept
				});
			}
		} else {
			res.send({ insterror: "Instructor Not Found!" });
		}
	} else {
		res.send({ message: "Session Error" });
	}
});

app.post("/courseinfo", async (req, res) => {
	console.log("Entered server-side course info fetching");
	var course_id = req.body.course_id;
	if (req.session.user) {
		var result = await pool.query(
			"SELECT * FROM (course natural join time_slot) natural join teaches where course_id=$1",
			[course_id]
		).then((result) => {
			return result;
		});
		if (result.rowCount > 0) {
			var course_name = result.rows[0].title;

		}
	} else {
		res.send({ message: "Session Error" });
	}
})

app.post("/editinstinfo", async (req, res) => {
	console.log("Entered server-side Instructor Info Editing");
	var editname = req.body.editname;
	var editdept = req.body.editdept;

	if (req.session.user) {
		var instid = req.session.user.rows[0].user_id;
		var result = await pool.query(
			"UPDATE instructor SET name = $1, dept_name = $2 where id=$3",
			[editname, editdept, instid]
		).then((result) => {
			res.send(result);
			return result;
		});
	} else {
		res.send({ message: "Session Error" });
	}

});
app.post("/updateeng", async (req, res) => {
	console.log("Entered server-side Instructor Info Editing");
	var val = parseFloat(req.body.val);
	var roll_num_fr = req.body.roll_num;
	console.log(val, roll_num_fr)
	if (req.session.user) {
		var st_id = req.session.user.rows[0].user_id;
		var result = await pool.query(
			"UPDATE student SET eng_level=$1 where roll_num=$2;",
			[val,roll_num_fr]
		).then((result) => {
			res.send(result);
			if(val<30){
				result = pool.query(
					"SELECT * FROM receiver WHERE stud_id=$1",
					[roll_num_fr]
				).then((result)=>{
					// console.log(result.rows.mailid);
					console.log("Helloo broo");
					console.log(result);
					sendEmail({
						subject: "Test",
						text: "Engagement Level dropped below 30",
						to: result.rows[0].mailid,
						from: process.env.EMAIL
					});
					sendEmail({
						subject: "Test",
						text: "Engagement Level dropped below 30",
						to: result.rows[1].mailid,
						from: process.env.EMAIL
					});
				});
			}
			return result;
		});
	} else {
		res.send({ message: "Session Error" });
	}

});


app.get("/dashdisplay", async (req, res) => {
	console.log("Dash display lo ki vacchindhi");
	var A = new Date();
	var B = A.getDay()
	// console.log(B);
	if (req.session.user) {
		console.log("User session details dashdisplay");
		var result = await pool
			.query(
				"SELECT * FROM student WHERE roll_num=$1;", [req.session.user.rows[0].user_id]
			)
			.then((result) => {
				return result;
			});
		var course_inf = await pool.query(
			`select * from takes,course,time_slot where takes.course_id=course.course_id and 
		takes.stud_id=$1 and course.time_slot_id=time_slot.time_slot_id and time_slot.day='1'`, [req.session.user.rows[0].user_id]
		)
		var deadline_inf = await pool.query(
			`select * from takes,course,deadlines where takes.course_id=course.course_id and 
		takes.stud_id=$1 and course.course_id=deadlines.course_id and deadlines.end_time>$2`, [req.session.user.rows[0].user_id, A]
		)
		fin = { stud: result, course: course_inf, deadline: deadline_inf }

		console.log(req.session.user.rows);

		console.log(result);
		res.send(fin);
	} else {
		console.log("display session");
		console.log(req.session.user);
		res.send({ message: "Session error" });
	}
});

app.get("/friendsfetch", async (req, res) => {
	console.log("Entered server-side Friends Fetch");
	if (req.session.user) {
		var result = await pool.query(
			"SELECT id1 FROM friends WHERE id2=$1",
			[req.session.user.rows[0].user_id]
		).then((result) => {
			return result;
		});
		var resul= await pool.query(
			"SELECT * FROM Student WHERE roll_num=$1",
			[req.session.user.rows[0].user_id]
		).then((resul) => {
			return resul;
		});
		console.log(resul);
		res.send({ user:resul,friends: result });
	} else {
		res.send({ message: "Session Error" });
	}
});

app.get("/sendemail", async (req, res) => {

	sendEmail({
		subject: "Test",
		text: "Pani chesindhi roooooooo",
		to: "manipraneethedu@gmail.com",
		from: process.env.EMAIL
	});
	res.send({success: "Emoo evadiki thelsu"})
})

// "INSERT INTO auth VALUES (" + rollnumber + ",'"+password+"',0)",
app.listen(8000, console.log("Server is running on port 8000"));