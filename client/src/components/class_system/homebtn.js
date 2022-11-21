import React from 'react';
import { useNavigate } from "react-router-dom";

function HomeBtn(props) {
  const navigate = useNavigate();
  return (
    <button id='home-btn' className='coursepage-btn' onClick={() => navigate("/Searchpage")}>
      {/* <Link to="/"> */}
      HOME
      {/* </Link> */}
    </button>
    );
}

export default HomeBtn;