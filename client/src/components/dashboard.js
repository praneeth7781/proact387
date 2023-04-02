import React, { useEffect, useState } from 'react';
import Axios from "axios";
import "../style/login.css"
import { redirect, useNavigate } from 'react-router-dom';

export default function Dashboard(){
    Axios.defaults.withCredentials = true;
    return(
        <h1>Hello bro!</h1>
    )
};