import React, { Fragment, useEffect, useState } from "react";
import { Row, Card, Col, ListGroup, Badge, Tab } from "react-bootstrap";
import sidebar1 from "../../images/naija/sidebar-1-img.jpg";
import sidebar2 from "../../images/naija/sidebar-2-img.jpg";
import help_call from "../../images/naija/help_call.jpg";
import got_insurance from "../../images/naija/got_insurance.jpg";
import gif from "../../images/naija/970x90_2.gif";
import Family from "../../images/naija/Family.svg";
import Student from "../../images/naija/Student.svg";
import Travelling from "../../images/naija/Travelling.svg";
import individaul from "../../images/naija/individaul.svg";
import styles from "../layouts/newstyle.module.css";
import cx from 'classnames';
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminPageTitle from "../components/AdminPageTitle/AdminPageTitle";
import PageTitle from "../layouts/PageTitle";
import { API_URL } from "../../apiconfig";
import { useNavigate } from "react-router-dom";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

// // CSS Modules, react-datepicker-cssmodules.css// 
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
let today = new Date
const TravelPlans = () => {
  const listItem = [
    "individual_plan",
    "corporate_plan",
    "travel_plan",
  ];
  const [state, setState] = useState([]);
  const [city, setCity] = useState([]);
  const [plantype, setplantype] = useState("individaul");
  const [inputtype, setinputtype] = useState(false);
  const [traveller, settraveller] = useState([]);
  const [individaultype, setindividaultype] = useState(true);
  const [familytype, setfamilytype] = useState(false);
  const [travellingtype, settravellingtype] = useState(false);
  const [studenttype, setstudenttype] = useState(false);
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [formData, setFormData] = useState({
    plan_type: '',
    payment_plan: '',
    direct_debit: '',
    state: '',
    local_govt: '',
    budget: '',
    conditions: '',
  });
  const navigate = useNavigate();
  useEffect(async () => {
    today = new Date().toISOString().split('T')[0];
    const { data } = await axios.get(`${API_URL}/api/hospital/state`)
    setState(data.data)
  }, []);
  const handleStateChange = async (e) => {
    const { stateValue, value } = e.target
    if (value) {
      let selectedState = state.filter((el) => { return el.id == value })
      //   setSelectState(selectedState[0].state)
      setFormData({ ...formData, state: selectedState[0].state })
    }
    const { data } = await axios.get(`${API_URL}/api/hospital/city/${value}`)
    setCity(data.data)
  }
  const radiofn = (event) => {
    setplantype(event.target.value)
    if (event.target.value === "Travelling") {
      settravellingtype(true)
      setstudenttype(false)
      setfamilytype(false)
      setindividaultype(false)
    }
    else if (event.target.value === "Student") {
      settravellingtype(false)
      setstudenttype(true)
      setfamilytype(false)
      setindividaultype(false)
    }
    else if (event.target.value === "Family") {
      settravellingtype(false)
      setstudenttype(false)
      setfamilytype(true)
      setindividaultype(false)
    }
    else if (event.target.value === "individaul") {
      settravellingtype(false)
      setstudenttype(false)
      setfamilytype(false)
      setindividaultype(true)
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

  const handleTravelChange = (e) => {
    const { name, value } = e.target;
    console.log(value);
    if (value === "International") {
      setinputtype(true)
    } else {
      setinputtype(false)
    }
    setFormData({
      ...formData,
      [name]: value
    });
  };


  const addtraveller = (number) => {
    const { name, value } = number.target;
    console.log(value);
    settraveller([...traveller, ""])
    // settraveller({traveller:[...traveller,""]})

  };

  const handleDeleteInput = (index) => {
    const newArray = [...traveller];
    newArray.splice(index, 1);
    settraveller(newArray);
  };


  const handleSubmit = async (e) => {
    console.log("formData", formData);
    setLoading(true)
    e.preventDefault();

    if (formData.plan_type == "") {
      amptyField("Plan Type");

    } else if (formData.payment_plan == "") {
      amptyField("Payment plan")
    } else if (formData.direct_debit == "" || !formData.direct_debit) {
      amptyField("Direct Debit")

    }
    else if (formData.state == "" || !formData.state) {
      amptyField("state")

    } else if (formData.local_govt == "" || !formData.local_govt) {
      amptyField("local govt")
    }
    else if (formData.budget == "" || !formData.budget) {
      amptyField("budget")

    } else if (formData.conditions == "" || !formData.conditions) {
      amptyField("conditions")

    }
    else {
      try {
        const { data } = await axios.post(`${API_URL}/api/travel_plan_master`, formData);
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
        setInterval(() => {
          // navigate("/plans/3");
          window.location = '/plans/3'
        }, 1500)

      } catch (error) {
        console.error('Error submitting HMO data:', error.message);
        toast.error(`${error.message}`)
      }
    }
  };

  traveller.map((age, index) => { console.log(index, "radio") });

  return (
    <div className={styles["main-container"]}>
      <div className={styles["main-section"]}>
        <div className={styles["top_container_menu"]}>
          <div className={styles["container"]}>
            <div className={styles["health_insurance_menu"]}>
              <ul>
                <li><a href="index.php">Home</a></li>
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

                    <li className={styles["treeview"]}><a href="#">Corporate <i className={styles["icon-caret"]}></i></a></li>

                    <li className={styles["treeview"]}><a href="#">State <i className={styles["icon-caret"]}></i></a></li>

                    <li className={styles["treeview", 'active']}><a href="/plans/3">Travel <i className={styles["icon-caret"]}></i></a></li>
                  </ul>
                </div>
                <div className={styles["sidebar"]}> <img alt="sidebar-2-img" src={sidebar2} /> </div>
                <div className={styles["sidebar"]}> <img alt="sidebar-1-img" src={sidebar1} /> </div>
              </div>
              <div className={styles["middil_section"]}>
                <div className={cx(styles["input_section"], styles["search-plan"])}>
                  <h2 style={{ color: "#00a65a" }} className={styles["mid-title"]}>Search Plans</h2>
                  <div className={styles["item_tittle"]}> Travel Plan</div>

                  <div className={styles["individual-plan"]}>
                    <Card>
                      <Card.Header>
                        <Card.Title>Travel Insurance Query Form</Card.Title>
                      </Card.Header>
                      {/* <Card.Body>
                        <div>
                          <div class="radio-tile-group">

                            <div class="input-container">
                              <input value="individaul" type="radio" name="radio" checked={plantype === "individaul"} onChange={radiofn} />
                              <div class="radio-tile">
                                <img src={individaul} alt="Individual" width="60" height="60" title="Individual" />
                                <label for="individaul">individaul</label>
                              </div>
                            </div>

                            <div class="input-container">
                              <input value="Family" type="radio" name="radio" checked={plantype === "Family"} onChange={radiofn} />
                              <div class="radio-tile">
                                <img src={Family} alt="Individual" width="60" height="60" title="Individual" />
                                <label for="Family">Family</label>
                              </div>
                            </div>

                            <div class="input-container">
                              <input value="Student" type="radio" name="radio" checked={plantype === "Student"} onChange={radiofn} />
                              <div class="radio-tile">
                                <img src={Student} alt="Individual" width="60" height="60" title="Individual" />
                                <label for="Student">Student</label>
                              </div>
                            </div>

                            <div class="input-container">
                              <input value="Travelling" type="radio" name="radio" checked={plantype === "Travelling"} onChange={radiofn} />
                              <div class="radio-tile">
                                <img src={Travelling} alt="Individual" width="60" height="60" title="Individual" />
                                <label for="Travelling">Travelling</label>
                              </div>
                            </div>

                          </div>
                        </div>

                        <div style={{ marginTop: 27 }}>
                          {individaultype ? (
                            <div>
                            <div style={{ marginLeft: 12 }} >
                              <input
                                name="days"
                                id="days"
                                type="text"
                                className="form-control form-control-sm"
                                placeholder="*Number of Travel Days"
                                value={formData.first_name}
                              />
                            </div>
                            <div className="form-group mb-3 row-md-6" >
                            <label className="col-form-label col-sm-3 pt-0" style={{ marginLeft: 20, marginTop: 2 }} >
                            Region
                            </label>
                            <div style={{ display: "flex", marginLeft: 17, padding: 5 }}>
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="marriage_status"
                                  value="single"
                                  // checked={formData.marriage_status === "single"}
  
                                />
                                <label className="form-check-label">
                                Asia & Schengen
                                </label>
                              </div>
                              <div className="form-check" style={{ marginLeft: 10 }}>
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="marriage_status"
                                  value="married"
  
                                />
                                <label className="form-check-label">
                                Worldwide
                                </label>
                              </div>

                            </div>
                          </div>
                          <div className={styles["col-5"]} style={{ marginLeft: 13,width:593 }}>
                          <label htmlFor="budget">Date of Birth</label>
                            <input
                              type="date"
                              name="dob"
                              className="form-control form-control-sm"
                              placeholder="Date of Birth"
                              value={formData.dob}
                              max={today}
                            style={{height:48}}
                            />
                          </div>
                            <div style={{ marginLeft: 12, marginTop: 109 }} >
                              <input
                                name="days"
                                id="days"
                                type="text"
                                className="form-control form-control-sm"
                                placeholder="Email Address"
                                value={formData.first_name}
                              />
                            </div>
                            <div style={{ marginLeft: 12 }} >
                              <input
                                name="days"
                                id="days"
                                type="text"
                                className="form-control form-control-sm"
                                placeholder="Mobile Number"
                                value={formData.first_name}
                              />
                            </div>
                            </div>
                          ) : ""}
                          {familytype ? (
                            <div>
                              <div className="form-group mb-3 row-md-6" >
                            <label className="col-form-label col-sm-3 pt-0" style={{ marginLeft: 20, marginTop: 2 }} >
                            Region
                            </label>
                            <div style={{ display: "flex", marginLeft: 17, padding: 5 }}>
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="marriage_status"
                                  value="single"
                                  // checked={formData.marriage_status === "single"}
                                  // onChange={handleIndividualChange}
                                />
                                <label className="form-check-label">
                                Asia & Schengen
                                </label>
                              </div>
                              <div className="form-check" style={{ marginLeft: 10 }}>
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="marriage_status"
                                  value="married"
                                  // onChange={handleIndividualChange}
                                />
                                <label className="form-check-label">
                                Worldwide
                                </label>
                              </div>

                            </div>
                          </div>
                              <div className={styles["col-5"]}>
                          <label htmlFor="budget">Travel Start Date</label>
                            <input
                              type="date"
                              name="dob"
                              className="form-control form-control-sm"
                              placeholder="Date of Birth"
                              value={formData.dob}
                              // onChange={handleIndividualChange}
                              // max={today}
                            style={{height:48,width:"89%"}}
                            />
                          </div>
                              <div className={styles["col-5"]}>
                          <label htmlFor="budget">Travel End Date</label>
                            <input
                              type="date"
                              name="dob"
                              className="form-control form-control-sm"
                              placeholder="Date of Birth"
                              value={formData.dob}
                              // onChange={handleIndividualChange}
                              // max={today}
                            style={{height:48,width:"89%"}}
                            />
                          </div>
                          <div>
                              <div >
                                <label htmlFor="plan_type" style={{ marginLeft: 12, width:"90.7%" }}>Traveling Members</label>
                                <select
                                  name="plan_type"
                                  placeholder="Plan Type"
                                  className="form-control-sm"
                                  value={formData.plan_type}
                                  onChange={handleTravelChange}
                                  style={{ marginLeft: 12 }}
                                >
                                  <option value="">Select Number of Members</option>
                                  <option value="Individual & Family">Applicant + Spouse</option>
                                  <option value="Corporate">Applicant + Spouse + Child1</option>
                                  <option value="Travel">Applicant + Spouse + Child1 + Child2</option>
                                  <option value="Travel">Applicant + Child1</option>
                                  <option value="Travel">Applicant + Child1+ Child2</option>

                                </select>
                              </div>
                            </div>
                          <div className={styles["col-5"]} style={{ marginLeft: 13,width:593 }}>
                          <label htmlFor="budget">DoB of Senior Most Member</label>
                            <input
                              type="date"
                              name="dob"
                              className="form-control form-control-sm"
                              placeholder="Date of Birth"
                              value={formData.dob}
                              // onChange={handleIndividualChange}
                              max={today}
                            style={{height:48}}
                            />
                          </div>
                          <div style={{ marginLeft: 12, marginTop: 96 }} >
                              <input
                                name="days"
                                id="days"
                                type="text"
                                className="form-control form-control-sm"
                                placeholder="Email Address"
                                value={formData.first_name}
                              // onChange={handleIndividualChange}
                              />
                            </div>
                            <div style={{ marginLeft: 12 }} >
                              <input
                                name="days"
                                id="days"
                                type="text"
                                className="form-control form-control-sm"
                                placeholder="Mobile Number"
                                value={formData.first_name}
                              // onChange={handleIndividualChange}
                              />
                            </div>
                            </div>
                          ) : ""}
                          {travellingtype ? (
                            <div>
                            <div className="form-group mb-3 row-md-6" >
                            <label className="col-form-label col-sm-3 pt-0" style={{ marginLeft: 20, marginTop: 2 }} >
                            Maximum Cover for Any Single Trip
                            </label>
                            <div style={{ display: "flex", marginLeft: 17, padding: 5 }}>
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="marriage_status"
                                  value="single"
                                  // checked={formData.marriage_status === "single"}
                                  // onChange={handleIndividualChange}
                                />
                                <label className="form-check-label">
                                30 Days
                                </label>
                              </div>
                              <div className="form-check" style={{ marginLeft: 10 }}>
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="marriage_status"
                                  value="married"
                                  // onChange={handleIndividualChange}
                                />
                                <label className="form-check-label">
                                45 Days
                                </label>
                              </div>

                            </div>
                          </div>
                            <div className="form-group mb-3 row-md-6" >
                            <label className="col-form-label col-sm-3 pt-0" style={{ marginLeft: 20, marginTop: 2 }} >
                            Region
                            </label>
                            <div style={{ display: "flex", marginLeft: 17, padding: 5 }}>
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="marriage_status"
                                  value="single"
                                  // checked={formData.marriage_status === "single"}
                                  // onChange={handleIndividualChange}
                                />
                                <label className="form-check-label">
                                Asia & Schengen
                                </label>
                              </div>
                              <div className="form-check" style={{ marginLeft: 10 }}>
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="marriage_status"
                                  value="married"
                                  // onChange={handleIndividualChange}
                                />
                                <label className="form-check-label">
                                Worldwide
                                </label>
                              </div>

                            </div>
                          </div>
                          <div className={styles["col-5"]} style={{ marginLeft: 13,width:593 }}>
                          <label htmlFor="budget">Date of Birth</label>
                            <input
                              type="date"
                              name="dob"
                              className="form-control form-control-sm"
                              placeholder="Date of Birth"
                              value={formData.dob}
                              // onChange={handleIndividualChange}
                              max={today}
                            style={{height:48}}
                            />
                          </div>
                            <div style={{ marginLeft: 12, marginTop: 109 }} >
                              <input
                                name="days"
                                id="days"
                                type="text"
                                className="form-control form-control-sm"
                                placeholder="Email Address"
                                value={formData.first_name}
                              // onChange={handleIndividualChange}
                              />
                            </div>
                            <div style={{ marginLeft: 12 }} >
                              <input
                                name="days"
                                id="days"
                                type="text"
                                className="form-control form-control-sm"
                                placeholder="Mobile Number"
                                value={formData.first_name}
                              // onChange={handleIndividualChange}
                              />
                            </div>
                            </div>
                          ) : ""}
                          {studenttype ? (
                            <div>
                            <div style={{ marginLeft: 12 }} >
                              <input
                                name="days"
                                id="days"
                                type="text"
                                className="form-control form-control-sm"
                                placeholder="*Number of Travel Days"
                                value={formData.first_name}
                              // onChange={handleIndividualChange}
                              />
                            </div>
                            <div className="form-group mb-3 row-md-6" >
                            <label className="col-form-label col-sm-3 pt-0" style={{ marginLeft: 20, marginTop: 2 }} >
                            Region
                            </label>
                            <div style={{ display: "flex", marginLeft: 17, padding: 5 }}>
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="marriage_status"
                                  value="single"
                                  // checked={formData.marriage_status === "single"}
                                  // onChange={handleIndividualChange}
                                />
                                <label className="form-check-label">
                                Asia & Schengen
                                </label>
                              </div>
                              <div className="form-check" style={{ marginLeft: 10 }}>
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="marriage_status"
                                  value="married"
                                  // onChange={handleIndividualChange}
                                />
                                <label className="form-check-label">
                                Worldwide
                                </label>
                              </div>

                            </div>
                          </div>
                          <div className={styles["col-5"]} style={{ marginLeft: 13,width:593 }}>
                          <label htmlFor="budget">Date of Birth</label>
                            <input
                              type="date"
                              name="dob"
                              className="form-control form-control-sm"
                              placeholder="Date of Birth"
                              value={formData.dob}
                              // onChange={handleIndividualChange}
                              max={today}
                            style={{height:48}}
                            />
                          </div>
                            <div style={{ marginLeft: 12, marginTop: 109 }} >
                              <input
                                name="days"
                                id="days"
                                type="text"
                                className="form-control form-control-sm"
                                placeholder="Email Address"
                                value={formData.first_name}
                              // onChange={handleIndividualChange}
                              />
                            </div>
                            <div style={{ marginLeft: 12 }} >
                              <input
                                name="days"
                                id="days"
                                type="text"
                                className="form-control form-control-sm"
                                placeholder="Mobile Number"
                                value={formData.first_name}
                              // onChange={handleIndividualChange}
                              />
                            </div>
                            </div>
                          ) : ""}
                        </div>
                        <p className={styles["clear"]} >
                          {loading ? <button type="submit" className="btn btn-primary">
                            Loading
                          </button> :
                            <button type="submit" className="btn btn-primary">
                              Submit
                            </button>}                          </p>

                      </Card.Body> */}
                      <Card.Body>
                        <div style={{ marginLeft: 12 }} >

                          <input
                            name="days"
                            id="days"
                            type="text"
                            className="form-control form-control-sm"
                            placeholder="Full Name"
                            value={formData.first_name}
                          />
                          <input
                            name="days"
                            id="days"
                            type="text"
                            className="form-control form-control-sm"
                            placeholder="Email Address"
                            value={formData.first_name}
                          />
                        </div>
                        <div style={{ marginLeft: 12 }} >
                          <input
                            name="days"
                            id="days"
                            type="text"
                            className="form-control form-control-sm"
                            placeholder="Mobile Number"
                            value={formData.first_name}
                          />
                        </div>

                        <div>
                          <div >
                            <label htmlFor="plan_type" style={{ marginLeft: 12, width: "90.7%" }}>Travel Destination</label>
                            <select
                              name="plan_type"
                              placeholder="Plan Type"
                              className="form-control-sm"
                              value={formData.plan_type}
                              onChange={handleTravelChange}
                              style={{ marginLeft: 12 }}
                            >
                              <option value="">Select Your Travel Destination</option>
                              <option value="Local">Local</option>
                              <option value="International">International</option>

                            </select>
                          </div>
                        </div>
                        <div style={{ marginLeft: 12 }} >
                          <input
                            name="days"
                            id="days"
                            type={inputtype ? "text" : "hidden"}
                            className="form-control form-control-sm"
                            placeholder="Destination Country"
                            value={formData.first_name}
                          />
                        </div>
                        <div className={styles["col-5"]}>
                          <label htmlFor="budget">Travel Start Date</label>
                          <input
                            type="date"
                            name="dob"
                            className="form-control form-control-sm"
                            placeholder="Date of Birth"
                            value={formData.dob}
                            // onChange={handleIndividualChange}
                            // max={today}
                            style={{ height: 48, width: "89%" }}
                          />
                        </div>
                        <div className={styles["col-5"]}>
                          <label htmlFor="budget">Travel End Date</label>
                          <input
                            type="date"
                            name="dob"
                            className="form-control form-control-sm"
                            placeholder="Date of Birth"
                            value={formData.dob}
                            // onChange={handleIndividualChange}
                            // max={today}
                            style={{ height: 48, width: "89%" }}
                          />
                        </div>
                        <div>
                          <div >
                            <label htmlFor="plan_type" style={{ marginLeft: 12, width: "90.7%" }}>Purpose of Travel</label>
                            <select
                              name="plan_type"
                              placeholder="Plan Type"
                              className="form-control-sm"
                              value={formData.plan_type}
                              onChange={handleTravelChange}
                              style={{ marginLeft: 12 }}
                            >
                              <option value="">Select Your Purpose of Travel</option>
                              <option value="Business">Business</option>
                              <option value="Vacation">Vacation</option>
                              <option value="Study">Study</option>
                              <option value="Other">Other</option>

                            </select>
                          </div>
                        </div>
                        {/* <div style={{ marginLeft: 12 }} >
                          
                        </div> */}

                        <label htmlFor="budget">Age of Each Traveler</label>
                        {traveller.map((item, index) => (
                          <div className="input_container" style={{ marginLeft: 12 }} key={index}>
                            <div><label htmlFor="budget">Traveller {index + 1}</label></div>
                            <div className={styles["col-5"]} ><input
                              name="Name"
                              id="Name"
                              type={"text"}
                              className="form-control form-control-sm"
                              placeholder="Name"
                              value={formData.first_name}
                            /></div>
                            <div className={styles["col-5"]}><input
                              name="no_of_traveller"
                              id="no_of_traveller"
                              type={"text"}
                              className="form-control form-control-sm"
                              placeholder="Age"
                              value={formData.first_name}
                            /></div>


                          </div>
                        ))}

                        <div>
                          <button onClick={addtraveller} className="btn btn-primary">
                            Add Traveller
                          </button>

                          {traveller.length > 1 && (
                            <button style={{marginLeft:"5%"}} className="btn btn-primary" onClick={() => handleDeleteInput(1)}>Delete</button>
                          )}
                        </div>
                        <div className={styles["col-5"]}>
                          <label >Travel End Date</label>
                        </div>
                        <input type="checkbox" name="budget" />Medical Coverage
                        <input type="checkbox" name="budget" />Medical Coverage
                        <input type="checkbox" name="budget" />Medical Coverage
                        <input type="checkbox" name="budget" />Medical Coverage
                        <input type="checkbox" name="budget" />Medical Coverage



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

export default TravelPlans;
