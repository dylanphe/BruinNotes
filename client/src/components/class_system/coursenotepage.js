import React, {} from 'react';
import { useParams } from 'react-router-dom';
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


function CourseNotePage(props) {
  const params = useParams();
  console.log(params);
  const courseName = params.coursename, instructor = params.instructor, term = params.term;
  
  const notes = sampleNotes;

  const Note = (note) => {
    let title = note.author + ": " + note.title + " | Week " + note.week + " (" + note.role + ")";
    let comments = note.commentList;
    return (
      <div key={note._id}>
        <div>
          <a href={note.URL} className="lnk">{title}</a>
        </div>
        <button className='like-btn'>Like {note.likes}</button>  
        <button>Dislike {note.dislikes}</button>  
        <div>
          <input type="text" placeholder='Enter a comment...'></input>
          <div className='comments'>
            {comments.map((comment, idx) => <p key={idx}><b className='commentAuthor'>{comment.username}</b> {comment.comment}</p>)}
          </div>          
        </div>  
      </div>
  
    );
  };

  const Notes = () => {
    return notes.map((note) => Note(note));
  }


  return (
    <div className='login-body'>
      <HomeBtn />
      <h1 className='course-title'>{courseName} {term} {instructor}</h1>
      <div>
        <button className='login-btn course-btn btn-lst'> + Share Notes </button>
        <div style={{width: '40px', height: 'auto', display: 'inline-block'}}></div>
        <button className='login-btn course-btn btn-lst'> Request Notes </button>
      </div>
      <div>
        <Notes />
      </div>
      
    </div>
  
  );  
}

export default CourseNotePage;