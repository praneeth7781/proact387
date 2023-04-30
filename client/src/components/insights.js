import React, { useEffect, useRef, useState } from "react";
import Axios from "axios";
// import ReactModal from "react-modal";
// import { useNavigate } from "react-router-dom";
// import { FaStar } from "react-icons/fa";
import "../style/instructor.css";
// import { Container, Radio, Rating } from "./ratingstyles";
import InsightsForm from "./insightsform";

export default function Insights(props) {
    Axios.defaults.withCredentials = true;
    // let navigate = useNavigate();
    var friends = useRef(null);
    var user = useRef(null);
    // var value = useRef(0);
    // var [editpopup, setEditPopup] = useState(false);
    const [fetched, setFetched] = useState(false);
    const [displayEdit, setDisplayEdit] = useState(false);
    // setDisplayEdit(props.ok);
    useEffect(() => {
        setDisplayEdit(props.ok);
      }, [props.ok]);
    
   
   
    

    var friendsfetch = async () => {
        // console.log("--------friendsfetch-------");
        var wait = await Axios.get("/friendsfetch").then((response) => {
            return response;
            
        });
        // console.log(wait);
        if (wait.data.message) {
            alert(
                "There seems to be a problem with our server! Please hang on while we fix this!"
            );
            return 0;
        } else {
            friends.current = wait.data.friends;
            console.log(user);
            setFetched(true);
        }
    };

    
    
    
    useEffect(() => {
        friendsfetch();
    }, [fetched]);
    // useEffect(() => {
    //     friendsfetch();
    // }, []);
    // const [displayEdit, setDisplayEdit] = useState(false);
    const handleSubmit=async()=>{
        setDisplayEdit(null);
    }

    return fetched ? (
        <div className="dashboard-body">
            <div className="dashboard-main">
                <div className="today-classes">
                    <div>
                        <h2>Friends you can give insights on!</h2>
                    </div>
                    <div className="class-grid">
                        {friends.current.rowCount !== 0 ? (
                            friends.current.rows.map((val, key) => {
                                return (
                                    <div key={key}>
                                        <a href={"/edit/"+val.id1}
                                        onClick={(e) => {
                                            e.preventDefault(); // prevent default link behavior
                                            setDisplayEdit(`/edit/${val.id1}`); // set state to display additional text
                                          }}
                                        ><h2>{val.id1}</h2></a>
                                        {displayEdit === `/edit/${val.id1}` && (
                                                <InsightsForm roll_num={val.id1} onchildSubmit={handleSubmit}/>
        )}
                                    </div>
                                );
                            })
                        ) : (
                            <div>
                                <h3>Haha funny!</h3>
                            </div>
                        )}
                    </div>
                  
                </div>
            </div>
        </div>
    ) : (
        <div>Hello insightss</div>
    );
}