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
        methods: ["GET","POST"],
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

app.get("/",(req,res)=>{
    pool.query("SELECT * FROM student",(err,result)=>{
        if(err){
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
app.post("/studentlogin", async (req,res)=>{
    console.log("Entered server side student login");
    const user_id = req.body.user_id;
    const password = req.body.password;
    console.log(user_id, password);
    var resul = await pool.query(
        "SELECT * FROM auth WHERE user_id=$1 and password=$2 and type=$3",
        [user_id, password, 0]
    ).then((result)=>{
        // console.log(err);
        return result;
    });
    req.session.user=resul;
    console.log("aha");
    console.log(req.session.user);
    if(resul.rowCount>0){
        res.send(resul);
    } else{
        res.send({message: "Incorrect Credentials"});
    }
})

app.post("/register",(req,res)=>{
    console.log("Entered register");
    const rollnumber = req.body.rollnumber;
    const password = req.body.password;
    const name = req.body.name;
    console.log(rollnumber, password, name);
    pool.query(
        "INSERT INTO auth VALUES ($1,$2,0);",[rollnumber,password],
        (err,result)=>{
            console.log(err);
            console.log(result);
            res.send(result);
            console.log("sent");
        })
})

// "INSERT INTO auth VALUES (" + rollnumber + ",'"+password+"',0)",
app.listen(8000, console.log("Server is running on port 8000"));