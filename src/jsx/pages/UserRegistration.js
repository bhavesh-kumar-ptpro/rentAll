import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { connect } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../apiconfig";


import 'react-toastify/dist/ReactToastify.css';

function Register() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    password: "",
    email: ""
  });
  // console.log("DSD", formData)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    if (/[^0-9]/.test(value)) {
      setErrors('Please enter a valid number');
    } else {
      setErrors('');
      setFormData({
        ...formData,
        phone: value.replace(/\D/g, '')
      });
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
  };

  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault();
    if (formData.first_name === "") {
      amptyField("First Name");
    } else if (formData.email === "") {
      amptyField("Email");
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i.test(formData.email)) {
      toast.info("❗ Enter valid email", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (formData.last_name === "" || !formData.phone) {
      toast.info("❗ Add Valid Mobile Number", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (formData.password === "") {
      amptyField("password");
    } else {
      try {

        const { data } = await axios.post(`${API_URL}/api/user`, formData);
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
          setLoading(false)
        } else {
          setLoading(true)
          toast.success("✔️Successful, check email for verification code", {
            position: "top-right",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setTimeout(async () => {
            navigate(`/code-verify/${formData.email}`);
          }, 2000);

        }




      } catch (error) {
        console.error("Error submitting register data:", error.message);
      }
    }
  };

  return (
    <div className="authincation h-100 p-meddle">
      <div className="container h-100 mb-3">
        <div className="row justify-content-center h-100 align-items-center">
          <div className="col-md-6">
            <div className="authincation-content mb-5">
              <div className="row no-gutters">
                <div className="col-xl-12">
                  <div className="auth-form">
                    <div className="mb-4 text-centre ">
                      <h3 className="dz-title mb-1" style={{ textAlign: "center" }}>Sign up</h3>
                    </div>
                    <form onSubmit={handleSubmit}>
                      <div className="d-flex gap-5">
                        <div className="form-group mb-3">
                          <label className="mb-1">
                            <strong>First Name</strong>
                          </label>
                          <input
                            name="first_name"
                            type="text"
                            className="form-control"
                            placeholder="Name"
                            value={formData.first_name}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="form-group mb-3">
                          <label className="mb-1">
                            <strong>Last Name</strong>
                          </label>
                          <input
                            name="last_name"
                            type="text"
                            className="form-control"
                            placeholder="Last name"
                            value={formData.last_name}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="form-group mb-3">
                        <label className="mb-1">
                          <strong>Phone number</strong>
                        </label>
                        <input
                          name="phone"
                          id="phone"
                          type="tel"
                          className="form-control"
                          placeholder="Enter your contact no"
                          value={formData.phone}
                          onChange={handlePhoneChange}
                          maxLength={10}
                          minLength={10}
                          required
                        />
                        {errors && <div style={{ color: 'red' }}>{errors}</div>}
                      </div>
                      <div className="form-group mb-3">
                        <label className="mb-1">
                          <strong>Password</strong>
                        </label>
                        <input
                          name="password"
                          type="password"
                          className="form-control"
                          placeholder="Enter your password"
                          value={formData.password}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="form-group mb-3">
                        <label className="mb-1">
                          <strong>Email</strong>
                        </label>
                        <input
                          name="email"
                          type="email"
                          className="form-control"
                          placeholder="hello@example.com"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                        {errors.email && <div className="text-danger">{errors.email}</div>}
                      </div>
                      <div className="text-center text-large">
                        <button
                          disabled={loading}
                          type="submit"
                          className="btn btn-primary btn-block blockquote"
                          style={{ fontSize: "large" }}
                        >
                        {loading ? "...loading" :   "Sign Up"}  
                        </button>
                      </div>
                    </form>
                    <ToastContainer />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    errorMessage: state.auth.errorMessage,
    successMessage: state.auth.successMessage,
    showLoading: state.auth.showLoading,
  };
};

export default connect(mapStateToProps)(Register);

