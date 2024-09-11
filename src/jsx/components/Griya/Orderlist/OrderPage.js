import React, { useState, useRef, useEffect } from 'react';
import { Link } from "react-router-dom";
import {Dropdown} from 'react-bootstrap';


function DropdownBlog(){
	return(
		<>
			<Dropdown className="dropdown ml-auto">
				<Dropdown.Toggle as="div" className="btn-link i-false" data-bs-toggle="dropdown" >
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M11.0005 12C11.0005 12.5523 11.4482 13 12.0005 13C12.5528 13 13.0005 12.5523 13.0005 12C13.0005 11.4477 12.5528 11 12.0005 11C11.4482 11 11.0005 11.4477 11.0005 12Z" stroke="#3E4954" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
						<path d="M18.0005 12C18.0005 12.5523 18.4482 13 19.0005 13C19.5528 13 20.0005 12.5523 20.0005 12C20.0005 11.4477 19.5528 11 19.0005 11C18.4482 11 18.0005 11.4477 18.0005 12Z" stroke="#3E4954" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
						<path d="M4.00049 12C4.00049 12.5523 4.4482 13 5.00049 13C5.55277 13 6.00049 12.5523 6.00049 12C6.00049 11.4477 5.55277 11 5.00049 11C4.4482 11 4.00049 11.4477 4.00049 12Z" stroke="#3E4954" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
					</svg>
				</Dropdown.Toggle>
				<Dropdown.Menu className="dropdown-menu dropdown-menu-right">
					<Dropdown.Item className="text-black">Accept order</Dropdown.Item>
					<Dropdown.Item className="text-black">Reject order</Dropdown.Item>
					<Dropdown.Item className="text-black">View Details</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>
		</>
	)
}

