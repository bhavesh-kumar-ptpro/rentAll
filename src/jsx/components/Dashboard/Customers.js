import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import {Dropdown} from 'react-bootstrap';

//Import Page
import PageHead from '../Griya/PageHead';
import CustomersList from '../Griya/CustomersList/CustomersList';



const Customers = () =>{
	const [data, setData] = useState("Newest")
	return(
		<>
			<PageHead activePage="Customers"  pageName="Customers" />
			<div className="row contacts-list-area">
				<div className="col-xl-12">
					<div className="d-flex flex-wrap">
						<Link to={"#"} className="btn btn-primary me-3 mb-3">+New Tranasactions</Link>
						<div className="table-search mb-3 pe-3">	
							<div className="input-group search-area">
								<input type="text" className="form-control" placeholder="Search customer name here" />
								<span className="input-group-text">
									<Link to={"#"}><i className="flaticon-381-search-2"></i></Link>
								</span>
							</div>
						</div>	
						<div className="newest mb-3 me-3">
							<Dropdown className="default-select-btn">
								<Dropdown.Toggle as="div" className="form-control btn i-false">
									{data} <i className="fas fa-angle-down scale4 text-primary ms-1 pt-1"></i>
								</Dropdown.Toggle>
								<Dropdown.Menu>
									<Dropdown.Item onClick={()=>setData("Newest")}>Newest</Dropdown.Item>
									<Dropdown.Item onClick={()=>setData("Oldest")}>Oldest</Dropdown.Item>
									<Dropdown.Item onClick={()=>setData("Newest")}>Newest</Dropdown.Item>
								</Dropdown.Menu>
							</Dropdown>
						</div>	
						<Link to={"#"} className="btn btn-primary me-3 mb-3"><i className="fas fa-calendar me-3"></i>Filter</Link>
						<Link to={"#"} className="btn btn-warning mb-3"><i className="fas fa-redo-alt"></i></Link>
					</div>
				</div>
				<CustomersList />
			</div>	
			<div className="d-flex align-items-center justify-content-between  flex-wrap">
				<h5>Showing 5 from 160 data</h5>
				<ul className="pagination align-items-center">
					<li className="page-item page-indicator">
						<Link to={"#"} className="btn btn-primary btn-sm me-2">Previous</Link>
					</li>
					<li className="page-item active"><Link to={"#"} className="page-link">1</Link></li>
					<li className="page-item"><Link to={"#"} className="page-link">2</Link></li>
					<li className="page-item"><Link to={"#"} className="page-link">3</Link></li>
					<li className="page-item"><Link to={"#"} className="page-link">4</Link></li>
					<li className="page-item page-indicator">
						<Link to={"#"} className="btn btn-primary btn-sm me-2">Next</Link>
					</li>
				</ul>
			</div>
		</>
	)
}
export default Customers; 