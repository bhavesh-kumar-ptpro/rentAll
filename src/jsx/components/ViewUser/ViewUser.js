import React, { Fragment, useEffect, useState } from "react";
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';
import axios from "axios";
import { Col, Card, Table } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_URL } from "../../../apiconfig";

const ViewUser = () => {
    const [sort, setSort] = useState(10);
    const [userData, setUserData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        getUser();
    }, []);

    const getUser = async () => {
        try {
            const { data } = await axios.get(`${API_URL}/api/user`);
            setUserData(data);
        } catch (error) {
            toast.error('Error fetching user: ' + error.message);
        }
    };

    const handleStatus = async (id, currentStatus) => {
        const updateState = currentStatus === 0 ? `${API_URL}/api/user/activeuser/${id}` : `${API_URL}/api/user/inactiveuser/${id}`;
        const newStatus = currentStatus === 0 ? 1 : 0;
        try {
            const response = await axios.patch(updateState);
            console.log('Response data:', response.data);

            setUserData(prevData =>
                prevData.map(user =>
                    user.UserId === id ? { ...user, active: newStatus } : user
                )
            );
            toast.success('Status updated successfully!');
        } catch (error) {
            toast.error('Error updating status: ' + error.message);
        }
    };

    const jobData = userData.slice(currentPage * sort, (currentPage + 1) * sort);
    const paginationNumbers = Array(Math.ceil(userData.length / sort)).fill().map((_, i) => i + 1);

    const handleChange = (e) => {
        setSort(e.target.value);
        setCurrentPage(0);
    };

    return (
        <Fragment>
            <Col lg={12}>
                <Card>
                    <Card.Header>
                        <Card.Title>User Details</Card.Title>
                    </Card.Header>
                    <select
                        className="form-control form-control-sm"
                        onChange={handleChange}
                        style={{ width: "fit-content", marginLeft: "25px", marginTop: "10px" }}
                        required
                    >
                        <option value={10}>Select Entry per page</option>
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={15}>15</option>
                    </select>
                    <Card.Body>
                        <Table responsive>
                            <thead>
                                <tr>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Contact Number</th>
                                    <th>Email</th>
                                    <th>Password</th>
                                </tr>
                            </thead>
                            <tbody>
                                {jobData.map(el => (
                                    <tr key={el.UserId}>
                                        <td>{el.first_name}</td>
                                        <td>{el.last_name}</td>
                                        <td>{el.phone}</td>
                                        <td>{el.email}</td>
                                        <td>{el.password}</td>
                                        <td>
                                            <div>
                                                {el.active === 1 ?
                                                    <button
                                                        onClick={() => handleStatus(el.UserId, el.active)}
                                                        className="btn btn-danger shadow btn-sm sharp">Inactive</button>
                                                    :
                                                    <button
                                                        onClick={() => handleStatus(el.UserId, el.active)}
                                                        className="btn btn-primary shadow btn-sm sharp me-1">Active</button>
                                                }
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        <div id="example_wrapper" className="dataTables_wrapper">
                            <div className="d-sm-flex text-center justify-content-between align-items-center mt-3">
                                <div className="dataTables_info">
                                    Showing {currentPage * sort + 1} to{" "}
                                    {userData.length > (currentPage + 1) * sort
                                        ? (currentPage + 1) * sort
                                        : userData.length}{" "}
                                    of {userData.length} entries
                                </div>
                                <div className="dataTables_paginate paging_simple_numbers">
                                    <button
                                        className="paginate_button previous"
                                        disabled={currentPage === 0}
                                        onClick={() => setCurrentPage(currentPage - 1)}
                                    >
                                        <i className="fa fa-angle-double-left" aria-hidden="true"></i>
                                    </button>
                                    <span>
                                        {paginationNumbers.map((number, i) => (
                                            <button
                                                key={i}
                                                className={`paginate_button ${currentPage === i ? "current" : ""}`}
                                                onClick={() => setCurrentPage(i)}
                                            >
                                                {number}
                                            </button>
                                        ))}
                                    </span>
                                    <button
                                        className="paginate_button next"
                                        disabled={currentPage + 1 >= paginationNumbers.length}
                                        onClick={() => setCurrentPage(currentPage + 1)}
                                    >
                                        <i className="fa fa-angle-double-right" aria-hidden="true"></i>
                                    </button>
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

export default ViewUser;

