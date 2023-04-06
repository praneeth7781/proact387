import React from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
// import "../style/dashboard.css";

export default function Instructor() {
    const navigate = useNavigate();

    const logout = () => {
        // setLoginStatus(false);
        Axios.get("http://localhost:8000/logout").then((response) => {
            console.log(response);
        });
        navigate("/");
    };

    return (
        <div className="body">
            <div className="main">
                <h1 className="title">Hello</h1>
                <button className="button" onClick={logout}>LOGOUT</button>
            </div>
        </div>
    )
};


