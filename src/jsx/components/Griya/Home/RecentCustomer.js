import React,{ useState} from 'react';
import {Link} from 'react-router-dom';
import {Dropdown, Modal} from 'react-bootstrap';
import swal from "sweetalert";
import {nanoid} from 'nanoid';

import user from './../../../../images/contacts/user.jpg';
import Pic1 from './../../../../images/contacts/pic-111.jpg';
import Pic2 from './../../../../images/contacts/pic222.jpg';
import Pic3 from './../../../../images/contacts/pic-333.jpg';
import Pic4 from './../../../../images/contacts/pic444.jpg';
import Pic5 from './../../../../images/contacts/pic555.jpg';
import Pic6 from './../../../../images/contacts/pic666.jpg';

const cardBlog = [
	{ id:1, image: Pic1, title:"Benny Chagur",  subtitle: 'MEMBER' },
	{ id:2, image: Pic2, title:"Chynita Bella", subtitle: 'MEMBER' },
	{ id:3, image: Pic3, title:"David Heree", subtitle: 'Regular Customer' },
	{ id:4, image: Pic4, title:"Evan D. Mas", subtitle: 'MEMBER' },
	{ id:5, image: Pic5, title:"Supratman", subtitle: 'Regular Customer' },
	{ id:6, image: Pic6, title:"John Kusnaidi", subtitle: 'MEMBER' },
];

const RecentCustomer = () => {
	const [postModal, setPostModal] = useState(false);
	 const [contacts, setContacts] = useState(cardBlog);
	//Add data 
    const [addFormData, setAddFormData ] = useState({
		title: '',	
		subtitle: '',	
		image:'',
    }); 
    
    // Add contact function
    const handleAddFormChange = (event) => {
        event.preventDefault();    
        const fieldName = event.target.getAttribute('name');
        const fieldValue = event.target.value;
        const newFormData = {...addFormData};
        newFormData[fieldName] = fieldValue;
        setAddFormData(newFormData);
    };
    
     //Add Submit data
    const handleAddFormSubmit = (event)=> {
        event.preventDefault();
        var error = false;
		var errorMsg = '';
        if(addFormData.title === ""){
            error = true;
			errorMsg = 'Please fill date';
        }else if(addFormData.subtitle === ""){
            error = true;
			errorMsg = 'Please fill name.';
        }
        if(!error){
            const newContact = {
                id: nanoid(),
                title: addFormData.title,
                subtitle:  addFormData.subtitle,
				image: addFormData.image,
            };
            const newContacts = [...contacts, newContact];
            setContacts(newContacts);
            setPostModal(false);
            swal('Good job!', 'Successfully Added', "success");
            addFormData.title = addFormData.subtitle  = '';         
            
        }else{
			swal('Oops', errorMsg, "error");
		}
    }; 
	//For Image upload in ListBlog
	const [file, setFile] = React.useState(null)
    const fileHandler = (e) => {
        setFile(e.target.files[0]);
		setTimeout(function(){
			var src = document.getElementById("saveImageFile").getAttribute("src");
			addFormData.image = src; 
		}, 200);
    }
	return(
		<>
			<div className="card">
				<div className="card-header border-0 pb-0">
					<h4 className="fs-20">Recent Customer</h4>
					<Dropdown className="custom-dropdown mb-0">
						<Dropdown.Toggle as="div" className="btn sharp tp-btn dark-btn i-false">
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" stroke="#342E59" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
								<path d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z" stroke="#342E59" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
								<path d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z" stroke="#342E59" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
							</svg>
						</Dropdown.Toggle>
						<Dropdown.Menu className="dropdown-menu dropdown-menu-right">
							<Dropdown.Item>Details</Dropdown.Item>
							<Dropdown.Item className="text-danger">Cancel</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
				</div>
				<div className="card-body">
					{contacts.map((contact,index)=>(
						<div className="d-flex align-items-center mb-4" key={index}>
							<div className="recent-customer me-3">
								<img src={contact.image} width="50" alt="" />
							</div>
							<div>
								<h5 className="mb-0">{contact.title}</h5>
								<p className="font-w600 mb-0 text-primary">{contact.subtitle}</p>
							</div>
						</div>	
					))}	
				</div>
				<div className="card-footer border-0">
					<Link to={"#"} onClick={()=> setPostModal(true)} className="btn btn-primary btn-block">+Add New Customer</Link>
					<Modal className="modal fade"  show={postModal} onHide={setPostModal} >
						<div className="" role="document">
							<div className="">
								<form >
									<div className="modal-header">
										<h4 className="modal-title fs-20">Add Task</h4>
										<button type="button" className="btn-close" onClick={()=> setPostModal(false)} data-dismiss="modal"></button>
									</div>
									<div className="modal-body">
										<i className="flaticon-cancel-12 close"></i>
										<div className="add-contact-box">
											<div className="add-contact-content">
												<div className="image-placeholder">	
													<div className="avatar-edit">
														<input type="file" onChange={fileHandler} id="imageUpload" 
															onClick={(event) => setFile(event.target.value)}
														/> 					
														<label htmlFor="imageUpload" name=''  ></label>
													</div>
													<div className="avatar-preview">
														<div id="imagePreview">
															<img id="saveImageFile" src={file? URL.createObjectURL(file) : user} 
																alt={file? file.name : null}
															/>
														</div>
													</div>
												</div> 
												 <div className="form-group mb-3">
													<label className="text-black font-w500">Name</label>
													<div className="contact-name">
														<input type="text"  className="form-control"  autocomplete="off"
															name="title" required="required"
															onChange={handleAddFormChange}
															placeholder="name"
														/>
													</div>
												</div>
												<div className="form-group mb-3">
													<label className="text-black font-w500">Customer Type</label>
													<div className="contact-name">
														<input type="text"  className="form-control"  autocomplete="off"
															name="subtitle" required="required"
															onChange={handleAddFormChange}
															placeholder="type"
														/>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className="modal-footer">
										<button type="submit" className="btn btn-primary" onClick={handleAddFormSubmit}>Add</button>  
										<button type="button" onClick={()=> setPostModal(false)} className="btn btn-danger"> <i className="flaticon-delete-1"></i> Discard</button>      
									</div>
								</form>
								
							</div>
						</div>
					</Modal>
				</div>
			</div>
		</>
	)
}
export default RecentCustomer;
