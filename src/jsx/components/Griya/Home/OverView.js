import React from 'react';
import {Dropdown} from 'react-bootstrap';
import loadable from "@loadable/component";
import pMinDelay from "p-min-delay";

const MarketChart = loadable(() =>
	pMinDelay(import("./MarketChart"), 1000)
);

const OverView = () =>{
	return(
		<>
			<div className="card">
				<div className="card-header d-block border-0">
					<div className="d-flex align-items-center justify-content-between mb-3">
						<h4 className="fs-20">Overview</h4>
						<Dropdown className="custom-dropdown mb-0">
							<Dropdown.Toggle as="div" className="btn sharp tp-btn dark-btn i-false">
								<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" stroke="#342E59" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
									<path d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z" stroke="#342E59" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
									<path d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z" stroke="#342E59" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
								</svg>
							</Dropdown.Toggle>
							<Dropdown.Menu className="dropdown-menu dropdown-menu-right">
								<Dropdown.Item>Details</Dropdown.Item>
								<Dropdown.Item className="text-danger">Cancel</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
					</div>
					<div className="row">
						<div className="d-flex col-sm-4 col-6 align-items-center">
							<div className="building-icon">
								<i className="far fa-building bg-primary"></i>
							</div>
							<div className="ms-sm-3 ms-2 building">
								<span className="fs-14">Total Sale</span>
								<h4 className="font-w600 mb-0">2,346 Unit</h4>
							</div>
						</div>
						<div className="d-flex col-sm-4 col-6 align-items-center">
							<div className="building-icon">
								<i className="far fa-building bg-success"></i>
							</div>
							<div className="ms-sm-3 ms-2 building">
								<span className="fs-14">Total Sale</span>
								<h4 className="font-w600 mb-0">2,346 Unit</h4>
							</div>
						</div>
						<div className="d-flex col-sm-4 mt-sm-0 mt-3 align-items-center">
							<div className="me-3 text-sm-end text-start">
								<span className="fs-20 font-w500 text-success">0,8%</span>
								<p className="mb-0">than last week</p>
							</div>
							<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M15.9999 3.44C10.1548 3.44 4.94004 7.64128 3.71732 13.3622C3.10644 16.2208 3.51796 19.2605 4.88084 21.847C6.19252 24.3363 8.34292 26.3482 10.9157 27.4883C13.5919 28.6746 16.6642 28.8813 19.477 28.0723C22.1906 27.2922 24.5967 25.5798 26.2348 23.2813C29.6597 18.4758 29.2018 11.7261 25.1724 7.41984C22.8111 4.89632 19.4565 3.44 15.9999 3.44ZM16.6783 9.98272L20.1855 13.4902C21.061 14.3658 19.7032 15.7235 18.8277 14.8477L17.0661 13.0858V21.2323C17.0661 21.8134 16.5807 22.2986 15.9996 22.2986C15.4184 22.2986 14.933 21.8134 14.933 21.2323V13.0451L13.1637 14.7725C12.2799 15.6362 10.9346 14.2659 11.8226 13.3987L15.3292 9.97472C15.7048 9.60736 16.3064 9.61088 16.6783 9.98272Z" fill="#32D16D"/>
							</svg>													
						</div>
					</div>
				</div>
				<div className="card-body py-0 px-sm-3 px-2">
					<div id="marketChart" className="market-line">
						<MarketChart />
					</div>
				</div>
			</div>
		</>
	)
}
export default OverView;