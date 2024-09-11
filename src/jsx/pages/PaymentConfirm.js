import React, { useEffect, useState } from "react";
import styles from "./newstyle.module.css";
import gif from "../../images/naija/970x90_2.gif";
import cx from "classnames";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Card } from "react-bootstrap";
import { NavLink, useParams } from "react-router-dom"; // Import NavLink from react-router-dom
import sidebar1 from "../../images/naija/sidebar-1-img.jpg";
import sidebar2 from "../../images/naija/sidebar-2-img.jpg";
import clear_logo from "../../images/naija/clear_logo.jpg";
import got_insurance from "../../images/naija/got_insurance.jpg";
import norton_img from "../../images/naija/norton_img.jpg";
import { API_URL } from "../../apiconfig";
import axios from "axios";
import { connect } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
function PaymentConfirm(props) {
  const { id,planType,planId } = useParams();
  const [loading, setLoading] = useState(false)
  const [logo_url, setLogoUrl] = useState('');
  const [yearlyCost, setYearlyCost] = useState(0);
  const [companyName, setCompanyName] = useState('');

  const getHmoLogo = async () => {
    if(planType == "Corporate"){
      const { data } =await axios.get(`${API_URL}/api/indivual_plan_master/searchId/${planId}/${planType}`)
      console.log("mor",data);
      setLogoUrl(data && data.data.logo_url)
      setCompanyName(data.data.hospital);
      setYearlyCost(data && data.data.yearly_cost)
    }else{
      const { data } =await axios.get(`${API_URL}/api/indivual_plan_master/searchId/${planId}/${planType}`)
      console.log("mor",data);
      
      setLogoUrl(data && data.data.logo_url)
      setCompanyName(data.data.company_name);
      setYearlyCost(data && data.data.yearly_cost)
    }

  }
  const currentDate = new Date().toISOString().split('T')[0];
  useEffect(async () => {
    getHmoLogo()
    // const { data } = await axios.get(`${API_URL}/api/indivual_plan_master/searchId/${planId}/${planType}`)
    // setYearlyCost(data && data.data.yearly_cost)
  }, [])
  const handlePdfDownload = async () => {
    setLoading(true)
    let pdfParams = {
      "id": planId,
      "userId": props.userId
    }
    try {
      setLoading(true)
      const { data } = await axios.post(`${API_URL}/api/Planpolicy_mapping_master/pdf`, pdfParams)
      if (data.path) {
        toast.success(`Please wait...`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        setTimeout(() => {
          window.location = `${API_URL}${data.path}`
        }, 4000);

      }

      console.log("pdfPath", data);
      setLoading(false)
    } catch (error) {
      toast.error(`${error}`, {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setLoading(false)
    }

  }
  console.log('dididd', planId);

  return (
    <div>
      <Container fluid className={styles["main-container"]}>
        <Row className={cx(styles["main-section"], styles["home-section-1"])}>
          <div className="col-md-2 ">
            <div className="card">
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
                   <p style={{marginTop:"1rem",color:"#7e7e7e"}}> <strong>{companyName}</strong> </p>
                </div>
                <div className="mb-3">
                  <strong>Total: ₦{yearlyCost}/year</strong>
                  <p>Estimated Cost (No charge until approved)</p>
                </div>
                <div className="mb-3">
                  <p>Members applying: 1</p>
                  <p>Requested start date: {currentDate}</p>
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
                      to={`/user/buyplan/${planId}`}
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
                      to={`/user/paymentoption/${planId}`}
                      onClick={(e) => {
                        e.preventDefault(); // Prevent the link from being followed
                      }}
                    >
                      Payment Options
                    </NavLink>
                  </li>
                  <li className="nav-item flex-fill">
                    <NavLink
                      className={({ isActive }) =>
                        isActive
                          ? `nav-link active ${styles["custom-active"]} text-center bg-primary pt-3 pb-3`
                          : "nav-link text-center pt-3 pb-3 bg-secondary"
                      }
                      to={`/user/paymentconfirm/${planId}/${id}`}
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
                <h2
                  className="pb-2 text-primary"
                  style={{ borderBottom: "1px solid #D3D3D3" }} // Add a border-bottom style
                >
                  Payment Confirmation 
                </h2>
                <div className="text-center mt-4">
                  <p style={{ fontSize: "1.25rem" }}>
                    Your Payment is Successfully Processed.
                  </p>
                  <p style={{ fontSize: "1.25rem" }}>
                    Your Order Reference ID is: <strong>{id ? id : "...Fetching"}</strong>
                  </p>
                  <p style={{ fontSize: "1.25rem" }}>
                    Please Click below to view your Enrollment Details
                  </p>
                  <div className="mt-4 mb-4">
                    <button className="btn btn-lg  btn-primary" onClick={handlePdfDownload}>
                      Click Here!
                    </button>
                  </div>
                </div>
              </div>
            </div>
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

        <Row className={styles["advert"]}>
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
        </Row>

        <Row className="footer-section">
          <Col className="footer margin-top-15"></Col>
        </Row>
      </Container>
      <ToastContainer />
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    // userData: "rahul",
    userId: state.auth.auth.UserId,
  };
};
export default connect(mapStateToProps)(PaymentConfirm);
