import React from 'react';
import AnalyticsDonut from '../Analytics/AnalyticsDonut';
import CustomersChart from '../Analytics/CustomersChart';
import CustomersChart2 from '../Analytics/CustomersChart2';


const CardDataBlog = () =>{
	return(
		<>
			<div className="row">
				<div className="col-xl-6 col-sm-6">
					<div className="card">
						<div className="card-body d-flex align-items-center justify-content-between">
							<div className="card-data">
								<h5>Propeties for Sale</h5>
								<h2 className="fs-40 font-w600">684</h2>
							</div>
							<div className="d-inline-block position-relative donut-chart-sale">
								{/* <span className="donut1" data-peity='{ "fill": ["var(--primary)", "rgba(240, 240, 240)"],   "innerRadius": 35, "radius":10}'>5/8</span> */}
								<AnalyticsDonut value="62" backgroundColor="rgb(33,111,237)"
									backgroundColor2= "rgba(240, 240, 240)"
								/>
								<small><i className="far fa-building"></i></small>
							</div>
						</div>
					</div>
				</div>
				<div className="col-xl-6 col-sm-6">
					<div className="card">
						<div className="card-body d-flex align-items-center justify-content-between">
							<div className="card-data">
								<h5>Propeties for Rent</h5>
								<h2 className="fs-40 font-w600">546</h2>
							</div>
							<div className="d-inline-block position-relative donut-chart-sale">
								{/* <span className="donut1" data-peity='{ "fill": ["rgb(56, 226, 93,1)", "rgba(240, 240, 240)"],   "innerRadius": 35, "radius": 10}'>5/8</span> */}
								<AnalyticsDonut value="62" backgroundColor="rgb(56, 226, 93)"
									backgroundColor2= "rgba(240, 240, 240)"
								/>
							<small><i className="far fa-building text-success"></i></small>
							</div>
						</div>
					</div>
				</div>
				<div className="col-xl-6 col-sm-6">
					<div className="card">
						<div className="card-body d-flex align-items-center justify-content-between">
							<div className="card-data">
								<h5>New Customers</h5>
								<div className="d-flex align-items-center">	
									<h1 className="fs-40 font-w600 mb-0">75</h1>
									<svg className="ms-2" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M15.9996 28.56C10.1545 28.56 4.9398 24.3587 3.71708 18.6378C3.1062 15.7792 3.51772 12.7395 4.8806 10.153C6.19228 7.66368 8.34268 5.65184 10.9155 4.51168C13.5916 3.32544 16.664 3.11872 19.4768 3.92768C22.1904 4.70784 24.5964 6.42016 26.2345 8.71872C29.6595 13.5242 29.2016 20.2739 25.1721 24.5802C22.8108 27.1037 19.4563 28.56 15.9996 28.56ZM16.678 22.0173L20.1852 18.5098C21.0608 17.6342 19.703 16.2765 18.8275 17.1523L17.0659 18.9142V10.7677C17.0659 10.1866 16.5804 9.70144 15.9993 9.70144C15.4182 9.70144 14.9328 10.1866 14.9328 10.7677V18.9549L13.1635 17.2275C12.2796 16.3638 10.9344 17.7341 11.8224 18.6013L15.3289 22.0253C15.7046 22.3926 16.3062 22.3891 16.678 22.0173Z" fill="#F43D3D"/>
									</svg>
								</div>	
							</div>
							<div id="NewCustomers">
								<CustomersChart />
							</div>
						</div>
					</div>
				</div>
				<div className="col-xl-6 col-sm-6">
					<div className="card">
						<div className="card-body d-flex align-items-center justify-content-between">
							<div className="card-data">
								<h5>Target This Month</h5>
								<div className="d-flex align-items-center">	
									<h1 className="fs-40 font-w600 mb-0">75</h1>
									<svg className="ms-2" width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M12.9996 0.440002C7.15452 0.440002 1.9398 4.64128 0.717079 10.3622C0.106199 13.2208 0.51772 16.2605 1.8806 18.847C3.19228 21.3363 5.34268 23.3482 7.91548 24.4883C10.5916 25.6746 13.664 25.8813 16.4768 25.0723C19.1904 24.2922 21.5964 22.5798 23.2345 20.2813C26.6595 15.4758 26.2016 8.72608 22.1721 4.41984C19.8108 1.89632 16.4563 0.440002 12.9996 0.440002ZM13.678 6.98272L17.1852 10.4902C18.0608 11.3658 16.703 12.7235 15.8275 11.8477L14.0659 10.0858V18.2323C14.0659 18.8134 13.5804 19.2986 12.9993 19.2986C12.4182 19.2986 11.9328 18.8134 11.9328 18.2323V10.0451L10.1635 11.7725C9.27964 12.6362 7.93436 11.2659 8.82236 10.3987L12.3289 6.97472C12.7046 6.60736 13.3062 6.61088 13.678 6.98272Z" fill="#32D16D"/>
									</svg>
								</div>
							</div>
							<div id="Target">
								<CustomersChart2 />
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
export default CardDataBlog;