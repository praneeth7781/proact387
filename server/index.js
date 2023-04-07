var express = require("express");
var app = express();
var cors = require("cors");
var bodyparser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

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
		res.send({ message: "Incorrect Credentials!"});
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
		  "SELECT * FROM student WHERE roll_num='" + req.session.user.rows[0].user_id + "';"
		)
		.then((result) => {
		  return result;
		});
	var course_inf=await pool.query(
		`select * from takes,course,time_slot where takes.course_id=course.course_id and 
		takes.stud_id=$1 and course.time_slot_id=time_slot.time_slot_id and time_slot.day='1'`,[req.session.user.rows[0].user_id ]
	)
	fin={stud:result,course:course_inf}
  
	  console.log(req.session.user.rows);
  
	  console.log(result);
	  res.send(fin);
	} else {
	  console.log("display session");
	  console.log(req.session.user);
	  res.send({ message: "Session error" });
	}
  });
app.post("/instlogin", async (req,res)=>{
	console.log("Entered server side instructor login");
	const user_id = req.body.user_id;
	const password = req.body.password;
	console.log(user_id, password);
	var resul = await pool.query(
		"SELECT * FROM auth WHERE user_id=$1 and password=$2 and type=$3",
		[user_id, password, 1]
	).then((result)=>{
		return result;
	});
	if(resul.rowCount > 0){
		req.session.user = resul;
		res.send({success: "Logged In"});
	} else {
		res.send({message: "Incorrect Credentials!"});
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
	const dept_name =  req.body.dept_name;
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
				res.send({good: "Well Done Good!"});
			} else {
				res.send({error: "I am afraid few of your friends haven't yet come onboard our platform!"});
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

app.post("/parentdetails", async (req,res)=>{
	console.log("Entered server-side parent details");
	const parentname = req.body.parentname;
	const parentmail = req.body.parentmail;
	const facadname = req.body.facadname;
	const facadmail = req.body.facadmail;

	if(req.session.user){
		var result = await pool.query(
			"INSERT INTO receiver VALUES ($1, $2, 0, $3)",
			[req.session.user.rows[0].user_id, parentname, parentmail]
		).then((result)=>{
			return result;
		});
		result = await pool.query(
			"INSERT INTO receiver VALUES ($1, $2, 1, $3);",
			[req.session.user.rows[0].user_id, facadname, facadmail]
		).then((result)=>{
			return result;
		})
		res.send({success: "Success"});
	} else{
		res.send({message: "Session Error"});
	}
})


app.post("/insert", (req, res) => {
	console.log("Entered register");
	console.log(req.body);
	const roll_num = req.body.rollnumber;
	const name = req.body.name;
	const dept_name = req.body.dept_name;
	const eng_level = req.body.eng_level;
	const hostel = req.body.hostel;
	const room = req.body.room;
	// console.log(rollnumber, password, name);
	pool.query(
		"INSERT INTO student VALUES ($1,$2,$3,$4,$5,$6);", [roll_num, name, dept_name, eng_level, hostel, room],
		(err, result) => {
			console.log(err);
			console.log(result);
			res.send(result);
			console.log("sent");
		})
});

// "INSERT INTO auth VALUES (" + rollnumber + ",'"+password+"',0)",
app.listen(8000, console.log("Server is running on port 8000"));