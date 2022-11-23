import React from 'react';
import { useNavigate } from "react-router-dom";

function HomeBtn(props) {
  const navigate = useNavigate();
  // console.log("HomeBtn: uid:", props.uid);
  return (
    <button id='home-btn' className='coursepage-btn' onClick={() => navigate("/"+props.uid)}>
      {/* <Link to="/"> */}
      HOME
      {/* </Link> */}
    </button>
    );
}

export default HomeBtn;