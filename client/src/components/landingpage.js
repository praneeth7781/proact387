import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";

function LandingPage(){
    const navigate = useNavigate();
    const navlogin=()=>{
        navigate('/login');
    };
    return(
        <div className="landingpage">
            <h1>
                Welcome to Proactive Mental Health Monitoring Website
            </h1>
            <h1>
                
            </h1>
            <button></button>
        </div>
    )
}

export default LandingPage;