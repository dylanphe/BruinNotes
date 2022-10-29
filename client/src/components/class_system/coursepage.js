// TODO: https://stackoverflow.com/questions/43164554/how-to-implement-authenticated-routes-in-react-router-4/43171515#43171515
import React, {useState, useEffect} from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import './coursepage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomeBtn from './homebtn';

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
    "terms": ["Fall 2022", "Fall 2021"]
  }, {
    "instructor": "DJ, JAYS",
    "terms": ["Spring 2022", "Fall 2022"]
  }, {
    "instructor": "John Doe", 
    "terms": []
  }]

// route: /c/:coursename
function CoursePage(props) {
  
  let params = useParams();
  // let location = useLocation();
  let coursename = params.coursename;
  console.log(params.coursename);    // debug

  const [courseData, setCourseData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [show, setShow] = useState(false);
  const [newClassForm, setNewClass] = useState({});
  // const [msg, setMsg] = useState("hiiii");  // TODO: change default message
  let msg = "hiiiiii"; // TODO: change default message
  const [showMsg, setShowMsg] = useState(false);

  // TODO: maybe refactoring into functions handleClose(para) and handleShow(para)? 
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseMsg = () => setShowMsg(false);
  const handleShowMsg = () => setShowMsg(true);

  useEffect(() => {
    // ref: https://maxrozen.com/fetching-data-react-with-useeffect
    // async & await are just for display rn 
    async function getCourseData()  {
      const response = await sampleCourseData;
      const data = response;
      setCourseData(data);
      console.log('getCourseData'); //debug
    };

    getCourseData();
    console.log('useEffect'); //debug
  }, []);

  useEffect(() => {
    setShow(props.show);
  }, [props]);

  // setCourseBucket(sampleCourseBucket);

  // debug
  console.log(courseData);
  if (courseData.length) {
    console.log(courseData[1].instructor);
  }

  // ref: https://learningprogramming.net/modern-web/react-functional-components/use-onsubmit-event-in-react-functional-components/
  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    newClassForm[name] = value;
    setNewClass(newClassForm);
  }

  const handleSubmit = (e) => {
    // e.preventDefault();
    console.log(newClassForm);
    const newClassInfo = {instructor: newClassForm['fullname'], term: (newClassForm['quarter'] + ' ' + newClassForm['year'])};
    console.log(newClassInfo);
    handleClose();
    setShowMsg(true);
  }

  function professor(courseDataElement) {
    // courseDataElement = {"instructor": "DJ, JAYS","term": ["Spring 2022", "Fall 2022"]};
    let instructor = courseDataElement.instructor;
    return (
      <div className='instructor' key={instructor}>
        <b>Instructor: {courseDataElement.instructor}</b>
        <ul className='term-under-instructor'>
          {courseDataElement.terms.map((term) => 
            <li key={term} className='lnk'>
              {/* <Link to={"".concat("/c/", coursename, "/", instructor, "/", term)} className='lnk'>{term}</Link> */}
              <Link className="lnk" to={"".concat("/c/", coursename, "/", instructor, "/", term)}>{term}</Link>
            </li>)}
        </ul>
      </div>
    );
  }

  function Professors() {
    if (!courseData.length) {return null;}
    return (courseData.map((courseDataElement) => professor(courseDataElement)));
  }

  // require('react-dom');
  // window.React2 = require('react');
  // console.log(window.React1 === window.React2);

  return (
    <div className='login-body'>
      <h1 className='course-title'>{coursename}</h1>
      <button type='button' className='login-btn course-btn' onClick={handleShow}>+ Add Professor and Quarter</button>
      <> {/* ref: https://react-bootstrap.github.io/components/modal/ */}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Enter Professor Below</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <label htmlFor="fullname">Full Name (Last Name, First Name)</label>
              <input type="text" name="fullname" id="fullname" onChange={handleChange}></input>
              
              <label htmlFor="qtr">Quarter (ex: Fall, Winter, Spring)</label>
              <input type="text" name="quarter" id="qtr" onChange={handleChange}></input>
              <br></br>
              <label htmlFor="yr">Year (YYYY)</label>
              <input type="number" name='year' min="1900" max="2099" step="1" id="yr" onChange={handleChange}></input> 
            </form>
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
      <div className='class-list'>
        <Professors />
      </div>
      <HomeBtn />
    </div>
  ); 
}

export default CoursePage;