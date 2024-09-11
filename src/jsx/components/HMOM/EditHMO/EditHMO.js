import React, { Fragment, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';
import PageTitle from "../../../layouts/PageTitle";
import axios from "axios";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_URL } from "../../../../apiconfig"
import default_logo from "../../../../image/default logo.png";
import { Alert } from "react-bootstrap";
const EditHMO = () => {
  const { id } = useParams();  // Fixing parameter name to id
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    company_name: '',
    email: '',
    contact_no: '',
    hmotype: '',
    contact_person: '',
    address: '',
    logo_url: "",
    video_url: "",
    description_1: '',
    description_2: ''
  });
  const [image, setImage] = useState({
    placeholder: "", file: null
  });
  const [imageError, setImageError] = useState('');
  const [videoError, setVideoError] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState({logo_url:null});
  const [videoFile, setVideoFile] = useState({video_url:null});
  const fileInputRef = useRef(null);
  useEffect(async () => {
    // if (id) {
    handleDescriptionData()
   
    const { data } = await axios.get(`${API_URL}/api/hmo/${id}`);
    const { company_name, email, description_1, description_2, contact_no, contact_person, address, logo_url, video_url } = data

    //  setFormData({
    //   description_1:description_1
    //  })
    setFormData({
      ...formData,
      company_name: company_name,
      email: email,
      contact_no: contact_no,
      contact_person: contact_person,
      address: address,
      logo_url: logo_url,
      video_url: video_url,
      description_1: description_1,
      description_2: description_2
    });
    setPhoneNumber(contact_no);
    // setFileName(logo_url); // Assuming logo_url is a URL or file name
    // setVideoFile(video_url); // Assuming video_url is a URL or file name
    // }
  }, [id]);
  const handleDescriptionData = async () => {
    const { data } = await axios.get(`${API_URL}/api/hmo/${id}`);
    const { company_name, email, description_1, description_2, contact_no, contact_person, address, logo_url, video_url } = data
    setFormData({
      ...formData,
      description_1: description_1,
      description_2: description_2,
      logo_url: logo_url,
      video_url: video_url,
      company_name: company_name,
      email: email,
      contact_no: contact_no,
      contact_person: contact_person,
      address: address,
      logo_url: logo_url,
      video_url: video_url,
    })


  }
  // const handleGetEdit = async () => {
  //   try {

  //   } catch (error) {
  //     console.error('Error fetching HMO data:', error.message);
  //   }
  // };
  const amptyField = () => {
    toast.warn("❗ Field is Empty", {
      position: "top-right",
      autoClose: 5000,
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
        // Reset the file input value
        e.target.value = "";
      }
    }
    setFileName({ logo_url: file });
  }; 
  const handleVideoFileChange = (e) => {
    const file = e.target.files[0];
    setVideoFile({ video_url: file });

	if (file) {
		// Validate the file type
		if (file.type === 'video/mp4') {
		  setFormData({...formData,video_url:file.name})
		  setVideoError('');
		} else {
			setVideoError('Invalid video format. Only mp4 is allowed.');
		  // Reset the file input value
		  e.target.value = '';
		}
	  }
  };
  const handleBlur = () => {
    if (phoneNumber.length !== 10) {
      setError('Phone number must be 10 digits.');
    }
  };
  const handlePhoneChange = (e) => {
    const value = e.target.value;


    if (/[^0-9]/.test(value)) {
      setError('Please enter valid number');
    } else {
      setError('');
    }
    setPhoneNumber(value.replace(/\D/g, ''));
    setFormData({ ...formData, contact_no: phoneNumber })
  };
  const handleDescription1Change = (data, descriptionKey) => {
    setFormData({
      ...formData,
      ['description_1']: data
    });
  };
  const handleDescription2Change = (data, descriptionKey) => {
    setFormData({
      ...formData,
      [descriptionKey]: data
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    if (formData.company_name == "") {
      amptyField();
    } else if (formData.email == "") {
      amptyField();
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i.test(formData.email)
    ) {
      toast.warn("❗ Enter valid email", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setLoading(false)
    } else if (
      isNaN(formData.contact_no) ||
      formData.contact_no == "" ||
      !formData.contact_no
    ) {
      toast.warn("❗ Add Valid Mobile Number", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setLoading(false)
    } else if (
      formData.contact_person == "" ||
      formData.address == "" ||
      formData.logo_url == "" ||
      formData.description_1 == "" ||
      formData.description_2 == ""
    ) {
      amptyField();
   
    } else {
      try {
        setLoading(true)
        if (fileName) {
          const url = `${API_URL}/api/hmo/image`;
          const config = {
            headers: {
              "content-type": "multipart/form-data",
            },
          };
          axios.post(url, fileName, config).then((response) => {
          });
        }
        if (videoFile) {
          const url = `${API_URL}/api/hmo/video`;
          const config = {
            headers: {
              "content-type": "multipart/form-data",
            },
          };
          axios.post(url, videoFile, config).then((response) => {
          });
        }
      
        setTimeout(async () => {
          const response = await axios.put(`${API_URL}/api/hmo/${id}`, formData);
          setLoading(false)
          if (response.status == 200) {
            toast.success("✔️ Submision successful !", {
              position: "top-right",
              autoClose: 2500,
              hideProgressBar: false,
              closeOnClick: true,
              // pauseOnHover: true,
              // draggable: true,
              progress: undefined,
            });
          }
          navigate("/admin/view/ViewHMO");
        }, 2500);
      } catch (error) {
        console.error("Error submitting HMO data:", error);
      }
    }
  };
  return (
    <Fragment>
      <PageTitle activeMenu="Update-HMO" motherMenu="HMO Management" />
      <div className="col-xl-8 col-lg-12">
        <div className="card" style={{ display: "flex" }}>
          <div className="card-header">
            <h4 className="card-title">Update-HMO</h4>
          </div>
          <div className="card-body">
            <div className="basic-form">
              <form onSubmit={handleSubmit}>
              <div className="mb-3 row">
									<label className="col-sm-3 col-form-label">HMO Type</label>
									<div className="col-sm-9">
										<div className="form-check">
											<input
												className="form-check-input"
												type="radio"
												name="hmotype"
												id="privateHMO"
												value="Private"
												checked={formData.hmotype === 'Private'}
												onChange={handleChange}
											/>
											<label className="form-check-label" htmlFor="privateHMO">
												Private HMO
											</label>
										</div>
										<div className="form-check">
											<input
												className="form-check-input"
												type="radio"
												name="hmotype"
												id="stateHMO"
												value="State"
												checked={formData.hmotype === 'State'}
												onChange={handleChange}
											/>
											<label className="form-check-label" htmlFor="stateHMO">
												State HMO
											</label>
										</div>
									</div>
								</div>
                <div className="mb-3 row">
                  <label className="col-sm-3 col-form-label">HMO Name</label>
                  <div className="col-sm-9">
                    <input
                      name="company_name"
                      type="text"
                      className="form-control"
                      placeholder="Name"
                      value={formData.company_name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="mb-3 row">
                  <label className="col-sm-3 col-form-label">Email</label>
                  <div className="col-sm-9">
                    <input
                      name="email"
                      type="text"
                      className="form-control"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleChange}
                    // required
                    />
                  </div>
                </div>
                <div className="mb-3 row">
                  <label className="col-sm-3 col-form-label">Contact No</label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      id="contact_no"
                      name="contact_no"
                      className="form-control"
                      placeholder="Enter your phone number"
                      value={phoneNumber}
                      onChange={handlePhoneChange}
                      required
                      maxLength={10}
                      minLength={10}
                      onBlur={handleBlur}

                    />
                    {error && <div style={{ color: 'red' }}>{error}</div>}
                  </div>
                </div>
                <div className="mb-3 row">
                  <label className="col-sm-3 col-form-label">Contact Person</label>
                  <div className="col-sm-9">
                    <input
                      name="contact_person"
                      type="text"
                      className="form-control"
                      placeholder="Contact Person"
                      value={formData.contact_person}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="mb-3 row">
                  <label className="col-sm-3 col-form-label">Address</label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      name="address"
                      className="form-control"
                      placeholder="Address"
                      value={formData.address}
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
                      placeholder=""
                      onChange={handleFileChange}
                    />
                    {imageError && <div style={{ color: 'red', marginTop: "5px" }}>{imageError}</div>}


                  </div>

                </div>
                <div className="mb-3 row">

                  <div className="mb-3 justify-content-space-between">
                    <label htmlFor="video_url" className="col-sm-3 col-form-label">Logo preview</label>
                    <img className="ml-4" style={{ objectFit: "cover", border: "5px solid gray", marginLeft: "100px", padding: "5px" }} src={image.placeholder ? image.placeholder : `${API_URL}/public/image/Company_Logo/` + formData.logo_url} height={200} width={200} />

                  </div>

                </div>
                <div className="mb-3 row">
                  <label htmlFor="formFile" className="col-sm-3 col-form-label">Update video</label>
                  <div className="col-sm-9">
                    <input
                      className="form-control"
                      type="file"
                      id="formFile"
                      name="video_url"
                      placeholder={"kjddbjb"}
                      onChange={handleVideoFileChange}
                      
                    />
                    {videoError && <div style={{ color: 'red', marginTop: "5px" }}>{videoError}</div>}
                    <div>{formData.video_url}</div>
                  </div>

                </div>

                <div className="col-xl-12 col-xxl-12">
                  <div className="card">
                    <div className="card-header">
                      <h4 className="card-title">Description 1</h4>
                    </div>
                    <div className="card-body custom-ekeditor">
                      <CKEditor
                        editor={ClassicEditor}
                        data={formData.description_1}
                        onReady={editor => {
                        }}
                        onChange={(event, editor) => {
                          const data = editor.getData();
                          handleDescription1Change(data, 'description_1');
                        }}
                        onBlur={(event, editor) => {
                        }}
                        onFocus={(event, editor) => {
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-xl-12 col-xxl-12">
                  <div className="card">
                    <div className="card-header">
                      <h4 className="card-title">Description 2</h4>
                    </div>
                    <div className="card-body custom-ekeditor">
                      <CKEditor
                        editor={ClassicEditor}
                        data={formData.description_2}
                        onReady={editor => {                        }}
                        onChange={(event, editor) => {
                          const data = editor.getData();                          handleDescription2Change(data, 'description_2');
                        }}
                        onBlur={(event, editor) => {                        }}
                        onFocus={(event, editor) => {                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-3 row">
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

export default EditHMO;
