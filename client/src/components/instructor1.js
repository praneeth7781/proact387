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
// import Courses from "courses"; 
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
        <NavBar/>
       
               <div style={{display:'flex'}}>
               <Side_bar/>
               <div style={{ height: "100vh" ,width:"100%"}}>           
               <Calendar
    events={events}
    startAccessor="start"
    endAccessor="end"
    // defaultDate={moment().toDate()}
    style={{ height: "100%" ,width:"100%"}}
    localizer={localizer}
    />      
    </div>      
          
                   
                   </div>
            </div>   
       
                     
                                 
                                        
           
                           
            
    )
};









