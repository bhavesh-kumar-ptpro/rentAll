import React, { Fragment, useState, useRef } from "react";
import AdminPageTitle from "../../AdminPageTitle/AdminPageTitle";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_URL } from "../../../../apiconfig";
import xlFile from "../files/HMO-Mapping.xlsx"
const UploadMapping = () => {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const [formData, setFormData] = useState({
        file: null,
    });

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, files: file });
        console.log("file", file);
    };

    const showEmptyFieldWarning = () => {
        toast.info("❗ Please select an Excel file", {
            position: "top-right",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.files) {
            try {
                const config = {
                    headers: {
                        "content-type": "multipart/form-data",
                    },
                };
                const formDataToSend = new FormData();
                formDataToSend.append('file', formData.files);

                const {data} = await axios.post(`${API_URL}/api/hmoHospitalMapping/excel-data`, formDataToSend, config);
                // console.log('Response data:', response);
                if (data.message == "Data inserted successfully!") {
                    setFormData({ ...formData, files: null });
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
                console.error('Error submitting HMO data:', error.message);
            }
        } else {
            showEmptyFieldWarning();
        }
    };

    const handleReset = () => {
        setFormData({ ...formData, file: null });
        if (fileInputRef.current) {
            fileInputRef.current.value = null;
        }
    };

    return (
        <Fragment>
            <AdminPageTitle activePage="HMO Hospital Mapping" pageName="Upload HMO Hospital Mapping" />

            <div className="d-flex col-xl-10 row-lg-12">
                <div className="card">
                    <div className="card-header">
                        <h4 className="card-title">Upload HMO Hospital Mapping</h4>
                    </div>

                    <div className="card-body">
                        <div className="basic-form">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3 row">
                                    <label htmlFor="excelFile" className="col-sm-3 col-form-label">Upload Excel</label>
                                    <div className="col-sm-9">
                                        <input
                                            type="file"
                                            name="excelFile"
                                            className="form-control"
                                            accept=".xlsx, .xls"
                                            onChange={handleFileChange}
                                            ref={fileInputRef}
                                        />
                                    </div>
                                </div>
                                <div style={{ display: "flex", gap: "20px" }}>
                                    <div className="row-sm-10">
                                        <button type="submit" className="btn btn-primary">
                                            Save
                                        </button>
                                    </div>
                                    <div className="row-sm-10">
                                        <button type="button" className="btn btn-primary" onClick={handleReset}>
                                            Reset
                                        </button>
                                    </div>
                                    <div className="row-sm-10">
                                        <a download href={xlFile}>
                                            <img src="https://naija.paperbirdtech.com/admin/image/excle-download.png" alt="" />
                                        </a>
                                    </div>
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

export default UploadMapping;

