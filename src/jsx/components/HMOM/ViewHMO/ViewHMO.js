import React, { Fragment, useEffect, useReducer, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import LightGallery from 'lightgallery/react';
// import styles
// import 'lightgallery/css/lightgallery.css';
// import 'lightgallery/css/lg-zoom.css';
// import 'lightgallery/css/lg-thumbnail.css';
import './filtering.css'
import {
  Row,
  Col,
  Card,
  Table,
  Badge,
  Dropdown,
  ProgressBar,
} from "react-bootstrap";
//** Import Image */
//** Import Image */
import AdminPageTitle from "../../AdminPageTitle/AdminPageTitle";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import swal from 'sweetalert';
import { API_URL } from "../../../../apiconfig";
import Stripe from "stripe";

import { useParams, useLocation } from 'react-router-dom';
const ViewHMO = () => {
  // const sort = 10;
  const activePag = useRef(0);
  const [sort, setSort] = useState(10)
  const [userData, setUserData] = useState([])
  // const { search } = useLocation();
  // const params = new URLSearchParams(search);
  // const sessionId = params.get('id');
  // console.log("session_id",sessionId);
  useEffect(async () => {
    handleSubmit()

    //  getId()
  }, [])
  let paggination = [];
  let jobData = [];

  paggination = Array(Math.ceil(userData.length / sort))
    .fill()
    .map((_, i) => i + 1);

  // const getId =async ()=>{
  //   if(sessionId){
  //     const stripe = new Stripe( "sk_test_51OcN1bSBagUy9FTJ8VjAdf8nXiqaLY89ZQV4Up8CNvujHMrLFfV7kcDpPMakEHit9qyGwAmyO7SfsAvy98yjKN0W00Pbcv539f", {
  //       apiVersion: "2022-11-15",
  //     });
  //     const session = await  stripe.checkout.sessions.retrieve(sessionId);
  //     console.log("session",session);

  //     if(session.payment_status == 'paid' || session.status == 'complete'){
  //       amptyField()
  //       console.log("payment success");
  //     }
  //     // console.log("session",);
  //   }else{
  //     console.log("no session id");
  //   }
  // }
  jobData = userData.slice(
    activePag.current * sort,
    (activePag.current + 1) * sort
  )
  const amptyField = () => {
    toast.success(`❗Transaction is Successful`, {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const handleChange = (e) => {
    console.log(e.target.value)
    setSort(e.target.value)
  }
  const handleSubmit = async () => {

    try {
      const response = await axios.get(`${API_URL}/api/hmo`);
      setUserData(response.data)
      return response.data;
    } catch (error) {
      console.error('Error message:', error.message);
      throw error;
    }
  }
  // const navigate = useNavigate()

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
          const response = await axios.delete(`${API_URL}/api/hmo/delete/${id}`);
          handleSubmit()
          return response.data;
        } catch (error) {
          console.error('Error message:', error.message);
          throw error;
        }
      }
    })

  }

  const onClick = (i) => {
    activePag.current = i;

    jobData = userData.slice(
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



  return (
    <Fragment>
      <AdminPageTitle activePage="HMO Management" pageName="ViewHMO" />

      <Col lg={12}>
        <Card>
          <Card.Header>
            <Card.Title>HMO Details</Card.Title>
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
                  <th>
                    <strong>HMO Name</strong>
                  </th>

                  <th>
                    <strong>Logo</strong>
                  </th>
                  <th>
                    <strong>HMO Type</strong>
                  </th>
                  <th>
                    <strong>Action</strong>
                  </th>
                </tr>
              </thead>

              <tbody>

                {userData && userData.length > 0 && jobData.map((user, i) => {
                  return (
                    <tr key={i}>
                      <td>{user.company_name}</td>
                      <td style={{width:"50%"}}>
                        <img
                          src={`${API_URL}/public/image/Company_Logo/` + user.logo_url}
                          style={{ width: "25%" }}
                          alt="http://placehold.it/232x232"
                        />{" "}

                      </td>
                      <td>HMO Type</td>
                      <td>
                        <div className="d-flex">
                          <Link
                            // href={`/add-hmo/${user.id}`}
                            to={`/admin/view/EditHMO/${user.id}`}
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
                  )
                })}
              </tbody>
            </Table>
            <div id="example_wrapper" className="dataTables_wrapper"><div className="d-sm-flex text-center justify-content-between align-items-center mt-3">
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
                  className="paginate_button previous disabled"
                  to="/admin/view/ViewHMO"
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
                      to="/admin/view/ViewHMO"
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
                  to="/admin/view/ViewHMO"
                  onClick={() =>
                    activePag.current + 1 < paggination.length &&
                    onClick(activePag.current + 1)
                  }
                >
                  <i className="fa fa-angle-double-right" aria-hidden="true"></i>
                </Link>
              </div>
            </div></div>



          </Card.Body>
        </Card>
        <ToastContainer />
      </Col>
    </Fragment>
  );
};

export default ViewHMO;
