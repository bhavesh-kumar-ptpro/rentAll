import React, { Fragment, useEffect, useRef, useState } from "react";
// import styles
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';
import AdminPageTitle from "../../AdminPageTitle/AdminPageTitle";
import axios from "axios";
import { API_URL } from "../../../../apiconfig";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
let styles={"cursor":'not-allowed',"background":"#DDDDDD"}
const EditStatePlans = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    dob: '',
    local_govt: '',
    budget: '',
    state: '',
  });
  useEffect(async () => {
    const { data } = await axios.get(`${API_URL}/api/indivual_plan_master/${id}`)
    const {name,email,dob,local_govt,budget,state} = data
    setFormData({...formData,
      name:name,
      email:email,
      dob:dob,
      local_govt:local_govt,
      budget:budget,
      state:state
      
    })
  }, [])


  const handleRedirect = async (e) => {
    navigate('/admin/view/view_corporate_plan')
  };


  return (
    <Fragment>
      <AdminPageTitle activePage="Manage orders" pageName="View Individual Plan" />

      <div className="col-xl-12 row-lg-12" >
        <div className="card" >
          <div className="card-header">
            <h4 className="card-title">View Individual Plan</h4>
          </div>

          <div className="card-body">
            <div className="basic-form">

              <form onSubmit={handleRedirect}>
                <div className="row">
                  <div className="form-group mb-3 col-md-6">
                    <label className="col-sm-3 col-form-label">Name</label>
                    <div className="col-sm-9">
                      <input
                        name="name"
                        type="text"
                        disabled
                        className="form-control"
                        style={styles}
                        value={formData.name}
                        // onChange={handleChange}

                      />
                    </div>
                  </div>
                  <div className="form-group mb-3 col-md-6">
                    <label className="col-sm-3 col-form-label">Email</label>
                    <div className="col-sm-9">
                      <input
                        name="email"
                        type="text"
                        className="form-control"
                        placeholder="Email"
                        value={formData.email}
                        disabled
                        style={styles}
                      />
                    </div>
                  </div>
               
                </div>

                <div className="row">
               
                  <div className="form-group mb-3 col-md-6">
                    <label className="col-sm-3 col-form-label">Date of Birth</label>
                    <div className="col-sm-9">

                      <input
                        type="text"
                        name="dob"
                        className="form-control"
                        placeholder="Date of Birth"
                        value={formData.dob}
                        style={styles}
                        maxLength={10}
                        minLength={10}
                        disabled
                        // onBlur={handleBlur}

                      />
                    </div>
                  </div>
                  <div className="form-group mb-3 col-md-6">
                    <label className="col-sm-3 col-form-label">Budget</label>
                    <div className="col-sm-9">
                    <input
                        name="budget"
                        type="text"
                        disabled
                        className="form-control"
                        style={styles}
                        value={formData.budget}
                        // onChange={handleChange}

                      />
                    </div>
                  </div>

                </div>
                <div className="row">

          
                  <div className="form-group mb-3 col-md-6">
                    <label className="col-sm-3 col-form-label">State</label>
                    <div className="col-sm-9">
                    <input
                        name="state"
                        type="text"
                        disabled
                        className="form-control"
                        // placeholder="enter hospital name"
                        value={formData.state}
                        style={styles}

                      />
                    </div>
                  </div>
                  <div className="form-group mb-3 col-md-6">
                    <label className="col-sm-3 col-form-label">Local Goverment</label>
                    <div className="col-sm-9">

                    <input
                        name="local_govt"
                        type="text"
                        disabled
                        className="form-control"
                        // placeholder="enter hospital name"
                        value={formData.local_govt}
                        // onChange={handleChange}
                        style={styles}
                      />
                    </div>
                  </div>
                  
                </div>
                <div className="row">
                  <div className="form-group mb-3 col-md-6">
                    <label className="col-sm-3 col-form-label">Budget</label>
                    <div className="col-sm-9">
                      <input
                        type="text"
                        name="budget"
                        className="form-control"
                        value={formData.budget}
                        disabled
                        style={styles}
                      />
                    </div>
                  </div>
                 
                </div>
                <div className="col-sm-10">
                  <button type="submit" className="btn btn-primary">
                    Close
                  </button>
                </div>
              </form>

            </div>
          </div>
        </div>

      </div>
      <ToastContainer />
    </Fragment>
  );
};

export default EditStatePlans;
