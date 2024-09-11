import React, { Fragment, useEffect, useState, useRef } from "react";
import { Row, Card, Col, ListGroup, Badge, Tab } from "react-bootstrap";
// import withStyles from 'isomorphic-style-loader/withStyles'
import sidebar1 from "../../images/naija/sidebar-1-img.jpg";
import sidebar2 from "../../images/naija/sidebar-2-img.jpg";
import help_call from "../../images/naija/help_call.jpg";
import got_insurance from "../../images/naija/got_insurance.jpg";
import gif from "../../images/naija/970x90_2.gif";
import Trip from "../../images/naija/Tripcancel.svg";
import Lost from "../../images/naija/LostBag.svg";
import Emergency from "../../images/naija/hospitalplus.svg";
import Accidental from "../../images/naija/Accident.svg";
import Medical from "../../images/naija/Medicalcov.svg";
import s from "../layouts/newstyle.module.css";
import cx from 'classnames';
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminPageTitle from "../components/AdminPageTitle/AdminPageTitle";
import PageTitle from "../layouts/PageTitle";
import { API_URL, googleMapAPI } from "../../apiconfig";
import { useNavigate } from "react-router-dom";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

import ReactGoogleMapLoader from "react-google-maps-loader";
import Geosuggest from 'react-geosuggest';

