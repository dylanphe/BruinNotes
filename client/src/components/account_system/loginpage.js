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
            <span className= "login-top-btn">
                <button className="login-btn" type="submit" onClick={()=>navigate("Signup")}>SIGN UP</button>
            </span>
            <p id="login-title-name">BruinNotes</p>
            <input  type="number" placeholder="Enter 9 digits UID"/>
            <input  type={passwordShown ? "text" : "password"} placeholder="Enter Password"/>
            <div id="login-link-box"><button id='login-show-pwd' onClick={togglePassword}>{passwordShown === false ? <BsEyeFill /> : <BsEyeSlashFill />}</button></div>
            <div id="login-link-box"><button id="login-link-btn" onClick={()=>navigate("ForgetPassword")}>Forget Password?</button></div>
            <button className="login-btn" id="login-btm-btn" type="submit" onClick={()=>navigate("Searchpage")}>LOG IN</button>
        </div>
    );
}


export default Loginpage;