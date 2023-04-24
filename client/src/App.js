import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

import Login from "./components/login.js";
import LandingPage from "./components/landingpage";
import Dashboard from "./components/dashboard";
import InfoGather from "./components/infogather";
import ParentDetails from "./components/parentdetails";
import Instructor from "./components/instructor1";
import Course from "./components/course";
import Insights from "./components/insights";
// import OpenPage from "./components/openpage.js";
// import Home from "./components/home.js";
// import Signup from "./components/signup.js";
// import Instructor from "./components/instructor.js";
// import Course from "./components/course.js";
// import Running from "./components/running";
// import Depts from "./components/depts";
// import { Navbar } from "./components/navbar";
import Axios from "axios";
// import Logout from "./components/logout";

function App(){
  Axios.defaults.withCredentials=true;
  return(
    <>
      <Router>
        {/* <Navbar/> */}
        <Routes>
          {/* <Route path="/" element={<LandingPage/>}/> */}
          {/* <Route path="/login" element={<Login/>}/> */}
          <Route path="/" element={<Login/>}/>
          <Route path="/redirect" element={<LandingPage/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/infogather" element={<InfoGather/>}/>
          <Route path="/parentdetails" element={<ParentDetails/>}/>
          <Route path="/instructor" element={<Instructor/>}/>
          <Route path="/course/:course_id" element={<Course/>}/> 
          <Route path="/insights" element={<Insights/>}/>
          {/* <Route path="/home" element={<Home/>}/>
          <Route path="/home/registration" element={<Registration/>}/>
          <Route path="/instructor/:instructor_id" element={<Instructor/>}/>
          <Route path="/course/running/" element={<Running/>}/>
          <Route path="/course/:course_id" element={<Course/>}/>
          <Route path="/course/running/:dept_name" element={<Depts/>}/>
          <Route path="/logout" element={<Logout/>}/> */}
        </Routes>
      </Router>
    </>
  )
}

export default App;
