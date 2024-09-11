import React, { Fragment, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { Col, Card, Table } from "react-bootstrap";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import swal from 'sweetalert';
import { API_URL } from '../../../../apiconfig';

function ViewClientDescription() {
    const [sort, setSort] = useState(10);
    const [userData, setUserData] = useState([]);
    const [showMore, setShowMore] = useState({});
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        handleUserData();
    }, []);

    const handleUserData = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/ClientSpeak`);
            setUserData(response.data.data);
        } catch (error) {
            toast.error('Error updating status: ' + error.message);
        }
    };

    const handleStatus = async (id, currentStatus) => {
        const updateState = currentStatus === 0 ? `${API_URL}/api/ClientSpeak/active/${id}` : `${API_URL}/api/ClientSpeak/inactive/${id}`;
        const newStatus = currentStatus === 0 ? 1 : 0;
        try {
            await axios.patch(updateState);
            setUserData(prevData =>
                prevData.map(data =>
                    data.id === id ? { ...data, active: newStatus } : data
                )
            );
            toast.success('Status updated successfully!');
        } catch (error) {
            console.error('Error updating status:', error.message);
        }
    };

    const handleChange = (e) => {
        setSort(e.target.value);
        setCurrentPage(0);
    };

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
                    await axios.delete(`${API_URL}/api/ClientSpeak/delete/${id}`);
                    handleUserData();
                    toast.success("Deleted Successfully")
                } catch (error) {
                    console.error('Error deleting data:', error.message);
                }
            }
        });
    };

    const updatedShowMore = (index) => {
        setShowMore((prev) => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    const jobData = userData.slice(currentPage * sort, (currentPage + 1) * sort);
    const paginationNumbers = Array(Math.ceil(userData.length / sort)).fill().map((_, i) => i + 1);

    return (
        <Fragment>
            <Col lg={12}>
                <Card>
                    <Card.Header>
                        <Card.Title>Client Speaks</Card.Title>
                    </Card.Header>
                    <select
                        className="form-control form-control-sm"
                        onChange={(e) => handleChange(e)}
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
                                    <th><strong>Client Name</strong></th>
                                    <th><strong>Logo</strong></th>
                                    <th><strong>Description</strong></th>
                                    <th><strong>Action</strong></th>
                                    <th><strong>Update</strong></th>
                                </tr>
                            </thead>
                            <tbody>
                                {userData && userData.length > 0 && jobData.map((user, i) => (
                                    <tr key={i}>
                                        <td>{user.client_name}</td>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <img
                                                    src={`${API_URL}/public/image/Company_Logo/` + user.logo_url}
                                                    width="50"
                                                    alt="Company Logo"
                                                />
                                            </div>
                                        </td>
                                        <td>
                                            <div
                                                dangerouslySetInnerHTML={{
                                                    __html: showMore[i] ? user.description : `${user.description && user.description.substring(0, 100)}...`
                                                }}
                                            ></div>
                                            {user.description && user.description.length > 100 && (
                                                <button onClick={() => updatedShowMore(i)} className="btn btn-primary btn-xxs">
                                                    {showMore[i] ? 'Show Less' : 'Show More'}
                                                </button>
                                            )}
                                        </td>
                                        <td>
                                            <div className="d-flex">
                                                <Link
                                                    to={`/admin/view/edit_clientDescription/${user.id}`}
                                                    className="btn btn-primary shadow btn-xs sharp me-1"
                                                >
                                                    <i className="fas fa-pen"></i>
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(user.id)}
                                                    className="btn btn-danger shadow btn-xs sharp"
                                                >
                                                    <i className="fa fa-trash"></i>
                                                </button>
                                            </div>
                                        </td>
                                        <td>
                                            <div>
                                                {user.active === 1 ?
                                                    <button
                                                        onClick={() => handleStatus(user.id, user.active)}
                                                        className="btn btn-danger shadow btn-sm sharp">Inactive</button>
                                                    :
                                                    <button
                                                        onClick={() => handleStatus(user.id, user.active)}
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
}

export default ViewClientDescription;
