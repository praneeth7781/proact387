import React, {useRef, useState} from 'react';
import Axios from 'axios';
import "../style/instructor.css";
import { useParams } from 'react-router-dom';

// course details, instructors, number of students taking the course, deadlines

export default function Course() {

    Axios.defaults.withCredentials = true;

    let { course_id } = useParams();
    var coursename = useRef("Name");
    var coursedept = useRef("Department");
    var [editname, setEditName] = useState(coursename.current);
    var [editdept, setEditDept] = useState(coursedept.current);
    var [editpopup, setEditPopup] = useState(false);

    const togglepopup = async(e) => {
        e.preventDefault();
        setEditPopup(true);
    }

    const editcourseinfo = async(e)=>{
        e.preventDefault();
        if(editname==="" || editdept===""){
            alert("None of the fields should be left empty");
            return 0;
        } else {
            var wait = Axios.post("/editcourseinfo",{
                editname: editname,
                editdept: editdept
            }).then((response)=>{
                console.log(response);
                if(response.data.message){
                    alert("There seems to be a problem with our server. Please hang on while we fix it!");
                } else{
                    window.location.reload();
                }
            })
        }
    }
    
    var infofetch = async () =>{
        var result = await Axios.post("/courseinfo",{course_id:course_id}).then((response)=>{
            return response;
        });
        if(result.data.message){
            alert("There seems to be a problem with our server. Please hang on while we fix it!");
            return 0;
        } else if(result.data.courseerror){
            alert("Data corresponding to this course is not found!");
            return 0;
        } else if(result.data.noinstructor){
            
        }
    }

    return (
        <div>Hello</div>
    //     <div className="dashboard-body">
    //         <div className="dashboard-main">
    //             <div className="personal-info">
    //                 <h2>Course Information</h2>
    //                 <div className="info-item">
    //                     <span>Name:</span>
    //                     <span>{coursename.current}</span>
    //                 </div>
    //                 <div className="info-item">
    //                     <span>ID:</span>
    //                     <span>{course_id}</span>
    //                 </div>
    //                 <div className="info-item">
    //                     <span>Department:</span>
    //                     <span>{coursedept.current}</span>
    //                 </div>
    //                 <button className="button2" onClick={togglepopup}>EDIT</button>
    //                 <ReactModal
    //                     isOpen={editpopup}
    //                     ariaHideApp={false}
    //                     contentLabel="Example Modal"
    //                 >
    //                     <form className="form">
    //                         <input
    //                             className="form__input"
    //                             type="text"
    //                             placeholder="Name"
    //                             value={editname}
    //                             onChange={(e) => {
    //                                 setEditName(e.target.value);
    //                             }}
    //                         />
    //                         <input
    //                             className="form__input"
    //                             type="text"
    //                             placeholder="Department Name"
    //                             value={editdept}
    //                             onChange={(e) => {
    //                                 setEditDept(e.target.value);
    //                             }}
    //                         />
    //                         <button className="button2" onClick={e => editcourseinfo(e)}>SUBMIT</button>
    //                         <button className="button2" onClick={togglepopup}>CLOSE</button>
    //                     </form>
    //                 </ReactModal>
    //             </div>
    //             <div className="courses">
    //                 <div>
    //                     <h2>Courses</h2>
    //                 </div>
    //                 <div className="courses-grid">
    //                     {coursedata.current.map((val, key) => {
    //                         return (
    //                             <div key={key}>
    //                                 <div className="course" onClick={async () => {
    //                                     gotocourse(val.course_id);
    //                                 }}>
    //                                     <div className="course-details">
    //                                         <h3>{val.title}, {val.dept_name}</h3>
    //                                     </div>
    //                                 </div>
    //                             </div>
    //                         );
    //                     })}
    //                 </div>
    //             </div>
    //             <div className="today-classes">
    //                 <div>
    //                     <h2>Today's Classes</h2>
    //                 </div>
    //                 <div className="class-grid">
    //                     {today.current.map((val, key) => {
    //                         return (
    //                             <div key={key}>
    //                                 <div className="class">
    //                                     <div className="class-details">
    //                                         <h3>{val.title}, {val.course_id}</h3>
    //                                         <p>{val.start_hr}:{val.start_min} {val.start} - {val.end_hr}:{val.end_min} {val.end}</p>
    //                                     </div>
    //                                     {/* <div className="class-status">
    //                                 <span>Active</span>
    //                             </div> */}
    //                                 </div>
    //                             </div>
    //                         );
    //                     })}
    //                 </div>
    //             </div>
    //         </div>
    //     </div>

    )

};