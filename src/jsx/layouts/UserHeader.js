import React from "react";
import { Link,useNavigate } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { isAuthenticated } from "../../store/selectors/AuthSelectors";
import logo from "../../images/naija/main-logo.png";
import styles from "./newstyle.module.css";
import cx from "classnames";
import swal from 'sweetalert';

const UserHeader = (props) => {
  const navigate = useNavigate();
  const handleDelete = async ()=>{
    swal({
      title: "Are you sure?",
      text:
        "You want to Logout",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          localStorage.removeItem('userDetails');
          window.location.href = "";
          // window.location.reload();
    } catch (error) {
        console.error('Error message:', error.message);
      throw error;
    }
      }
    })
    
  }
  console.log(props.userData, "header userdata");
  return (
    // <div></div>
    <div className={styles["header"]} style={{backgroundColor:"white"}}>
      <div className={styles["header-top"]}>
        <div className={styles["container"]}>
          <div className={styles["navbar"]}>
            <h5 className={styles["logo-txt"]}>
              NAIJA <span>Medical.com</span>
            </h5>
            {/* <button
              title=".nav-collapse"
              accesskey="collapse"
              className={styles["btn btn-navbar collapsed"]}
              type="button"
            >
              {" "}
              <span className={styles["icn-bar first"]}></span>{" "}
              <span className={styles["icn-bar second"]}></span>{" "}
              <span className={styles["icn-bar third"]}></span>{" "}
            </button> */}
            <div className={styles["nav-collapse collapse"]}>
              <ul className={styles["nav"]}>
                <li className="mm-active">
                  <a href="/">Home</a>
                </li>
                <li>
                  <a href="/about">About Us</a>
                </li>
                <li>
                  <a href="/howworks">How It Works</a>
                </li>
                <li>
                  <a href="#">Contact</a>
                </li>
                <li>
                  <a href="/user/e-wallet">E-Wallet</a>
                </li>
              </ul>
            </div>
          </div>
          <ul className={styles["contact-detail"]}>
            <li>
              <a className={styles["red"]} href="tel:000 - 1234 - 5678">
                000 - 1234 - 5678
              </a>
            </li>
            {/* <!-- <li><a className="green" href="#chat">Chat</a></li> --> */}
            <li>
              {props.isAuthenticated ? (
                <a className={styles["green"]} href="#">
                  <i className={"fa fa-user"}></i>Welcome , {props.userData}
                </a>
              ) : (
                <a className={styles["green"]} href="/login">
                  <i className={"fa fa-user"}></i> Login / Register
                </a>
              )}
            </li>
            <li>
              {props.isAuthenticated ? (
                // <a className={styles["green"]} href="#">
                //   <i ></i>logout
                // </a>
                <Link
                         onClick={()=>handleDelete()}
                          // className="btn btn-danger shadow btn-xs sharp"
                        >
                          logout
                        </Link>
                
              ) : (
                ""
              )}
            </li>
          </ul>
        </div>
      </div>
      <div className={styles["header-bottom"]}>
        <div className={styles["container"]}>
          {" "}
          <a href="/" className={cx(styles["brand"],styles["margin-top-20"])}>
            {" "}
            <img src={logo} alt="main-logo" />{" "}
          </a>
          <ul className={cx(styles["header-links"],styles["margin-top-10"])}>
            <li className="link-3">
              <a href="/user/find-hospital">
                <i className={styles["icon-top-search"]}></i>Find a Hospital
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    isAuthenticated: isAuthenticated(state),
    // userData: "rahul",
    userData: state.auth.auth.first_name,
  };
};
export default connect(mapStateToProps)(UserHeader);
