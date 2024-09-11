import React from "react";
import { Link } from "react-router-dom";
import { connect, useDispatch } from 'react-redux';
import { isAuthenticated,isadminAuthenticated } from '../../store/selectors/AuthSelectors';



const Error404 = (props) => {
   return (
      <div>
         <div className="form-input-content text-center error-page">
                     <h1 className="error-text fw-bold">404</h1>
                     <h4>
                        <i className="fa fa-exclamation-triangle text-warning" />{" "}
                        The page you were looking for is not found!
                     </h4>
                     <p>
                        You may have mistyped the address or the page may have
                        moved.
                     </p>
                     {props.isadminAuthenticated? 
                     <div>
                        <Link className="btn btn-primary" to="admin/view/dashboard">
                           Back to Home
                        </Link>
                     </div>
                     :
                     <div>
                        <Link className="btn btn-primary" to="/">
                           Back to Home
                        </Link>
                     </div>}
                  </div>

      </div>
      // <div className="authincation h-100 p-meddle">
      //    <div className="container h-100">
      //       <div className="row justify-content-center h-100 align-items-center ">
      //          <div className="col-md-7">
                  // <div className="form-input-content text-center error-page">
                  //    <h1 className="error-text fw-bold">404</h1>
                  //    <h4>
                  //       <i className="fa fa-exclamation-triangle text-warning" />{" "}
                  //       The page you were looking for is not found!
                  //    </h4>
                  //    <p>
                  //       You may have mistyped the address or the page may have
                  //       moved.
                  //    </p>
                  //    {props.isadminAuthenticated? 
                  //    <div>
                  //       <Link className="btn btn-primary" to="admin/view/dashboard">
                  //          Back to Home
                  //       </Link>
                  //    </div>
                  //    :
                  //    <div>
                  //       <Link className="btn btn-primary" to="/dashboard">
                  //          Back to Home
                  //       </Link>
                  //    </div>}
                  // </div>
      //          </div>
      //       </div>
      //    </div>
      // </div>
   );
};

const mapStateToProps = (state) => {
   return {
       isAuthenticated: isAuthenticated(state),
       isadminAuthenticated: isadminAuthenticated(state),
   };
};

{/* export default connect((mapStateToProps)(App));  */}
export default connect(mapStateToProps)(Error404);
