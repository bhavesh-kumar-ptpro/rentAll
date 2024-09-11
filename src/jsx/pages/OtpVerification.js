import axios from 'axios';
import React, { useState, useRef } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";

const OtpVerification = () => {
    const [otp, setOtp] = useState(Array(6).fill(''));
    const inputRefs = useRef([]);
    const [loading, setLoading] = useState(false);
    const { email } = useParams()
    const navigate = useNavigate()
    const handleInputChange = (e, index) => {
        const { value } = e.target;

        // Allow only numeric values
        if (/^\d*$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            // Move to the next input if a digit is entered
            if (value.length === 1 && index < 5) {
                inputRefs.current[index + 1].focus();
            }

            // Move to the previous input if backspace is pressed and current input is empty
            if (value.length === 0 && index > 0) {
                inputRefs.current[index - 1].focus();
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        const otpValue = otp.join('');

        if (otpValue.length === 0) {
            toast.warn("❗ Please enter 6 digits code", {
                position: "top-right",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setLoading(false)
        } else if (otpValue.length < 6) {
            toast.warn(`❗ Code is incomplete, please enter complete code`, {
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
            let params = {
                "email": email,
                "verify_otp": otpValue
            }
            try {
                const { data } = await axios.post('http://localhost:3000/api/user/verifyOtp', params);
                console.log('OTP:', data);
                if (data.status === 200) {
                    toast.success("🎉 OTP verified successfully")
                    setTimeout(async () => {
                        navigate(`/login`);
                    }, 2000);
                }
            } catch (error) {
                toast.error(`❗ ${error}`);
                setLoading(false)
            }
        }

        console.log('OTP Entered:', otpValue);
        console.log('OTP Length:', otpValue.length);
    };

    return (
        <div className="authincation h-100 p-meddle mt-10">
            <div className="container h-100 mb-3">
                <div className="row justify-content-center align-items-center" style={{ height: "620px" }}>
                    <div className="col-md-6">
                        <div className="authincation-content mb-3">
                            <div className="row no-gutters">
                                <div className="col-xl-12">
                                    <div className="auth-form">
                                        <div className="mb-4 text-centre">
                                            <h3 style={{ textAlign: "center", fontSize: "x-large" }}>Enter Verification Code</h3>
                                        </div>
                                        <Form onSubmit={handleSubmit}>
                                            <Form.Group>
                                                <Row>
                                                    {otp.map((digit, index) => (
                                                        <Col key={index}>
                                                            <Form.Control
                                                                type="text"
                                                                maxLength="1"
                                                                ref={(el) => inputRefs.current[index] = el}
                                                                value={digit}
                                                                onChange={(e) => handleInputChange(e, index)}
                                                                className="text-center"
                                                                style={{ border: "1px solid #e3e3e3" }}
                                                            />
                                                        </Col>
                                                    ))}
                                                </Row>
                                            </Form.Group>
                                            <br />
                                            <Button disabled={loading} variant="primary" type="submit" style={{ fontWeight: "100" }}>
                                            {loading ? "...loading" :   "Verify Code"}
                                            </Button>
                                        </Form>
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
};

export default OtpVerification;
