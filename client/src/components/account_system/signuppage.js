import React, {useState, useEffect
} from 'react';
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

    return (
        <div className='signup-body'>
            <span id = "title-txt">BruinNotes</span>
            <button className="btn" id="signup-btn" type="submit">HOME</button>
            <div className='signup-box'>
                <span id = "name-box">
                    <input id='short-textbox'  type="text" placeholder="Enter Last Name"/> 
                    <input id='short-textbox' type="text" placeholder="Enter First Name"/>
                </span>
                <input  id='long-textbox' type="text" placeholder="Enter UCLA Email Address"/>
                <input  id='long-textbox' type="text" placeholder="Enter Password"/>
                <input  id='long-textbox' type="text" placeholder="Rytype Password"/>
                <button className="btn" id="signup-btn" type="submit">SIGN UP</button>
            </div>
        </div>
    );
}


export default SignupPage;