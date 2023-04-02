import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";

function SignUpSuccess(){
    const navigate = useNavigate();
    const navlogin=()=>{
        navigate('/');
    };
    return(
        <div className="landingpage">
            <h1>
                Signup successful
            </h1>
            <h1>
                Please login to continue
            </h1>
            <button onClick={navlogin}>Login</button>
        </div>
    )
}

export default SignUpSuccess;