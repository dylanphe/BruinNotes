import React, {useState} from 'react';
import {Link,  useParams} from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import "@fontsource/gloria-hallelujah";
import './searchpage.css';
import LogoutBtn from './logoutbtn';
// import '../class_system/coursepage.css';

// The function that toggles between themes
function Searchpage(props) {
    const [show, setShow] = useState(false);

    const [showMsg, setShowMsg] = useState(false);
    let msg = "hiiiiii"; // TODO: change default message

    console.log(props.uid);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const handleCloseMsg = () => setShowMsg(false);
    const handleShowMsg = () => setShowMsg(true);

    const [course, setCourse] = useState('');
    const [code, setCode] = useState('');
    const courseList = [
        "AERO ST",
        "AF AMER",
        "AFRC ST",
        "AM IND",
        "ANES",
        "ANTHRO",
        "AF LANG",
        "APPLING",
        "ARCHEOL",
        "ARCH&UD",
        "ART",
        "ART HIS",
        "ART&ARC",
        "ASIA AM",
        "ASIAN",
        "CHIN",
        "FILIPNO",
        "HIN-URD",
        "INDO",
        "JAPAN",
        "KOREA",
        "S ASIAN",
        "SEASIAN",
        "THAI",
        "VIETMSE",
        "A&O SCI",
        "BIOENGR",
        "BIOINFO",
        "BIOL CH",
        "BIOMATH",
        "BMD RES",
        "BIOSTAT",
        "CH ENGR",
        "APP CHEM",
        "CHEM",
        "CHICANO",
        "CCAS",
        "CIVIC",
        "C&EE",
        "CLASSIC",
        "GREEK",
        "LATIN",
        "CLUSTER",
        "COMM",
        "COMM ST",
        "CESC",
        "COM HLT",
        "COM LIT",
        "C&S BIO",
        "BIOMATH",
        "BIOINFR",
        "COM SCI",
        "CLT HTG",
        "DENT",
        "ORL BIO",
        "DESMA",
        "DGT HUM",
        "DIS STD",
        "EPS SCI",
        "EA STDS",
        "EE BIOL",
        "ECON",
        "EDUC",
        "EC ENGR",
        "EL ENGR",
        "ENGR",
        "ENGL",
        "ENVIRON",
        "ENV HLT",
        "EPIDEM",
        "ETHNOMU",
        "ETHNMUS",
        "DUTCH",
        "ELTS",
        "FRNCH",
        "GERMAN",
        "ITALIAN",
        "SCAND",
        "YIDDSH",
        "FAM MED",
        "FIAT LX",
        "FILM TV",
        "FOOD ST",
        "GENDER",
        "GE CLST",
        "GEOG",
        "GRNTLGY",
        "GLB HLT",
        "GJ STDS",
        "GLBL ST",
        "GRAD PD",
        "HLT POL",
        "HLT ADM",
        "HIST",
        "HNRS",
        "HUM GEN",
        "I E STD",
        "INF STD",
        "PHYSCI",
        "I A STD",
        "INTL DV",
        "I M STD",
        "LBR&WS",
        "LBR STD",
        "LATN AM",
        "LAW",
        "UG-LAW",
        "LGBTS",
        "LGBTQS",
        "LIFESCI",
        "ASL",
        "LING",
        "SWAHILI",
        "IEP",
        "MGMT",
        "MGMTEX",
        "MGMTFT",
        "MGMTFE",
        "MGMTGEX",
        "MGMTMFE",
        "MGMTMSA",
        "MGMTPHD",
        "MAT SCI",
        "MATH",
        "COMPTNG",
        "MECH&AE",
        "MED",
        "MIMG",
        "MIL SCI",
        "M PHARM",
        "MOL BIO",
        "MOL TOX",
        "MCD BIO",
        "MC&IP",
        "MIA STD",
        "MUSIC",
        "MUSC",
        "MUS IND",
        "MSC IND",
        "MUS HST",
        "MSC HST",
        "MUSCLGY",
        "MUSCLG",
        "NAV SCI",
        "AN N EA",
        "ARABIC",
        "ARMENIA",
        "HEBREW",
        "IRANIAN",
        "ISLM ST",
        "JEWISH",
        "M E STD",
        "NR EAST",
        "SEMITIC",
        "TURKIC",
        "MED HIS",
        "NEURBIO",
        "NEURLGY",
        "NEUROSC",
        "NEURO",
        "NEURSGY",
        "NONDEPT",
        "NURSING",
        "OBGYN",
        "OPTH",
        "ORTHPDC",
        "PATH",
        "PEDS",
        "PHILOS",
        "ASTR",
        "PHYSICS",
        "QNT SCI",
        "PBMED",
        "PHYSIOL",
        "POL SCI",
        "PSYCTRY",
        "PSYCH",
        "PUB AFF",
        "PUB HLT",
        "PUB PLC",
        "RAD ONC",
        "RELIGN",
        "RES PRC",
        "SCAND",
        "SCI EDU",
        "BULGR",
        "C&EE ST",
        "CZCH",
        "HNGAR",
        "LTHUAN",
        "POLSH",
        "ROMANIA",
        "RUSSN",
        "SRB CRO",
        "SLAVC",
        "UKRN",
        "SOC SC",
        "SOC THT",
        "SOC WLF",
        "SOC GEN",
        "SOCIOL",
        "IL AMER",
        "PORTGSE",
        "SPAN",
        "STATS",
        "SUMMER",
        "SURGERY",
        "THEATER",
        "UNIV ST",
        "URBN PL",
        "UROLOGY",
        "ARTS ED",
        "DANCE",
        "WL ARTS",
        "ESL",
        "ENGCOMP"
    ];


    function validateCourse() {
        var c = null;
        for (c of courseList) {
            if (course.trim() === c) {
                //alert("true");
                return true;
            }
        }
        //alert("false");
        return false;
    }

    

    function handleSubmit() {
        if (validateCourse()) {
            axios.post('http://127.0.0.1:8000/addcoursename', {'courseName': course+' '+code})
            .then(res => console.log(res));
            handleClose();
        }
        else {
            alert("Please Enter Correct Course Info.");
            return;
        }
    }

    const [search, setSearch] = useState();
    const [showRes, setShowRes] = useState(true);
    const[searchItems, setsearchItems] = useState([]);

    function searchlist(event) {
        setSearch(event.target.value.toLocaleUpperCase());
        let items = [];
        if (!search[1]) {
            setsearchItems([]);
            return;
        } else {
            //console.log(search);
            setShowRes(true);
            axios.get('http://127.0.0.1:8000/searchcoursenames/'+search)
            .then(res => {
                if (res.data.length !== 0)
                {
                    res.data.map((courseDataElement) => {
                        items.push(courseDataElement.courseName);
                    });
                    //console.log(items);
                    setsearchItems(items);
                    console.log(searchItems);
                }
            });
        } 
    }

    return (
        <div className='search-body'>
            <LogoutBtn onLogout={props.onLogout} />
            <div className='coursepage-nav-button'>
                <button type='button' className='coursepage-btn' onClick={handleShow}>+ Add class if not found</button>
            </div>
            <p id="search-title-name">BruinNotes</p>

            <div className="float-container">
                <div className="dropdown float-child">
                    <input className='searchbar' type="text" onChange={event => searchlist(event)} placeholder="Search"/>
                    {showRes && (<div className='search-box'>
                        {showRes && 
                            (<div className="dropdown-content">
                                { searchItems.map((c) =>
                                    <Link className ="search-item" to={"".concat(c)}>{c}</Link>
                                )
                                }
                            </div>)}
                    </div>)}
                </div>
            </div>


            <> {/* ref: https://react-bootstrap.github.io/components/modal/ */}
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Enter CourseName and Code</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form action="#">
                        <div className='modal-input-box'>
                            <span id='modal-input-label'>Enter Class Abrev. </span>
                            <br />
                            <input onChange={event => setCourse(event.target.value.toLocaleUpperCase())} id="search-modal-input" type="text" name="abrev" placeholder="(ex. COM SCI, ENGL, MATH)"></input>
                            </div>
                            <br/>
                            <div className='modal-input-box'>
                            <span id='modal-input-label'>Enter Code</span>
                            <input onChange={event => setCode(event.target.value.toLocaleUpperCase())} type="text" name='code' id="search-modal-input" placeholder="(ex. 31, M152A, 33)"></input> 
                        </div>
                    </Form>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
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