// import React, { useEffect, useRef, useState } from "react";
// import ReactModal from 'react-modal';
// import Axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "../style/instructor.css";

// export default function Instructor() {

//     Axios.defaults.withCredentials = true;

//     const navigate = useNavigate();

//     var [fetched, setFetched] = useState(false);
//     // var [edited, setEdited] = useState(false);
//     var [coursespresent, setCoursesPresent] = useState(false);
//     var [classestoday, setClassesToday] = useState(false);
//     var instname = useRef("Name");
//     var instid = useRef("212");
//     var instdept = useRef("Comp. Sci.");
//     var coursedata = useRef(null);
//     var [editname, setEditName] = useState(instname.current);
//     var [editdept, setEditDept] = useState(instdept.current);
//     var today = useRef(null);
//     var [editpopup, setEditPopup] = useState(false);
//     // const [instname, setInstName] = useRef("Name");
//     // const [instid, setInstID] = useRef("2000");
//     // const [instdept, setInstDept] = useRef("Comp. Sci.");
//     // const [courses, ]

//     var infofetch = async () => {
//         var result = await Axios.get("/instructorinfo").then((response) => {
//             return response;
//         });
//         if (result.data.message) {
//             alert("There seems to be a problem with our server. Please hang on while we try to fix it!");
//             return 0;
//         } else if (result.data.insterror) {
//             alert("Your data is not found in our database");
//             return 0;
//         } else if (result.data.nocourses) {
//             instname.current = result.data.instname;
//             instid.current = result.data.instid;
//             instdept.current = result.data.instdept;
//             setEditDept(instdept.current);
//             setEditName(instname.current);
//             setFetched(true);
//             return 1;
//         } else if (result.data.noclassestoday) {
//             instname.current = result.data.instname;
//             instid.current = result.data.instid;
//             instdept.current = result.data.instdept;
//             coursedata.current = result.data.instinfo.rows;
//             setEditDept(instdept.current);
//             setEditName(instname.current);
//             setCoursesPresent(true);
//             setFetched(true);
//             return 1;
//         } else {
//             instname.current = result.data.instname;
//             instid.current = result.data.instid;
//             instdept.current = result.data.instdept;
//             coursedata.current = result.data.instinfo.rows;
//             today.current = result.data.today.rows;
//             setEditDept(instdept.current);
//             setEditName(instname.current);
//             setCoursesPresent(true);
//             setFetched(true);
//             setClassesToday(true);
//             return 1;
//         }
//     }

//     useEffect(() => {
//         infofetch();
//     }, [fetched, coursespresent, classestoday]);

//     const togglepopup = async (e) => {
//         e.preventDefault();
//         setEditPopup(!editpopup);
//     }

//     var editpersonalinfo = async (e) => {
//         e.preventDefault();
//         if (editname === "" || editdept === "") {
//             alert("None of the fields should be left empty!");
//             return 0;
//         } else {
//             var wait = Axios.post("/editinstinfo", {
//                 editname: editname,
//                 editdept: editdept
//             }).then((response) => {
//                 console.log(response);
//                 if (response.data.message) {
//                     alert("There seems to be a problem with our server. Please hang on while we fix it!");
//                 } else {
//                     console.log("Ippudocchindhii");
//                     window.location.reload();
//                     // setEdited(!edited);
//                     // setEditPopup(false);
//                 }
//                 return response;
//             });
//             // if((await wait).data.message){
//             //     alert("There seems to be a problem with our server. Please hang on while we fix it!");
//             // } else{
//             //     console.log("Vacchindhi!");
//             //     setEdited(!edited);
//             //     setEditPopup(false);
//             // }
//         }
//     }

//     const gotocourse = async (x) => {
//         console.log("Goto ", x);
//         navigate("/course/" + x);
//     }

//     const logout = () => {
//         // setLoginStatus(false);
//         Axios.get("http://localhost:8000/logout").then((response) => {
//             console.log(response);
//         });
//         navigate("/");
//     };

