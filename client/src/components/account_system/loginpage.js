import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {BsEyeFill, BsEyeSlashFill} from 'react-icons/bs';
import "@fontsource/gloria-hallelujah";
import './loginpage.css';

// The function that toggles between themes
function Loginpage() {

    const navigate = useNavigate();
    const [passwordShown, setPasswordShown] = useState(false);
    // Password toggle handler
    const togglePassword = () => {
        // When the handler is invoked
        // inverse the boolean state of passwordShown
        setPasswordShown(!passwordShown);
    };


    return (
        <div className='login-body'>
            <span className= "btn-list">
                <button className="btn" type="submit" onClick={()=>navigate("Signup")}>SIGN UP</button>
            </span>
            <p id="title-name">BruinNotes</p>
            <input  type="text" placeholder="Enter UID"/>
            <input  type={passwordShown ? "text" : "password"} placeholder="Enter Password"/>
            <div id="link-box"><button id='show-pwd' onClick={togglePassword}>{passwordShown === false ? <BsEyeFill /> : <BsEyeSlashFill />}</button></div>
            <div id="link-box"><button id="link-btn" onClick={()=>navigate("ForgetPassword")}>Forget Password?</button></div>
            <button className="btn" id="login-btn" type="submit">LOG IN</button>
        </div>
    );
}


export default Loginpage;