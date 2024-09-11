import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import {Dropdown} from 'react-bootstrap';
import PageHead from '../Griya/PageHead';
import OrderPage from '../Griya/Orderlist/OrderPage';

const OrderList = () =>{
	const [data, setData] = useState("Newest")
	return(
		<>
			<PageHead activePage="Order List"  pageName="Order List" />	
			<div className="row">
				<div className="col-xl-3 col-md-6">
					<div className="card">
						<div className="card-body">
							<div className="d-flex align-items-center">
								<div className="order-user">
									<i className="fas fa-user text-white bg-primary"></i>
								</div>
								<div className="ms-4 customer">
									<h2 className="mb-0  font-w600">245</h2>
									<p className="mb-0 font-w500">Total Customers</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="col-xl-3 col-md-6">
					<div className="card">
						<div className="card-body">
							<div className="d-flex align-items-center">
								<div className="order-user">
									<i className="far fa-building bg-warning text-white"></i>
								</div>
								<div className="ms-4 customer">
									<h2 className="mb-0  font-w600">5,623</h2>
									<p className="mb-0  font-w500">Total Properties</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="col-xl-6">
					<div className="card">
						<div className="card-body">
							<div className="row order-card text-center">
								<div className="col-4 customer">
									<h2 className="mb-0  font-w600">421</h2>
									<p className="mb-0 font-w500">Agent</p>
								</div>
								<div className="col-4 customer">
									<h2 className="mb-0 font-w600">8,313</h2>
									<p className="mb-0  font-w500">Transactions</p>
								</div>
								<div className="col-4 border-0 customer">
									<h2 className="mb-0 font-w600">4.6</h2>
									<p className="mb-0 font-w500">Rating</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="col-xl-12">
					<div className="d-flex flex-wrap">
						<Link to={"#"} className="btn btn-primary me-3 mb-3">+New Tranasactions</Link>
						<div className="table-search mb-3 pe-3">	
							<div className="input-group search-area">
								<input type="text" className="form-control" placeholder="Search customer name here" />
								<span className="input-group-text"><Link to={"#"}><i className="flaticon-381-search-2"></i></Link></span>
							</div>
						</div>	
						<div className="newest mb-3 me-3">
							{/* <select className="form-control default-select ms-0 border">
								<option>Newest</option>
								<option>Oldest</option>
								<option>Newest</option>
							</select> */}
							<Dropdown className="default-select-btn">
								<Dropdown.Toggle as="div" className="form-control btn i-false">
									{data} <i className="fas fa-angle-down scale4 text-primary ms-1"></i>
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
				<div className="col-xl-12">
					<OrderPage />
				</div>	
			</div>	
		</>
	)
}
export default OrderList;