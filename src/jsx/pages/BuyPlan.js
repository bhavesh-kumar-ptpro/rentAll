import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import styles from '../layouts/newstyle.module.css';
import gif from '../../images/naija/970x90_2.gif';
import cx from 'classnames';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';
import calenderDayFill from "../../icons/bootstrap-icons/icons/calendar-month.svg"
import gotInsurance from "../../images/naija/got_insurance.jpg"
// function CustomDatePicker() {
import sidebar1 from "../../images/naija/sidebar-1-img.jpg"
import sidebar2 from "../../images/naija/sidebar-2-img.jpg"
import clear_logo from "../../images/naija/clear_logo.jpg"

//   return (

//   );
// }
import { useParams } from "react-router-dom";
import axios from 'axios';
import { API_URL } from '../../apiconfig';
import { toast, ToastContainer } from 'react-toastify';
import norton_img from "../../images/naija/norton_img.jpg";

function BuyPlan() {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const { id ,planType} = useParams();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(1);
  const [selectedDay, setSelectedDay] = useState(1);
  const [date, setDate] = useState('');
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [phone, setPhoneNumber] = useState("");
  const [zip, setZipCode] = useState("");
  const [error, setError] = useState("");
  const [zipError, setZipError] = useState("");
  const [yearlyCost, setYearlyCost] = useState(0);
  const [pricing, setPricing] = useState(0);
  const [logo_url, setLogoUrl] = useState('');
  const [formData, setFormData] = useState({
    planId: id,
    first_name: "",
    last_name: "",
    gender: "",
    dob: date,
    marriage_status: "",
    street: "",
    country: "",
    zip: "",
    state: "",
    local_govt: "",
    email: "",
    phone: ""
  });
  const [companyName, setCompanyName] = useState('');

  console.log(formData);
  useEffect(async () => {
    // const { data } = await axios.get(`${API_URL}/api/Planpolicy_mapping_master/Search/${id}`)
    // console.log("userAmount", data);
 
    getHmoLogo()
  }, [])
  const getHmoLogo = async () => {
    if(planType == "Corporate"){
      const { data } =await axios.get(`${API_URL}/api/indivual_plan_master/searchId/${id}/${planType}`)
      console.log("mor",data);
      setLogoUrl(data && data.data.logo_url)
      setCompanyName(data.data.hospital);
      setYearlyCost(data && data.data.yearly_cost)
    }else{
      const { data } =await axios.get(`${API_URL}/api/indivual_plan_master/searchId/${id}/${planType}`)
      console.log("mor",data);
      
      setLogoUrl(data && data.data.logo_url)
      setCompanyName(data.data.company_name);
      setYearlyCost(data && data.data.yearly_cost)
    }
    
    // console.log("data", data);

  }
  const currentDate = new Date().toISOString().split('T')[0];
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
    updateDate(event.target.value, selectedMonth, selectedDay);
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
    updateDate(selectedYear, event.target.value, selectedDay);
  };

  const handleDayChange = (event) => {
    setSelectedDay(event.target.value);
    updateDate(selectedYear, selectedMonth, event.target.value);
  };

  const updateDate = (year, month, day) => {
    if (year && month && day) {
      const formattedDate = new Date(year, month - 1, day).toLocaleDateString('en-GB');
      setFormData({ ...formData, dob: formattedDate });
    }
  };
  const handleZipChange = (e) => {
    const value = e.target.value;

    if (/[^0-9]/.test(value)) {
      setZipError('Please enter zipcode');
    } else {
      setZipError('');
    }
    setZipCode(value.replace(/\D/g, ''));
    setFormData({ ...formData, zip: value.replace(/\D/g, '') })
  };
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
    if (phone.length > 0 && phone.length !== 10) {
      setError('Phone number must be 10 digits.');
    }
  };
  const handleZipBlur = () => {
    if (zip.length > 0 && zip.length !== 4) {
      setZipError('zipcode must be 4 digits.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'phone') {
      formattedValue = value.replace(/\D/g, ''); // Replace non-digits
    }

    setFormData({
      ...formData,
      [name]: formattedValue, // Update the state with the formatted value
    });
  };
  const amptyField = (val) => {
    toast.info(`❗${val} Field is Empty`, {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    setLoading(false)
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    if (formData.first_name == "" || !formData.first_name) {
      amptyField("First name")
    } else if (formData.last_name == "" || !formData.last_name) {
      amptyField("Last name")
    } else if (formData.marriage_status == "" || !formData.marriage_status) {
      amptyField("Marrital status")
    } else if (formData.gender == "" || !formData.gender) {
      amptyField("Gender");
      setLoading(false)
    } else if (formData.dob == "" || !formData.dob) {
      amptyField("Date of Birth");
      setLoading(false)
    } else if (formData.street == "" || !formData.street) {
      amptyField("Street");
      setLoading(false)
    } else if (formData.local_govt == "" || !formData.local_govt) {
      amptyField("City");
      setLoading(false)
    } else if (formData.state == "" || !formData.state) {
      amptyField("State");
      setLoading(false)
    }
    else if (formData.country == "" || !formData.country) {
      amptyField("Country");
      setLoading(false)
    } else if (formData.zip == "" || !formData.zip) {
      amptyField("Zip code");
      setLoading(false)
    } else if (formData.email == "" || !formData.email) {
      amptyField("Email");
      setLoading(false)
    } else if (formData.phone == "" || !formData.phone) {
      amptyField("Phone number");
      setLoading(false)
    } else {
      try {
        const { data } = await axios.post(`${API_URL}/api/initialInformation`, formData)
        if (data.status == 200) {
          toast.success(`Submitted ${data.message}`, {
            position: "top-right",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setLoading(false)

          window.location = `/user/paymentoption/${id}/${planType}`
        }

      } catch (error) {
        setLoading(false)
        toast.error(`${error}`, {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }

  }

  return (
    <div>
      <div className="form-group">
        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header closeButton className='bg-primary'>
            <Modal.Title>Select Date of Birth<i class="ri-calendar-2-line text-white"></i></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="form-group">
              <label>Year</label>
              <select value={selectedYear} onChange={handleYearChange} className="form-control">
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Month</label>
              <select value={selectedMonth} onChange={handleMonthChange} className="form-control">
                {months.map(month => (
                  <option key={month} value={month}>{month}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Day</label>
              <select value={selectedDay} onChange={handleDayChange} className="form-control">
                {days.map(day => (
                  <option key={day} value={day}>{day}</option>
                ))}
              </select>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Date
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <Container fluid className={styles['main-container']}>
        <Row className={cx(styles['main-section'], styles['home-section-1'])}>
          <div className="col-md-2 ">
            <div className="card ">
              <div
                className="card-header text-white"
                style={{ backgroundColor: '#69C16B' }}
              >
                Application Summary
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <img
                     src={`${API_URL}/public/image/Company_Logo/`+logo_url}
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
              <h3 className="pb-2" style={{ color: '#69C16B', fontSize: '40px' }}>
                Buy Plan
              </h3>
              <div className="d-flex flex-column md:gap-1">
                <ul className={`nav nav-tabs ${styles['custom-nav']}`}>
                  <li className="nav-item flex-fill">
                    <NavLink
                      className={({ isActive }) =>
                        isActive
                          ? `nav-link active ${styles['custom-active']} text-center bg-primary pt-3 pb-3`
                          : 'nav-link text-center pt-3 pb-3 bg-secondary'
                      }
                      to={`/user/buyplan/${id}`}
                    >
                      Initial Information
                    </NavLink>
                  </li>
                  <li className="nav-item flex-fill">
                    <NavLink
                      className={({ isActive }) =>
                        isActive
                          ? `nav-link active ${styles['custom-active']} text-center bg-primary pt-3 pb-3`
                          : 'nav-link text-center pt-3 pb-3 bg-secondary md:ml-1 md:mr-1'
                      }
                      to={`/user/paymentoption/${id}`}
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
                          ? `nav-link active ${styles['custom-active']} text-center bg-primary pt-3 pb-3`
                          : 'nav-link text-center pt-3 pb-3 bg-secondary'
                      }
                      to="/user/paymentconfirm/123456"
                      onClick={(e) => {
                        e.preventDefault(); // Prevent the link from being followed
                      }}
                    >
                      Payment Confirmation
                    </NavLink>
                  </li>
                </ul>
              </div>

              <form className="mt-4" onSubmit={handleSubmit}>
                <div className="form-group">
                  <h4 className={styles['section-header']}>
                    Primary Applicant Information <i className="ri-information-line"></i>
                  </h4>
                  <div className="row">
                    <div className="col-md-5">

                      <input
                        type="text"
                        name='first_name'
                        className="form-control"
                        placeholder="First Name"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-3">
                      <select onChange={handleChange} name="marriage_status" className="form-control form-control" placeholder="Marrital status">
                        <option value="">Marrital status</option>
                        <option value="Married">Married</option>
                        <option value="Single">Single</option>
                      </select>
                    </div>
                    <div className="col-md-3">

                      <select onChange={handleChange} name="gender" className="form-control form-control" placeholder="Gender">
                        <option>Gender</option>
                        <option>Male</option>
                        <option>Female</option>
                      </select>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-5">

                      <input
                        type="text"
                        name="last_name"
                        className="form-control"
                        placeholder="Last Name"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-5">
                      {/* <CustomDatePicker /> */}
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="DD/MM/YYYY"
                          value={formData.dob}
                          readOnly
                          onClick={handleShow} // Show the modal on input click
                        />
                        <div className="input-group-append">
                          <span
                            className="input-group-text"
                            style={{ cursor: 'pointer' }} // Change cursor to pointer
                            onClick={handleShow} // Show the modal on icon click
                          >
                            <img src={calenderDayFill} alt="calenderDayFill" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                <div className="form-group mt-4">
                  <h4 className={styles['section-header']}>
                    Address Information <i className="ri-information-line"></i>
                  </h4>
                  <p>
                    Home Address (P.O. Box is not acceptable - please provide
                    place of residence)
                  </p>
                  <div className="row">
                    <div className="col-md-6">

                      <input
                        type="text"
                        className="form-control"
                        placeholder="Street"
                        name='street'
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-5">

                      <input
                        type="text"
                        name='local_govt'
                        className="form-control"
                        placeholder="City"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-4">

                      <input
                        type="text"
                        className="form-control"
                        placeholder="State"
                        name='state'
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-4">

                      <input
                        type="text"
                        className="form-control"
                        placeholder="Country"
                        name='country'
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-3">

                      <input
                        type="text"
                        className="form-control"
                        placeholder="Zip"
                        name='zip'
                        value={formData.zip}
                        onChange={handleZipChange}
                        maxLength={4}
                        minLength={4}
                        onBlur={handleZipBlur}
                      />
                      {zipError && <div style={{ color: 'red' }}>{zipError}</div>}
                    </div>
                  </div>
                </div>

                {/* <div className="form-group mt-4">
                  <label>
                    * Is the Mailing Address different from your Home Address?
                  </label>
                  <div>
                    <button type="button" className="btn btn-primary mr-2">
                      Yes
                    </button>
                    <button type="button" className="btn btn-secondary">
                      No
                    </button>
                  </div>
                </div> */}

                {/* New Contact Information Fields */}
                <div className="form-group mt-4">
                  <h4 className={styles['section-header']}>
                    Contact Information <i className="ri-contacts-line"></i>
                  </h4>
                  <div className="row">
                    <div className="col-md-6">

                      <input
                        type="email"
                        className="form-control"
                        placeholder="Enter email"
                        name='email'
                        onChange={handleChange}
                        value={formData.email}
                      />
                    </div>
                    <div className="col-md-3">

                      <input
                        type="tel"
                        className="form-control"
                        placeholder="Enter phone"
                        name='phone'
                        value={formData.phone}
                        onChange={handlePhoneChange}

                        maxLength={10}
                        minLength={10}
                        onBlur={handleBlur}
                      // onChange={handleChange}
                      />
                      {error && <div style={{ color: 'red' }}>{error}</div>}
                    </div>
                    {/* <div className="col-md-4">
                      
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter street"
                        required
                      />
                    </div> */}
                  </div>
                </div>
                {/* End of New Contact Information Fields */}
                <div className="d-flex justify-content-between mt-4 mb-4">
                  <button type="button" className="btn btn-lg btn-secondary">
                    Back
                  </button>
                  {/* <NavLink to="/user/paymentoption/"> */}
                  <button type='submit' className="btn btn-lg btn-primary" disabled={loading}>
                    {loading ? "Loading..." : "Continue"}
                  </button>
                  {/* </NavLink> */}
                </div>
              </form>
            </div>
          </Col>
          <Col md={2} className="d-none d-md-block">
            <Card className="mb-4">
              <Card.Img
                variant="top"
                src={gotInsurance}
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
        <ToastContainer />
        <Row className={styles['advert']}>
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

export default BuyPlan;
