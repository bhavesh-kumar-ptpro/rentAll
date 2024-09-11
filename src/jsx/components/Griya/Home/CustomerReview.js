import React from 'react';
import { Dropdown } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import Pic11 from './../../../../images/contacts/pic11.jpg';
import Pic22 from './../../../../images/contacts/pic22.jpg';
import Pic33 from './../../../../images/contacts/pic33.jpg';

const CustomerReview = ()=>{
	return(
		<>
			<div className="card">
				<div className="card-header border-0 pb-0">
					<h4 className="fs-20">Customer Review</h4>
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
				<div className="card-body pb-0">
					<div className="pb-3 border-bottom mb-3">
						<div className="d-flex mb-3 flex-wrap align-items-end">
							<img className="rounded me-3" src={Pic11} width="40" alt="" />
							<div>
								<h6 className="fs-16 text-black font-w500 mb-0">Hawkins Maru</h6>
								<span className="fs-14">5m ago</span>
							</div>
							<div className="star-icons ms-auto">
								<i className="las la-star me-1"></i>
								<i className="las la-star me-1"></i>
								<i className="las la-star text-light me-1"></i>
								<i className="las la-star text-light me-1"></i>
								<i className="las la-star text-light me-1"></i>
							</div>
						</div>
						<p className="fs-14 mb-0">I viewed a number of properties with Just Property and found them to be professional, efficient, patient, courteous and helpful every time.
						</p>
					</div>
					<div className="pb-3 border-bottom mb-3">
						<div className="d-flex mb-3 flex-wrap align-items-end">
							<img className="rounded me-3" src={Pic22} width="40" alt="" />
							<div>
								<h6 className="fs-16 text-black font-w500 mb-0">Bella Smith</h6>
								<span className="fs-14">20m ago</span>
							</div>
							<div className="star-icons ms-auto">
								<i className="las la-star me-1"></i>
								<i className="las la-star me-1"></i>
								<i className="las la-star me-1"></i>
								<i className="las la-star me-1"></i>
								<i className="las la-star text-light"></i>
							</div>
						</div>
						<p className="fs-14 mb-0">Dealing with Syamsudin and Bakri was a joy. I got in touch with Just Property after seeing a couple of properties that caught my eye. Both Syamsudin and Bakri strive to deliver a professional service and surpassed my expectations - they were not only helpful but extremely approachable and not at all bumptious...
						</p>
					</div>
					<div className="pb-3 border-bottom mb-3">
						<div className="d-flex mb-3 flex-wrap align-items-end">
							<img className="rounded me-3" src={Pic33} width="40" alt="" />
							<div>
								<h6 className="fs-16 text-black font-w500 mb-0">John Doe</h6>
								<span className="fs-14">4h ago</span>
							</div>
							<div className="star-icons ms-auto">
								<i className="las la-star me-1"></i>
								<i className="las la-star me-1"></i>
								<i className="las la-star me-1"></i>
								<i className="las la-star text-light me-1"></i>
								<i className="las la-star text-light me-1"></i>
							</div>
						</div>
						<p className="fs-14 mb-0">Friendly service Josh, Lunar and everyone at Just Property in Hastings deserved a big Thank You from us for moving us from Jakarta to Medan during the lockdown.
						</p>
					</div>
				</div>
				<div className="card-footer border-0 pt-0">
					<Link to={"#"} className="btn btn-primary btn-block">See More Reviews</Link>
				</div>
			</div>
		</>
	)
}
export default CustomerReview;