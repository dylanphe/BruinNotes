// TODOs: Handle the case when the user inputs an existing professor name but not quarter or year
//        More tests on the comparator function
//        https://stackoverflow.com/questions/43164554/how-to-implement-authenticated-routes-in-react-router-4/43171515#43171515
import React, {useState, useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import {ImArrowUpLeft2} from 'react-icons/im'; 
import {BsFillStarFill} from 'react-icons/bs'; 
import HomeBtn from './homebtn';
import dataToCourses from './datatocourse.js';
import validateAddCourseInput from './validateInput.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './coursepage.css';
import { Rating } from 'react-simple-star-rating'

/*
Expected data structure from get:
[{
    "courseName": "COM SCI 130",
    "instructor": "Kim, Miryung",
    "term": "Fall 2022"
    "colorCode": 1,
    "notes": [...],
  }, {
    "courseName": "COM SCI 130",
    "instructor": "Kim, Miryung",
    "term": "Fall 2021"
    "colorCode": 1,
    "notes": [...],
  }, {
    "courseName": "COM SCI 130",
    "instructor": "DJ, JAYS",
    "term": "Spring 2022",
    "colorCode": 2,
    "notes": [...],
  }, {
    "courseName": "COM SCI 130",
    "instructor": "DJ, JAYS",
    "term": "Spring 2021"
    "colorCode": 2,
    "notes": [...],
  }, {
    "courseName": "COM SCI 130",
    "instructor": "John Doe", 
    "term": "",
    "colorCode": 3,
    "notes": [...],
}];
*/

// route: /:uid/:coursename
function CoursePage(props) {
  
  let params = useParams();
  // let location = useLocation();
  let coursename = params.coursename;
  let uid = params.uid;
  console.log(params.coursename);    // debug
  console.log(params.uid);
  console.log(props.uid);

  const [courseData, setCourseData] = useState([]);
  const [professorData, setProfessorData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [show, setShow] = useState(false);
  const [newClassForm, setNewClassForm] = useState({});
  // const [inputInstructor, setInputInstructor] = useState("");
  // const [inputQuarter, setInputQuarter] = useState("");
  // const [inputYear, setInputYear] = useState("");
  // const [msg, setMsg] = useState("hiiii");  // TODO: change default message
  let msg = "Professor Added"; // TODO: change default message
  const [showMsg, setShowMsg] = useState(false);
  const [instructorInvalidMsg, setInstructorInvalidMsg] = useState("");
  const [quarterInvalidMsg, setQuarterInvalidMsg] = useState("");
  const [yearInvalidMsg, setYearInvalidMsg] = useState("");

  // TODO: maybe refactoring into functions handleClose(para) and handleShow(para)? 
  const handleClose = () => {
    setShow(false); 
    setInstructorInvalidMsg(""); setQuarterInvalidMsg(""); setYearInvalidMsg("");
    setNewClassForm({});
  };
  const handleShow = () => setShow(true);
  const handleCloseMsg = () => setShowMsg(false);

  const num_colors = 10;

  // ref: https://maxrozen.com/fetching-data-react-with-useeffect
  //      https://axios-http.com/docs/example
  //      https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Promises
  async function getCourseData()  {
    console.log('getCourseData'); 
    setLoading(true);
    try {
      const url = "http://127.0.0.1:8000/searchcourses/" + coursename;
      const response = await axios.get(url)
      ;
      // const response = await sampleCourseDataEmt;
      // console.log(response);
      const data = await response.data;
      console.log("response:", response);
      console.log("data:", data);
      const courses = dataToCourses(data, compareTerms);
      console.log("courses:", courses);
      setCourseData(courses);
      console.log("courseData.length:", courseData.length);      
    } 
    catch (error) {
      console.error("Could not get courses:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getCourseData();
    console.log('useEffect'); //debug
  }, []);

  useEffect(() => {
    setShow(props.show);
  }, [props]);

  const getProfessors = (courses) => {
    return (courses.length) ? (courses.map(course => course.instructor)) : [];
  };

  // console.log("professors: ", courseData, getProfessors(courseData));

  // setCourseBucket(sampleCourseBucket);

  // debug
  console.log("courseData", courseData);
  if (courseData.length >= 2) {
    console.log("courseData.length:", courseData.length);
    console.log(courseData[1].instructor);
  }
  console.log("professors:", getProfessors(courseData));

  function colorNumToColorCode(colorNum) {
    return 'var(--color' + colorNum + ')';
  }

  // ref: https://learningprogramming.net/modern-web/react-functional-components/use-onsubmit-event-in-react-functional-components/
  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    newClassForm[name] = value;
    setNewClassForm(newClassForm);
    console.log("newClassForm in handleChange:", newClassForm);
  }

  function compareTerms(term1, term2) { 
    function compareQuarter(q1, q2) { 
      const qToInt = {'Winter': 0, 'Spring': 1, 'Summer': 2, 'Fall': 3};
      const q1int = qToInt[q1], q2int = qToInt[q2];
      return q1int - q2int;
    }
    // ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split 
    // ASSUME a "quarter year" string. (ASSUME input validation)
    const [qtr1, yr1] = term1.split(' ');
    const [qtr2, yr2] = term2.split(' ');
    if (yr1 !== yr2) {
      return yr1 - yr2;
    } else {
      return compareQuarter(qtr1, qtr2);
    }
  }


  /* Expected submit format:
  {
    instructor: "Kim, Miryung",
    quarter: "Fall",
    year: "2022",
    courseName: "COM SCI 130"
    colorCode: 1
  }
  */
  const handleSubmit =  (e) => {
    // !TODO: validate input 
    // e.preventDefault();
    setInstructorInvalidMsg(""); setQuarterInvalidMsg(""); setYearInvalidMsg("");

    console.log("newClassForm:", newClassForm);
    const isProfExist = (newClassForm['professor_select'] != null);
    // TODO: might need to assert that fullname == null whenever professor_select exists
    
    const newClassIntermediate = {
      instructor: isProfExist? newClassForm['professor_select'] : newClassForm['fullname'], 
      quarter: newClassForm['quarter'], 
      year: newClassForm['year']
    };

    const inputValidateResult = validateAddCourseInput(newClassIntermediate);
    const isInputValidate = (inputValidateResult.isInstructorValid && inputValidateResult.isQuarterValid && inputValidateResult.isYearValid);
    console.log(isInputValidate);
    if (!isInputValidate) {
      console.log("inputValidateResult:", inputValidateResult);
      if (!inputValidateResult.isInstructorValid) {
        console.log(1);
        setInstructorInvalidMsg(inputValidateResult.instructorValidateMessage);
      }
      if (!inputValidateResult.isQuarterValid) {
        console.log(2);
        setQuarterInvalidMsg(inputValidateResult.quarterValidateMessage);
        // console.log(quarterInvalidMsg);
      }
      if (!inputValidateResult.isYearValid) {
        console.log(3);
        setYearInvalidMsg(inputValidateResult.yearValidateMessage);
        // console.log(yearInvalidMsg);
      }   
      console.log("invalid", instructorInvalidMsg, quarterInvalidMsg, yearInvalidMsg);   
    }
    else {  // Input is valid
      setInstructorInvalidMsg(""); setQuarterInvalidMsg(""); setYearInvalidMsg(""); 

      // Get colorCode 
      let colorCode = 1;
      const course_idx = courseData.findIndex((course) => course.instructor === newClassIntermediate['instructor']);
      if (course_idx === -1) { // Generate a new colorCode for a new professor 
        console.log("courseData.length:", courseData.length);
        if (courseData.length) {
          // colorCode = (courseData[0].colorCode + (num_colors-2)) % (num_colors) + 1;
          colorCode = courseData.length % num_colors + 1;
          console.log("newColorCode", colorCode);
        }
      }
      else {  // Use the existing color code
        colorCode = courseData[course_idx].colorCode;
      }

      const newClassSubmit = {
        "instructor": newClassIntermediate["instructor"],
        "quarter": newClassIntermediate["quarter"], 
        "year": newClassIntermediate["year"],
        "courseName": coursename,
        "colorCode": colorCode
      };

      console.log("newClassSubmit:", newClassSubmit);
      axios.post("http://127.0.0.1:8000/addcourse", newClassSubmit)
      // axios.post("http://localhost:8000/addcourse", newClassSubmit)
      .then(response => {
        console.log("post response:", response);
        setModalInputTextShown(true);
        setModalInputSelectShown(false);
        handleClose();
        setShowMsg(true);
      })
      .then(() => {getCourseData(); setNewClassForm({});})
      axios.post("http://127.0.0.1:8000/addprofessor/"+newClassIntermediate['instructor'])
    }

    /*
    const newClassInfo = {
      instructor: isProfExist? newClassForm['professor_select'] : newClassForm['fullname'], 
      term: (newClassForm['quarter'] + ' ' + newClassForm['year']),
      // colorCode: 2, // temporarily set to color2. TODO: assign to different colors 
    };
    console.log(newClassInfo);
    // await fetch('/Coursepage/add', {
    //   method: "PUT", 
    //   headers: {"Content-Type": "application/json"}, 
    //   body: JSON.stringify({msg: "hello"})
    // })    
    setModalInputTextShown(true);
    setModalInputSelectShown(false);
    handleClose();
    setShowMsg(true);
    // ////////// For demo propose, subject to change //////////
    // Add input to the `courseData` to simulate inserting to the db 
    // ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
    const course_idx = courseData.findIndex((course) => course.instructor === newClassInfo['instructor']);
    if (course_idx === -1) { // Add a new professor to courseData
      let newColorCode = 1;
      console.log("courseData.length:", courseData.length);
      if (courseData.length) {
        newColorCode = (courseData[0].colorCode + (num_colors-2)) % (num_colors) + 1;
        console.log("newColorCode", newColorCode);
      }
      let newProf = {
        instructor: newClassForm['fullname'], 
        terms: [(newClassForm['quarter'] + ' ' + newClassForm['year'])], 
        colorCode: newColorCode
        ,
      };
      courseData.unshift(newProf);  
      setCourseData(courseData);
    } else {  // Add term to an existing professor 
      let l = courseData[course_idx].terms.length; 
      courseData[course_idx].terms.push(newClassForm['quarter'] + ' ' + newClassForm['year']);
      let l2 = courseData[course_idx].terms.length; 
      console.log("l:", l, "l2:", l2);
      courseData[course_idx].terms.sort(compareTerms).reverse();
      setCourseData(courseData);
    }
    // /////////////////////////////////////////////////////////
    */

    
  }

  //const color1= '#6B8E23';
  //const color2= '#EC7063';
  //const color3= '#A569BD';
  //const color4= '#34495E';
  //const color5= '#F5B041';
  //const color6= '#2D68C4';
  //const colorCodes = {color1, color2, color3, color4, color5, color6};
  const [showRating, setShowRating] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [profRating, setProf] = useState('None');


  function handleChangeRating(r) {
    setUserRating(r);
    console.log('hii', r);
  }

  async function handleSubmitRating(prof, rating) {
    if (rating != 0) {
      axios.put("/addrating/"+prof+"/"+rating)
      .then(res => {
          console.log(res.data);
          handleCloseRating();
        }
      );

    }
  }

  async function handleGetRating(prof) {
    const getRating = async () => {
      if (prof != null) {
        axios.get("/getrating/"+prof)
        .then(res => {
          let result = res.data;
          console.log(result);
          return result;
        });
      }
    };

    const globalRating = await getRating();
    console.log(globalRating);
  }


  const onPointerEnter = () => console.log('Enter');
  const onPointerLeave = () => console.log('Leave');
  const onPointerMove = (value, index) => console.log(value, index);

  function handleShowRating(instructor) {
    setProf(instructor);
    setShowRating(true);
  }

  function handleCloseRating() {
    console.log(userRating);
    setShowRating(false);
    setUserRating(0);
  }

  function Professor(courseDataElement) {
    // courseDataElement = {"instructor": "DJ, JAYS","term": ["Spring 2022", "Fall 2022"]};
    let instructor = courseDataElement.instructor;
    // let instructorColor = courseDataElement.colorCode;
    // let instructorColor = 'var(--color' + courseDataElement.colorCode + ')';
    let instructorColor = colorNumToColorCode(courseDataElement.colorCode);
    // console.log("colorCode:", courseDataElement.colorCode);
    const [profRating, setProfRating] = useState('');
    axios.get("/getrating/"+instructor)
      .then(res => {
        let result = res.data;
        setProfRating(result);
    });

    return (
      <div key={instructor} className='prof-main'>
        <div id='coursepage-instructor' style={{backgroundColor: instructorColor}} key={instructor}>
          <span id='coursepage-prof-title'><b>PROFESSOR</b></span>:
          <span> {courseDataElement.instructor}</span>
          <div className='rate'> 
            <span className='score'>{profRating}</span>
            <button type="button" id="rating" className='misc-button' onClick={e => handleShowRating(instructor)}><BsFillStarFill/></button>
          </div>
        </div>
        <div id="coursepage-term-list" >
          <ul className='term-under-instructor'>
            {courseDataElement.terms.map((term) => 
              <li key={term} className='lnk'>
                <Link className="lnk" to={"".concat("/", uid, "/", coursename, "/", instructor, "/", term)}>{term}</Link>
              </li>)}
          </ul>
        </div>
      </div>
    );
  }

  function Professors() {
    if (!courseData.length) {return null;}
    return (courseData.map((courseDataElement) => Professor(courseDataElement)));
  }

  const [isModalInputTextShown, setModalInputTextShown] = useState(true);
  const [isModalInputSelectShown, setModalInputSelectShown] = useState(false);

  function checked() {
    setModalInputTextShown(!isModalInputTextShown);
    setModalInputSelectShown(!isModalInputSelectShown);
  }

  function NoClass() { 
    return (
    <div id='no-class'>
      No professor for this course yet ... <br />
      Add a professor today <ImArrowUpLeft2 />
    </div>);
  }

  // require('react-dom');
  // window.React2 = require('react');
  // console.log(window.React1 === window.React2);

  return (
    <div className='coursepage-main-body'>
      
      <div className='coursepage-title-box'>
        <h1 className='coursepage-title'>{coursename}</h1>
        <div className='coursepage-nav-button'>
          <button type='button' className='coursepage-btn' onClick={handleShow}>+ Add Professor and Quarter</button>
        </div>
      </div>
      <div className='coursepage-body'>
        {(!courseData.length && !loading ) ? <NoClass /> : null}
        <> {/* ref: https://react-bootstrap.github.io/components/modal/ */}
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Enter Professor and Quarter Below</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form action="#">
                <div className='modal-input-box'>
                  <span>Add Quarter to an Existing Professor</span>
                  <input type="checkbox" id="modal-input-label" onClick={checked}></input>
                </div>
                <br/>
                {isModalInputTextShown && ( 
                <div className='modal-input-box'>
                  <span id='modal-input-label'>Full Name</span>
                  <input type="text" name="fullname" id="modal-input" onChange={handleChange} placeholder="Last-Name, First-Name"></input>
                </div>
                )}
                {isModalInputSelectShown && ( 
                <div className='modal-input-box'>
                  <span id='modal-input-label'>Professor</span>
                  <div id='modal-input'>
                    {/* <Form action="#"> */}
                      <select name="professor_select" id='modal-input-select' onChange={handleChange}>
                        <option value="select">Select a Professor</option>
                        {/* <option value="javascript">JavaScript</option>  TODO */}
                        {getProfessors(courseData).map(prof => <option value={prof} key={prof}>{prof}</option>)}
                      </select>
                    {/* </Form> */}
                  </div>
                </div>
                )}
                <span className='invalidMsg'>{instructorInvalidMsg !== "" ? instructorInvalidMsg : "  "}</span>
                <br/>
                <div className='modal-input-box'>
                  <span id='modal-input-label'>Quarter</span>
                  {/* <input type="text" name="quarter" id="modal-input" placeholder="Fall/Winter/Spring/Summer" onChange={handleChange}></input> */}
                  {/* <QuarterChkBox /> */}
                  {['Fall', 'Winter', 'Spring', 'Summer'].map((term) => 
                    <span key={term} className="modal-qtr">
                      <label htmlFor={term}>{term}</label>{'   '}
                      <input type="radio" name='quarter' className="modal-qtr-chk-box" value={term} onClick={handleChange}></input>
                    </span>)}
                </div>
                <span className='invalidMsg'>{quarterInvalidMsg !== "" ? quarterInvalidMsg : "  "}</span>
                <br/>
                <div className='modal-input-box'>
                  <span id='modal-input-label'>Year</span>
                  <input type="number" name='year' min="1900" max="2099" step="1" id="modal-input" placeholder="YYYY" onChange={handleChange}></input> 
                </div>
                <span className='invalidMsg'>{yearInvalidMsg !== "" ? yearInvalidMsg : < br />}</span>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={/*handleClose*/ handleSubmit}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
          {/* <AddClassMsg /> */}
          <Modal show={showMsg} onHide={handleCloseMsg}>
            <Modal.Body 
              // style={{display: 'flex'}}
            >
              {msg}{'     '}
              <Button variant="success" onClick={/*handleClose*/ handleCloseMsg} style={{float: 'right'}}>
                  OK
              </Button>
            </Modal.Body>
          </Modal>
          <Modal show={showRating} onHide={handleCloseRating}>
              <Modal.Header closeButton>
                <Modal.Title>Rating: {profRating}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className ='rate-modal'>
                  <Rating
                    onClick={handleChangeRating}
                    onPointerEnter={onPointerEnter}
                    onPointerLeave={onPointerLeave}
                    onPointerMove={onPointerMove}
                    /* Available Props */
                  />
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseRating}>
                  Close
                </Button>
                <Button variant="primary" onClick={e => handleSubmitRating(profRating, userRating)}>
                  Rate
                </Button>
              </Modal.Footer>
            </Modal>
        </>
        <div className='coursepage-class-list'>
          <Professors />
        </div>
        <HomeBtn uid={uid}/>
      </div>
    </div>
  ); 
}

export default CoursePage;