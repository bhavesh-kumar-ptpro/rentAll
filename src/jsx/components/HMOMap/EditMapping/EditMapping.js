import React, { Fragment, useEffect, useRef, useState } from "react";
// import styles
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';
import AdminPageTitle from "../../AdminPageTitle/AdminPageTitle";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../../../../apiconfig"
const EditMapping = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [state, setState] = useState([]);
    const [city, setCity] = useState([]);
    const [selectState, setSelectState] = useState('');
    const [hmoData, setHmoData] = useState([]);
    const [hospitalData, setHospitalData] = useState([]);
    const [hospitalId, seHospitalId] = useState('');
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        hmo: '',
        band: '',
        full_add: '',
        hospital: '',
        city: '',
        state: '',
    });
    useEffect(async () => {
      const fetchData = async () => {
        await getAllStates();
        await getHospitals();
        await getHmoData();
        await getEditData();
    };
    fetchData();
    }, [])
    const getEditData = async ()=>{
        const { data } = await axios.get(`${API_URL}/api/hmoHospitalMapping/${id}`)
        setFormData({
            hmo: data.hmo,
            band: data.band,
            full_add: data.full_add,
            hospital: data.hospital,
            city:data.city,
            state: data.state,
        })

    }
    const getHmoData = async () => {
        const { data } = await axios.get(`${API_URL}/api/hmoHospitalMapping/hmo`);
        setHmoData(data);
    };
    const getHospitals =async ()=>{
        const { data } = await axios.get(`${API_URL}/api/hmoHospitalMapping/hospitals`)
        setHospitalData(data)
    }
    const getHospitalId =async ()=>{
        const { data } = await axios.get(`${API_URL}/api/hmoHospitalMapping/hospitals`)
        
    }
    const getAllStates =async ()=>{
        const { data } = await axios.get(`${API_URL}/api/hospital/state`)
        setState(data.data)
    }
    const amptyField = (emptyField) => {
        toast.warn(`❗ ${emptyField?emptyField:"Field"}  is Empty`, {
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
    const handleStateChange = async (e) => {
        const { stateValue, value } = e.target
    if(value){
        if (value) {
            let selectedState = state.filter((el) => { return el.id == value })
            setSelectState(selectedState[0].state)
            setFormData({ ...formData, state: selectedState[0].state,city:"" })
        }
        handleStateValue()
        const { data } = await axios.get(`${API_URL}/api/hospital/city/${value}`)
        setCity(data.data)
    }

    }
    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault();
        if (formData.hmo == "") {
            amptyField("HMO Name");
        } else if (formData.hospital == "" || !formData.hospital) {
            amptyField("Hospital Name")
        }
        else if (formData.full_add == "" ) {
            amptyField("Address")
        } else if (formData.band == "" || !formData.band) {
            amptyField("Band");
        } else if (formData.city == "" || formData.state == "") {
            amptyField("City");
        } else if (formData.state == "") {
            amptyField("state");
        }
        
        else {
            try {
                const response = await axios.put(`${API_URL}/api/hmoHospitalMapping/${id}`, formData);
                setLoading(false)
                if (response.status == 200) {
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
                navigate("/admin/view/view_hh_mapping");
            } catch (error) {
                console.error('Error submitting HMO data:', error.message);
            }

        }

    };

    return (
        <Fragment>
            <AdminPageTitle activePage="HMO Hospital Mapping" pageName="Add HMO Hospital Mapping" />

            <div className="col-xl-12 row-lg-12" >
                <div className="card" >
                    <div className="card-header">
                        <h4 className="card-title">Edit HMO Hospital Mapping</h4>
                    </div>

                    <div className="card-body">
                        <div className="basic-form">

                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="form-group mb-3 col-md-6">
                                        <label className="col-sm-3 col-form-label">HMO Name</label>
                                        <div className="col-sm-9">

                                            <select
                                                //   defaultValue={'Select local govt type'}
                                                className="form-control form-control"
                                                name="hmo"
                                                value={formData.hmo}
                                                onChange={handleChange}
                                                required
                                            >
                                           {/* <option value={formData.hmo}>{formData.hmo ?formData.hmo:"Select HMO"}</option> */}
                                                {hmoData.length>0 && hmoData.map((el) => {
                                                    return <option value={el.id} key={el.id} >{el.company_name}</option>
                                                })}
                                                {/* <option value={"Select"}>Select local govt type</option> */}

                                            </select>
                                        </div>
                                    </div>

                                    <div className="form-group mb-3 col-md-6">
                                        <label className="col-sm-3 col-form-label">Hospital Name</label>
                                        <div className="col-sm-9">


                                            <select
                                                //   defaultValue={formData.hospital}
                                                className="form-control form-control"
                                                name="hospital"
                                                value={formData.hospital}
                                                onChange={handleChange}
                                                required
                                            >
                                                <option value={""}>Select hospital type</option>
                                                {hospitalData && hospitalData.map((el) => {
                                                    return <option value={el.id} key={el.id} id="mySelect"  >{el.hospital_name}</option>
                                                })}
                                            </select>

                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="form-group mb-3 col-md-6">
                                        <label className="col-sm-3 col-form-label">State</label>
                                        <div className="col-sm-9">
                                            <select
                                                //   defaultValue={formData.hospital}
                                                className="form-control form-control"
                                                name="state"
                                                //   value={formData.state}
                                                onChange={(e) => handleStateChange(e)}
                                                //   onSelect={(e)=>handleStateValue(e)}
                                                required
                                            >
                                           <option value={formData.state}>{formData.state ?formData.state:"Select state"}</option>
                                                {state && state.map((el) => {
                                                    return <option value={el.id} key={el.id} id="mySelect"  >{el.state}</option>
                                                })}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group mb-3 col-md-6">
                                        <label className="col-sm-3 col-form-label">Local Goverment</label>
                                        <div className="col-sm-9">

                                            <select
                                                //   defaultValue={'Select local govt type'}
                                                className="form-control form-control"
                                                name="city"
                                                value={formData.city}
                                                onChange={handleChange}

                                            >
                                                <option value={formData.city}>{formData.city ?formData.city:"Select local goverment"}</option>
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
                                        <label className="col-sm-3 col-form-label">Address</label>
                                        <div className="col-sm-9">
                                            <input
                                                type="text"
                                                name="full_add"
                                                className="form-control"
                                                placeholder="enter full address"
                                                value={formData.full_add}
                                                onChange={handleChange}

                                            />
                                        </div>
                                    </div>
                                    <div className="form-group mb-3 col-md-6">
                                        <label className="col-sm-3 col-form-label">Band</label>
                                        <div className="col-sm-9">
                                            <input
                                                name="band"
                                                type="text"
                                                className="form-control"
                                                placeholder="enter band"
                                                value={formData.band}
                                                onChange={handleChange}

                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="col-sm-10">
                                {loading ?  <button type="loading" className="btn btn-primary" disabled>
                                    Submitting
										  </button>:
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

export default EditMapping;
