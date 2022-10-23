import React, {useEffect, useState} from 'react';
import {BsEyeFill, BsEyeSlashFill} from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import "@fontsource/gloria-hallelujah";
import './forgetpasswordpage.css';

// The function that toggles between themes
function ForgetPasswordPage() {

    const navigate = useNavigate();
    const [passwordShown, setPasswordShown] = useState(false);
    // Password toggle handler
    const togglePassword = () => {
        // When the handler is invoked
        // inverse the boolean state of passwordShown
        setPasswordShown(!passwordShown);
    };

    return (
        <div className='forgetpassword-body'>
            <div className='forgetpassword-box'>
                <div className='center-align'>
                    <div className='form-label'>UCLA EMAIL ADDRESS</div>
                    <input id='form-box'  type="text" placeholder="Enter UCLA Email Address"/>
                    <div className='form-label'>VERIFICATION CODE</div>
                    <input id='form-box' type="text" placeholder="Enter Verification Code"/>
                    <div className='form-label'>PASSWORD</div>
                    <input  id='form-box' type={passwordShown ? "text" : "password"} placeholder="Enter Password"/>
                    <div className='right-align'><button id='show-pwd' onClick={togglePassword}>{passwordShown === false ? <BsEyeFill /> : <BsEyeSlashFill />}</button></div>
                    <button className="btn" id="signup-btn" type="submit">SIGN UP</button>
                    <div><button className="soft-btn" id="login-btn" type="submit" onClick={()=>navigate("/")}>Return to sign in page!</button></div>
                </div>
            </div>
        </div>
    );
}


export default ForgetPasswordPage;