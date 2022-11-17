import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {BsEyeFill, BsEyeSlashFill} from 'react-icons/bs';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import "@fontsource/gloria-hallelujah";
import './searchpage.css';
// import '../class_system/coursepage.css';

// The function that toggles between themes
function Searchpage() {

    const navigate = useNavigate();
    const [passwordShown, setPasswordShown] = useState(false);
    const [show, setShow] = useState(false);
    const [showMsg, setShowMsg] = useState(false);
    let msg = "hiiiiii"; // TODO: change default message
    // Password toggle handler
    const togglePassword = () => {
        // When the handler is invoked
        // inverse the boolean state of passwordShown
        setPasswordShown(!passwordShown);
    };

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const handleCloseMsg = () => setShowMsg(false);
    const handleShowMsg = () => setShowMsg(true);

    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
      }

    const handleSubmit = async (e) => {}

    return (
        <div className='search-body'>
            <span className= "search-btn-list">
                <button className="search-btn" type="submit" onClick={()=>navigate("/")}>LOG OUT</button>
            </span>
            <p id="search-title-name">BruinNotes</p>

            <div className="float-container">
                <div className="dropdown float-child">
                    <button className="dropbtn">hover for classes</button>
                    <div className="dropdown-content">
                        <a href="#">Link 1</a>
                        <a href="#">Link 2</a>
                        <a href="#">Link 3</a>
                    </div>
                </div>
                    <button type='button' className='searchpage-btn float-child' onClick={handleShow}>+ Add class if not found</button>
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