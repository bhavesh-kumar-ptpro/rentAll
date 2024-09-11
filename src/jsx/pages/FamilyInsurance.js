import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link, NavLink, useParams } from "react-router-dom"; // Import NavLink from react-router-dom
import styles from "./newstyle.module.css";
import gif from "../../images/naija/970x90_2.gif";
import cx from "classnames";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { API_URL } from "../../apiconfig";
import norton_img from "../../images/naija/norton_img.jpg";
import got_insurance from "../../images/naija/got_insurance.jpg";
import sidebar1 from "../../images/naija/sidebar-1-img.jpg";
import sidebar2 from "../../images/naija/sidebar-2-img.jpg";
import help_call from "../../images/naija/help_call.jpg";
import clear_logo from "../../images/naija/clear_logo.jpg";

function FamilyInsurance() {
  const { id } = useParams();
  let addClass = 'ql-editor frontend';
  const [searchdata, setsearchdata] = useState({});
  const [showDetails, setShowDetails] = useState(false);
const planType = "Individual & Family"
  const getHospitals = async () => {
    let { data } = await axios.get(`${API_URL}/api/Planpolicy_mapping_master/search/${id}`)
    setsearchdata(data.data)
  }
  useEffect(async () => {
    getHospitals()
  }, [])
  //   useEffect(() => {
  //     getHmoData()
  // }, []);
  // const getHmoData = async () => {
  //     const { data } = await axios.get(`${API_URL}/api/Planpolicy_mapping_master/${id}`)
  //     setsearchdata(data)
  // }
  console.log(searchdata);

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
                Cart Summary
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <p className="text-primary" style={{ fontSize: "11.5px" }}>
                    Family Health Insurance Plan{" "}
                  </p>
                </div>
                <div className="mb-3" style={{ fontSize: "20px" }}>
                  <strong>
                    Total: <span className="text-primary">₦{searchdata.yearly_cost}/yr</span>
                  </strong>
                  <p style={{ fontSize: "11.5px" }}>
                    Estimated Cost If Approved
                  </p>
                </div>
                <div className="mb-3">
                  <Link to={`/user/shoppingcar/${id}/${planType}`}>
                    <button className="btn btn-primary btn-lg ">
                      Apply Now
                    </button>
                  </Link>
                </div>
                <div className="mb-4">
                  <img
                    src={norton_img}
                    alt="Norton Secured Logo"
                  />
                  <p>ABOUT SSL CERTIFICATES</p>
                </div>
                <div className="mb-3">
                  <h5 className="text-center">Need Help?</h5>
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
            <div className=" p-3 ">
              <h2
                className="pb-2"
                style={{ color: "#69C16B", fontSize: "35px" }}
              >
                Plan Details
              </h2>
              <div
                className="d-flex align-items-center justify-content-start gap-2 p-2 mt-3"
                style={{
                  backgroundColor: "#F5F5F5",
                  borderBottom: "2px solid #1388CF",
                }}
              >
                <img
                  src={clear_logo}
                  alt="Clearline Logo"
                  style={{ maxHeight: "40px" }}
                />
                <h4
                  className="mb-0 px-4"
                  style={{ color: "#1388CF", fontSize: "25px" }}
                >
                  {searchdata.policy_name} Plan
                </h4>
              </div>

              <h5 className="text-primary mt-3">
                ₦{searchdata.yearly_cost}{" "}
                <span className="text-black" style={{ fontSize: "12px" }}>
                  per year
                </span>
              </h5>
              <p className="text-muted mt-4">
                *Annual commitment required. Monthly payment option available
              </p>

              <ul className="nav nav-tabs w-100">
                <li className="nav-item flex-grow-1">
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "nav-link text-center active"
                        : "nav-link text-center"
                    }
                    to={`/user/familyinsurance/${id}`}
                    exact
                  >
                    Plan Details
                  </NavLink>
                </li>
                <li className="nav-item flex-grow-1">
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "nav-link text-center active"
                        : "nav-link text-center"
                    }
                    to={`/user/noticedisclaimer/${id}`}
                    exact
                  >
                    Notices & Disclaimers
                  </NavLink>
                </li>
                <li className="nav-item flex-grow-1">
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "nav-link text-center active"
                        : "nav-link text-center"
                    }
                    to={`/user/familyvideo/${id}`}
                    exact
                  >
                    Videos
                  </NavLink>
                </li>
              </ul>

              <div className="tab-content mt-3">
                <div className="tab-pane fade show active" id="plan-details">
                  <table className="table">
                    <thead>
                      <tr>
                        <td className="bg-light">Plan Type</td>
                        <td className="bg-light">Family Health Plan</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Coinsurance</td>
                        <td>₦{searchdata.coinsurance}</td>
                      </tr>
                      <tr>
                        <td>Deductible</td>
                        <td>{searchdata.deductible}</td>
                      </tr>
                      <tr>
                        <td>Annual Out-of-Pocket Limit</td>
                        <td>{searchdata.annual_out_of_pocket_limit}</td>
                      </tr>
                      <tr>
                        <td>Annual Maximum Benefit</td>
                        <td>{searchdata.annual_maximum_benefit}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              {showDetails && (
                <div className={addClass}
                  dangerouslySetInnerHTML={{ __html: searchdata.showMoreDeatils }}></div>
              )}

              <button
                className="btn btn-primary mt-2 "
                onClick={() => setShowDetails(!showDetails)}
              >
                {showDetails ? "Hide Details" : "Show More Details"}
              </button>
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
            <Card className="mb-4">
              <Card.Img
                variant="top"
                src={help_call}
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
    </div>
  );
}

export default FamilyInsurance;
