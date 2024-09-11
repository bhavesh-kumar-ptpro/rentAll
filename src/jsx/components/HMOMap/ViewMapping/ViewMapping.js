import React, { Fragment, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';
import { Col, Card, Table } from "react-bootstrap";
import { API_URL } from "../../../../apiconfig";
import AdminPageTitle from "../../AdminPageTitle/AdminPageTitle";
import axios from "axios";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import swal from 'sweetalert';

const ViewMapping = () => {
    const [sort, setSort] = useState(10)
    const [userData, setUserData] = useState([]);
    const activePag = useRef(0);
    const navigate = useNavigate();

    useEffect(() => {
        handleGetHMO();
    }, []);

    const handleGetHMO = async () => {
        try {
            const { data } = await axios.get(`${API_URL}/api/hmoHospitalMapping`);
            setUserData(data);
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
                    await axios.delete(`${API_URL}/api/hmoHospitalMapping/delete/${id}`);
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

    let paggination = Array(Math.ceil(userData.length / sort)).fill().map((_, i) => i + 1);

    return (
        <Fragment>
            <AdminPageTitle activePage="HMO Hospital Mapping" pageName="ViewMapping" />

            <Col lg={12}>
                <Card>
                    <Card.Header>
                        <Card.Title>View Mapped HMO And Hospital</Card.Title>
                    </Card.Header>
                    <select
                        //   defaultValue={formData.type_of_hospital}
                        className="form-control form-control-sm"
                        // name="type_of_hospital"
                        // value={formData.type_of_hospital}
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
                                    <th>HMO Name</th>
                                    <th>Hospital Name</th>
                                    <th>Local Government</th>
                                    <th>State</th>
                                    <th>Band</th>
                                    <th>Address</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userData.length > 0 ? userData.slice(activePag.current * sort, (activePag.current + 1) * sort).map((user, i) => (
                                    <tr key={i}>
                                        <td>{user.hmo}</td>
                                        <td>{user.hospital}</td>
                                        <td>{user.city}</td>
                                        <td>{user.state}</td>
                                        <td>{user.band}</td>
                                        <td>{user.full_add}</td>
                                        <td>
                                            <div className="d-flex">
                                                <Link
                                                    to={`/admin/view/edit_hh_mapping/${user.id}`}
                                                    className="btn btn-primary shadow btn-xs sharp me-1"
                                                >
                                                    <i className="fas fa-pen"></i>
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
                                        to="/admin/view/view_hh_mapping"
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
                                                to="/admin/view/view_hh_mapping"
                                                className={`paginate_button  ${activePag.current === i ? "current" : ""}`}
                                                onClick={() => onClick(i)}
                                            >
                                                {number}
                                            </Link>
                                        ))}
                                    </span>
                                    <Link
                                        className="paginate_button next"
                                        to="/admin/view/view_hh_mapping"
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

export default ViewMapping;
