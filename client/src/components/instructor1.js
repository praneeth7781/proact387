import React, { useEffect, useRef, useState } from "react";
import ReactModal from 'react-modal';
import Side_bar from "./side_bar";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import "../style/instructor.css";
import { Link as LinkScroll } from "react-scroll";
// import NavBar from "./navbar";
import Modal from 'react-modal';
// import { Link } from "react-router-dom";
import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment-timezone'
import { datetime, RRule, RRuleSet, rrulestr } from 'rrule'
import { A, B, C, D, E, F, G, H, I, J, K, L, getObjectById, generateEvents } from './timeslots'
const localizer = momentLocalizer(moment);
const timezone = moment.tz.guess();
// const moment = getMoment(timezone);
//   const localizer = momentLocalizer(moment);



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
    courseevent();
  }, [fetched, coursespresent, classestoday, edited]);
  const [events, Setevents] = useState([]);
  var courseevent = async () => {

    if (coursedata.current) {
      const eventArray = coursedata.current.flatMap((course) =>
        generateEvents(getObjectById(course.time_slot_id), course.title)
      );
      Setevents(eventArray);
    }
  };
  console.log("-----------------new--------------");
  console.log(events);

  // console.log("-----------------hi-------------")
  // console.log(coursedata);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // add a state variable to hold the course that was clicked
  const [selectedCourse, setSelectedCourse] = useState(null);
  const logout = async () => {
    // setLoginStatus(false);
    const wait = Axios.get("http://localhost:8000/logout").then((response) => {
      console.log(response);
      return response;
    });
    navigate("/");
  };
  const [coursestud, setCoursestud] = useState(null);
  const fetchdata = async () => {
    setCoursestud(null);
    const wait = await Axios.post("/api/fetchdata", {
      course_id: selectedCourse.course_id
    }).then((response) => {
      if (response.data.message) {
        alert("There seems to be a problem with our server. Please hang on while we fix it!");
      } else {
        console.log("Ippudocchindhii");
        // window.location.reload();
      }
      return response;
    });
    console.log("result for fetch data");
    console.log(wait.data.result.rows);
    setCoursestud(wait.data.result.rows);

  }
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [emailroll, setEmailRoll] = useState("");
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const handleButtonClick = (stud) => {
    // event.preventDefault();
    console.log("---button---");
    console.log(stud);
    setEmailRoll(stud.roll_num);
    setEmailSubject("");
    setEmailBody("");
    setIsEmailModalOpen(true);
  };

  const sendemail = async (e) => {
    e.preventDefault();
    if (emailBody === "" || emailSubject === "") {
      alert("None of the fields should be left empty!");
      return 0;
    }
    else {
      var wait = Axios.post("/instcontact", {
        roll_num: emailroll,
        subject: emailSubject,
        mail: emailBody,
      }).then((response) => {
        console.log(response);
        if (response.data.message) {
          alert("There seems to be a problem with our server. Please hang on while we fix it!");
        } else {
          // console.log("Ippudocchindhii");
          // window.location.reload();

        }
        setIsEmailModalOpen(!isEmailModalOpen);
        return response;
      });
    }
  }




  return (

    <div>
      {/* <NavBar/> */}
      <div>
        <nav>
          <Link to="/" className="site-title">
            We Care!
          </Link>
          <ul>
            <a><LinkScroll activeClass='active'
              to='calendar'
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}>Timetable</LinkScroll></a>

            <a><LinkScroll activeClass='active'
              to='courses'
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}>Courses</LinkScroll></a>
            {/* <a href="#courses">Courses</a> */}
            <button onClick={logout} className='button3'>Logout</button>
          </ul>
        </nav>
        <div className='space-class'></div>

      </div>

      <div style={{ display: 'flex', flexDirection: "row" }}>
        <Side_bar />
        <div style={{ flex: 1, marginLeft: "20rem" }} >
          <div style={{ height: "100vh", width: "100%" }} id="calendar">
            <Calendar
              events={events}
              startAccessor="start"
              endAccessor="end"
              // defaultDate={moment().toDate()}

              style={{ height: "100%", width: "100%" }}
              localizer={localizer}
              timezone={timezone}
            />

          </div>

          <div style={{ height: "50px" }}></div>

          <div className="courses" id="courses">
            <div >
              <h2 style={{ textAlign: "center", fontSize: "32px", color: "rgb(25, 185, 217)" }}>Courses</h2>
            </div>

            {coursedata.current && coursedata.current.length > 0 && (
              <div >
                {/* Get unique department names and sort them */}
                {Array.from(new Set(coursedata.current.map(course => course.dept_name)))
                  .sort()
                  .map(dept_name => (
                    <React.Fragment key={dept_name}>
                      {/* Display the department heading */}
                      <div className="department-heading" style={{ display: 'block' }}>
                        <h3 style={{ marginTop: "20px", textAlign: "center", fontSize: "24px", fontWeight: "bold" }}>{dept_name}</h3>
                      </div>

                      {/* Display the courses for the department */}
                      {coursedata.current.filter(course => course.dept_name === dept_name)
                        .map((val, key) => (
                          <div key={key} className="courses-grid">
                            <div className="course" onClick={async () => {
                              setSelectedCourse(val);
                              setIsModalOpen(true);
                            }}>
                              <div className="course-details">
                                <h2>{val.title}, {val.course_id}</h2>
                                <h3>{val.dept_name}</h3>
                              </div>
                            </div>
                          </div>
                        ))
                      }
                    </React.Fragment>
                  ))
                }
              </div>
            )}

            {
              !coursedata.current || coursedata.current.length == 0 && (
                <h2>....loading....</h2>
              )

            }

            <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} className="modalform"
              overlayClassName="modal-overlay" onAfterOpen={fetchdata}  >
              {selectedCourse && (
                <div className="modal_div">
                  <button className="close-btn" onClick={() => setIsModalOpen(false)}>X</button>


                  <h2>{selectedCourse.title}</h2>
                  <p color="white">{selectedCourse.dept_name}</p>
                  <div style={{ overflow: "auto", maxHeight: "300px", overflowY: "auto" }}>
                    <table style={{ borderSpacing: '10px', margin: '0 auto' }}>
                      <thead>
                        <tr>
                          <th>Roll Number</th>
                          <th>Name</th>
                          <th>Department</th>
                          <th>Engagement Level</th>
                          <th> Extra-curricular Engagement Level</th>
                          <th> SEND</th>
                        </tr>
                      </thead>
                      <tbody>
                        {coursestud && coursestud.map((stud, index) => (
                          <tr key={index}>
                            <td>{stud.roll_num}</td>
                            <td>{stud.name}</td>
                            <td>{stud.dept_name}</td>
                            <td>{stud.eng_level}</td>
                            <td>{stud.ec_eng_level}</td>
                            <td><button className="button3" onClick={() => handleButtonClick(stud)}>Email</button></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                </div>
              )}
            </Modal>
            <Modal isOpen={isEmailModalOpen} onRequestClose={() => setIsEmailModalOpen(false)} className="modalform1" overlayClassName="modal-overlay">
              <form>
                <label htmlFor="subject">Subject:</label>
                <input type="text" id="subject" value={emailSubject} onChange={(e) => setEmailSubject(e.target.value)} />

                <label htmlFor="body">Body:</label>
                <textarea id="body" value={emailBody} onChange={(e) => setEmailBody(e.target.value)} />

                <button onClick={sendemail} className="button3">Send</button>
                <button onClick={() => setIsEmailModalOpen(false)} className="button3">Close</button>
              </form>
            </Modal>

          </div>


        </div>



      </div>

    </div>
  )
};