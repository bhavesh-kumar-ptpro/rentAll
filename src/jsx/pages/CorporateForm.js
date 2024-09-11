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
import s from "./newstyle.module.css";
import cx from 'classnames';
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminPageTitle from "../components/AdminPageTitle/AdminPageTitle";
import PageTitle from "../layouts/PageTitle";
import { API_URL, googleMapAPI } from "../../apiconfig";
import { useNavigate,useParams } from "react-router-dom";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

import ReactGoogleMapLoader from "react-google-maps-loader";
import Geosuggest from 'react-geosuggest';

// // CSS Modules, react-datepicker-cssmodules.css// 
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import 'react-geosuggest/module/geosuggest.css'
import { reset } from "redux-form";
const CorporateForm = () => {

  const { userId,hmo_Id } = useParams();


  const geosuggestEl = useRef(null);
  const fileInputRef = useRef(null);
  const [image, setImage] = useState({ logo_url: null });
  const [fileName, setFileName] = useState({ placeholder: "", file: null });
  const [imageError, setImageError] = useState("");
  const [state, setState] = useState([]);
  const [hospital, setHospital] = useState([]);
  const [selectState, setSelectState] = useState('');
  const [covrage, setcovrage] = useState([]);
  const [inputtype, setinputtype] = useState(false);
  const [traveller, settraveller] = useState([{ Name: "", Age: "" }]);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    userId:userId,
    hmo_Id:hmo_Id,
    pricing: "",
    description: "",
    hospital: "",
    document_attachment: "",
  });
  const navigate = useNavigate();
  useEffect(async () => {
    // today = new Date().toISOString().split('T')[0];
    const { data } = await axios.get(`${API_URL}/api/hospital/state`)
    const  data1  = await axios.get(`${API_URL}/api/corporate_hmo/hospital`)
    console.log(data1.data.data);
    console.log("data",data);
    
    setState(data.data)
    setHospital(data1.data.data)
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      document_attachment: file.name,
    });
    setImage({ fileuploads: file });
  };

  const handleStateValue = () => {
    const selectElement = document.getElementById('mySelect');
  }
  const handleStateChange = async (e) => {
    const { stateValue, value } = e.target
    if (value) {
      let selectedState = hospital.filter((el) => { return el.id == value })
      setSelectState(selectedState[0].hospital_name)
      setFormData({ ...formData, hospital: selectedState[0].hospital_name })
    }
    console.log(value);



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


    if (formData.description == "") {
      amptyField("description");

    }
    else if (formData.hospital == "") {
      amptyField("hospital");
    } else if (formData.pricing == "" || !formData.pricing) {
      amptyField("pricing")

    }
    
    else {
      try {

        if (image) {
          const url = `${API_URL}/api/corporate_hmo/upload`;
          const config = {
            headers: {
              "content-type": "multipart/form-data",
            },
          };
          axios.post(url, image, config).then((response) => {
          });
        }
        setTimeout(async () => {
        const { data } = await axios.post(`${API_URL}/api/corporate_hmo`, formData);
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
          window.location= `/`
        }

      }, 2500);

      } catch (error) {
        console.error('Error submitting in data:', error.message);
        toast.error(`${error.message}`)
      }
    }
  };

  console.log(hospital);
  console.log(covrage);

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
              <div className={s["middil_section"]}>
                <div className={cx(s["input_section"], s["search-plan"])}>
                  <h2 style={{ color: "#00a65a" }} className={s["mid-title"]}>Corporate Form</h2>

                  <div className={s["individual-plan"]}>
                    <Card>
                      <Card.Header>
                        <Card.Title>Corporate Form</Card.Title>
                      </Card.Header>
                      <Card.Body>
                        <form onSubmit={handleSubmit}>
                          {/* <input
                            name="hospital"
                            type="text"
                            className="form-control "
                            placeholder="hospital"
                            onChange={handleChange}
                          /> */}
                          {/* <div className={s["col-5"]}> */}
                            <select
                              //   defaultValue={formData.type_of_hospital}
                              className="form-control-sm"
                              name="state"
                              //   value={formData.state}
                              onChange={(e) => handleStateChange(e)}
                            //   onSelect={(e)=>handleStateValue(e)}

                            >
                              <option value={""}>Select hospital</option>
                              {hospital && hospital.map((el) => {
                                return <option value={el.id} key={el.id} id="mySelect"  >{el.hospital_name}</option>
                              })}
                            </select>
                          {/* </div> */}
                          <label>description</label>
                          <textarea name="description" onChange={handleChange}></textarea>
                          <input
                            name="pricing"
                            type="number"
                            className="form-control form-control-sm"
                            placeholder="pricing"
                            onChange={handleChange}
                            value={(formData.pricing).value.replace(/\D/g, '')}
                          />
                          <div className="mb-3 row">
                            <label htmlFor="logo_url" className="col-sm-3 col-form-label">Upload document</label>
                            <div>
                              <input
                                type="file"
                                id="logo_url"
                                name="logo_url"
                                className="form-control"
                                onChange={handleFileChange}
                                ref={fileInputRef}
                              />
                              {imageError && <div style={{ color: 'red', marginTop: "5px" }}>{imageError}</div>}
                            </div>
                          </div>

                          <button type="submit" className="btn btn-primary">
                            submit
                          </button>


                          <button type="reset" style={{ marginLeft: "5%" }} onClick={() => geosuggestEl.current.clear()} className="btn btn-primary">Reset Form</button>


                        </form>



                      </Card.Body>
                    </Card>
                    <ToastContainer />

                  </div>

                </div>
              </div>
              {/* <div className={s["right_section"]}>
                  <div className={s["sidebar"]}> <img alt="sidebar-1-img" src={help_call} /> </div>
                  <div className={s["sidebar"]}> <img alt="sidebar-1-img" src={sidebar1} /> </div>
                  <div className={s["sidebar"]}> <img alt="sidebar-2-img" src={got_insurance} /> </div>
                </div> */}
            </div>
          </div>
        </div>

      </div>
      {/* <div className={s["advert"]}>
          <div className={s["container"]}>
            <div className={s["row"]}>
              <a href="http://www.medicwestafrica.com/" target="_blank">
                <img src={gif} alt="add1" />
              </a>
            </div>
          </div>
        </div> */}
    </div>

  );
};

export default CorporateForm;
