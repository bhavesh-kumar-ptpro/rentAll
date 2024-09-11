import React from "react";
import { connect } from "react-redux";
import styles from "../layouts/newstyle.module.css";
import sidebar1 from "../../images/naija/sidebar-1-img.jpg";
import sidebar2 from "../../images/naija/sidebar-2-img.jpg";
import sidebar3 from "../../images/naija/sidebar-3-img.jpg";
import help_call from "../../images/naija/help_call.jpg";
import ceo from "../../images/naija/ceo1.png";
import director from "../../images/naija/director1.png";
import got_insurance from "../../images/naija/got_insurance.jpg";
import gif from "../../images/naija/970x90_2.gif";
import cx from "classnames";
// import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Card } from 'react-bootstrap';

function AppAbout(props) {
  return (
    // <div></div>
    <Container fluid className={styles["main-container"]}>
      <Row className={cx(styles["main-section"], styles["home-section-1"])}>
        {/* <Col md={2} className="d-none d-md-block"> */}
        {/* <div className={styles["left_section"]}>
      	<div className={styles["sidebar"]}> <img alt="sidebar-2-img" src={sidebar1}/> </div>
        <div className={styles["sidebar"]}> <img alt="sidebar-1-img" src={sidebar2}/> </div>
        <div className={styles["sidebar"]}> <img alt="sidebar-2-img" src={sidebar3}/> </div>
      </div> */}
        {/* </Col> */}

        {/* <Col md={6}>
          <div className="AboutUs mb-4">
            <h1 className="h1 mb-0 pb-4" style={{ color: "#69C16B",borderBottom: "2px solid #b4b0b0"  }}>
              About Us
            </h1>
          </div>
          <Card className="mb-4">
            <Card.Body>
              <div className="d-flex align-items-center mb-4">
                <img
                  src="http://naijamedical.com.ng/images/ceo1.png"
                  alt="Yomi Kukoyi"
                  className="rounded-circle mr-3"
                  style={{ width: "100px", height: "100px" }}
                />
                <div className="flex-grow-1 pl-3" style={{ backgroundColor: "#F5F5F5", borderRadius: "10px" }}>
                  <h4 className="mb-0" style={{ color: "#1374BB" }}>Yomi Kukoyi - Founder, CEO</h4>
                  <h6 className="text-muted" style={{ color: "blue" }}>NaijaMedical.com (ACL Enterprise Support Ltd)</h6>
                </div>
              </div>
              <ul className="list-unstyled">
                <li className="mb-2">Yomi holds a Bsc Hons (Accounting)- 1991, from the Ogun State University, Ago Iwoye and he is an Associate of the Institute of Chartered Accountants of Nigeria - 1995.</li>
                <li className="mb-2">He also holds an MBA in e-business from the Sheffield University Management School, University of Sheffield, UK. (2004)</li>
                <li className="mb-2">Yomi is a Certified SAP Solutions Consultant, he qualified at the SAP Academy in Johannesburg, South Africa - 2006.</li>
                <li className="mb-2">He started his career at KPMG Nigeria and has had 14 years of banking experience (across Zenith Bank, Diamond Bank, UBA, Access Bank and Bank PHB), where he had worked as credit officer, branch manager, Group Head and Product Manager at the various banks.</li>
                <li className="mb-2">He worked with C2G Consulting as an IT/Business Analyst and specialist and Organization change Manager and carried out many various IT and business improvement projects.</li>
                <li className="mb-2">He started ACL Enterprise Support Ltd in 2008 to contribute to the development of Small and medium enterprises in Nigeria. He has been involved in various business improvement projects both locally and in Europe.</li>
                <li className="mb-2">His latest venture is into e-commerce with the establishment of the online shopping site, <a href="http://www.owambe.org" target="_blank" rel="noopener noreferrer">www.owambe.org</a>.</li>
                <li>The latest venture is <a href="http://www.naijamedical.com" target="_blank" rel="noopener noreferrer">www.naijamedical.com</a> and is expected to revolutionize access to medical care in Nigeria.</li>
              </ul>
            </Card.Body>
          </Card>

          <Card className="mb-4">
            <Card.Body>
              <div className="d-flex align-items-center mb-4">
                <img
                  src="http://naijamedical.com.ng/images/director1.png"
                  alt="Yomi Kukoyi"
                  className="rounded-circle mr-3"
                  style={{ width: "100px", height: "100px" }}
                />
                <div className="flex-grow-1 pl-3" style={{ backgroundColor: "#F5F5F5", borderRadius: "10px" }}>
                  <h4 className="mb-0" style={{ color: "#1374BB" }}>Oyindamola Adeniran RN, CCM - Technical Director</h4>
                  <h6 className="text-muted" style={{ color: "blue" }}>NAIJAMEDICAL.COM (ACL Enterprise Support LTD)</h6>
                </div>
              </div>
              <ul className="list-unstyled">
                <li className="mb-2">Damola is a Registered Nurse, Home health at the Calvary Health Group, Houston Texas, USA</li>
                <li className="mb-2">She is an Associate of the Chartered Insurance Institute of Nigeria in 1998</li>
                <li className="mb-2">She also holds a Bachelors in Business Administration, University of Missouri-Kansas City in 2002 and an BSN from the University of Missouri-Kansas City in 2009</li>
                <li className="mb-2">She is a Licensed Practical Nurse from the Penn Valley Community College CCM, Commission for Case Manager Certification</li>
                <li className="mb-2">Damola has been responsible in a clinical care advisory role to assess members for wellness education and disease management;</li>
                <li className="mb-2">Introducing members to utilize the Personal Health Manager Website as a tool for members to better manage their health; educate members regarding wellness and specific conditions;</li>
                <li className="mb-2">Facilitation of the coordination of care for members identified through claims; completion of the HRA; self-referral/ referral from the UM and/or CM departments, or physician referral.</li>
                <li className="mb-2">Utilizing strong listening and interpersonal skills to empathize with patients and family members faced with difficult medical conditions and surgeries.</li>
                <li className="mb-2">Seeking out opportunities to educate patients and families about disease management care in order to facilitate healing and speed return to daily activities.</li>
                <li className="mb-2">Prior to joining the medical line, Damola had a long stint as an business development manager at the Cornerstone Insurance Co Ltd, Nigeria.</li>
              </ul>
            </Card.Body>
          </Card>
        </Col> */}
        <div className={styles["middil_section"]}>
      	{/* <h2 className={styles["mid-title"]} style={{ color: "#00a65a" }}>About Us</h2>  */}
        <div className={styles["admin-blck"]}>
            <div className={styles["admin-title"]}>
                <h4>Yomi Kukoyi <span>- Founder, CEO</span></h4>
                <h5>NAIJAMEDICAL.COM (ACL Enterprise Support LTD)</h5>
            </div>
            <div className={styles["admin-content"]}>
            	<div className={styles["admin-img"]}>
            		<img src={ceo} alt="ceo" />
                </div>
                <div className={styles["about-list"]}>
                    <ul>
                        <li>Yomi holds a Bsc Hons (Accounting)- 1991, from the Ogun State University, Ago Iwoye and he is an Associate of the Institute of Chartered Accountants of Nigeria - 1995.  </li>
                        <li>He also holds an MBA in e-business from the Sheffield University Management School, University of Sheffield, UK. (2004) </li>
                        <li>Yomi is a Certified SAP Solutions Consultant, he qualified at the SAP Academy in Johannesburg, South Africa - 2006.</li>
                        <li>He started his career at KPMG Nigeria and has had 14 years of banking experience (across Zenith Bank, Diamond Bank, UBA, Access Bank and Bank PHB), where he had worked as credit officer, branch manager, Group Head and Product Manager at the various banks.</li>
                		<li>He worked with C2G Consulting as an IT/Business Analyst and specialist and Organization change Manager and carried out many various IT and business improvement  projects.  </li>
                		<li>He started ACL Enterprise Support Ltd in 2008 to contribute to the development of Small and medium enterprises in Nigeria. He has been involved in various business improvement projects both locally and in Europe.</li>
                		<li>His latest venture is into e-commerce with the establishment of the online shopping site, <a href="#">www.owambe.org</a></li>
                		<li>The latest venture is <a href="#">www.naijamedical.com</a> and is expected to revolutionize access to medical care in Nigeria.</li>
                    </ul>
        			</div>
            </div>
        </div>
        
        
        <div className={styles["admin-blck"]}>
            <div className={styles["admin-title"]}>
                <h4>Oyindamola Adeniran RN, CCM - <span>Technical Director</span></h4>
                <h5>NAIJAMEDICAL.COM (ACL Enterprise Support LTD)</h5>
            </div>
            <div className={styles["admin-content"]}>
            	<div className={styles["admin-img"]}>
            		<img src={director} alt="director" />
                </div>
                <div className={styles["about-list"]}>
                    <ul>
                        <li>Damola is a Registered Nurse, Home health at the Calvary Health Group, Houston Texas, USA </li>
                        <li>She is an Associate of the Chartered Insurance Institute of Nigeria in 1998 </li>
                        <li>She also holds a Bachelors in Business Administration, University of Missouri-Kansas City in 2002 and an BSN from the University of Missouri-Kansas City  in 2009</li>
                        <li>She is a Licensed Practical Nurse from the Penn Valley Community College CCM, Commission for Case Manager Certification </li>
                        <li>Damola has been responsible in a clinical care advisory role to assess members for wellness education and disease management;  </li>
                        <li>Introducing members to utilize the Personal Health Manager Website as a tool for members to better manage their health; educate members regarding wellness and specific conditions;</li>
                        <li>Facilitation of the coordination of care for members identified through claims; completion of the HRA; self-referral/ referral from the UM and/or CM departments, or physician referral. </li>
                        <li>Utilizing strong listening and interpersonal skills to empathize with patients and family members faced with difficult medical conditions and surgeries. </li>
                        <li>Seeking out opportunities to educate patients and families about disease management care in order to facilitate healing and speed return to daily activities. </li>
                        <li>Prior to joining the medical line, Damola had a long stint as an business development manager at the Cornerstone Insurance Co Ltd, Nigeria</li>
                    </ul>
                </div>                
            </div>
        </div>
        
        
      </div>

        {/* <div className={styles["right_section"]}>
            <div className={styles["sidebar"]}> <img alt="sidebar-1-img" src={help_call}/> </div>
            <div className={styles["sidebar"]}> <img alt="sidebar-1-img" src={sidebar1}/> </div>
            <div className={styles["sidebar"]}> <img alt="sidebar-2-img" src={sidebar2}/> </div>
            <div className={styles["sidebar"]}> <img alt="sidebar-2-img" src={got_insurance}/> </div>
      </div> */}
      </Row>

      {/* <Row className={styles["advert"]}>
        <Col>
          <div className="text-center">
            <a href="http://www.medicwestafrica.com/" target="_blank">
              <img src={gif} alt="add1" className="img-fluid" />
            </a>
          </div>
        </Col>
      </Row> */}

      <Row className="footer-section">
        <Col className="footer margin-top-15"></Col>
      </Row>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    errorMessage: state.auth.errorMessage,
    successMessage: state.auth.successMessage,
    showLoading: state.auth.showLoading,
  };
};

export default connect(mapStateToProps)(AppAbout);
