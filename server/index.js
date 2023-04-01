var express = require("express");
var app = express();
var cors = require("cors");
var bodyparser = require("body-parser");

app.use(bodyparser.json());
app.use(
    cors({
        origin: ["http://localhost:3000"],
        methods: ["GET","POST"],
        credentials: true,
    })
)

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
        })
})

// "INSERT INTO auth VALUES (" + rollnumber + ",'"+password+"',0)",
app.listen(8000, console.log("Server is running on port 8000"));