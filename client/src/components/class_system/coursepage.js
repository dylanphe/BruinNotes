// TODOs: Input validation 
//        More tests on the comparator function
//        https://stackoverflow.com/questions/43164554/how-to-implement-authenticated-routes-in-react-router-4/43171515#43171515
import React, {useState, useEffect} from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import HomeBtn from './homebtn';
import {ImArrowUpLeft2} from 'react-icons/im'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import './coursepage.css';


// Sample data structure (subject to change)
// Based on the class diagrams and mockups in the proposal 
const sampleCourseBucket = {
	"department": "COM SCI",
	"courseNumber": 130,
	"courseList": [
    {"id": 1, "term": "Fall 2022", "instructor": "Kim, Miryung"},
    {"id": 2, "term": "Fall 2021", "instructor": "Kim, Miryung"}, 
    {"id": 3, "instructor": "John Doe"}, 
    {"id": 4, "term": "Spring 2022", "instructor": "DJ, JAYS"},
    {"id": 5, "term": "Fall 2022", "instructor": "DJ, JAYS"}
	]
};


/* To convert the above to the below using mongodb pipeline 
from pymongo import MongoClient

# Requires the PyMongo package.
# https://api.mongodb.com/python/current

client = MongoClient('')
result = client[''][''].aggregate([
    {
        '$unwind': {
            'path': '$courseList'
        }
    }, {
        '$group': {
            '_id': '$courseList.instructor', 
            'terms': {
                '$push': '$courseList.term'
            }
        }
    }, {
        '$addFields': {
            'instructor': '$_id'
        }
    }
])
*/
const sampleCourseData = [{
    "instructor": "Kim, Miryung",
    "terms": ["Fall 2022", "Fall 2021"],
    "colorCode": 1,
  }, {
    "instructor": "DJ, JAYS",
    "terms": ["Spring 2022", "Fall 2022"],
    "colorCode": 2,
  }, {
    "instructor": "John Doe", 
    "terms": [],
    "colorCode": 3,
}];

const sampleCourseDataEmt = [];

// route: /c/:coursename
function CoursePage(props) {
  
  let params = useParams();
  // let location = useLocation();
  let coursename = params.coursename;
  let uid = params.uid;
  console.log(params.coursename);    // debug

  const [courseData, setCourseData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [show, setShow] = useState(false);
  const [newClassForm, setNewClassForm] = useState({});
  // const [msg, setMsg] = useState("hiiii");  // TODO: change default message
  let msg = "hiiiiii"; // TODO: change default message
  const [showMsg, setShowMsg] = useState(false);

  // TODO: maybe refactoring into functions handleClose(para) and handleShow(para)? 
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseMsg = () => setShowMsg(false);
  const handleShowMsg = () => setShowMsg(true);

  const num_colors = 6; 

  useEffect(() => {
    // ref: https://maxrozen.com/fetching-data-react-with-useeffect
    // async & await are just for display rn 
    async function getCourseData()  {
      const response = await sampleCourseData;
      // const response = await sampleCourseDataEmt;
      const data = response;
      setCourseData(data);
      console.log('getCourseData'); //debug
      console.log("courseData.length:", courseData.length);
    };

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

  function validateYear(year) {
    return true;
  }

  // ref: https://learningprogramming.net/modern-web/react-functional-components/use-onsubmit-event-in-react-functional-components/
  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    newClassForm[name] = value;
    setNewClassForm(newClassForm);
  }

  const handleSubmit = async (e) => {
    // !TODO: validate input 
    // e.preventDefault();
    console.log(newClassForm);
    const isProfExist = (newClassForm['professor_select'] != null);
    // TODO: might need to assert that fullname == null whenever professor_select exists
    
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
        newColorCode = (courseData[0].colorCode + 4) % 6 + 1;
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
      courseData[course_idx].terms.sort(compareTerms).reverse();
      setCourseData(courseData);
    }
    // /////////////////////////////////////////////////////////
  }

  //const color1= '#6B8E23';
  //const color2= '#EC7063';
  //const color3= '#A569BD';
  //const color4= '#34495E';
  //const color5= '#F5B041';
  //const color6= '#2D68C4';
  //const colorCodes = {color1, color2, color3, color4, color5, color6};

  function professor(courseDataElement) {
    // courseDataElement = {"instructor": "DJ, JAYS","term": ["Spring 2022", "Fall 2022"]};
    let instructor = courseDataElement.instructor;
    // let instructorColor = courseDataElement.colorCode;
    // let instructorColor = 'var(--color' + courseDataElement.colorCode + ')';
    let instructorColor = colorNumToColorCode(courseDataElement.colorCode);
    // console.log("colorCode:", courseDataElement.colorCode);

    return (
      <div key={instructor}>
        <div id='coursepage-instructor' style={{backgroundColor: instructorColor}} key={instructor}>
          <span id='coursepage-prof-title'><b>PROFESSOR</b></span>:
          <span> {courseDataElement.instructor}</span>
        </div>
        <div id="coursepage-term-list">
          <ul className='term-under-instructor'>
            {courseDataElement.terms.map((term) => 
              <li key={term} className='lnk'>
                {/* <Link to={"".concat("/c/", coursename, "/", instructor, "/", term)} className='lnk'>{term}</Link> */}
                <Link className="lnk" to={"".concat("/", uid, "/", coursename, "/", instructor, "/", term)}>{term}</Link>
              </li>)}
          </ul>
        </div>
      </div>
    );
  }

  function Professors() {
    if (!courseData.length) {return null;}
    return (courseData.map((courseDataElement) => professor(courseDataElement)));
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
        {!courseData.length && <NoClass />}
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
                <br/>
                <div className='modal-input-box'>
                  <span id='modal-input-label'>Quarter</span>
                  <input type="text" name="quarter" id="modal-input" placeholder="Fall/Winter/Spring/Summer" onChange={handleChange}></input>
                </div>
                <br/>
                <div className='modal-input-box'>
                  <span id='modal-input-label'>Year</span>
                  <input type="number" name='year' min="1900" max="2099" step="1" id="modal-input" placeholder="YYYY" onChange={handleChange}></input> 
                </div>
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
        </>
        <div className='coursepage-class-list'>
          <Professors />
        </div>
        <HomeBtn/>
      </div>
    </div>
  ); 
}

export default CoursePage;