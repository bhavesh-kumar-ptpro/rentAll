import React from 'react';
import {Tab, Nav, Dropdown} from 'react-bootstrap';
import loadable from "@loadable/component";
import pMinDelay from "p-min-delay";

const TimeLineApexChart = loadable(() =>
	pMinDelay(import("./TimeLineApexChart"), 1000)
);
const TimeLineApexChart2 = loadable(() =>
	pMinDelay(import("./TimeLineApexChart2"), 1000)
);


const CustomerMap = () => {
	return(
		<>
			<Tab.Container defaultActiveKey="Monthly">
				<div className="card">
					<div className="card-header border-0  flex-wrap">
						<h4 className="fs-20">Total Revenue</h4>
						<div className="d-flex">
							<div className="card-action coin-tabs mt-3 mt-sm-0">
								<Nav as="ul" className="nav nav-tabs" role="tablist">
									<Nav.Item as="li" className="nav-item">
										<Nav.Link className="nav-link" eventKey="Monthly" role="tab">
											Monthly
										</Nav.Link>
									</Nav.Item>
									<Nav.Item className="nav-item">
										<Nav.Link className="nav-link"  eventKey="Daily" role="tab" >
											Daily
										</Nav.Link>
									</Nav.Item>
									<Nav.Item className="nav-item">
										<Nav.Link className="nav-link"  eventKey="Today" role="tab" >
											Today
										</Nav.Link>
									</Nav.Item>
								</Nav>
							</div>
							<Dropdown className="dropdown custom-dropdown mb-0 ms-3">
								<Dropdown.Toggle as="div" className="btn sharp tp-btn dark-btn i-false">
									<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13C12.5523 13 13 12.5523 13 12Z" stroke="#2E2E2E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
										<path d="M6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13C5.55228 13 6 12.5523 6 12Z" stroke="#2E2E2E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
										<path d="M20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13C19.5523 13 20 12.5523 20 12Z" stroke="#2E2E2E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
									</svg>
								</Dropdown.Toggle>
								<Dropdown.Menu className="dropdown-menu dropdown-menu-right">
									<Dropdown.Item eventKey="Monthly">Details</Dropdown.Item>
									<Dropdown.Item eventKey="Today" className="text-danger">Cancel</Dropdown.Item>
								</Dropdown.Menu>
							</Dropdown>
						</div>
					</div>
					<div className="card-body py-0">
						<Tab.Content >
							<Tab.Pane eventKey="Monthly">
								<div className="flex-wrap mb-sm-4 mb-2 align-items-center">
									<div className="d-flex align-items-center">
										<span className=" revenue text-black font-w600 me-5">$236,535</span>
										<div className="d-flex align-items-center">
											<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path d="M15.9999 3.44C10.1548 3.44 4.94004 7.64128 3.71732 13.3622C3.10644 16.2208 3.51796 19.2605 4.88084 21.847C6.19252 24.3363 8.34292 26.3482 10.9157 27.4883C13.5919 28.6746 16.6642 28.8813 19.477 28.0723C22.1906 27.2922 24.5967 25.5798 26.2348 23.2813C29.6597 18.4758 29.2018 11.7261 25.1724 7.41984C22.8111 4.89632 19.4565 3.44 15.9999 3.44ZM16.6783 9.98272L20.1855 13.4902C21.061 14.3658 19.7032 15.7235 18.8277 14.8477L17.0661 13.0858V21.2323C17.0661 21.8134 16.5807 22.2986 15.9996 22.2986C15.4184 22.2986 14.933 21.8134 14.933 21.2323V13.0451L13.1637 14.7725C12.2799 15.6362 10.9346 14.2659 11.8226 13.3987L15.3292 9.97472C15.7048 9.60736 16.3064 9.61088 16.6783 9.98272Z" fill="#32D16D"/>
											</svg>
											<div className="ms-3">
												<span className="revenue-1 font-w500 text-success">0,8%</span>
												<p className="mb-0">than last week</p>
											</div>	
										</div>
									</div>
								</div>
								<div id="chartTimeline1" className="timeline-chart">
									<TimeLineApexChart />
								</div>
							</Tab.Pane>	
							<Tab.Pane eventKey="Daily">
								<div className="flex-wrap mb-sm-4 mb-2 align-items-center">
									<div className="d-flex align-items-center">
										<span className=" revenue text-black font-w600 me-5">$236,535</span>
										<div className="d-flex align-items-center">
											<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path d="M15.9999 3.44C10.1548 3.44 4.94004 7.64128 3.71732 13.3622C3.10644 16.2208 3.51796 19.2605 4.88084 21.847C6.19252 24.3363 8.34292 26.3482 10.9157 27.4883C13.5919 28.6746 16.6642 28.8813 19.477 28.0723C22.1906 27.2922 24.5967 25.5798 26.2348 23.2813C29.6597 18.4758 29.2018 11.7261 25.1724 7.41984C22.8111 4.89632 19.4565 3.44 15.9999 3.44ZM16.6783 9.98272L20.1855 13.4902C21.061 14.3658 19.7032 15.7235 18.8277 14.8477L17.0661 13.0858V21.2323C17.0661 21.8134 16.5807 22.2986 15.9996 22.2986C15.4184 22.2986 14.933 21.8134 14.933 21.2323V13.0451L13.1637 14.7725C12.2799 15.6362 10.9346 14.2659 11.8226 13.3987L15.3292 9.97472C15.7048 9.60736 16.3064 9.61088 16.6783 9.98272Z" fill="#32D16D"/>
											</svg>
											<div className="ms-3">
												<span className="revenue-1 font-w500 text-success">0,8%</span>
												<p className="mb-0">than last week</p>
											</div>	
										</div>
									</div>
								</div>
								<div id="chartTimeline2" className="chart-timeline">
									<TimeLineApexChart2 />
								</div>
							</Tab.Pane>	
							<Tab.Pane eventKey="Today">
								<div className="flex-wrap mb-sm-4 mb-2 align-items-center">
									<div className="d-flex align-items-center">
										<span className=" revenue text-black font-w600 me-5">$236,535</span>
										<div className="d-flex align-items-center">
											<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path d="M15.9999 3.44C10.1548 3.44 4.94004 7.64128 3.71732 13.3622C3.10644 16.2208 3.51796 19.2605 4.88084 21.847C6.19252 24.3363 8.34292 26.3482 10.9157 27.4883C13.5919 28.6746 16.6642 28.8813 19.477 28.0723C22.1906 27.2922 24.5967 25.5798 26.2348 23.2813C29.6597 18.4758 29.2018 11.7261 25.1724 7.41984C22.8111 4.89632 19.4565 3.44 15.9999 3.44ZM16.6783 9.98272L20.1855 13.4902C21.061 14.3658 19.7032 15.7235 18.8277 14.8477L17.0661 13.0858V21.2323C17.0661 21.8134 16.5807 22.2986 15.9996 22.2986C15.4184 22.2986 14.933 21.8134 14.933 21.2323V13.0451L13.1637 14.7725C12.2799 15.6362 10.9346 14.2659 11.8226 13.3987L15.3292 9.97472C15.7048 9.60736 16.3064 9.61088 16.6783 9.98272Z" fill="#32D16D"/>
											</svg>
											<div className="ms-3">
												<span className="revenue-1 font-w500 text-success">0,8%</span>
												<p className="mb-0">than last week</p>
											</div>	
										</div>
									</div>
								</div>
								<div id="chartTimeline3" className="chart-timeline">
									<TimeLineApexChart />
								</div>
							</Tab.Pane>									
						</Tab.Content>		
					</div>	
				</div>
			</Tab.Container>	
		</>
	)
}
export default CustomerMap;