
import React, { Fragment, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';
import calenderDayFill from "../../../../icons/bootstrap-icons/icons/calendar-month.svg"
import { Col, Card, Table, Modal, Button } from "react-bootstrap";
import { API_URL } from "../../../../apiconfig";
import AdminPageTitle from "../../AdminPageTitle/AdminPageTitle";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import swal from 'sweetalert';
import moment from "moment";
import { ExportToExcel } from "../ExportToExcel";
const filterStyle = { width: "fit-content", marginLeft: "8px", marginTop: "10px" }
const DatefilterStyle = { width: "12%", marginLeft: "8px", marginTop: "10px" }
const ViewTravelPlan = () => {
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
    const months = Array.from({ length: 12 }, (_, i) => i + 1);
    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const [selectedYear, setSelectedYear] = useState(currentYear);
    const [selectedMonth, setSelectedMonth] = useState(1);
    const [selectedDay, setSelectedDay] = useState(1);
    const [selectedEndYear, setEndSelectedYear] = useState(currentYear);
    const [selectedEndMonth, setEndSelectedMonth] = useState(1);
    const [selectedEndDay, setEndSelectedDay] = useState(1);
    const [sort, setSort] = useState(10)
    const [userData, setUserData] = useState([]);
    const [users, setUsers] = useState([]);
    const activePag = useRef(0);
    const [date, setDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    useEffect(() => {
        handleGetHMO();
        handleGetUsers();
    }, []);

    const handleGetHMO = async () => {
        try {
            const { data } = await axios.get(`${API_URL}/api/travel_plan_master`);
            console.log("data", data.data);

            setUserData(data.data);
        } catch (error) {
            console.error('Error message:', error.message);
        }
    };
    const handleGetUsers = async () => {
        try {
            const { data } = await axios.get(`${API_URL}/api/travel_plan_master/user`);
            console.log("data", data.data);

            setUsers(data.data);
        } catch (error) {
            console.error('Error message:', error.message);
        }
    };
    const handleChange = (e) => {
        setSort(e.target.value)
    }
    const handleDelete = async (id) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this record!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then(async (willDelete) => {
            if (willDelete) {
                try {
                    await axios.delete(`${API_URL}/api/travel_plan_master/delete/${id}`);
                    handleGetHMO(); // Refresh the data after deletion
                } catch (error) {
                    console.error('Error message:', error.message);
                }
            }
        });
    };
    const onClick = (i) => {
        activePag.current = i;
    };
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
    const handleEndYearChange = (event) => {
        setEndSelectedYear(event.target.value);
        updateEndDate(event.target.value, selectedEndMonth, selectedEndDay);
        // setEndDate(`${selectedEndDay}/${selectedEndMonth}/${event.target.value}`)
    };

    const handleEndMonthChange = (event) => {
        setEndSelectedMonth(event.target.value);
        updateEndDate(selectedEndYear, event.target.value, selectedEndDay);
        // setEndDate(`${selectedEndDay}/${event.target.value}/${selectedEndYear}`)
    };

    const handleEndDayChange = (event) => {
        setEndSelectedDay(event.target.value);
        console.log("today", event.target.value);
        updateEndDate(selectedEndYear, selectedEndMonth, event.target.value);
    };

    const updateEndDate = (year, month, day) => {
        const maxDays = new Date(year, month, 0).getDate();

        if (day > maxDays) {
            day = maxDays;
        }
        const formattedMonth = String(month).padStart(2, '0');
        const formattedDay = String(day).padStart(2, '0');

        const formattedDate = `${year}-${formattedMonth}-${formattedDay}`;
        setEndDate(formattedDate);

        console.log("Validated Day:", formattedDay);
        console.log("Formatted End Date:", formattedDate);
    };


    const updateDate = (year, month, day) => {
        if (year && month && day) {
            // Ensure the month and day are always two digits (e.g., 01, 09)
            const formattedMonth = String(month).padStart(2, '0');
            const formattedDay = String(day).padStart(2, '0');

            // Create the formatted date string in "YYYY-MM-DD" format
            const formattedDate = `${year}-${formattedMonth}-${formattedDay}`;
            setDate(formattedDate);

            console.log("Formatted Date:", formattedDate);
        }
    };

    // const updateEndDate = (year, month, day) => {
    //     if (year && month && day) {
    //         const formattedDate = new Date(year, month - 1, day).toLocaleDateString('en-GB');
    //         setEndDate(formattedDate );
    //     }
    // };
    let paggination = Array(Math.ceil(userData.length / sort)).fill().map((_, i) => i + 1);
    console.log("date", date);
    console.log("endDate", endDate);

    // const handleSearch = async (e) => {
    //     const searchTerm = e.target && (e.target.value).toLowerCase();
    //     console.log("searchTerm Data", searchTerm);

    //     if (searchTerm !== "" && userData) {

    //         const filteredData = userData.filter(item => item.name.toLowerCase().includes(searchTerm) || item.email.toLowerCase().includes(searchTerm));
    //         console.log("Filtered Data", filteredData);
    //         setUserData(filteredData);

    //     } else {
    //         handleGetHMO()
    //     }

    // };
    const handleSearch = async (e) => {
        if (!e.target) return; // or throw an error, depending on your requirements
        const searchTerm = e.target?.value?.toLowerCase() ?? ''; if (searchTerm !== "") {
            try {
                const filteredData = userData.filter(item => {
                    const regex = new RegExp(searchTerm, 'i');
                    return regex.test(item.name) || regex.test(item.email);
                }); console.log("Filtered Data", filteredData);
                setUserData(filteredData);
            } catch (error) {
                console.error("Error fetching data", error);
            }
        } else {
            handleGetHMO()
        }
    };
    const handleDateFilter = async () => {
        setShow2(false)
        try {
            const { data } = await axios.post(`${API_URL}/api/travel_plan_master/datefilter`, {
                "startDate": date,
                "endDate": endDate
            })
            console.log("startDate", data);
            setUserData(data)

        } catch (error) {
            console.error("Error fetching data", error);
        }


    };
    const handleUserChange = async (e) => {
        const value = e.target.value.trim();

        // Check if the value is empty
        if (!value) {
            handleGetHMO();
            return; // Exit early to avoid making the API call
        }

        try {
            let para = {
                "startDate": "",
                "endDate": "",
                "username": value
            };

            const { data } = await axios.post(`${API_URL}/api/travel_plan_master/datefilter`, para);
            console.log("data", data);
            setUserData(data.data);
        } catch (error) {
            toast.error(`Error fetching data: ${error.message}`);
        }
    };


    return (
        <Fragment>
            <AdminPageTitle activePage="Manage orders" pageName="Travel Plans" />

            <Col lg={12}>
                <Card>
                    <div className="row">
                        <select
                            //   defaultValue={formData.type_of_hospital}
                            className="form-control form-control-sm"
                            // name="type_of_hospital"
                            // value={formData.type_of_hospital}
                            onChange={(e) => handleChange(e)}
                            style={{ width: "fit-content", marginLeft: "25px", marginTop: "10px" }}
                            required
                        >
                            <option value={10}>Entry per page</option>
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={15}>15</option>

                        </select>
                        <select
                            className="form-control form-control-sm"
                            onChange={handleUserChange}
                            style={{ width: "fit-content", marginLeft: "25px", marginTop: "10px" }}
                            required
                        >
                            <option value={""}>filter by User</option>
                            {users && users.map((user) => {
                                return <option key={user.id} value={user.userId}>{user.full_name}</option>
                            })}

                        </select>
                        <input
                            style={DatefilterStyle}
                            type="text"
                            className="form-control form-control-sm"
                            placeholder="Start date"
                            value={date}
                            readOnly

                            onClick={handleShow} // Show the modal on input click
                        />
                        <input
                            style={DatefilterStyle}
                            type="text"
                            className="form-control form-control-sm"
                            placeholder="End date"
                            value={endDate} // Here should be endDate, not endDate.date
                            readOnly
                            onClick={() => setShow2(true)} // Show the modal on input click
                        />


                        <input
                            type="text"
                            name="address"
                            className="form-control form-control-sm"
                            placeholder="Search"
                            style={filterStyle}
                            onInput={handleSearch}
                        />
                        <div style={{ width: "20%", marginTop: "10px" }}>
                            <ExportToExcel apiData={userData} fileName={"travel-plans"} />
                        </div>
                    </div>
                    <Card.Body>
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
                        <Modal show={show2} onHide={() => setShow2(false)} centered>
                            <Modal.Header closeButton className='bg-primary'>
                                <Modal.Title>Select end Date<i class="ri-calendar-2-line text-white"></i></Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div className="form-group">
                                    <label>Year</label>
                                    <select value={selectedEndYear} onChange={handleEndYearChange} className="form-control">
                                        {years.map(year => (
                                            <option key={year} value={year}>{year}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Month</label>
                                    <select value={selectedEndMonth} onChange={handleEndMonthChange} className="form-control">
                                        {months.map(month => (
                                            <option key={month} value={month}>{month}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Day</label>
                                    <select value={selectedEndDay} onInput={handleEndDayChange} className="form-control">
                                        {days.map(day => (
                                            <option key={day} value={day}>{day}</option>
                                        ))}
                                    </select>
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={() => setShow2(false)}>
                                    Close
                                </Button>
                                <Button variant="primary" onClick={handleDateFilter}>
                                    Submit
                                </Button>
                            </Modal.Footer>
                        </Modal>
                        <Table responsive>
                            {/* <thead> */}
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Number</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Coverage Amount</th>
                                <th>Travel Purpose</th>
                                <th>Action</th>
                            </tr>
                            {/* </thead> */}
                            <tbody>
                                {userData.length > 0 ? userData.slice(activePag.current * sort, (activePag.current + 1) * sort).map((user, i) => (
                                    <tr key={i}>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.Number}</td>
                                        {/* <td>{moment(user.TravelStartDate).format("yyyy-mm-DD")}</td> */}
                                        <td>{user.TravelStartDate}</td>
                                        <td>{user.TravelEndDate}</td>
                                        {/* <td>{moment(user.TravelEndDate).format("yyyy-mm-DD")}</td> */}
                                        <td>{user.coverageamount}</td>
                                        <td>{user.PurposeofTravel}</td>
                                        <td>
                                            <div className="d-flex">
                                                <Link
                                                    to={`/admin/view/edit_travel_plan/${user.id}`}
                                                    className="btn btn-primary shadow btn-xs sharp me-1"
                                                >
                                                    <i className="fas fa-eye"></i>
                                                </Link>
                                                <Link
                                                    onClick={() => handleDelete(user.id)}
                                                    className="btn btn-danger shadow btn-xs sharp"
                                                >
                                                    <i className="fa fa-trash"></i>
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="7" className="text-center">No data available</td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                        <div id="example_wrapper" className="dataTables_wrapper">
                            <div className="d-sm-flex text-center justify-content-between align-items-center mt-3">
                                <div className="dataTables_info">
                                    Showing {activePag.current * sort + 1} to{" "}
                                    {userData.length > (activePag.current + 1) * sort
                                        ? (activePag.current + 1) * sort
                                        : userData.length}{" "}
                                    of {userData.length} entries
                                </div>
                                <div
                                    className="dataTables_paginate paging_simple_numbers"
                                    id="example5_paginate"
                                >
                                    <Link
                                        className="paginate_button previous"
                                        to="/admin/view/view_travel_plan"
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
                                                to="/admin/view/view_travel_plan"
                                                className={`paginate_button  ${activePag.current === i ? "current" : ""}`}
                                                onClick={() => onClick(i)}
                                            >
                                                {number}
                                            </Link>
                                        ))}
                                    </span>
                                    <Link
                                        className="paginate_button next"
                                        to="/admin/view/view_travel_plan"
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

export default ViewTravelPlan;
