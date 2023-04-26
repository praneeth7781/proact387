import NavBar from "./navbar"
import Side_bar from "./side_bar";
// import { useNavigate } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import Modal from 'react-modal';
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import "../style/instructor1.css";
export default function Courses(){
    
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
                <div className="courses">
                                {/* <div>
                                    <h2>Courses</h2>
                                </div> */}
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
        
       
                       
        
)
}