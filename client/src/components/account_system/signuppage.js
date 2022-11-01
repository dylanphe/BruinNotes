import React, {useEffect, useState} from 'react';
import {BsEyeFill, BsEyeSlashFill} from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "@fontsource/gloria-hallelujah";
import './signuppage.css';

// The function that toggles between themes
function SignupPage() {
    async function testConnection() {
        const response = await fetch('/Signup');
        const data = await response.json();
        console.log(data);
        return 0;
    }

    useEffect(() => {
        testConnection();
    }, []);

    const [firstname, setFirstname] = React.useState('')
    const [lastname, setLastname] = React.useState('')
    const [email, setEmail] = React.useState('')

    // const handleSubmit = (event) => {
    //     const userInfo = {
    //         'firstname': firstname,
    //         'lastname': lastname,
    //         'email': email
    //     }

    //     fetch("http://localhost:8000/adduser", {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify(userInfo)
    //     })
    // }
    
    const handleSubmit = () => {
         axios.post('http://127.0.0.1:8000/adduser', {'firstname': firstname, 'lastname': lastname, 'email': email})
         .then(res => console.log(res))
    }


    const navigate = useNavigate();
    const [passwordShown, setPasswordShown] = useState(false);
    // Password toggle handler
    const togglePassword = () => {
        // When the handler is invoked
        // inverse the boolean state of passwordShown
        setPasswordShown(!passwordShown);
    };

    return (
        <div className='signup-body'>
            <div className='signup-box'>
                <div className='signup-center-align'>
                    <div className='signup-form-label'>FULL NAME</div>
                    <input onChange={event => setFirstname(event.target.value)} id='signup-form-box'  type="text" placeholder="Enter Full Name"/>
                    <div className='signup-form-label'>UID</div>
                    <input onChange={event => setLastname(event.target.value)} id='signup-form-box' type="number" placeholder="Enter 9-digits UID"/>
                    <div className='signup-form-label'>UCLA EMAIL</div>
                    <input onChange={event => setEmail(event.target.value)} id='signup-form-box' type="text" placeholder="Enter UCLA Email Address"/>
                    <div className='signup-form-label'>PASSWORD</div>
                    <input  id='signup-form-box' type={passwordShown ? "text" : "password"} placeholder="Enter Password"/>
                    <div className='signup-right-align'><button id='signup-show-pwd' onClick={togglePassword}>{passwordShown === false ? <BsEyeFill /> : <BsEyeSlashFill />}</button></div>
                    <button className="signup-btn" id="signup-btn" type="submit" onClick={handleSubmit}>SIGN UP</button>
                    <div><button className="signup-soft-btn" type="submit" onClick={()=>navigate("/")}>Already registered, sign in?</button></div>
                </div>
            </div>
        </div>
    );
}


export default SignupPage;