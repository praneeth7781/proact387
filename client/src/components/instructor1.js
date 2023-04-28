import React, { useEffect, useRef, useState } from "react";
import ReactModal from 'react-modal';
import Side_bar from "./side_bar";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import "../style/instructor.css";
// import NavBar from "./navbar";
import Modal from 'react-modal';
// import { Link } from "react-router-dom";
import { Link, useMatch, useResolvedPath } from 'react-router-dom';
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
  const logout = () => {
    // setLoginStatus(false);
    Axios.get("http://localhost:8000/logout").then((response) => {
      console.log(response);
    });
    navigate("/");
  };
   

   

  

    return (
        
        <div>
            {/* <NavBar/> */}
            <div>
      <nav>
        <Link to="/" className="site-title">
          We Care!
        </Link>
        <ul>
          {/* <CustomLink to="/instructor">Home</CustomLink> */}
          {/* <CustomLink to="#courses">Courses</CustomLink> */}
          <a href="#calendar">Timetable</a>
          <a href="#courses">Courses</a>
          <button onClick={logout} className='button3'>Logout</button>
        </ul>
      </nav>
      <div className='space-class'></div>
     
    </div>
       
               <div style={{display:'flex',flexDirection:"row"}}>
                    <Side_bar/>
                    <div style={{flex:1}}>
                    <div style={{ height: "100vh" ,width:"100%"}} id="calendar">           
                            <Calendar
                            events={events}
                            startAccessor="start"
                            endAccessor="end"
                            // defaultDate={moment().toDate()}
                            style={{ height: "100%" ,width:"100%"}}
                            localizer={localizer}
                            />   

                        </div>  

                        <div style={{height:"50px"}}></div>

                        <div className="courses" id="courses">
                                <div >
                                    <h2 style={{textAlign:"center",fontSize:"32px",color:"rgb(25, 185, 217)"}}>Courses</h2>
                                </div>
                                {coursedata.current && coursedata.current.length > 0 && (
                                                        <div className="courses-grid">
                                                        {coursedata.current.map((val, key) => {
                                                            return (
                                                                <div key={key}>
                                                                    <div className="course" onClick={async () => {
                                                                        // navigate("/");
                                                                        // <Modal >
                                                                        //     <h2>val.title</h2>
                                                                        // </Modal>
                                                                        setSelectedCourse(val);  // set the selected course
                                                                        setIsModalOpen(true);

                                                                    }}>
                                                                        <div className="course-details">
                                                                            <h2>{val.title}</h2>
                                                                            <h3>{val.dept_name}</h3>
                                                                            {/* <button className="button">Hello</button>
                                                            <button className="edit-btn" >GO</button> */}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            );
                                                        })}
                                                        </div>
                                )}

                                {
                                    !coursedata.current || coursedata.current.length == 0 &&(
                                        <h2>....loading....</h2>
                                    )

                                }
                                {/* style={{ content: { width: '75%', height: '75%' ,float:'center'} }} */}
             
                                <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} className="modalform">
                                        {selectedCourse && (
                                            <div className="modal_div"> 
                                            <button className="close-btn" onClick={() => setIsModalOpen(false) }>X</button>
                                           

                                            {/* <span class="close">&times;</span> */}
                                            <h2>{selectedCourse.title}</h2>
                                            <p color="white">{selectedCourse.dept_name}</p>
                                            {/* add other details of the selected course */}
                                            </div>
                                        )}
                                {/* <button onClick={() => setIsModalOpen(false)}>Close</button> */}
                                </Modal>
                                
                    </div>
                    

                        </div>


                        
                </div>
                
        </div>   
       
                     
                                 
                                        
           
                           
            
    )
};

// function CustomLink({ to, children, ...props }) {
//     const resolvedPath = useResolvedPath(to)
//     const isActive = useMatch({ path: resolvedPath.pathname, end: true })
  
//     return (
//       <li className={isActive ? "active" : ""}>
//         <Link to={to} {...props}>
//           {children}
//         </Link>
//       </li>
//     )
//   }











