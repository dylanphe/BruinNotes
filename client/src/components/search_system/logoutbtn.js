import React from 'react';
import { useNavigate } from "react-router-dom";
import './logoutbtn.css';

function LogoutBtn(props) {
  const navigate = useNavigate();
  return (
    <button id='logout-btn' className='search-btn' onClick={() => {props.onLogout(null); navigate("/")}}>
      {/* <Link to="/"> */}
        Logout
      {/* </Link> */}
    </button>
    );
}

export default LogoutBtn;