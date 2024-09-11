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
import default_logo from "../../../../image/default logo.png";
import { API_URL } from "../../../../apiconfig";
const AddHMO = () => {
	const navigate = useNavigate();
	const [videoFile, setVideoFile] = useState({ video_url: null });
	const [image, setImage] = useState({ logo_url: null });
	const [fileName, setFileName] = useState({ placeholder: "", file: null });
	const [formData, setFormData] = useState({
		company_name: "",
		email: "",
		contact_no: "",
		hmotype: "",
		contact_person: "",
		address: "",
		logo_url: null,
		video_url: null,
		description_1: "",
		description_2: "",
	});
	const [phoneNumber, setPhoneNumber] = useState("");
	const [error, setError] = useState("");

	const [imageError, setImageError] = useState("");
	const [videoError, setVideoError] = useState("");
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

	const handleVideoFileChange = (e) => {
		const file = e.target.files[0];
		setVideoFile({ video_url: file });
		if (file) {
			// Validate the file type
			if (file.type === 'video/mp4') {
				setFormData({ ...formData, video_url: file })
				setVideoError('');
			} else {
				setVideoError('Invalid video format. Only mp4 is allowed.');
				// Reset the file input value
				e.target.value = '';
			}
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
		setFormData({ ...formData, contact_no: value.replace(/\D/g, '') })
	};
	const handleBlur = () => {
		if (phoneNumber.length > 0 && phoneNumber.length !== 10) {
			setError('Phone number must be 10 digits.');
		}
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
		const data = new FormData();
		for (const key in formData) {
			data.append(key, formData[key]);
		}
		if (formData.company_name == "") {
			amptyField("HMO Name");

		} else if (formData.email == "") {
			amptyField("Email");
		} else if (
			!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i.test(formData.email)
		) {
			toast.info("❗ Enter valid email", {
				position: "top-right",
				autoClose: 2500,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
			setLoading(false)
		} else if (
			formData.contact_no == "" ||
			!formData.contact_no
		) {
			toast.info("❗ Add Valid Mobile Number", {
				position: "top-right",
				autoClose: 2500,
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
			setLoading(true)
			try {

				if (image) {
					const url = `${API_URL}/api/hmo/image`;
					const config = {
						headers: {
							"content-type": "multipart/form-data",
						},
					};
					axios.post(url, image, config).then((response) => {
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
					const { data } = await axios.post(`${API_URL}/api/hmo`, formData);
					setLoading(false)
					if (data.status == 400) {
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
						navigate("/admin/view/ViewHMO");
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
			<AdminPageTitle activePage="HMO Management" pageName="AddHMO" />

			<div className="d-flex col-xl-10 row-lg-12" >
				<div className="card" >
					<div className="card-header">
						<h4 className="card-title">ADD HMO</h4>
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
											value={formData.contact_no}
											onChange={handlePhoneChange}

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

										/>
									</div>
								</div>
								<div className="mb-3 row">
									<label htmlFor="logo_url" className="col-sm-3 col-form-label">Upload logo image</label>
									<div className="col-sm-9">
										{/* <input
											className="form-control"
											type="file"
											id="logo_url"
											name="logo_url"
											onChange={handleFileChange}
										/> */}
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
									<label htmlFor="logo_url" className="col-sm-3 col-form-label">Logo preview</label>
									<img className="ml-4" style={{ objectFit: "cover", border: "5px solid gray", marginLeft: "100px", padding: "5px" }} src={fileName.placeholder ? fileName.placeholder : default_logo} alt="" height={200} width={200} />

								</div>
								<div className="mb-3 row">
									<label htmlFor="video_url" className="col-sm-3 col-form-label">Upload video</label>
									<div className="col-sm-9">
										<input
											className="form-control"
											type="file"
											id="video_url"
											name="video_url"
											accept=".mp4, .mov"
											onChange={handleVideoFileChange}
										/>
										{videoError && <div style={{ color: 'red', marginTop: "5px" }}>{videoError}</div>}
									</div>
								</div>
								<div className="row">
									<div className="col-xl-12 col-xxl-12">
										<div className="card">
											<div className="card-header">
												<h4 className="card-title">Description 1</h4>
											</div>
											<div className="card-body custom-ekeditor">
												<CKEditor
													editor={ClassicEditor}
													data={formData.description_1}
													onChange={(event, editor) => {
														const data = editor.getData();
														handleDescriptionChange(data, 'description_1');
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
													onChange={(event, editor) => {
														const data = editor.getData();
														handleDescriptionChange(data, 'description_2');
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

export default AddHMO;
