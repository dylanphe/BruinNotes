import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {AiOutlinePoweroff} from 'react-icons/ai';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import "@fontsource/gloria-hallelujah";
import './searchpage.css';
import LoginBtn from './logoutbtn';
import LogoutBtn from './logoutbtn';
// import '../class_system/coursepage.css';

// The function that toggles between themes
function Searchpage() {

    const navigate = useNavigate();
    const [passwordShown, setPasswordShown] = useState(false);
    const [show, setShow] = useState(false);
    const [showMsg, setShowMsg] = useState(false);
    let msg = "hiiiiii"; // TODO: change default message

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const handleCloseMsg = () => setShowMsg(false);
    const handleShowMsg = () => setShowMsg(true);

    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
    }

    const [course, setCourse] = useState('');

    const handleSubmit = async (e) => {}

    return (
        <div className='search-body'>
            <LogoutBtn />
            <div className='coursepage-nav-button'>
                <button type='button' className='coursepage-btn' onClick={handleShow}>+ Add class if not found</button>
            </div>
            <p id="search-title-name">BruinNotes</p>

            <div className="float-container">
                <div className="dropdown float-child">
                <input className='searchbar' type="text" onChange={event => setCourse(event.target.value)} placeholder="Search"/>
                    <div className="dropdown-content">
                        <a href="#">Link 1</a>
                        <a href="#">Link 2</a>
                        <a href="#">Link 3</a>
                    </div>
                </div>
            </div>


            <> {/* ref: https://react-bootstrap.github.io/components/modal/ */}
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Enter Class and Year</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form action="#">
                        <div className='modal-input-box'>
                        <span id='modal-input-label'>Enter Class Abrev. </span>
                        <br />
                        <input type="text" name="abrev" id="modal-input" placeholder="(ex. COM SCI, ENGL, MATH)" onChange={handleChange}></input>
                        </div>
                        <br/>
                        <div className='modal-input-box'>
                        <span id='modal-input-label'>Enter Code</span>
                        <input type="text" name='code' id="modal-input" placeholder="(ex. 31, 32, 33)" onChange={handleChange}></input> 
                        </div>
                    </Form>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={/*handleClose*/ handleSubmit}>
                        Save Changes
                    </Button>
                    </Modal.Footer>
                </Modal>
                {/* <AddClassMsg /> */}
                <Modal show={showMsg} onHide={handleCloseMsg}>
                    <Modal.Body 
                    // style={{display: 'flex'}}
                    >
                    {msg}{'     '}
                    <Button variant="success" onClick={/*handleClose*/ handleCloseMsg} style={{float: 'right'}}>
                        OK
                    </Button>
                    </Modal.Body>
                </Modal>
                </>
        </div>
    );
}


export default Searchpage;