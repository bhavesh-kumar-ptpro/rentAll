/// Menu
import Metismenu from "metismenujs";
import React, { Component, useContext, useEffect, useState } from "react";
/// Scroll
import PerfectScrollbar from "react-perfect-scrollbar";
/// Link
import { Link } from "react-router-dom";
import { useScrollPosition } from "@n8tb1t/use-scroll-position";
import { ThemeContext } from "../../../context/ThemeContext";

/// Image
//import profile from "../../../images/profile/pic1.jpg";
//import plus from "../../../images/plus.png";

class MM extends Component {
  componentDidMount() {
    this.$el = this.el;
    this.mm = new Metismenu(this.$el);
  }
  componentWillUnmount() {}
  render() {
    return (
      <div className="mm-wrapper">
        <ul className="metismenu" ref={(el) => (this.el = el)}>
          {this.props.children}
        </ul>
      </div>
    );
  }
}

const SideBar = () => {
  const { iconHover, sidebarposition, headerposition, sidebarLayout } =
    useContext(ThemeContext);
  useEffect(() => {
    var btn = document.querySelector(".nav-control");
    var aaa = document.querySelector("#main-wrapper");
    function toggleFunc() {
      return aaa.classList.toggle("menu-toggle");
    }
    btn.addEventListener("click", toggleFunc);

    //handleheartBlast.addEventListener('click', heartBlast);
  }, []);
  //sidebar icon Heart blast
  var handleheartBlast = document.querySelector(".heart");
  function heartBlast() {
    return handleheartBlast.classList.toggle("heart-blast");
  }

  // For scroll
  const [hideOnScroll, setHideOnScroll] = useState(true);
  useScrollPosition(
    ({ prevPos, currPos }) => {
      const isShow = currPos.y > prevPos.y;
      if (isShow !== hideOnScroll) setHideOnScroll(isShow);
    },
    [hideOnScroll]
  );

  //let scrollPosition = useScrollPosition();
  /// Path
  let path = window.location.pathname;
  path = path.split("/");
  path = path[path.length - 1];
  /// Active menu
  let deshBoard = ["dashboard"],
    HMOM = [
      // "",
      "AddHMO",
      "ViewHMO",
    ],
    HospitalM = [
      // "",
      "AddHospital",
      "ViewHospitals",
    ],
    HMOMap = [
      // "",
      "add_hh_mapping",
      "view_hh_mapping",
      "upload_hh_mapping",
    ],
    ReportM = [
      "view_individual_plan",
      "view_corporate_plan",
      "view_student_plan",
      "view_travel_plan",
      "view_state_plan",
    ],
    FAQs = ["add_faq", "view_faq"],
    Clientspeak=["add_client_speak","view_client_speak"],
    Viewuser=["view_user"],
    LatestNews=["add_news","view_news"],
    AddMembers=["add_member","edit_member","view_member"],
    AddHowItWorks=["add_how","edit_how/:id","view_how"],
    plugins = [
      "uc-select2",
      "uc-nestable",
      "uc-sweetalert",
      "uc-toastr",
      "uc-noui-slider",
      "map-jqvmap",
      "uc-lightgallery",
    ];
  return (
    <div
      className={`deznav ${iconHover} ${
        sidebarposition.value === "fixed" &&
        sidebarLayout.value === "horizontal" &&
        headerposition.value === "static"
          ? hideOnScroll > 120
            ? "fixed"
            : ""
          : ""
      }`}
    >
      <PerfectScrollbar className="deznav-scroll">
        <MM className="metismenu" id="menu">
          <li className={`${deshBoard.includes(path) ? "mm-active" : ""}`}>
            <Link to="/admin/view/dashboard">
              <i className="flaticon-025-dashboard"></i>
              <span className="nav-text">Dashboard</span>
            </Link>
          </li>
          <li className={`${HMOM.includes(path) ? "mm-active" : ""}`}>
            <Link className="has-arrow ai-icon" to="#">
              <i className="flaticon-050-info"></i>
              <span className="nav-text">HMO Management</span>
            </Link>
            <ul>
              <li>
                <Link
                  className={`${path === "AddHMO" ? "mm-active" : ""}`}
                  to="/admin/view/AddHMO"
                >
                  Add HMO
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "ViewHMO" ? "mm-active" : ""}`}
                  to="/admin/view/ViewHMO"
                >
                  View HMO
                </Link>
              </li>
              {/* <li className={`${email.includes(path) ? "mm-active" : ""}`}><Link className="has-arrow" to="#" >Email</Link>
                <ul  className={`${email.includes(path) ? "mm-show" : ""}`}>
                  <li><Link className={`${ path === "email-compose" ? "mm-active" : ""}`} to="/email-compose">Compose</Link></li>
                  <li><Link className={`${path === "email-inbox" ? "mm-active" : ""}`} to="/email-inbox">Inbox</Link></li>
                  <li><Link className={`${path === "email-read" ? "mm-active" : ""}`} to="/email-read">Read</Link></li>
                </ul>
              </li>
              <li><Link className={`${path === "app-calender" ? "mm-active" : ""}`}to="/app-calender">Calendar</Link></li>
              <li className={`${shop.includes(path) ? "mm-active" : ""}`}><Link className="has-arrow" to="#" >Shop</Link>
                <ul  className={`${shop.includes(path) ? "mm-show" : ""}`}>
                  <li><Link className={`${ path === "ecom-product-grid" ? "mm-active" : ""}`} to="/ecom-product-grid">Product Grid</Link></li>
                  <li><Link className={`${ path === "ecom-product-list" ? "mm-active" : ""}`} to="/ecom-product-list">Product List</Link></li>
                  <li><Link className={`${ path === "ecom-product-detail" ? "mm-active" : "" }`} to="/ecom-product-detail">Product Details</Link></li>
                  <li><Link className={`${ path === "ecom-product-order" ? "mm-active" : "" }`} to="/ecom-product-order">Order</Link></li>
                  <li><Link className={`${ path === "ecom-checkout" ? "mm-active" : ""}`} to="/ecom-checkout">Checkout</Link></li>
                  <li><Link className={`${ path === "ecom-invoice" ? "mm-active" : "" }`} to="/ecom-invoice">Invoice</Link></li>
                  <li><Link className={`${ path === "ecom-customers" ? "mm-active" : "" }`} to="/ecom-customers">Customers</Link></li>
                </ul>
              </li> */}
            </ul>
          </li>
          <li className={`${HospitalM.includes(path) ? "mm-active" : ""}`}>
            <Link className="has-arrow ai-icon" to="#">
              <i className="flaticon-041-graph"></i>
              <span className="nav-text">Hospital Management</span>
            </Link>
            <ul>
              <li>
                <Link
                  className={`${path === "AddHospital" ? "mm-active" : ""}`}
                  to="/admin/view/AddHospital"
                >
                  Add Hospital
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "ViewHospitals" ? "mm-active" : ""}`}
                  to="/admin/view/ViewHospitals"
                >
                  View Hospital
                </Link>
              </li>
              {/* <li>
                <Link
                  className={`${path === "chart-chartist" ? "mm-active" : ""}`}
                  to="/chart-chartist"
                >
                  Chartist
                </Link>
              </li> */}
              {/* <li>
                <Link
                  className={`${path === "chart-sparkline" ? "mm-active" : ""}`}
                  to="/chart-sparkline"
                >
                  Sparkline
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "chart-apexchart" ? "mm-active" : ""}`}
                  to="/chart-apexchart"
                >
                  Apexchart
                </Link>
              </li> */}
            </ul>
          </li>
          <li className={`${HMOMap.includes(path) ? "mm-active" : ""}`}>
            <Link className="has-arrow ai-icon" to="#">
              <i className="flaticon-086-star"></i>
              <span className="nav-text">HMO Hospital Mapping</span>
            </Link>
            <ul>
              <li>
                <Link
                  className={`${path === "add_hh_mapping" ? "mm-active" : ""}`}
                  to="/admin/view/add_hh_mapping"
                >
                  Add Mapping
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "view_hh_mapping" ? "mm-active" : ""}`}
                  to="/admin/view/view_hh_mapping"
                >
                  View Mapping
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "upload_hh_mapping" ? "mm-active" : ""}`}
                  to="/admin/view/upload_hh_mapping"
                >
                  Upload Mapping
                </Link>
              </li>
              {/* <li>
                <Link
                  className={`${path === "UploadMapping" ? "mm-active" : ""}`}
                  to="/ui-badge"
                >
                  Upload Mapping
                </Link>
              </li> */}
              {/* <li>
                <Link
                  className={`${path === "ui-button" ? "mm-active" : ""}`}
                  to="/ui-button"
                >
                  Button
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "ui-modal" ? "mm-active" : ""}`}
                  to="/ui-modal"
                >
                  Modal
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "ui-button-group" ? "mm-active" : ""}`}
                  to="/ui-button-group"
                >
                  Button Group
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "ui-list-group" ? "mm-active" : ""}`}
                  to="/ui-list-group"
                >
                  List Group
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "ui-card" ? "mm-active" : ""}`}
                  to="/ui-card"
                >
                  Cards
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "ui-carousel" ? "mm-active" : ""}`}
                  to="/ui-carousel"
                >
                  Carousel
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "ui-dropdown" ? "mm-active" : ""}`}
                  to="/ui-dropdown"
                >
                  Dropdown
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "ui-popover" ? "mm-active" : ""}`}
                  to="/ui-popover"
                >
                  Popover
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "ui-progressbar" ? "mm-active" : ""}`}
                  to="/ui-progressbar"
                >
                  Progressbar
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "ui-tab" ? "mm-active" : ""}`}
                  to="/ui-tab"
                >
                  Tab
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "ui-typography" ? "mm-active" : ""}`}
                  to="/ui-typography"
                >
                  Typography
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "ui-pagination" ? "mm-active" : ""}`}
                  to="/ui-pagination"
                >
                  Pagination
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "ui-grid" ? "mm-active" : ""}`}
                  to="/ui-grid"
                >
                  Grid
                </Link>
              </li> */}
            </ul>
          </li>
          {/* <li className={`${plugins.includes(path) ? "mm-active" : ""}`}>
            <Link className="has-arrow ai-icon" to="#" >
              <i className="flaticon-045-heart"></i><span className="nav-text">Plan Management</span>
            </Link>
            <ul >
              <li><Link className={`${path === "uc-select2" ? "mm-active" : ""}`} to="/uc-select2">Add Plan</Link></li>
              <li><Link className={`${path === "uc-nestable" ? "mm-active" : ""}`} to="/uc-nestable">View Plan</Link></li>
              <li><Link className={`${path === "uc-noui-slider" ? "mm-active" : ""}`} to="/uc-noui-slider">Upload Plan</Link></li>
              <li><Link className={`${path === "uc-sweetalert" ? "mm-active" : ""}`} to="/uc-sweetalert">Sweet Alert</Link></li>
              <li><Link className={`${path === "uc-toastr" ? "mm-active" : ""}`} to="/uc-toastr">Toastr</Link></li>
              <li><Link className={`${path === "map-jqvmap" ? "mm-active" : ""}`} to="/map-jqvmap">Jqv Map</Link></li>
              <li><Link className={`${path === "uc-lightgallery" ? "mm-active" : ""}`} to="/uc-lightgallery">Light Gallery</Link></li>
            </ul>
          </li> */}
      <li className={`${plugins.includes(path) ? "mm-active" : ""}`}>
            <Link className="has-arrow ai-icon" to="#" >
              <i className="flaticon-045-heart"></i><span className="nav-text">Plan Management</span>
            </Link>
            <ul >
              <li><Link className={`${path === "admin/view/add_plan" ? "mm-active" : ""}`} to="/admin/view/add_plan">Add Plan</Link></li>
              <li><Link className={`${path === "admin/view/view_plan" ? "mm-active" : ""}`} to="/admin/view/view_plan">View Plan</Link></li>
              <li><Link className={`${path === "admin/view/upload_plan" ? "mm-active" : ""}`} to="/admin/view/upload_plan">Upload Plan</Link></li>
              {/* <li><Link className={`${path === "uc-sweetalert" ? "mm-active" : ""}`} to="/uc-sweetalert">Sweet Alert</Link></li>
              <li><Link className={`${path === "uc-toastr" ? "mm-active" : ""}`} to="/uc-toastr">Toastr</Link></li>
              <li><Link className={`${path === "map-jqvmap" ? "mm-active" : ""}`} to="/map-jqvmap">Jqv Map</Link></li>
              <li><Link className={`${path === "uc-lightgallery" ? "mm-active" : ""}`} to="/uc-lightgallery">Light Gallery</Link></li> */}
            </ul>
          </li>
          <li className={`${ReportM.includes(path) ? "mm-active" : ""}`}>
            <Link className="has-arrow ai-icon" to="#">
              <i className="flaticon-087-stop"></i>
              <span className="nav-text">Manage orders</span>
            </Link>
            <ul>
              <li>
                <Link
                  className={`${
                    path === "view_individual_plan" ? "mm-active" : ""
                  }`}
                  to="/admin/view/view_individual_plan"
                >
                  View Individual Plan
                </Link>
              </li>
              <li>
                <Link
                  className={`${
                    path === "view_corporate_plan" ? "mm-active" : ""
                  }`}
                  to="/admin/view/view_corporate_plan"
                >
                  View Corporate Plan
                </Link>
              </li>
              <li>
                <Link
                  className={`${
                    path === "view_corporate_plan" ? "mm-active" : ""
                  }`}
                  to="/admin/view/view_state_plan"
                >
                  View State Plan
                </Link>
              </li>
              {/* <li><Link className={`${path === "view_student_plan" ? "mm-active" : ""}`} to="/admin/view/view_student_plan">View Student Plan</Link></li> */}
              <li>
                <Link
                  className={`${
                    path === "view_travel_plan" ? "mm-active" : ""
                  }`}
                  to="/admin/view/view_travel_plan"
                >
                  View Travel Plan
                </Link>
              </li>
              {/* <li><Link className={`${path === "redux-form" ? "mm-active" : ""}`} to="/redux-form">Redux Form</Link></li>
                  <li><Link className={`${path === "redux-wizard" ? "mm-active" : ""}`} to="/redux-wizard">Redux Wizard</Link></li> */}
            </ul>
          </li>
          <li className={`${FAQs.includes(path) ? "mm-active" : ""}`}>
          <Link className="has-arrow ai-icon" to="#">
              <i className="flaticon-087-stop"></i>
              <span className="nav-text">FAQ Management</span>
            </Link>
            <ul>
              <li>
                <Link
                  className={`${
                    path === "add_faq" ? "mm-active" : ""
                  }`}
                  to="/admin/view/add_faq"
                >
                  Add FAQ
                </Link>
              </li>
              <li>
                <Link
                  className={`${
                    path === "view_faq" ? "mm-active" : ""
                  }`}
                  to="/admin/view/view_faq"
                >
                  View FAQs
                </Link>
              </li>
            </ul>
          </li>
          <li className={`${Clientspeak.includes(path) ? "mm-active" : ""}`}>
            <Link className="has-arrow ai-icon" to="#">
              <i className="flaticon-087-stop"></i>
              <span className="nav-text">Testimonials</span>
            </Link>
            <ul>
              <li>
                <Link
                  className={`${path === "add_client_speak" ? "mm-active" : ""
                    }`}
                  to="/admin/view/add_clientDescription"
                >
                  Add Testimonials
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "view_client_speak" ? "mm-active" : ""
                    }`}
                  to="/admin/view/view_clientDescription"
                >
                  View Testimonials
                </Link>
              </li>
            </ul>
          </li>
          <li className={`${AddMembers.includes(path) ? "mm-active" : ""}`}>
            <Link className="has-arrow ai-icon" to="#">
              <i className="flaticon-087-stop"></i>
              <span className="nav-text">About us</span>
            </Link>
            <ul>
              <li>
                <Link
                  className={`${path === "add_member" ? "mm-active" : ""
                    }`}
                  to="/admin/view/add_member"
                >
                  Add About us
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "view_member" ? "mm-active" : ""
                    }`}
                  to="/admin/view/view_member"
                >
                  View About us
                </Link>
              </li>
            </ul>
          </li>
          <li className={`${AddHowItWorks.includes(path) ? "mm-active" : ""}`}>
            <Link className="has-arrow ai-icon" to="#">
              <i className="flaticon-087-stop"></i>
              <span className="nav-text">How it works</span>
            </Link>
            <ul>
              <li>
                <Link
                  className={`${path === "add_member" ? "mm-active" : ""
                    }`}
                  to="/admin/view/add_how"
                >
                  Add How it works
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "view_member" ? "mm-active" : ""
                    }`}
                  to="/admin/view/view_how"
                >
                  View How it works
                </Link>
              </li>
            </ul>
          </li>

          <li className={`${Viewuser.includes(path) ? "mm-active" : ""}`} >
            <Link className="has-arrow ai-icon" to="#">
              <i className="flaticon-087-stop"></i>
              <span className="nav-text">View User</span>
            </Link>
            <ul>
              <li>
                <Link
                  className={`${path === "view_user" ? "mm-active" : ""
                    }`}
                  to="/admin/view/view_user"
                >
                  View User
                </Link>
              </li>
            </ul>
          </li>

          <li className={`${LatestNews.includes(path) ? "mm-active" : ""}`}>
            <Link className="has-arrow ai-icon" to="#">
              <i className="flaticon-087-stop"></i>
              <span className="nav-text">Latest News</span>
            </Link>
            <ul>
              <li>
                <Link
                  className={`${path === "add_news" ? "mm-active" : ""
                    }`}
                  to="/admin/view/add_news"
                >
                  Add News
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "view_news" ? "mm-active" : ""
                    }`}
                  to="/admin/view/view_news"
                >
                  View News
                </Link>
              </li>
            </ul>
          </li>

          {/*  <li className={`${forms.includes(path) ? "mm-active" : ""}`}>
            <Link className="has-arrow ai-icon" to="#" >
              <i className="flaticon-072-printer"></i>
              <span className="nav-text forms">Forms</span>
            </Link>
            <ul >
              <li>
                <Link
                  className={`${path === "form-element" ? "mm-active" : ""}`}
                  to="/form-element"
                >
                  Form Elements
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "form-wizard" ? "mm-active" : ""}`}
                  to="/form-wizard"
                >
                  Wizard
                </Link>
              </li>
              <li>
                <Link
                  className={`${
                    path === "form-editor" ? "mm-active" : ""
                  }`}
                  to="/form-editor"
                >
                  CkEditor
                </Link>
              </li>
			         <li>
                <Link
                  className={`${path === "form-pickers" ? "mm-active" : ""}`}
                  to="/form-pickers"
                >
                  Pickers
                </Link>
              </li> 
              <li>
                <Link
                  className={`${
                    path === "form-validation" ? "mm-active" : ""
                  }`}
                  to="/form-validation"
                >
                  Form Validate
                </Link>
              </li>
            </ul>
          </li>
          <li className={`${table.includes(path) ? "mm-active" : ""}`}>
            <Link className="has-arrow ai-icon" to="#" ><i className="flaticon-043-menu"></i><span className="nav-text">Table</span></Link>
            <ul>
                <li>
                  <Link className={`${ path === "table-filtering" ? "mm-active" : "" }`} to="/table-filtering">
                    Table Filtering
                  </Link>
                </li>
                <li>
                  <Link className={`${ path === "table-sorting" ? "mm-active" : "" }`} to="/table-sorting">
                    Table Sorting
                  </Link>
                </li>
                <li>
                  <Link className={`${ path === "table-bootstrap-basic" ? "mm-active" : "" }`} to="/table-bootstrap-basic">
                    Bootstrap
                  </Link>
                </li>
                <li>
                  <Link className={`${ path === "table-datatable-basic" ? "mm-active" : ""}`} to="/table-datatable-basic">
                    Datatable
                  </Link>
                </li>
            </ul>
          </li>
          <li className={`${pages.includes(path) ? "mm-active" : ""}`}>
            <Link className="has-arrow ai-icon" to="#" >
              <i className="flaticon-022-copy"></i>
              <span className="nav-text">Pages</span>
            </Link>
            <ul >
              <li className={`${error.includes(path) ? "mm-active" : ""}`}>
                <Link className="has-arrow" to="#" >Error</Link>
                <ul>
                  <li><Link className={`${ path === "page-error-400" ? "mm-active" : "" }`} to="/page-error-400">Error 400</Link></li>
                  <li><Link className={`${ path === "page-error-403" ? "mm-active" : "" }`} to="/page-error-403">Error 403</Link></li>
                  <li><Link className={`${ path === "page-error-404" ? "mm-active" : "" }`} to="/page-error-404">Error 404</Link></li>
                  <li><Link className={`${ path === "page-error-500" ? "mm-active" : "" }`} to="/page-error-500">Error 500</Link></li>
                  <li><Link className={`${ path === "page-error-503" ? "mm-active" : "" }`} to="/page-error-503">Error 503</Link></li>
                </ul>
              </li>
              <li>
                <Link
                  className={`${
                    path === "page-lock-screen" ? "mm-active" : ""
                  }`}
                  to="/page-lock-screen"
                >
                  Lock Screen
                </Link>
              </li>
            </ul>
          </li> */}
        </MM>
        {/* <div className="plus-box">
            <p className="fs-14 font-w600 mb-2">Generata monthly <br/>report more easier <br/>than before</p>
            <Link to={"#"} className="btn btn-light btn-sm fs-14 text-black">Learn more</Link>
          </div>
          <div className="copyright">
            <p><strong>Griya Real Estate Admin</strong> © 2023 All Rights Reserved</p>
            <p className="fs-12">Made with <span className="heart" onClick={()=>heartBlast()}></span> by DexignZone</p>
          </div> */}
      </PerfectScrollbar>
    </div>
  );
};

export default SideBar;