// // CSS Modules, react-datepicker-cssmodules.css// 
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import 'react-geosuggest/module/geosuggest.css'
import { reset } from "redux-form";
let today = new Date
const TravelPlans = () => {

  const geosuggestEl = useRef(null);
  const [covrage, setcovrage] = useState([]);
  const [inputtype, setinputtype] = useState(false);
  const [traveller, settraveller] = useState([{ Name: "", Age: "" }]);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    Number: "",
    email: "",
    Travel_company: "",
    TravelDestination: "",
    TravelStartDate: "",
    TravelEndDate: "",
    PurposeofTravel: "",
    AgeofEachTraveler: traveller,
    TypeofCoverage: covrage,
    coverageamount: "",
    PreexistingMedicalConditions: "",
    AdditionalComments: ""
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handlecovChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setcovrage(val => [...val, value])
      setFormData({
        ...formData,
        TypeofCoverage: [...covrage, value],
      });
    }
  };

  const handleAgeChange = (event, index) => {
    let { name, value } = event.target;
    console.log(index);
    let onChangeValue = [...traveller];
    onChangeValue[index][name] = value;
    settraveller(onChangeValue);

    setFormData({
      ...formData,
      AgeofEachTraveler: traveller,
    });
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
    setFormData({
      ...formData,
      [name]: value
    });
  };


  const addtraveller = (number) => {
    const { name, value } = number.target;
    console.log(value);
    settraveller([...traveller, { Name: "", Age: "" }]);
    // settraveller({traveller:[...traveller,""]})

  };

  const handleDeleteInput = (index) => {
    const newArray = [...traveller];
    newArray.splice(index, 1);
    settraveller(newArray);
  };

  const handleSelectSuggest = (data) => {
    if (data) {
      setFormData({
        ...formData,
        TravelDestination: data.description,
      });
    }

    // setdestination(data.description);
  }

  const handlePhoneChange = (e) => {
    const value = e.target.value;


    if (/[^0-9]/.test(value)) {
      setError('Please enter valid number');
    } else {
      setError('');
    }
    setPhoneNumber(value.replace(/\D/g, ''));
    setFormData({ ...formData, Number: value.replace(/\D/g, '') })
  };
  const handleBlur = () => {
    if (phoneNumber.length !== 10) {
      setError('Phone number must be 10 digits.');
    }
  };


  const handleSubmit = async (e) => {

    console.log("formData", formData);
    setLoading(true)
    e.preventDefault();


    if (formData.name == "") {
      amptyField("Full Name");

    }
    else if (formData.Number == "") {
      amptyField("Mobile Number");
    } else if (formData.Travel_company == "" || !formData.Travel_company) {
      amptyField("Travel Company")

    }
    else if (formData.TravelDestination == "" || !formData.TravelDestination) {
      amptyField("Travel Destination")

    } else if (formData.TravelStartDate == "" || !formData.TravelStartDate) {
      amptyField("Travel Start Date")
    }
    else if (formData.TravelEndDate == "" || !formData.TravelEndDate) {
      amptyField("Travel End Date")

    } else if (formData.PurposeofTravel == "" || !formData.PurposeofTravel) {
      amptyField("Purpose of Travel")


    } else if (formData.TypeofCoverage == "" || !formData.TypeofCoverage) {
      amptyField("Type of Coverage")
    } else if (formData.coverageamount == "" || !formData.coverageamount) {
      amptyField("Coverage Amount")

    }
    else {
      // try {
      //   const { data } = await axios.post(`${API_URL}/api/travel_plan_master`, formData);
      //   setLoading(false)
      //   console.log("data", data);
      //   if (data.status == 400) {

      //     toast.error(`${data.message}`)
      //   } else {
      //     toast.success("✔️ Submision successful !", {
      //       position: "top-right",
      //       autoClose: 2500,
      //       hideProgressBar: false,
      //       closeOnClick: true,
      //       pauseOnHover: true,
      //       draggable: true,
      //       progress: undefined,
      //     });
      //   }
      //   localStorage.setItem('lastLocation', `/user/search_result?&localGovt=&state=&budget=${formData.coverageamount}&planType=Travel`);
      //   setInterval(() => {
      //     // navigate("/plans/3");
      //     window.location = `/user/search_result?&localGovt=&state=&budget=${formData.coverageamount}&planType=Travel`;
      //     reset();
      //   }, 1500)

      // } catch (error) {
      //   console.error('Error submitting in data:', error.message);
      //   toast.error(`${error.message}`)
      // }
    }
  };

  return (
    // <div>

    // </div>
    <div className={s["main-container"]}>
      <div className={s["main-section"]}>
        <div className={s["top_container_menu"]}>
          <div className={s["container"]}>
            <div className={s["health_insurance_menu"]}>
              <ul>
                <li><a href="index.php">Home</a></li>
                <li className={s["last_arrows"]}><a href="#" className={s["active"]}>Search Plans</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className={s["home-section-1"]}>
          <div className={s["container"]}>
            <div className={cx(s["row"], s["inner_contaniner"])}>
              <div className={s["left_section"]}>
                <h2 className={s["summary_tittle"]}>Select Plan Type</h2>
                <div className={s["left-nav"]}>
                  <ul>
                    <li className={s["treeview"]}><a href="/plans/1">Individual & Family <i className={s["icon-caret"]}></i></a></li>

                    <li className={s["treeview"]}><a href="/plans/2">Corporate <i className={s["icon-caret"]}></i></a></li>

                    <li className={s["treeview"]}><a href="/plans/4">State <i className={s["icon-caret"]}></i></a></li>

                    <li className={s["treeview", 'active']}><a href="/plans/3">Travel <i className={s["icon-caret"]}></i></a></li>
                  </ul>
                </div>
                <div className={s["sidebar"]}> <img alt="sidebar-2-img" src={sidebar2} /> </div>
                <div className={s["sidebar"]}> <img alt="sidebar-1-img" src={sidebar1} /> </div>
                {/* <div className={s["sidebar"]}> <img alt="sidebar-2-img" src={got_insurance} /> </div>
                <div className={s["sidebar"]}> <img alt="sidebar-1-img" src={help_call} /> </div> */}
              </div>
              <div className={s["middil_section"]}>
                <div className={cx(s["input_section"], s["search-plan"])}>
                  <h2 style={{ color: "#00a65a" }} className={s["mid-title"]}>Search Plans</h2>
                  <div className={s["item_title"]}> Travel Plan</div>

                  <div className={s["individual-plan"]}>
                    <Card>
                      <Card.Header>
                        <Card.Title>Travel Insurance Query Form</Card.Title>
                      </Card.Header>
                      <Card.Body>
                        <form onSubmit={handleSubmit}>
                          <ReactGoogleMapLoader
                            params={{
                              key: googleMapAPI, // Define your api key here
                              libraries: "places"// To request multiple libraries, separate them with a comma
                            }}
                            render={googleMaps =>
                              googleMaps && (
                                <Geosuggest
                                  ref={geosuggestEl}
                                  placeholder={" Enter Your Travel Destination"}
                                  // inputClassName={s["commonControlInput"]}
                                  // className={s["geoSuggestContainer"]}
                                  // initialValue={personalized.location}
                                  // onChange={handleSearchChange}
                                  onSuggestSelect={handleSelectSuggest}
                                  autoComplete={'off'}
                                />
                              )}
                          />
                          <div className={s["col-5"]} style={{ marginLeft: 12 }} >

                            <input
                              name="name"
                              type="text"
                              className="form-control "
                              placeholder="Full Name"
                              onChange={handleChange}
                            />
                          </div>
                          <div className={s["col-5"]} style={{ marginLeft: 12 }} >
                            <input
                              name="email"
                              type="text"
                              className="form-control form-control-sm"
                              placeholder="Email Address"
                              onChange={handleChange}
                            />
                          </div>
                          <div className={s["col-5"]} style={{ marginLeft: 12 }} >
                            <input
                              name="Number"
                              type="text"
                              className="form-control form-control-sm"
                              placeholder="Mobile Number"
                              // onChange={handleChange}
                              value={phoneNumber}
                              onChange={handlePhoneChange}
                              required
                              maxLength={10}
                              minLength={10}
                              onBlur={handleBlur}
                            />
                            {error && <div style={{ color: 'red' }}>{error}</div>}
                          </div>

                          {/* <div>
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
                        </div> */}

                          <div className={s["col-5"]} style={{ marginLeft: 12 }} >
                            <input
                              name="Travel_company"
                              type={"text"}
                              className="form-control form-control-sm"
                              placeholder="name of travel company/Airline"
                              onChange={handleChange}
                            />
                          </div>

                          {/* <div style={{marginTop:"10px"}}> */}


                          {/* </div> */}

                          <div className={s["col-5"]}>
                            <label htmlFor="budget">Travel Start Date</label>
                            <input
                              type="date"
                              name="TravelStartDate"
                              className="form-control form-control-sm"
                              placeholder="Date of Birth"
                              min={new Date().toISOString().split("T")[0]}
                              onChange={handleChange}
                              // max={today}20px
                              style={{ height: 48, width: "92%",fontSize:"medium",padding:"20px",boxShadow: "rgb(139 129 129 / 20%) 0px 4px 8px", }}

                            />
                          </div>
                          <div className={s["col-5"]}>
                            <label htmlFor="budget">Travel End Date</label>
                            <input
                              type="date"
                              name="TravelEndDate"
                              className="form-control form-control-sm"
                              placeholder="Date of Birth"
                              min={new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split("T")[0]}
                              onChange={handleChange}
                              // max={today}
                              style={{ height: 48, width: "92%",fontSize:"medium",padding:"20px",boxShadow: "rgb(139 129 129 / 20%) 0px 4px 8px", }}
                            />
                          </div>
                          <div className={s["col-5"]}>
                            <div >
                              <label htmlFor="PurposeofTravel" style={{ width: "90.7%", marginTop: "5%" }}>Purpose of Travel</label>
                              <select
                                name="PurposeofTravel"
                                placeholder="Plan Type"
                                className="form-control-sm"
                                value={formData.plan_type}
                                onChange={handleTravelChange}
                              // style={{ marginLeft: 12 }}
                              >
                                <option value="">Select Your Purpose of Travel</option>
                                <option value="Business">Business</option>
                                <option value="Vacation">Vacation</option>
                                <option value="Study">Study</option>
                                <option value="Other">Other</option>

                              </select>
                            </div>
                          </div>
                          <div className={s["col-5"]}>
                            <div >
                              <label htmlFor="coverageamount" style={{ width: "90.7%", marginTop: "5%" }}>Coverage Amount</label>
                              <select
                                name="coverageamount"
                                placeholder="Plan Type"
                                className="form-control-sm"
                                value={formData.plan_type}
                                onChange={handleTravelChange}
                              // style={{ marginLeft: 12 }}
                              >
                                <option value="">Coverage Amount</option>
                                <option value="100000">100000</option>
                                <option value="150000">150000</option>
                                <option value="200000">200000</option>
                                <option value="250000">250000</option>

                              </select>
                            </div>
                          </div>
                          {/* <div style={{ marginLeft: 12 }} >
                          
                        </div> */}

                          <label htmlFor="budget">Age of Each Traveler</label>
                          {traveller.map((item, index) => (
                            <div className="input_container" style={{ marginLeft: 12 }} key={index}>
                              <div><label htmlFor="budget">Traveller {index + 1}</label></div>
                              <div className={s["col-5"]} ><input
                                name="Name"
                                id="Name"
                                type={"text"}
                                className="form-control form-control-sm"
                                placeholder="Name"
                                // value={formData.first_name}
                                onChange={(event) => handleAgeChange(event, index)}
                              /></div>
                              <div className={s["col-5"]}><input
                                name="Age"
                                id="Age"
                                type={"text"}
                                className="form-control form-control-sm"
                                placeholder="Age"
                                // value={formData.first_name}
                                onChange={(event) => handleAgeChange(event, index)}
                              /></div>


                            </div>
                          ))}

                          <div style={{ marginBottom: "3%" }}>
                            <button type="button" onClick={addtraveller} className="btn btn-primary">
                              Add Traveller
                            </button>

                            {traveller.length > 1 && (
                              <button type="button" style={{ marginLeft: "5%" }} className="btn btn-primary" onClick={() => handleDeleteInput(1)}>Delete</button>
                            )}
                          </div>

                          {/* <label>Type of Coverage</label>
                          <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="" />
                            <label class="form-check-label" for=""> Medical Coverage </label>
                          </div>
                          <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="" />
                            <label class="form-check-label" for=""> Trip Cancellation </label>
                          </div>
                          <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="" />
                            <label class="form-check-label" for=""> Lost Baggage </label>
                          </div>
                          <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="" />
                            <label class="form-check-label" for=""> Emergency Evacuation </label>
                          </div>
                          <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="" />
                            <label class="form-check-label" for=""> Accidental Death </label>
                          </div> */}


                          <div>
                            <label>Type of Coverage</label>
                            <div class="radio-tile-group">

                              <div class="input-container">
                                <input value="Medical Coverage" type="checkbox" name="TypeofCoverage" onChange={handlecovChange} />
                                <div class="radio-tile">
                                  <img src={Medical} alt="Individual" width="60" height="60" title="Individual" />
                                  <label>Medical Coverage</label>
                                </div>
                              </div>

                              <div class="input-container">
                                <input value="Trip Cancellation" type="checkbox" name="TypeofCoverage" onChange={handlecovChange} />
                                <div class="radio-tile">
                                  <img src={Trip} alt="Individual" width="60" height="60" title="Individual" />
                                  <label>Trip Cancellation</label>
                                </div>
                              </div>

                              <div class="input-container">
                                <input value="Lost Baggage" type="checkbox" name="TypeofCoverage" onChange={handlecovChange} />
                                <div class="radio-tile">
                                  <img src={Lost} alt="Individual" width="60" height="60" title="Individual" />
                                  <label>Lost Baggage</label>
                                </div>
                              </div>

                              <div class="input-container">
                                <input value="Emergency Evacuation" type="checkbox" name="TypeofCoverage" onChange={handlecovChange} />
                                <div class="radio-tile">
                                  <img src={Emergency} alt="Individual" width="60" height="60" title="Individual" />
                                  <label>Emergency Evacuation</label>
                                </div>
                              </div>
                              <div class="input-container">
                                <input value="Accidental Death" type="checkbox" name="TypeofCoverage" onChange={handlecovChange} />
                                <div class="radio-tile">
                                  <img src={Accidental} alt="Individual" width="60" height="60" title="Individual" />
                                  <label>Accidental Death</label>
                                </div>
                              </div>

                            </div>
                          </div>

                          <div>
                            <div className={s["col-5"]}>
                              <label>Pre-existing Medical Conditions</label>
                              <textarea name="PreexistingMedicalConditions" id="" onChange={handleChange}></textarea>
                            </div>
                            <div className={s["col-5"]}>
                              <label>Additional Comments/Requests</label>
                              <textarea name="AdditionalComments" id="" onChange={handleChange}></textarea>
                            </div>
                          </div>
                          {/* <div style={{ marginBottom: "3%" }}> */}
                          <button type="submit" className="btn btn-primary">
                            submit
                          </button>


                          <button type="reset" style={{ marginLeft: "5%" }} onClick={() => geosuggestEl.current.clear()} className="btn btn-primary">Reset Form</button>

                          {/* </div> */}
                        </form>


                        {/* <div>
                          <label >Travel End Date</label>
                        </div>
                        <input type="checkbox" name="budget" />Medical Coverage
                        <input type="checkbox" name="budget" />Medical Coverage
                        <input type="checkbox" name="budget" />Medical Coverage
                        <input type="checkbox" name="budget" />Medical Coverage
                        <input type="checkbox" name="budget" />Medical Coverage */}





                      </Card.Body>
                    </Card>
                    <ToastContainer />

                  </div>

                </div>
              </div>
              <div className={s["right_section"]}>
                <div className={s["sidebar"]}> <img alt="sidebar-1-img" src={help_call} /> </div>
                <div className={s["sidebar"]}> <img alt="sidebar-1-img" src={sidebar1} /> </div>
                <div className={s["sidebar"]}> <img alt="sidebar-2-img" src={got_insurance} /> </div>
                {/* <div className={s["sidebar"]}> <img alt="sidebar-2-img" src={got_insurance} /> </div>
                <div className={s["sidebar"]}> <img alt="sidebar-2-img" src={got_insurance} /> </div>
                <div className={s["sidebar"]}> <img alt="sidebar-2-img" src={got_insurance} /> </div> */}
              </div>
            </div>
          </div>
        </div>

      </div>
      <div className={s["advert"]}>
        <div className={s["container"]}>
          <div className={s["row"]}>
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
