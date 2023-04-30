import React, { useEffect, useRef, useState } from "react";
import Axios from "axios";
import ReactModal from "react-modal";
import { useNavigate, useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import "../style/instructor.css";
import { Container, Radio, Rating } from "./ratingstyles";

export default function InsightsForm(props) {
    Axios.defaults.withCredentials = true;
    let navigate = useNavigate();
    // let { roll_num_fr } = useParams();
    let {roll_num_fr} = props.roll_num;
    var friends = useRef(null);
    var user = useRef(null);
    var value = useRef(0);
    var [editpopup, setEditPopup] = useState(false);
    const [fetched, setFetched] = useState(false);
    const [rate, setRate] = useState(-1);
    var [values, setvalues] = useState([
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
    ]);
    const scale = [1, 2, 3, 4, 5, 6];
    const questions = [
        {
            id: 1,
            question: "How often does your friend attend classes?",
            w: 14,
        },
        {
            id: 2,
            question: "How attentive is your friend usually during a class?",
            w: 13,
        },
        {
            id: 3,
            question: "How consistently does he/she meet deadlines?",
            w: 11,
        },
        {
            id: 4,
            question:
                "To what extent does he/she participate in discussions/group activities?",
            w: 10,
        },
        {
            id: 5,
            question:
                "How much does he/she tend to procrastinate academic activities?",
            w: 8,
        },
        {
            id: 6,
            question:
                "How frequently does your pal study or review course material outside of class time?",
            w: 8,
        },
        {
            id: 7,
            question:
                "How well do you think your friend handles criticism or constructive feedback on their academic work?",
            w: 8,
        },
        {
            id: 8,
            question:
                "How satisfied does the individual seem, with their academic performances?",
            w: 8,
        },
        {
            id: 9,
            question:
                "How much efforts does the individual put into their academic activities?",
            w: 5,
        },
        {
            id: 10,
            question:
                "How well does the individual balance his/her workloads and other responsibilities/interests?",
            w: 5,
        },
        {
            id: 11,
            question:
                "How often does the individual seek out help from teachers or classmates?",
            w: 5,
        },
        {
            id: 12,
            question:
                "How much does the individual participate in extra curricular activities related to your academic interests?",
            w: 5,
        },
    ];

    var friendsfetch = async () => {
        var wait = await Axios.get("/friendsfetch").then((response) => {
            return response;
        });
        if (wait.data.message) {
            alert(
                "There seems to be a problem with our server! Please hang on while we fix this!"
            );
            return 0;
        } else {
            console.log("---roll---");
            console.log(props);
            var wait1= await Axios.post("/friendinfo",{roll_num:props.roll_num}).then((response)=>{
                return response });
                if(wait1.data.message){
                    alert(
                        "There seems to be a problem with our server! Please hang on while we fix this!"
                    );
                    return 0;
                }
                else{
                    user.current = wait1.data.user.rows[0];
                    friends.current = wait.data.friends;
                    console.log("---user----")
                    console.log(user);
                    setFetched(true);
                }
           
            
        }
    };
    console.log("howmuch------");
    console.log(user.current);
    const togglepopup = async (e) => {
        e.preventDefault();
        setEditPopup(!editpopup);
    };
    const change = async (e, id) => {
        var vhval = [...values];
        vhval[id - 1] = e.target.value;
        setvalues(vhval);
        // console.log(val);
    };
    const calc = async (e) => {
        value.current = 0;
        e.preventDefault();
        console.log("calculating");
        
        console.log(value.current);
        for (let i = 0; i < 12; i++) {
            console.log("in for loop");
            console.log(i);
            console.log(values[i]);
            console.log(value.current);
            if (values[i] === null) {
                value.current = value.current + 0;

            } else if (
                values[i] === "1" ||
                values[i] === "2" ||
                values[i] === "3"
            ) {
                value.current =
                    value.current - (questions[i].w / 2) * (Math.E ** (values[i] - 1 / 2));
                values[i] = null;
            } else if (values[i] === "4" ||
                values[i] === "5" ||
                values[i] === "6") {
                value.current =
                    value.current +
                    ((questions[i].w) * Math.log(values[i])) / Math.log(6);
                values[i] = null;
            }
            console.log(value.current);
        }
        console.log("after for loop");
        let inc;
        console.log("let inc");
        if (value.current > 0) {
            console.log("value>0");
            inc = 20 * Math.sin(Math.PI * (100 - user.current.eng_level) * value.current / 20000);
            console.log("changed inc");
        }
        else {
            console.log("value<=0");
            inc = 30 * Math.sin(Math.PI * (user.current.eng_level) * value.current / (200 * 50));
            console.log("changed inc<");
        }
        console.log("after calculation");
        console.log("Increment",inc)
        console.log("Val:", parseInt(user.current.eng_level) + parseInt(inc));
        const pus = await Axios.post("http://localhost:8000/updateeng", {
            val: parseFloat(user.current.eng_level) + parseFloat(inc),
            roll_num: props.roll_num
        }).then((response) => {
            if (response.data.message) {
                alert("There seems to be a problem with our server. Please hang on while we fix it!");
            } else {
                props.onchildSubmit();
                console.log("Ippudocchindhii");
                // window.location.reload();
                // setEdited(!edited);
                // setEditPopup(false);
            }
        })
    };
    const activeStar = {
        fill: "yellow",
    };
    useEffect(() => {
        friendsfetch();
        // console.log(roll_num_fr);
    }, [fetched, editpopup]);
    // useEffect(() => {
    //     friendsfetch();
    // }, []);

    return (
        <div className="dashboard-body">
            <div className="dashboard-main">
                <div className="today-classes">
                   
                  
                    

        
                        <form className="form">
                            {questions.map((val, key) => {
                                return (
                                    <div key={key}>
                                        <h2>
                                            {val.id}.{val.question}
                                        </h2>
                                        <Container key={key}>
                                            {scale.map((val1, key1) => {
                                                return (
                                                    <label key={key1}>
                                                        <Radio
                                                            type="radio"
                                                            value={val1}
                                                            onClick={async (e) => {
                                                                setRate(val1);
                                                                var chane = await change(e, val.id);

                                                            }}
                                                        />
                                                        <Rating>
                                                            <FaStar
                                                                color={

                                                                    val1 <= values[val.id - 1]
                                                                        ? "000"
                                                                        : "rgb(192,192,192)"
                                                                }
                                                            />
                                                        </Rating>
                                                    </label>
                                                );
                                            })}
                                        </Container>
                                    </div>
                                );
                            })}

                            <button
                                className="button2"
                                onClick={(e) => {
                                    calc(e);
                                    togglepopup(e);
                                    navigate('/dashboard');
                                }}
                            >
                                SUBMIT
                            </button>
                            {/* <button className="button2" onClick={togglepopup}>
                                CLOSE
                            </button> */}
                        </form>
                    {/* </ReactModal> */}
                </div>
            </div>
            {/* <p>{props.someProp}</p> */}
        </div>
    );
}