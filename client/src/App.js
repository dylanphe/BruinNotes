import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Loginpage from './components/account_system/loginpage';
import Signuppage from './components/account_system/signuppage';
import ForgetPasswordPage from './components/account_system/forgetpasswordpage';
import Searchpage from './components/search_system/searchpage';
import CoursePage from './components/class_system/coursepage';
import CourseNotePage from './components/class_system/coursenotepage';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path = "/" element={<Loginpage />} />
          <Route path = "Signup" element={<Signuppage />} />
          <Route path = "ForgetPassword" element={<ForgetPasswordPage />} />
          <Route path = "/:uid/" element={<Searchpage />} />
          <Route path = "/:uid/:coursename" element={<CoursePage />} />
          <Route path = "/:uid/:coursename/:instructor/:term" element={<CourseNotePage />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
