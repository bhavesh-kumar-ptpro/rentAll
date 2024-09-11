import React from 'react';
import {Link} from 'react-router-dom';

//images
import cust1 from './../../../../images/customers/1.jpg';
import cust2 from './../../../../images/customers/2.jpg';
import cust3 from './../../../../images/customers/3.jpg';

const MediaBlog = [
	{ image: cust1, title:'James Humbly'},
	{ image: cust2, title:'William Smith'},
	{ image: cust3, title:'Nabilla Handerson'},
];

const OwnerHistory =()=>{
	return(
		<>
			<div>
				<h4 className="fs-30 font-w600 mb-4">Owner History</h4>
				<div className="owner-timeline">
					{MediaBlog.map((data,index)=>(
						<div className="media pb-3 pb-sm-4" key={index}>
							<img src={data.image} alt="" className="me-3" width="52" />
							<div className="media-body">
								<h4 className="fs-16 font-w600 mb-0"><Link to={"/reviews"} className="text-black">{data.title}</Link></h4>
								<span className="fs-14 d-block mb-2">2 June 2018 - 4 June 2019</span>
								<div className="star-icons">
									<i className="las la-star me-1"></i>
									<i className="las la-star me-1"></i>
									<i className="las la-star me-1"></i>
									<i className="las la-star me-1"></i>
									<i className="las la-star me-1"></i>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>

		</>
	)
} 

export default OwnerHistory;