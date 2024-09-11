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
} from "react-bootstrap";
import { GlobalFilter } from '../../../components/table/FilteringTable/GlobalFilter';
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import avatar3 from "../../../../images/1.jpg";
import { API_URL } from "../../../../apiconfig";
const ViewPlan = () => {
    const navigate = useNavigate();
    // let sort = 10;
    const activePag = useRef(0);
    let paggination = [];
    let jobData = [];
    const [formData, setFormData] = useState({
        policy_name: '',
        hmo: '',
        plan_type: '',
        max_duration: '',
        monthly_cost: '',
        yearly_cost: '',
        deductible: '',
        coinsurance: '',
    });
    const [sort, setSort] = useState(10)
    const [hospitalData, setHospitalData] = useState([])
    const handleDelete = async (id) => {
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
                    const response = await axios.delete(`${API_URL}/api/Planpolicy_mapping_master/delete/${id}`);
                    getHospitals()
                    return response.data;
                } catch (error) {
                    console.error('Error message:', error.message);
                    throw error;
                }
            }
        })
    }
    const getHospitals = async () => {
        let { data } = await axios.get(`${API_URL}/api/Planpolicy_mapping_master`)
        setHospitalData(data)
    }
    useEffect(async () => {
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
        setSort(e.target.value)
    }
    return (
        <Fragment>
            <AdminPageTitle activePage="Plan Management" pageName="View Plans" />


            <Col lg={12}>
                <Card>
                    <Card.Header>
                        <Card.Title>Plan Details</Card.Title>
                    </Card.Header>
                    {/* <div className="row"> */}
                    <select
                        //   defaultValue={formData.type_of_hospital}
                        className="form-control form-control-sm"
                        name="type_of_hospital"
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

                    {/* </div> */}
                    <Card.Body>
                        <Table responsive>
                            <thead>
                                <tr>
                                    <td>
                                        <strong> Policy Name</strong>

                                    </td>
                                    <td>
                                        <strong> HMO Name</strong>

                                    </td>
                                    <td>
                                        <strong> Plan</strong>

                                    </td>
                                    <td>
                                        <strong>  Max Duration</strong>
                                    </td>
                                    <td>
                                        <strong> Monthly Cost</strong>

                                    </td>
                                    <td>
                                        <strong>Yearly Cost</strong>

                                    </td>
                                    <td>
                                        <strong>Coinsurance</strong>

                                    </td>
                                    <td>
                                        <strong>Deductible</strong>
                                    </td>
                                    <td>
                                        <strong>Action</strong>

                                    </td>
                                </tr>
                            </thead>

                            <tbody>
                                {/* {userData && userData.length > 0 && jobData.map((user, i) => { */}
                                {hospitalData && jobData.map((el) => {
                                    return (
                                        <tr key={el.id}>
                                            <td>{el.policy_name}</td>
                                            <td>{el.hmo}</td>
                                            <td>{el.plan_type}</td>
                                            <td>{el.max_duration}</td>
                                            <td>{el.monthly_cost}</td>
                                            <td>{el.yearly_cost}</td>
                                            <td>{el.coinsurance}</td>
                                            <td>{el.deductible}</td>
                                            <td>
                                                <div className="d-flex">
                                                    <Link
                                                        // href={`/add-hmo/${user.id}`}
                                                        to={`/admin/view/edit_plan/${el.id}`}
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
                                    to="/admin/view/view_plan"
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
                                            to="/admin/view/view_plan"
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
                                    to="/admin/view/view_plan"
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
            <ToastContainer />
        </Fragment>
    );
};

export default ViewPlan;
