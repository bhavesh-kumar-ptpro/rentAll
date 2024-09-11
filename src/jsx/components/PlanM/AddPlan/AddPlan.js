
import React, { Fragment, useEffect, useState } from "react";
// import styles
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';
import AdminPageTitle from "../../AdminPageTitle/AdminPageTitle";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_URL } from "../../../../apiconfig";

const AddPlan = () => {
    const navigate = useNavigate();
    const [hmoData, setHmoData] = useState([]);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        policy_name: '',
        hmo_id: '',
        max_duration: '',
        age:"",
        showMoreDeatils:"",
        noticeAndDisclaimers:"",
        disclaimersAndFees:"",
        monthly_cost: '',
        yearly_cost: '',
        coinsurance: '',
        deductible: '',
        plan_type: '',
        annual_out_of_pocket_limit: '',
        annual_maximum_benefit: '',
        hospital_band: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get(`${API_URL}/api/hmoHospitalMapping/hmo`);
            setHmoData(data);
        };
        fetchData();
    }, []);

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
	const handleDescriptionChange = (data, descriptionKey) => {
		setFormData({
			...formData,
			[descriptionKey]: data,
		});
	};
    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault();
        const data = new FormData();
        for (const key in formData) {
            data.append(key, formData[key]);
        }
        if (formData.policy_name == "") {
            amptyField("Policy Name");
            
        } else if (formData.hmo_id == "") {
            amptyField("HMO")
        }else if (formData.plan_type == "" || !formData.plan_type) {
            amptyField("Plan type")

        }
        else if (
            isNaN(formData.max_duration) ||
            formData.max_duration == "" ||
            !formData.max_duration
        ) {
            amptyField("Max Duration")
        }
        else if (formData.monthly_cost == "" || !formData.monthly_cost) {
            amptyField("Monthly Cost")

        } else if (formData.yearly_cost == "" || !formData.yearly_cost) {
            amptyField("Yearly cost")
        }
        else if (formData.coinsurance  == "" || !formData.coinsurance ) {
            amptyField("Coinsurance")

        } else if (formData.deductible == "" || !formData.deductible) {
            amptyField("Deductible")

        }else if (formData.annual_out_of_pocket_limit == "" || !formData.annual_out_of_pocket_limit) {
            amptyField("Annual Out Of Pocket Limit")

        } else if (formData.annual_maximum_benefit == "" || !formData.annual_maximum_benefit) {
            amptyField("Annual Maximum Benefit")

        } 
        else if (formData.hospital_band == "" || !formData.hospital_band) {
            amptyField("Band")
        }
        else if (formData.age == "" || !formData.age) {
            amptyField("Age")
        }
        else if (formData.showMoreDeatils == "" || !formData.showMoreDeatils) {
            amptyField("Show More Details")
        }
        else if (formData.noticeAndDisclaimers == "" || !formData.noticeAndDisclaimers) {
            amptyField("IMPORTANT NOTICES and disclaimers")
        }
        else if (formData.disclaimersAndFees == "" || !formData.disclaimersAndFees) {
            amptyField("Carrier specific notices, disclaimers and fees")
        }
        else {
            try {
                const response = await axios.post(`${API_URL}/api/Planpolicy_mapping_master`, formData);
                setLoading(false)
                if (response.status === 200) {
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
                navigate("/admin/view/view_plan");
            } catch (error) {
                console.error('Error submitting HMO data:', error.message);
            }
            // console.log("amptyField",formData);
        }
    };

    const validateNumberInput = (e) => {
        e.target.value = e.target.value.replace(/\D/g, '');
        let value = e.target.value.replace(/\D/g, '');
        if (/[^0-9]/.test(value)) {
            setError('Please enter number');
        } else {
            setError('');
        }
    };

    return (
        <Fragment>
            <AdminPageTitle activePage="Plan Management" pageName="Add Plan" />
            <div className="col-xl-12 row-lg-12">
                <div className="card">
                    <div className="card-header">
                        <h4 className="card-title">Add Plan</h4>
                    </div>
                    <div className="card-body">
                        <div className="basic-form">
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="form-group mb-3 col-md-6">
                                        <label className="col-sm-3 col-form-label">Policy Name</label>
                                        <div className="col-sm-9">
                                            <input
                                                name="policy_name"
                                                type="text"
                                                className="form-control"
                                                placeholder="enter policy name"
                                                value={formData.policy_name}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group mb-3 col-md-6">
                                        <label className="col-sm-3 col-form-label">HMO Name</label>
                                        <div className="col-sm-9">
                                            <select
                                                className="form-control form-control"
                                                name="hmo_id"
                                                value={formData.hmo_id}
                                                onChange={handleChange}
                                                
                                            >
                                                <option value={""}>Select HMO</option>
                                                {hmoData && hmoData.map((el) => {
                                                    return <option value={el.id} key={el.id} id="mySelect">{el.company_name}</option>
                                                })}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="form-group mb-3 col-md-6">
                                        <label className="col-sm-3 col-form-label">Plan</label>
                                        <div className="col-sm-9">
                                            <select
                                                className="form-control form-control"
                                                name="plan_type"
                                                
                                                value={formData.plan_type}
                                                onChange={handleChange}
                                            >
                                                <option value={""}>Select plan</option>
                                                <option >Individual & Family</option>
                                                <option >Corporate</option>
                                                <option >State</option>
                                                <option >Travel</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group mb-3 col-md-6">
                                        <label className="col-sm-3 col-form-label">Max Duration</label>
                                        <div className="col-sm-9">
                                            <input
                                                type="text"
                                                id="max_duration"
                                                name="max_duration"
                                                className="form-control"
                                                placeholder="Max Duration"
                                                onInput={validateNumberInput}
                                                onChange={handleChange}
                                                
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="form-group mb-3 col-md-6">
                                        <label className="col-sm-3 col-form-label">Monthly Cost</label>
                                        <div className="col-sm-9">
                                            <input
                                                type="text"
                                                id="monthly_cost"
                                                name="monthly_cost"
                                                className="form-control"
                                                placeholder="Monthly Cost"
                                                onInput={validateNumberInput}
                                                onChange={handleChange}
                                                
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group mb-3 col-md-6">
                                        <label className="col-sm-3 col-form-label">Yearly Cost</label>
                                        <div className="col-sm-9">
                                            <input
                                                name="yearly_cost"
                                                type="text"
                                                className="form-control"
                                                placeholder="Yearly Cost"
                                                value={formData.yearly_cost}
                                                onInput={validateNumberInput}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="form-group mb-3 col-md-6">
                                        <label className="col-sm-3 col-form-label">Coinsurance</label>
                                        <div className="col-sm-9">
                                            <input
                                                type="text"
                                                name="coinsurance"
                                                className="form-control"
                                                placeholder="Coinsurance"
                                                value={formData.coinsurance}
                                                onInput={validateNumberInput}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group mb-3 col-md-6">
                                        <label className="col-sm-3 col-form-label">Deductible</label>
                                        <div className="col-sm-9">
                                            <input
                                                type="text"
                                                name="deductible"
                                                className="form-control"
                                                placeholder="Deductible"
                                                value={formData.deductible}
                                                onInput={validateNumberInput}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="form-group mb-3 col-md-6">
                                        <label className="row-sm-3 col-form-label">Annual Out Of Pocket Limit</label>
                                        <div className="col-sm-9">
                                            <input
                                                type="text"
                                                name="annual_out_of_pocket_limit"
                                                className="form-control"
                                                placeholder="Annual Out Of Pocket Limit"
                                                value={formData.annual_out_of_pocket_limit}
                                                onInput={validateNumberInput}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group mb-3 col-md-6">
                                        <label className="row-sm-3 col-form-label">Annual Maximum Benefit</label>
                                        <div className="col-sm-9">
                                            <input
                                                type="text"
                                                name="annual_maximum_benefit"
                                                className="form-control"
                                                placeholder="Annual Maximum Benefit"
                                                value={formData.annual_maximum_benefit}
                                                onInput={validateNumberInput}
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
                                                id="hospital_band"
                                                name="hospital_band"
                                                className="form-control"
                                                placeholder="Hospital Band"
                                                value={formData.hospital_band}
                                                onChange={handleChange}
                                                
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group mb-3 col-md-6">
                                        <label className="col-sm-3 col-form-label">Age</label>
                                        <div className="col-sm-9">
                                            <select
                                                className="form-control form-control"
                                                name="age"
                                                
                                                value={formData.age}
                                                onChange={handleChange}
                                            >
                                                
                                                <option value={'0'}>Below 60</option>
                                                <option value={'1'}>Above 60</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
									<div className="col-xl-12 col-xxl-12">
										<div className="card">
											<div className="card-header">
												<h4 className="card-title">Show More Details</h4>
											</div>
											<div className="card-body custom-ekeditor">
												<CKEditor
													editor={ClassicEditor}
													data={formData.showMoreDeatils}
													onChange={(event, editor) => {
														const data = editor.getData();
														handleDescriptionChange(data, 'showMoreDeatils');
													}}
												/>
											</div>
										</div>
									</div>
									<div className="col-xl-12 col-xxl-12">
										<div className="card">
											<div className="card-header">
												<h4 className="card-title">IMPORTANT NOTICES and disclaimers</h4>
											</div>
											<div className="card-body custom-ekeditor">
												<CKEditor
													editor={ClassicEditor}
													data={formData.noticeAndDisclaimers}
													onChange={(event, editor) => {
														const data = editor.getData();
														handleDescriptionChange(data, 'noticeAndDisclaimers');
													}}
												/>
											</div>
										</div>
									</div>
									<div className="col-xl-12 col-xxl-12">
										<div className="card">
											<div className="card-header">
												<h4 className="card-title">Carrier specific notices, disclaimers and fees</h4>
											</div>
											<div className="card-body custom-ekeditor">
												<CKEditor
													editor={ClassicEditor}
													data={formData.disclaimersAndFees}
													onChange={(event, editor) => {
														const data = editor.getData();
														handleDescriptionChange(data, 'disclaimersAndFees');
													}}
												/>
											</div>
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

export default AddPlan;
