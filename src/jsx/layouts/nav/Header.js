import React from "react";

import { Link } from "react-router-dom";
/// Scroll
import PerfectScrollbar from "react-perfect-scrollbar";

/// Image
// import profile from "../../../images/avatar/profile-1.jpg";
// import avatar from "../../../images/avatar/1.jpg";
import { Dropdown } from "react-bootstrap";
import LogoutPage from './Logout';

const Header = ({ onNote }) => {
  /* var path = window.location.pathname.split("/");
  var name = path[path.length - 1].split("-");
  var filterName = name.length >= 3 ? name.filter((n, i) => i > 0) : name;
   var finalName = filterName.includes("app")
    ? filterName.filter((f) => f !== "app")
    : filterName.includes("ui")
    ? filterName.filter((f) => f !== "ui")
    : filterName.includes("uc")
    ? filterName.filter((f) => f !== "uc")
    : filterName.includes("basic")
    ? filterName.filter((f) => f !== "basic")
    : filterName.includes("jquery")
    ? filterName.filter((f) => f !== "jquery")
    : filterName.includes("table")
    ? filterName.filter((f) => f !== "table")
    : filterName.includes("page")
    ? filterName.filter((f) => f !== "page")
    : filterName.includes("email")
    ? filterName.filter((f) => f !== "email")
    : filterName.includes("ecom")
    ? filterName.filter((f) => f !== "ecom")
    : filterName.includes("chart")
    ? filterName.filter((f) => f !== "chart")
    : filterName.includes("editor")
    ? filterName.filter((f) => f !== "editor")
    : filterName;  */
  return (
    <div className="header">
      <div className="header-content">
        <nav className="navbar navbar-expand">
          <div className="collapse navbar-collapse justify-content-between">
            <div className="header-left">
				{/* <div
					className="dashboard_bar"
					style={{ textTransform: "capitalize" }}
				  >
					{finalName.join(" ").length === 0
					  ? "Dashboard"
					  : finalName.join(" ") === "dashboard dark"
					  ? "Dashboard"
					  : finalName.join(" ")}
				</div> */}
				{/* <div className="me-5 agenda">
					<Link to={"#"} className="btn btn-primary"><i className="fas fa-calendar"></i>Agenda (24)</Link>
				</div> */}
				{/* <div className="nav-item">
					<div className="input-group search-area">
						<input type="text" className="form-control" placeholder="Search Here" />
						<span className="input-group-text"><Link to={"#"}><i className="flaticon-381-search-2"></i></Link></span>
					</div>
				</div> */}
            </div>
            <ul className="navbar-nav header-right main-notification">
			  {/* <Dropdown
                as="li"
                className="nav-item  notification_dropdown "
              >
                <Dropdown.Toggle
                  variant=""
                  as="a"
                  className="nav-link  ai-icon i-false c-pointer"
                  // href="#"
                  role="button"
                  data-toggle="dropdown"
                >
					<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M10.4524 25.6682C11.0605 27.0357 12.409 28 14.0005 28C15.592 28 16.9405 27.0357 17.5487 25.6682C16.4265 25.7231 15.2594 25.76 14.0005 25.76C12.7417 25.76 11.5746 25.723 10.4524 25.6682Z" fill="#737B8B"/>
						<path d="M26.3532 19.74C24.877 17.8785 22.3996 14.2195 22.3996 10.64C22.3996 7.09073 20.1193 3.89758 16.7996 2.72382C16.7593 1.21406 15.5183 0 14.0007 0C12.482 0 11.2422 1.21406 11.2018 2.72382C7.88101 3.89758 5.6007 7.09073 5.6007 10.64C5.6007 14.2207 3.1244 17.8785 1.64712 19.74C1.15433 20.3616 1.00197 21.1825 1.24058 21.9363C1.47354 22.6721 2.05367 23.2422 2.79288 23.4595C4.08761 23.8415 6.20997 24.2715 9.44682 24.491C10.8479 24.5851 12.3543 24.64 14.0008 24.64C15.646 24.64 17.1525 24.5851 18.5535 24.491C21.7915 24.2715 23.9128 23.8415 25.2086 23.4595C25.9478 23.2422 26.5268 22.6722 26.7598 21.9363C26.9983 21.1825 26.8449 20.3616 26.3532 19.74Z" fill="#737B8B"/>
					</svg>
					<span className="badge light text-white bg-primary rounded-circle">4</span>
                </Dropdown.Toggle>
                <Dropdown.Menu align="right" className="mt-4 dropdown-menu dropdown-menu-end">
                  <PerfectScrollbar className="widget-media dz-scroll p-3 height380">
                    <ul className="timeline">
                      <li>
                        <div className="timeline-panel">
							<div className="media me-2">
								<img alt="images" width={50} src={avatar} />
							</div>
							<div className="media-body">
								<h6 className="mb-1">Dr sultads Send you Photo</h6>
								<small className="d-block">
								  29 July 2020 - 02:26 PM
								</small>
							</div>
                        </div>
                      </li>
                      <li>
                        <div className="timeline-panel">
                          <div className="media me-2 media-info">KG</div>
                          <div className="media-body">
                            <h6 className="mb-1">
                              Resport created successfully
                            </h6>
                            <small className="d-block">
                              29 July 2020 - 02:26 PM
                            </small>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="timeline-panel">
                          <div className="media me-2 media-success">
                            <i className="fa fa-home" />
                          </div>
                          <div className="media-body">
                            <h6 className="mb-1">Reminder : Treatment Time!</h6>
                            <small className="d-block">
                              29 July 2020 - 02:26 PM
                            </small>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="timeline-panel">
                          <div className="media me-2">
                            <img alt="" width={50} src={avatar} />
                          </div>
                          <div className="media-body">
                            <h6 className="mb-1">Dr sultads Send you Photo</h6>
                            <small className="d-block">
                              29 July 2020 - 02:26 PM
                            </small>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="timeline-panel">
                          <div className="media me-2 media-danger">KG</div>
                          <div className="media-body">
                            <h6 className="mb-1">
                              Resport created successfully
                            </h6>
                            <small className="d-block">
                              29 July 2020 - 02:26 PM
                            </small>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="timeline-panel">
                          <div className="media me-2 media-primary">
                            <i className="fa fa-home" />
                          </div>
                          <div className="media-body">
                            <h6 className="mb-1">Reminder : Treatment Time!</h6>
                            <small className="d-block">
                              29 July 2020 - 02:26 PM
                            </small>
                          </div>
                        </div>
                      </li>
                    </ul>
                    <div className="ps__rail-x" style={{ left: 0, bottom: 0 }}>
                      <div
                        className="ps__thumb-x"
                        tabIndex={0}
                        style={{ left: 0, width: 0 }}
                      />
                    </div>
                    <div className="ps__rail-y" style={{ top: 0, right: 0 }}>
                      <div
                        className="ps__thumb-y"
                        tabIndex={0}
                        style={{ top: 0, height: 0 }}
                      />
                    </div>
                  </PerfectScrollbar>
                  <Link className="all-notification" to="#">
                    See all notifications <i className="ti-arrow-right" />
                  </Link>
                </Dropdown.Menu>
              </Dropdown>
			  
			   <Dropdown as="li" className="nav-item dropdown notification_dropdown ">
                <Dropdown.Toggle
                  className="nav-link i-false c-pointer ai-icon"
                  variant=""
                  as="a"
                  data-toggle="dropdown"
                  aria-expanded="false"
                >
					<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M14.8257 17.5282C14.563 17.6783 14.2627 17.7534 14 17.7534C13.7373 17.7534 13.437 17.6783 13.1743 17.5282L0 9.49598V20.193C0 22.4826 1.83914 24.3217 4.12869 24.3217H23.8713C26.1609 24.3217 28 22.4826 28 20.193V9.49598L14.8257 17.5282Z" fill="#737B8B"/>
						<path d="M23.8713 3.67829H4.12863C2.17689 3.67829 0.525417 5.06703 0.112549 6.90617L13.9999 15.3887L27.8873 6.90617C27.4745 5.06703 25.823 3.67829 23.8713 3.67829Z" fill="#737B8B"/>
					</svg>
					<span className="badge light text-white bg-success rounded-circle">15</span>
                </Dropdown.Toggle>	
                <Dropdown.Menu align="right" className="mt-4 dropdown-menu dropdown-menu-end">
                  <PerfectScrollbar className="widget-timeline dz-scroll style-1 ps p-3 height370">
                    <ul className="timeline">
                      <li>
                        <div className="timeline-badge primary" />
                        <Link
                          className="timeline-panel c-pointer text-muted"
                          to="#"
                        >
                          <span>10 minutes ago</span>
                          <h6 className="mb-0">
                            Youtube, a video-sharing website, goes live{" "}
                            <strong className="text-primary">$500</strong>.
                          </h6>
                        </Link>
                      </li>
                      <li>
                        <div className="timeline-badge info"></div>
                        <Link
                          className="timeline-panel c-pointer text-muted"
                          to="#"
                        >
                          <span>20 minutes ago</span>
                          <h6 className="mb-0">
                            New order placed{" "}
                            <strong className="text-info">#XF-2356.</strong>
                          </h6>
                          <p className="mb-0">
                            Quisque a consequat ante Sit amet magna at
                            volutapt...
                          </p>
                        </Link>
                      </li>
                      <li>
                        <div className="timeline-badge danger"></div>
                        <Link
                          className="timeline-panel c-pointer text-muted"
                          to="#"
                        >
                          <span>30 minutes ago</span>
                          <h6 className="mb-0">
                            john just buy your product{" "}
                            <strong className="text-warning">Sell $250</strong>
                          </h6>
                        </Link>
                      </li>
                      <li>
                        <div className="timeline-badge success"></div>
                        <Link
                          className="timeline-panel c-pointer text-muted"
                          to="#"
                        >
                          <span>15 minutes ago</span>
                          <h6 className="mb-0">
                            StumbleUpon is acquired by eBay.{" "}
                          </h6>
                        </Link>
                      </li>
                      <li>
                        <div className="timeline-badge warning"></div>
                        <Link
                          className="timeline-panel c-pointer text-muted"
                          to="#"
                        >
                          <span>20 minutes ago</span>
                          <h6 className="mb-0">
                            Mashable, a news website and blog, goes live.
                          </h6>
                        </Link>
                      </li>
                      <li>
                        <div className="timeline-badge dark"></div>
                        <Link
                          className="timeline-panel c-pointer text-muted"
                          to="#"
                        >
                          <span>20 minutes ago</span>
                          <h6 className="mb-0">
                            Mashable, a news website and blog, goes live.
                          </h6>
                        </Link>
                      </li>
                    </ul>
                    <div className="ps__rail-x" style={{ left: 0, bottom: 0 }}>
                      <div
                        className="ps__thumb-x"
                        tabIndex={0}
                        style={{ left: 0, width: 0 }}
                      />
                    </div>
                    <div className="ps__rail-y" style={{ top: 0, right: 0 }}>
                      <div
                        className="ps__thumb-y"
                        tabIndex={0}
                        style={{ top: 0, height: 0 }}
                      />
                    </div>
                  </PerfectScrollbar>
                </Dropdown.Menu>
              </Dropdown> 
			  
			  <Dropdown
                as="li"
                className="nav-item dropdown notification_dropdown "
              >
                <Dropdown.Toggle
                  variant=""
                  as="a"
                  className="nav-link bell bell-link i-false c-pointer ai-icon"
                  onClick={() => onNote()}
                >
					<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
						<g clipPath="url(#clip0)">
						<path d="M23.9161 4.16311C21.1983 1.41256 17.4654 -0.0936897 13.6016 0.00454401C5.90661 0.233756 -0.118391 6.61895 0.110821 14.3139C0.143566 15.9184 0.471011 17.4902 1.06041 18.9637C1.55158 20.208 2.20647 21.354 3.02509 22.4018L1.87903 25.1196C1.4206 26.1675 1.91177 27.379 2.9596 27.8374C3.31979 28.0012 3.74547 28.0339 4.1384 27.9684L9.44303 27.0516C11.3422 27.7065 13.3396 27.9357 15.337 27.7392C22.1807 27.0516 27.518 21.4522 27.8782 14.5759C28.0747 10.6793 26.6339 6.91365 23.9161 4.16311ZM12.9794 19.4548H9.34479C8.78813 19.4548 8.29697 18.9964 8.29697 18.407C8.29697 17.8503 8.75539 17.3592 9.34479 17.3592H12.9794C13.5361 17.3592 14.0273 17.8176 14.0273 18.407C14.0273 18.9964 13.5688 19.4548 12.9794 19.4548ZM18.6443 15.198H9.34479C8.78813 15.198 8.29697 14.7396 8.29697 14.1502C8.29697 13.5608 8.75539 13.1024 9.34479 13.1024H18.6443C19.2009 13.1024 19.6921 13.5608 19.6921 14.1502C19.6921 14.7396 19.2009 15.198 18.6443 15.198ZM18.6443 10.9085H9.34479C8.78813 10.9085 8.29697 10.4501 8.29697 9.86066C8.29697 9.304 8.75539 8.81284 9.34479 8.81284H18.6443C19.2009 8.81284 19.6921 9.27126 19.6921 9.86066C19.6921 10.4173 19.2009 10.9085 18.6443 10.9085Z" fill="#737B8B"/>
						</g>
						<defs>
						<clipPath id="clip0">
						<rect width="28" height="28" fill="white"/>
						</clipPath>
						</defs>
					</svg>
					<span className="badge light text-white bg-orange rounded-circle">76</span>
                </Dropdown.Toggle>
              </Dropdown> */}
			  
			  
			 
			  
				<Dropdown as="li" className="nav-item dropdown header-profile">
					<Dropdown.Toggle variant="" as="a" className="nav-link i-false c-pointer">
						<div className="header-info me-3">
							<span className="fs-18 font-w500 text-end">Welcome,Admin</span>
							{/* <small className="text-end fs-14 font-w400">robertocarloz@mail.com</small> */}
						</div> 
						{/* <img src={profile} width={20} alt="" /> */}
					</Dropdown.Toggle>

					<Dropdown.Menu align="right" className="mt-3 dropdown-menu dropdown-menu-end">
					  {/* <Link to="/app-profile" className="dropdown-item ai-icon">
						<svg
						  id="icon-user1" xmlns="http://www.w3.org/2000/svg" className="text-primary"
						  width={18} height={18} viewBox="0 0 24 24" fill="none"
						  stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
						>
						  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
						  <circle cx={12} cy={7} r={4} />
						</svg>
						<span className="ms-2">Profile </span>
					  </Link>
					  <Link to="/email-inbox" className="dropdown-item ai-icon">
						<svg
						  id="icon-inbox" xmlns="http://www.w3.org/2000/svg" className="text-success" width={18}
						  height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
						  strokeLinecap="round" strokeLinejoin="round"
						>
						  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
						  <polyline points="22,6 12,13 2,6" />
						</svg>
						<span className="ms-2">Inbox </span>
					  </Link> */}
					  <LogoutPage />
					</Dropdown.Menu>
				</Dropdown> 
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;