//     return (
//         fetched ?
//             coursespresent ?
//                 classestoday ?
//                     <div className="dashboard-body">
//                         <div className="dashboard-main">
//                             <div className="personal-info">
//                                 <h2>Personal Information</h2>
//                                 <div className="info-item">
//                                     <span>Name:</span>
//                                     <span>{instname.current}</span>
//                                 </div>
//                                 <div className="info-item">
//                                     <span>ID:</span>
//                                     <span>{instid.current}</span>
//                                 </div>
//                                 <div className="info-item">
//                                     <span>Department:</span>
//                                     <span>{instdept.current}</span>
//                                 </div>
//                                 <button className="button2" onClick={e => togglepopup(e)}>EDIT</button>
//                                 <ReactModal
//                                     isOpen={editpopup}
//                                     ariaHideApp={false}
//                                     contentLabel="Example Modal"
//                                 >
//                                     <form className="form">
//                                         <input
//                                             className="form__input"
//                                             type="text"
//                                             placeholder="Name"
//                                             value={editname}
//                                             onChange={(e) => {
//                                                 setEditName(e.target.value);
//                                             }}
//                                         />
//                                         <input
//                                             className="form__input"
//                                             type="text"
//                                             placeholder="Department Name"
//                                             value={editdept}
//                                             onChange={(e) => {
//                                                 setEditDept(e.target.value);
//                                             }}
//                                         />
//                                         <button className="button2" onClick={e => editpersonalinfo(e)}>SUBMIT</button>
//                                         <button className="button2" onClick={togglepopup}>CLOSE</button>
//                                     </form>
//                                 </ReactModal>
//                             </div>
//                             <div className="courses">
//                                 <div>
//                                     <h2>Courses</h2>
//                                 </div>
//                                 <div className="courses-grid">
//                                     {coursedata.current.map((val, key) => {
//                                         return (
//                                             <div key={key}>
//                                                 <div className="course" onClick={async () => {
//                                                     gotocourse(val.course_id);
//                                                 }}>
//                                                     <div className="course-details">
//                                                         <h3>{val.title}, {val.dept_name}</h3>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         );
//                                     })}
//                                 </div>
//                             </div>
//                             <div className="today-classes">
//                                 <div>
//                                     <h2>Today's Classes</h2>
//                                 </div>
//                                 <div className="class-grid">
//                                     {today.current.map((val, key) => {
//                                         return (
//                                             <div key={key}>
//                                                 <div className="class">
//                                                     <div className="class-details">
//                                                         <h3>{val.title}, {val.course_id}</h3>
//                                                         <p>{val.start_hr}:{val.start_min} {val.start} - {val.end_hr}:{val.end_min} {val.end}</p>
//                                                     </div>
//                                                     {/* <div className="class-status">
//                                                     <span>Active</span>
//                                                 </div> */}
//                                                 </div>
//                                             </div>
//                                         );
//                                     })}
//                                 </div>
//                                 {/* <div className="class">
//                                 <div className="class-details">
//                                     <h3>Introduction to Computer Science</h3>
//                                     <p>9:00 AM - 10:00 AM</p>
//                                 </div>
//                                 <div className="class-status">
//                                     <span>Active</span>
//                                 </div>
//                             </div>
//                             <div className="class">
//                                 <div className="class-details">
//                                     <h3>Data Structures and Algorithms</h3>
//                                     <p>11:00 AM - 12:00 PM</p>
//                                 </div>
//                                 <div className="class-status">
//                                     <span>Active</span>
//                                 </div>
//                             </div> */}
//                             </div>
//                         </div>
//                     </div>
//                     :
//                     <div className="dashboard-body">
//                         <div className="dashboard-main">
//                             <div className="personal-info">
//                                 <h2>Personal Information</h2>
//                                 <div className="info-item">
//                                     <span>Name:</span>
//                                     <span>{instname.current}</span>
//                                 </div>
//                                 <div className="info-item">
//                                     <span>ID:</span>
//                                     <span>{instid.current}</span>
//                                 </div>
//                                 <div className="info-item">
//                                     <span>Department:</span>
//                                     <span>{instdept.current}</span>
//                                 </div>
//                                 <button className="button2" onClick={e => togglepopup(e)}>EDIT</button>
//                                 <ReactModal
//                                     isOpen={editpopup}
//                                     ariaHideApp={false}
//                                     contentLabel="Example Modal"
//                                 >
//                                     <form className="form">
//                                         <input
//                                             className="form__input"
//                                             type="text"
//                                             placeholder="Name"
//                                             value={editname}
//                                             onChange={(e) => {
//                                                 setEditName(e.target.value);
//                                             }}
//                                         />
//                                         <input
//                                             className="form__input"
//                                             type="text"
//                                             placeholder="Department Name"
//                                             value={editdept}
//                                             onChange={(e) => {
//                                                 setEditDept(e.target.value);
//                                             }}
//                                         />
//                                         <button className="button2" onClick={e => editpersonalinfo(e)}>SUBMIT</button>
//                                         <button className="button2" onClick={togglepopup}>CLOSE</button>
//                                     </form>
//                                 </ReactModal>
//                             </div>
//                             <div className="courses">
//                                 <div>
//                                     <h2>Courses</h2>
//                                 </div>
//                                 <div className="courses-grid">
//                                     {coursedata.current.map((val, key) => {
//                                         return (
//                                             <div key={key}>
//                                                 <div className="course" onClick={async () => {
//                                                     navigate("/");
//                                                 }}>
//                                                     <div className="course-details">
//                                                         <h3>{val.title}, {val.dept_name}</h3>
//                                                         {/* <button className="button">Hello</button>
//                                     <button className="edit-btn" >GO</button> */}
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         );
//                                     })}
//                                 </div>
//                             </div>
//                             <div className="today-classes">
//                                 <div>
//                                     <h2>Today's Classes</h2>
//                                     <p>No classes Today!</p>
//                                 </div>
//                                 {/* <div className="class">
//                             <div className="class-details">
//                                 <h3>Introduction to Computer Science</h3>
//                                 <p>9:00 AM - 10:00 AM</p>
//                             </div>
//                             <div className="class-status">
//                                 <span>Active</span>
//                             </div>
//                         </div>
//                         <div className="class">
//                             <div className="class-details">
//                                 <h3>Data Structures and Algorithms</h3>
//                                 <p>11:00 AM - 12:00 PM</p>
//                             </div>
//                             <div className="class-status">
//                                 <span>Active</span>
//                             </div>
//                         </div> */}
//                             </div>
//                         </div>
//                     </div>
//                 :
//                 <div className="dashboard-body">
//                     <div className="dashboard-main">
//                         <div className="personal-info">
//                             <h2>Personal Information</h2>
//                             <div className="info-item">
//                                 <span>Name:</span>
//                                 <span>{instname.current}</span>
//                             </div>
//                             <div className="info-item">
//                                 <span>ID:</span>
//                                 <span>{instid.current}</span>
//                             </div>
//                             <div className="info-item">
//                                 <span>Department:</span>
//                                 <span>{instdept.current}</span>
//                             </div>
//                             <button className="button2" onClick={e => togglepopup(e)}>EDIT</button>
//                             <ReactModal
//                                 isOpen={editpopup}
//                                 ariaHideApp={false}
//                                 contentLabel="Example Modal"
//                             >
//                                 <form className="form">
//                                     <input
//                                         className="form__input"
//                                         type="text"
//                                         placeholder="Name"
//                                         value={editname}
//                                         onChange={(e) => {
//                                             setEditName(e.target.value);
//                                         }}
//                                     />
//                                     <input
//                                         className="form__input"
//                                         type="text"
//                                         placeholder="Department Name"
//                                         value={editdept}
//                                         onChange={(e) => {
//                                             setEditDept(e.target.value);
//                                         }}
//                                     />
//                                     <button className="button2" onClick={e => editpersonalinfo(e)}>SUBMIT</button>
//                                     <button className="button2" onClick={togglepopup}>CLOSE</button>
//                                 </form>
//                             </ReactModal>
//                         </div></div></div>
//             :
//             <h2>Busss</h2>
//     )
// };

