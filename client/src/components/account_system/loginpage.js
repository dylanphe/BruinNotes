import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {BsEyeFill, BsEyeSlashFill} from 'react-icons/bs';
import "@fontsource/gloria-hallelujah";
import './loginpage.css';

function Loginpage(props) {
    //KeyPressed Enter == login Button clicked
    useEffect(() => {
        const keyDownHandler = event => {
          console.log('User pressed: ', event.key);
    
          if (event.key === 'Enter') {
            event.preventDefault();
            handleSubmit();
          }
        };
    
        document.addEventListener('keydown', keyDownHandler);
    
        return () => {
          document.removeEventListener('keydown', keyDownHandler);
        };
    });


    const [uid, setUID] = React.useState();
    const [password, setPassword] = React.useState();


    ///////////////////////////////////////////////////////////
    //Functions to validate user inputs////////////////////////
    ///////////////////////////////////////////////////////////
    // Description: Check to see if uid has all 9 digits
    // Return:      Boolean
    function validateInput() {
        var uidPattern = new RegExp("^\\d{9}$");
        if (!uid || !password) {
            alert('Please Enter all field');
            return;

        } else {
            if (!uid.match(uidPattern)) {
                alert('Please enter a valid UID.');
                return false;
            }
        }
        return true;
    }
    //////////////////////////////////////////////////////////////////////////////
    // This function is called when Sign Up button is clicked
    ////////////////////////////////////////////////////////////////////////////////
    function handleSubmit () {
        if(!validateInput()) {
            return;
        }
        else {
            axios.post('http://127.0.0.1:8000/checkpassword', {'fullname': null, 'uid': uid, 'email': null, 'password': password})
            .then(res => {
                console.log(res.data);
                if (res.data === false) {
                    alert("Wrong UID and Password. Please re-enter the information.");
                    return;
                }
                props.onLogin(uid);
                const uidparams = String(uid);
                navigate('/'+uidparams+'/');
            })
        }
    }

    //UI Data for passwordshown button and page routing
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
            <div className= "login-top-btn">
                <button className="login-btn" type="submit" onClick={()=>navigate("Signup")}>SIGN UP</button>
            </div>
            <p id="login-title-name">BruinNotes</p>
            <input className="login-txtbox" onChange={event => setUID(event.target.value)}  type="number" placeholder="Enter 9 digits UID"/>
            <input className="login-txtbox" onChange={event => setPassword(event.target.value)} type={passwordShown ? "text" : "password"} placeholder="Enter Password"/>
            <div id="login-link-box"><button id='login-show-pwd' onClick={togglePassword}>{passwordShown === false ? <BsEyeFill /> : <BsEyeSlashFill />}</button></div>
            <div id="login-link-box"><button id="login-link-btn" onClick={()=>navigate("ForgetPassword")}>Forget Password?</button></div>
            <button className="login-btn" id="login-btm-btn" type="submit" onClick={handleSubmit}>LOG IN</button>
        </div>
    );
}


export default Loginpage;