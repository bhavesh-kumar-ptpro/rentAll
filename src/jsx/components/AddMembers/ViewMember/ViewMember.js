import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import {
  Row,
  Col,
  Card,
  Table,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import { API_URL } from '../../../../apiconfig';
import AdminPageTitle from '../../AdminPageTitle/AdminPageTitle';

const ViewMember = () => {
  let addClass = 'ql-editor frontend';
  const sort = 10;
  const activePag = useRef(0);
  let paggination = [];
  let jobData= [];


  const [data, setData] = useState([])
  const [showMoreAns, setShowMoreAns] = useState(false)
  
  useEffect(() => {
    handleGetFAQ()
  }, [])
  const handleGetFAQ = async () => {
    try {
      const {data} = await axios.get(`${API_URL}/api/about_as`);
      setData(data.data)
      return data.data;
    } catch (error) {
      console.error('Error message:', error.message);
      throw error;
    }
  }

  // const updatedShowMoreQue = (index) => {
  //   setShowMoreQue((prev) => ({
  //     ...prev,
  //     [index]: !prev[index]
  //   }));
  // };

  const updatedShowMoreAns = (index) => {
    setShowMoreAns((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

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
          const response = await axios.delete(`${API_URL}/api/about_as/delete/${id}`);
          console.log('Response data:', response.data);
          handleGetFAQ()
          return response.data;
        } catch (error) {
          console.error('Error message:', error.message);
          throw error;
        }
      }
    })
    console.log(id, "delete");
  }
  paggination = Array(Math.ceil(data.length / sort))
  .fill()
  .map((_, i) => i + 1);
  jobData =data.slice(
    activePag.current * sort,
    (activePag.current + 1) * sort
  )
  const onClick = (i) => {
    activePag.current = i;

    jobData = data.slice(
      activePag.current * sort,
      (activePag.current + 1) * sort
    );
  }

  return (
    <div>
        <AdminPageTitle activePage="View About us" pageName="About us" />
      <Card>
        <Card.Header>
          <Card.Title>View About us</Card.Title>
        </Card.Header>
        <Card.Body>
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <strong>Name</strong>
                </th>
                <th>
                  <strong>Designation</strong>
                </th>
                <th>
                  <strong>Company</strong>
                </th>
                <th>
                  <strong>Photo</strong>
                </th>
                <th>
                  <strong>Description</strong>
                </th>
                <th>
                  <strong>Action</strong>
                </th>
              </tr>
            </thead>

            <tbody>
              {jobData && jobData.length > 0 && jobData.map((user, i) => {
                return (
                  <tr key={i}>
                    <td style={{width:'fit-content'}}>
                      {user.name}
                    </td>
                    <td style={{width:'fit-content'}}>
                      {user.designation}
                    </td>
                    <td style={{width:'fit-content'}}>
                      {user.company_name}
                    </td>
                    <td style={{width:'fit-content'}}>
                    <img
                    style={{width:"70%",borderRadius:"50%"}}
                     src={`${API_URL}/public/image/Company_Logo/`+user.memberPhoto}
                    alt={user.memberPhoto}/> 
                    </td>
                    <td >   
                    <div className={addClass}
                        dangerouslySetInnerHTML={{ __html: showMoreAns[i] ? user.description : `${(user.description && user.description).substring(0, 100)}...` }}></div>
                      <button onClick={() => updatedShowMoreAns(i)} className="btn btn-primary btn-xxs">
                        {showMoreAns[i] ? 'Show Less' : 'Show More'}</button>
                    </td>
                    <td >
                      <div className="d-flex">
                        <Link
                          to={`/admin/view/edit_member/${user.id}`}
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
                                {data.length > (activePag.current + 1) * sort
                                    ? (activePag.current + 1) * sort
                                    : data.length}{" "}
                                of {data.length} entries
                            </div>
                            <div
                                className="dataTables_paginate paging_simple_numbers"
                                id="example5_paginate"
                            >
                                <Link
                                    className="paginate_button previous disabled"
                                    to="/admin/view/view_member"
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
                                            to="/admin/view/view_member"
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
                                    to="/admin/view/view_member"
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
    </div>
  )
}
export default ViewMember;