const OrderPage = () =>{
	const [data, setData] = useState(
		document.querySelectorAll("#example_order tbody tr")
	);
	const sort = 10;
	const activePag = useRef(0);
	const [test, settest] = useState(0);

	// Active data
	const chageData = (frist, sec) => {
		for (var i = 0; i < data.length; ++i) {
			if (i >= frist && i < sec) {
				data[i].classList.remove("d-none");
			} else {
				data[i].classList.add("d-none");
			}
		}
	};
   // use effect
   useEffect(() => {
      setData(document.querySelectorAll("#example_order tbody tr"));
      //chackboxFun();
	}, [test]);

  
   // Active pagginarion
   activePag.current === 0 && chageData(0, sort);
   // paggination
   let paggination = Array(Math.ceil(data.length / sort))
      .fill()
      .map((_, i) => i + 1);

   // Active paggination & chage data
	const onClick = (i) => {
		activePag.current = i;
		chageData(activePag.current * sort, (activePag.current + 1) * sort);
		settest(i);
	};

   
	const chackbox = document.querySelectorAll(".sorting_1 input");
	const motherChackBox = document.querySelector(".sorting_asc input");
	const chackboxFun = (type) => {
      for (let i = 0; i < chackbox.length; i++) {
         const element = chackbox[i];
         if (type === "all") {
            if (motherChackBox.checked) {
               element.checked = true;
            } else {
               element.checked = false;
            }
         } else {
            if (!element.checked) {
               motherChackBox.checked = false;
               break;
            } else {
               motherChackBox.checked = true;
            }
         }
      }
	};
	return(		
		<div className="table-responsive fs-14">
			<div id="example_order" className="dataTables_wrapper no-footer">
				<table
					id="example2"
					className="table display mb-4 dataTablesCard order-table shadow-hover card-table dataTable no-footer"
					role="grid"
					aria-describedby="example2_info"
				>
					<thead>
						<tr role="row">
							<th className="sorting_asc" >
								<div className="form-check ms-2">
									<input type="checkbox" onClick={() => chackboxFun("all")} 
										className="form-check-input" id="checkAll" required=""
									/>
									<label className="form-check-label" htmlFor="checkAll"></label>
								</div>
							</th>
							<th>Order ID</th>
							<th>Date</th>
							<th>Customer</th>
							<th>Property</th>
							<th>Location</th>
							<th>Price</th>
							<th>Type</th>
							<th>Agent</th>
							<th>Status</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						<tr role="row" className="odd">
							<td className="sorting_1">
								<div className="form-check ms-2">
									<input type="checkbox" onClick={() => chackboxFun()} className="form-check-input"
										id="customCheckBox2" required=""
									/>
									<label className="form-check-label" htmlFor="customCheckBox2"></label>
								</div>
							</td>
							<td>#0001234</td>
							<td className="wspace-no">26/04/2020, 12:42 AM</td>
							<td>James WItcwicky</td>
							<td className="text-ov">TY35 Avenue <br/>GGLondon Center</td>
							<td className="text-ov">Flat 2551 Center<br/> London 287223</td>
							<td>$521k</td>
							<td>ABC356</td>
							<td>Kevin Jr.</td>
							<td><span className="text-warning">Pending</span></td>
							<td><DropdownBlog /></td>
						</tr>
						<tr role="row" className="even">
							<td className="sorting_1">  
								<div className="form-check  ms-2">
									<input type="checkbox" onClick={() => chackboxFun()}
										className="form-check-input" id="customCheckBox21" required=""
									/>
									<label className="form-check-label" htmlFor="customCheckBox21"></label>
								</div> 
							</td>
							<td>#0001234</td>
							<td className="wspace-no">26/04/2020, 12:42 AM</td>
							<td>Stephani</td>
							<td className="text-ov">TY35 Avenue <br/>GGLondon Center</td>
							<td className="text-ov">Straight 22th London<br/> 51256</td>
							<td>$235k</td>
							<td>TY1255</td>
							<td>Louis</td>
							<td><span className="text-primary">Negotiation</span></td>
							<td><DropdownBlog /></td>
						</tr>
						<tr role="row" className="odd">
							<td className="sorting_1">  
								<div className="form-check  ms-2">
									<input type="checkbox" onClick={() => chackboxFun()}
										className="form-check-input" id="customCheckBox22" required=""
									/>
									<label className="form-check-label" htmlFor="customCheckBox22"></label>
								</div> 
							</td>
							<td>#0001234</td>
							<td className="wspace-no">26/04/2020, 12:42 AM</td>
							<td>Smantha Jr.</td>
							<td className="text-ov">65SM Alexander<br/> Court,New York</td>
							<td className="text-ov">Corner Street 5th<br/> London 126623 </td>
							<td>$116k</td>
							<td>UJ2356</td>
							<td>Melinda S.</td>
							<td><span className="text-warning">Pending</span></td>
							<td><DropdownBlog /></td>
						</tr>
						<tr role="row" className="even">
							<td className="sorting_1">  
								<div className="form-check  ms-2">
									<input type="checkbox" onClick={() => chackboxFun()}
										className="form-check-input" id="customCheckBox23" required=""
									/>
									<label className="form-check-label" htmlFor="customCheckBox23"></label>
								</div> 
							</td>
							<td>#0001234</td>
							<td className="wspace-no">26/04/2020, 12:42 AM</td>
							<td>Hawkins</td>
							<td className="text-ov">TY35 Avenue <br/>GGLondon Center</td>
							<td className="text-ov">Waves Street 1st<br/> London 2441</td>
							<td>$763k</td>
							<td>RE5135</td>
							<td>Peter P.</td>
							<td><span className="text-primary">Negotiation</span></td>
							<td><DropdownBlog /></td>
						</tr>
						<tr role="row" className="odd">	
							<td className="sorting_1">  
								<div className="form-check  ms-2">
									<input type="checkbox" onClick={() => chackboxFun()}
										className="form-check-input" id="customCheckBox24" required=""
									/>
									<label className="form-check-label" htmlFor="customCheckBox24"></label>
								</div> 
							</td>
							<td>#0001234</td>
							<td className="wspace-no">26/04/2020, 12:42 AM</td>
							<td>Sanji Fujiwara</td>
							<td className="text-ov">5122 Franklin <br/>Court,New York</td>
							<td className="text-ov">Flat 2551 Center<br/> London 287223</td>
							<td>$245k</td>
							<td>POT434</td>
							<td>Robinson</td>
							<td><span className="text-success">Approved</span></td>
							<td><DropdownBlog /></td>
						</tr>
						<tr role="row" className="even">
							<td className="sorting_1">  
								<div className="form-check  ms-2">
									<input type="checkbox" onClick={() => chackboxFun()}
										className="form-check-input" id="customCheckBox25" required=""
									/>
									<label className="form-check-label" htmlFor="customCheckBox25"></label>
								</div> 
							</td>
							<td>#0001234</td>
							<td className="wspace-no">26/04/2020, 12:42 AM</td>
							<td>Ilham Supriadi</td>
							<td className="text-ov">TY35 Avenue <br/>GGLondon Center</td>
							<td className="text-ov">Waves Street 1st<br/> London 2441</td>
							<td>$765k</td>
							<td>VBDF42</td>
							<td>Rendy</td>
							<td><span className="text-warning">Pending</span></td>
							<td><DropdownBlog /></td>
						</tr>
						<tr role="row" className="odd">
							<td className="sorting_1">  
								<div className="form-check  ms-2">
									<input type="checkbox" onClick={() => chackboxFun()}
										className="form-check-input" id="customCheckBox26" required=""
									/>
									<label className="form-check-label" htmlFor="customCheckBox26"></label>
								</div> 
							</td>
							<td>#0001234</td>
							<td className="wspace-no">26/04/2020, 12:42 AM</td>
							<td>Yun-Yun</td>
							<td className="text-ov">5122 Franklin<br/> Court,New York</td>
							<td className="text-ov">Corner Street 5th<br/> London 126623 </td>
							<td>$521k</td>
							<td>QWR55</td>
							<td>Thomas</td>
							<td><span className="text-primary">Negotiation</span></td>
							<td><DropdownBlog /></td>
						</tr>	
						<tr role="row" className="even">
							<td className="sorting_1">  
								<div className="form-check  ms-2">
									<input type="checkbox" onClick={() => chackboxFun()}
										className="form-check-input" id="customCheckBox27" required=""
									/>
									<label className="form-check-label" htmlFor="customCheckBox27"></label>
								</div> 
							</td>
							<td>#0001234</td>
							<td className="wspace-no">26/04/2020, 12:42 AM</td>
							<td>Yun-Yun</td>
							<td className="text-ov">5122 Franklin<br/> Court,New York</td>
							<td className="text-ov">Corner Street 5th<br/> London 126623 </td>
							<td>$521k</td>
							<td>QWR55</td>
							<td>Thomas</td>
							<td><span className="text-primary">Negotiation</span></td>
							<td><DropdownBlog /></td>
						</tr>
						<tr role="row" className="odd">
							<td className="sorting_1">  
								<div className="form-check  ms-2">
									<input type="checkbox" onClick={() => chackboxFun()}
										className="form-check-input" id="customCheckBox28" required=""
									/>
									<label className="form-check-label" htmlFor="customCheckBox28"></label>
								</div> 
							</td>
							<td>#0001234</td>
							<td className="wspace-no">26/04/2020, 12:42 AM</td>
							<td>Yun-Yun</td>
							<td className="text-ov">5122 Franklin<br/> Court,New York</td>
							<td className="text-ov">Corner Street 5th<br/> London 126623 </td>
							<td>$521k</td>
							<td>QWR55</td>
							<td>Thomas</td>
							<td><span className="text-primary">Negotiation</span></td>
							<td><DropdownBlog /></td>
						</tr>
						<tr role="row" className="even">
							<td className="sorting_1">  
								<div className="form-check  ms-2">
									<input type="checkbox" onClick={() => chackboxFun()}
										className="form-check-input" id="customCheckBox29" required=""
									/>
									<label className="form-check-label" htmlFor="customCheckBox29"></label>
								</div> 
							</td>
							<td>#0001234</td>
							<td className="wspace-no">26/04/2020, 12:42 AM</td>
							<td>Yun-Yun</td>
							<td className="text-ov">5122 Franklin<br/> Court,New York</td>
							<td className="text-ov">Corner Street 5th<br/> London 126623 </td>
							<td>$521k</td>
							<td>QWR55</td>
							<td>Thomas</td>
							<td><span className="text-primary">Negotiation</span></td>
							<td><DropdownBlog /></td>
						</tr>
						<tr role="row" className="odd">
							<td className="sorting_1">  
								<div className="form-check  ms-2">
									<input type="checkbox" onClick={() => chackboxFun()}
										className="form-check-input" id="customCheckBox30" required=""
									/>
									<label className="form-check-label" htmlFor="customCheckBox30"></label>
								</div> 
							</td>
							<td>#0001234</td>
							<td className="wspace-no">26/04/2020, 12:42 AM</td>
							<td>Yun-Yun</td>
							<td className="text-ov">5122 Franklin<br/> Court,New York</td>
							<td className="text-ov">Corner Street 5th<br/> London 126623 </td>
							<td>$521k</td>
							<td>QWR55</td>
							<td>Thomas</td>
							<td><span className="text-primary">Negotiation</span></td>
							<td><DropdownBlog /></td>
						</tr>
					</tbody>
				</table>
				<div className="d-sm-flex text-center justify-content-between align-items-center mt-3">
					<div className="dataTables_info">
						Showing {activePag.current * sort + 1} to{" "}
						{data.length > (activePag.current + 1) * sort
							? (activePag.current + 1) * sort
							: data.length}{" "}
						of {data.length} entries
					</div>
					<div
						className="dataTables_paginate paging_simple_numbers"
						id="example2_paginate"
					>
						<Link
							className="paginate_button previous disabled"
							to="/order-list"
							onClick={() =>
							   activePag.current > 0 &&
							   onClick(activePag.current - 1)
							}
						 >
							<i className="fa fa-angle-double-left" aria-hidden="true"></i>
						</Link>
						<span>
							{paggination.map((number, i) => (
							   <Link
								  key={i}
								  to="/order-list"
								  className={`paginate_button  ${
									 activePag.current === i ? "current" : ""
								  } `}
								  onClick={() => onClick(i)}
							   >
								  {number}
							   </Link>
							))}
						</span>
						<Link
							className="paginate_button next"
							to="/order-list"
							onClick={() =>
							   activePag.current + 1 < paggination.length &&
							   onClick(activePag.current + 1)
							}
						>
							<i className="fa fa-angle-double-right" aria-hidden="true"></i>
						</Link>
					</div>
				</div>
			</div>
		</div>		
	)
}
export default OrderPage;	