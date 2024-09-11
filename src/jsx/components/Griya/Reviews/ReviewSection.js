import React from 'react';
import {Link} from 'react-router-dom';
//Images
import Frame1 from './../../../../images/customers/Frame1.jpg';
import Frame2 from './../../../../images/customers/Frame2.jpg';
import Frame3 from './../../../../images/customers/Frame3.jpg';
import Frame4 from './../../../../images/customers/Frame4.jpg';

function Badgeblog(){
	return(
		<>
			<span className="badge badge-outline-primary badge-lg me-2 mb-2">EXCELENT</span>
			<span className="badge badge-outline-primary badge-lg me-2 mb-2">GREAT</span>
			<span className="badge badge-outline-primary badge-lg me-2 mb-2">BEST SERVICE</span>
		</>
	)
}
function Badgeblog2(){
	return(
		<>
			<span className="badge badge-outline-danger badge-lg me-2 mb-2">BAD SERVICE</span>
			<span className="badge badge-outline-danger badge-lg me-2 mb-2">UNEXPECTED</span>
		</>
	)
}

const ReviewsBlog = [
	{ image: Frame1, cardId:'C01234', title:'James Sullivan', feedback: <Badgeblog />,},
	{ image: Frame2, cardId:'C01235', title:'Deborah Saragi', feedback: <Badgeblog2 />,},
	{ image: Frame3, cardId:'C01236', title:'David Here', feedback: <Badgeblog />,},
	{ image: Frame4, cardId:'C01237', title:'James Bond', feedback: <Badgeblog2 />,},
	{ image: Frame2, cardId:'C01238', title:'James Sullivan', feedback: <Badgeblog />,},
];


const ReviewsBlog2 = [
	{ image: Frame3, cardId:'C12341', title:'David Here', feedback: <Badgeblog />,},
	{ image: Frame4, cardId:'C12342', title:'James Bond', feedback: <Badgeblog2 />,},
	{ image: Frame2, cardId:'C12343', title:'James Sullivan', feedback: <Badgeblog />,},
];
const ReviewsBlog3 = [
	{ image: Frame2, cardId:'C23451', title:'Deborah Saragi', feedback: <Badgeblog2 />,},	
	{ image: Frame4, cardId:'C23452', title:'James Bond', feedback: <Badgeblog />,}
];

const ReviewSection = () =>{
	return(
		<>
			{ReviewsBlog.map((item,index)=>(
				<div className="col-xl-12" key={index}>
					<div className="card">
						<div className="card-body pb-4">
							<div className="row">
								<div className="col-xl-3 col-lg-5 review">
									<img className="me-sm-4 me-3 img-fluid " width="80" src={item.image} alt="DexignZone" />
									<div className="media-body">
										<span className="text-primary d-block fs-16">#{item.cardId}</span>
										<h3 className="fs-18 text-black font-w600">{item.title}</h3>
										<span className="d-block mb-3">Join on 26/04/2020, 12:42 AM</span>
									</div>
								</div>
								<div className="col-xl-7 col-xxl-6 col-lg-7 review-button">
									<p className="mb-0">Friendly service</p>
									<p className="mb-3">Josh, Lunar and everyone at Just Property in Hastings deserved a big Thank You from us for 
									moving us from Jakarta to Medan during the lockdown.</p>
									<div className="d-flex flex-wrap">
										{item.feedback}
									</div>	
								</div>
								<div className="col-xl-2 col-xxl-3">
									<div className="d-flex align-items-center justify-content-xl-end mb-3 mt-4">	
										<h5 className="me-3 fs-24 font-w700 mb-0">5.0</h5>
										<span className="star-review d-block">
											<i className="fa fa-star text-warning me-1"></i>
											<i className="fa fa-star text-warning me-1"></i>
											<i className="fa fa-star text-warning me-1"></i>
											<i className="fa fa-star text-warning me-1"></i>
											<i className="fa fa-star text-light"></i>
										</span>
									</div>
									<div className="d-flex  justify-content-xl-end">
										<Link to={"#"} className="btn btn-outline-light btn-sm me-3">Archive</Link>
										<Link to={"#"} className="btn btn-success btn-sm">Approve</Link>
									</div>
								</div>
							</div>
							
						</div>
					</div>
				</div>
			))}
		</>
	)
}

