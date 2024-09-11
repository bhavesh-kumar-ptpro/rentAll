import React from "react";
// import { Link } from "react-router-dom";
// import "./newstyle.module.css"
// import "./responsive.css"
import styles from "./newstyle.module.css";
import cx from 'classnames';
const UserFooter = () => {
  return (
    // <div></div>
    <div className={styles["footer-section"]}>
      <div className={cx(styles["footer"],styles["margin-top-15"])}>
        <div className={styles["container"]}>
          <div className={styles["row"]}>
            <div className={styles["col-2"]}>
              <div className={styles["inner"]}>
                <h5>Products</h5>
                <ul className={styles["footer-links"]}>
                  <li>
                    <a href="#">Individual Plan</a>
                  </li>
                  <li>
                    <a href="#">Corporate Plan</a>
                  </li>
                  <li>
                    <a href="#">Family Plan</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className={styles["col-3"]}>
              <div className={styles["inner"]}>
                <h5>Services</h5>
                <ul className={styles["footer-links"]}>
                  <li>
                    <a href="#">Health Insurance Plans</a>
                  </li>
                  <li>
                    <a href="#">Medical Plans</a>
                  </li>
                  <li>
                    <a href="/find-hospital">Find a Hospital</a>
                  </li>
                  {/* <li><a href="#">Quick Doctor</a></li>         */}
                </ul>
              </div>
            </div>
            <div className={styles["col-3"]}>
              <div className={styles["inner"]}>
                <h5>Company</h5>
                <ul className={styles["footer-links"]}>
                  <li>
                    <a href="#">About Us</a>
                  </li>
                  <li>
                    <a href="#">How It Works</a>
                  </li>
                  <li>
                    <a href="#">Contact Us</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className={styles["col-4"]}>
              <div className={styles["inner"]}>
                <h5 className={styles["social-media"]}>Social Media</h5>
                {/* <ul className="social-icon">
              <li><a href="javascript:void(0)"><i className="icon-facebook"></i></a></li>
              <li><a href="javascript:void(0)"><i className="icon-twitter"></i></a></li>
              <li><a href="javascript:void(0)"><i className="icon-gplus"></i></a></li>
            </ul> */}
                <ul class={styles["social-icon"]}>
                  <li>
                    <a href="javascript:void(0)">
                      <i class={styles["icon-facebook"]}></i>
                    </a>
                  </li>
                  <li>
                    <a href="javascript:void(0)">
                      <i class={styles["icon-twitter"]}></i>
                    </a>
                  </li>
                  <li>
                    <a href="javascript:void(0)">
                      <i class={styles["icon-gplus"]}></i>
                    </a>
                  </li>
                </ul>
                <div className={cx(styles["newsletter-block"],styles["margin-top-30"])}>
                  <h5>Newsletter</h5>
                  <p>Hear about new features, promos, discounts and more.</p>
                  <div className={styles["input-box"]}>
                    <input
                      type="text"
                      value="EMAIL ID"
                      //   onfocus="javascript: if(this.value == 'EMAIL ID'){ this.value = ''; }"
                      //   onblur="javascript: if(this.value==''){this.value='EMAIL ID';}"
                    />
                    <div className={styles["icon"]}>
                      <button
                        type="submit"
                        className={styles["subscribe-submit"]}
                      >
                        <i className="bi bi-arrow-right-square"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles["site-info"]}>
        <div className={styles["container"]}>
          <div className={styles["links "]}>
            <p>
              Copyright � 2024, paperbirdtech.com, All rights reserved.
              <a href="#">Terms of use</a> | <a href="#">Privacy</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserFooter;
