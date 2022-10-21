import React from 'react';
import {Routes, Route} from "react-router-dom";
import Loginpage from './components/account_system/loginpage';
import Signuppage from './components/account_system/signuppage';

function App() {
  return (
    <Routes>
      <Route path = "/" element={<Loginpage />} />
      <Route path = "Signup" element={<Signuppage />} />
    </Routes>
  );
}

export default App;
