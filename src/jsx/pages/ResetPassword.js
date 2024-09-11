import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
const ResetPassword = () => {
    const { userId } = useParams();
    const navigate = useNavigate()
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false)

    const onSubmit = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match!", {
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
        try {
            const response = await axios.post(`http://localhost:3000/api/user/3`, { newPassword });
            if (response.status == 400) {
                toast.error(`❗ ${response.message}!`, {
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
                toast.success("✔️ Submision successful !", {
                    position: "top-right",
                    autoClose: 2500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setLoading(false)
                navigate("/login")
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (

        <div className="col-xl-7 row-lg-12" >
            <div className="card" >
                <div className="card-header">
                    <h4 className="card-title">Reset Password</h4>
                </div>

                <div className="card-body">
                    <div className="basic-form">
                        <form onSubmit={onSubmit}>
                            <div className="form-group">
                                <label className="mb-2">
                                    <strong>New Password</strong>
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Enter new password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    pattern='(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}'
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label className="mb-2">
                                    <strong>Confirm Password</strong>
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Confirm new password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    pattern='(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}'
                                    required
                                />
                            </div>
                            <div className="text-center">
                                {loading ? <button type="loading" className="btn btn-primary" disabled>
                                    Resetting
                                </button> :
                                    <button type="submit" className="btn btn-primary">
                                        Reset
                                    </button>}
                            </div>
                        </form>
                        <ToastContainer />
                    </div>
                </div>
            </div>
        </div>

    );
}

export default ResetPassword



