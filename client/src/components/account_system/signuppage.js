import React, {useState, useEffect
} from 'react';
import "@fontsource/gloria-hallelujah";
import './signuppage.css';
import axios from 'axios'

// The function that toggles between themes
function SignupPage() {

    async function testConnection() {
        const response = await fetch('/Signup');
        const data = await response.json();
        console.log(data);
        return 0;
    }
    asdf

    const [firstname, setFirstname] = React.useState('')
    const [lastname, setLastname] = React.useState('')
    const [email, setEmail] = React.useState('')

    const handleSubmit = (event) => {
        const userInfo = {
            'firstname': firstname,
            'lastname': lastname,
            'email': email
        }

        fetch("http://localhost:8000/adduser", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userInfo)
        })
    }
    
    // const addUserHandler = () => {
    //     axios.post('http://127.0.0.1:8000/adduser', {'firstname': firstname, 'lastname': lastname, 'email': email})
    //         .then(res => console.log(res))
    // }

    //useEffect(() => {
    //    testConnection();
    //}, []);

    return (
        <div className='signup-body'>
            <span id = "title-txt">BruinNotes</span>
            <button className="btn" id="signup-btn" type="submit">HOME</button>
            <div className='signup-box'>
                <span id = "name-box">
                    <input onChange={event => setLastname(event.target.value)} id='short-textbox'  type="text" placeholder="Enter Last Name"/> 
                    <input onChange={event => setFirstname(event.target.value)} id='short-textbox' type="text" placeholder="Enter First Name"/>
                </span>
                <input  onChange={event => setEmail(event.target.value)} id='long-textbox' type="text" placeholder="Enter UCLA Email Address"/>
                <input  id='long-textbox' type="text" placeholder="Enter Password"/>
                <input  id='long-textbox' type="text" placeholder="Rytype Password"/>
                <button  className="btn" id="signup-btn" type="submit" onClick={handleSubmit} >SIGN UP</button>
            </div>
        </div>
    );
}


export default SignupPage;