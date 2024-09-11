import React, { useState,useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
// import { GlobalContext } from "../../context/GlobalContext";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from "react-router-dom";
import { connect,useDispatch } from 'react-redux';
import { API_URL } from "../../apiconfig";
import {
    loadingToggleAction,
    userloginAction,
} from '../../store/actions/AuthActions';
function UserLogin() {
    // const { globalVariable } = useContext(GlobalContext);
    const navigate=useNavigate()
    const dispatch = useDispatch();
    const [errors, setErrors] = useState("");
    const [loading, setLoading] = useState(false);
    let errorsObj = { username: null, password: null };
    const [formData, setFormData] = useState({ username: null, password: null });
    const globalValue = window.myGlobalVariable;
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validateIdentifier = (username) => {
        const phone=/^[0-9]/ //for test 
        // const phone = /^[0-9]{10,15}/; //actual 
        const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (phone.test(username)) {
            return { type: 'phone', value: username };
        } else if (email.test(username)) {
            return { type: 'email', value: username };
        } else {
            return { type: 'invalid', value: '' };
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validation = validateIdentifier(formData.username);
        if (validation.type === 'invalid') {
            setErrors('Please enter a valid email or phone number');
            toast.error("Invalid email or phone number", {
                position: "top-right",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return;
        }

        try {
            const response = await axios.post(`${API_URL}/api/user/loginuser`, {
                email: validation.type === 'email' ? validation.value : '',
                phone: validation.type === 'phone' ? validation.value : '',
                password: formData.password
            });
            if (response.data.message === "login successful") {
                toast.success("✔️ Login successful", {
                    position: "top-right",
                    autoClose: 2500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                navigate("/");
            } else {
                toast.error("Invalid credentials", {
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
            toast.error("Error logging in", {
                position: "top-right",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            console.error("Error", error);
        }
    };

    function onLogin(e) {
        setLoading(true)
        console.log(formData);
        e.preventDefault();
        let error = false;
        let username = formData.username;
        let password = formData.password;
        const errorObj = { ...errorsObj };
        const validation = validateIdentifier(formData.username);
        // if (formData.username === '') {
        //     errorObj.email = 'Email is Required';
        //     error = true;
        // }
        // if (formData.password === '') {
        //     errorObj.password = 'Password is Required';
        //     error = true;
        // }
        // setErrors(errorObj);
        // if (error) {
		// 	return ;
		// }
		// dispatch(loadingToggleAction(true));	
        dispatch(userloginAction(username, password, navigate));
        setLoading(false)
    }
    // console.log(globalVariable,globalValue);
    

    return (
        <div className="authincation h-100 p-meddle">
            <div className="container h-100 mb-3">
                <div className="row justify-content-center align-items-center" style={{height:"950px"}}>
                    <div className="col-md-6">
                        <div className="authincation-content mb-3">
                            <div className="row no-gutters">
                                <div className="col-xl-12">
                                    <div className="auth-form">
                                        <div className="mb-4 text-centre">
                                            <h3 className="dz-title mb-1" style={{ textAlign: "center" }}>Login</h3>
                                        </div>
                                        <form onSubmit={onLogin}>
                                            <div className="form-group mb-3">
                                                <label className="mb-1">
                                                    <strong>Email/Phone Number</strong>
                                                </label>
                                                <input
                                                    name="username"
                                                    className="form-control"
                                                    placeholder="Enter Email or Phone Number"
                                                    // value={formData.username}
                                                    onChange={handleChange}
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
                                                    onChange={handleChange}
                                                    // value={formData.password}
                                                    required
                                                />
                                            </div>
                                            <div className="text-center">
                                                <button
                                                disabled={loading}
                                                    type="submit"
                                                    className="btn btn-primary btn-block blockquote" style={{ fontSize: "large" }}
                                                >
                                                {loading ? "...loading" :   "Login"}
                                                </button>
                                            </div>
                                            <div style={{textAlign:"center"}}>   
                                                <Link to="/forgotPassword" >
                                                    <strong>Forgot Password</strong>
                                                </Link>
                                            </div>
                                            <div style={{textAlign:"center"}}>   
                                                <Link to="/register" >
                                                    <strong>Registration</strong>
                                                </Link>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </div>





        // <div className="login-main-page" style={{ backgroundColor: "lightgreen" }}>
        //     <div className="login-wrapper">
        //         <div className="login-aside-left">
        //             <Link to="/dashboard" className="login-logo">
        //                 <img src={logo} alt="Naijainsurance" />
        //             </Link>
        //             <div className="login-description">
        //                 <h2 className="main-title mb-2">Welcome To Naijainsurance</h2>
        //                 <ul className="social-icons mt-4">
        //                     <li><Link to={"#"}><i className="fab fa-facebook-f"></i></Link></li>
        //                     <li><Link to={"#"}><i className="fab fa-twitter"></i></Link></li>
        //                     <li><Link to={"#"}><i className="fab fa-linkedin-in"></i></Link></li>
        //                 </ul>
        //             </div>
        //         </div>
        //         <div className="login-aside-right">
        //             <div className="row m-0 justify-content-center h-100 align-items-center">
        //                 <div className="p-5">
        //                     <div className="authincation-content">
        //                         <div className="row no-gutters">
        //                             <div className="col-xl-12">
        //                                 <div className="auth-form-1">
        //                                     <div className="mb-4">
        //                                         <h3 className="dz-title mb-1">Login</h3>
        //                                     </div>
        //                                     <form onSubmit={handleSubmit}>
        //                                         <div className="form-group mb-3">
        //                                             <label className="mb-1 ">
        //                                                 <strong>Email</strong>
        //                                             </label>
        //                                             <input
        //                                                 name="email"
        //                                                 type="email"
        //                                                 className="form-control"
        //                                                 placeholder="hello@example.com"
        //                                                 onChange={handleChange}
        //                                             />
        //                                         </div>
        //                                         <div className="form-group mb-3">
        //                                             <label className="mb-1 ">
        //                                                 <strong>Phone number</strong>
        //                                             </label>
        //                                             <input
        //                                                 name="phone"
        //                                                 id="phone"
        //                                                 type="text"
        //                                                 className="form-control"
        //                                                 placeholder="Enter your contact no"
        //                                                 maxLength={10}
        //                                                 minLength={10}
        //                                                 onChange={handlePhoneChange}
        //                                             />
        //                                         </div>
        //                                         <div className="form-group mb-3">
        //                                             <label className="mb-1 ">
        //                                                 <strong>Password</strong>
        //                                             </label>
        //                                             <input
        //                                                 name="password"
        //                                                 type="password"
        //                                                 className="form-control"
        //                                                 placeholder="Enter your password"
        //                                                 onChange={handleChange}
        //                                                 required
        //                                             />
        //                                         </div>
        //                                         <div className="text-center">
        //                                             <button
        //                                                 type="submit"
        //                                                 className="btn btn-primary btn-block"
        //                                             >
        //                                                 Login
        //                                             </button>
        //                                         </div>
        //                                     </form>
        //                                     <ToastContainer />
        //                                 </div>
        //                             </div>
        //                         </div>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </div>
    );
};

const mapStateToProps = (state) => {
    return {
        errorMessage: state.auth.errorMessage,
        successMessage: state.auth.successMessage,
        showLoading: state.auth.showLoading,
    };
};

export default connect(mapStateToProps)(UserLogin);