import React, { useEffect, useRef, useState } from "react";
import ReactModal from 'react-modal';
import Side_bar from "./side_bar";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import "../style/instructor.css";
import NavBar from "./navbar";
// import { extend } from '@syncfusion/ej2-base';
// import { ScheduleComponent, ViewDirective,Day, Week,WorkWeek,Month,Agenda,Inject, Resize, ExcelExport, DragAndDrop, ViewsDirective } from '@syncfusion/ej2-react-schedule';
import { Link } from "react-router-dom";
import Courses from "./pages/courses";
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment'
import { datetime, RRule, RRuleSet, rrulestr } from 'rrule'

const localizer = momentLocalizer(moment);

const recurrenceRule = rrulestr('FREQ=WEEKLY;BYDAY=TU,TH;COUNT=10');

const events = recurrenceRule.all().map(date => ({
    title: 'Weekly Meeting',
    start: moment(date).toDate(),
    end: moment(date).add(1, 'hour').toDate(),
}));
console.log("----events----");
console.log(events);

export default function Instructor() {

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
    var today = useRef(null);
    var [editpopup, setEditPopup] = useState(false);

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



    console.log("-----------------hi-------------")
    console.log(coursedata);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // add a state variable to hold the course that was clicked
    const [selectedCourse, setSelectedCourse] = useState(null);







    return (

        <div>
            <NavBar />

            <div style={{ display: 'flex' }}>
                <Side_bar />
                <div style={{ height: "100vh", width: "100%" }}>
                    <Calendar
                        events={events}
                        startAccessor="start"
                        endAccessor="end"
                        // defaultDate={moment().toDate()}
                        style={{ height: "100%", width: "100%" }}
                        localizer={localizer}
                    />
                </div>


            </div>
        </div>







    )
};








