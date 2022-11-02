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

    const [fullname, setFullname] = React.useState('')
    const [uid, setUID] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    ///////////////////////////////////////////////////////////
    //Check to see if fullname has both firstname and lastname
    function validateFullName(name) {
        var namePattern = new RegExp("[A-Za-z]+ [A-Za-z]+");
        if (name.match(namePattern)) {
            return true;
        } else {
            return false;
        }
    }

    //Check to see if uid is valid (has all 9 digits)
    function validateUID(userid) {
        var uidPattern = new RegExp("^\\d{9}$");
        if (userid.match(uidPattern)) {
            return true;
        } else {
            return false;
        }
    }

    //Check to see if email is a valid UCLA email
    function validateEmail(userEmail) {
        var emailPattern = new RegExp("^[\\w-\._]+@([\\w-]+\.)+ucla\.edu$");
        if (userEmail.match(emailPattern)) {
            return true;
        } else {
            return false;
        }
    }

    //Check to see if password requirements are met
    function validatePassword(userPassword) {
        var passwordPattern = new RegExp("^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$");
        if (userPassword.match(passwordPattern)) {
            return true;
        } else {
            return false;
        }
    }
    
    async function handleValidation() {
        //if users left any fields empty upon hitting signup
        if(!fullname || !uid || !email || !password) {
            alert('Please enter all fields.');
            return false;
        }
        else {
            if(!validateFullName(fullname)) {
                alert('Please enter both FRIST NAME and LAST NAME.');
                return false;
            } else if (!validateUID(uid)) {
                alert('Please enter a valid UID.');
                return false;
            } else if (!validateEmail(email)) {
                alert('Please enter a valid UCLA Email Address.');
                return false;
            } else if (!validatePassword(password)){
                alert('Please enter a valid password.');
                return false;
            } else {
                return true;
            }

        }
    }
    ////////////////////////////////////////////////////////
    async function uniqueUID() {
        const getUnique = async() => {
            let unique;
            unique = await axios.get('http://127.0.0.1:8000/checkuid/'+uid);
            return unique.data;
        };
        
        const globalUnique = await getUnique();
        if ((await globalUnique) == false) {
            alert("UID already exist.")
            return false;
        }
        else {
            return true;
        }
    }

    async function uniqueEmail() {
        const getUnique = async() => {
            let unique;
            unique = await axios.get('http://127.0.0.1:8000/checkemail/'+email);
            return unique.data;
        };
        
        const globalUnique = await getUnique();
        if ((await globalUnique) == false) {
            alert("Email already exist.")
            return false;
        }
        else {
            return true;
        }
    }

    async function handleAllValidation() {
        let resValidation = await handleValidation();
        let resUniqueID = await uniqueUID();
        let resUniqueEmail = await uniqueEmail();

        return (Boolean(resValidation) && Boolean(resUniqueID) && Boolean(resUniqueEmail));

        /*await Promise.all([
            resValidation = handleValidation(), 
            resUniqueID = uniqueUID(), 
            resUniqueEmail = uniqueEmail(),          
        ])*/
    }
    //////////////////////////////////////////////////////////////////////////////
    function handleSubmit() {
        handleAllValidation().then(result => {
            if (result == true) {
                axios.post('http://127.0.0.1:8000/adduser', {'fullname': fullname, 'uid': uid, 'email': email, 'password': password})
                .then(res => console.log(res));
                navigate('/');
            }
        });
        
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
                    <input onChange={event => setFullname(event.target.value)} id='signup-form-box'  type="text" placeholder="Enter Full Name (Firstname Lastname)"/>
                    <div className='signup-form-label'>UID</div>
                    <input onChange={event => setUID(event.target.value)} id='signup-form-box' type="number" placeholder="Enter 9-digits UID"/>
                    <div className='signup-form-label'>UCLA EMAIL</div>
                    <input onChange={event => setEmail(event.target.value)} id='signup-form-box' type="text" placeholder="Enter UCLA Email Address"/>
                    <div className='signup-form-label-pwd'>
                        <div id='pwd-text'>PASSWORD</div>
                        <div className='signup-form-label-right'><button id='signup-show-pwd' onClick={togglePassword}>{passwordShown === false ? <BsEyeFill /> : <BsEyeSlashFill />}</button></div>
                    </div>
                    <input onChange={event => setPassword(event.target.value)} id='signup-form-box' type={passwordShown ? "text" : "password"} placeholder="Enter Password"/>
                    <div className='signup-sub-form-label'>Password must contain at least 6 characters consists of one uppercase letter, one digit, and one special symbols (!@#$%^&*)</div>
                    <button className="signup-btn" id="signup-btn" type="submit" onClick={handleSubmit}>SIGN UP</button>
                    <div><button className="signup-soft-btn" type="submit" onClick={()=>navigate("/")}>Already registered, sign in?</button></div>
                </div>
            </div>
        </div>
    );
}


export default SignupPage;