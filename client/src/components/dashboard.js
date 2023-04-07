import React, { useEffect, useState ,useRef} from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const [Status, setStatus] = useState(false);
  const navlogin = () => {
    navigate('/');
  };
  const userdata = useRef(null);
  const coursedata = useRef(null);

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
    coursedata.current=response.data.course.rows;
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

  }, [Status,datafetched]);
  return (
    Status && datafetched ? (
      <div className="dashboard">
        <h1>
          Dashboard Successful
        </h1>
        <h1>
          Please login to continue
        </h1>
        {coursedata.current.map((val, key) => {
            return (
              <tr key={key}>
                <td><a href={"/course/"+val.course_id}>{val.course_id}</a></td>
                <td>{val.title}</td>
                <td>{val.sec_id}</td>
                {/* <td>{val.year}</td>
                <td>{val.semester}</td> */}
                <td>
                  <button className="button-17"
                    onClick={async () => {
                      const confirmBox = window.confirm(
                        "You are about to drop course "+val.course_id+"-"+val.title
                      )
                      
                    }}
                  >
                    Drop
                  </button>
                </td>
              </tr>
            );
          })}
        <h1>{userdata.current.dept_name}</h1>
        <button onClick={navlogin}>Login</button>
        <button onClick={logout}>Logout</button>
      </div>)
      :
      (<div className="openpage">
        <h1>User Not Logged In</h1>
        <h1>Please Login</h1>
        <button className="button-17" onClick={navlogin}>LOGIN</button>
      </div>)
  )
}

export default Dashboard;