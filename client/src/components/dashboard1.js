import React, { useEffect, useState, useRef } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Stu_side from "./stu_side";
import Modal from 'react-modal';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { tzOffset } from "rrule/dist/esm/dateutil";
import InsightsForm from "./insightsform";
import Insights from "./insights";
import Self_question from "./self_question";
import moment from 'moment-timezone'
import { datetime, RRule, RRuleSet, rrulestr } from 'rrule'
import { Link as LinkScroll } from "react-scroll";
import { A, B, C, D, E, F, G, H, I, J, K, L, getObjectById, generateEvents } from './timeslots'
// const localizer = momentLocalizer(moment);
// const timezone = moment.tz.guess();
const localizer = momentLocalizer(moment);
const timezone = moment.tz.guess();
// const recurrenceRule = rrulestr('FREQ=WEEKLY;BYDAY=TU,TH;COUNT=10');

function Dashboard() {
  const navigate = useNavigate();
  const [Status, setStatus] = useState(false);
  const navlogin = () => {
    navigate("/");
  };
  var variable;
  var variab;
  // const [events, setEvents] = useState([]);

  const userdata = useRef(null);
  const coursedata = useRef(null);
  const deaddata = useRef(null);

  const insights = async (e) => {
    e.preventDefault();
    navigate("/insights");
  }

  const sendemail = async (e) => {
    console.log("Send Email");
    e.preventDefault();
    const response = await Axios.get("http://localhost:8000/sendemail");
    console.log("Came here");
    if (response.data.success) {
      alert("Check your email box");
    } else {
      alert("Error");
    }
  }

  var [datafetched, setDataFetched] = useState(false);
  async function userdetailsfetching() {
    const response = await Axios.get("http://localhost:8000/dashdisplay");
    if (response.data.err) {
      console.log("Query error!");
    } else {
      if (response.data.message) {
        console.log("Session error");
      } else {
        console.log(response);
        var userdataset = await userdatasetting(response);
        // setUserData(response.data.rows[0]);
        console.log("User data set");
        console.log(userdata);
      }
    }
  }
  async function userdatasetting(response) {
    console.log("reached user setting");
    //   setUserData(response.data.rows[0]);

    userdata.current = response.data.stud.rows[0];
    coursedata.current = response.data.course.rows;
    deaddata.current = response.data.deadline.rows;

    setDataFetched(true);
    return "Done";
  }
  const logout = () => {
    // setLoginStatus(false);
    Axios.get("http://localhost:8000/logout").then((response) => {
      console.log(response);
    });
    navigate("/");
  };
  useEffect(() => {
    Axios.get("http://localhost:8000/login").then((response) => {
      if (response.data.loggedIn === true) {
        //   setLoginStatus(response.data.user.rows[0].userID);
        setStatus(true);
        console.log(Status);
      }
    });

    userdetailsfetching();
    courseevent();
  }, [Status, datafetched]);
  const [events, Setevents] = useState([]);
  var courseevent = async () => {

    if (coursedata.current) {
      const eventArray = coursedata.current.flatMap((course) =>
        generateEvents(getObjectById(course.time_slot_id), course.title)
      );
      Setevents(eventArray);
    }
    if (deaddata.current) {
      const newEvents = deaddata.current.map(data => ({
        title: data.name,
        // start: new Date(data.start_time),
        // end: new Date(data.end_time),
        start: new Date(data.start_time),
        end: new Date(data.end_time),
      }));
      Setevents(prevEvents => [...prevEvents, ...newEvents]);
    }
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  // add a state variable to hold the course that was clicked
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeBlock, setActiveBlock] = useState(null);


  const handleClick = () => {
    setIsVisible(!isVisible);
  };
  const handleSubmit = async () => {
    setActiveBlock(null);
    window.location.reload(false);

  }
  const handleCheckboxChange = async (event, val) => {
    // const deadlineId = event.target.id;
    console.log("--------------------------------------");
    console.log(val);
    const result = await Axios.post("/api/handlecheck", {
      course_id: val.course_id,
      done: event.target.checked,
      inst_id: val.inst_id,
      name: val.name

    }).then((response) => {
      if (response.data.message) {
        alert("There seems to be a problem with our server. Please hang on while we fix it!");
      } else {
        console.log("Ippudocchindhii");

      }
      return response;

    })
    // const completed = event.target.checked;
    const { checked } = event.target;
    console.log("checkbox checking ");
    setstuddead(prevState => prevState.map(item => {
      if (item.id === val.id) {
        return { ...item, done: checked };
      }
      return item;
    }));
    console.log(val);
    console.log(checked);
    fetchdata();

  }
  const [studdead, setstuddead] = useState(null);
  const fetchdata = async () => {
    setstuddead(null);
    const wait = await Axios.post("/api/fetchstud", {
      course_id: selectedCourse.course_id

    }).then((response) => {
      if (response.data.message) {
        alert("There seems to be a problem with our server. Please hang on while we fix it!");
      } else {
        console.log("Ippudocchindhii");

      }
      return response;
    });
    console.log("result for fetch data");
    console.log("------------------------imthere------------------");

    console.log(wait.data.result.rows);
    setstuddead(wait.data.result.rows);

  }

  return (
    <div>
      <div>
        <nav>
          <Link to="/" className="site-title">
            We Care!
          </Link>
          <ul>
            {/* <a>
                      <LinkScroll
                        to='calendar'
                        spy={true}
                        smooth={true}
                        offset={-70}
                        duration={500}>
                          Timetable
                      </LinkScroll>
                    </a>
                    <a>
                      <LinkScroll
                        to='courses'
                        spy={true}
                        smooth={true}
                        offset={-70}
                        duration={500}>
                          Courses
                      </LinkScroll>
                    </a> */}
            {/* <a>
                      <LinkScroll
                        to='block1'
                        spy={true}
                        smooth={true}
                        offset={-70}
                        duration={500}
                        onClick={()=>{setActiveBlock('block1')}}>
                          Extra-Curriculars
                      </LinkScroll>
                    </a>
                    <a>
                      <LinkScroll
                        to='block2'
                        spy={true}
                        smooth={true}
                        offset={-70}
                        duration={500}
                        onClick={()=>{setActiveBlock('block2')}}>
                          Friends
                      </LinkScroll>
                    </a> */}
            <a href="#calendar" onClick={() => setActiveBlock('null')}>Timetable</a>
            <a href="#courses" onClick={() => setActiveBlock('null')}>Courses</a>
            <a href="#block1" onClick={() => setActiveBlock('block1')}>Extra-Curriculars</a>
            <a href="#block2" onClick={() => { setActiveBlock('block2') }}>Friends</a>
            <button onClick={logout} className='button3'>Logout</button>
          </ul>
        </nav>
        <div className='space-class'>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: "row" }}>
        <Stu_side />
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
              timeFormat="HH:mm:ss"
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
                                <h2>{val.title}</h2>
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
            {/* style={{ content: { width: '75%', height: '75%' ,float:'center'} }} */}

            <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} className="modalform"
              overlayClassName="modal-overlay" onAfterOpen={fetchdata}>
              {selectedCourse && (
                <div className="modal_div" >
                  <button className="close-btn" onClick={() => setIsModalOpen(false)}>X</button>
                  <h2>{selectedCourse.title}</h2>
                  <p color="white">{selectedCourse.dept_name}</p>
                  <p color="white">{selectedCourse.course_id}</p>


                  {

                    deaddata.current.filter((val) => val.course_id === selectedCourse.course_id).length > 0 && (
                      <div style={{ overflow: "auto", maxHeight: "300px", overflowY: "auto" }}>
                        <h2>Deadlines</h2>
                        <table>
                          <thead>
                            <tr>
                              <th></th>
                              <th >Title</th>
                              <th>Instructor ID</th>
                              <th>Start Time</th>
                              <th>End Time</th>
                            </tr>
                          </thead>
                          <tbody>
                            {studdead && studdead.map((val, key) => (



                              <tr key={key}>
                                <td style={{ paddingRight: '20px', maxWidth: '200px', wordWrap: 'break-word' }}>
                                  <input type="checkbox" id={val.id} name={val.name} checked={val.done} onChange={(e) => handleCheckboxChange(e, val)} />
                                </td>
                                <td style={{ paddingRight: '20px', maxWidth: '200px', wordWrap: 'break-word', paddingBottom: '20px' }}>{val.name}</td>
                                <td style={{ paddingRight: '20px', maxWidth: '200px', wordWrap: 'break-word', paddingBottom: '20px' }}>{val.inst_id}</td>
                                <td style={{ paddingRight: '20px', maxWidth: '200px', wordWrap: 'break-word', paddingBottom: '20px' }}>{val.start_time}</td>
                                <td style={{ paddingRight: '20px', maxWidth: '200px', wordWrap: 'break-word', paddingBottom: '20px' }}>{val.end_time}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>


                      </div>
                    )
                  }


                </div>
              )}

            </Modal>


          </div>

          <div id="block1" style={{ display: activeBlock === 'block1' ? 'block' : 'none' }}>
            {/* <h2 style={{textAlign:"center"}}> Self-Questionnaire</h2> */}
            {/* {isVisible && <p>Visible content for block 1</p>} */}
            <Self_question onchildSubmit={handleSubmit} />
          </div>
          <div id="block2" style={{ display: activeBlock === 'block2' ? 'block' : 'none' }}>
            {/* <h2 style={{textAlign:"center"}}>Block 2</h2> */}
            <Insights ok={null} />
            {/* {console.log(isVisible)} */}
            {/* {isVisible && } */}
          </div>
        </div>
      </div>
      {/* <div id="block1"> */}

    </div>
  );
}

export default Dashboard;

