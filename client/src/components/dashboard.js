import React, {useEffect,useState} from "react";
import Axios from "axios";
import {useNavigate} from "react-router-dom";

function Dashboard(){
    const navigate = useNavigate();
    const [Status, setStatus] = useState(false);
    const navlogin=()=>{
        navigate('/');
    };
   
   
    const logout = () => {
        // setLoginStatus(false);
        Axios.get("http://localhost:8000/logout").then((response) => {
          console.log(response);
        });
        navigate("/");
      };
    useEffect(()=>{
        Axios.get("http://localhost:8000/login").then((response) => {
            if (response.data.loggedIn === true) {
            //   setLoginStatus(response.data.user.rows[0].userID);
              setStatus(true);
              console.log(Status);
            }
          });
        }, [Status]);
    return(
        Status?(
        <div className="dashboard">
            <h1>
                dashboard Successful
            </h1>
            <h1>
                Please login to continue
            </h1>
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