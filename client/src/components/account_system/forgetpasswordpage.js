import React, {useState} from 'react';
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

    const [isDiv1Shown, setDiv1Shown] = useState(true);
    const [isDiv2Shown, setDiv2Shown] = useState(false);
    const [isDiv3Shown, setDiv3Shown] = useState(false);

    const [isVerifyBoxShown, setVboxShown] = useState(false);
    const [isPasswordBoxShown, setPboxShown] = useState(false);
    const sendCode = () => {
        setDiv1Shown(!isDiv1Shown);
        setDiv2Shown(!isDiv2Shown);
        setVboxShown(!isVerifyBoxShown);
    }

    const verify = () => {
        setDiv2Shown(!isDiv2Shown);
        setDiv3Shown(!isDiv3Shown);
        setPboxShown(!isPasswordBoxShown);
    }

    return (
        <div className='forgetpassword-body'>
            <div className='forgetpassword-box'>
                <div className='forgetpassword-center-align'>
                    <div className='forgetpassword-form-label'>UCLA EMAIL ADDRESS</div>
                    <input id='forgetpassword-form-box'  type="text" placeholder="Enter UCLA Email Address"/>
                    {isVerifyBoxShown && (
                        <div>
                            <div className='forgetpassword-form-label'>VERIFICATION CODE</div>
                            <input id='forgetpassword-form-box' type="text" placeholder="Enter Verification Code"/>
                        </div>
                    )}
                    {isPasswordBoxShown && (
                        <div>
                            <div className='forgetpassword-form-label'>PASSWORD</div>
                            <input  id='forgetpassword-form-box' type={passwordShown ? "text" : "password"} placeholder="Enter Password"/>
                            <div className='forgetpassword-right-align'><button id='forgetpassword-show-pwd' onClick={togglePassword}>{passwordShown === false ? <BsEyeFill /> : <BsEyeSlashFill />}</button></div>
                        </div>
                    )}
                    {isDiv1Shown && (
                        <div id='forgetpassword-btn-box'>
                            <button className="forgetpassword-btn" type="submit" onClick={sendCode}>Send Codes</button>
                        </div>
                    )}
                    {isDiv2Shown && (
                        <div id='forgetpassword-btn-box'>
                            <button className="forgetpassword-btn" type="submit" onClick={verify}>Verify</button>
                        </div>
                    )}    
                    {isDiv3Shown && (
                        <div id='forgetpassword-btn-box'>
                            <button className="forgetpassword-btn" type="submit">Change Password</button>
                        </div>
                    )}  
                    <div className="forgetpassword-soft-btn-right-align"><button className="forgetpassword-soft-btn" type="submit" onClick={()=>navigate("/")}>Return to sign in page!</button></div>
                    <span>"Page is Under Construction"</span>
                </div>
            </div>
        </div>
    );
}


export default ForgetPasswordPage;