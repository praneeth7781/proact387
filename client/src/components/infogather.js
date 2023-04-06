import React, { useState } from "react";
import Axios from "axios";
import "../style/infogather.css";
import { useNavigate } from "react-router-dom";
// import personalinfosvg from "../images/undraw_personal_information";

export default function InfoGather() {

    Axios.defaults.withCredentials = true;

    // const [alert, setAlert] = React.useState({
    //     type: 'error',
    //     text: 'This is a alert message',
    //     show: false
    // })

    // function onCloseAlert() {
    //     setAlert({
    //         type: '',
    //         text: '',
    //         show: false
    //     })
    // }

    // function onShowAlert(type, text) {
    //     setAlert({
    //         type: type,
    //         text: text,
    //         show: true
    //     })
    // }

    const [name, setName] = useState("");
    const [hostel, setHostel] = useState("");
    const [room, setRoom] = useState("");
    const [dept_name, setDeptName] = useState("");

    const [friend1, setFriend1] = useState("");
    const [friend2, setFriend2] = useState("");
    const [friend3, setFriend3] = useState("");
    const [friend4, setFriend4] = useState("");
    const [friend5, setFriend5] = useState("");


    const navigate = useNavigate();
    // const logout = () => {
    //     Axios.get("http://localhost:8000/logout").then((response) => {
    //         console.log(response);
    //     });
    //     navigate("/");
    // };

    const [togActive, setTogActive] = useState(false);
    const handleToggle = (e) => {
        e.preventDefault();
        setTogActive(!togActive);
    }

    var firstcheck = async () => {
        if (name === "") {
            if (hostel === "") {
                if (room === "") {
                    if(dept_name === ""){
                        alert("You can't leave the entire form empty!");
                        return 0;
                    }
                    else {
                        alert("Please fill in your Name, Hostel, and Room Number too!");
                        return 0;
                    }
                }
                else {
                    alert("We really need your name and hostel number too!");
                    return 0;
                }
            }
            else {
                alert("We won't be able to recognize you unless and until you give us a name buddy!");
                return 0;
            }
        }
        else if (hostel === "") {
            if (room === "") {
                if(dept_name === ""){
                    alert("Name alone won't work buddy!");
                    return 0;
                }
                alert("Name alone doesn't suffice to exactly recognize you. You do live in some room in some hostel right? Please fill in those details too!");
                return 0;
            }
            else {
                alert("Just the room number without hostel number isn't useful I guess!");
                return 0;
            }
        }
        else if (room === "") {
            if(dept_name === ""){
                alert("Department Name Please!");
                return 0;
            }
            alert("Well, we also need your room number to proceed!");
            return 0;
        }
        else if(dept_name === ""){
            alert("Department Name Please!");
            return 0;
        }
        return 1;
    }

    const personalinfo = async (e) => {
        e.preventDefault();
        // setTogActive(!togActive);
        var wait = await (firstcheck());
        if (wait === 1) setTogActive(!togActive);
    }

    var secondcheck = async () => {
        if (friend1 === "" || friend2 === "" || friend3 === "" || friend4 === "" || friend5 === "") {
            alert("FIVE friends please");
            return 0;
        }
        if (friend1 === friend2 || friend1 === friend3 || friend1 === friend4 || friend1 === friend5
            || friend2 === friend3 || friend2 === friend4 || friend2 === friend5
            || friend3 === friend4 || friend3 === friend5
            || friend4 === friend5) {
            alert("My friend, We need 5 DISTINCT friends");
            return 0;
        }
        return 1;
    }

    const infogathered = async (e) => {
        e.preventDefault();
        // console.log(hostel,room,name);
        var wait = await secondcheck();
        if (wait) {
            wait = await Axios.post("http://localhost:8000/infogather", {
                name: name,
                room: room,
                hostel: hostel,
                friend1: friend1,
                friend2: friend2,
                friend3: friend3,
                friend4: friend4,
                friend5: friend5,
            }).then((response) => {
                console.log("Info Gather Reponse received: ", response);
                if(response.data.message){
                    alert("There seems to be a problem with the server! Please hang on while we try to get it right!");
                } else if(response.data.error){
                    alert(response.data.error+"Please mention only those friends who are already on the platform!");
                } else{
                    console.log("Ready to navigate!");
                    navigate('/parentdetails');
                }
            })
        }
    }

    return (
        <div className="body">
            <div className="main">
                <div className={togActive ? "container a-container" : "container a-container is-txl"} id="a-container">
                    <form className="form" id="b-form" method="" action="">
                        <h2 className="form_title title">Your Circle</h2>
                        <input
                            className="form__input"
                            type="number"
                            placeholder="Roll Number of Friend 1"
                            onChange={(e) => {
                                setFriend1(e.target.value);
                            }}
                        />
                        <input
                            className="form__input"
                            type="number"
                            placeholder="Roll Number of Friend 2"
                            onChange={(e) => {
                                setFriend2(e.target.value);
                            }}
                        />
                        <input
                            className="form__input"
                            type="number"
                            placeholder="Roll Number of Friend 3"
                            onChange={(e) => {
                                setFriend3(e.target.value);
                            }}
                        />
                        <input
                            className="form__input"
                            type="number"
                            placeholder="Roll Number of Friend 4"
                            onChange={(e) => {
                                setFriend4(e.target.value);
                            }}
                        />
                        <input
                            className="form__input"
                            type="number"
                            placeholder="Roll Number of Friend 5"
                            onChange={(e) => {
                                setFriend5(e.target.value);
                            }}
                        />
                        <button className="form__button button" onClick={infogathered}>SUBMIT</button>
                    </form>
                </div>
                <div className={togActive ? "container b-container" : "container b-container is-txl is-z200"} id="b-container">
                    <form className="form" id="a-form" method="" action="">

                        <h2 className="form_title title">Personal Info</h2>
                        {/* <h2 className="form_title h3title">Seems like this is your first time here!</h2>
                        <h2 className="form_title h3title">Let's set up your Safe Space!</h2> */}
                        <p className="form_title description">We need a little more info to finish setting up your safe space!!</p>
                        {/* <img src="/home/praneeth/Downloads/undraw_personal_information"></img> */}
                        <br></br>
                        <input
                            className="form__input"
                            type="text"
                            placeholder="Name"
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                        />
                        <input
                            className="form__input"
                            type="text"
                            placeholder="Department Name"
                            onChange={(e) => {
                                setDeptName(e.target.value);
                            }}
                        />
                        <input
                            className="form__input"
                            type="number"
                            placeholder="Hostel"
                            onChange={(e) => {
                                setHostel(e.target.value);
                            }}
                        />
                        <input
                            className="form__input"
                            type="number"
                            placeholder="Room Number"
                            onChange={(e) => {
                                setRoom(e.target.value);
                            }}
                        />
                        {/* <Alert
                            header={'Header'}
                            btnText={'Close'}
                            text={alert.text}
                            type={alert.type}
                            show={alert.show}
                            onClosePress={onCloseAlert}
                            pressCloseOnOutsideClick={true}
                            showBorderBottom={true}
                            alertStyles={{}}
                            headerStyles={{}}
                            textStyles={{}}
                            buttonStyles={{}}
                        /> */}
                        <button className="form__button button" onClick={personalinfo}>NEXT</button>
                    </form>
                </div>

                <div className={togActive ? "switch" : "switch is-txr"} id="switch-cnt">
                    <div className={togActive ? "switch__circle" : "switch__circle is-txr"}></div>
                    <div className={togActive ? "switch__circle switch__circle--t" : "switch__circle switch__circle--t is-txr"}></div>


                    <div className={togActive ? "switch__container" : "switch__container is-hidden"} id="switch-c1">
                        {/* <h2 className="switch__title">Tough to choose just five, eh?</h2> */}
                        {/* <p className="switch__description description">Need to make changes in your personal info?</p> */}
                        <div className="imgdivfc">
                            <img src="/assets/images/Friend_circle.svg" className="friendcircleimg" alt="friends"/>
                        </div>
                        <button id="but1" className="switch__button button switch-btn" onClick={e => handleToggle(e)}>BACK</button>
                    </div>


                    <div className={togActive ? "switch__container is-hidden" : "switch__container"} id="switch-c2">
                        {/* <h2 className="switch__title">Done filling your personal info?</h2> */}
                        <img src="/assets/images/Undraw_personal_information.svg" className="personalinfoimg" alt="personal info"/>
                        <button className="switch__button button switch-btn" onClick={personalinfo}>NEXT</button>
                    </div>


                </div>
            </div>
        </div>
    )
};