const ReviewSection2 = () =>{
	return(
		<>
			{ReviewsBlog2.map((item,index)=>(
				<div className="col-xl-12" key={index}>
					<div className="card">
						<div className="card-body pb-4">
							<div className="row">
								<div className="col-xl-3 col-lg-5 review">
									<img className="me-sm-4 me-3 img-fluid " width="80" src={item.image} alt="DexignZone" />
									<div className="media-body">
										<span className="text-primary d-block fs-16">#{item.cardId}</span>
										<h3 className="fs-18 text-black font-w600">{item.title}</h3>
										<span className="d-block mb-3">Join on 26/04/2020, 12:42 AM</span>
									</div>
								</div>
								<div className="col-xl-7 col-xxl-6 col-lg-7 review-button">
									<p className="mb-0">Friendly service</p>
									<p className="mb-3">Josh, Lunar and everyone at Just Property in Hastings deserved a big Thank You from us for 
									moving us from Jakarta to Medan during the lockdown.</p>
									<div className="d-flex flex-wrap">
										{item.feedback}
									</div>	
								</div>
								<div className="col-xl-2 col-xxl-3">
									<div className="d-flex align-items-center justify-content-xl-end mb-3 mt-4">	
										<h5 className="me-3 fs-24 font-w700 mb-0">5.0</h5>
										<span className="star-review d-block">
											<i className="fa fa-star text-warning me-1"></i>
											<i className="fa fa-star text-warning me-1"></i>
											<i className="fa fa-star text-warning me-1"></i>
											<i className="fa fa-star text-warning me-1"></i>
											<i className="fa fa-star text-light"></i>
										</span>
									</div>
									<div className="d-flex  justify-content-xl-end">
										<Link to={"#"} className="btn btn-outline-light btn-sm me-3">Archive</Link>
										<Link to={"#"} className="btn btn-success btn-sm">Approve</Link>
									</div>
								</div>
							</div>
							
						</div>
					</div>
				</div>
			))}
		</>
	)
}
const ReviewSection3 = () =>{
	return(
		<>
			{ReviewsBlog3.map((item,index)=>(
				<div className="col-xl-12" key={index}>
					<div className="card">
						<div className="card-body pb-4">
							<div className="row">
								<div className="col-xl-3 col-lg-5 review">
									<img className="me-sm-4 me-3 img-fluid " width="80" src={item.image} alt="DexignZone" />
									<div className="media-body">
										<span className="text-primary d-block fs-16">#{item.cardId}</span>
										<h3 className="fs-18 text-black font-w600">{item.title}</h3>
										<span className="d-block mb-3">Join on 26/04/2020, 12:42 AM</span>
									</div>
								</div>
								<div className="col-xl-7 col-xxl-6 col-lg-7 review-button">
									<p className="mb-0">Friendly service</p>
									<p className="mb-3">Josh, Lunar and everyone at Just Property in Hastings deserved a big Thank You from us for 
									moving us from Jakarta to Medan during the lockdown.</p>
									<div className="d-flex flex-wrap">
										{item.feedback}
									</div>	
								</div>
								<div className="col-xl-2 col-xxl-3">
									<div className="d-flex align-items-center justify-content-xl-end mb-3 mt-4">	
										<h5 className="me-3 fs-24 font-w700 mb-0">5.0</h5>
										<span className="star-review d-block">
											<i className="fa fa-star text-warning me-1"></i>
											<i className="fa fa-star text-warning me-1"></i>
											<i className="fa fa-star text-warning me-1"></i>
											<i className="fa fa-star text-warning me-1"></i>
											<i className="fa fa-star text-light"></i>
										</span>
									</div>
									<div className="d-flex  justify-content-xl-end">
										<Link to={"#"} className="btn btn-outline-light btn-sm me-3">Archive</Link>
										<Link to={"#"} className="btn btn-success btn-sm">Approve</Link>
									</div>
								</div>
							</div>
							
						</div>
					</div>
				</div>
			))}
		</>
	)
}
export {ReviewSection2, ReviewSection3};
export default ReviewSection;