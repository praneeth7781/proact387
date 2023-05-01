import React, { useEffect, useState, useRef } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
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
    <div className="dashboard-body">
      <div className="personal-info">
        {/* <h2>Personal Information</h2> */}
        <div className="info-item">
          <span></span>
          <span>{userdata.current.name}</span>
        </div>
        <div className="info-item">
          <span></span>
          <span>{userdata.current.roll_num}</span>
        </div>
        <div className="info-item">
          <span></span>
          <span>{userdata.current.dept_name}</span>
        </div>
        <div className="info-item">
          <span></span>
          <span>{userdata.current.hostel}</span>
        </div>
        <div className="info-item">
          <span></span>
          <span>{userdata.current.room}</span>
        </div>
        <div className="info-item">
          <span>Engagement level:</span>
          <span>{userdata.current.eng_level}</span>
        </div>
        <button className="button2" onClick={e => sendemail(e)} >Send Email</button>
      </div>
      <div className="today-classes">
        <div>
          <h2>Today's Classes</h2>
        </div>
        <div className="class-grid">
          {coursedata.current.rowCount !== 0 ? (
            coursedata.current.map((val, key) => {
              return (
                <div key={key}>
                  <div className="class">
                    <div className="class-details">
                      <h3>
                        {val.title}, {val.course_id}
                      </h3>
                      <p>
                        {val.start_hr}:{val.start_min} {val.start} -{" "}
                        {val.end_hr}:{val.end_min} {val.end}
                      </p>
                    </div>
                    {/* <div className="class-status">
                                                    <span>Active</span>
                                                </div> */}
                  </div>
                </div>
              );
            })
          ) : (
            <div>
              <h3>No classes Today!</h3>
            </div>
          )}
        </div>
        {/* <div className="class">
                                <div className="class-details">
                                    <h3>Introduction to Computer Science</h3>
                                    <p>9:00 AM - 10:00 AM</p>
                                </div>
                                <div className="class-status">
                                    <span>Active</span>
                                </div>
                            </div>
                            <div className="class">
                                <div className="class-details">
                                    <h3>Data Structures and Algorithms</h3>
                                    <p>11:00 AM - 12:00 PM</p>
                                </div>
                                <div className="class-status">
                                    <span>Active</span>
                                </div>
                            </div> */}
      </div>
      <div className="today-classes">
        <div>
          <h2>Upcoming Deadlines</h2>
        </div>
        <div className="class-grid">
          {deaddata.current.rowCount !== 0 ? (
            deaddata.current.map((val, key) => {
              variable=Date.parse(val.end_time);
              variab=new Date(variable);
              return (
                <div key={key}>
                  <div className="class">
                    <div className="class-details">
                      <h2>{val.name}</h2>
                      <h3>
                        {val.title}, {val.course_id}
                      </h3>
                      <p>
                        submission by <b>{variab.toDateString()}</b>
                      </p>
                    </div>
                    {/* <div className="class-status">
                                                    <span>Active</span>
                                                </div> */}
                  </div>
                </div>
              );
            })
          ) : (
            <div>
              <h3>No Deadlines</h3>
            </div>
          )}
        </div>
        {/* <div className="class">
                                <div className="class-details">
                                    <h3>Introduction to Computer Science</h3>
                                    <p>9:00 AM - 10:00 AM</p>
                                </div>
                                <div className="class-status">
                                    <span>Active</span>
                                </div>
                            </div>
                            <div className="class">
                                <div className="class-details">
                                    <h3>Data Structures and Algorithms</h3>
                                    <p>11:00 AM - 12:00 PM</p>
                                </div>
                                <div className="class-status">
                                    <span>Active</span>
                                </div>
                            </div> */}
      </div>
      <button onClick={insights}>Insights</button>
      <button onClick={logout}>Logout</button>
    </div>
  ) : (
    <div className="openpage">
      <h1>User Not Logged In</h1>
      <h1>Please Login</h1>
      <button className="button-17" onClick={navlogin}>
        LOGIN
      </button>
    </div>
  );
}

export default Dashboard;