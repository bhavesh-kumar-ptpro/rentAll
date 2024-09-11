import React, { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import styles
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';
import AdminPageTitle from "../../AdminPageTitle/AdminPageTitle";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_URL } from "../../../../apiconfig";
const EditHospital = () => {
    const navigate = useNavigate();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [error, setError] = useState('');
    const { id } = useParams();
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        hospital_name: '',
        email: '',
        phone: '',
        local_govt: '',
        hospital_band: '',
        address: '',
        type_of_hospital: '',
        state: '',
    });
    const [selectState, setSelectState] = useState('');
    const [state, setState] = useState([]);
    const [city, setCity] = useState([]);
    useEffect(async () => {
        const { data } = await axios.get(`${API_URL}/api/hospital/${id}`)
        const { hospital_name, city, state, type_of_hospital, phone, local_govt, address, email } = data
        setFormData({
            hospital_name: hospital_name,
            email: email,
            phone: phone,
            city: city,
            state: state,
            type_of_hospital: type_of_hospital,
            local_govt: local_govt,

            address: address,
        });
        setPhoneNumber(phone)
        const responce = await axios.get(`${API_URL}/api/hospital/state`)
        setState(responce.data.data)
    }, [])
    const amptyField = (val) => {
        toast.warn(`❗ ${val ? val : "Field"} is Empty`, {
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
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };
    const getCities = async (value) => {
        const { data } = await axios.get(`${API_URL}/api/hospital/city/${value}`)
        setCity(data.data)
    }
    // const handleStateChange =async (e)=>{
    //     const {stateValue,value} = e.target
    //     // getCities(value)
    //     const { data } = await axios.get(`${API_URL}/api/hospital/city/${value}`)
    //     setCity(data)
    //     setFormData({...formData,local_govt:""})
    //     console.log("handleStateChange",value);
    //     if(value){
    //         let selectedState = state.filter((el)=>{ return el.id == value} )
    //         console.log("selectedState",selectedState);
    //         setSelectState(selectedState[0].state)
    //         setFormData({...formData,state:selectedState[0].state})

    //     }

    // }
    const handleStateChange = async (e) => {
        const { stateValue, value } = e.target
        if (value) {
            if (value) {
                let selectedState = state.filter((el) => { return el.id == value })
                setSelectState(selectedState[0].state)
                setFormData({ ...formData, state: selectedState[0].state, local_govt: "" })
            }
            const { data } = await axios.get(`${API_URL}/api/hospital/city/${value}`)
            setCity(data.data)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        const data = new FormData();
        for (const key in formData) {
            data.append(key, formData[key]);
        }
        if (formData.hospital_name == "") {
            amptyField('Hospital Name')
        } else if (formData.email == "") {
            amptyField('Email')
        }
        else if ((!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i.test(formData.email))) {
            toast.warn("❗ Enter valid email", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setLoading(false);
        }
        else if (phoneNumber == "" || !(formData.phone)) {
            toast.warn("❗ Add Mobile Number", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setLoading(false);
        } else if (formData.local_govt == "") {
            amptyField('Local Goverment')
        }
        else if (!formData.city) {
            amptyField('City')
        }
        else {
            try {
                const response = await axios.put(`${API_URL}/api/hospital/${id}`, formData);
                setLoading(false)
                if (response.status == 200) {
                    toast.success("✔️ Submision successful !", {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
                navigate("/admin/view/ViewHospitals");
            } catch (error) {
                console.error('Error submitting HMO data:', error.message);
            }
        }

    };


    return (
        <Fragment>
            <AdminPageTitle activePage="Hospital Management" pageName="Edit Hospital" />

            <div className="col-xl-12 row-lg-12" >
                <div className="card" >
                    <div className="card-header">
                        <h4 className="card-title">Edit Hospital</h4>
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

                                            />
                                        </div>
                                    </div>

                                    <div className="form-group mb-3 col-md-6">
                                        <label className="col-sm-3 col-form-label">Hospital type</label>
                                        <div className="col-sm-9">
                                            <select
                                                defaultValue={formData.type_of_hospital}
                                                className="form-control form-control"
                                                name="type_of_hospital"
                                                onChange={handleChange}
                                                value={formData.type_of_hospital}
                                            >
                                                {/* {formData.type_of_hospital? <option >{formData.type_of_hospital}</option>: <option >{"Select Hospital Type"}</option>}   */}
                                                {/* <option >{formData.type_of_hospital?formData.type_of_hospital: "Select Hospital Type"}</option> */}
                                                <option >Eye Hospital</option>
                                                <option >General Hospital</option>
                                                <option >Specialist Hospital</option>
                                                <option >Dental Hospital</option>
                                                <option >Meternity Hospital</option>
                                            </select>

                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="form-group mb-3 col-md-6">
                                        <label className="col-sm-3 col-form-label">State</label>
                                        <div className="col-sm-9">
                                            <select
                                                defaultValue={formData.state}
                                                className="form-control form-control"
                                                name="state"
                                                //   value={formData.state}
                                                onChange={(e) => handleStateChange(e)}
                                            //   onSelect={(e)=>handleStateValue(e)}

                                            >
                                                {/* <option value={""}>{formData.state?formData.state:"Select State"}</option> */}
                                                {formData.state ? <option>{formData.state}</option> : <option>Select</option>}
                                                {state && state.map((el) => {
                                                    return <option value={el.id} key={el.id}  >{el.state}</option>
                                                })}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group mb-3 col-md-6">
                                        <label className="col-sm-3 col-form-label">Contact No</label>
                                        <div className="col-sm-9">
                                            <input
                                                name="phone"
                                                type="text"
                                                minLength={10}
                                                maxLength={10}
                                                className="form-control"
                                                placeholder="Contact No"
                                                value={phoneNumber}
                                                onChange={handlePhoneChange}
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
                                                {/* {formData.city? <option>{ formData.city}</option> :<option>Select local goverment</option> } */}

                                                <option >{formData.local_govt ? formData.local_govt : "Select local goverment"}</option>

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
                                    {loading ? <button type="loading" className="btn btn-primary" disabled>
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

export default EditHospital;
