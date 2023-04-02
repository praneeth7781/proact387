import React, {useEffect,useState} from "react";
import Axios from "axios";
import {useNavigate} from "react-router-dom";

function LandingPage(){
    const navigate = useNavigate();
    const [Status, setStatus] = useState(false);
    const navlogin=()=>{
        navigate('/');
    };
   
    return(
        <div className="landingpage">
            <h1>
                Signup Successful
            </h1>
            <h1>
                Please login to continue
            </h1>
            <button onClick={navlogin}>Login</button>
        </div>
    )
}

export default LandingPage;