// import React from 'react';
import { Link ,useMatch,useResolvedPath} from 'react-router-dom';
import React, { useEffect, useRef, useState } from "react";
import ReactModal from 'react-modal';
import Axios from "axios";
import { useNavigate } from "react-router-dom";

function NavBar() {


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
    // const [instname, setInstName] = useRef("Name");
    // const [instid, setInstID] = useRef("2000");
    // const [instdept, setInstDept] = useRef("Comp. Sci.");
    // const [courses, ]

    var infofetch = async () => {
        var result = await Axios.get("/instructorinfo").then((response) => {
            return response;
        });
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
                    // setEdited(!edited);
                    // setEditPopup(false);
                }
                return response;
            });
            // if((await wait).data.message){
            //     alert("There seems to be a problem with our server. Please hang on while we fix it!");
            // } else{
            //     console.log("Vacchindhi!");
            //     setEdited(!edited);
            //     setEditPopup(false);
            // }
        }
    }

    const logout = () => {
        // setLoginStatus(false);
        Axios.get("http://localhost:8000/logout").then((response) => {
            console.log(response);
        });
        navigate("/");
    };
    
  return (
    <div className="nav-container">
      <nav className="nav">
        <Link to="/" className="site-title">
          Site Name
        </Link>
        <ul>
          <CustomLink to="/instructor">Home</CustomLink>
          <CustomLink to="/instructor/courses">Courses</CustomLink>
          <button onClick={logout} className='button3'>Logout</button>
        </ul>
      </nav>

      
    </div>
  );

  
}

export default NavBar;
function CustomLink({ to, children, ...props }) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath.pathname, end: true })
  
    return (
      <li className={isActive ? "active" : ""}>
        <Link to={to} {...props}>
          {children}
        </Link>
      </li>
    )
  }
