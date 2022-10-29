// TODO: report page button 
// TODO: IMPORTANT: where to show note requests?

import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
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
    {'username': 'UserSRam', 'comment': 'comment 1'}, 
    {'username': 'Lgv', 'comment': 'comment 2'}
  ],
  'ratingList': [],
  'likes': 12,
  'dislikes': 32
}];

function Note(note) {
  const [showComments, setShowComments] = useState(false);
  const toggleComments = () => setShowComments(!showComments);
  let title = note.author + ": " + note.title + " | Week " + note.week + " (" + note.role + ")";
  let comments = note.commentList;
  return (
    <div key={note._id}>
      <div>
        <a href={note.URL} className="lnk">{title}</a>
      </div>
      <button className='like-btn'>Like {note.likes}</button>  
      <button> Dislike {note.dislikes}</button>  
      <button onClick={toggleComments}> Comments </button>
      <div style={{display: showComments ? 'block' : 'none'}}>
        <input type="text" placeholder='Enter a comment...'></input>
        <div className='comments' >
          {comments.map((comment, idx) => <p key={idx}><b className='commentAuthor'>{comment.username}</b> {comment.comment}</p>)}
        </div>          
      </div>  
    </div>
  );
}


function CourseNotePage(props) {
  const params = useParams();
  console.log(params);
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
    <div className='login-body'>
      <HomeBtn />
      <h1 className='course-title'>{courseName} {term} {instructor}</h1>
      <div>
        <button className='login-btn course-btn btn-lst' onClick={handleOpenAdd}> + Share Notes </button>
        <div style={{width: '40px', height: 'auto', display: 'inline-block'}}></div>
        <button className='login-btn course-btn btn-lst' onClick={handleOpenReq}> Request Notes </button>
      </div>
      <div>
        <Notes />
      </div>
      <>
        <Modal show={showAdd} onHide={handleCloseAdd} autoFocus={false}>
          <Modal.Header closeButton>
            <Modal.Title>Name & Share Link</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <label htmlFor='notelink'>Insert link below...</label>
            <textarea autoFocus type="text" name="notelink" className='txt-box' onChange={handleChangeAdd}></textarea>
            <br></br>
            <label htmlFor='namelink'>Name Link (Title, Week)</label>
            <input type="text" name="namelink" onChange={handleChangeAdd}></input>
            <br></br>
            Choose Author Type: 
            <span>
              {/* <button> Student </button> <button> TA </button> <button> Professor </button> */}
              {authorTypes.map((at, idx) => (<button key={at} onClick={() => handleClickAuthorType(at)}> {at} </button>))}
            </span>
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
            Enter request below (Title, Week)
            <br></br>
            <textarea autoFocus type="text" name="request" className="txt-box" onChange={(e) => setRequestMsg(e.target.value)}></textarea>
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