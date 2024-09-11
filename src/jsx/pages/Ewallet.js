import React, { Fragment, useState, useRef, useEffect } from "react";
import { connect, useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
	paypalPayment
} from '../../store/actions/Payment/paypal';
import base64 from 'base-64';
import { InterswitchPay } from "react-interswitch";
import Stripe from "stripe";
import { Nav, Tab } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { API_URL } from "../../apiconfig";
const Ewallet = (props) => {
	const { search } = useLocation();
	const params = new URLSearchParams(search);
	const sessionId = params.get('id');
	// console.log("session_id", process.env.STRIPE_SECRET_ID);
	const [wallet, setWallet] = useState(0)
	const [loading, setLoading] = useState(false)
	const [formData, setFormData] = useState({
		amount: '',
		email:""
	});
	const [transactionID, setTransactionID] = useState('')
	const [transactionAmount, setTransactionAmount] = useState(0)
	const dispatch = useDispatch();
	const navigate = useNavigate();
	useEffect(async() => {
		// getId()
		getWalletAmount()
		if(transactionAmount){
			addInterswitchPayment()
		}
	}, [wallet,transactionAmount])
	const addInterswitchPayment = async ()=>{
		setLoading(true)
		if(transactionAmount > 0){
			let interswitchData = {
				"userId": props.userId,
				"transactionId": transactionID,
				"amount": transactionAmount,
				"paymentMethod": "interswitch",
				"currency": "NGN"
			}
			const stripeEntry = await axios.post(`${API_URL}/api/E_Wallet`, interswitchData)
			setLoading(true)
			 window.location = `https://naijainsurance.paperbirdtech.com/user/e-wallet`
		}
		
	}
	  const param  = {
		merchantCode: "VNA",
		payItemID: "103",
		customerEmail: 'bhavesh.kumar@paperbirdtech.com',
		redirectURL: "https://naijainsurance.paperbirdtech.com/e-wallet",
		text: "Pay with Interswitch",
		mode: "TEST",
		transactionReference: Date.now().toString(),
		amount: `${(formData.amount)*100}`,
		style: {
			width: "fit-content",
			height: "40px",
			border: "none",
			color: "#fff",
			padding:"10px",
			borderRadius:"12px",
			backgroundColor: "#00a65a",
			marginLeft:'20px'
		},
		callback: (response) => {
			if(formData.amount){
				setTransactionAmount((response.apprAmt && response.apprAmt/100).toFixed(2));
				setTransactionID(response.txnref);
				response.apprAmt &&  addInterswitchPayment()
			}else{
				return
			}
		//   console.log("response: ", response.apprAmt);

		}
	  }

	const getWalletAmount = async () => {
		setLoading(true)
		const { data } = await axios.post(`${API_URL}/api/user/findAll` ,{UserId:props.userId})
		if(data.wallet_amount !== null || data.wallet_amount !== undefined){
			setWallet(data.wallet_amount);
		}
		setLoading(false)
		// setWallet(data);
	}
	// const getId = async () => {
	// 	if (sessionId) {
	// 		const stripe = new Stripe('sk_test_51OcN1bSBagUy9FTJ8VjAdf8nXiqaLY89ZQV4Up8CNvujHMrLFfV7kcDpPMakEHit9qyGwAmyO7SfsAvy98yjKN0W00Pbcv539f', {
	// 			apiVersion: "2022-11-15",
	// 		});
	// 		const session = await stripe.checkout.sessions.retrieve(sessionId);
	// 		// console.log("session", session);
	// 		let stripeData = {
	// 			"userId": "2",
	// 			"transactionId": session.payment_intent,
	// 			"amount": (session.amount_total / 100).toFixed(2),
	// 			"paymentMethod": "stripe",
	// 			"currency": "NGN"
	// 		}
	// 		const stripeEntry = await axios.post(`${API_URL}/api/E_Wallet`, stripeData)
	// 		// console.log("stripeEntry", stripeEntry);
	// 		getWalletAmount()
	// 		window.location = `https://naijainsurance.paperbirdtech.com`
	// 		// if (session.payment_status == 'paid' || session.status == 'complete') {
	// 		// 	amptyField()
	// 		// 	// navigate('/e-wallet');
	// 		// 	window.location = `http://localhost:3000/e-wallet`
	// 		// 	console.log("payment success");
	// 		// }
	// 		// console.log("session",);
	// 	} else {
	// 		// console.log("no session id");
	// 	}
	// }
	const handleChange = (e) => {
		const { name, value } = e.target;

		setFormData({
			...formData,
			amount: value.replace(/\D/g, '')
		});
		// console.log("value", value);
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (formData.amount > 0) {
			dispatch(paypalPayment(formData.amount, navigate));
		} else {
			toast.error("Please enter a valid amount");
		}
	}
	const handleStripePayment = async () => {

		const stripe = new Stripe("sk_test_51OcN1bSBagUy9FTJ8VjAdf8nXiqaLY89ZQV4Up8CNvujHMrLFfV7kcDpPMakEHit9qyGwAmyO7SfsAvy98yjKN0W00Pbcv539f", {
			apiVersion: "2022-11-15",
		});
		if (formData.amount > 0) {
			const session = await stripe.checkout.sessions.create({
				payment_method_types: ["card"],
				line_items: [{
					price_data: {
						currency: 'ngn',
						product_data: {
							name: "Xpro"
						},
						unit_amount: Number(formData.amount) * 100

					},
					quantity: 1
				}],
				mode: "payment",
				success_url: "https://naijainsurance.paperbirdtech.com/e-wallet/?id={CHECKOUT_SESSION_ID}",
				cancel_url: "https://naijainsurance.paperbirdtech.com/e-wallet",
			})
			if (session.url) {
				// navigate(session.url);
				window.location = session.url
			}
		} else {
			toast.error("Please enter a valid amount");
		}


	}

	// console.log("transactionAmount",transactionAmount);
	return (
		<div >
			<div className="card" style={{ marginLeft: "250px", marginTop: "50px", marginRight: "250px" }}>
				<div className="card-header">
					<h4 className="card-title">E-Wallet</h4>
				</div>

				<div className="card-body">

					<div className="row" style={{ marginBottom: "50px" }}>
						<div className="d-flex align-items-center">
							<div className="order-user" >
								<i className="far fa-building bg-warning text-white"></i>
							</div>
							<div className="ms-4 customer">
								<h2 className="mb-0  font-w600" style={{ color: "black" }}>{loading ? "Loading amount..." : '₦' + wallet }</h2>

								<p className="mb-0  font-w500">Wallet Amount</p>
							</div>
						</div>
					</div>

					<div className="row">
					</div>
					<div className="basic-form">

						<form onSubmit={handleSubmit}>
							<div className="mb-3 row">
								<label className="col-sm-3 col-form-label">Please enter amount</label>
								<div className="col-sm-9">
									<input
										name="amount"
										type="text"
										className="form-control"
										placeholder="amount"
										value={formData.amount}
										onChange={handleChange}
										required

									/>
								</div>
							</div>
							{/* <div className="mb-3 row">
							{formData.amount && parseFloat(formData.amount) > 0 &&	<div className="col-sm-10">
									<button type="submit" className="btn btn-primary">
										Pay With Paypal
									</button>
								</div>}
							</div> */}
						</form>
						<div className="mb-3 row">
						{/* {formData.amount && parseFloat(formData.amount) > 0 &&	<div className="col-sm-10">
								<button onClick={handleStripePayment} className="btn btn-primary">
									Pay with Stripe
								</button>
							</div>} */}
					
						</div>
			
						{formData.amount && parseFloat(formData.amount) > 0 &&
        <InterswitchPay {...param} />
    }
					</div>

					<ToastContainer />
				</div>
			</div>
		</div>
	);
};
const mapStateToProps = (state) => {
	return {
	  userId: state.auth.auth.UserId,
	};
  };
  // export default PaymentOption;
  export default connect(mapStateToProps)(Ewallet);
