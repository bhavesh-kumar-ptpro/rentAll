import React, { Fragment, useEffect, useRef, useState } from "react";
// import styles
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';
import swal from 'sweetalert';
import AdminPageTitle from "../../AdminPageTitle/AdminPageTitle";

import axios from "axios";
import {
  Row,
  Col,
  Card,
  Table,
  Button,
} from "react-bootstrap";
import { GlobalFilter } from '../../../components/table/FilteringTable/GlobalFilter';
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import avatar3 from "../../../../images/1.jpg";
import { API_URL } from "../../../../apiconfig";
import resetImage from "../../../../icons/bootstrap-icons/reset.png"
const resetButton = { width: "fit-content", marginLeft: "10px", marginTop: "10px", border: "1px solid #ddddde", borderRadius: '5px', color: "gray", background: "transparent" }
const filterStyle = { width: "fit-content", marginLeft: "8px", marginTop: "10px" }
const ViewHospitals = () => {
  const navigate = useNavigate();
  // let sort = 10;
  const activePag = useRef(0);
  let paggination = [];
  let jobData = [];
  const [sort, setSort] = useState(10)
  const [hospitalData, setHospitalData] = useState([])
  const [state, setState] = useState([])
  const [city, setCity] = useState([])
  const [selectedState, setSelectedState] = useState('')
  const [selectedCity, setSelectedCity] = useState("")
  const handleDelete = async (id) => {

    // let resp = await axios.delete(`http://localhost:3000/api/hospital/delete/${id}`)
    // console.log("response",resp);

    swal({
      title: "Are you sure?",
      text:
        "Once deleted, you will not be able to recover this record!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          const response = await axios.delete(`${API_URL}/api/hospital/delete/${id}`);
          console.log('Response data:', response.data);
          toast.success(`${response.data.message}`)
          getHospitals()
          return response.data;
        } catch (error) {
          console.error('Error message:', error.message);
          throw error;
        }
      }
    })
  }

  const handleStatus = async (id, currentStatus) => {
    const updateState = currentStatus === 0 ? `${API_URL}/api/hospital/active/${id}` : `${API_URL}/api/hospital/inactive/${id}`;
    const newStatus = currentStatus === 0 ? 1 : 0;
    try {
      const response = await axios.patch(updateState);
      console.log('Response data:', response.data)

      setHospitalData(prevData =>
        prevData.map(hospital =>
          hospital.id === id ? { ...hospital, active: newStatus } : hospital
        )
      );
    } catch (error) {
      console.error('Error updating status:', error.message);
    }
  };

  const getHospitals = async () => {
    let { data } = await axios.get(`${API_URL}/api/hospital`)
    console.log(data)
    setHospitalData(data)
  }
  const getStates = async () => {
    const { data } = await axios.get(`${API_URL}/api/hospital/state`)
    setState(data.data)
  }
  useEffect(async () => {
    getStates()
    getHospitals()
  }, [])

  paggination = Array(Math.ceil(hospitalData.length / sort))
    .fill()
    .map((_, i) => i + 1);
  jobData = hospitalData.slice(
    activePag.current * sort,
    (activePag.current + 1) * sort
  )
  const onClick = (i) => {
    activePag.current = i;

    jobData = hospitalData.slice(
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
  const handleChange = (e) => {
    console.log(e.target.value)
    setSort(e.target.value)
  }
  const handleHospitalName = async (e) => {
    if (e.target.value != "" || e.target.value != null || e.target.value != undefined) {

      try {
        const { data } = await axios.post(`${API_URL}/api/hospital/sortOrder`, { sortOrder: e.target.value })
        // console.log(data,"handleHospitalName");
        setHospitalData(data.data)
      } catch (error) {
        toast.error(`${error}`)
      }
    } else {
      getHospitals()
    }
    // console.log("handleHospitalName", e.target.value)
  }
  const handleHospitalType = async (e) => {
    if (e.target.value != "") {
      try {
        const { data } = await axios.post(`${API_URL}/api/hospital/find`, {
          "hospital_type": e.target.value,
          "local_govt": "",
          "state": ""
        })
        // console.log("data",data);

        setHospitalData(data.data)
      } catch (error) {
        toast.error(`${error}`)
      }
    } else {
      getHospitals()
    }

    // console.log("handleHospitalName", e.target.value)
  }
  // const handleStateChange = async (e) => {
  //   console.log("handleStateChange", e.target.value);
  //   setSelectedState(e.target.value)
  //   if (e.target.value != "") {
  //     let selectedStateId = state.filter((el) => { return el.name == e.target.value })

  //     // setSelectedState(selectedState[0].id)
  //     console.log("selectedStateId", selectedStateId);

  //     setSelectedState(e.target.value)
  //     // const { data } = await axios.get(`${API_URL}/api/hospital/city/${selectedState}`)
  //     // console.log(data);

  //     // setCity(data.data)
  //     try {
  //       const { data } = await axios.post(`${API_URL}/api/hospital/find`, {
  //         "hospital_type": "",
  //         "local_govt": selectedCity,
  //         "state": e.target.value
  //       })
  //       console.log("state data", data);
  //       setHospitalData(data.data)

  //     } catch (error) {

  //     }
  //   }else{
  //     getHospitals()
  //   }
  // }
  const handleStateChange = async (e) => {
    console.log("handleStateChange", e.target.value);
    setSelectedState(e.target.value);
    if (e.target.value != "") {
      const selectedStateId = state.find((el) => el.state === e.target.value);
      console.log("selectedStateId", selectedStateId);
      const { data } = await axios.get(`${API_URL}/api/hospital/city/${selectedStateId.id}`)
      setCity(data.data)
      try {
        const { data } = await axios.post(`${API_URL}/api/hospital/find`, {
          "hospital_type": "",
          "local_govt": selectedCity,
          "state": e.target.value
        });
        console.log("state data", data);
        setHospitalData(data.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    } else {
      getHospitals();
    }
  };
  const handleSearch = async (e) => {
    const searchTerm = e.target.value.toLowerCase();
    if (searchTerm !== "") {
      try {

        const filteredData = hospitalData.filter(item => item.hospital_name.toLowerCase().includes(searchTerm) || item.local_govt.toLowerCase().includes(searchTerm));

        console.log("Filtered Data", filteredData);

        setHospitalData(filteredData);

      } catch (error) {
        console.error("Error fetching data", error);
      }
    } else {
      getHospitals()
    }

  };
  const handleCityChange = async (e) => {
    if (e.target.value != "") {
      try {
        const { data } = await axios.post(`${API_URL}/api/hospital/find`, {
          "hospital_type": "",
          "local_govt": e.target.value,
          "state": ""
        })
        console.log("data", data);

        setHospitalData(data.data)
      } catch (error) {
        toast.error(`${error}`)
      }
    } else {
      getHospitals()
    }
  }
  // const handleReset = async () => {
  //   setSort(10);
  //   setSelectedState('');
  //   setSelectedCity('');
  //   handleHospitalName("")
  //   handleHospitalType("")
  //   getStates()
  //   setCity([]);
  //   getHospitals();
  // };
  const handleReset = async () => {
    // Reset state values to their initial state
    setSort(10);
    setSelectedState('');
    setSelectedCity('');

    // Fetch the original data without any filters
    await getHospitals();

    // Clear the city list
    setCity([]);

    // Optionally, reset any input fields or filters
    document.querySelector("input[name='address']").value = ""; // Reset the search input field
    document.querySelector("select[name='state']").value = "";  // Reset the state select field
    document.querySelector("select[name='local_govt']").value = "";  // Reset the city select field
    // document.querySelector("select[name='hospital_type']").value = ""; // Reset the hospital type select field
  };

  return (
    <Fragment>
      <AdminPageTitle activePage="Hospital Management" pageName="View Hospital" />


      <Col lg={12}>
        <Card>
          <Card.Header>
            <Card.Title>Hospital Details</Card.Title>
          </Card.Header>
          <div className="row">
            <label className="col-sm-3 col-form-label" style={filterStyle}>Sort by</label>
            <select
              className="form-control form-control-sm"
              onChange={(e) => handleChange(e)}
              style={{ width: "fit-content", marginLeft: "20px", marginTop: "10px" }}

            >
              <option value={10}>Entry per page</option>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
            </select>
            <select
              className="form-control form-control-sm"
              onChange={handleHospitalName}
              style={filterStyle}

            >
              <option value={""}>Hospital name</option>
              <option value={"ASC"}>A-Z</option>
              <option value={"DESC"}>Z-A</option>
            </select>
            <select
              className="form-control form-control-sm"
              onChange={handleHospitalType}
              style={filterStyle}

            >
              <option value={""}>Hospital type</option>
              <option value={"Eye Hospital"}>Eye Hospital</option>
              <option value={"General Hospital"}>General Hospital</option>
              <option value={"Specialist Hospital"}>Specialist Hospital</option>
              <option value={"Dental Hospital"}>Dental Hospital</option>
              <option value={"Meternity Hospital"}>Meternity Hospital</option>
            </select>
            <input
              type="text"
              name="address"
              className="form-control form-control-sm"
              placeholder="Search"
              style={filterStyle}
              onChange={handleSearch}

            />
            <select
              //   defaultValue={formData.type_of_hospital}
              className="form-control form-control-sm"
              name="state"
              onChange={(e) => handleStateChange(e)}
              style={filterStyle}
            >
              <option value={""}>State</option>
              {state && state.map((el) => {
                return <option value={el.state} key={el.id} id="mySelect"  >{el.state}</option>
              })}
            </select>
            <select
              //   defaultValue={'Select local govt type'}
              className="form-control form-control-sm"
              name="local_govt"
              onChange={handleCityChange}
              style={filterStyle}

            >
              <option value={""}>City</option>
              {city && city.map((el, i) => {
                return (
                  <option value={el.city} key={i}>{el.city}</option>
                )
              })
              }

            </select>
            <button style={resetButton} onClick={handleReset}> Reset </button>
          </div>
          <Card.Body>
            <Table responsive>
              <thead>
                <tr>
                  <td>
                    <strong>
                      Hospital Name
                    </strong>
                  </td>

                  <td>
                    <strong>
                      Local Government
                    </strong>
                  </td>
                  <td>
                    <strong>
                      State
                    </strong>
                  </td>
                  <td>

                    <strong>
                      Band
                    </strong>
                  </td>
                  <td>

                    <strong>
                      Type of Hospital
                    </strong>
                  </td>
                  <td>

                    <strong>
                      Phone
                    </strong>
                  </td>
                  <td>
                    <strong>
                      Email
                    </strong>

                  </td>
                  <td>

                    <strong>
                      Action
                    </strong>
                  </td>
                  <td>

                    <strong>
                      Status
                    </strong>
                  </td>
                </tr>
              </thead>

              <tbody>
                {/* {userData && userData.length > 0 && jobData.map((user, i) => { */}
                {hospitalData && jobData.map((el) => {
                  return (
                    <tr key={el.id}>
                      <td>{el.hospital_name}</td>
                      <td>{el.local_govt}</td>
                      <td>{el.state}</td>
                      <td>{el.hospital_band}</td>
                      <td>{el.type_of_hospital}</td>
                      <td>{el.phone}</td>
                      <td>{el.email}</td>
                      <td>
                        <div className="d-flex">
                          <Link
                            // href={`/add-hmo/${user.id}`}
                            to={`/admin/view/EditHospital/${el.id}`}
                            className="btn btn-primary shadow btn-xs sharp me-1"
                          >
                            <i className="fas fa-pen"></i>
                          </Link>
                          <Link
                            onClick={() => handleDelete(el.id)}
                            className="btn btn-danger shadow btn-xs sharp"
                          >
                            <i className="fa fa-trash"></i>
                          </Link>
                        </div>
                      </td>
                      <td>
                        <div>
                          {el.active === 1 ?
                            <button
                              onClick={() => handleStatus(el.id, el.active)}
                              className="btn btn-danger shadow btn-sm sharp">Inactive</button>
                            :
                            <button
                              onClick={() => handleStatus(el.id, el.active)}
                              className="btn btn-primary shadow btn-sm sharp me-1">Active</button>
                          }
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>

            <div id="example_wrapper" className="dataTables_wrapper"><div className="d-sm-flex text-center justify-content-between align-items-center mt-3">
              <div className="dataTables_info">
                Showing {activePag.current * sort + 1} to{" "}
                {hospitalData.length > (activePag.current + 1) * sort
                  ? (activePag.current + 1) * sort
                  : hospitalData.length}{" "}
                of {hospitalData.length} entries
              </div>
              <div
                className="dataTables_paginate paging_simple_numbers"
                id="example5_paginate"
              >
                <Link
                  className="paginate_button previous disabled"
                  to="/admin/view/ViewHospitals"
                  onClick={() =>
                    activePag.current > 0 && onClick(activePag.current - 1)
                  }
                >
                  <i className="fa fa-angle-double-left" aria-hidden="true"></i>
                </Link>
                <span>
                  {paggination.map((number, i) => (
                    <Link
                      key={i}
                      to="/admin/view/ViewHospitals"
                      className={`paginate_button  ${activePag.current === i ? "current" : ""
                        } `}
                      onClick={() => onClick(i)}
                    >
                      {number}
                    </Link>
                  ))}
                </span>
                <Link
                  className="paginate_button next"
                  to="/admin/view/ViewHospitals"
                  onClick={() =>
                    activePag.current + 1 < paggination.length &&
                    onClick(activePag.current + 1)
                  }
                >
                  <i className="fa fa-angle-double-right" aria-hidden="true"></i>
                </Link>
              </div>
            </div>

            </div>
          </Card.Body>
        </Card>
        <ToastContainer />
      </Col>
    </Fragment>
  );
};

export default ViewHospitals;
