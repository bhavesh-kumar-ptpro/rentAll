import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import {
  Row,
  Col,
  Card,
  Table,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import swal from 'sweetalert';
import { API_URL } from '../../../../apiconfig';

function ViewNews() {
  let addClass = 'ql-editor frontend';
  const sort = 10;
  const activePag = useRef(0);
  let paggination = [];
  let jobData = [];
  const [data, setData] = useState([]);
  const [showMore, setShowMore] = useState({});

  useEffect(() => {
    handleGetData();
  }, []);

  const handleGetData = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/Managenews`);
      console.log('Response data:', response.data);
      setData(response.data.data);
      return response.data;
    } catch (error) {
      console.error('Error message:', error.message);
      throw error;
    }
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
          const response = await axios.delete(`${API_URL}/api/Managenews/delete/${id}`);
          console.log('Response data:', response.data);
          handleGetData();
          return response.data;
        } catch (error) {
          console.error('Error message:', error.message);
          throw error;
        }
      }
    });
    console.log(id, "delete");
  };

  const updatedShowMore = (index) => {
    setShowMore((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  paggination = Array(Math.ceil(data && data.length / sort))
    .fill()
    .map((_, i) => i + 1);
  jobData = data.slice(
    activePag.current * sort,
    (activePag.current + 1) * sort
  );
  const onClick = (i) => {
    activePag.current = i;

    jobData = data.slice(
      activePag.current * sort,
      (activePag.current + 1) * sort
    );
  };

  const handleStatus = async (id, currentStatus) => {
    const updateState = currentStatus === 0 ? `${API_URL}/api/Managenews/active/${id}` : `${API_URL}/api/Managenews/inactive/${id}`;
    const newStatus = currentStatus === 0 ? 1 : 0;
    try {
        const response = await axios.patch(updateState);
        console.log('Response data:', response.data);

        setData(prevData =>
            prevData.map(user =>
                user.id === id ? { ...user, active: newStatus } : user
            )
        );
        toast.success('Status updated successfully!');
    } catch (error) {
        toast.error('Error updating status: ' + error.message);
    }
};

  return (
    <div>
      <Card>
        <Card.Header>
          <Card.Title>Latest News Details</Card.Title>
        </Card.Header>
        <Card.Body>
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <strong>Title</strong>
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
                    <td style={{ width: 'fit-content' }}>
                      {user.title}
                    </td>
                    <td>
                      <div className={addClass}
                        dangerouslySetInnerHTML={{ __html: showMore[i] ? user.description : `${(user.description && user.description.substring(0, 100))}...` }}>
                      </div>
                      <button onClick={() => updatedShowMore(i)} className="btn btn-primary btn-xxs">
                        {showMore[i] ? 'Show Less' : 'Show More'}
                      </button>
                    </td>
                    <td>
                      <div className="d-flex">
                        <Link
                          to={`/admin/view/edit_news/${user.id}`}
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
                       <td>
                                            <div>
                                                {user.active === 0 ?
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
                )
              })}
            </tbody>
          </Table>
          <div id="example_wrapper" className="dataTables_wrapper">
            <div className="d-sm-flex text-center justify-content-between align-items-center mt-3">
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
                  to="/admin/view/view_faq"
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
                      to="/admin/view/view_faq"
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
                  to="/admin/view/view_faq"
                  onClick={() =>
                    activePag.current + 1 < paggination.length &&
                    onClick(activePag.current + 1)
                  }
                >
                  <i className="fa fa-angle-double-right" aria-hidden="true"></i>
                </Link>
              </div>
            </div>
            <ToastContainer />
          </div>
        </Card.Body>
      </Card>
    </div>
  )
}

export default ViewNews;
