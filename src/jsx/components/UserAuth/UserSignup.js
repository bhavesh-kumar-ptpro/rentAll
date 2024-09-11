import React, { Fragment, useEffect, useRef, useState } from "react";
// import styles
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';
import AdminPageTitle from "../AdminPageTitle/AdminPageTitle";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_URL } from "../../../apiconfig";
const UserSignup = () => {
    const navigate = useNavigate();


    const [fileName, setFileName] = useState("");
    const [state, setState] = useState([]);
    const [city, setCity] = useState([]);
    const [selectState, setSelectState] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        password: '',
        city: '',
        state: '',
    });
    useEffect(async () => {

        const { data } = await axios.get(`${API_URL}/api/hospital/state`)
        setState(data.data)

    }, [])

    const amptyField = () => {
        toast.info("❗ Field is Empty", {
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
        setFormData({ ...formData, phone: phoneNumber })
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
        if (formData.first_name == "") {
            amptyField()
        } else if (formData.last_name == "") {
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
        // else if ((!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i.test(formData.email))) {
        //     setLoading(false)
        //     toast.warn("❗ Enter valid email", {
        //         position: "top-right",
        //         autoClose: 5000,
        //         hideProgressBar: false,
        //         closeOnClick: true,
        //         pauseOnHover: true,
        //         draggable: true,
        //         progress: undefined,
        //     });
        // } 
         else if (formData.city == "" || !formData.city) {
            amptyField()
        }
        else if (formData.state == "" || !formData.state) {
            amptyField()
        }
        else {
            setLoading(true)
            try {
                setLoading(true)
                const { data } = await axios.post(`${API_URL}/api/user`, formData);
                setLoading(false)
                console.log(data,"data");
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
                    // navigate("/admin/view/ViewHospitals");

                }
            } catch (error) {
                console.error('Error submitting HMO data:', error.message);
            }

        }

    };


    return (
        <Fragment>
            {/* <AdminPageTitle activePage="Hospital Management" pageName="Add Hospital" /> */}

            <div >
                {/* <div className="card" > */}
                    <div className="card-header">
                        <h4 className="card-title">Signup</h4>
                    </div>

                    <div className="card-body">
                        
                        <div className="basic-form">

                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="form-group mb-3 col-md-6">
                                        <label className="col-sm-3 col-form-label">First Name</label>
                                        <div className="col-sm-9">
                                            <input
                                                name="first_name"
                                                type="text"
                                                className="form-control"
                                                placeholder="enter hospital name"
                                                value={formData.first_name}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group mb-3 col-md-6">
                                        <label className="col-sm-3 col-form-label">Last Name</label>
                                        <div className="col-sm-9">
                                            <input
                                                name="last_name"
                                                type="text"
                                                className="form-control"
                                                placeholder="enter hospital name"
                                                value={formData.last_name}
                                                onChange={handleChange}
                                                required
                                            />

                                        </div>
                                    </div>
                                </div>
                                <div className="row">



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
                                        <label className="col-sm-3 col-form-label">City</label>
                                        <div className="col-sm-9">

                                            <select
                                                //   defaultValue={'Select local govt type'}
                                                className="form-control form-control"
                                                name="city"
                                                value={formData.city}
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

                                </div>

                                <div className="row">
                                    <div className="form-group mb-3 col-md-6">
                                        <label className="col-sm-3 col-form-label">Password</label>
                                        <div className="col-sm-9">
                                            <input
                                                type="password"
                                                name="password"
                                                className="form-control"
                                                placeholder="enter address"
                                                value={formData.password}
                                                onChange={handleChange}
                                                minLength={8}

                                            />
                                        </div>
                                    </div>
                                    {/* <div className="form-group mb-3 col-md-6">
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
                                    </div> */}

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
                {/* </div> */}

            </div>
            <ToastContainer />
        </Fragment>
    );
};

export default UserSignup;
