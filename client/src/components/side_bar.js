import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import React, { useEffect, useRef, useState } from "react";
import ReactModal from 'react-modal';
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { FaPlus } from "react-icons/fa";
import { FaEdit } from 'react-icons/fa';

export default function Side_bar() {
    Axios.defaults.withCredentials = true;

    const navigate = useNavigate();

    var [fetched, setFetched] = useState(false);
    var [edited, setEdited] = useState(false);
    var [coursespresent, setCoursesPresent] = useState(false);
    var [classestoday, setClassesToday] = useState(false);
    var instname = useRef("Name");
    var instid = useRef("212");
    var instdept = useRef("Comp. Sci.");
    var coursedata = useRef(null);
    var [editname, setEditName] = useState(instname.current);
    var [editdept, setEditDept] = useState(instdept.current);
    var [editassgn, setEditAssgn] = useState(false);
    var [deptcourse, setDeptcourse] = useState(false);
    var [deadline, setDeadline] = useState(false);
    var [starttime,setStarttime] = useState(false);
    var today = useRef(null);
    var [editpopup, setEditPopup] = useState(false);
    var [editassgnpopup, setEditassgnpopup] = useState(false);
    var [editattenpopup, setEditattenpopup] = useState(false);
    var infofetch = async () => {
        var result = await Axios.get("/instructorinfo").then((response) => {
            return response;
        });
        console.log("--------result---------");
        console.log(result);
        if (result.data.message) {
            alert("There seems to be a problem with our server. Please hang on while we try to fix it!");
            return 0;
        } else if (result.data.insterror) {
            alert("Your data is not found in our database");
            return 0;
        } else if (result.data.nocourses) {
            instname.current = result.data.instname;
            instid.current = result.data.instid;
            instdept.current = result.data.instdept;
            setEditDept(instdept.current);
            setEditName(instname.current);
            setFetched(true);
            return 1;
        } else if (result.data.noclassestoday) {
            instname.current = result.data.instname;
            instid.current = result.data.instid;
            instdept.current = result.data.instdept;
            coursedata.current = result.data.instinfo.rows;
            setEditDept(instdept.current);
            setEditName(instname.current);
            setCoursesPresent(true);
            setFetched(true);
            return 1;
        } else {
            instname.current = result.data.instname;
            instid.current = result.data.instid;
            instdept.current = result.data.instdept;
            coursedata.current = result.data.instinfo.rows;
            today.current = result.data.today.rows;
            setEditDept(instdept.current);
            setEditName(instname.current);
            setCoursesPresent(true);
            setFetched(true);
            setClassesToday(true);
            return 1;
        }
    }

    useEffect(() => {
        infofetch();
    }, [fetched, coursespresent, classestoday, edited]);

    const togglepopup = async (e) => {
        e.preventDefault();
        setEditPopup(!editpopup);
    }
    const toggleassgnpopup = async (e) => {
        e.preventDefault();
        setEditassgnpopup(!editassgnpopup);
    }
    const toggleattenpopup = async (e) => {
        e.preventDefault();
        setEditattenpopup(!editattenpopup);
    }

    var editpersonalinfo = async (e) => {
        e.preventDefault();
        if (editname === "" || editdept === "") {
            alert("None of the fields should be left empty!");
            return 0;
        } else {
            var wait = Axios.post("/editinstinfo", {
                editname: editname,
                editdept: editdept
            }).then((response) => {
                console.log(response);
                if (response.data.message) {
                    alert("There seems to be a problem with our server. Please hang on while we fix it!");
                } else {
                    console.log("Ippudocchindhii");
                    window.location.reload();
                }
                return response;
            });
        }
    }
    const handleChange = () => async (e) => {
        // let updatedValue = {};
        // updatedValue = {"item1":"juice"};
        setDeptcourse(e.target.value);
    };
    console.log("-----------------hi-------------")
    console.log(coursedata);
    const assignment_add = async(e) => {
        console.log("--------after--------");
        // // console.log(e);
        // console.log(deptcourse,editassgn,deadline);
        e.preventDefault();
        if(editassgn==="" || starttime==="" || deadline==="" || deptcourse==="" ){
            alert("None of the fields should be left empty!");
            return 0;
        }
       
        // Send a request to the server to add the assignment data to the database
        else{
            axios.post('/api/assignments', {
            title: editassgn,
            start_time: starttime,
            end_time: deadline,
            course: deptcourse

        }).then((response) => {
            console.log(response);
            if (response.data.message) {
                alert("There seems to be a problem with our server. Please hang on while we fix it!");
            } else {
                console.log("Ippudocchindhii");
                toggleassgnpopup();
                window.location.reload();
            }
            return response;
        });
    
    }
    }
    const attendenceadd=()=>async(e)=>{

    }


    return (
        <div style={{ width: "19rem", position: "fixed", display: "flex", flexDirection: "column", alignItems: "center" }}>
            
            {/* <div style={{backdropFilter:"blur(8px)",backgroundColor:"rgba(0,0,0, 0.06)",borderRadius:"10px", minWidth: "200px",
  minHeight: "200px",display:"flex",flexDirection:"column"}}> */}
    <div className='add_assgn'>
                
                    
            <h2 style={{textAlign:"center",paddingTop:"20px"}}>Personal Information</h2>
                        <div className="info-item" style={{textAlign:"center"}}>
                            
                            <span>ID:</span>
                            <span>{instid.current}</span>
                        </div>
                        <div className="info-item" style={{textAlign:"center"}}>
                            
                            <span>NAME:</span>
                            <span>{instname.current}</span>
                        </div>
                        <div className="info-item" style={{textAlign:"center"}}>
                            <span>Department:</span>
                            {/* <span></span> */}
                            <span>{instdept.current}</span>
                        </div>
                        <div style={{display: "flex", justifyContent: "center"}}>
                        <button className="button3" onClick={togglepopup}><FaEdit className="icon" /></button>
                        </div>
                        <ReactModal
                            isOpen={editpopup}
                            ariaHideApp={false}
                            contentLabel="Example Modal"
                            className="modalform" 
                            overlayClassName="modal-overlay"
                        >
                            <form className="form">
                                <input
                                    className="form__input"
                                    type="text"
                                    placeholder="Name"
                                    value={editname}
                                    onChange={(e) => {
                                        setEditName(e.target.value);
                                    }}
                                />
                                <input
                                    className="form__input"
                                    type="text"
                                    placeholder="Department Name"
                                    value={editdept}
                                    onChange={(e) => {
                                        setEditDept(e.target.value);
                                    }}
                                />
                                <button className="button2" onClick={e => editpersonalinfo(e)}>SUBMIT</button>
                                <button className="button2" onClick={togglepopup}>CLOSE</button>
                            </form>
                        </ReactModal>

                    
                    

                </div>
                <div style={{height:"50px"}}></div>
                <div className='add_assgn'>

                    <ul style={{ listStyle: 'none',alignItems: 'center', justifyContent: 'center',margin: 'auto'}}>
                        <li style={{ display: 'table' , borderBottom: '1px solid black', paddingBottom: '5px'}}> 
                            <button className="button4" onClick={toggleassgnpopup} style={{backgroundColor:"inherit",border:"none",
                        padding:"14px 28px",fontSize:"16px",cursor:'pointer',display:'inline-block',':hover':{backgroundColor:"black"}}} ><FaPlus className="icon" />
                        <span>    ADD ASSIGNMENT</span> </button>

                    <ReactModal
                        isOpen={editassgnpopup}
                        ariaHideApp={false}
                        contentLabel="Example Modal"
                        className="modalform" 
                        overlayClassName="modal-overlay"
                    >
                        <form className="form">


                            {coursedata.current &&
                                <select value={deptcourse} onChange={handleChange()} className="form__input">
                                    <option value="">Select an option</option>
                                    {coursedata.current.map((item, index) => (
                                        <option value={item.course_id}>{item.title}</option>
                                    ))}
                                </select>
                            }
                              <input
                                className="form__input"
                                type="text"
                                placeholder="Title"

                                onChange={(e) => {
                                    setEditAssgn(e.target.value);
                                }}
                            />
                            <input className="form__input" type="datetime-local" placeholder='Start' onChange={(e) => {
                                setStarttime(e.target.value);
                            }} />
                            
                            <input className="form__input" type="datetime-local" placeholder='Deadline' onChange={(e) => {
                                setDeadline(e.target.value);
                            }} />
                            <button className="button2" onClick={e => assignment_add(e)}>SUBMIT</button>
                            <button className="button2" onClick={toggleassgnpopup}>CLOSE</button>
                        </form>
                    </ReactModal>
                        </li>
                        <li style={{ display: 'table', paddingBottom: '5px'}}> 
                        
                            <button className="button4" onClick={toggleattenpopup} style={{backgroundColor:"inherit",border:"none",
                        padding:"14px 28px",fontSize:"16px",cursor:'pointer',display:'inline-block',':hover':{backgroundColor:"black"}}} ><FaPlus className="icon" />
                        <span>    ADD ATTENDANCE</span></button>
                    <ReactModal
                        isOpen={editattenpopup}
                        ariaHideApp={false}
                        contentLabel="Example Modal"
                        className="modalform" 
                        overlayClassName="modal-overlay">
                        <form className="form">

                            {coursedata.current &&
                                <select value={deptcourse} onChange={handleChange()} className="form__input">
                                    <option value="">Select an option</option>
                                    {coursedata.current.map((item, index) => (
                                        <option value={item.title}>{item.title}</option>
                                    ))}
                                </select>
                            }


                            <input

                                type="file"
                                accept=".csv"

                                onChange={(e) => {
                                    setEditAssgn(e.target.value);
                                }}
                            />


                            <button className="button2" onClick={e => attendenceadd(e)}>SUBMIT</button>
                            <button className="button2" onClick={toggleattenpopup}>CLOSE</button>
                        </form>
                    </ReactModal>
                        </li>
                    </ul>
                </div> 
            
        </div>
    );
}