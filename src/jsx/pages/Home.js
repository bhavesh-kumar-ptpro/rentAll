import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
// import withStyles from 'isomorphic-style-loader/lib/withStyles'
import styles from "../layouts/newstyle.module.css"; 
import logo from "../../images/naija/main-logo.png";
import Banner1 from "../../images/naija/main-banner-img-1.jpg";
import Banner2 from "../../images/naija/main-banner-img-2.jpg";
import Banner3 from "../../images/naija/main-banner-img-3.jpg";
import Insurance1 from "../../images/naija/insurance-img-1.jpg";
import Insurance2 from "../../images/naija/insurance-img-2.jpg";
import Insurance3 from "../../images/naija/insurance-img-3.jpg";
import Insurance4 from "../../images/naija/insurance-img-4.jpg";
import client1 from "../../images/naija/client-img-1.jpg";
import slider1 from "../../images/naija/latest-news-slider-img-1.jpg";
import slider2 from "../../images/naija/latest-news-slider-img-2.jpg";
import partner1 from "../../images/naija/partner1.jpg";
import partner2 from "../../images/naija/partner2.jpg";
import partner3 from "../../images/naija/partner3.jpg";
import partner4 from "../../images/naija/partner4.jpg";
import partner5 from "../../images/naija/partner5.jpg";
import partners1 from "../../images/naija/partners-1.jpg";
import partners2 from "../../images/naija/partners-2.jpg";
import partners3 from "../../images/naija/partners-3.jpg";
import partners4 from "../../images/naija/partners-4.jpg";
import partners5 from "../../images/naija/partners-5.jpg";
import sidebar1 from "../../images/naija/sidebar-1-img.jpg";
import sidebar2 from "../../images/naija/sidebar-2-img.jpg";
import sidebar3 from "../../images/naija/sidebar-3-img.jpg";
import gif from "../../images/naija/970x90_2.gif";
import cx from 'classnames';
import search from "../../image/page-search.svg"
import compare from "../../image/compare.svg"
import nigerian_sign from "../../image/nigerian_sign.svg"

