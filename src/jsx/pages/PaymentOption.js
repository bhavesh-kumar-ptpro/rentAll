import React, { useEffect, useState } from "react";
import styles from "../layouts/newstyle.module.css";
import gif from "../../images/naija/970x90_2.gif";
import cx from "classnames";
import { connect } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { NavLink, useParams } from "react-router-dom"; // Import NavLink from react-router-dom
import { InterswitchPay } from "react-interswitch";
import axios from "axios";
import { API_URL } from "../../apiconfig";
import { ToastContainer, toast } from "react-toastify";
import sidebar1 from "../../images/naija/sidebar-1-img.jpg";
import sidebar2 from "../../images/naija/sidebar-2-img.jpg";
import clear_logo from "../../images/naija/clear_logo.jpg";
import got_insurance from "../../images/naija/got_insurance.jpg";
import norton_img from "../../images/naija/norton_img.jpg";
function PaymentOption(props) {
  const [transactionID, setTransactionID] = useState('')
  const [amount, setAmount] = useState(0)
  const [paymentAmount, setPaymentAmount] = useState(0)
  const [yearlyCost, setYearlyCost] = useState(0);
  const { id,planType } = useParams();
  const currentDate = new Date().toISOString().split('T')[0];
  const [logo_url, setLogoUrl] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [wallet, setWallet] = useState(0)
  const [amountToPay, setAmountToPay] = useState(0)
  const [interswitchAmount, setInterswitchAmount] = useState(0)
  const [walletBalance, setWalletBalance] = useState(0)
  const [isChecked, setIsChecked] = useState(false);
  const getHmoLogo = async () => {
    if(planType == "Corporate"){
      const { data } =await axios.get(`${API_URL}/api/indivual_plan_master/searchId/${id}/${planType}`)
      console.log("mor",data);
      setLogoUrl(data && data.data.logo_url)
      setCompanyName(data.data.hospital);
      setYearlyCost(data && data.data.yearly_cost)
      setPaymentAmount(data.data && data.data.yearly_cost)
    }else{
      const { data } =await axios.get(`${API_URL}/api/indivual_plan_master/searchId/${id}/${planType}`)
      console.log("mor",data);
      
      setLogoUrl(data && data.data.logo_url)
      setCompanyName(data.data.company_name);
      setYearlyCost(data && data.data.yearly_cost)
      setPaymentAmount(data.data && data.data.yearly_cost)
    }
  }

  const getWalletAmount = async () => {
    // setLoading(true)
    const { data } = await axios.post(`${API_URL}/api/user/findAll`, { UserId: props.userId })
    console.log(data);

    setWallet(data.wallet_amount);
    // setWallet(data);
  }


  useEffect(async () => {
    getHmoLogo()
    getWalletAmount()
    // const { data } = await axios.get(`${API_URL}/api/indivual_plan_master/searchId/${id}/`)
    // console.log("userAmount", data);
    // setPaymentAmount(data.data && data.data.yearly_cost)

    // setAmountToPay(data.data && data.data.yearly_cost)
      const PaymentAmountToBeSet = async () => {
    if (wallet >= paymentAmount && isChecked) {
      setInterswitchAmount(0)
      setWalletBalance(wallet-paymentAmount)
    } else if (wallet < paymentAmount && isChecked) {

      setInterswitchAmount(paymentAmount - wallet)
      setWalletBalance(wallet)
    } else if (wallet === 0) {

      setInterswitchAmount(paymentAmount)
    }
  }
    PaymentAmountToBeSet()
    // setYearlyCost(data && data.data.yearly_cost)
  }, [wallet, paymentAmount,isChecked])
  

  const param = {
    merchantCode: "VNA",
    payItemID: "103",
    customerEmail: 'bhavesh.kumar@paperbirdtech.com',
    redirectURL: `https://naijainsurance.paperbirdtech.com/user/paymentconfirm/${transactionID}`,
    text: "Make Payments",
    mode: "TEST",
    transactionReference: Date.now().toString(),
    amount: interswitchAmount * 100,
    style: {
      width: "fit-content",
      height: "40px",
      border: "none",
      color: "#fff",
      padding: "10px",
      borderRadius: "12px",
      backgroundColor: "#00a65a",
      marginLeft: '20px'
    },
    callback: async (response) => {
      if (response.apprAmt) {
        let interswitchData = {
          "userId": props.userId,
          "planId": id,
          "transactionId": response.txnref,
          "amount": (response.apprAmt / 100),
          "paymentMethod": "interswitch",
          "currency": "NGN"
        }
        // setTransactionAmount((response.apprAmt && response.apprAmt / 100).toFixed(2));
        setTransactionID(response.txnref);
        const interswitcEntry = await axios.post(`${API_URL}/api/planstransactions`, interswitchData)
        console.log("interswitcEntry", interswitcEntry);
        const { data } = await axios.put(`${API_URL}/api/user/${props.userId}`, { wallet_amount: wallet - walletBalance })
        if (interswitcEntry.data.data && interswitcEntry.data.data.id) {
          toast.success(`Payment Successfull`, {
            position: "top-right",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });

          window.location = `/user/paymentconfirm/${id}/${response.txnref}/${planType}`
        }

        // console.log("setTransactionAmount",(response.apprAmt/100).toFixed(2))
        // console.log("setTransactionAmount",response)
        // addInterswitchPayment(response.apprAmt,response.txnref)
      } else {
        return
      }
      // console.log("response: ", response.apprAmt);

    }
  }

  // const addInterswitchPayment = async (responceAmount,responceTrxnId) => {
  //   if (responceAmount) {
  //     let interswitchData = {
  //       "userId": "2",
  //       "transactionId":responceTrxnId,
  //       "amount": responceAmount/100,
  //       "paymentMethod": "interswitch",
  //       "currency": "NGN"
  //     }
  //      await axios.post(`${API_URL}/api/E_Wallet`, interswitchData)
  //     window.location = `/user/paymentconfirm/${responceTrxnId}`
  //   }

  // }
  const handleWalletPayment = async () => {
    try {
      const { data } = await axios.put(`${API_URL}/api/user/${props.userId}`, { wallet_amount: walletBalance })
      if (data.UserId) {
        let interswitchData = {
          "userId": props.userId,
          "planId": id,
          "transactionId": Math.random().toString(36) + Date.now().toString(36),
          "amount": paymentAmount,
          "paymentMethod": "Wallet",
          "currency": "NGN"
        }
        // setTransactionAmount((response.apprAmt && response.apprAmt / 100).toFixed(2));
        const { data } = await axios.post(`${API_URL}/api/planstransactions`, interswitchData)
        if (data.status == 200) {
          toast.success(`Payment Successfull`, {
            position: "top-right",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });

          // window.location = `/`
          window.location = `/user/paymentconfirm/${id}/${Math.random().toString(36) + Date.now().toString(36)}`
        }
        console.log("interswitcEntry", data)
      }
    } catch (error) {

    }


  }
  console.log("interswitchAmount", interswitchAmount)
  console.log("walletBalance", walletBalance)
  console.log("wallet", wallet)
  return (
    <div>
      <Container fluid className={styles["main-container"]}>
        <Row className={cx(styles["main-section"], styles["home-section-1"])}>
          <div className="col-md-2 ">
            <div className="card ">
              <div
                className="card-header text-white"
                style={{ backgroundColor: "#69C16B" }}
              >
                Application Summary
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <img
                    src={`${API_URL}/public/image/Company_Logo/` + logo_url}
                    alt="Clearline Logo"
                  />
                  <p style={{ marginTop: "1rem", color: "#7e7e7e" }}> <strong>{companyName}</strong> </p>
                </div>
                <div className="mb-3">
                  <strong>Total: ₦{yearlyCost}/year</strong>
                  <p>Estimated Cost (No charge until approved)</p>
                </div>
                <div className="mb-3">
                  <p>Members applying: 1</p>
                  <p>Requested start date:{currentDate}</p>
                </div>
                <div className="mb-4">
                  <img
                    src={norton_img}
                    alt="Norton Secured Logo"
                  />
                  <p>ABOUT SSL CERTIFICATES</p>
                </div>
                <div className="mb-3">
                  <h5>Need Help?</h5>
                  <button className="btn btn-link">
                    Click to Talk, We'll call you
                  </button>
                  <p>OR Call on 0123-4567890</p>
                  <p>
                    Mon - Fri, 5AM - 9PM PT
                    <br />
                    Sat - Sun, 7AM - 4PM PT
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Col md={6}>
            <div className="container-sm mt-2">
              <h3 className="pb-2" style={{ color: "#69C16B", fontSize: "40px" }}>
                Buy Plan
              </h3>
              <div className="d-flex flex-column md:gap-1">
                <ul className={`nav nav-tabs ${styles["custom-nav"]}`}>
                  <li className="nav-item flex-fill">
                    <NavLink
                      className={({ isActive }) =>
                        isActive
                          ? `nav-link active ${styles["custom-active"]} text-center bg-primary pt-3 pb-3`
                          : "nav-link text-center pt-3 pb-3 bg-secondary"
                      }
                      to={`/user/buyplan/${id}`}
                      onClick={(e) => {
                        e.preventDefault(); // Prevent the link from being followed
                      }}
                    >
                      Initial Information
                    </NavLink>
                  </li>
                  <li className="nav-item flex-fill">
                    <NavLink
                      className={({ isActive }) =>
                        isActive
                          ? `nav-link active ${styles["custom-active"]} text-center bg-primary pt-3 pb-3`
                          : "nav-link text-center pt-3 pb-3 bg-secondary md:ml-1 md:mr-1"
                      }
                      to={`/user/paymentoption/${id}`}
                    >
                      Payment Options
                    </NavLink>
                  </li>
                  <li className="nav-item flex-fill ">
                    <NavLink
                      aria-disabled
                      className={({ isActive }) =>
                        isActive
                          ? `nav-link active ${styles["custom-active"]} text-center bg-primary pt-3 pb-3`
                          : "nav-link text-center pt-3 pb-3 bg-secondary"
                      }
                      to={`/user/paymentconfirm/${id}/123456`}
                      onClick={(e) => {
                        e.preventDefault(); // Prevent the link from being followed
                      }}
                    >
                      Payment Confirmation
                    </NavLink>
                  </li>
                </ul>
              </div>

              <div className="container mt-4">
                <h2 className="pb-3 text-primary border-bottom ">
                  Make Payment <i class="ri-bank-card-line"></i>
                </h2>

                <div>Available wallet amount: <span>₦<strong>{wallet}</strong> </span></div>
              </div>
              <Col>
                <div className="form-group mt-3">
                  <label htmlFor="nameOnCard">Amount to pay</label>
                  <input
                    name="amount"
                    type="text"
                    className="form-control mb-4"
                    placeholder="amount"
                    value={"₦" + paymentAmount}
                    onChange={(e) => setAmount(e.target.value.replace(/\D/g, ''))}
                    disabled
                    required
                    style={{ cursor: "not-allowed" }}
                  />
                  {wallet !== 0 && (<div>
                    <label style={{ fontWeight: "100", marginBottom: "10px" }}>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={(e) => setIsChecked(e.target.checked)}
                      />
                      {" "}  Pay with wallet! Amount will be deducted from your wallet
                    </label>
                  </div>)

                  }
                  {interswitchAmount !== 0 && <InterswitchPay {...param} />}
                </div>
              </Col>
            </div>
            {interswitchAmount == 0 && <Button style={{
              width: "fit-content",
              height: "40px",
              border: "none",
              color: "#fff",
              padding: "10px",
              borderRadius: "12px",
              backgroundColor: "#00a65a",
              marginLeft: '20px'
            }}
              onClick={handleWalletPayment}
            >Make Payment</Button>}
          </Col>


          <Col md={2} className="d-none d-md-block">
            <Card className="mb-4">
              <Card.Img
                variant="top"
                src={got_insurance}
                alt="Placeholder image"
              />
            </Card>
            <Card className="mb-4">
              <Card.Img
                variant="top"
                src={sidebar1}
                alt="Placeholder image"
              />
            </Card>
            <Card className="mb-4">
              <Card.Img
                variant="top"
                src={sidebar2}
                alt="Placeholder image"
              />
            </Card>
          </Col>
        </Row>

        <Col className={styles["advert"]}>

          <Col>
            <div className="text-center">
              <a
                href="http://www.medicwestafrica.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={gif} alt="add1" className="img-fluid" />
              </a>
            </div>
          </Col>
        </Col>
        <ToastContainer />
        <Row className="footer-section">
          <Col className="footer margin-top-15"></Col>
        </Row>
      </Container>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    userId: state.auth.auth.UserId,
  };
};
// export default PaymentOption;
export default connect(mapStateToProps)(PaymentOption);
