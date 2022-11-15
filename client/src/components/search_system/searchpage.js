import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {BsEyeFill, BsEyeSlashFill} from 'react-icons/bs';
import "@fontsource/gloria-hallelujah";
import './searchpage.css';

// The function that toggles between themes
function Searchpage(props) {

    const navigate = useNavigate();
    const [passwordShown, setPasswordShown] = useState(false);
    // Password toggle handler
    const togglePassword = () => {
        // When the handler is invoked
        // inverse the boolean state of passwordShown
        setPasswordShown(!passwordShown);
    };

    console.log(props.uid);

    return (
        <div className='search-body'>
            <span className= "search-btn-list">
                <button className="search-btn" type="submit" onClick={()=>navigate("/")}>LOG OUT</button>
            </span>
            <p id="search-title-name">BruinNotes</p>
        </div>
    );
}


export default Searchpage;