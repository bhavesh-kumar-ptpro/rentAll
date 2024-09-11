import React,{useState} from 'react';
import {Dropdown} from 'react-bootstrap';
//import World from "@svg-maps/world";
import WorldMap from './../../PluginsMenu/JqvMap/WorldMap';

const PropetiesMap = ()=>{
	const [selected, onSelect] = useState(null);
	return(
		<>
			<div className="card" id="responsive-map">
				<div className="card-header border-0">
					<h4 className="fs-20">Propeties Map</h4>
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
				<div className="card-body">
					<div className="row">
						<div className="col-lg-3">
							<p className="mb-2 d-flex align-items-center  fs-16 text-black font-w500">
								Europe
								<span className="pull-right text-dark fs-14 ms-2">
								  653 Unit
								</span>
							</p>
							<div className="progress mb-4" style={{ height: 10 }}>
								<div
								  className="progress-bar bg-primary progress-animated"
								  style={{ width: "75%", height: 10 }}
								  role="progressbar"
								>
								  <span className="sr-only">75% Complete</span>
								</div>
							</div>
							<p className="mb-2 d-flex align-items-center  fs-16 text-black font-w500">
								Asia
								<span className="pull-right text-dark fs-14 ms-2">
								  653 Unit
								</span>
							</p>
							<div className="progress mb-4" style={{ height: 10 }}>
								<div
								  className="progress-bar bg-primary progress-animated"
								  style={{ width: "100%", height: 10 }}
								  role="progressbar"
								>
								  <span className="sr-only">100% Complete</span>
								</div>
							</div>
							<p className="mb-2 d-flex align-items-center  fs-16 text-black font-w500">
								Africa
								<span className="pull-right text-dark fs-14 ms-2">
								  653 Unit
								</span>
							</p>
							<div className="progress mb-4" style={{ height: 10 }}>
								<div
								  className="progress-bar bg-primary progress-animated"
								  style={{ width: "75%", height: 10 }}
								  role="progressbar"
								>
								  <span className="sr-only">75% Complete</span>
								</div>
							</div>
							<p className="mb-2 d-flex align-items-center  fs-16 text-black font-w500">
								Australia
								<span className="pull-right text-dark fs-14 ms-2">
								  653 Unit
								</span>
							</p>
							<div className="progress mb-4" style={{ height: 10 }}>
								<div
								  className="progress-bar bg-primary progress-animated"
								  style={{ width: "50%", height: 10 }}
								  role="progressbar"
								>
								  <span className="sr-only">50% Complete</span>
								</div>
							</div>
							<p className="mb-2 d-flex align-items-center  fs-16 text-black font-w500">
								America
								<span className="pull-right text-dark fs-14 ms-2">
								  653 Unit
								</span>
							</p>
							<div className="progress mb-4" style={{ height: 10 }}>
								<div
								  className="progress-bar bg-primary progress-animated"
								  style={{ width: "70%", height: 10 }}
								  role="progressbar"
								>
								  <span className="sr-only">70% Complete</span>
								</div>
							</div>
							<p className="mb-2 d-flex align-items-center  fs-16 text-black font-w500">
								USA
								<span className="pull-right text-dark fs-14 ms-2">
								  653 Unit
								</span>
							</p>
							<div className="progress mb-4" style={{ height: 10 }}>
								<div
								  className="progress-bar bg-primary progress-animated"
								  style={{ width: "40%", height: 10 }}
								  role="progressbar"
								>
								  <span className="sr-only">40% Complete</span>
								</div>
							</div>
						</div>
						<div className="col-lg-9">
						  {/* <div id="world-map" /> */}
							  <div className="home-map" id="world-map" >
								 <WorldMap />
							  </div>
						</div>
					</div>
				</div>
			</div>
		</>
	)

}
export default PropetiesMap;