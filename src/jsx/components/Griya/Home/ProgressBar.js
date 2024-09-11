import React from 'react';

const ProgressBar = ()=>{
	return(
		<>
			<div className="card">
				<div className="card-body pb-3">
					<p className="mb-2 d-flex  fs-16 text-black font-w500">Product Viewed
						<span className="ms-auto text-dark fs-14 font-w400">561/days</span>
					</p>
					<div className="progress mb-4" style={{height:"18px"}}>
						<div className="progress-bar bg-primary progress-animated" style={{width:"60%", height:"18px"}} role="progressbar">
							<span className="sr-only">60% Complete</span>
						</div>
					</div>
					<p className="mb-2 d-flex  fs-16 text-black font-w500">Product Listed
						<span className="ms-auto text-dark fs-14 font-w400">3,456 Unit</span>
					</p>
					<div className="progress mb-3" style={{height:"18px"}}>
						<div className="progress-bar bg-primary progress-animated" style={{width:"90%", height:"18px"}} role="progressbar">
							<span className="sr-only">90% Complete</span>
						</div>
					</div>
					<p className="mb-2 d-flex  fs-16 text-black font-w500">Reviews
						<span className="ms-auto text-dark fs-14 font-w400">456 Comment</span>
					</p>
					<div className="progress mb-3" style={{height:"18px"}}>
						<div className="progress-bar bg-primary progress-animated" style={{width:"50%", height:"18px"}} role="progressbar">
							<span className="sr-only">50% Complete</span>
						</div>
					</div>
				</div>
			</div>
		</>
	)
} 
export default ProgressBar;