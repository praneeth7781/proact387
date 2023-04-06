import React, {useEffect,useState,useRef} from "react";
import Axios from "axios";
import {useNavigate} from "react-router-dom";

function LandingPage(){
    const navigate = useNavigate();
    const [Status, setStatus] = useState(false);
    const [roll_num,setRoll_num]=useState("");
    const [name,setName]=useState("");
    var resu = useRef([]);

    const navlogin=()=>{
        navigate('/');
    };
    const addval=async ()=>{
        var wait = await Axios.post("http://localhost:8000/insert",{
      rollnumber: "200050033",
      name: "divyeswar",
      dept_name: "cs",
      eng_level:"3",
      hostel:"9",
      room:"250"
    }).then((response)=>{
      console.log(response);
      navigate('/dashboard');

    })
    }
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
              resu.current=response.data.user
            }
          });
        }, [Status]);
    return(
        Status?(
        <div className="landingpage">
            <h1>
                Signup Successful
            </h1>
            <h1>
                Please login to continue
            </h1>
            <input type="text" placeholder="Roll Number"
          onChange={(e)=>{
            setRoll_num(e.target.value);
          }}/>
          <input type="" placeholder="Password"
          onChange={(e)=>{
            setName(e.target.value);
          }}/>
            <button onClick={addval}>val</button>
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

export default LandingPage;