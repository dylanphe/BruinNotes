import React, { useState } from 'react';
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Loginpage from './components/account_system/loginpage';
import Signuppage from './components/account_system/signuppage';
import ForgetPasswordPage from './components/account_system/forgetpasswordpage';
import Searchpage from './components/search_system/searchpage';
import CoursePage from './components/class_system/coursepage';
import CourseNotePage from './components/class_system/coursenotepage';

function App() {
  //const [uid, setUid] = useState(null);
  const [uid, setUid] = useState('505834475');

  const updateUid = (uid) => {setUid(uid);}
  console.log("App uid:", uid);

  return (
    <BrowserRouter>
        <Routes>
          <Route path = "/" element={<Loginpage onLogin={updateUid} />} />
          <Route path = "Signup" element={<Signuppage />} />
          <Route path = "ForgetPassword" element={<ForgetPasswordPage />} />
          {/* <Route path = "SearchPage" element={<Searchpage uid={uid}/>} />
           <Route path = "/c/:coursename" element={<CoursePage uid={uid}/>} />
           <Route path = "c/:coursename/:instructor/:term" element={<CourseNotePage uid={uid}/>} /> */}
          <Route path = "/:uid/" element={uid !== null ? <Searchpage uid={uid} onLogout={updateUid} /> : <Navigate to="/" />} />
          <Route path = "/:uid/:coursename" element={uid !== null ? <CoursePage uid={uid}/> : <Navigate to="/" />} />
          <Route path = "/:uid/:coursename/:instructor/:term" element={uid !== null ? <CourseNotePage uid={uid}/> : <Navigate to="/" />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
