// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import axios from 'axios'
// import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify'
// import { API_URL } from '../../../../apiconfig';
// const FAQs = () => {
//     const [ques, setQues] = useState('')
//     const [ans, setAns] = useState('')
//     const navigate = useNavigate();

//     const handleques = (e) => {
//         setQues(e.target.value)
//     }
//     const handleFAQChange = (data, descriptionKey) => {
//         setAns(data)
		
// 	  };
//       const amptyField=(val)=>{
// 		toast.warn(`❗ ${val} Field is Empty`, {
// 			position: "top-right",
// 			autoClose: 5000,
// 			hideProgressBar: false,
// 			closeOnClick: true,
// 			pauseOnHover: true,
// 			draggable: true,
// 			progress: undefined,
// 			});
// 	}
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         console.log("Sucess", ques, ans)
//         if(ques == ''){
//              amptyField('FAQ Question')
//         }else if(ans == ''){
//             amptyField('FAQ Answer')
//         }
//        else {
//             const response = axios.post(`${API_URL}/api/faq`, {
//                 faq_question: ques,
//                 faq_answer: ans
//             })
//                 .then(( response) => {
//                     console.log('Response data:', response);
//                     if (response.status == 200) {
//                         toast.success("✔️ Submision successful !", {
//                             position: "top-right",
//                             autoClose: 5000,
//                             hideProgressBar: false,
//                             closeOnClick: true,
//                             pauseOnHover: true,
//                             draggable: true,
//                             progress: undefined,
//                         });
//                         navigate("/admin/view/view_faq");
//                     }
//                 });
//         } 
//     }

//     return (
//         <div>
//             <h5>FAQ Section </h5>
//             <div className="mb-3 row">
//                 <label className="col-form-label">Questions</label>
//                 <div className="col-sm-9">
//                     <textarea
//                         name="FAQ_question"
//                         type="text"
//                         style={{height:89}}
//                         className="form-control"
//                         placeholder="Ask a Question"
//                         value={ques}
//                         onChange={handleques}
                        

//                     ></textarea>
//                 </div>
//             </div>
//             <div className="col-xl-12 col-xxl-12">
// 										<div className="card">
// 											<div className="card-header">
// 												<h4 className="card-title">Answer </h4>
// 											</div>
// 											<div className="card-body custom-ekeditor">
// 												<CKEditor
// 													editor={ClassicEditor}
// 													data={ans}
// 													onChange={(event, editor) => {
// 														const data = editor.getData();
// 														handleFAQChange(data, 'description_1');
// 													}}
                                                    
// 												/>
// 											</div>
// 										</div>
// 									</div>
//             <div className="mb-3 row">
//                 <div className="col-sm-10">
//                     <button type="submit" onClick={handleSubmit} className="btn btn-primary">
//                         Submit
//                     </button>
//                 </div>
//             </div>

//         </div>

//     )
// }
// export default FAQs;
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { API_URL } from '../../../../apiconfig';

const FAQs = () => {
    const [ques, setQues] = useState('');
    const [ans, setAns] = useState('');
    const navigate = useNavigate();

    const handleQuesChange = (e) => {
        setQues(e.target.value);
    };

    const handleFAQChange = (data) => {
        setAns(data);
    };

    const showWarning = (field) => {
        toast.info(`❗ ${field} Field is Empty`, {
            position: "top-right",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (ques.trim() === '') {
            console.log("empty");
            showWarning('FAQ Question');
        } else if (ans.trim() === '') {
            console.log("Answer");
            showWarning('FAQ Answer');
        } else {
            try {
                const response = await axios.post(`${API_URL}/api/faq`, {
                    faq_question: ques,
                    faq_answer: ans
                });
                if (response.status === 200) {
                    toast.success("✔️ Submission successful!", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    navigate("/admin/view/view_faq");
                }
            } catch (error) {
                console.error('Submission failed:', error);
                toast.error("❗ Submission failed. Please try again.", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        }
    };

    return (
        <div>
            <h5>FAQ Section</h5>
            <div className="mb-3 row">
                <label className="col-form-label">Questions</label>
                <div className="col-sm-9">
                    <textarea
                        name="FAQ_question"
                        type="text"
                        style={{ height: 89 }}
                        className="form-control"
                        placeholder="Ask a Question"
                        value={ques}
                        onChange={handleQuesChange}
                    ></textarea>
                </div>
            </div>
            <div className="col-xl-12 col-xxl-12">
                <div className="card">
                    <div className="card-header">
                        <h4 className="card-title">Answer</h4>
                    </div>
                    <div className="card-body custom-ekeditor">
                        <CKEditor
                            editor={ClassicEditor}
                            data={ans}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                handleFAQChange(data);
                            }}
                        />
                    </div>
                </div>
            </div>
            <div className="mb-3 row">
                <div className="col-sm-10">
                    <button type="submit" onClick={handleSubmit} className="btn btn-primary">
                        Submit
                    </button>
                </div>
            </div>
            <ToastContainer />
        </div>
        
    );
};

export default FAQs;
