import React, { useState } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Card,
  Modal,
} from "react-bootstrap";
import styles from "../layouts/newstyle.module.css";
import gif from "../../images/naija/970x90_2.gif";
import { Link } from "react-router-dom"; // Import NavLink from react-router-dom
import sidebar1 from "../../images/naija/sidebar-1-img.jpg";
import sidebar2 from "../../images/naija/sidebar-2-img.jpg";
import help_call from "../../images/naija/help_call.jpg";
import got_insurance from "../../images/naija/got_insurance.jpg";
import s from "../layouts/newstyle.module.css";
function StatePlan() {
  const [show, setShow] = useState(false);
  const [year, setYear] = useState(2024);
  const [month, setMonth] = useState(1);
  const [day, setDay] = useState(1);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(""); // '' for none, 'married' or 'unmarried'

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const saveDate = () => {
    const formattedDate = `${day}/${month}/${year}`;
    setSelectedDate(formattedDate);
    handleClose();
  };

  const handleSelect = (status) => {
    setSelectedStatus(status);
  };

  return (
    <div>
      <Container>
        <Row className="my-4">
          <Col md={2}>
            <div className={s["sidebar"]}> <img alt="sidebar-2-img" src={got_insurance} /> </div>
            <div className={s["sidebar"]}> <img alt="sidebar-1-img" src={sidebar1} /> </div>
            <div className={s["sidebar"]}> <img alt="sidebar-2-img" src={sidebar2} /> </div>
          </Col>

          <Col md={7}>
            <h3 style={{ color: "#69C16B", fontSize: "35px" }} className="pb-4">
              State Plan
            </h3>

            <Form className="mt-4">
              <Row className="mb-3 mt-4">
                <Form.Group as={Col} md="6" controlId="localGovernment">
                  <div className="relative">
                    <select className="form-select pl-10 pr-8">
                      <option value="">
                        Select Local Government in Nigeria
                      </option>
                     
                    </select>
                  </div>
                </Form.Group>
                <Form.Group as={Col} md="5" controlId="state">
                  <div className="relative">
                    <select className="form-select pl-10 pr-8">
                      <option value="">Select State</option>
                      <option>ABUJA FCT</option>
                      <option>ABIA</option>
                     
                    </select>
                  </div>
                </Form.Group>
              </Row>
              <Row className="mb-3 mt-4">
                <Form.Group as={Col} md="11" controlId="Destination">
                  <Form.Control
                    type="text"
                    placeholder="Enter Your Travel Destination"
                    className="pt-4 pb-4 phone "
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3 mt-4">
                <Form.Group as={Col} md="6" controlId="firstName">
                  <Form.Control
                    type="text"
                    placeholder="First Name"
                    className="pt-4 pb-4 "
                  />
                </Form.Group>
                <Form.Group as={Col} md="5" controlId="lastName">
                  <Form.Control
                    type="text"
                    placeholder="Last Name"
                    className="pt-4 pb-4 "
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3 mt-4">
                <Form.Group as={Col} md="6" controlId="emailAddress">
                  <Form.Control
                    type="email"
                    placeholder="Email Address"
                    className="pt-4 pb-4 "
                  />
                </Form.Group>
                <Form.Group as={Col} md="5" controlId="Married">
                  <div className="d-flex">
                    {/* Married Div */}
                    <div
                      className={`d-flex align-items-center me-2 py-3 px-3 border rounded ${
                        selectedStatus === "married"
                          ? "border-success bg-success text-white"
                          : "border-secondary"
                      }`}
                      style={{
                        cursor: "pointer",
                        borderWidth:
                          selectedStatus === "married" ? "2px" : "1px",
                        backgroundColor:
                          selectedStatus !== "married" ? "#f8f9fa" : "", // Default bg when not selected
                        transition: "background-color 0.3s ease",
                      }}
                      onClick={() => handleSelect("married")}
                      onMouseEnter={(e) => {
                        if (selectedStatus !== "married") {
                          e.target.style.backgroundColor = "#d4edda"; // Light green on hover
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (selectedStatus !== "married") {
                          e.target.style.backgroundColor = "#f8f9fa"; // Revert to default when hover ends
                        }
                      }}
                    >
                      <img
                        style={{ width: "20px" }}
                        src="https://cdn-icons-png.flaticon.com/512/5526/5526318.png"
                        alt="Married"
                        className="me-2"
                      />
                      MARRIED
                    </div>

                    {/* Unmarried Div */}
                    <div
                      className={`d-flex align-items-center py-3 px-3 border rounded ${
                        selectedStatus === "unmarried"
                          ? "border-success bg-success text-white"
                          : "border-secondary"
                      }`}
                      style={{
                        cursor: "pointer",
                        borderWidth:
                          selectedStatus === "unmarried" ? "2px" : "1px",
                        backgroundColor:
                          selectedStatus !== "unmarried" ? "#f8f9fa" : "", // Default bg when not selected
                        transition: "background-color 0.3s ease",
                      }}
                      onClick={() => handleSelect("unmarried")}
                      onMouseEnter={(e) => {
                        if (selectedStatus !== "unmarried") {
                          e.target.style.backgroundColor = "#d4edda"; // Light green on hover
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (selectedStatus !== "unmarried") {
                          e.target.style.backgroundColor = "#f8f9fa"; // Revert to default when hover ends
                        }
                      }}
                    >
                      <img
                        style={{ width: "20px" }}
                        src="https://cdn-icons-png.flaticon.com/512/1320/1320925.png"
                        alt="Unmarried"
                        className="me-2"
                      />
                      UNMARRIED
                    </div>
                  </div>
                </Form.Group>
              </Row>

              <Modal show={show} onHide={handleClose} centered>
                <Modal.Header
                  closeButton
                  style={{ backgroundColor: "#00A651" }}
                >
                  <Modal.Title>Select Date of Birth</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    {/* Year Dropdown */}
                    <Form.Group controlId="year">
                      <Form.Label>Year</Form.Label>
                      <Form.Select
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                      >
                        {[
                          ...Array(new Date().getFullYear() - 1900 + 1).keys(),
                        ].map((y) => {
                          const yearValue = new Date().getFullYear() - y;
                          return (
                            <option key={yearValue} value={yearValue}>
                              {yearValue}
                            </option>
                          );
                        })}
                      </Form.Select>
                    </Form.Group>

                    {/* Month Dropdown */}
                    <Form.Group controlId="month">
                      <Form.Label>Month</Form.Label>
                      <Form.Select
                        value={month}
                        onChange={(e) => setMonth(e.target.value)}
                      >
                        {[
                          "January",
                          "February",
                          "March",
                          "April",
                          "May",
                          "June",
                          "July",
                          "August",
                          "September",
                          "October",
                          "November",
                          "December",
                        ].map((m, index) => (
                          <option key={index + 1} value={index + 1}>
                            {m}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>

                    {/* Day Dropdown */}
                    <Form.Group controlId="day">
                      <Form.Label>Day</Form.Label>
                      <Form.Select
                        value={day}
                        onChange={(e) => setDay(e.target.value)}
                      >
                        {[...Array(31).keys()].map((d) => (
                          <option key={d + 1} value={d + 1}>
                            {d + 1}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="secondary"
                    onClick={handleClose}
                    style={{ backgroundColor: "#9B59B6" }}
                  >
                    Close
                  </Button>
                  <Button variant="success" onClick={saveDate}>
                    Save Date
                  </Button>
                </Modal.Footer>
              </Modal>

              <Row className="mb-3 mt-4">
                <Form.Group as={Col} md="6" controlId="dateOfBirth">
                  <Form.Control
                    type="text"
                    placeholder="DD/MM/YYYY"
                    value={selectedDate}
                    readOnly
                    className="pt-4 pb-4"
                    onClick={handleShow} // Click opens the modal
                  />
                </Form.Group>
                <Form.Group as={Col} md="5" controlId="children">
                  <div className="relative">
                    <select className="form-select pl-10 pr-8">
                      <option value="">No .of Children</option>
                      <option>0</option>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </select>
                  </div>
                </Form.Group>
              </Row>
              <Row>
                <Form.Group as={Col} md="6" controlId="budgetRange">
                  <div className="relative">
                    <select className="form-select pl-10 pr-8">
                      <option value="">Budget Range</option>
                      <option>Below N50,000</option>
                      <option>N50,000 - N75,000</option>
                      <option>N75,000 - N100,000</option>
                      <option>N100,000 - N150,000</option>
                      <option>Above N150,000</option>
                    </select>
                  </div>
                </Form.Group>
                <Form.Group as={Col} md="5" controlId="preExistingConditions">
                  <div className="relative">
                    <select className="form-select pl-10 pr-8">
                      <option value="">Pre-Existing Conditions</option>
                      <option>Hypertention</option>
                      <option>Diabetes</option>
                      <option>HIV</option>
                      <option>Sickle Cell Anaemia</option>
                    </select>
                  </div>
                </Form.Group>
              </Row>
              <Row className="mb-3 mt-4">
                <Form.Group as={Col} md="6" controlId="age">
                  <Form.Control
                    type="number"
                    placeholder="Your Age"
                    className="pt-4 pb-4 "
                  />
                </Form.Group>
              </Row>

              <Col md={12} className="d-flex justify-content-center mt-4 mb-4">
                <Link to="/hospitalsearch">
                  {" "}
                  <Button
                    variant="Success"
                    className="btn-lg btn btn-success"
                    type="submit"
                  >
                    Submit
                  </Button>
                </Link>
              </Col>
            </Form>
          </Col>

          <Col md={2}>
          <div className={s["sidebar"]}> <img alt="sidebar-2-img" src={got_insurance} /> </div>
            <div className={s["sidebar"]}> <img alt="sidebar-1-img" src={sidebar1} /> </div>
            <div className={s["sidebar"]}> <img alt="sidebar-2-img" src={sidebar2} /> </div>
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

export default StatePlan;
