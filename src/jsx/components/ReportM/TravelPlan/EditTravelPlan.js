import React, { Fragment, useEffect, useRef, useState } from "react";
// import styles
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';
import AdminPageTitle from "../../AdminPageTitle/AdminPageTitle";
import axios from "axios";
import { API_URL } from "../../../../apiconfig";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
let styles={"cursor":'not-allowed',"background":"#DDDDDD"}
const EditTravelPlan = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        Number: '',
        TravelDestination: '',
        TravelStartDate:'',
        TravelEndDate: '',
        PurposeofTravel: '',
        PreexistingMedicalConditions: ''
    });
    useEffect(async () => {
        if(id){
            try {
                const { data } = await axios.get(`${API_URL}/api/travel_plan_master/${id}`)
                const { full_name, email, Number, TravelDestination, TravelStartDate, TravelEndDate, PurposeofTravel,PreexistingMedicalConditions } = data
                setFormData({
                    ...formData,
                    full_name: full_name,
                    email: email,
                    Number:Number,
                    TravelDestination: TravelDestination,
                    TravelStartDate:TravelStartDate,
                    TravelEndDate: TravelEndDate,
                    PurposeofTravel: PurposeofTravel,
                    PreexistingMedicalConditions: PreexistingMedicalConditions
                })   
            } catch (error) {
                console.log(error);
                
                toast.error(`${error.message}`)
            }
           
        }
        
        // setState(data)

    }, [id])


    const handleRedirect = async (e) => {
        navigate('/admin/view/view_travel_plan')
    };

 return (
        <Fragment>
            <AdminPageTitle activePage="Manage orders" pageName="View Travel Plan" />

            <div className="col-xl-12 row-lg-12" >
                <div className="card" >
                    <div className="card-header">
                        <h4 className="card-title">View Travel Plan</h4>
                    </div>

                    <div className="card-body">
                        <div className="basic-form">

                            <form onSubmit={handleRedirect}>
                                <div className="row">


                                    <div className="form-group mb-3 col-md-6">
                                        <label className="col-sm-3 col-form-label">Name</label>
                                        <div className="col-sm-9">
                                            <input
                                                name="state"
                                                type="text"
                                                disabled
                                                className="form-control"
                                                placeholder="state"
                                                value={formData.full_name}
                                                style={styles}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group mb-3 col-md-6">
                                        <label className="col-sm-3 col-form-label">Email</label>
                                        <div className="col-sm-9">

                                            <input
                                                name="email"
                                                type="text"
                                                disabled
                                                className="form-control"
                                                style={styles}
                                            value={formData.email}

                                            />
                                        </div>
                                    </div>

                                </div>

                                <div className="row">
                                    <div className="form-group mb-3 col-md-6">
                                        <label className="col-sm-3 col-form-label">Number</label>
                                        <div className="col-sm-9">
                                            <input
                                                name="Number"
                                                type="text"
                                                disabled
                                                className="form-control"
                                                style={styles}                                                value={formData.Number}
                                            // onChange={handleChange}

                                            />
                                        </div>
                                    </div>
                                    <div className="form-group mb-3 col-md-6">
                                        <label className="row-sm-3 col-form-label">Travel Destination</label>
                                        <div className="col-sm-9">
                                            <input
                                                name="TravelDestination"
                                                type="text"
                                                className="form-control"
                                                placeholder="Payment Plan"
                                                value={formData.TravelDestination}
                                                disabled
                                                style={styles}
                                            />
                                        </div>
                                    </div>

                                </div>

                                <div className="row">

                                    <div className="form-group mb-3 col-md-6">
                                        <label className="row-sm-3 col-form-label">Travel Start Date</label>
                                        <div className="col-sm-9">

                                            <input
                                                type="text"
                                                name="TravelStartDate"
                                                className="form-control"
                                                placeholder="conditions"
                                                value={formData.TravelStartDate}
                                                style={styles}                                                
                                                disabled
                                            // onBlur={handleBlur}

                                            />
                                        </div>
                                    </div>
                                    <div className="form-group mb-3 col-md-6">
                                        <label className="row-sm-3 col-form-label">Travel End Date</label>
                                        <div className="col-sm-9">
                                            <input
                                                name="TravelEndDate"
                                                type="text"
                                                disabled
                                                className="form-control"
                                                // placeholder="enter hospital name"
                                                value={formData.TravelEndDate}
                                                style={styles}
                                            />
                                        </div>
                                    </div>

                                </div>

                                <div className="row">
                                    <div className="form-group mb-3 col-md-6">
                                        <label className="row-sm-3 col-form-label">Purpose of Travel</label>
                                        <div className="col-sm-9">
                                            <input
                                                type="text"
                                                name="PurposeofTravel"
                                                className="form-control"
                                                value={formData.PurposeofTravel}
                                                disabled
                                                style={styles}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group mb-3 col-md-6">
                                        <label className="row-sm-3 col-form-label">Preexisting Medical Conditions</label>
                                        <div className="col-sm-9">
                                            <input
                                                type="text"
                                                name="PreexistingMedicalConditions"
                                                className="form-control"
                                                value={formData.PreexistingMedicalConditions}
                                                disabled
                                                style={styles}
                                            />
                                        </div>
                                    </div>

                                </div>
                                <div className="col-sm-10">
                                    <button type="submit" className="btn btn-primary">
                                        Close
                                    </button>
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

export default EditTravelPlan;
