import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import styles from "../layouts/newstyle.module.css";
import gif from "../../images/naija/970x90_2.gif";
import { Link } from "react-router-dom"; // Import NavLink from react-router-dom
import { API_URL } from "../../apiconfig";
import axios from "axios";
import got_insurance from "../../images/naija/got_insurance.jpg";
import sidebar1 from "../../images/naija/sidebar-1-img.jpg";
import sidebar2 from "../../images/naija/sidebar-2-img.jpg";
import { ToastContainer, toast } from "react-toastify";
function FindHospital() {

  const [state, setState] = useState([]);
  const [city, setCity] = useState([]);
  const [selectState, setSelectState] = useState('');
  const [formData, setFormData] = useState({
    hospital_type: '',
    state: '',
    local_govt: '',
    email: '',
    phone: '',
    city: '',
  });
  const [error, setError] = useState("");
  const [phone, setPhoneNumber] = useState("");
  useEffect(async () => {
    const { data } = await axios.get(`${API_URL}/api/hospital/state`)
    setState(data.data)
  }, []);
  const handleStateChange = async (e) => {
    const { name, value } = e.target
    let selectedState;
    if (value) {
       selectedState = state.filter((el) => { return el.state == value })
      setSelectState(selectedState[0].state)
      setFormData({ ...formData, state: selectedState[0].state })
    }
    const { data } = await axios.get(`${API_URL}/api/hospital/city/${selectedState[0].id}`)
    setCity(data.data)

  }
  const handleSubmit = async (e) => {
    e.preventDefault()
 
    const {hospital_type,local_govt,state} = formData
    toast.success(`Succusessfully submited`, {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    // const { data } = await axios.post(`${API_URL}/api/hospital/find`,{hospital_type:"",local_govt:"",state:state})
    window.location = `/user/search-hospital/${hospital_type}/${local_govt}/${state}`

  }

  const handleChange = async (e) => {
    const { name, value } = e.target;
    if (name === 'phone') {
    let  formattedValue = value.replace(/\D/g, ''); // Replace non-digits
      setFormData({
        ...formData,
        [name]: formattedValue
      });
    }
    setFormData({
      ...formData,
      [name]: value
    });

  }
  const handlePhoneChange = (e) => {
    const value = e.target.value;

    if (/[^0-9]/.test(value)) {
      setError('Please enter valid number');
    } else {
      setError('');
    }
    setPhoneNumber(value.replace(/\D/g, ''));
    setFormData({ ...formData, phone: value.replace(/\D/g, '') })
  };
  const handleBlur = () => {
    if (formData.phone.length > 0 && formData.phone.length !== 10) {
      setError('Phone number must be 10 digits.');
    }
  };
  
  return (
    <div>
      <Container>
        <Row className="my-4">
          <Col md={2}>
            {/* <Card className="mb-4">
              <Card.Img
                variant="top"
                src={got_insurance}
                alt="got_insurance image"
              />
            </Card> */}
            <div className={styles["sidebar"]}> <img alt="got_insurance" src={got_insurance} /> </div>
            <div className={styles["sidebar"]}> <img alt="sidebar-2-img" src={sidebar2} /> </div>
            <div className={styles["sidebar"]}> <img alt="sidebar-1-img" src={sidebar1} /> </div>
          </Col>

          <Col md={7}>
            <h3 style={{ color: "#69C16B", fontSize: "35px" }} className="pb-4">
              Find A Hospital
            </h3>

            <Form className="mt-4" onSubmit={handleSubmit}>
              <Row className="mb-3 mt-4">
                <Form.Group as={Col} md="6" controlId="hospital_type">

                  <div className="relative">
                    <select className="form-select pl-10 pr-8" required onChange={handleChange} name="hospital_type" value={formData.hospital_type}>
                      <option value="">Type of Hospital</option>
                      <option value="Eye Hospital">Eye Hospital</option>
                      <option value="General Hospital">General Hospital</option>
                      <option value="Specialized Hospital">Specialized Hospital</option>
                      <option value="Dental Hospital">Dental Hospital</option>
                      <option value="Maternity Hospital">Maternity Hospital</option>
                    </select>
                  </div>
                </Form.Group>
                {/* <Form.Group as={Col} md="5" controlId="city">

                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Enter city"
                      className="form-control pl-10 pt-4 pb-4"
                      name="city"
                      onChange={handleChange}
                      value={formData.city}
                    />
                  </div>
                </Form.Group> */}
              </Row>
              <Row className="mb-3 mt-4">
                
                <Form.Group as={Col} md="6" controlId="state">
                  <div className="relative">
                    <select className="form-select pl-10 pr-8" name="state" required value={formData.state} onChange={(e) => handleStateChange(e)}>
                      <option value="">Select State</option>
                      {state && state.map((el) => {
                        return <option value={el.state} key={el.id} id="state"  >{el.state}</option>
                      })}
                    </select>
                  </div>
                </Form.Group>
                <Form.Group as={Col} md="5" controlId="localGovernment">
                  <div className="relative">
                    <select className="form-select pl-10 pr-8" required name="local_govt" value={formData.local_govt}
                      onChange={handleChange}>
                      <option value={""}>Select local goverment</option>
                      {city ? city.map((el, i) => {
                        return (
                          <option value={el.city} key={i}>{el.city}</option>
                        )
                      }) : <option value={""}>Select local goverment</option>
                      }

                    </select>
                  </div>
                </Form.Group>
              </Row>
              {/* <Row className="mb-3 mt-4">
                <Form.Group as={Col} md="6" controlId="phone">

                  <Form.Control
                    type="text"
                    placeholder="Enter phone number"
                    className="pt-4 pb-4 phone"
                    name="phone"
                    value={(formData.phone).replace(/\D/g, '')}
                    onChange={handlePhoneChange}
                    minLength={10}
                    maxLength={10}
                    onBlur={handleBlur}
                  />
                       {error && <div style={{ color: 'red' }}>{error}</div>}
                </Form.Group>
                <Form.Group as={Col} md="5" controlId="email">

                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    className="pt-4 pb-4"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Row> */}
              <Col md={12} className="d-flex justify-content-center mt-4 mb-4">
                {/* <Link to='/hospitalsearch'> */}
                 <Button variant="primary" className="btn-lg btn" type="submit">
                  Find A Hospital
                </Button>
                {/* </Link> */}
              </Col>
            </Form>
          </Col>

          <Col md={2}>
          <div className={styles["sidebar"]}> <img alt="got_insurance" src={got_insurance} /> </div>
            <div className={styles["sidebar"]}> <img alt="sidebar-2-img" src={sidebar2} /> </div>
            <div className={styles["sidebar"]}> <img alt="sidebar-1-img" src={sidebar1} /> </div>
          </Col>
        </Row>
        <ToastContainer />
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

export default FindHospital;
