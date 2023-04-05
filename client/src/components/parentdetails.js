import React, { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import "../style/infogather.css";


export default function ParentDetails() {

    let navigate = useNavigate();
    Axios.defaults.withCredentials = true;
    const logout = () => {
        Axios.get("http://localhost:8000/logout").then((response) => {
            console.log(response);
        });
        navigate("/");
    };

    const [parentname, setParentName] = useState("");
    const [parentmail, setParentMail] = useState("");
    const [facadname, setFacadName] = useState("");
    const [facadmail, setFacadMail] = useState("");

    const [togActive, setTogActive] = useState(false);
    const handleToggle = (e) => {
        e.preventDefault();
        setTogActive(!togActive);
    }

    var firstcheck = async () => {
        if (parentname === "") {
            if (parentmail === "") {
                alert("You can't leave this form empty!");
                return 0;
            } else {
                alert("Parent Name is required!");
                return 0;
            }
        } else if (parentmail === "") {
            alert("Parent Mail ID is required!");
            return 0;
        }
        return 1;
    }

    const parentinfo = async (e) => {
        e.preventDefault();
        var wait = await (firstcheck());
        if (wait === 1) setTogActive(!togActive);
    }

    var secondcheck = async () => {
        if (facadname === "") {
            if (facadmail === "") {
                alert("You can't leave this form empty!");
                return 0;
            } else {
                alert("Faculty Advisor's name is required!");
                return 0;
            }
        } else if (facadmail === "") {
            alert("Faculty Advisor's Mail ID is required!");
            return 0;
        }
        return 1;
    }

    const facadinfo = async (e) => {
        e.preventDefault();
        var wait = await (secondcheck());
        if (wait) {
            wait = await Axios.post("http://localhost:8000/parentdetails",{
                parentname: parentname,
                parentmail: parentmail,
                facadname: facadname,
                facadmail: facadmail,
            }).then((response)=>{
                console.log("Facadinfo response receieved: ", response);
                if(response.data.message){
                    alert("There seems to be a problem with our server. Please hang on while we look into it!");
                } else {
                    navigate('/dashboard');
                }
            })
        }
        // alert(parentname + ', ' + parentmail + ', ' + facadname + ', ' + facadmail);
    }

    return (
        <div className="body">
            <div className="main">
                <div className={togActive ? "container a-container" : "container a-container is-txl"} id="a-container">
                    <form className='form' id='b-form' method='' action=''>
                        <h2 className='form_title title'>Faculty Advisor Details</h2>
                        <input
                            className='form__input'
                            type="text"
                            placeholder="Name of Faculty Advisor"
                            onChange={(e) => {
                                setFacadName(e.target.value);
                            }}
                        />
                        <input
                            className='form__input'
                            type="email"
                            placeholder='Mail ID of Faculty Advisor'
                            onChange={(e) => {
                                setFacadMail(e.target.value);
                            }}
                        />

                        <button className='form__button button' onClick={facadinfo}>SUBMIT</button>
                    </form>
                </div>
                <div className={togActive ? "container b-container" : "container b-container is-txl is-z200"} id="b-container">
                    <form className="form" id="a-form" method="" action="">
                        <h2 className="form_title title">Parent/Guardian Details</h2>
                        {/* <span className="form__span">or use email for registration</span> */}
                        <input
                            className="form__input"
                            type="text"
                            placeholder="Name of Parent/Guardian"
                            onChange={(e) => {
                                setParentName(e.target.value);
                            }}
                        />
                        <input
                            className="form__input"
                            type="email"
                            placeholder="Email ID of Parent/Guardian"
                            onChange={(e) => {
                                setParentMail(e.target.value);
                            }}
                        />
                        <button className="form__button button" onClick={parentinfo}>NEXT</button>
                <button className="form__button button" onClick={logout}> Logout</button>
                    </form>
                </div>
                <div className={togActive ? "switch" : "switch is-txr"} id="switch-cnt">
                    <div className={togActive ? "switch__circle" : "switch__circle is-txr"}></div>
                    <div className={togActive ? "switch__circle switch__circle--t" : "switch__circle switch__circle--t is-txr"}></div>




                    <div className={togActive ? "switch__container" : "switch__container is-hidden"} id="switch-c1">
                        {/* <h2 className="switch__title title">Welcome Buddy!</h2>
                        <p className="switch__description description">Looking for the Login page?<br></br>Here you go!</p> */}
                        <div className="imgdivfc">
                            <img src="/assets/images/Undraw_educator.svg" className="friendcircleimg" alt="educator" />
                        </div>
                        <button id="but1" className="switch__button button switch-btn" onClick={e => handleToggle(e)}>BACK</button>
                    </div>




                    <div className={togActive ? "switch__container is-hidden" : "switch__container"} id="switch-c2">
                        {/* <h2 className="switch__title title">Hey There!</h2>
                        <p className="switch__description description">Is this your first time here? <br></br>Sign up to start your journey with us!</p> */}
                        <img src="/assets/images/Undraw_fatherhood.svg" className="personalinfoimg" alt="parent" />
                        <button className="switch__button button switch-btn" onClick={e => handleToggle(e)}>Next</button>
                    </div>



                </div>
            </div>
        </div>
    )
};