import { Link ,useMatch,useResolvedPath} from 'react-router-dom';
import React, { useEffect, useRef, useState } from "react";
import ReactModal from 'react-modal';
import Axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Side_bar(){
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
  var [editassgn,setEditAssgn] = useState(false);
  var [deptcourse,setDeptcourse]=useState(false);
  var [deadline,setDeadline]=useState(false);
  var today = useRef(null);
  var [editpopup, setEditPopup] = useState(false);
  var [editassgnpopup, setEditassgnpopup] = useState(false);
  var [editattenpopup,setEditattenpopup] = useState(false);
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

  const togglepopup = async(e)=>{
      e.preventDefault();
      setEditPopup(!editpopup);
  }
  const toggleassgnpopup = async(e)=>{
    e.preventDefault();
    setEditassgnpopup(!editassgnpopup);
  }
  const toggleattenpopup = async(e)=>{
  e.preventDefault();
  setEditattenpopup(!editattenpopup);
}

  var editpersonalinfo = async(e)=>{
      e.preventDefault();
      if(editname==="" || editdept === ""){
          alert("None of the fields should be left empty!");
          return 0;
      } else {
          var wait = Axios.post("/editinstinfo",{
              editname: editname,
              editdept: editdept
          }).then((response)=>{
              console.log(response);
              if(response.data.message){
                  alert("There seems to be a problem with our server. Please hang on while we fix it!");
              } else{
                  console.log("Ippudocchindhii");
                  window.location.reload();
              }
              return response;
          });
      }
  }
  const handleChange = () =>async(e) => {
    // let updatedValue = {};
    // updatedValue = {"item1":"juice"};
    setDeptcourse(e.target.value);
  };
  console.log("-----------------hi-------------")
  console.log(coursedata);
 const assignment_add=()=>(e)=>{

 }


    return(
        <div className="side-board">
             <div className="entire">
        <div className="form_ok">
          <h2>Personal Information</h2>
          <div className="info-item">
            <span>Name:</span>
            <span>{instname.current}</span>
          </div>
          <div className="info-item">
            <span>ID:</span>
            <span>{instid.current}</span>
          </div>
          <div className="info-item">
            <span>Department:</span>
            <span>{instdept.current}</span>
          </div>
          <button className="button3" onClick={togglepopup}>EDIT</button>
                                <ReactModal
                                    isOpen = {editpopup}
                                    ariaHideApp={false}
                                    contentLabel = "Example Modal"
                                >
                                    <form className="form">
                                        <input
                                            className="form__input"
                                            type="text"
                                            placeholder="Name"
                                            value={editname}
                                            onChange={(e)=>{
                                                setEditName(e.target.value);
                                            }}
                                        />
                                        <input
                                            className="form__input"
                                            type="text"
                                            placeholder="Department Name"
                                            value={editdept}
                                            onChange={(e)=>{
                                                setEditDept(e.target.value);
                                            }}
                                        />
                                        <button className="button2" onClick={e => editpersonalinfo(e)}>SUBMIT</button>
                                        <button className="button2" onClick={togglepopup}>CLOSE</button>
                                    </form>
                                </ReactModal>
                                
        </div>
            <div className='add_assgn'>
            <h2>add Assignment</h2>
            <button className="button3" onClick={toggleassgnpopup}>ADD</button>
            <ReactModal
                                    isOpen = {editassgnpopup}
                                    ariaHideApp={false}
                                    contentLabel = "Example Modal"
                                >
                                    <form className="form">
                                        
                                       
                                        {coursedata.current && 
                                            <select value = {deptcourse} onChange={handleChange() }className="form__input">
                                                <option value="">Select an option</option> 
                                            {coursedata.current.map((item,index)=>(
                                                <option value={item.title}>{item.title}</option>
                                            ))}
                                            </select>
                                        }
            <input
                                            className="form__input"
                                            type="text"
                                            placeholder="Title"
                                            
                                            onChange={(e)=>{
                                                setEditAssgn(e.target.value);
                                            }}
                                        />
                    <input  className="form__input" type="datetime-local" placeholder='Deadline' onChange={(e)=>{
                            setDeadline(e.target.value);
                    }} />
                                        <button className="button2" onClick={e => assignment_add(e)}>SUBMIT</button>
                                        <button className="button2" onClick={toggleassgnpopup}>CLOSE</button>
                                    </form>
                                </ReactModal>
            </div>
            <div className='add_assgn'>
            <h2>Upload Attendance</h2>
            <button className="button3" onClick={toggleattenpopup}>ADD</button>
            <ReactModal
                                    isOpen = {editattenpopup}
                                    ariaHideApp={false}
                                    contentLabel = "Example Modal"
                                    classNames={{
                                        overlay: "customOverlay",
                                        modal: "customModal",
                                      }}>
                                    <form className="form">
                                         
                                    {coursedata.current && 
                                            <select value = {deptcourse} onChange={handleChange() }className="form__input">
                                                <option value="">Select an option</option> 
                                            {coursedata.current.map((item,index)=>(
                                                <option value={item.title}>{item.title}</option>
                                            ))}
                                            </select>
                                        }
                                       
                                        
            <input
                                          
                                            type="file"
                                            accept=".csv"
                                            
                                            onChange={(e)=>{
                                                setEditAssgn(e.target.value);
                                            }}
                                        />
                                         
                   
                                        <button className="button2" onClick={e => assignment_add(e)}>SUBMIT</button>
                                        <button className="button2" onClick={toggleattenpopup}>CLOSE</button>
                                    </form>
                                </ReactModal>
            </div>
        </div>
      </div>
    );
}