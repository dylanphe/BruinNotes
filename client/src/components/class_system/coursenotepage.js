// TODO: report page button 
// TODO: IMPORTANT: where to show note requests?

import React, { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import {BiCommentAdd} from 'react-icons/bi';
import {AiFillLike, AiOutlineLike, AiOutlineDislike, AiFillDislike} from 'react-icons/ai'; 
import Button from 'react-bootstrap/esm/Button';
import Modal from 'react-bootstrap/Modal';
import './coursenotepage.css';
import HomeBtn from './homebtn';
import axios from 'axios';

const sampleNotes = [{
  '_id': 0,
  'URL': 'https://www.google.com',
  'author': 'Doe, John',
  'role': 'TA',
  'title': 'Lecture',
  'date': '2022/10/23',
  'week': 1,
  'commentList': [
    {'username': 'UserSRam', 'comment': 'These notes are good...'}, 
    {'username': 'Lgv', 'comment': 'Loved this class...'}
  ],
  'ratingList': [],
  'likes': 12,
  'dislikes': 32
}, {
  '_id': 1,
  'URL': 'https://www.google.com',
  'author': 'Dylan, Phe',
  'role': 'Student',
  'title': 'UML',
  'date': '2020/10/22',
  'week': 5,
  'commentList': [
    {'username': 'FirstName,LastName', 'comment': 'comment 1'}, 
    {'username': 'Lgv', 'comment': 'comment 2'}
  ],
  'ratingList': [],
  'likes': 12,
  'dislikes': 32
}];

function Note(note) {
  const [showComments, setShowComments] = useState(false);
  const [showLikes, setShowLikes] = useState(false);
  const [showDislikes, setShowDislikes] = useState(false);
  const toggleDislikes = () => setShowDislikes(!showDislikes);
  const toggleLikes = () => setShowLikes(!showLikes);
  const toggleComments = () => setShowComments(!showComments);
  let title = note.author + ": " + note.title + " | Week " + note.week + " (" + note.role + ")";
  let comments = note.commentList;
  return (
    <div key={note._id}>
      <div className="note-nav-button">
        <a href={note.URL} className="note-lnk">{title}</a>
        <div className='misc-button-list'>
          <button className='misc-button' id="like" onClick={toggleLikes}>{showLikes === false ? <AiOutlineLike/> : <AiFillLike />} {note.likes}</button>  
          <button className='misc-button' id="dislike" onClick={toggleDislikes}>{showDislikes === false ? <AiOutlineDislike/> : <AiFillDislike />} {note.dislikes}</button> 
          <button className='misc-button' id='comment' onClick={toggleComments}> <BiCommentAdd/> </button> 
        </div>
      </div>
      <div style={{display: showComments ? 'block' : 'none'}}>
        <span> <input type="text" id='cmt-input-box' placeholder='Enter a comment...'></input> </span>
        <div className='comments'>
          {comments.map((comment, idx) => 
            <div id='cmt-box' key={idx}>
              <div id='user-box'>
                <b>{comment.username}</b>
              </div>
              <div id='user-cmt-box'>
                {comment.comment}
              </div>
            </div>
          )}
        </div>          
      </div>  
      <hr/>
    </div>
  );
}

//create request function


function CourseNotePage(props) {

  const params = useParams();
  // console.log(props.uid);
  //console.log(params);
  const courseName = params.coursename, instructor = params.instructor, term = params.term;
  const authorTypes = ['Student', 'TA', 'Professor'];

  const [noteLink, setNoteLink] = useState('');
  const [noteTitle, setNoteTitle] = useState('');
  const [noteWeek, setNoteWeek] = useState('');
  const [authorType, setAuthorType] = useState('');

  async function handleSelect() {
    const sb = document.querySelector('#modal-select');
    setAuthorType(sb.value);
  }

  const notes = sampleNotes;

  const Notes = () => {
    return notes.map((note) => Note(note));
  }

  useEffect(() => {

  });

  const handleSubmitAdd = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;

    if (noteWeek >= 1 && noteWeek <= 10) {
      /*axios.post('http://127.0.0.1:8000/addnote', { 'courseName': courseName, 
                                                    'instructor': instructor, 
                                                    'term': term, 
                                                    'url': noteLink, 
                                                    'author': ,
                                                    'vrole': authorType, 
                                                    'title': noteTitle,
                                                    'date' : today,
                                                    'week' : noteWeek,
                                                    'commentList': []})
      .then((res) => {
        console.log(res);
      });*/
      handleCloseReq();
    }
    handleCloseAdd();
  }

  const [requestMsg, setRequestMsg] = useState("");
  const [reqWeek, setReqWeek] = useState();
  const [reqList, setReqList] = useState([]);

  const [showReq, setShowReq] = useState(false);
  const [showAdd, setShowAdd] = useState(false);

  const handleOpenReq = () => {setShowReq(true);}
  const handleCloseReq = () => {setShowReq(false);}
  const handleOpenAdd = () => {setShowAdd(true);}
  const handleCloseAdd = () => {setShowAdd(false);}

  const [panelOpen, setPanelOpen] = useState(false);
  const [hideNote, setHideNote] = useState(false);

  const openReqPanel = () => {
    setPanelOpen(!panelOpen);
    setHideNote(!hideNote);
  }

  /*async function searchReq() {
    let items = [];
    axios.post('http://127.0.0.1:8000/searchnoterequests', {'courseName': courseName,'instructor': instructor, 'term': term})
    .then(res => {
        if (res.data.length !== 0)
        {
            res.data.map((courseDataElement) => {
                items.push(courseDataElement.courseName);
            });
            //console.log(items);
            setReqList(items);
            console.log(reqList);
        }
    })
  }

  useEffect(() => {
      searchReq();
  }, []);
  
  {
      reqList.map((c) =>
          <div>
            {c.requestMsg}
          </div>
      )
  }*/

  const handleSubmitReq = () => {
    // e.preventDefault();
    if (reqWeek >= 1 && reqWeek <= 10) {
      axios.post('http://127.0.0.1:8000/addnoterequest', {'courseName': courseName,'instructor': instructor, 'term': term, 'requestMsg': requestMsg, 'week': reqWeek})
      .then((res) => {
        console.log(res);
      });
      handleCloseReq();
    }
  };

  // console.log(requestMsg);

  return (
    <div className='quarterpage-main-body'>
      <HomeBtn />
      <div className='quarterpage-title-box'>
        <h1 className='quarterpage-title'>{courseName} {term} {instructor}</h1>
        <div className='quarterpage-nav-button'>
          <button className='quarterpage-btn' onClick={handleOpenAdd}> + Share Notes </button>
          <button className='quarterpage-btn' onClick={handleOpenReq}> Request Notes </button>
        </div>
      </div>
      <div className='quarterpage-body'>
        <div className='quarterpage-week-list'>
          <div id='quarterpage-week'>
            <div id='quarterpage-week-num'>
              {!panelOpen ? "Notes" : "Notes' requests"}
            </div>
            <div id='quarterpage-week-req'>
              <button id="quarterpage-req-btn" onClick={openReqPanel}>Requests</button>
            </div>
          </div>
          {!hideNote && (<div id="quarterpage-note-list">
            <Notes />
          </div> 
          )}
          {hideNote && (
          <div id="quarterpage-request-list">

          </div>
          )}
        </div>
      </div>
      <>
        <Modal show={showAdd} onHide={handleCloseAdd} autoFocus={false}>
          <Modal.Header closeButton>
            <Modal.Title>Name & Share Link</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <label htmlFor='notelink'>Insert link below...</label>
            <textarea autoFocus type="text" name="notelink" className='txt-box' onChange={event => setNoteLink(event.target.value)}></textarea>
            <br /> <br />
            <div className='modal-input-box'>
              <span id='modal-input-label'>Title</span>
              <input type="text" id='modal-input' name="namelink" onChange={(e) => setNoteTitle(e.target.value)} placeholder='Lecture1, Discussion1,...'></input>
            </div>
            <br />
            <div className='modal-input-box'>
              <span id='modal-input-label'>Week</span>
              <input type="number" id='modal-input' name="namelink" onChange={(e) => setNoteWeek(e.target.value)} placeholder='1, 2, 3,...'></input>
            </div>
            <br />
            <div className='modal-input-box'>
              <span id='modal-input-label'>Author Type</span>
              <select name="author_select" id='modal-select' onChange={handleSelect}>
                <option value="select">Select an Author Type</option>
                {/* <option value="javascript">JavaScript</option>  TODO */}
                {authorTypes.map((at, idx) => (<option value={at} key={at}>{at}</option>))}
              </select>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='primary' onClick={handleSubmitAdd}> Share </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showReq} onHide={handleCloseReq} autoFocus={false}>
          <Modal.Header closeButton>
            <Modal.Title>Request Notes</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Enter request below:
            <br></br>
            <textarea autoFocus type="text" name="request" className="txt-box" onChange={(e) => setRequestMsg(e.target.value)}></textarea>
            <br />
            <div className='modal-input-box'>
              <span id='modal-input-label'>Week</span>
              <input type="number" id='modal-input' name="namelink" onChange={(e) => setReqWeek(e.target.value)} placeholder='1, 2, 3,...'></input>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleSubmitReq}> Submit </Button>
          </Modal.Footer>
        </Modal>
      </>
    </div>
  
  );  
}

export default CourseNotePage;