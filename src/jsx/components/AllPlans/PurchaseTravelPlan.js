
import React, { Fragment, useEffect, useState } from "react";
// import styles
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';
import AdminPageTitle from "../AdminPageTitle/AdminPageTitle";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { API_URL } from "../../../../apiconfig";
import { Row, Card, Col, Tab, Nav } from "react-bootstrap";
const tabData = [
    {
        name: "Individual & Family",
        activeKey: 1,
    },
    {
        name: "Corporate",
        activeKey: 2,
    },
    {
        name: "Travel",
        activeKey: 3,
    },
    {
        name: "State",
        activeKey: 4,
    }
];
const PurchaseTravelPlan = () => {
    const navigate = useNavigate();
    const [hmoData, setHmoData] = useState([]);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [error, setError] = useState('');
    const [state, setState] = useState([]);
    const [city, setCity] = useState([]);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        dob: '',
        state: '',
        local_govt: '',
        budget: '',
        conditions: '',
        no_of_children: '',
    });

    useEffect(async () => {
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

    const handleSubmit = async (e) => {
        console.log("formData", formData);
        setLoading(true)
        e.preventDefault();
        const data = new FormData();
        // for (const key in formData) {
        //     data.append(key, formData[key]);
        // }
        // if (formData.policy_name == "") {
        //     amptyField("Policy Name");

        // } else if (formData.hmo_id == "") {
        //     amptyField("HMO")
        // } else if (formData.plan_type == "" || !formData.plan_type) {
        //     amptyField("Plan type")

        // }
        // else if (
        //     isNaN(formData.max_duration) ||
        //     formData.max_duration == "" ||
        //     !formData.max_duration
        // ) {
        //     amptyField("Max Duration")
        // }
        // else if (formData.monthly_cost == "" || !formData.monthly_cost) {
        //     amptyField("Monthly Cost")

        // } else if (formData.yearly_cost == "" || !formData.yearly_cost) {
        //     amptyField("Yearly cost")
        // }
        // else if (formData.coinsurance == "" || !formData.coinsurance) {
        //     amptyField("Coinsurance")

        // } else if (formData.deductible == "" || !formData.deductible) {
        //     amptyField("Deductible")

        // } else if (formData.annual_out_of_pocket_limit == "" || !formData.annual_out_of_pocket_limit) {
        //     amptyField("Annual Out Of Pocket Limit")

        // } else if (formData.annual_maximum_benefit == "" || !formData.annual_maximum_benefit) {
        //     amptyField("Annual Maximum Benefit")

        // } else if (formData.hospital_band == "" || !formData.hospital_band) {
        //     amptyField("Band")
        // }
        // else {
        //     // try {
        //     //     const response = await axios.post(`${API_URL}/api/Planpolicy_mapping_master`, formData);
        //     //     setLoading(false)
        //     //     if (response.status === 200) {
        //     //         toast.success("✔️ Submision successful !", {
        //     //             position: "top-right",
        //     //             autoClose: 2500,
        //     //             hideProgressBar: false,
        //     //             closeOnClick: true,
        //     //             pauseOnHover: true,
        //     //             draggable: true,
        //     //             progress: undefined,
        //     //         });
        //     //     }
        //     //     navigate("/admin/view/view_plan");
        //     // } catch (error) {
        //     //     console.error('Error submitting HMO data:', error.message);
        //     // }
        // }
    };
    return (
        <Fragment>
            <Card>
                <Card.Header>
                    <Card.Title>Buy Travel plan</Card.Title>
                </Card.Header>
                <Card.Body>
                    <Col>
                        <Tab.Container defaultActiveKey={tabData[0].activeKey}>
                            <Col sm={2}>
                                <Nav as="ul" className="flex-column nav-pills mb-3">
                                    {tabData.map((data, i) => (
                                        <Nav.Item as="li" key={i}>
                                            <Nav.Link eventKey={data.activeKey}>
                                                <Link to={`/plans/${data.activeKey}`}>
                                                    {data.name}
                                                </Link>
                                            </Nav.Link>
                                        </Nav.Item>
                                    ))}
                                </Nav>
                            </Col>
                            {/* <Col sm={8}> */}
                            <Tab.Content style={{ display: "flex" }}>
                                <Tab.Pane eventKey={3} >
                                    <div className="basic-form">

                                        <form onSubmit={handleSubmit}>
                                            {/* <div style={{ display: "flex" }}> */}
                                            <div>
                                                <div className="form-group mb-3 col-md-6">
                                                    <label className="col-sm-3 col-form-label col-form-label-sm">First Name</label>
                                                    <div className="col-sm-9">
                                                        <input
                                                            name="first_name"
                                                            type="text"
                                                            className="form-control form-control-sm"
                                                            placeholder="first name"
                                                            value={formData.first_name}
                                                            onChange={handleIndividualChange}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-group mb-3 col-md-6">
                                                    <label className="col-sm-3 col-form-label col-form-label-sm">Last Name</label>
                                                    <div className="col-sm-9">
                                                        <input
                                                            name="last_name"
                                                            type="text"
                                                            className="form-control form-control-sm"
                                                            placeholder="last name"
                                                            value={formData.last_name}
                                                            onChange={handleIndividualChange}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-group mb-3 col-md-6">
                                                    <label className="col-sm-3 col-form-label col-form-label-sm">State</label>
                                                    <div className="col-sm-9">
                                                        <select
                                                            //   defaultValue={formData.no_of_children}
                                                            className="form-control form-control-sm"
                                                            name="state"
                                                            //   value={formData.state}
                                                            onChange={(e) => handleStateChange(e)}

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
                                                    <label className="row-sm-3 col-form-label col-form-label-sm">Local Goverment</label>
                                                    <div className="row-sm-9">

                                                        <select
                                                            //   defaultValue={'Select local govt type'}
                                                            className="form-control form-control-sm"
                                                            name="local_govt"
                                                            value={formData.local_govt}
                                                            onChange={handleIndividualChange}

                                                        >
                                                            <option value={"Select"}>Select local goverment</option>
                                                            {city ? city.map((el, i) => {
                                                                return (
                                                                    <option value={el.city} key={i}>{el.city}</option>
                                                                )
                                                            }) : <option value={""}>Select local goverment</option>
                                                            }

                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div style={{ display: "grid" }}>

                                                <div className="form-group mb-3 row-md-6">
                                                    <label className="col-sm-3 col-form-label col-form-label-sm">Email</label>
                                                    <div className="col-sm-9">
                                                        <input
                                                            name="email"
                                                            type="text"
                                                            className="form-control form-control-sm"
                                                            placeholder="enter valid email"
                                                            value={formData.email}
                                                            onChange={handleIndividualChange}

                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-group mb-3 row-md-6">
                                                    <label className="col-sm-3 col-form-label col-form-label-sm">Date of Birth</label>
                                                    <div className="col-sm-9">
                                                        <input
                                                            type="text"
                                                            name="dob"
                                                            className="form-control form-control-sm"
                                                            placeholder="enter address"
                                                            value={formData.dob}
                                                            onChange={handleIndividualChange}

                                                        />
                                                    </div>
                                                </div>
                                                {/* </div>
                                        <div className="row"> */}
                                                <div className="form-group mb-3 row-md-6">
                                                    <label className="col-sm-3 col-form-label col-form-label-sm">No. of Childrens</label>
                                                    <div className="col-sm-9">
                                                        <select
                                                            className="form-control form-control-sm"
                                                            name="no_of_children"
                                                            value={formData.no_of_children}
                                                            onChange={handleIndividualChange}
                                                            required
                                                        >
                                                            <option value={""}>No. of childrens</option>
                                                            <option value={"1"}>1</option>
                                                            <option value={"2"}>2</option>
                                                            <option value={"3"}>3</option>
                                                            <option value={"4"}>4</option>
                                                            <option value={"5"}>5</option>
                                                        </select>

                                                    </div>
                                                </div>
                                                <div className="form-group mb-3 row-md-6">
                                                    <label className="col-sm-3 col-form-label col-form-label-sm">Budget Range</label>
                                                    <div className="col-sm-9">
                                                        <select
                                                            className="form-control form-control-sm"
                                                            name="budget"
                                                            value={formData.budget}
                                                            onChange={handleIndividualChange}
                                                            required
                                                        >
                                                            <option value={""}>Budget Range</option>
                                                            <option value={"Below ₦50,000"}>Below ₦50,000</option>
                                                            <option value={"₦50,000 -  ₦75,000"}> ₦50,000 -  ₦75,000</option>
                                                            <option value={"₦75,000-₦100,000"}>₦75,000-₦100,000</option>
                                                            <option value={"₦100,000-₦150,000"}>₦100,000-₦150,000</option>
                                                            <option value={"above ₦150,000"}>above ₦150,000</option>

                                                        </select>

                                                    </div>
                                                </div>
                                                <div className="form-group mb-3 row-md-6">
                                                    <label className="row-sm-3 col-form-label col-form-label-sm">Pre-existing Conditions</label>
                                                    <div className="col-sm-9">
                                                        <select
                                                            className="form-control form-control-sm"
                                                            name="conditions"
                                                            value={formData.conditions}
                                                            onChange={handleIndividualChange}
                                                            required
                                                        >
                                                            <option value={""}>Pre-existing Conditions</option>
                                                            <option value={"Hypertension"}>Hypertension</option>
                                                            <option value={"Diabetes"}>Diabetes</option>
                                                            <option value={"HIV"}>HIV</option>
                                                            <option value={"Sickle Cell Anaemia"}>Sickle Cell Anaemia</option>

                                                        </select>
                                                    </div>
                                                </div>

                                            </div>
                                            {/* </div> */}
                                            <div style={{ marginRight: "15px" }}>
                                                {loading ? <button type="submit" className="btn btn-primary">
                                                    Loading
                                                </button> :
                                                    <button type="submit" className="btn btn-primary">
                                                        Submit
                                                    </button>}
                                            </div>
                                        </form>

                                    </div>
                                </Tab.Pane>
                            </Tab.Content>
                        </Tab.Container>
                    </Col>
                </Card.Body>
            </Card>



            <ToastContainer />
        </Fragment >
    );
};

export default PurchaseTravelPlan;
