import React from 'react';
import {AiOutlinePoweroff} from 'react-icons/ai';
import { useNavigate } from "react-router-dom";
import './logoutbtn.css';

function LogoutBtn() {
  const navigate = useNavigate();
  return (
    <button id='logout-btn' className='search-btn' onClick={() => navigate("/")}>
      {/* <Link to="/"> */}
        Logout
      {/* </Link> */}
    </button>
    );
}

export default LogoutBtn;