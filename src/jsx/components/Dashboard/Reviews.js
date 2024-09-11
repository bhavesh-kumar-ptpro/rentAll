import {Link} from 'react-router-dom';
import {Tab, Nav} from 'react-bootstrap';
import PageHead from '../Griya/PageHead';

import ReviewSection from '../Griya/Reviews/ReviewSection';
import {ReviewSection2} from '../Griya/Reviews/ReviewSection';
import {ReviewSection3} from '../Griya/Reviews/ReviewSection';

const Reviews = () =>{
	return(
		<>
			<PageHead activePage="Reviews"  pageName="Review" />
			<Tab.Container defaultActiveKey="AllReviews">
				<div className="row contacts-list-area">
					<div className="d-flex justify-content-between align-items-center flex-wrap">
						<div className="mb-4">
							<div className="card-action coin-tabs review-tabs-1">
								<Nav as="ul" className="nav nav-tabs" role="tablist">
									<Nav.Item as="li" className="nav-item">
										<Nav.Link className="nav-link" eventKey="AllReviews">
											All Reviews
										</Nav.Link>
									</Nav.Item>
									<Nav.Item as="li" className="nav-item">
										<Nav.Link className="nav-link"  eventKey="Published" >
											Published
										</Nav.Link>
									</Nav.Item>
									<Nav.Item as="li" className="nav-item">
										<Nav.Link className="nav-link" eventKey="Deleted">
											Deleted
										</Nav.Link>
									</Nav.Item>
								</Nav>
							</div>
						</div>
						<div className="mb-4">
							<Link to={"#"} className="btn btn-primary me-4"><i className="fas fa-calendar me-3"></i>Filter</Link>
							<Link to={"#"} className="btn btn-warning"><i className="fas fa-redo-alt me-3"></i>Refresh</Link>
						</div>
					</div>
					<Tab.Content>
						<Tab.Pane eventKey="AllReviews">
							<ReviewSection />
						</Tab.Pane>
						<Tab.Pane eventKey="Published">
							<ReviewSection2 />
						</Tab.Pane>	
						<Tab.Pane eventKey="Deleted">
							<ReviewSection3 />
						</Tab.Pane>	
						<div className="d-flex align-items-center justify-content-between button flex-wrap">
							<div>
								<h5>Showing 5 from 110 data</h5>
							</div>
							<div>
								<ul className="pagination align-items-center">
									<li className="page-item page-indicator">
										<Link to={"#"} className="btn btn-primary btn-sm me-2">Previous</Link>
									</li>
									<li className="page-item active"><Link to={"#"} className="page-link">1</Link></li>
									<li className="page-item"><Link to={"#"} className="page-link">2</Link></li>
									<li className="page-item"><Link to={"#"} className="page-link">3</Link></li>
									<li className="page-item page-indicator">
										<Link to={"#"} className="btn btn-primary btn-sm me-2" >Next</Link>
									</li>
								</ul>
							</div>
						</div>
					</Tab.Content>
				</div>	
			</Tab.Container>	
		</>
	)
}
export default Reviews;