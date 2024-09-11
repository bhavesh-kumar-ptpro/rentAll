import React from 'react';
import loadable from "@loadable/component";
import pMinDelay from "p-min-delay";

const PieChart = loadable(() =>
	pMinDelay(import("./PieChart"), 1000)
);

const PieChartSection = () =>{
	return(
		<>
			<div className="card">
				<div className="card-header border-0">
					<h4 className="fs-20">Pie Chart</h4>
				</div>
				<div className="card-body pt-0 text-center">
					<div id="pieChart2" className="d-inline-block pieChart1">
						<PieChart />
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
									<svg className="me-1" width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
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
		</>
	)
}
export default PieChartSection;