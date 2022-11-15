// TODO: report page button 
// TODO: IMPORTANT: where to show note requests?

import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {BiCommentAdd} from 'react-icons/bi';
import {AiFillLike, AiOutlineLike, AiOutlineDislike, AiFillDislike} from 'react-icons/ai'; 
import Button from 'react-bootstrap/esm/Button';
import Modal from 'react-bootstrap/Modal';
import './coursenotepage.css';
import HomeBtn from './homebtn';

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
  console.log(params);
  console.log(props.uid);
  const courseName = params.coursename, instructor = params.instructor, term = params.term;
  const authorTypes = ['Student', 'TA', 'Professor'];

  const [requestMsg, setRequestMsg] = useState("");
  const [addForm, setAddForm] = useState({}); // fields: notelink, namelink. authortype
  const [showReq, setShowReq] = useState(false);
  const [showAdd, setShowAdd] = useState(false);

  const handleOpenReq = () => {setShowReq(true);}
  const handleCloseReq = () => {setShowReq(false);}
  const handleOpenAdd = () => {setShowAdd(true);}
  const handleCloseAdd = () => {setShowAdd(false);}
  const handleChangeReq = (e) => {setRequestMsg(e.target.value);}

  const [panelOpen, setPanelOpen] = useState(false);
  const [hideNote, setHideNote] = useState(false);

  const openReqPanel = () => {
    setPanelOpen(!panelOpen);
    setHideNote(!hideNote);
  }

  const notes = sampleNotes;

  const Notes = () => {
    return notes.map((note) => Note(note));
  }

  const handleSubmitReq = (e) => {
    // e.preventDefault();
    console.log(requestMsg);
    handleCloseReq();
  };

  const handleChangeAdd = (e) => {
    addForm[e.target.name] = e.target.value;
    setAddForm(addForm);
  }
  const handleClickAuthorType = (at) => {
    addForm['authortype'] = at;
    setAddForm(addForm);
  }

  const handleSubmitAdd = (e) => {
    // e.preventDefault();
    console.log(addForm);
    handleCloseAdd();
  }

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
              {!panelOpen ? "Week 1" : "Week 1's requests"}
            </div>
            <div id='quarterpage-week-req'>
              <button id="quarterpage-req-btn" onClick={openReqPanel}>Requests</button>
            </div>
          </div>
          {!hideNote && (<div id="quarterpage-note-list">
            <Notes />
          </div> 
          )}
          {hideNote && (<div id="quarterpage-request-list">
            <Notes />
            sdasd
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
            <textarea autoFocus type="text" name="notelink" className='txt-box' onChange={handleChangeAdd}></textarea>
            <br /> <br />
            <div className='modal-input-box'>
              <span id='modal-input-label'>Title</span>
              <input type="text" id='modal-input' name="namelink" onChange={handleChangeAdd} placeholder='Lecture1, Discussion1,...'></input>
            </div>
            <br />
            <div className='modal-input-box'>
              <span id='modal-input-label'>Week</span>
              <input type="number" id='modal-input' name="namelink" onChange={handleChangeAdd} placeholder='1, 2, 3,...'></input>
            </div>
            <br />
            <div className='modal-input-box'>
              <span id='modal-input-label'>Author Type</span>
              {/* <button> Student </button> <button> TA </button> <button> Professor </button> */}
              {authorTypes.map((at, idx) => (<button id='author-button' key={at} onClick={() => handleClickAuthorType(at)}> {at} </button>))}
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
              <input type="number" id='modal-input' name="namelink" onChange={handleChangeAdd} placeholder='1, 2, 3,...'></input>
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