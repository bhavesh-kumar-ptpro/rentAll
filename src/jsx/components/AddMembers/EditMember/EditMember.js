import React, { Fragment, useState, useRef, useEffect } from "react";
// import styles
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import AdminPageTitle from "../../AdminPageTitle/AdminPageTitle";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import default_logo from "../../../../image/default_user.png";
import { API_URL } from "../../../../apiconfig";
const AddMember = () => {
    const { id } = useParams()
    const navigate = useNavigate();
    const [videoFile, setVideoFile] = useState({ video_url: null });
    const [image, setImage] = useState({ memberPhoto: null });
    const [fileName, setFileName] = useState({ placeholder: "", file: null });
    const [formData, setFormData] = useState({
        name: "",
        designation: "",
        company_name: "",
        description: "",
        memberPhoto: "",
    });
    const [error, setError] = useState("");
    const [imageError, setImageError] = useState("");
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef(null);
    const getMemberData = async () => {
        const { data } = await axios.get(`${API_URL}/api/about_as/${id}`)
        console.log("data", data);
        setFormData({
            ...formData,
            name: data.name,
            designation: data.designation,
            company_name: data.company_name,
            description: data.description,
            memberPhoto: data.memberPhoto,
        })
    }
    useEffect(async () => {
        getMemberData()
        getMemberData()
    }, [id])
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.type === "image/png" || file.type === "image/jpeg") {
                setFormData({
                    ...formData,
                    memberPhoto: file.name,
                });
                const reader = new FileReader();
                reader.onload = (r) => {
                    setFileName({
                        placeholder: r.target.result,
                        file: e.target.files[0],
                    });
                };
                reader.readAsDataURL(file);
                setImageError("");
            } else {
                setImageError("Invalid image format. Only PNG and JPEG are allowed.");
                // Reset the file input value
                e.target.value = "";
            }
        }
        setImage({ memberPhoto: file });
    };

    const amptyField = (val) => {
        toast.info(`❗${val} Field is Empty`, {
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
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        console.log("formdata", formData);

        const data = new FormData();
        for (const key in formData) {
            data.append(key, formData[key]);
        }
        if (formData.name == "") {
            amptyField("Name");

        } else if (
            formData.designation == ""
        ) {
            amptyField("Designation");
        } else if (
            formData.company_name == ""
        ) {
            amptyField("Company Name");
        } else if (
            formData.memberPhoto == ""
        ) {
            amptyField("Member Photo");
        } else if (
            formData.description == ""
        ) {
            amptyField("Description");
        } else {
            setLoading(true)
            try {

                if (image) {
                    const url = `${API_URL}/api/about_as/image`;
                    const config = {
                        headers: {
                            "content-type": "multipart/form-data",
                        },
                    };
                    axios.post(url, image, config).then((response) => {
                        console.log("image upload", response);

                    });
                }
                setTimeout(async () => {
                    const { data } = await axios.put(`${API_URL}/api/about_as/${id}`, formData);
                    console.log(data);

                    setLoading(false)
                    if (data.status !== 200) {
                        toast.error(`❗ ${data.message}!`, {
                            position: "top-right",
                            autoClose: 2500,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    } else {
                        toast.success("✔️ Submision successful !", {
                            position: "top-right",
                            autoClose: 2500,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                        navigate("/admin/view/view_member");
                    }


                }, 2500);
            } catch (error) {
                console.error("Error submitting HMO data:", error.message);
            }
        }
    };

    const handleDescriptionChange = (data, descriptionKey) => {
        setFormData({
            ...formData,
            [descriptionKey]: data,
        });
    };
    return (
        <Fragment>
            <AdminPageTitle activePage="Edit About us" pageName="AddMember" />

            <div className="d-flex col-xl-10 row-lg-12" >
                <div className="card" >
                    <div className="card-header">
                        <h4 className="card-title">Edit About us</h4>
                    </div>

                    <div className="card-body">
                        <div className="basic-form">

                            <form onSubmit={handleSubmit}>
                                <div className="mb-3 row">
                                    <label className="col-sm-3 col-form-label">Name</label>
                                    <div className="col-sm-9">
                                        <input
                                            name="name"
                                            type="text"
                                            className="form-control"
                                            placeholder="Name"
                                            value={formData.name}
                                            onChange={handleChange}


                                        />
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label className="col-sm-3 col-form-label">Designation</label>
                                    <div className="col-sm-9">
                                        <input
                                            name="designation"
                                            type="text"
                                            className="form-control"
                                            placeholder="Founder, CEO"
                                            value={formData.designation}
                                            onChange={handleChange}


                                        />
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label className="col-sm-3 col-form-label">Company name</label>
                                    <div className="col-sm-9">
                                        <input
                                            name="company_name"
                                            type="text"
                                            className="form-control"
                                            placeholder="NAIJAMEDICAL.COM (ACL Enterprise Support LTD)"
                                            value={formData.company_name}
                                            onChange={handleChange}


                                        />
                                    </div>
                                </div>

                                <div className="mb-3 row">

                                    <label htmlFor="memberPhoto" className="col-sm-3 col-form-label">Upload photo</label>
                                    <div className="col-sm-9">
                                        {/* <input
											className="form-control"
											type="file"
											id="memberPhoto"
											name="memberPhoto"
											onChange={handleFileChange}
										/> */}
                                        <input
                                            type="file"
                                            id="memberPhoto"
                                            name="memberPhoto"
                                            accept=".jpeg, .png, jpg"
                                            className="form-control"
                                            onChange={handleFileChange}
                                            ref={fileInputRef}
                                        />
                                        {imageError && <div style={{ color: 'red', marginTop: "5px" }}>{imageError}</div>}
                                    </div>
                                </div>
                                <div className="mb-3 justify-content-center">
                                    <label htmlFor="memberPhoto" className="col-sm-3 col-form-label">Photo preview</label>
                                    <img className="ml-4" style={{ objectFit: "cover", border: "5px solid gray", marginLeft: "100px", padding: "5px" }} src={fileName.placeholder ? fileName.placeholder : `${API_URL}/public/image/Company_Logo/` + formData.memberPhoto} alt="" height={200} width={200} />
                                    <img src={`${API_URL}/public/image/Company_Logo/+${formData.memberPhoto}`} alt="" />
                                </div>
                                <div className="row">
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
                                                        handleDescriptionChange(data, 'description');
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <div className="col-sm-10">
                                        {loading ? <button type="loading" className="btn btn-primary" disabled>
                                            Submitting
                                        </button> :
                                            <button type="submit" className="btn btn-primary">
                                                Submit
                                            </button>}
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

export default AddMember;
