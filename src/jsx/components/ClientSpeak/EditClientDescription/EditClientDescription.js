import React, { Fragment, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';
import axios from "axios";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_URL } from "../../../../apiconfig";

function EditClientDescription() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        client_name: "",
        logo_url: "",
        description: "",
    });
    const [image, setImage] = useState({
      placeholder: "", file: null
    });
    const [imageError, setImageError] = useState('');
    const [loading, setLoading] = useState(false);
    const [fileName, setFileName] = useState({ logo_url: null });
    const fileInputRef = useRef(null);

    useEffect(() => {
        handleDescriptionData();
        const fetchData = async () => {
            const { data } = await axios.get(`${API_URL}/api/ClientSpeak/${id}`);
            const { client_name, logo_url, description } = data;

            setFormData({
                client_name: client_name,
                logo_url: logo_url,
                description: description,
            });
        };
        fetchData();
    }, [id]);

    const handleDescriptionData = async () => {
        const { data } = await axios.get(`${API_URL}/api/ClientSpeak/${id}`);
        const { client_name, description, logo_url } = data;
        setFormData({
            client_name: client_name,
            logo_url: logo_url,
            description: description,
        });
    };

    const emptyField = () => {
        toast.warn("❗ Field is Empty", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        setLoading(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.type === "image/png" || file.type === "image/jpeg") {
                setFormData({
                    ...formData,
                    logo_url: file.name,
                });
                const reader = new FileReader();
                reader.onload = (r) => {
                    setImage({
                        placeholder: r.target.result,
                        file: e.target.files[0],
                    });
                };
                reader.readAsDataURL(file);
                setImageError("");
            } else {
                setImageError("Invalid image format. Only PNG and JPEG are allowed.");
                e.target.value = "";
            }
        }
        setFileName({ logo_url: file });
    };

    const handleDescriptionChange = (data) => {
        setFormData({
            ...formData,
            description: data,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const data = new FormData();
        for (const key in formData) {
            data.append(key, formData[key]);
        }
        if (formData.client_name === "") {
            emptyField("Client name");
        } else if (formData.logo_url === "" && formData.description === "") {
            emptyField();
        } else {
            try {
                if (fileName.logo_url) {
                    const url = `${API_URL}/api/ClientSpeak/image`;
                    const config = {
                        headers: {
                            "content-type": "multipart/form-data",
                        },
                    };
                    await axios.post(url, fileName, config);
                }
                setTimeout(async () => {
                    const response = await axios.put(`${API_URL}/api/ClientSpeak/${id}`, formData);
                    setLoading(false);
                    if (response.status === 200) {
                        toast.success("✔️ Submission successful!", {
                            position: "top-right",
                            autoClose: 2500,
                            hideProgressBar: false,
                            closeOnClick: true,
                            progress: undefined,
                        });
                    }
                    navigate("/admin/view/view_clientDescription");
                }, 2500);
            } catch (error) {
                console.error("Error submitting ClientDescription data:", error);
            }
        }
    };

    return (
        <Fragment>
            <div className="col-xl-8 col-lg-12">
                <div className="card" style={{ display: "flex" }}>
                    <div className="card-header">
                        <h4 className="card-title">Update-Testimonials</h4>
                    </div>
                    <div className="card-body">
                        <div className="basic-form">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3 row">
                                    <label className="col-sm-3 col-form-label">Client Name</label>
                                    <div className="col-sm-9">
                                        <input
                                            name="client_name"
                                            type="text"
                                            className="form-control"
                                            placeholder="Name"
                                            value={formData.client_name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label htmlFor="formFile" className="col-sm-3 col-form-label">Update logo image</label>
                                    <div className="col-sm-9">
                                        <input
                                            className="form-control"
                                            type="file"
                                            id="formFile"
                                            name="logo_url"
                                            onChange={handleFileChange}
                                        />
                                        {imageError && <div style={{ color: 'red', marginTop: "5px" }}>{imageError}</div>}
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <div className="mb-3 justify-content-space-between">
                                        <label htmlFor="video_url" className="col-sm-3 col-form-label">Logo preview</label>
                                        <img
                                            className="ml-4"
                                            style={{ objectFit: "cover", border: "5px solid gray", marginLeft: "100px", padding: "5px" }}
                                            src={image.placeholder ? image.placeholder : `${API_URL}/public/image/Company_Logo/` + formData.logo_url}
                                            height={200}
                                            width={200}
                                        />
                                    </div>
                                </div>
                                <div className="col-xl-12 col-xxl-12">
                                    <div className="card">
                                        <div className="card-header">
                                            <h4 className="card-title">Description</h4>
                                        </div>
                                        <div className="card-body custom-ekeditor">
                                            <CKEditor
                                                editor={ClassicEditor}
                                                data={formData.description}
                                                onChange={(event, editor) => {
                                                    const data = editor.getData();
                                                    handleDescriptionChange(data, 'description_1');
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                <div className="col-sm-10">
                                    {loading ? <button type="button" className="btn btn-primary" disabled>Submitting</button> :
                                        <button type="submit" className="btn btn-primary">Submit</button>}
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
}

export default EditClientDescription;
