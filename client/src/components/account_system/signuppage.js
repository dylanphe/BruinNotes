import React, {useEffect, useState} from 'react';
import {BsEyeFill, BsEyeSlashFill} from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "@fontsource/gloria-hallelujah";
import './signuppage.css';

// The function that toggles between themes
function SignupPage() {
    const [fullname, setFullname] = React.useState('')
    const [uid, setUID] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    //KeyPressed Enter == SignUp Button clicked
    useEffect(() => {
        const keyDownHandler = event => {
            // console.log('User pressed: ', event.key);
    
            if (event.key === 'Enter') {
                handleSubmit();
            }
        };
    
        document.addEventListener('keydown', keyDownHandler);
    
        return () => {
            document.removeEventListener('keydown', keyDownHandler);
        };
    });

    ///////////////////////////////////////////////////////////
    //Functions to validate user inputs////////////////////////
    ///////////////////////////////////////////////////////////
    // Description: Check to see if fullname has both firstname and lastname
    // Return:      Boolean
    function validateFullName() {
        var namePattern = new RegExp("^(?=.*[A-Za-z])[A-Za-z]+ [A-Za-z]+$");
        if (!fullname.match(namePattern)) {
            return false;
        }
        return true;
    }
    ///////////////////////////////////////////////////////////
    // Description: Check to see if uid has all 9 digits
    // Arg:         String of digits
    // Return:      Boolean
    function validateUID() {
        var uidPattern = new RegExp("^\\d{9}$");
        if (!uid.match(uidPattern)) {
            return false;
        }
        return true;
    }
    ///////////////////////////////////////////////////////////
    // Description: Check to see if email is a valid UCLA email
    // Arg:         String of symbols
    // Return:      Boolean
    function validateEmail() {
        var emailPattern = new RegExp("^[\\w-._]+@([\\w-]+.)+ucla.edu$");
        if (!email.match(emailPattern)) {
            return false;
        }
        return true;
    }
    /////////////////////////////////////////////////////////////////////
    // Description: Check to see if all reuqirements are met for password
    // Arg:         String of symbols
    // Return:      Boolean
    function validatePassword() {
        var passwordPattern = new RegExp("^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$");
        if (!password.match(passwordPattern)) {
            return false;
        }
        return true;
    }
    //Function to hold them togethers for strategies purpose
    function handleSignupValidation() {
        //if users left any fields empty upon hitting signup
        if(!fullname || !uid || !email || !password) {
            alert('Please enter all fields.');
            return false;
        }
        else {
            if(!validateFullName()) {
                alert('Please enter both FRIST NAME and LAST NAME.');
                return false;
            }
            if (!validateUID()) {
                alert('Please enter a valid UID.');
                return false;
            } 
            if (!validateEmail()) {
                alert('Please enter a valid UCLA Email Address.');
                return false;
            }
            if (!validatePassword()){
                alert('Please enter a valid password.');
                return false;
            } 
            if (validateFullName() && validateUID() && validateEmail() && validatePassword()) {
                return true;
            }
        }
    }
    ////////////////////////////////////////////////////////
    //Functions to check for unique UID and Email //////////
    ///////////////////////////////
    /////////////////////////
    async function uniqueUID() {
        const getUnique = async() => {
            let unique;
            unique = await axios.get('http://127.0.0.1:8000/checkuid/'+uid);
            return unique.data;
        };
        
        const globalUnique = await getUnique();
        if ((await globalUnique) === false) {
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
        if ((await globalUnique) === false) {
            alert("Email already exist.")
            return false;
        }
        else {
            return true;
        }
    }
    //////////////////////////////////////////////////////
    // Function to handle all validations above at once
    //////////////////////////////////////////////////////
    async function handleAllValidation() {
        let resValidation = handleSignupValidation();
        let resUniqueID = await uniqueUID();
        let resUniqueEmail = await uniqueEmail();
        //console.log(resValidation);
        //console.log(resUniqueID);
        //console.log(resUniqueEmail);
        //return (Boolean(resValidation) && Boolean(resUniqueID));
        return (Boolean(resValidation) && Boolean(resUniqueID) && Boolean(resUniqueEmail));
    }
    //////////////////////////////////////////////////////////////////////////////
    // This function is called when Sign Up button is clicked
    ////////////////////////////////////////////////////////////////////////////////
    async function handleSubmit() {
        handleAllValidation().then(result => {
            if (result === true) {
                axios.post('http://127.0.0.1:8000/adduser', {'fullname': fullname, 'uid': uid, 'email': email, 'password': password})
                .then(res => console.log(res));
                navigate('/');
            }
        });
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
        <div className='signup-body'>
            <div className='signup-box'>
                <div className='signup-center-align'>
                    <div className='signup-form-label'>FULL NAME</div>
                    <input onChange={event => setFullname(event.target.value)} id='signup-form-box-name'  type="text" placeholder="Enter Full Name (Firstname Lastname)"/>
                    <div className='signup-form-label'>UID</div>
                    <input onChange={event => setUID(event.target.value)} id='signup-form-box' type="number" placeholder="Enter 9-digits UID"/>
                    <div className='signup-form-label'>UCLA EMAIL</div>
                    <input onChange={event => setEmail(event.target.value.toLocaleLowerCase())} id='signup-form-box-email' type="text" placeholder="Enter UCLA Email Address"/>
                    <div className='signup-form-label-pwd'>
                        <div id='pwd-text'>PASSWORD</div>
                        <div className='signup-form-label-right'><button id='signup-show-pwd' onClick={togglePassword}>{passwordShown === false ? <BsEyeFill /> : <BsEyeSlashFill />}</button></div>
                    </div>
                    <input onChange={event => setPassword(event.target.value)} id='signup-form-box' type={passwordShown ? "text" : "password"} placeholder="Enter Password"/>
                    <div className='signup-sub-form-label'>Password must contain at least 6 characters consist of one uppercase letter, one digit, and one special symbols (!@#$%^&*)</div>
                    <button className="signup-btn" id="signup-btn" type="submit" onClick={handleSubmit}>SIGN UP</button>
                    <div><button className="signup-soft-btn" type="submit" onClick={()=>navigate("/")}>Already registered, sign in?</button></div>
                </div>
            </div>
        </div>
    );
}


export default SignupPage;