import React, { Fragment, useEffect, useRef, useState } from "react";
// import styles
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';
import AdminPageTitle from "../../AdminPageTitle/AdminPageTitle";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_URL } from "../../../../apiconfig";
const AddHospital = () => {
  const navigate = useNavigate();


  const [fileName, setFileName] = useState("");
  const [state, setState] = useState([]);
  const [city, setCity] = useState([]);
  const [selectState, setSelectState] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    hospital_name: '',
    email: '',
    phone: '',
    local_govt: '',
    hospital_band: '',
    address: '',
    type_of_hospital: '',
    city: '',
    state: '',
  });
  useEffect(async () => {

    const { data } = await axios.get(`${API_URL}/api/hospital/state`)
    setState(data.data)

  }, [])

  const amptyField = () => {
    toast.warn("❗ Field is Empty", {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    setLoading(false)
  }
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };
  const handleStateValue = () => {
    const selectElement = document.getElementById('mySelect');
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
  const handleStateChange = async (e) => {
    const { stateValue, value } = e.target
    if (value) {
      let selectedState = state.filter((el) => { return el.id == value })
      setSelectState(selectedState[0].state)
      setFormData({ ...formData, state: selectedState[0].state })
    }
    handleStateValue()
    const { data } = await axios.get(`${API_URL}/api/hospital/city/${value}`)
    setCity(data.data)
  }
  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault();
    // setFormData({ ...formData, phone: phoneNumber })
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    if (formData.hospital_name == "") {
      amptyField()
    } else if (formData.email == "") {
      amptyField()
    }
    else if (
      isNaN(formData.phone) ||
      formData.phone == "" ||
      !formData.phone
    ) {
      toast.warn("❗ Add Valid Mobile Number", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setLoading(false)
    }
    else if ((!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i.test(formData.email))) {
      setLoading(false)
      toast.warn("❗ Enter valid email", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (formData.local_govt == "" || !formData.local_govt) {
      amptyField()
    } else if (formData.address == "" || !formData.address) {
      amptyField()
    } else if (formData.city == "" || !formData.city) {
      amptyField()
    }
    else if (formData.state == "" || !formData.state) {
      amptyField()
    }
    else {
      setLoading(true)
      try {
        setLoading(true)
        const { data } = await axios.post(`${API_URL}/api/hospital`, formData);
        setLoading(false)
        if (data.status == 400) {
          toast.error(`❗ ${data.message}!`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
          toast.success("✔️ Submision successful !", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          navigate("/admin/view/ViewHospitals");

        }
      } catch (error) {
        console.error('Error submitting HMO data:', error.message);
      }

    }

  };

  return (
    <Fragment>
      <AdminPageTitle activePage="Hospital Management" pageName="Add Hospital" />

      <div className="col-xl-12 row-lg-12" >
        <div className="card" >
          <div className="card-header">
            <h4 className="card-title">Add Hospital</h4>
          </div>

          <div className="card-body">
            <div className="basic-form">

              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="form-group mb-3 col-md-6">
                    <label className="col-sm-3 col-form-label">Hospital Name</label>
                    <div className="col-sm-9">
                      <input
                        name="hospital_name"
                        type="text"
                        className="form-control"
                        placeholder="enter hospital name"
                        value={formData.hospital_name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group mb-3 col-md-6">
                    <label className="col-sm-3 col-form-label">Hospital type</label>
                    <div className="col-sm-9">
                      <select
                        className="form-control form-control"
                        name="type_of_hospital"
                        value={formData.type_of_hospital}
                        onChange={handleChange}
                        required
                      >
                        <option value={""}>Select hospital type</option>
                        <option value={"Eye Hospital"}>Eye Hospital</option>
                        <option value={"General Hospital"}>General Hospital</option>
                        <option value={"Specialist Hospital"}>Specialist Hospital</option>
                        <option value={"Dental Hospital"}>Dental Hospital</option>
                        <option value={"Meternity Hospital"}>Meternity Hospital</option>
                      </select>

                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="form-group mb-3 col-md-6">
                    <label className="col-sm-3 col-form-label">State</label>
                    <div className="col-sm-9">
                      <select
                        //   defaultValue={formData.type_of_hospital}
                        className="form-control form-control"
                        name="state"
                        //   value={formData.state}
                        onChange={(e) => handleStateChange(e)}
                        //   onSelect={(e)=>handleStateValue(e)}
                        required
                      >
                        <option value={""}>Select state</option>
                        {state && state.map((el) => {
                          return <option value={el.id} key={el.id} id="mySelect"  >{el.state}</option>
                        })}
                      </select>
                    </div>
                  </div>
                  <div className="form-group mb-3 col-md-6">
                    <label className="col-sm-3 col-form-label">Contact No</label>
                    <div className="col-sm-9">

                      <input
                        type="text"
                        id="phone"
                        name="phone"
                        className="form-control"
                        placeholder="Contact No"
                        value={phoneNumber}
                        onChange={handlePhoneChange}
                        required
                        maxLength={10}
                        minLength={10}
                        onBlur={handleBlur}

                      />
                      {error && <div style={{ color: 'red' }}>{error}</div>}
                    </div>
                  </div>


                </div>
                <div className="row">


                  <div className="form-group mb-3 col-md-6">
                    <label className="col-sm-3 col-form-label">Local Goverment</label>
                    <div className="col-sm-9">

                      <select
                        //   defaultValue={'Select local govt type'}
                        className="form-control form-control"
                        name="local_govt"
                        value={formData.local_govt}
                        onChange={handleChange}

                      >
                        <option value={"Select"}>Select local goverment</option>
                        {city ? city.map((el, i) => {
                          return (
                            <option value={el.city} key={i}>{el.city}</option>
                          )
                        }) : <option value={""}>Select local goverment</option>
                        }
                        {/* <option value={"Select"}>Select local govt type</option> */}

                      </select>
                    </div>
                  </div>
                  <div className="form-group mb-3 col-md-6">
                    <label className="col-sm-3 col-form-label">Email</label>
                    <div className="col-sm-9">
                      <input
                        name="email"
                        type="text"
                        className="form-control"
                        placeholder="enter valid email"
                        value={formData.email}
                        onChange={handleChange}

                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="form-group mb-3 col-md-6">
                    <label className="col-sm-3 col-form-label">Address</label>
                    <div className="col-sm-9">
                      <input
                        type="text"
                        name="address"
                        className="form-control"
                        placeholder="enter address"
                        value={formData.address}
                        onChange={handleChange}

                      />
                    </div>
                  </div>
                  <div className="form-group mb-3 col-md-6">
                    <label className="col-sm-3 col-form-label">City</label>
                    <div className="col-sm-9">
                      <input
                        type="text"
                        name="city"
                        className="form-control"
                        placeholder="enter city"
                        value={formData.city}
                        onChange={handleChange}

                      />
                    </div>
                  </div>

                </div>
                <div className="row">
                  <div className="form-group mb-3 col-md-6">
                    <label className="col-sm-3 col-form-label">Hospital Band</label>
                    <div className="col-sm-9">
                      <input
                        type="text"
                        name="hospital_band"
                        className="form-control"
                        placeholder="Hospital Band"
                        value={formData.hospital_band}
                        onChange={handleChange}

                      />
                    </div>
                  </div>

                </div>
                <div className="col-sm-10">
                  {loading ? <button type="submit" className="btn btn-primary">
                    Loading
                  </button> :
                    <button type="submit" className="btn btn-primary">
                      Submit
                    </button>}
                </div>
              </form>

            </div>
          </div>
        </div>

      </div>
      <ToastContainer />
    </Fragment>
  );
};

export default AddHospital;
