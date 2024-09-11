import React, { useEffect, useRef, useState } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Card,
  Table,
} from "react-bootstrap";
import styles from "../layouts/newstyle.module.css";
import gif from "../../images/naija/970x90_2.gif";
import { Link, useParams } from "react-router-dom"; // Import NavLink from react-router-dom
import axios from "axios";
import { API_URL } from "../../apiconfig";
import got_insurance from "../../images/naija/got_insurance.jpg";
import sidebar1 from "../../images/naija/sidebar-1-img.jpg";
import sidebar2 from "../../images/naija/sidebar-2-img.jpg";
import help_call from "../../images/naija/help_call.jpg";
function HospitalSearch() {
  const { hospital_type, local_govt, state } = useParams();
  const activePag = useRef(0);
  let paggination = [];
  let jobData = [];
  const [searchData, setSearchData] = useState([]);
  const [sort, setSort] = useState(10)
  useEffect(async () => {
    const { data } = await axios.post(`${API_URL}/api/hospital/find`, { hospital_type: hospital_type, local_govt: local_govt, state: state })
    console.log("formData", data.data);
    setSearchData(data.data)
  }, [hospital_type, local_govt, state])

  paggination = Array(Math.ceil(searchData.length / sort))
    .fill()
    .map((_, i) => i + 1);
  jobData = searchData.slice(
    activePag.current * sort,
    (activePag.current + 1) * sort
  )
  const onClick = (i) => {
    activePag.current = i;

    jobData = searchData.slice(
      activePag.current * sort,
      (activePag.current + 1) * sort
    );
    /* setdemo(
      data.profileTable.data.slice(
        activePag.current * sort,
        (activePag.current + 1) * sort
      )
    ); */
  };
  console.log("paggination",paggination);
  
  return (
    <div>
      <Container>
        <Row className="my-4">
          <Col md={2}>
          <div className={styles["sidebar"]}> <img alt="got_insurance" src={got_insurance} /> </div>
          <div className={styles["sidebar"]}> <img alt="got_insurance" src={sidebar1} /> </div>
          <div className={styles["sidebar"]}> <img alt="got_insurance" src={sidebar2} /> </div>
          </Col>
          <Col md={7}>
            <h2 style={{ color: "#69C16B" }} className="pb-3">Hospital Search</h2>
           {searchData.length == 0 ? <p>
              0 result found
            </p> : <p>
              Here are the <span style={{ color: "#1174BA" }}>{searchData.length}</span>{" "}
              Hospitals :
            </p>}
            <Table style={{ fontSize: "1rem" }} hover>
              <thead>
                <tr style={{ borderBottom: "2px solid #5898CB" }}>
                  <th style={{ backgroundColor: "#F5F5F5" }}>HOSPITAL NAME</th>
                  <th style={{ backgroundColor: "#F5F5F5" }}>LOCATION</th>
                  <th style={{ backgroundColor: "#F5F5F5" }}>CONTACTS</th>
                </tr>
              </thead>
              <tbody>
                {/* <tr>
                  <td style={{ color: "#69C16B" }}>Blue Cross Hospital</td>
                  <td>
                    <strong>Street: </strong> 48, Jaiye Road
                    <br />
                    <strong>City:</strong> Ogba
                    <br />
                    <strong>Local Government Area: </strong> Ikeja
                    <br />
                    <strong>State:</strong> Lagos
                  </td>
                  <td>Cell: 080 3406 5604</td>
                </tr> */}
                {searchData&& jobData.map((hospital) => {
                  return (
                    <tr key={hospital.id}>
                      <td style={{ color: "#69C16B" }}>{hospital.hospital_name} </td>
                      <td>
                        {/* <strong>Street: </strong> 48, Jaiye Road */}
                        <br />
                        <strong>City:</strong> {hospital.city}
                        <br />
                        <strong>Local Government Area: </strong> {hospital.local_govt}
                        <br />
                        <strong>State:</strong> {hospital.state}
                      </td>
                      <td>Cell: {hospital.phone}</td>
                    </tr>
                  )
                })}
                {searchData.length == 0 ? <tr>
                  <td><h3>NO DATA FOUND </h3> </td>
                </tr> : ""}

              </tbody>
            </Table>
            <div id="example_wrapper" className="dataTables_wrapper"><div className="d-sm-flex text-center justify-content-between align-items-center mt-3">
              <div className="dataTables_info">
                Showing {activePag.current * sort + 1} to{" "}
                {searchData.length > (activePag.current + 1) * sort
                  ? (activePag.current + 1) * sort
                  : searchData.length}{" "}
                of {searchData.length} entries
              </div>
              <div
                className="dataTables_paginate paging_simple_numbers"
                id="example5_paginate"
              >
                <Link
                  className="paginate_button previous disabled"
                  to="/search-hospital/:hospital_type/:local_govt/:state"
                  onClick={() =>
                    activePag.current > 0 && onClick(activePag.current - 1)
                  }
                  style={{display:paggination.length <= 10 ? "none":""}}
                >
                  <i className="fa fa-angle-double-left" aria-hidden="true"></i>
                </Link>
                <span>
                  {paggination.map((number, i) => (
                    <Link
                      key={i}
                      to="/search-hospital/:hospital_type/:local_govt/:state"
                      className={`paginate_button  ${activePag.current === i ? "current" : ""
                        } `}
                      onClick={() => onClick(i)}
                      style={{display:paggination.length <= 10 ? "none":""}}
                    >
                      {number}
                    </Link>
                  ))}
                </span>
                <Link
                  className="paginate_button next"
                  to="/search-hospital/:hospital_type/:local_govt/:state"
                  onClick={() =>
                    activePag.current + 1 < paggination.length &&
                    onClick(activePag.current + 1)
                  }
                  style={{display:paggination.length <= 10 ? "none":""}}
                >
                  <i className="fa fa-angle-double-right" aria-hidden="true"></i>
                </Link>
              </div>
            </div>

            </div>
            <div
              className="text-center w-100"
              style={{ backgroundColor: "#F5F5F5" }}
            >
              {/* <button
                className="w-100 btn "
                style={{
                  borderBottom: "1px solid #5898CB",
                  textDecoration: "underline",
                }}
              >
                Show More
              </button> */}
            </div>
          </Col>

          <Col md={2}>
            <div className={styles["sidebar"]}> <img alt="help_call" src={help_call} /> </div>
            <div className={styles["sidebar"]}> <img alt="sidebar-1-img" src={sidebar1} /> </div>
            <div className={styles["sidebar"]}> <img alt="sidebar-2-img" src={sidebar2} /> </div>
          </Col>
        </Row>

        <Row>
          <Col>
            <div className={styles["advert"]}>
              <div className={styles["container"]}>
                <div className={styles["row"]}>
                  <a
                    href="http://www.medicwestafrica.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={gif}
                      alt="Advertisement"
                      className={styles["advert-img"]}
                    />
                  </a>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default HospitalSearch;
