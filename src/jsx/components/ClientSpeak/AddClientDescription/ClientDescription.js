import React, { Fragment, useRef, useState } from 'react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import default_logo from '../../../../image/default logo.png';
import { ToastContainer, toast } from "react-toastify";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../../../apiconfig';

function ClientDescription() {
    const [formData, setFormData] = useState({
        client_name: "",
        logo_url: null,
        description: "",
    });
    const navigate = useNavigate();
    const [imageError, setImageError] = useState("");
    const [fileName, setFileName] = useState({ placeholder: "", file: null });
    const [loading, setLoading] = useState(false);
    const [userData,setUserData]=useState()
    const fileInputRef = useRef(null);

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
        setLoading(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });
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

        if (formData.client_name === "" || formData.logo_url === null || formData.description === "") {
            amptyField();
            return;
        }

        try {
            if (formData.logo_url && formData.logo_url !== "") {
                const imageForm = new FormData();
                imageForm.append("file", formData.logo_url);
                const imageUrl = await axios.post(`${API_URL}/api/ClientSpeak/image`, imageForm);
                setFormData({
                    ...formData,
                    logo_url: imageUrl.data.url,
                });
            }

            const response = await axios.post(`${API_URL}/api/ClientSpeak`, formData);
            
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
                const fetchData = await axios.get(`${API_URL}/api/ClientSpeak`);
                setUserData(fetchData.data);

                navigate("/admin/view/view_clientDescription");
            } else {
                toast.error(`❗ ${response.message}!`, {
                    position: "top-right",
                    autoClose: 2500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        } catch (error) {
            console.error("Error submitting client description data:", error.message);
            toast.error(`❗ Error: ${error.message}`, {
                position: "top-right",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Fragment>
            <div className="d-flex col-xl-10 row-lg-12">
                <div className="card">
                    <div className="card-header">
                        <h4 className="card-title">Testimonials</h4>
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
                                    <label htmlFor="logo_url" className="col-sm-3 col-form-label">Upload Client photo</label>
                                    <div className="col-sm-9">
                                        <input
                                            type="file"
                                            id="logo_url"
                                            name="logo_url"
                                            accept=".jpeg, .png"
                                            className="form-control"
                                            onChange={handleFileChange}
                                            ref={fileInputRef}
                                        />
                                        {imageError && <div style={{ color: 'red', marginTop: "5px" }}>{imageError}</div>}
                                    </div>
                                </div>
                                <div className="mb-3 justify-content-center">
                                    <label htmlFor="logo_url" className="col-sm-3 col-form-label">Photo preview</label>
                                    <img className="ml-4" style={{ objectFit: "cover", border: "5px solid gray", marginLeft: "100px", padding: "5px" }} src={fileName.placeholder ? fileName.placeholder : default_logo} alt="" height={200} width={200} />

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
                                                        handleDescriptionChange(data);
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
}

export default ClientDescription;




// import React, { Fragment, useRef, useState } from 'react'
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import default_logo from '../../../../image/default logo.png'
// import { ToastContainer, toast } from "react-toastify";
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// function ClientDescription() {
//     const [formData, setFormData] = useState({
//         client_name: "",
//         logo_url: null,
//         description: "",
//     });
//     console.log("wer",formData)
//     const navigate = useNavigate();
//     const [image, setImage] = useState({ logo_url: null });
//     const [imageError, setImageError] = useState("");
//     const [fileName, setFileName] = useState({ placeholder: "", file: null });
//     const [loading, setLoading] = useState(false);
//     const fileInputRef = useRef(null);

//     const amptyField = (val) => {
//         toast.info(`❗${val} Field is Empty`, {
//           position: "top-right",
//           autoClose: 2500,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//         });
//         setLoading(false)
//       };
//       const handleChange = (e) => {
//         const { name, value } = e.target;
    
//         setFormData({
//           ...formData,
//           [name]: value,
//         });
//       };
//     const handleFileChange = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             if (file.type === "image/png" || file.type === "image/jpeg") {
//                 setFormData({
//                     ...formData,
//                     logo_url: file.name,
//                 });
//                 const reader = new FileReader();
//                 reader.onload = (r) => {
//                     setFileName({
//                         placeholder: r.target.result,
//                         file: e.target.files[0],
//                     });
//                 };
//                 reader.readAsDataURL(file);
//                 setImageError("");
//             } else {
//                 setImageError("Invalid image format. Only PNG and JPEG are allowed.");
//                 // Reset the file input value
//                 e.target.value = "";
//             }
//         }
//         setImage({ logo_url: file });
//     };
// //    
//     const handleDescriptionChange = (data) => {
//         setFormData({
//             ...formData,
//             description: data,
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true)
//         if (formData.client_name == "") {
//             amptyField("Client name");

//         } else if (
//             formData.logo_url == "" ||
//             formData.description == ""
//         ) {
//             amptyField();
//         } else {
//             setLoading(true)
//             try {
//                 if (image) {
//                     const url = `${API_URL}/api/ClientSpeak/image`;
//                     const config = {
//                         headers: {
//                             "content-type": "multipart/form-data",
//                         },
//                     };
//                     axios.post(url, image, config).then((response) => {
//                     });
//                 }
//                 setTimeout(async () => {
//                     const data =  axios.post(`${API_URL}/api/ClientSpeak`, formData);
//                     if (data.status == 400) {
//                         toast.error(`❗ ${data.message}!`, {
//                             position: "top-right",
//                             autoClose: 2500,
//                             hideProgressBar: false,
//                             closeOnClick: true,
//                             pauseOnHover: true,
//                             draggable: true,
//                             progress: undefined,
//                         });
//                     } else {
//                         toast.success("✔️ Submision successful !", {
//                             position: "top-right",
//                             autoClose: 2500,
//                             hideProgressBar: false,
//                             closeOnClick: true,
//                             pauseOnHover: true,
//                             draggable: true,
//                             progress: undefined,
//                         });
//                         navigate("/admin/view/view_clientDescription");
//                     }
//                 }, 2500);
//              } catch (error) {
//                 console.error("Error submitting client description data:", error.message);
//             }
//         }
//     };

//     return (
//         <Fragment>
//             <div className="d-flex col-xl-10 row-lg-12" >
//                 <div className="card" >
//                     <div className="card-header">
//                         <h4 className="card-title">Client Speak</h4>
//                     </div>

//                     <div className="card-body">
//                         <div className="basic-form">

//                             <form onSubmit={handleSubmit}>
//                                 <div className="mb-3 row">
//                                     <label className="col-sm-3 col-form-label">Client Name</label>
//                                     <div className="col-sm-9">
//                                         <input
//                                             name="client_name"
//                                             type="text"
//                                             className="form-control"
//                                             placeholder="Name"
//                                             value={formData.client_name}
//                                             onChange={handleChange}
//                                             required
//                                         />
//                                     </div>
//                                 </div>
//                                 <div className="mb-3 row">
//                                     <label htmlFor="logo_url" className="col-sm-3 col-form-label">Upload logo image</label>
//                                     <div className="col-sm-9">
//                                         <input
//                                             type="file"
//                                             id="logo_url"
//                                             name="logo_url"
//                                             accept=".jpeg, .png"
//                                             className="form-control"
//                                             onChange={handleFileChange}
//                                             ref={fileInputRef}
//                                         />
//                                         {imageError && <div style={{ color: 'red', marginTop: "5px" }}>{imageError}</div>}
//                                     </div>
//                                 </div>
//                                 <div className="mb-3 justify-content-center">
//                                     <label htmlFor="logo_url" className="col-sm-3 col-form-label">Logo preview</label>
//                                     <img className="ml-4" style={{ objectFit: "cover", border: "5px solid gray", marginLeft: "100px", padding: "5px" }} src={fileName.placeholder ? fileName.placeholder : default_logo} alt="" height={200} width={200} />

//                                 </div>

//                                 <div className="row">
//                                     <div className="col-xl-12 col-xxl-12">
//                                         <div className="card">
//                                             <div className="card-header">
//                                                 <h4 className="card-title">Description</h4>
//                                             </div>
//                                             <div className="card-body custom-ekeditor">
//                                                 <CKEditor
//                                                     editor={ClassicEditor}
//                                                     data={formData.description}
//                                                     onChange={(event, editor) => {
//                                                         const data = editor.getData();
//                                                         handleDescriptionChange(data);
//                                                     }}
//                                                 />
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className="mb-3 row">
//                                     <div className="col-sm-10">
//                                         {loading ? <button type="loading" className="btn btn-primary" disabled>
//                                             Submitting
//                                         </button> :
//                                             <button type="submit" className="btn btn-primary">
//                                                 Submit
//                                             </button>}
//                                     </div>
//                                 </div>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <ToastContainer />
//         </Fragment>
//     )
// }

// export default ClientDescription

