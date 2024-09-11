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
        email: '',
        phone: '',
        password: '',
    });
    useEffect(async () => {

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
    // const handlePhoneChange = (e) => {
    //     const value = e.target.value;


    //     if (/[^0-9]/.test(value)) {
    //         setError('Please enter valid number');
    //     } else {
    //         setError('');
    //     }
    //     setPhoneNumber(value.replace(/\D/g, ''));
    //     setFormData({ ...formData, phone: phoneNumber })
    // };
    // const handleBlur = () => {
    //     if (phoneNumber.length !== 10) {
    //         setError('Phone number must be 10 digits.');
    //     }
    // };
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
                                        <label className="col-sm-3 col-form-label">Phone No</label>
                                        <div className="col-sm-9">

                                            <input
                                                type="text"
                                                id="phone"
                                                name="phone"
                                                className="form-control"
                                                placeholder="Contact No"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                required
                                                maxLength={10}
                                                minLength={10}
                                                onBlur={handleBlur}

                                            />
                                            {/* {error && <div style={{ color: 'red' }}>{error}</div>} */}
                                        </div>
                                    </div>
                                    <div className="row"> <h4>OR</h4></div>
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
