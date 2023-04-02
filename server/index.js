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
    console.log("aha");
    console.log(resul);
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