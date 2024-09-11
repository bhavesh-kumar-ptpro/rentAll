import React from 'react';
import loadable from "@loadable/component";
import pMinDelay from "p-min-delay";
import {Dropdown} from 'react-bootstrap';

//import
import PageHead from '../Griya/PageHead';
import CardDataBlog from '../Griya/Analytics/CardDataBlog';
import SalesStatisticTab from '../Griya/Analytics/SalesStatisticTab';
import RentStatisticTab from '../Griya/Analytics/RentStatisticTab';
import CustomerMap from '../Griya/Home/CustomerMap';
import RecentCustomer from '../Griya/Home/RecentCustomer';
import ProgressBar from '../Griya/Home/ProgressBar';
import SalesSummaryBlog from '../Griya/Analytics/SalesSummaryBlog';

const ApexBarCharts = loadable(() =>
	pMinDelay(import("../Griya/Analytics/ApexBarCharts"), 1000)
);
const PieChartAnalytics = loadable(() =>
	pMinDelay(import("../Griya/Analytics/PieChartAnalytics"), 1000)
);


const Analytics = () =>{
	return(
		<>
			<PageHead activePage="Analytics"  pageName="Analytics" />
			<div className="row">
				<div className="col-xl-6">
					<div className="card">
						<div className="card-header pb-0 border-0 mb-3">
							<h4 className="fs-20 mb-0">Bar Charts</h4>
							<div className="d-flex align-items-center">
								<h4 className="fs-16 mb-0">Number</h4>
								<div className="form-check toggle-switch text-end form-switch ms-4">
								  <input defaultChecked className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
								  <label className="form-check-label" htmlFor="flexSwitchCheckDefault"></label>
								</div>
								<Dropdown className="dropdown custom-dropdown mb-0 tbl-orders-style">
									<Dropdown.Toggle as="div" className="btn sharp tp-btn dark-btn i-false" >
										<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" stroke="#342E59" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
											<path d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z" stroke="#342E59" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
											<path d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z" stroke="#342E59" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
										</svg>
									</Dropdown.Toggle>
									<Dropdown.Menu className="dropdown-menu dropdown-menu-right">
										<Dropdown.Item className="dropdown-item" >Details</Dropdown.Item>
										<Dropdown.Item className="dropdown-item text-danger">Cancel</Dropdown.Item>
									</Dropdown.Menu>
								</Dropdown>
							</div>
						</div>
						<div className="card-body py-0 px-sm-3 px-0">
							<div id="BarCharts" className="bar-chart">
								<ApexBarCharts />
							</div>
						</div>
					</div>
				</div>
				<div className="col-xl-6">
					<CardDataBlog />
				</div>
				<div className="col-xl-6">
					<SalesStatisticTab />
				</div>
				<div className="col-xl-6">
					<RentStatisticTab />
				</div>
			</div>	
			<div className="row">
				<div className="col-xl-9 col-xxl-8">
					<div className="row">
						<div className="col-xl-12">
							<CustomerMap />
						</div>
						<div className="col-xl-8 col-xxl-12">
							<SalesSummaryBlog />
						</div>
						<div className="col-xl-4 col-xxl-12">
							<div className="card">
								<div className="card-header border-0">
									<h4 className="mb-0 fs-20 text-black">Pie Chart</h4>
								</div>
								<div className="card-body  text-center">
									<div id="pieChart1" className="d-inline-block pieChart1">
										<PieChartAnalytics /> 
									</div>
									<div className="chart-items">
										<div className=" col-xl-12 col-sm-12">
											<div className="row text-black text-start mt-4 chart-link">
												<span className="mb-2 col-6">
													<svg className="me-2" width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
														<rect width="19" height="19" rx="9.5" fill="#1EAAE7"/>
													</svg>
													Sale Properties
												</span>
												<span className="mb-2 col-6">
													<svg className="me-2" width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
														<rect width="19" height="19" rx="9.5" fill="#FF7A30"/>
													</svg>
													Rented Properties
												</span>
												<span className="mb-2 col-6">
													<svg className="me-2" width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
														<rect width="19" height="19" rx="9.5" fill="#6418C3"/>
													</svg>

													Purple Card
												</span>
												<span className="mb-2 col-6">
													<svg className="me-2" width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
														<rect width="19" height="19" rx="9.5" fill="#FFEF5F"/>
													</svg>
													Yellow Card
												</span>
												<span className="mb-2 col-6">
													<svg className="me-2" width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
														<rect width="19" height="19" rx="9.5" fill="#2BC155"/>
													</svg>
													Green Card
												</span>
											</div>
										</div>
									</div>
								</div>	
							</div>
						</div>
					</div>
				</div>
				<div className="col-xl-3 col-xxl-4">
					<div className="row">
						<div className="col-xl-12 col-md-6">
							<RecentCustomer />
						</div>
						<div className="col-xl-12 col-md-6">
							<ProgressBar />
						</div>
					</div>
				</div>		
			</div>
		</>
	)
}
export default Analytics;