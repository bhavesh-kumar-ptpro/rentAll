import React, { Fragment, useEffect, useState } from "react";
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';
import AdminPageTitle from "../../AdminPageTitle/AdminPageTitle";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_URL } from "../../../../apiconfig";

const EditPlan = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [hmoData, setHmoData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        policy_name: '',
        hmo_id: '',
        max_duration: '',
        age: '',
        showMoreDeatils: '',
        noticeAndDisclaimers: '',
        disclaimersAndFees: '',
        monthly_cost: '',
        yearly_cost: '',
        coinsurance: '',
        deductible: '',
        plan_type: '',
        annual_out_of_pocket_limit: '',
        annual_maximum_benefit: '',
        hospital_band: '',
    });
    const fetchData = async () => {
        const { data } = await axios.get(`${API_URL}/api/Planpolicy_mapping_master/${id}`);
        const { policy_name, hmo_id, max_duration, monthly_cost, yearly_cost, coinsurance, deductible, plan_type, annual_out_of_pocket_limit, annual_maximum_benefit, hospital_band, age, showMoreDeatils, noticeAndDisclaimers, disclaimersAndFees } = data.data;
        setFormData({
            ...formData,
            // disclaimersAndFees: disclaimersAndFees,
            // noticeAndDisclaimers: noticeAndDisclaimers,
            // showMoreDeatils:showMoreDeatils,
            policy_name: policy_name,
            hmo_id: hmo_id,
            max_duration: max_duration,
            monthly_cost: monthly_cost,
            yearly_cost: yearly_cost,
            coinsurance: coinsurance,
            deductible: deductible,
            plan_type: plan_type,
            annual_out_of_pocket_limit: annual_out_of_pocket_limit,
            annual_maximum_benefit: annual_maximum_benefit,
            hospital_band: hospital_band,
            age: age,

        });
    };
    useEffect(() => {
        getHmoData()
        fetchData();
        handleEditorData()
        handleNotice()
    }, []);
    const handleEditorData = async () => {
        const { data } = await axios.get(`${API_URL}/api/Planpolicy_mapping_master/${id}`);
        const { policy_name, hmo_id, max_duration, monthly_cost, yearly_cost, coinsurance, deductible, plan_type, annual_out_of_pocket_limit, annual_maximum_benefit, hospital_band, age, showMoreDeatils, noticeAndDisclaimers, disclaimersAndFees } = data.data;
        setFormData({
            ...formData,
            disclaimersAndFees: disclaimersAndFees,
            noticeAndDisclaimers: data.noticeAndDisclaimers,
            showMoreDeatils: showMoreDeatils,
            policy_name: policy_name,
            hmo_id: hmo_id,
            max_duration: max_duration,
            monthly_cost: monthly_cost,
            yearly_cost: yearly_cost,
            coinsurance: coinsurance,
            deductible: deductible,
            plan_type: plan_type,
            annual_out_of_pocket_limit: annual_out_of_pocket_limit,
            annual_maximum_benefit: annual_maximum_benefit,
            hospital_band: hospital_band,
            age: age,

        });
    }
    const handleNotice = async () => {
        const { data } = await axios.get(`${API_URL}/api/Planpolicy_mapping_master/${id}`);
        const { policy_name, hmo_id, max_duration, monthly_cost, yearly_cost, coinsurance, deductible, plan_type, annual_out_of_pocket_limit, annual_maximum_benefit, hospital_band, age, showMoreDeatils, noticeAndDisclaimers, disclaimersAndFees } = data.data;
        setFormData({
            ...formData,
            disclaimersAndFees: disclaimersAndFees,
            noticeAndDisclaimers: noticeAndDisclaimers,
            showMoreDeatils: showMoreDeatils,
            policy_name: policy_name,
            hmo_id: hmo_id,
            max_duration: max_duration,
            monthly_cost: monthly_cost,
            yearly_cost: yearly_cost,
            coinsurance: coinsurance,
            deductible: deductible,
            plan_type: plan_type,
            annual_out_of_pocket_limit: annual_out_of_pocket_limit,
            annual_maximum_benefit: annual_maximum_benefit,
            hospital_band: hospital_band,
            age: age,

        });
    }
    const getHmoData = async () => {
        try {
            const { data } = await axios.get(`${API_URL}/api/hmoHospitalMapping/hmo`);
            setHmoData(data);
        } catch (error) {
            console.error('Error fetching HMO data:', error);
        }
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
    const handleshowMoreDetails = (data, descriptionKey) => {
        setFormData({
            ...formData,
            [descriptionKey]: data,
        });
    };
    const handlenoticeAndDisclaimers = (data, descriptionKey) => {
        setFormData({
            ...formData,
            [descriptionKey]: data,
        });
    };

    const validateNumberInput = (e) => {
        e.target.value = e.target.value.replace(/\D/g, '');
        if (/[^0-9]/.test(e.target.value)) {
            setError('Please enter a valid number');
        } else {
            setError('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const requiredFields = [
            { name: 'policy_name', label: 'Policy Name' },
            { name: 'hmo_id', label: 'HMO' },
            { name: 'max_duration', label: 'Max Duration' },
            { name: 'monthly_cost', label: 'Monthly Cost' },
            { name: 'yearly_cost', label: 'Yearly Cost' },
            { name: 'coinsurance', label: 'Coinsurance' },
            { name: 'annual_out_of_pocket_limit', label: 'Annual Out Of Pocket Limit' },
            { name: 'annual_maximum_benefit', label: 'Annual Maximum Benefit' },
            { name: 'hospital_band', label: 'Hospital Band' },
            { name: 'age', label: 'Age' },
            { name: 'showMoreDeatils', label: 'Show More Details' },
            { name: 'noticeAndDisclaimers', label: 'IMPORTANT NOTICES and disclaimers' },
            { name: 'disclaimersAndFees', label: 'Carrier specific notices, disclaimers and fees' }
        ];

        for (const field of requiredFields) {
            if (!formData[field.name]) {
                toast.warn(`❗${field.label} Field is Empty`, {
                    position: "top-right",
                    autoClose: 2500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setLoading(false);
                return;
            }
        }

        try {
            const response = await axios.put(`${API_URL}/api/Planpolicy_mapping_master/${id}`, formData);
            if (response.status === 200) {
                toast.success("✔️ Submission successful!", {
                    position: "top-right",
                    autoClose: 2500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                navigate("/admin/view/view_plan");
            }
        } catch (error) {
            console.error('Error submitting plan data:', error.message);
            setLoading(false);
        }
    };
console.log(formData);

    return (
        <Fragment>
            <AdminPageTitle activePage="Plan Management" pageName="Edit Plan" />
            <div className="col-xl-12 row-lg-12">
                <div className="card">
                    <div className="card-header">
                        <h4 className="card-title">Edit Plan</h4>
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
                                                placeholder="Enter policy name"
                                                value={formData.policy_name}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group mb-3 col-md-6">
                                        <label className="col-sm-3 col-form-label">HMO Name</label>
                                        <div className="col-sm-9">
                                            <select
                                                className="form-control"
                                                name="hmo_id"
                                                value={formData.hmo_id}
                                                onChange={handleChange}
                                            >
                                                <option value="">Select HMO</option>
                                                {hmoData.map((el) => (
                                                    <option value={el.id} key={el.id}>
                                                        {el.company_name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="form-group mb-3 col-md-6">
                                        <label className="col-sm-3 col-form-label">Plan Type</label>
                                        <div className="col-sm-9">
                                            <select
                                                className="form-control"
                                                name="plan_type"
                                                value={formData.plan_type}
                                                onChange={handleChange}
                                            >
                                                <option value="">Select plan</option>
                                                <option value="Individual & Family">Individual & Family</option>
                                                <option value="Corporate">Corporate</option>
                                                <option value="State">State</option>
                                                <option value="Travel">Travel</option>
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
                                                value={formData.max_duration}
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
                                                name="monthly_cost"
                                                className="form-control"
                                                placeholder="Monthly Cost"
                                                value={formData.monthly_cost}
                                                onInput={validateNumberInput}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group mb-3 col-md-6">
                                        <label className="col-sm-3 col-form-label">Yearly Cost</label>
                                        <div className="col-sm-9">
                                            <input
                                                type="text"
                                                name="yearly_cost"
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
                                        <label className="col-sm-3 col-form-label">Age</label>
                                        <div className="col-sm-9">
                                            <select
                                                className="form-control form-control"
                                                name="age"

                                                value={formData.age}
                                                onChange={handleChange}
                                            >

                                                <option value={0}>Below 60</option>
                                                <option value={1}>Above 60</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group mb-3 col-md-6">
                                        <label className="col-sm-3 col-form-label">Annual Out Of Pocket Limit</label>
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
                                </div>
                                <div className="row">
                                    <div className="form-group mb-3 col-md-6">
                                        <label className="col-sm-3 col-form-label">Annual Maximum Benefit</label>
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
                                <div className="row">
                                    <div className="form-group mb-3 col-md-12">
                                        <label className="col-sm-3 col-form-label">Show More Details</label>
                                        <div className="col-sm-12">
                                            <CKEditor
                                                editor={ClassicEditor}
                                                data={formData.showMoreDeatils ? formData.showMoreDeatils : ""}
                                                onChange={(event, editor) => {
                                                    const data = editor.getData();
                                                    handleshowMoreDetails(data, 'showMoreDeatils');
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="form-group mb-3 col-md-12">
                                        <label className="col-sm-3 col-form-label">Notice and Disclaimers</label>
                                        <div className="col-sm-12">
                                            <CKEditor
                                                editor={ClassicEditor}
                                                data={formData.noticeAndDisclaimers ? formData.noticeAndDisclaimers : ""}
                                                onChange={(event, editor) => {
                                                    const data = editor.getData();
                                                    handlenoticeAndDisclaimers(data, 'noticeAndDisclaimers');
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="form-group mb-3 col-md-12">
                                        <label className="col-sm-3 col-form-label">Disclaimers and Fees</label>
                                        <div className="col-sm-12">
                                            <CKEditor
                                                editor={ClassicEditor}
                                                data={formData.disclaimersAndFees ? formData.disclaimersAndFees : ""}
                                                onChange={(event, editor) => {
                                                    const data = editor.getData();
                                                    handleDescriptionChange(data, 'disclaimersAndFees');
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-10">
                                        <button type="submit" className="btn btn-primary" disabled={loading}>
                                            {loading ? "Updating..." : "Update Plan"}
                                        </button>
                                    </div>
                                </div>
                            </form>
                            <ToastContainer />
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default EditPlan;
