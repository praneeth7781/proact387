import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import React, { useEffect, useRef, useState } from "react";
import ReactModal from 'react-modal';
import Axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Stu_side() {
    const navigate = useNavigate();
    const [Status, setStatus] = useState(false);
    const navlogin = () => {
      navigate("/");
    };
    var variable;
    var variab;
  
    const userdata = useRef(null);
    const coursedata = useRef(null);
    const deaddata = useRef(null);
  
    const insights = async(e)=>{
      e.preventDefault();
      navigate("/insights");
    }
  
    const sendemail = async(e) => {
      console.log("Send Email");
      e.preventDefault();
      const response = await Axios.get("http://localhost:8000/sendemail");
      console.log("Came here");
      if(response.data.success){
        alert("Check your email box");
      } else{
        alert("Error");
      }
    }
  
    var [datafetched, setDataFetched] = useState(false);
    async function userdetailsfetching() {
      const response = await Axios.get("http://localhost:8000/dashdisplay");
      if (response.data.err) {
        console.log("Query error!");
      } else {
        if (response.data.message) {
          console.log("Session error");
        } else {
          console.log(response);
          var userdataset = await userdatasetting(response);
          // setUserData(response.data.rows[0]);
          console.log("User data set");
          console.log(userdata);
        }
      }
    }
    async function userdatasetting(response) {
      console.log("reached user setting");
      //   setUserData(response.data.rows[0]);
  
      userdata.current = response.data.stud.rows[0];
      coursedata.current = response.data.course.rows;
      deaddata.current=response.data.deadline.rows;
      setDataFetched(true);
      return "Done";
    }
    const logout = () => {
      // setLoginStatus(false);
      Axios.get("http://localhost:8000/logout").then((response) => {
        console.log(response);
      });
      navigate("/");
    };
    useEffect(() => {
      Axios.get("http://localhost:8000/login").then((response) => {
        if (response.data.loggedIn === true) {
          //   setLoginStatus(response.data.user.rows[0].userID);
          setStatus(true);
          console.log(Status);
        }
      });
      userdetailsfetching();
    }, [Status, datafetched]);
    return Status && datafetched ? (
        <div style={{ width: "19rem", position: "fixed", display: "flex", flexDirection: "column", alignItems: "center" }}>
            {/* <div className="form_ok"> */}
            <div style={{backdropFilter:"blur(8px)",backgroundColor:"rgba(0,0,0, 0.06)",borderRadius:"10px"}}>
                <h2 style={{textAlign:"center"}}>Personal Information</h2>
                <div className="info-item" style={{textAlign:"center"}}>
                    <span>Name:</span>
                    <span>{userdata.current.name}</span>
                </div>
                <div className="info-item" style={{textAlign:"center"}}>
                    <span>ID:</span>
                    <span>{userdata.current.roll_num}</span>
                </div>
                <div className="info-item" style={{textAlign:"center"}}>
                    <span>Department:</span>
                    <span>{userdata.current.dept_name}</span>
                </div>
                <div className="info-item" style={{textAlign:"center"}}>
                    <span>Hostel:</span>
                    <span>{userdata.current.hostel}</span>
                </div>
                <div className="info-item" style={{textAlign:"center"}}>
                    <span>Room No:</span>
                    <span>{userdata.current.room}</span>
                </div>
                <div className="info-item" style={{textAlign:"center"}}>
                    <span>Engagement level:</span>
                    <span>{userdata.current.eng_level}</span>
                </div>
                <div style={{display: "flex", justifyContent: "center"}}>
                <button className="button2" onClick={e => sendemail(e)} style={{alignItems:"center",display:"flex",justifyContent:"center"}}>Send Email</button>
                </div>
           </div>
        </div>
      
    ):(<div>
        <h2> Fetching information</h2>
    </div>);
       

}