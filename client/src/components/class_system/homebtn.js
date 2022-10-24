import React from 'react';
import { useNavigate } from "react-router-dom";

function HomeBtn() {
  const navigate = useNavigate();
  return (
    <button id='home-lnk' className='login-btn' onClick={() => navigate("/Searchpage")}>
      {/* <Link to="/"> */}
      HOME
      {/* </Link> */}
    </button>
    );
}

export default HomeBtn;