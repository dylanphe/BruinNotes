import React, { useState, useEffect, useTransition} from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {BiCommentAdd, BiLink} from 'react-icons/bi';
import {AiFillLike, AiOutlineLike, AiOutlineDislike, AiFillDislike, AiFillDelete} from 'react-icons/ai'; 
import {ImArrowUpLeft2} from 'react-icons/im'; 
import { GrSend } from "react-icons/gr";
import Button from 'react-bootstrap/esm/Button';
import Modal from 'react-bootstrap/Modal';
import './coursenotepage.css';
import HomeBtn from './homebtn';
import axios from 'axios';

//TODO: SORTING(BY WEEK -> BY AUTHOR)/COLORCODED(AUTHOR TYPE)
//TODO: LIKE/DISLIKE/COMMENT


function CourseNotePage(props) {
  
  useEffect(() => {
    const storedUid = localStorage.getItem("uid");
    if (storedUid !== params.uid) {
      console.log(storedUid, "=/=", params.uid);
      // Hey don't use other ppl's uid :<
      navigate('/'+storedUid+'/'+params.coursename+'/'+params.instructor+'/'+params.term);
    }
  }, []);
  
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/viewuser/'+uidParams)
    .then( (res) => {
      setUser(res.data.at(0));
      console.log(user);
    })

    searchNote();
    searchNoteReq();
  }, []);

  useEffect(() => {
    if (Object.keys(noteList).length === 0)
    {
      setEmptyNote(true);
    }
    else {
      setEmptyNote(false);
    }
    if (Object.keys(reqList).length === 0)
    {
      setEmptyReq(true);
    }
    else {
      setEmptyReq(false);
    }
  });

  //Notes
  const params = useParams();
  const navigate = useNavigate();
  const courseName = params.coursename, instructor = params.instructor, term = params.term, uidParams = params.uid;
  const authorTypes = ['Student', 'TA', 'Professor'];
  const [noteLink, setNoteLink] = useState('');
  const [noteTitle, setNoteTitle] = useState('');
  const [noteWeek, setNoteWeek] = useState();
  const [user, setUser] = useState([]);
  const [authorType, setAuthorType] = useState('');
  const [noteList, setNoteList] = useState([]);
  const [emptyNote, setEmptyNote] = useState(false);
  const [loading, setLoading] = useState(true);
  console.log("loading", loading);

  const [panelOpen, setPanelOpen] = useState(false);
  const [hideNote, setHideNote] = useState(false);
  const openReqPanel = () => {
    setPanelOpen(!panelOpen);
    setHideNote(!hideNote);
    searchNote();
  }

  //Function to generate notelink onto webpage
  function Note(props) {
    const [note, setNote] = useState(props.thisnote);
    const [user, setUser] = useState(props.user);
    const [comment, setComment] = useState('');
    const uidParams = props.uidParams;
    let title = note.author + ": " + note.title + " | Week " + note.week + " (" + note.role + ")";
    let comments = note.commentList;
    
    async function handleLike() {
      if (note.likeUsers[uidParams] === undefined && note.dislikeUsers[uidParams] === undefined) {
        axios.put("/increaselikes/"+note._id+"/"+uidParams)
        .then(res =>
          {
            console.log(res);
            // searchNote();
          })
        .then(() => axios.get('http://127.0.0.1:8000/searchnotebyid/'+note._id))
        .then(res => {
          const updatedNote = res.data;
          setNote(updatedNote);
        })
      }
      if (note.likeUsers[uidParams] === undefined && note.dislikeUsers[uidParams] === 0) {
        axios.put("/increaselikes/"+note._id+"/"+uidParams)
        .then(res =>
          {
            console.log(res);
            // searchNote();
          })
          .then(() => axios.get('http://127.0.0.1:8000/searchnotebyid/'+note._id))
          .then(res => {
            const updatedNote = res.data;
            setNote(updatedNote);
          })
      }
      else if (note.likeUsers[uidParams] === 0 && note.dislikeUsers[uidParams] === 0) {
        axios.put("/increaselikes/"+note._id+"/"+uidParams)
        .then(res =>
          {
            console.log(res);
            // searchNote();
          })
          .then(() => axios.get('http://127.0.0.1:8000/searchnotebyid/'+note._id))
          .then(res => {
            const updatedNote = res.data;
            setNote(updatedNote);
          })
      }
      else if (note.likeUsers[uidParams] === 0 && note.dislikeUsers[uidParams] === undefined) {
        axios.put("/increaselikes/"+note._id+"/"+uidParams)
        .then(res =>
          {
            console.log(res);
            // searchNote();
          })
          .then(() => axios.get('http://127.0.0.1:8000/searchnotebyid/'+note._id))
          .then(res => {
            const updatedNote = res.data;
            setNote(updatedNote);
          })
      }
      else if (note.likeUsers[uidParams] === 1 && note.dislikeUsers[uidParams] === undefined) {
        axios.put("/decreaselikes/"+note._id+"/"+uidParams)
        .then(res =>
          {
            console.log(res);
            // searchNote();
          })
          .then(() => axios.get('http://127.0.0.1:8000/searchnotebyid/'+note._id))
          .then(res => {
            const updatedNote = res.data;
            setNote(updatedNote);
          })
      }
      else if (note.likeUsers[uidParams] === 1 && note.dislikeUsers[uidParams] === 0) {
        axios.put("/decreaselikes/"+note._id+"/"+uidParams)
        .then(res =>
          {
            console.log(res);
            // searchNote();
          })
          .then(() => axios.get('http://127.0.0.1:8000/searchnotebyid/'+note._id))
          .then(res => {
            const updatedNote = res.data;
            setNote(updatedNote);
          })
      }
    }

    async function handleDislike() {
      if (note.dislikeUsers[uidParams] === undefined && note.likeUsers[uidParams] === undefined) {
        axios.put("/increasedislikes/"+note._id+"/"+uidParams)
        .then(res =>
          {
            console.log(res);
            // searchNote();
          })
          .then(() => axios.get('http://127.0.0.1:8000/searchnotebyid/'+note._id))
          .then(res => {
            const updatedNote = res.data;
            setNote(updatedNote);
          })
      }
      else if (note.dislikeUsers[uidParams] === undefined && note.likeUsers[uidParams] === 0) {
        axios.put("/increasedislikes/"+note._id+"/"+uidParams)
        .then(res =>
          {
            console.log(res);
            // searchNote();
          })
          .then(() => axios.get('http://127.0.0.1:8000/searchnotebyid/'+note._id))
          .then(res => {
            const updatedNote = res.data;
            setNote(updatedNote);
          })
      }
      else if (note.dislikeUsers[uidParams] === 0 && note.likeUsers[uidParams] === 0) {
        axios.put("/increasedislikes/"+note._id+"/"+uidParams)
        .then(res =>
          {
            console.log(res);
            // searchNote();
          })
          .then(() => axios.get('http://127.0.0.1:8000/searchnotebyid/'+note._id))
          .then(res => {
            const updatedNote = res.data;
            setNote(updatedNote);
          })
      }
      else if (note.dislikeUsers[uidParams] === 0 && note.likeUsers[uidParams] === undefined) {
        axios.put("/increasedislikes/"+note._id+"/"+uidParams)
        .then(res =>
          {
            console.log(res);
            // searchNote();
          })
          .then(() => axios.get('http://127.0.0.1:8000/searchnotebyid/'+note._id))
          .then(res => {
            const updatedNote = res.data;
            setNote(updatedNote);
          })
      }
      else if (note.dislikeUsers[uidParams] === 1 && note.likeUsers[uidParams] === undefined) {
        axios.put("/decreasedislikes/"+note._id+"/"+uidParams)
        .then(res =>
          {
            console.log(res);
            // searchNote();
          })
          .then(() => axios.get('http://127.0.0.1:8000/searchnotebyid/'+note._id))
          .then(res => {
            const updatedNote = res.data;
            setNote(updatedNote);
          })
      }
      else if (note.dislikeUsers[uidParams] === 1 && note.likeUsers[uidParams] === 0) {
        axios.put("/decreasedislikes/"+note._id+"/"+uidParams)
        .then(res =>
          {
            console.log(res);
            // searchNote();
          })
          .then(() => axios.get('http://127.0.0.1:8000/searchnotebyid/'+note._id))
          .then(res => {
            const updatedNote = res.data;
            setNote(updatedNote);
          })
      }
    }

    async function handleToggleComments() {
      console.log("comment", comment);
      try {
        const res = await axios.put('/togglecommentvisibility/'+note._id+'/'+uidParams);
        console.log(res);
        const res2 = await axios.get('http://127.0.0.1:8000/searchnotebyid/'+note._id);
        setNote(res2.data);
      }
      catch (err) {
        console.log("Error in handleToggleComments:", err);
      }
      // searchNote();
    }

    function handleCommentChange(e) {
      // userComments[note._id] = e.target.value;
      // setUserComments(userComments);
      // console.log(userComments);
      setComment(e.target.value);
      console.log("comment", comment);
    }

    async function handleSubmitComment() {
      console.log("comment", comment);
      if (comment === '') return;
      try {
        const res = await axios.post('http://127.0.0.1:8000/addcomment', {
          'noteInfo': {'_id': note._id}, 
          'commentInfo': {'username': user.fullname, 'comment': comment}
        });
        console.log(res);
        // searchNote();
        const res2 = await axios.get('http://127.0.0.1:8000/searchnotebyid/'+note._id);
        const updatedNote = res2.data;
        console.log(updatedNote);
        setNote(updatedNote);
        setComment('');
      }
      catch (err) {
        console.log(err);
      }
    }

    const prependUrl = (url) => {
      if (url.slice(0,4) === 'http') return url;
      else return ('//'+url);
    }

    return (
      <div key={note._id}>
        <div className="note-nav-button">
          <a href={prependUrl(note.url)} target="_blank" id={note.role} className="note-lnk">{title}</a>
          <div className='misc-button-list'>
            <button className='misc-button' onClick={handleLike} id="like">{(note.likeUsers[uidParams] === (undefined) || note.likeUsers[uidParams] === 0) ? <AiOutlineLike/> : <AiFillLike />} {note.numLikes}</button>  
            <button className='misc-button' onClick={handleDislike} id="dislike">{(note.dislikeUsers[uidParams] === (undefined) || note.dislikeUsers[uidParams] === 0)  ? <AiOutlineDislike/> : <AiFillDislike />} {note.numDislikes}</button> 
            <button className='misc-button' id='comment' onClick={handleToggleComments}> <BiCommentAdd/> </button> 
          </div>
        </div>
        {/* <div style={{display: hideNote ? 'block' : 'none'}}> */}
        <div style={{display: (note['commentVisibleUsers'][uidParams] === true) ? 'block' : 'none'}}>
          <span><input 
                    type="text" id='cmt-input-box' placeholder='Enter a comment...' 
                    onChange={handleCommentChange}
                    value={comment}
                    >
                </input> </span>  
          <span className='misc-button-list send-btn'><button className='misc-button' onClick={handleSubmitComment}><GrSend /></button></span>
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

  //Function to map note found onto webpage
  function Notes() {
      return noteList.map((note, idx) => Note(note, idx));
  }

  //Function to handleSelection of authortype
  async function handleSelect() {
    const sb = document.querySelector('#modal-select');
    setAuthorType(sb.value);
  }

  //Function to find note from db
  async function searchNote() {
    setLoading(true);
    let items = [];
    axios.get('http://127.0.0.1:8000/searchnote/'+courseName+'/'+instructor+'/'+term)
    .then(res => {
        if (res.data.length !== 0)
        {
            res.data.map((note) => {
                items.push(note);
            });
            //console.log(items);
            setNoteList(items);
            //console.log(noteList);
        }
        else {
          setNoteList([]);
        }
        setLoading(false);
    })
  }

  //Function to add note to db
  const handleSubmitAdd = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;

    var userName = user.fullname
    if (!noteLink || !noteTitle || !noteWeek || !authorType)
    {
      alert("Please Enter All Fields");
      return;
    } else {
      if (noteWeek >= 1 && noteWeek <= 10) {
        axios.post('http://127.0.0.1:8000/addnote', {'courseName': courseName, 
                                                      'instructor': instructor, 
                                                      'term': term, 
                                                      'url': noteLink, 
                                                      'author': userName,
                                                      'role': authorType, 
                                                      'title': noteTitle,
                                                      'date' : today,
                                                      'week' : noteWeek,
                                                      'commentList': null,
                                                      'likes': null,
                                                      'dislikes': null,
                                                      'numLikes': null,
                                                      'numDislikes' : null,
                                                      'likeUsers': null,
                                                      'dislikeUsers': null,
                                                      'commentVisibileUsers': null})
        .then((res) => {
          console.log(res);
          searchNote();
        });
        handleCloseReq();
      }
      handleCloseAdd();
    }
  }

  //Requests
  const [requestMsg, setRequestMsg] = useState("");
  const [reqWeek, setReqWeek] = useState();
  const [reqList, setReqList] = useState([]);
  const [reqDelete, setReqDelete] = useState();
  const [emptyReq, setEmptyReq] = useState(false);

  const [showDelete, setShowDelete] = useState(false);
  const handleOpenDelete = () => {setShowDelete(true);}
  const handleCloseDelete = () => {setShowDelete(false);}

  //Function to generate requests
  function RequestWithDelete(req) {
    let reqMsg = req.requestMsg;
    let reqUID = req.uid;
    let reqID = req._id;
    var showDelete = reqUID.match(uidParams);
    return (
      <div key={req._id}>
        <div className="note-nav-button">
            <div className="note-req">
              {reqMsg}
            </div>
            <div className='solve-button-list'>
              <button className='misc-button' id="share" onClick={handleOpenAdd}><BiLink /></button>
              {showDelete && (<button className='misc-button' id="delete" onClick={(e) => handleDelete({reqID})}><AiFillDelete /></button>)}
            </div>
        </div>  
        <hr/>
      </div>
    );
  }

  //Function to map request found to display onto webpage
  const Requests = () => {
    return reqList.map((req) => RequestWithDelete(req));
  }

  //Function to ask user if they are sure to delete the request
  function handleDelete(reqID) {
    //console.log(reqID.reqID);
    let noteRequestID = String(reqID.reqID);
    setReqDelete(noteRequestID);
    console.log(reqDelete);
    handleOpenDelete();
    
  }

  //Function to delete request when user click yes
  async function handleDeleteRequest(reqID) {
    axios.put("/deletenoterequest/"+reqID)
    .then(res => {
      console.log(res);
      handleCloseDelete();
      searchNoteReq();
    })
  }

  //Function to search for Request from db to output on the webpage
  async function searchNoteReq() {
    setLoading(true);
    let items = [];
    axios.get('http://127.0.0.1:8000/searchnoterequest/'+courseName+'/'+instructor+'/'+term)
    .then(res => {
      if (res.data.length !== 0)
      {
          res.data.map((req) => {
              items.push(req);
          });
          //console.log(items);
          setReqList(items);
          console.log(reqList);
      }
      else {
        setReqList([]);
      }
      setLoading(false);
    })
  }

  //Function to add Request into data
  const handleSubmitReq = () => {
    // e.preventDefault();
    if (reqWeek >= 1 && reqWeek <= 10) {
      axios.post('http://127.0.0.1:8000/addnoterequest', {'courseName': courseName,'instructor': instructor, 'term': term, 'requestMsg': requestMsg, 'week': reqWeek, 'uid': uidParams})
      .then((res) => {
        console.log(res);
        searchNoteReq();
      });
      handleCloseReq();
    }
  };

  const [showReq, setShowReq] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  // console.log(requestMsg);
  const handleOpenReq = () => {setShowReq(true);}
  const handleCloseReq = () => {setShowReq(false);}
  const handleOpenAdd = () => {setShowAdd(true);}
  const handleCloseAdd = () => {setShowAdd(false);}

  return (
    <div className='quarterpage-main-body'>
      <HomeBtn uid={uidParams}/>
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
              {!panelOpen ? "Notes" : "Requests"}
            </div>
            <div id='quarterpage-week-req'>
              <button id="quarterpage-req-btn" onClick={openReqPanel}>{!panelOpen ? "Requests" : "Notes"}</button>
            </div>
          </div>
          {!hideNote && (
          <div id="quarterpage-note-list">
            {/* <Notes />
            {emptyNote && (<div id='no-note'> 
              No notes for this course yet ... <br />
              Share a note today <ImArrowUpLeft2 />
            </div> )} */}
            {(!loading && emptyNote) ? 
              (<div id='no-note'> 
                No notes for this course yet ... <br />
                Share a note today <ImArrowUpLeft2 />
              </div> ) : 
              noteList.map((note) => <Note key={note._id} thisnote={note} uidParams={uidParams} user={user}/>)}
          </div> 
          )}
          {hideNote && (
          <div id="quarterpage-request-list">
            {/* <Requests />
            {emptyReq && (<div id='no-note'>
              No requests for this course yet ... <br />
              Request for notes today <ImArrowUpLeft2 />
            </div> )} */}
            {!loading && emptyReq ? (<div id='no-note'>
              No requests for this course yet ... <br />
              Request for notes today <ImArrowUpLeft2 />
            </div> ) : <Requests />}
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

        <Modal show={showDelete} onHide={handleCloseDelete} autoFocus={false}>
          <Modal.Header closeButton>
            <Modal.Title>CAUTION</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete this request?
          </Modal.Body>
          <Modal.Footer>
            <Button id="btn-yes" variant="primary" onClick={(e) => handleDeleteRequest(reqDelete)}> Yes </Button>
            <Button id="btn-no" variant="primary" onClick={handleCloseDelete}> No </Button>
          </Modal.Footer>
        </Modal>
      </>
    </div>
  
  );  
}

export default CourseNotePage;