function Home(props) {
  return (
    // <div></div>
    <div className={styles["main-container"]}>
      <div className={styles["container"]}>
        <div className={styles["banner-section"]}>
          <div className={styles["row"]}>
            <div className={styles["col-7"]}>
              <div className={styles["slider-new"]}>
                <div id="myCarousel" className={styles["carousel slide"]}>
                  <div className={styles["carousel-inner"]}>
                    <div className={styles["active item"]}>
                      <a href="javascript:void(0)">
                        <img alt="Banner image" src={Banner1} />
                      </a>
                      <div className={styles["slider-caption"]}>
                        <h2>
                          {" "}
                          Compare and buy
                          <span>
                            the best health insurance plans in Nigeria
                          </span>{" "}
                        </h2>
                      </div>
                    </div>
                    <div className={styles["item"]}>
                      <a href="javascript:void(0)">
                        <img alt="Banner image" src={Banner2} />
                      </a>
                      <div className={styles["slider-caption"]}>
                        <h2>
                          {" "}
                          Compare and buy
                          <span>
                            the best health insurance plans in Nigeria
                          </span>{" "}
                        </h2>
                      </div>
                    </div>
                    <div className={styles["item"]}>
                      <a href="javascript:void(0)">
                        <img alt="Banner image" src={Banner3} />
                      </a>
                      <div className={styles["slider-caption"]}>
                        <h2>
                          {" "}
                          Compare and buy
                          <span>
                            the best health insurance plans in Nigeria
                          </span>{" "}
                        </h2>
                      </div>
                    </div>
                  </div>
                  <a
                    className={styles["carousel-control left"]}
                    href="#myCarousel"
                    data-slide="prev"
                  ></a>{" "}
                  <a
                    className={styles["carousel-control right"]}
                    href="#myCarousel"
                    data-slide="next"
                  ></a>
                </div>
              </div>
            </div>
            <div className={styles["col-5"]}>
              {/* <div className={styles["buy-info-block"]}>
                <div className={styles["title-bar"]}>
                  <h2>How to Buy</h2>
                </div>
                <ul className={styles["step-listing"]} style={{display:"flex",background:"white"}}>
                  <li>
                    <a>
                      <i className={styles["icon-search"]}></i>
                      <img src={search} alt="" />
                      Search
                    </a>
                  </li>
                  <li>
                    <a>
                      <i className="mdi-file-compare"></i>
                      <img src={compare} alt="" />
                      Compare
                    </a>
                  </li>
                  <li>
                    <a>
                      <i className={styles["icon-purchase"]}></i>
                      <img src={nigerian_sign} alt="" />
                      Purchase
                    </a>
                  </li>
                </ul>
                <div className={styles["search-form"]}>
                  <form id="form_index_search">
                    <input type="hidden" name="action" value="index_search" />
                    <div className={styles["insurance-type"]}>
                      <select
                        id="plan"
                        name="plan"
                        placeholder="Select Insurance Type"
                        style={{
                          width: "100%",
                          color: "#69c16b",
                          fontWeight: "bold",
                        }}
                        className={styles["chosen-select regcom"]}
                        tabindex="5"
                      >
                        <option value="">Select Insurance Type</option>
                        <option>Individual & Family</option>
                        <option>Corporate</option>
                        <option>Student</option>
                        <option>Travel</option>
                      </select>
                    </div>
                    <div id="age_div">
                      <input
                        type="text"
                        id="age"
                        name="age"
                        placeholder="Age"
                        style={{ fontWeight: "bold",padding:"13px 8px 13px 13px",width:"59px" }}
                      />
                    </div>
                    <div className={styles["clearfix"]}></div>
                    <div className={styles["marital-status"]}>
                      <select
                        id="marital_status"
                        name="marital_status"
                        placeholder="MARITAL STATUS"
                        style={{
                          width: "100%",
                          color: "#69c16b",
                          fontWeight: "bold",
                        }}
                        className={styles["chosen-select regcom"]}
                        tabindex="5"
                      >
                        <option value="">Select Marital Status</option>
                        <option>Single</option>
                        <option>Married</option>
                      </select>
                    </div>
                    <div className={styles["location"]}>
                      <select
                        name="state"
                        className={styles["chosen-select regcom"]}
                        id="state"
                        style={{
                          width: "100%",
                          color: "#69c16b",
                          fontWeight: "bold",
                        }}
                      >
                        <option value="">Select State</option>
                        <option>ABUJA FCT</option>
                        <option>ABIA</option>
                        <option>ADAMAWA</option>
                        <option>AKWA IBOM</option>
                        <option>ANAMBRA</option>
                        <option>BAUCHI</option>
                        <option>BAYELSA</option>
                        <option>BENUE</option>
                        <option>BORNO</option>
                        <option>CROSS RIVER</option>
                        <option>DELTA</option>
                        <option>EBONYI</option>
                        <option>EDO</option>
                        <option>EKITI</option>
                        <option>ENUGU</option>
                        <option>GOMBE</option>
                        <option>IMO</option>
                        <option>JIGAWA</option>
                        <option>KADUNA</option>
                        <option>KANO</option>
                        <option>KATSINA</option>
                        <option>KEBBI</option>
                        <option>KOGI</option>
                        <option>KWARA</option>
                        <option>LAGOS</option>
                        <option>NASSARAWA</option>
                        <option>NIGER</option>
                        <option>OGUN</option>
                        <option>ONDO</option>
                        <option>OSUN</option>
                        <option>OYO</option>
                        <option>PLATEAU</option>
                        <option>RIVERS</option>
                        <option>SOKOTO</option>
                        <option>TARABA</option>
                        <option>YOBE</option>
                        <option>ZAMFARA</option>
                      </select>
                    </div>
                    <div className={styles["clearfix"]}></div>
                    <div className={styles["search-btn"]}>
                      <input type="submit" value="Search" />
                    </div>
                    <div className={styles["clearfix"]}></div>
                  </form>
                </div>
              </div> */}
              <div className={styles["buy-info-block"]}>
              <div className={styles["title-bar"]}>
                <h2 className={styles["h2"]}>How to Buy</h2>
              </div>
              <ul className={styles["step-listing"]} style={{background:"white"}}>
                <li><a><i className={styles["icon-search"]}></i>Search</a></li>
                <li><a><i className={styles["icon-compare"]}></i>Compare</a></li>
                <li><a><i className={styles["icon-purchase"]}></i>Purchase</a></li>
              </ul>
              <div className={styles["search-form"]}>
                <form id="form_index_search">
                  <input type="hidden" name="action" value="index_search"/>
                  <div className={styles["insurance-type"]}>
                    <select id="plan" name="plan" placeholder="Select Insurance Type" style={{width:"100%",color: "#69c16b",fontWeight: "bold"}} className={styles["chosen-select regcom"]} tabindex="5">
                      <option value="">Select Insurance Type</option>
                      <option>Individual & Family</option>
                      <option>Corporate</option>
                      <option>State</option>
                      <option>Travel</option>
                    </select>
                  </div>
                  <div className={cx(styles["input-box"],styles["registercom"])} id="age_div">
                    <input type="text" id="age" name="age" placeholder="Age" style={{ fontWeight: "bold"}} />
                  </div>
                  <div className={styles["clearfix"]}></div>
                  <div className={styles["marital-status"]}>
                    <select id="marital_status" name="marital_status" placeholder="MARITAL STATUS" style={{width:"100%",color: "#69c16b",fontWeight: "bold"}} className={styles["chosen-select regcom"]} tabindex="5">
                      <option value="">Select Marital Status</option>
                      <option>Single</option>
                      <option>Married</option>

                    </select>
                  </div>
                  <div className={styles["location"]}>
                    <select name="state" className="chosen-select regcom" id="state" style={{width:"100%",color: "#69c16b",fontWeight: "bold"}}>
                      <option value="">Select State</option>
                      <option>ABUJA FCT</option>
                      <option>ABIA</option>
                      <option>ADAMAWA</option>
                      <option>AKWA IBOM</option>
                      <option>ANAMBRA</option>
                      <option>BAUCHI</option>
                      <option>BAYELSA</option>
                      <option>BENUE</option>
                      <option>BORNO</option>
                      <option>CROSS RIVER</option>
                      <option>DELTA</option>
                      <option>EBONYI</option>
                      <option>EDO</option>
                      <option>EKITI</option>
                      <option>ENUGU</option>
                      <option>GOMBE</option>
                      <option>IMO</option>
                      <option>JIGAWA</option>
                      <option>KADUNA</option>
                      <option>KANO</option>
                      <option>KATSINA</option>
                      <option>KEBBI</option>
                      <option>KOGI</option>
                      <option>KWARA</option>
                      <option>LAGOS</option>
                      <option>NASSARAWA</option>
                      <option>NIGER</option>
                      <option>OGUN</option>
                      <option>ONDO</option>
                      <option>OSUN</option>
                      <option>OYO</option>
                      <option>PLATEAU</option>
                      <option>RIVERS</option>
                      <option>SOKOTO</option>
                      <option>TARABA</option>
                      <option>YOBE</option>
                      <option>ZAMFARA</option>
                    </select>
                  </div>
                  <div className={styles["clearfix"]}></div>
                  <div className={styles["search-btn"]}>
                    <input type="submit" value="Search" />
                  </div>
                  <div className={styles["clearfix"]}></div>
                </form>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles["main-section"]}>
        <div className={styles["home-section-1"]}>
          <div className={styles["container"]}>
            <div className={cx(styles["row"],styles["home"])}>
              <div className={cx(styles["col-10"],styles["margin-top-20"])}>
                <div className={styles["row"]}>
                  <div className={styles["col-7"]}>
                    <div className={styles["block-1"]}>
                      <h3>
                        Insurance<span>Plans</span>
                        <strong>(per annum)</strong>
                      </h3>
                      <ul className={styles["plan-img-listing"]}>
                        <li>
                          <a href="plans/1">
                            <img src={Insurance1} alt="insurance-img" />
                            <div className={cx(styles["traingle"],styles["traingle-green"])}>
                              <div className={styles["from"]}>From ?</div>
                              <p>35,000</p>
                            </div>
                            <div className={styles["caption"]}>
                              <p>Individual &amp; Family</p>
                            </div>
                          </a>
                        </li>
                        <li>
                          <a href="/plans/2">
                            <img src={Insurance2} alt="insurance-img" />
                            <div className={cx(styles["traingle"],styles["traingle-blue"])}>
                              <div className={styles["from"]}>From ?</div>
                              <p>1,50,000</p>
                            </div>
                            <div className={styles["caption"]}>
                              <p>Corporate</p>
                            </div>
                          </a>
                        </li>
                        <li>
                          <a
                            href="/plans/4"
                            className={styles["home-student-plan"]}
                          >
                            <img src={Insurance3} alt="insurance-img" />
                            <div className={cx(styles["traingle"],styles["traingle-blue"])}>
                              <div className={styles["from"]}>From ?</div>
                              <p>15,000</p>
                            </div>
                            <div className={styles["caption"]}>
                              <p> State</p>
                            </div>
                          </a>
                        </li>
                        <li>
                          <a href="/plans/3" className={styles["travel"]}>
                            <img src={Insurance4} alt="insurance-img" />
                            <div className={cx(styles["traingle"],styles["traingle-green"])}>
                              <div className={styles["from"]}>From ?</div>
                              <p>250</p>
                            </div>
                            <div className={styles["caption"]}>
                              <p>Travel</p>
                            </div>
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className={cx(styles["block-2"],styles["margin-top-30"])}>
                      <h3>
                        Client<span>Speak</span>
                        <div className={styles["content-control"]}>
                          {" "}
                          <a
                            className={cx(styles["carousel-control"],styles["carousel-control-left"])}
                            href="#carousel-testimonial"
                            data-slide="prev"
                          ></a>{" "}
                          <a
                            className={cx(styles["carousel-control"],styles["carousel-control-right"])}
                            href="#carousel-testimonial"
                            data-slide="next"
                          ></a>{" "}
                        </div>
                      </h3>
                      <div
                        id="carousel-testimonial"
                        className={styles["carousel-testimonial carousel-fade slide"]}
                      >
                        <div className={styles["carousel-inner"]}>
                          <div className={styles["active item "]}>
                            <div className={styles["testimonial"]}>
                              {" "}
                              <img src={client1} alt="client-img" />
                              <p>
                                'Choosing the best Health Insurance plan for my
                                family has been made very easy and objective
                                using the NaijaMedical.com platform! It saves
                                you the hassle of calling (if you can reach
                                them) or going from one HMO office to the next
                                trying to decide on the best offer based on your
                                limited budget! Now I can search, compare and
                                purchase the best policies right from the
                                comfort of my home - free! The site is friendly
                                and very easy to use......I strongly recommend
                                it to everyone to use!!
                              </p>
                              <span>- Mr Adewale</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={styles["col-5"]}>
                    <div className={styles["block-1"]}>
                      <h3>
                        Latest<span>News</span>
                      </h3>
                      <ul className={styles["tweet-listing"]}>
                        <li>
                          <a
                            href="#"
                            target="_blank"
                          >
                            <i className={styles["icon-calendar"]}></i>
                            <span>N</span>
                            igeria's National Health Bill 2014 passed into law :
                            The Nigerian Senate has passed the highly
                            controversial
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            target="_blank"
                          >
                            <i className={styles["icon-calendar"]}></i>
                            <span>N</span>
                            ovartis launches new high quality antimalarial
                            formulation of Coartem for Africa :
                          </a>
                        </li>
                      </ul>
                      <div className={styles["inner-slider"]}>
                        <div
                          id="carousel-news"
                          className={cx(styles["carousel-news"],styles["carousel-fade"],styles["slide"])}
                        >
                          <ol className={styles["carousel-indicators"]}>
                            <li
                              className={styles["active"]}
                              data-target="#carousel-news"
                              data-slide-to="0"
                            >
                            </li>
                            <li
                              data-target="#carousel-news"
                              data-slide-to="1"
                            ></li>
                            <li
                              data-target="#carousel-news"
                              data-slide-to="2"
                            ></li>
                            <li
                              data-target="#carousel-news"
                              data-slide-to="3"
                            ></li>
                          </ol>

                          <div className={styles["carousel-inner"]}>
                            <div className={styles["active item"]}>
                              <img src={slider1} alt="inner-slider" />
                            </div>
                            <div className={styles["item"]}>
                              <img src={slider2} alt="inner-slider" />
                            </div>
                            <div className={styles["item"]}>
                              <img src={slider1} alt="inner-slider" />
                            </div>
                            <div className={styles["item"]}>
                              <img src={slider2} alt="inner-slider" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={cx(styles["block-2"],styles["margin-top-30"])}>
                      <h3>
                        Popular<span>Plans</span>
                        <div className={styles["content-control"]}>
                          {" "}
                          <a
                            className={cx(styles["carousel-control"],styles["carousel-control-left"])}
                            href="#carousel-popular-plan"
                            data-slide="prev"
                          ></a>{" "}
                          <a
                            className={cx(styles["carousel-control"],styles["carousel-control-right"])}
                            href="#carousel-popular-plan"
                            data-slide="next"
                          ></a>{" "}
                        </div>
                      </h3>
                      <div
                        id="carousel-popular-plan"
                        className={cx(styles["carousel-popular-plan"],styles["slide"])}
                      >
                        <div className={styles["carousel-inner"]}>
                          <div className={styles["active item"]}>
                            <div className={styles["popular-plan"]}>
                              {" "}
                              <i className={styles["icon-register"]}></i>
                              <h4>
                                <a href="#">Coming Soon</a>
                              </h4>
                              <p>Travel Insuarance</p>
                            </div>
                          </div>
                          <div className={styles["item"]}>
                            <div className={styles["popular-plan"]}>
                              {" "}
                              <i className={styles["icon-register"]}></i>
                              <h4>
                                <a href="#">Specialist consultations</a>
                              </h4>
                              <p>
                                consultations with Pediatricians; Obstetricians
                                and Gynecologists; Physicians, Surgeons,
                                Physiotherapists and Psychiatrists.{" "}
                              </p>
                            </div>
                          </div>
                          <div className={styles["item"]}>
                            <div className={styles["popular-plan"]}>
                              {" "}
                              <i className={styles["icon-register"]}></i>
                              <h4>
                                <a href="#">Maternity care</a>
                              </h4>
                              <p>
                                Maternity care: this plan covers Antenatal Care
                                only and Normal delivery for up to two (2) live
                                births.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={styles["clearfix"]}></div>
                  <div className={cx(styles["our-partner"],styles["margin-top-30"])}>
                    <h3>
                      Our<span>Partners</span>
                      <div className={styles["content-control"]}>
                        {" "}
                        <div className={cx(styles["carousel-control"],styles["carousel-control-left"])}>
                        <a
                          href="#carousel-client"
                          data-slide="prev"
                        ></a>
                        </div>{" "}
                        <a
                          className={cx(styles["carousel-control"],styles["carousel-control-right"])}
                          href="#carousel-client"
                          data-slide="next"
                        ></a>{" "}
                      </div>
                    </h3>
                    <div id="carousel-client" className={cx(styles["carousel-client"],styles["slide"])}>
                      <div className={styles["carousel-inner"]}>
                        <div className={styles["active item"]}>
                          <ul className={styles["client-listing"]}>
                            <li>
                              <a href="#">
                                <img src={partner1} alt="client-img" />
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <img src={partner2} alt="client-img" />
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <img src={partner3} alt="client-img" />
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <img src={partner4} alt="client-img" />
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <img src={partner5} alt="client-img" />
                              </a>
                            </li>
                          </ul>
                        </div>
                        <div className={styles["item"]}>
                          <ul className={styles["client-listing"]}>
                            <li>
                              <a href="#">
                                <img src={partners1} alt="client-img" />
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <img src={partners2} alt="client-img" />
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <img src={partners3} alt="client-img" />
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <img src={partners4} alt="client-img" />
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <img src={partners5} alt="client-img" />
                              </a>
                            </li>
                          </ul>
                        </div>
                        <div className={styles["item"]}>
                          <ul className={styles["client-listing"]}>
                            <li>
                              <a href="#">
                                <img src={partner1} alt="client-img" />
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <img src={partner2} alt="client-img" />
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <img src={partner3} alt="client-img" />
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <img src={partner4} alt="client-img" />
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <img src={partner5} alt="client-img" />
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles["col-2"]}>
                <div className={cx(styles["sidebar"],styles["margin-top-20"])}>
                  <img src={sidebar1} alt="sidebar-1-img" />{" "}
                </div>
                <div className={styles["sidebar"]}>
                  <img src={sidebar2} alt="sidebar-2-img" />{" "}
                </div>
                <div className={styles["sidebar"]}>
                  <img src={sidebar3} alt="sidebar-2-img" />{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles["advert"]}>
        <div className={styles["container"]}>
          <div className={styles["row"]}>
            <a href="http://www.medicwestafrica.com/" target="_blank">
              <img src={gif} alt="add1" />
            </a>
          </div>
        </div>
      </div>

      {/* <div className="footer-section">
      <div className="footer margin-top-15">
        <div className="container">
          <div className="row">
            <div className="col-2">
              <div className="inner">
                <h5>Products</h5>
                <ul className="footer-links">
                  <li><a href="view/individual-plan.php">Individual Plan</a></li>
                  <li><a href="view/corporate-plan.php">Corporate Plan</a></li>
                  <li><a href="view/buy_plan.php">Family Plan</a></li>
                </ul>
              </div>
            </div>
            <div className="col-3">
              <div className="inner">
                <h5>Services</h5>
                <ul className="footer-links">
                  <li><a href="view/corporate-plan.php">Health Insurance Plans</a></li>
                  <li><a href="view/buy_plan.php">Medical Plans</a></li>
                  <li><a href="view/find-a-hospital.php">Find a Hospital</a></li>
                </ul>
              </div>
            </div>
            <div className="col-3">
              <div className="inner">
                <h5>Company</h5>
                <ul className="footer-links">
                  <li><a href="view/about-us.php">About Us</a></li>
                  <li><a href="view/how-it-works.php">How It Works</a></li>
                  <li><a href="view/contact-us.php">Contact Us</a></li>
                </ul>
              </div>
            </div>
            <div className="col-4">
              <div className="inner">
                <h5 className="social-media">Social Media</h5>
                <ul className="social-icon">
                  <li><a href="javascript:void(0)"><i className="icon-facebook"></i></a></li>
                  <li><a href="javascript:void(0)"><i className="icon-twitter"></i></a></li>
                  <li><a href="javascript:void(0)"><i className="icon-gplus"></i></a></li>
                </ul>
                <div className="newsletter-block margin-top-30">
                  <h5>Newsletter</h5>
                  <p>Hear about new features, promos, discounts and more.</p>
                  <div className="input-box">
                    <input type="text" value="EMAIL ID" onfocus="javascript: if(this.value == 'EMAIL ID'){ this.value = ''; }" onblur="javascript: if(this.value==''){this.value='EMAIL ID';}" />
                    <button type="submit" className="subscribe-submit"><i className="icon-subscribe"></i></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="site-info">
        <div className="container">
          <div className="links ">
            <p>Copyright � 2017, paperbirdtech.com, All rights reserved.<a href="javascript:void(0)">Terms of use</a> | <a href="javascript:void(0)">Privacy</a></p>
          </div>
        </div>
      </div>
    </div> */}
    </div>
  );
}
// onSubmit={onLogin}

const mapStateToProps = (state) => {
  return {
    errorMessage: state.auth.errorMessage,
    successMessage: state.auth.successMessage,
    showLoading: state.auth.showLoading,
  };
};
export default  (connect(mapStateToProps)(Home));
