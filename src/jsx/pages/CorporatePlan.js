import React, { Fragment, useEffect, useState, useRef } from "react";
import { Row, Card, Col, ListGroup, Badge, Tab } from "react-bootstrap";
import { connect, useDispatch } from "react-redux";
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
import s from "./newstyle.module.css";
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
const CorporatePlan = (props) => {

  

    const geosuggestEl = useRef(null);
    const [state, setState] = useState([]);
    const [city, setCity] = useState([]);
    const [selectState, setSelectState] = useState('');
    const [covrage, setcovrage] = useState([]);
    const [inputtype, setinputtype] = useState(false);
    const [traveller, settraveller] = useState([{ Name: "", Age: "" }]);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
      userId:props.userData,
      agency_name: "",
      name:"",
        email: "",
        phone: "",
        contact_person: "",
        no_of_staff: 0,
        state: "",
        local_govt: "",
        budget: "",
        no_of_family_plan:"",
        no_of_member:""
    });
    const navigate = useNavigate();
    useEffect(async () => {
      // today = new Date().toISOString().split('T')[0];
      const { data } = await axios.get(`${API_URL}/api/hospital/state`)
      setState(data.data)
      // setState(data)
      console.log(data);
      
      
    }, []);
    const handleChange = (e) => {
      const { name, value } = e.target;
      console.log(name,value);
      
      setFormData({
        ...formData,
        [name]: value,
      });
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
      // setCity(data)
      // }
  
    }
  
  

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
  
  
  

  
    const handleSelectSuggest = (data) => {
      
      
      if (data) {
        // console.log(data.gmaps.name);
        // console.log(data);
        setFormData({
          ...formData,
          local_govt: data.gmaps.name,
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
      setFormData({ ...formData, phone: value.replace(/\D/g, '') })
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
      else if (formData.agency_name == "") {
        amptyField("Agency Name");
      }
      else if (formData.contact_person == "") {
        amptyField("Contact Person");
      }
      else if (formData.budget == "") {
        amptyField("budget");
      }
      else if (formData.Number == "") {
        amptyField("Mobile Number");
      } else if (formData.email == "" || !formData.email) {
        amptyField("email")
  
      }
      else if (formData.no_of_single_plan == "" || !formData.no_of_single_plan) {
        amptyField("number of single plan")
  
      } else if (formData.no_of_staff == "" || !formData.no_of_staff) {
        amptyField("Total No Staff")
      }
      else if (formData.no_of_family_plan == "" || !formData.no_of_family_plan) {
        amptyField("number of family plan")
  
      } else if (formData.no_of_member == "" || !formData.no_of_member) {
        amptyField("number of members")
  
  
      } else if (formData.state == "" || !formData.state) {
        amptyField("State")
      }
      //  else if (formData.local_govt == "" || !formData.local_govt) {
      //   amptyField("Local Govt")
  
      // }
      else {
        try {
          const { data } = await axios.post(`${API_URL}/api/corporate_plan_master`, formData);
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
          localStorage.setItem('lastLocation', `/user/search_result?&localGovt=&state=&budget=${formData.budget}&planType=Travel`);
          setInterval(() => {
            // navigate("/plans/3");
            window.location = `/user/search_result?&localGovt=&state=&budget=${formData.budget}&planType=Corporate`;
            reset();
          }, 1500)
  
        } catch (error) {
          console.error('Error submitting in data:', error.message);
          toast.error(`${error.message}`)
        }
      }
    };
  
    console.log(traveller);
    console.log(covrage);
    console.log(props.userData, "header userdata");
  
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
  
                      <li className={s["treeview", 'active']}><a href="#">Corporate <i className={s["icon-caret"]}></i></a></li>
  
                      <li className={s["treeview"]}><a href="/plans/4">State <i className={s["icon-caret"]}></i></a></li>
  
                      <li className={s["treeview"]}><a href="/plans/3">Travel <i className={s["icon-caret"]}></i></a></li>
                      <li className={s["treeview"]}><a href="/user/plans/2/details">View Details <i className={s["icon-caret"]}></i></a></li>
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
                    {/* <div className={s["item_title"]}>Corporate Plan</div> */}
  
                    <div className={s["individual-plan"]}>
                      <Card>
                        <Card.Header>
                          <Card.Title>Corporate Plan</Card.Title>
                        </Card.Header>
                        <Card.Body>
                          <form onSubmit={handleSubmit}>
                            {/* <ReactGoogleMapLoader
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
                            /> */}
                            <div className={s["col-5"]} style={{ marginLeft: 12 }} >
  
                              <input
                                name="agency_name"
                                type="text"
                                className="form-control "
                                placeholder="Agency Name"
                                onChange={handleChange}
                              />
                            </div>
                            <div className={s["col-5"]} style={{ marginLeft: 12 }} >
  
                              <input
                                name="name"
                                type="text"
                                className="form-control "
                                placeholder="Full Name"
                                onChange={handleChange}
                              />
                            </div>
                            {/* <div className={s["col-5"]} style={{ marginLeft: 12 }} >
  
                              <input
                                name="agency_name"
                                type="text"
                                className="form-control "
                                placeholder="Agency Name"
                                onChange={handleChange}
                              />
                            </div> */}
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
                                name="contact_person"
                                type="text"
                                className="form-control form-control-sm"
                                placeholder="Agency Contact Person"
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
                            <div className={s["col-5"]} style={{ marginLeft: 12 }} >
                              <input
                                name="no_of_staff"
                                type="text"
                                className="form-control form-control-sm"
                                placeholder="Total No of Staff"
                                onChange={handleChange}
                              />
                            </div>
                            <div className={s["col-5"]}>
                            <div >
                              <select
                                name="no_of_family_plan"
                                placeholder="Plan Type"
                                className="form-control-sm"
                                value={formData.plan_type}
                                onChange={handleChange}
                              // style={{ marginLeft: 12 }}
                              >
                                <option value="">Select No of Family Plans</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                                <option value="13">13</option>
                                <option value="14">14</option>
                                <option value="15">15</option>
                                <option value="16">16</option>
                                <option value="17">17</option>
                                <option value="18">18</option>
                                <option value="19">19</option>
                                <option value="20">20</option>

                              </select>
                            </div>
                          </div>

                            
                          <div className={s["col-5"]} style={{ marginLeft: 12 }} >
                              <input
                                name="no_of_member"
                                type="text"
                                className="form-control form-control-sm"
                                placeholder="No of Members"
                                onChange={handleChange}
                              />
                            </div>

                            <div className={s["col-5"]}>
                            <div >
                              {/* <label htmlFor="PurposeofTravel" style={{ width: "90.7%", marginTop: "5%" }}>Select No of Family Plans</label> */}
                              <select
                                name="no_of_single_plan"
                                placeholder="Plan Type"
                                className="form-control-sm"
                                value={formData.plan_type}
                                onChange={handleChange}
                              // style={{ marginLeft: 12 }}
                              >
                                <option value="">Select No of Single Plans</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                                <option value="13">13</option>
                                <option value="14">14</option>
                                <option value="15">15</option>
                                <option value="16">16</option>
                                <option value="17">17</option>
                                <option value="18">18</option>
                                <option value="19">19</option>
                                <option value="20">20</option>

                              </select>
                            </div>
                          </div>
                          
                            
                          <div className={s["col-5"]}>
                            <div >
                              {/* <label htmlFor="coverageamount" style={{ width: "90.7%", marginTop: "5%" }}>Coverage Amount</label> */}
                              <select
                                name="budget"
                                placeholder="Plan Type"
                                className="form-control-sm"
                                value={formData.budget}
                                onChange={handleChange}
                              // style={{ marginLeft: 12 }}
                              >
                                <option value="">Budget Range</option>
                              <option value="0 - 50000">Below N50,000</option>
                              <option value="50000 - 75000">N50,000 - N75,000</option>
                              <option value="75000 - 10000">N75,000 - N100,000</option>
                              <option value="10000 - 150000">N100,000 - N150,000</option>
                              <option value="150000">Above N150,000</option>

                              </select>
                            </div>
                          </div>
                          <div className={s["col-5"]}>
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

                          <div className={s["col-5"]} style={{ marginTop: "0.3%" }} >
                            <select
                              name="local_govt"
                              id="local_govt"
                              className="form-control-sm"
                              value={formData.local_govt}
                              onChange={handleChange}
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
                            <button type="submit" className="btn btn-primary">
                              submit
                            </button>
  
  
                            <button type="reset" style={{ marginLeft: "5%" }} className="btn btn-primary">Reset Form</button>
  
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

// export default CorporatePlan;
const mapStateToProps = (state) => {
  return {
    userData: state.auth.auth.UserId,
  };
};
export default connect(mapStateToProps)(CorporatePlan);