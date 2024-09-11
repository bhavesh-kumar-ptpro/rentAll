import React, { Fragment, useEffect, useState, useContext, useRef } from "react";
// import { GlobalContext } from "../../context/GlobalContext";
import { Row, Card, Col, ListGroup, Badge, Tab, Modal, Button } from "react-bootstrap";
import sidebar1 from "../../images/naija/sidebar-1-img.jpg";
import sidebar2 from "../../images/naija/sidebar-2-img.jpg";
import help_call from "../../images/naija/help_call.jpg";
import got_insurance from "../../images/naija/got_insurance.jpg";
import married from "../../images/naija/married.svg";
import unmarried from "../../images/naija/unmarried.svg";
import gif from "../../images/naija/970x90_2.gif";
import styles from "../layouts/newstyle.module.css";
import cx from 'classnames';
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminPageTitle from "../components/AdminPageTitle/AdminPageTitle";
import PageTitle from "../layouts/PageTitle";
import { API_URL, googleMapAPI } from "../../apiconfig";
import { Form, Link, useNavigate } from "react-router-dom";
import { reset } from "redux-form";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import calenderDayFill from "../../icons/bootstrap-icons/icons/calendar-event.svg"
import ReactGoogleMapsLoader from "react-google-maps-loader";
import Geosuggest from 'react-geosuggest';
import 'react-geosuggest/module/geosuggest.css'
import { connect } from "react-redux";
let today = new Date
const StatePlans = (props) => {
    const geosuggestEl = useRef(null);
    const listItem = [
        "individual_plan",
        "corporate_plan",
        "travel_plan",
    ];
    const [state, setState] = useState([]);
    const [city, setCity] = useState([]);
    const [loading, setLoading] = useState(false);
    const [marriedtype, setmarriedtype] = useState(false);
    const [unmarriedtype, setunmarriedtype] = useState(false);
    const [date, setDate] = useState('');
    const [plantype, setplantype] = useState("individaul");
    const [selectState, setSelectState] = useState('');
    const [agevalue, setyear] = useState()
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        userId: props.userId,
        email: '',
        dob: date,
        state: '',
        local_govt: '',
        budget: '',
        conditions: '',
        no_of_children: '',
        marriage_status: marriedtype ? "married" : "unmarried",
        age: '',
        travelDestination: ""
    });
    //custome calender
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
    const months = Array.from({ length: 12 }, (_, i) => i + 1);
    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const [selectedYear, setSelectedYear] = useState(currentYear);
    const [selectedMonth, setSelectedMonth] = useState(1);
    const [selectedDay, setSelectedDay] = useState(1);

    const [show, setShow] = useState(false);

    const navigate = useNavigate();

    useEffect(async () => {
        today = new Date().toISOString().split('T')[0];
        const { data } = await axios.get(`${API_URL}/api/hospital/state`)
        setState(data.data)
    }, []);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleYearChange = (event) => {
        let today = new Date()
        let currentyear = today.getFullYear()
        setSelectedYear(event.target.value);
        updateDate(event.target.value, selectedMonth, selectedDay);
        setFormData({ ...formData, age: Math.abs(event.target.value - currentyear), dob: `${selectedDay}/${selectedMonth}/${event.target.value}` })
        console.log("year", currentyear);
        console.log("year", event.target.value);
    };
    const handleMonthChange = (event) => {
        setSelectedMonth(event.target.value);
        updateDate(selectedYear, event.target.value, selectedDay);
    };
    const handleDayChange = (event) => {
        setSelectedDay(event.target.value);
        updateDate(selectedYear, selectedMonth, event.target.value);
    };
    const updateDate = (year, month, day) => {
        // if (year && month && day) {
        let today = new Date()
        let currentyear = today.getFullYear()
        const formattedDate = new Date(year, month - 1, day).toLocaleDateString('en-GB');
        console.log("formattedDate", formattedDate);
        setDate(formattedDate)
        setFormData({ ...formData, dob: `${day}/${month}/${year}` });
        setFormData({ ...formData, age: Math.abs(year - currentyear), dob: `${selectedDay}/${selectedMonth}/${year}` })

        // }
    };
    const handleStateValue = () => {
        const selectElement = document.getElementById('mySelect');
    }
    const handleStateChange = async (e) => {
        const { stateValue, value } = e.target
        if (value) {
            let selectedState = state.filter((el) => { return el.id == value })
            setSelectState(selectedState[0].state)
            setFormData({ ...formData, state: selectedState[0].state })
        }
        console.log(value);

        // if(value != "") {
        handleStateValue()
        const { data } = await axios.get(`${API_URL}/api/hospital/city/${value}`)
        setCity(data.data)
        // }

    }
    const radiofn = (event) => {
        setplantype(event.target.value)
        if (event.target.value === "married") {
            setFormData({ ...formData, marriage_status: event.target.value })
            setmarriedtype(true)
            setunmarriedtype(false)
        }
        else if (event.target.value === "unmarried") {
            setFormData({ ...formData, marriage_status: event.target.value })
            setmarriedtype(false)
            setunmarriedtype(true)
        }


    };
    const amptyField = (val) => {
        toast.warn(`❗${val} Field is Empty`, {
            position: "top-right",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        setLoading(false)
    };
    const handleIndividualChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    const handleselectChange = (e) => {
        const { name, value } = e.target;
        let newdate = new Date(value)
        let today = new Date()
        let newyear = newdate.getFullYear()
        let currentyear = today.getFullYear()
        let year = currentyear - newyear;
        setyear(year)
        console.log(year, currentyear, newyear);

        setFormData({
            ...formData,
            [name]: value
        });
    };
    const handleSelectSuggest = (data) => {
        if (data) {
            setFormData({
                ...formData,
                travelDestination: data.description,
            });
        }

        // setdestination(data.description);
    }
    const handleSubmit = async (e) => {
        console.log("formData", formData);
        setLoading(true)
        e.preventDefault();
        const data = new FormData();

        if (formData.first_name == "") {
            amptyField("first name");

        } else if (formData.last_name == "") {
            amptyField("last name")
        } else if (formData.email == "" || !formData.email) {
            amptyField("Email")

        }
        else if (
            formData.dob == "" ||
            !formData.dob
        ) {
            amptyField("Date of Birth")
        }
        else if (formData.budget == "" || !formData.budget) {
            amptyField("budget")

        } else if (formData.conditions == "" || !formData.conditions) {
            amptyField("conditions")

        }
        else {
            try {
                const { data } = await axios.post(`${API_URL}/api/state_plan_master`,formData);
                setLoading(false)
                console.log("data", data);
                if (data.status == 400) {

                    toast.error(`${data.message}`)
                } else {
                    toast.success("✔️ Submision successful !", {
                        position: "top-right",
                        autoClose: 2500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
                localStorage.setItem('lastLocation', `/user/search_result?&localGovt=${formData.local_govt}&state=${formData.state}&budget=${formData.budget}&planType=State`);
                // window.myGlobalVariable = `/user/search_result?&localGovt=${formData.local_govt}&state=${formData.state}&budget=${formData.budget}&planType=Individual & Family`;
                // setGlobalVariable(`/user/search_result?&localGovt=${formData.local_govt}&state=${formData.state}&budget=${formData.budget}&planType=Individual & Family`);
                setInterval(() => {
                    window.location = `/user/search_result?&localGovt=${formData.local_govt}&state=${formData.state}&budget=${formData.budget}&planType=State`;
                    reset();
                }, 1500)
            } catch (error) {
                console.error('Error submitting HMO data:', error.message);
                toast.error(`${error.message}`)
            }
        }
    };
    console.log("props.userId",props.userId);
    
    return (
        // <div></div>
        <div className={styles["main-container"]}>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton className='bg-primary'>
                    <Modal.Title>Select Date of Birth<i class="ri-calendar-2-line text-white"></i></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group">
                        <label>Year</label>
                        <select value={selectedYear} onChange={handleYearChange} className="form-control">
                            {years.map(year => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Month</label>
                        <select value={selectedMonth} onChange={handleMonthChange} className="form-control">
                            {months.map(month => (
                                <option key={month} value={month}>{month}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Day</label>
                        <select value={selectedDay} onChange={handleDayChange} className="form-control">
                            {days.map(day => (
                                <option key={day} value={day}>{day}</option>
                            ))}
                        </select>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Date
                    </Button>
                </Modal.Footer>
            </Modal>
            <div>
            </div>
            <div className={styles["main-section"]}>
                <div className={styles["top_container_menu"]}>
                    <div className={styles["container"]}>
                        <div className={styles["health_insurance_menu"]}>
                            <ul>
                                <li><a href="/">Home</a></li>
                                <li className={styles["last_arrows"]}><a href="#" className={styles["active"]}>Search Plans</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className={styles["home-section-1"]}>
                    <div className={styles["container"]}>
                        <div className={cx(styles["row"], styles["inner_contaniner"])}>
                            <div className={styles["left_section"]}>
                                <h2 className={styles["summary_tittle"]}>Select Plan Type</h2>
                                <div className={styles["left-nav"]}>
                                    <ul>
                                        <li className={styles["treeview"]}><a href="/plans/1">Individual & Family <i className={styles["icon-caret"]}></i></a></li>

                                        <li className={styles["treeview"]}><a href="/plans/2">Corporate <i className={styles["icon-caret"]}></i></a></li>

                                        <li className={styles["treeview", 'active']}><a href="/plans/4">State <i className={styles["icon-caret"]}></i></a></li>

                                        <li className={styles["treeview"]}><a href="/plans/3">Travel <i className={styles["icon-caret"]}></i></a></li>
                                    </ul>
                                </div>
                                <div className={styles["sidebar"]}> <img alt="sidebar-2-img" src={sidebar2} /> </div>
                                <div className={styles["sidebar"]}> <img alt="sidebar-1-img" src={sidebar1} /> </div>
                            </div>
                            <div className={styles["middil_section"]}>
                                <div className={cx(styles["input_section"], styles["search-plan"])}>
                                    <h2 style={{ color: "#00a65a" }} className={styles["mid-title"]}>Search Plans</h2>
                                    <div className={styles["item_title"]}> State Plan</div>

                                    <div className={styles["individual-plan"]}>
                                        <Card>
                                            <Card.Header>
                                                <Card.Title>BUY STATE PLAN</Card.Title>
                                            </Card.Header>
                                            <Card.Body>
                                                <form id="form_individual" onSubmit={handleSubmit}>
                                                    <div>
                                                        <ReactGoogleMapsLoader
                                                            params={{
                                                                key: googleMapAPI, // Define your api key here
                                                                libraries: "places"// To request multiple libraries, separate them with a comma
                                                            }}
                                                            render={googleMaps =>
                                                                googleMaps && (
                                                                    <Geosuggest
                                                                        ref={geosuggestEl}
                                                                        placeholder={" Enter Your Location"}
                                                                        // inputClassName={s["commonControlInput"]}
                                                                        // className={s["geoSuggestContainer"]}
                                                                        // initialValue={personalized.location}
                                                                        // onChange={handleSearchChange}
                                                                        onSuggestSelect={handleSelectSuggest}
                                                                        autoComplete={'off'}
                                                                    />
                                                                )}
                                                        />
                                                    </div>
                                                    <div className={styles["col-5"]}>
                                                        <select
                                                            //   defaultValue={formData.type_of_hospital}
                                                            className="form-control-sm"
                                                            name="state"
                                                            //   value={formData.state}
                                                            onChange={(e) => handleStateChange(e)}
                                                        //   onSelect={(e)=>handleStateValue(e)}

                                                        >
                                                            <option value={""}>Select state</option>
                                                            {state && state.map((el) => {
                                                                return <option value={el.id} key={el.id} id="mySelect"  >{el.state}</option>
                                                            })}
                                                        </select>
                                                    </div>

                                                    <div className={styles["col-5"]} style={{ marginTop: "0.3%" }} >
                                                        <select
                                                            name="local_govt"
                                                            id="local_govt"
                                                            className="form-control-sm"
                                                            value={formData.local_govt}
                                                            onChange={handleIndividualChange}
                                                            style={{ width: 280 }}
                                                        >
                                                            <option value={""}>Select local goverment</option>
                                                            {city ? city.map((el, i) => {
                                                                return (
                                                                    <option value={el.city} key={i}>{el.city}</option>
                                                                )
                                                            }) : <option value={""}>Select local goverment</option>
                                                            }                            </select>
                                                    </div>
                                                    <div className={styles["col-5"]} style={{ marginLeft: 12 }} >
                                                        <input
                                                            name="first_name"
                                                            id="first_name"
                                                            type="text"
                                                            className="form-control form-control-sm"
                                                            placeholder="First Name"
                                                            value={formData.first_name}
                                                            onChange={handleIndividualChange}
                                                        />
                                                    </div>
                                                    <div className={styles["col-5"]} style={{ marginLeft: 12 }}>
                                                        <input
                                                            name="last_name"
                                                            id="last_name"
                                                            type="text"
                                                            placeholder="Last Name"
                                                            className="form-control form-control-sm"
                                                            value={formData.last_name}
                                                            onChange={handleIndividualChange}
                                                        />
                                                    </div>
                                                    <div className={styles["col-5"]} style={{ marginLeft: 12 }}  >
                                                        <input
                                                            name="email"
                                                            id="email"
                                                            type="email"
                                                            placeholder="Email Address"
                                                            className="form-control form-control-sm"
                                                            value={formData.email}
                                                            onChange={handleIndividualChange}
                                                        />
                                                    </div>
                                                    <div className={styles["col-5"]} >
                                                        <label>
                                                            Marrital status
                                                        </label>

                                                        <div className="radio-tile-group">
                                                            <div className="radio-container">
                                                                <input value="married" type="radio" name="radio" checked={plantype === "married"} onChange={radiofn} />
                                                                <div className="radio-tile">
                                                                    <img src={married} alt="Individual" width="30" height="30" title="married" style={{ marginTop: "3%" }} />
                                                                    <label className="indlabel">married</label>
                                                                </div>
                                                            </div>

                                                            <div className="radio-container">
                                                                <input value="unmarried" type="radio" name="radio" checked={plantype === "unmarried"} onChange={radiofn} />
                                                                <div className="radio-tile">
                                                                    <img src={unmarried} alt="Individual" width="30" height="30" title="unmarried" style={{ marginTop: "3%" }} />
                                                                    <label className="indlabel">unmarried</label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className={styles["col-5"]} style={{ marginLeft: 12 }}  >
                                                        <input
                                                            type="text"
                                                            className="form-control form-control-sm"
                                                            placeholder="DD/MM/YYYY"
                                                            value={formData.dob}
                                                            readOnly
                                                            onClick={handleShow}
                                                        />
                                                    </div>
                                                    <div className={styles["col-5"]} style={{ width: "46.5%" }}>
                                                        <div id="children_id">
                                                            <select
                                                                name="no_of_children"
                                                                id="no_of_children"
                                                                placeholder="No. of Children"
                                                                className="form-control-sm"
                                                                value={formData.no_of_children}
                                                                onChange={handleIndividualChange}
                                                            >
                                                                <option value="">No. of Children</option>
                                                                <option value="0">0</option>
                                                                <option value="1">1</option>
                                                                <option value="2">2</option>
                                                                <option value="3">3</option>
                                                                <option value="4">4</option>
                                                                <option value="5">5</option>
                                                            </select>
                                                        </div>
                                                    </div>



                                                    {/* <div className="col-5" style={{ marginLeft: 12 }}>
                            <select
                              name="state"
                              id="state"
                              type="select"
                              className="form-control-sm"
                              value={formData.state}
                              onChange={handleStateChange}
                              style={{ width: 290 }}
                            >
                              <option value={""}>Select state</option>
                              {state && state.map((el) => {
                                return <option value={el.id} key={el.id} id="mySelect"  >{el.state}</option>
                              })}
                            </select>
                          </div> */}



                                                    <div className={styles["col-5"]} style={{ marginLeft: 13 }}>
                                                        <select
                                                            name="budget"
                                                            id="budget"
                                                            data-placeholder="Budget  Range"
                                                            className="form-control-sm"
                                                            value={formData.budget}
                                                            onChange={handleIndividualChange}
                                                            style={{ width: "93%" }}
                                                        >
                                                            <option value="">Budget Range</option>
                                                            <option value="50000">Below N50,000</option>
                                                            <option value="50000 - 75000">N50,000 - N75,000</option>
                                                            <option value="75000 - 10000">N75,000 - N100,000</option>
                                                            <option value="10000 - 150000">N100,000 - N150,000</option>
                                                            <option value="150000">Above N150,000</option>
                                                        </select>
                                                    </div>
                                                    <div className={styles["col-5"]} style={{ marginLeft: 13 }}>
                                                        <select
                                                            name="conditions"
                                                            id="conditions"
                                                            data-placeholder="Pre-Existing Conditions"
                                                            className="form-control-sm"
                                                            value={formData.conditions}
                                                            onChange={handleIndividualChange}
                                                            style={{ width: 280 }}
                                                        >
                                                            <option value="">Pre-Existing Conditions</option>
                                                            <option>Hypertension</option>
                                                            <option>Diabetes</option>
                                                            <option>HIV</option>
                                                            <option>Sickle Cell Anaemia</option>
                                                        </select>
                                                    </div>

                                                    <div className={styles["col-5"]} style={{ marginLeft: 12 }} >
                                                        <input
                                                            name="age"
                                                            id="age"
                                                            type="text"
                                                            className="form-control form-control-sm"
                                                            placeholder="Your Age"
                                                            value={formData.age}
                                                            onChange={handleIndividualChange}
                                                            disabled
                                                        />
                                                    </div>

                                                    <p className={styles["clear"]} >
                                                        {loading ? <button type="submit" className="btn btn-primary">
                                                            Loading
                                                        </button> :
                                                            <button type="submit" className="btn btn-primary">
                                                                Submit
                                                            </button>}                          </p>
                                                </form>
                                            </Card.Body>

                                        </Card>
                                        <ToastContainer />

                                    </div>

                                </div>
                            </div>
                            <div className={styles["right_section"]}>
                                <div className={styles["sidebar"]}> <img alt="sidebar-1-img" src={help_call} /> </div>
                                <div className={styles["sidebar"]}> <img alt="sidebar-1-img" src={sidebar1} /> </div>
                                <div className={styles["sidebar"]}> <img alt="sidebar-2-img" src={got_insurance} /> </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div className={styles["advert"]}>
                <div className={styles["container"]}>
                    <div className={styles["row"]}>
                        <a href="http://www.medicwestafrica.com/" target="_blank">
                            <img src={gif} alt="add1" />
                        </a>
                    </div>
                </div>
            </div>
        </div>

    );
};

// export default StatePlans;
const mapStateToProps = (state) => {
    return {
      // userData: "rahul",
      userId: state.auth.auth.UserId,
    };
  };
  export default connect(mapStateToProps)(StatePlans);