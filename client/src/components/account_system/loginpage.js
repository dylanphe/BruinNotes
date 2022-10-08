import React from 'react';
import { useNavigate } from 'react-router-dom';
import "@fontsource/gloria-hallelujah";
import './loginpage.css';

// The function that toggles between themes
function Loginpage() {

    const navigate = useNavigate();

    function handleSignup() {
        navigate("Signup");
    }

    return (
        <div className='login-body'>
            <span className= "btn-list">
                <button className="btn" type="submit" onClick={handleSignup}>SIGN UP</button>
            </span>
            <p id="title-name">BruinNotes</p>
            <input  type="text" placeholder="Enter Username"/>
            <input  type="text" placeholder="Enter Password"/>
            <span id="link-btn">Forget Password?</span>
            <button className="btn" id="login-btn" type="submit">LOG IN</button>
        </div>
    );
}


export default Loginpage;