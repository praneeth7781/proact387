import React, { useEffect, useState } from 'react';
import Axios from "axios";
import "../style/login.css"
import { redirect, useNavigate } from 'react-router-dom';


function Login() {


  var navigate = useNavigate();
  const [rollnumreg, setRollNumReg] = useState("");
  const [passwordreg, setPasswordReg] = useState("");
  const [namereg, setNameReg] = useState("");
  // const [hostelnumreg, setHostelNumReg] = useState("");
  // const [roomnumreg, setRoomNumReg] = useState("");
  
  const [useridlog, setUserIDLog] = useState("");
  const [passwordlog, setPasswordLog] = useState("");

  const userlogin = async () => {
    console.log("Entered client-side user login");
    if(!distog){
      var wait = await Axios.post("http://localhost:8000/login",{
        user_id:useridlog,
        password:passwordlog,
        type:0
      }).then((response)=>{
        console.log("Reponse received: "+response);
      })
    }

  }

  const studentlogin = async () => {
    console.log("Entered client-side student login");
    var wait = await Axios.post("http://localhost:8000/studentlogin",{
      user_id: useridlog,
      password: passwordlog,
    }).then((response)=>{
      console.log("Response received: "+response);
      if(response.data.message){
        setLoginStatus(response.data.message);
      } else {
        console.log(response);
        setLoginStatus(response.data.rows[0].user_id);
        navigate('/redirect');
      }
    });
  }
  
  const instlogin = async () => {
    console.log("Entered client-side instructor login");
    var wait = await Axios.post("http://localhost:8000/instlogin",{
      user_id: useridlog,
      password: passwordlog,
    }).then((response)=>{
      console.log("Response received: "+response);
    })
  }


  const [loginStatus, setLoginStatus] = useState("");
  const [userID, setUserID] = useState("");
  const [password, setPassword] = useState("");
  const [Status, setStatus] = useState(false);
  Axios.defaults.withCredentials = true;
  const login = async () => {
    console.log("Entered login");
    var wait = await Axios.post("http://localhost:8000/login", {
      userID: userID,
      password: password,
    }).then((response) => {
      console.log("Response received" + response);
      if (response.data.message) {
        setLoginStatus(response.data.message);
      } else {
        console.log(response);
        setLoginStatus(response.data.rows[0].userID);
        setStatus(true);
        // console.log("Logged In");
        navigate('/home');
      }
    });
  };

  const register = async () =>{
    var wait = await Axios.post("http://localhost:8000/register",{
      rollnumber: rollnumreg,
      password: passwordreg,
      name: namereg,
    }).then((response)=>{
      console.log("Response received: "+response);
    })
  }

  // useEffect(() => {
  //   Axios.get("http://localhost:8000/login").then((response) => {
  //     if (response.data.loggedIn === true) {
  //       setLoginStatus(response.data.user.rows[0].userID);
  //       setStatus(true);
  //       console.log(Status);
  //     }
  //   });
  // }, [Status]);

  const [distog, setDisTog] = useState(false); //false is for student

  const distogglestud = (e) => {
    e.preventDefault();
    setDisTog(false);
  }

  const distoggleinst = (e) => {
    e.preventDefault();
    setDisTog(true);
  }

  

  const handleToggle = (e) => {
    e.preventDefault();
    setTogActive(!togActive);
  }
  const [togActive, setTogActive] = useState(false);//false is for signIn
  return (
    <div className='body'>

      <div className="main">
        <div className={togActive ? "container a-container" : "container a-container is-txl"} id="a-container">
          <form className="form" id="a-form" method="" action="">
            <h2 className="form_title title">Create Account</h2>
            {/* <span className="form__span">or use email for registration</span> */}
            <input 
              className="form__input" 
              type="text" 
              placeholder="Name" 
              onChange={(e)=>{
                setNameReg(e.target.value);
              }}
            />
            <input 
              className="form__input" 
              type="text" 
              placeholder="Roll Number"
              onChange={(e)=>{
                setRollNumReg(e.target.value);
              }} 
            />
            <input 
              className="form__input" 
              type="password" 
              placeholder="Password" 
              onChange={(e)=>{
                setPasswordReg(e.target.value);
              }}/>
              <button className="form__button button" type="submit" onClick={register}>SIGN UP</button>
          </form>
        </div>
        <div className={togActive ? "container b-container" : "container b-container is-txl is-z200"} id="b-container">
          <form className='form' id='b-form' method='' action=''>
            <h2 className='form_title title'>Sign In to Website</h2>
            <div className='st_inst_toggle'>
              <button className={distog? 'select_btn button2 dis':'select_btn button2'} onClick={e=>distogglestud(e)}>Student</button>
              <button className={distog? 'select_btn button2':'select_btn button2 dis'} onClick={e=>distoggleinst(e)}>Instructor</button>
            </div>
            <input 
              className='form__input' 
              type="text" 
              placeholder={distog? 'Instructor ID':'Roll Number'}
              onChange={(e)=>{
                setUserIDLog(e.target.value);
              }}
            />
            <input 
              className='form__input' 
              type="password" 
              placeholder='Password'
              onChange={(e)=>{
                setPasswordLog(e.target.value);
              }}
            />
            <button className='form__button button' onClick={distog? instlogin : studentlogin}>SIGN IN</button>
          </form>
          {loginStatus}
        </div>
        <div className={togActive ? "switch" : "switch is-txr"} id="switch-cnt">
          <div className={togActive ? "switch__circle" : "switch__circle is-txr"}></div>
          <div className={togActive ? "switch__circle switch__circle--t" : "switch__circle switch__circle--t is-txr"}></div>




          <div className={togActive ? "switch__container" : "switch__container is-hidden"} id="switch-c1">
            <h2 className="switch__title title">Welcome Buddy!</h2>
            <p className="switch__description description">Looking for the Login page?<br></br>Here you go!</p>
            <button className="switch__button button switch-btn" onClick={e => handleToggle(e)}>SIGN IN</button>
          </div>




          <div className={togActive ? "switch__container is-hidden" : "switch__container"} id="switch-c2">
            <h2 className="switch__title title">Hey There!</h2>
            <p className="switch__description description">Is this your first time here? <br></br>Sign up to start your journey with us!</p>
            <button className="switch__button button switch-btn" onClick={e => handleToggle(e)}>SIGN UP</button>
          </div>



        </div>
      </div>
    </div>
  );
}

export default Login;