import React from 'react';
import {Link} from 'react-router-dom';
import PageHead from '../Griya/PageHead';
import ProfileSlider from '../Griya/Property/ProfileSlider';
import OwnerHistory from '../Griya/Property/OwnerHistory';
import GallerySlider from '../Griya/Property/GallerySlider';

//Image
import pic1 from './../../../images/avatar/pic1.jpg';

const PropertyDetails = () =>{
	return(
		<>
			<PageHead activePage="Property Details"  pageName="221 XYZ Franklin State London" />	
			<div className="row">
				<div className="col-xl-12">
					<div className="card">
						<div className="card-body pb-3">
							<ProfileSlider />
							<div className="card-body p-sm-3 p-0">
								<div className="row">
									<div className="col-xl-3 col-xxl-4">
										<div className="my-profile mb-5">
											<div className="avtar mb-3 text-center">
												<img src={pic1} alt="" />
											</div>
											<div className="text-center">
												<h4 className="text-black fs-20 font-w600">Samuel Rodriguez</h4>
												<span className="mb-3 d-block text-success fs-16">OWNER</span>
												<p className="fs-16">Midnight Corner St. Suite 600 San Francisco, CADGE 94107</p>
											</div>	
											<ul className="property-social">
												<li><Link to={"#"}><i className="lab la-instagram"></i></Link></li>
												<li><Link to={"#"}><i className="lab la-facebook-f"></i></Link></li>
												<li><Link to={"#"}><i className="lab la-twitter"></i></Link></li>
											</ul>
										</div>	
										<div className="mb-5">
											<h4 className="font-w600 mb-3 Price">Price</h4>
											<div className="bg-primary text-center price mb-4">
												<div className="card-body">
													<p className="fs-16 text-white mb-0">Start from</p>
													<h2 className="fs-30 text-white mb-0 font-w600">$ 500,000</h2>
													<p className="fs-18 text-white mb-0">until $1,000k</p>
												</div>	
											</div>
											<Link to={"#"} className="btn btn-success btn-block">
												<svg className="me-4" width="28" height="28" viewBox="0 0 	28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
													<path d="M23.9161 4.16308C21.1983 1.41254 17.4654 -0.0937126 13.6016 0.00452112C5.90661 0.233733 -0.118391 6.61893 0.110821 14.3139C0.143566 15.9184 0.471011 17.4901 1.06041 18.9636C1.55158 20.2079 2.20647 21.354 3.02509 22.4018L1.87903 25.1196C1.4206 26.1674 1.91177 27.379 2.9596 27.8374C3.31979 28.0011 3.74547 28.0339 4.1384 27.9684L9.44303 27.0515C11.3422 27.7064 13.3396 27.9356 15.337 27.7392C22.1807 27.0515 27.518 21.4522 27.8782 14.5759C28.0747 10.6793 26.6339 6.91363 23.9161 4.16308ZM12.9794 19.4548H9.34479C8.78813 19.4548 8.29697 18.9964 8.29697 18.407C8.29697 17.8503 8.75539 17.3591 9.34479 17.3591H12.9794C13.5361 17.3591 14.0273 17.8176 14.0273 18.407C14.0273 18.9964 13.5688 19.4548 12.9794 19.4548ZM18.6443 15.198H9.34479C8.78813 15.198 8.29697 14.7396 8.29697 14.1502C8.29697 13.5608 8.75539 13.1024 9.34479 13.1024H18.6443C19.2009 13.1024 19.6921 13.5608 19.6921 14.1502C19.6921 14.7396 19.2009 15.198 18.6443 15.198ZM18.6443 10.9085H9.34479C8.78813 10.9085 8.29697 10.45 8.29697 9.86064C8.29697 9.30398 8.75539 8.81281 9.34479 8.81281H18.6443C19.2009 8.81281 19.6921 9.27124 19.6921 9.86064C19.6921 10.4173 19.2009 10.9085 18.6443 10.9085Z" fill="white"/>
												</svg>
												Get in Touch
											</Link>
										</div>
										<OwnerHistory />										
									</div>
									<div className="col-xl-9 col-xxl-8">
										<div className="mb-5">
											<h4 className="text-black fs-30 font-w600 mb-3">Description</h4>
											<p className="fs-16">vaboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
											<p className="fs-16">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum </p>
										</div>
										<div className="mb-5">
											<h4 className="fs-30 font-w600 mb-3">Gallery</h4>
											<GallerySlider />
										</div>	
										<div className="mb-5">
											<h4 className="fs-30 font-w600 mb-3">Location</h4>
											<div>
												<div className="responsive-map">
													<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2822.7806761080233!2d-93.29138368446431!3d44.96844997909819!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x52b32b6ee2c87c91%3A0xc20dff2748d2bd92!2sWalker+Art+Center!5e0!3m2!1sen!2sus!4v1514524647889" title="myFrame" width="600" height="300" style={{border:"0"}} allowFullScreen></iframe>
												</div>
											</div>
										</div>
										<div>
											<h4 className="fs-30 font-w600 my-3">Features</h4>
											<ul className="property-features">
												<li><i className="fas fa-check-circle"></i>Swimming pool</li>
												<li><i className="fas fa-check-circle"></i>Terrace</li>
												<li><i className="fas fa-check-circle"></i>Radio</li>
												<li><i className="fas fa-check-circle"></i>Grill</li>
												<li><i className="fas fa-check-circle"></i>Cable TV</li>
												<li><i className="fas fa-check-circle"></i>Air conditioning</li>
												<li><i className="fas fa-check-circle"></i>Cofee pot</li>
												<li><i className="fas fa-check-circle"></i>Balcony</li>
												<li><i className="fas fa-check-circle"></i>Computer</li>
												<li><i className="fas fa-check-circle"></i>Parquet</li>
												<li><i className="fas fa-check-circle"></i>Internet</li>
												<li><i className="fas fa-check-circle"></i>Towelwes</li>
												<li><i className="fas fa-check-circle"></i>Roof terrace</li>
												<li><i className="fas fa-check-circle"></i>Oven</li>
											</ul>
										</div>
									</div>	
								</div>
							</div>		
						</div>	
					</div>	
				</div>
			</div>	
		</>		
	)
}
export default PropertyDetails;