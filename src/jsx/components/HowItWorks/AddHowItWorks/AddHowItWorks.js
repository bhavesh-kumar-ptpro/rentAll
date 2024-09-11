import React, { Fragment, useState, useRef } from "react";
// import styles
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import AdminPageTitle from "../../AdminPageTitle/AdminPageTitle";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import default_logo from "../../../../image/default_user.png";
import default_scene from "../../../../image/default-employee.jpg";
import { API_URL } from "../../../../apiconfig";
const AddHowItWorks = () => {
    const navigate = useNavigate();
    const [videoFile, setVideoFile] = useState({ video_url: null });
    const [image, setImage] = useState({ logo_url: null });
    const [fileName, setFileName] = useState({ placeholder: "", file: null });
    const [formData, setFormData] = useState({
        how_it_work: "",
    });
    const [error, setError] = useState("");
    const [imageError, setImageError] = useState("");
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef(null);
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
        setImage({ logo_url: file });
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
         if (
            formData.how_it_work == ""
        ) {
            amptyField("Description");
        } else {
            setLoading(true)

            
            try {

                // if (image) {
                //     const url = `${API_URL}/api/hmo/image`;
                //     const config = {
                //         headers: {
                //             "content-type": "multipart/form-data",
                //         },
                //     };
                //     axios.post(url, image, config).then((response) => {
                //         console.log("image upload", response);

                //     });
                // }
                setTimeout(async () => {
                    const { data } = await axios.post(`${API_URL}/api/how_it_works/`, formData);
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
                        navigate("/admin/view/view_how");
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
            <AdminPageTitle activePage="Add How it works" pageName="AddHowItWorks" />

            <div className="d-flex col-xl-10 row-lg-12" >
                <div className="card" >
                    <div className="card-header">
                        <h4 className="card-title">Add How it works</h4>
                    </div>

                    <div className="card-body">
                        <div className="basic-form">
                       
                            <form onSubmit={handleSubmit}>

                                {/* <div className="mb-3 row">

                                    <label htmlFor="photo" className="col-sm-3 col-form-label">Upload photo</label>
                                    <div className="col-sm-9">
                                        <input
                                            type="file"
                                            id="logo_url"
                                            name="logo_url"
                                            accept=".jpeg, .png, jpg"
                                            className="form-control"
                                            onChange={handleFileChange}
                                            ref={fileInputRef}
                                        />
                                        {imageError && <div style={{ color: 'red', marginTop: "5px" }}>{imageError}</div>}
                                    </div>
                                </div>
                                <div className="mb-3 justify-content-center">
                                    <label htmlFor="logo_url" className="col-sm-3 col-form-label">Photo preview</label>
                                    <img className="ml-4" style={{width:"75%" ,objectFit: "cover", border: "5px solid gray", marginLeft: "100px", padding: "5px" }} src={fileName.placeholder ? fileName.placeholder : default_scene} alt="" height={200} width={200} />

                                </div> */}
                                <div className="row">
                                    <div className="col-xl-12 col-xxl-12">
                                        <div className="card">
                                     {formData.how_it_work   &&    <div className="card-header">
                                                <h4 className="card-title">Preview</h4>
                                            </div>}
                                        {  formData.how_it_work   && <div dangerouslySetInnerHTML={{__html:formData.how_it_work}}></div>}
                                            <div className="card-header">
                                                <h4 className="card-title">Description</h4>
                                            </div>
                                            <div className="card-body custom-ekeditor">
                                                <CKEditor
                                                    editor={ClassicEditor}
                                                    data={formData.how_it_work}
                                                    onChange={(event, editor) => {
                                                        const data = editor.getData();
                                                        handleDescriptionChange(data, 'how_it_work');
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

export default AddHowItWorks;
