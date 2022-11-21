import React, { useState } from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Loginpage from './components/account_system/loginpage';
import Signuppage from './components/account_system/signuppage';
import ForgetPasswordPage from './components/account_system/forgetpasswordpage';
import Searchpage from './components/search_system/searchpage';
import CoursePage from './components/class_system/coursepage';
import CourseNotePage from './components/class_system/coursenotepage';

function App() {
  const [uid, setUid] = useState(null);

  const updateUid = (uid) => {setUid(uid);}

  return (
    <BrowserRouter>
        <Routes>
          <Route path = "/" element={<Loginpage onLogin={updateUid} />} />
          <Route path = "Signup" element={<Signuppage />} />
          <Route path = "ForgetPassword" element={<ForgetPasswordPage />} />
          {/* <Route path = "SearchPage" element={<Searchpage uid={uid}/>} />
           <Route path = "/c/:coursename" element={<CoursePage uid={uid}/>} />
           <Route path = "c/:coursename/:instructor/:term" element={<CourseNotePage uid={uid}/>} /> */}
          <Route path = "/:uid/" element={<Searchpage />} />
          <Route path = "/:uid/:coursename" element={<CoursePage />} />
          <Route path = "/:uid/:coursename/:instructor/:term" element={<CourseNotePage />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
