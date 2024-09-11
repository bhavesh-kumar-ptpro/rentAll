import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { toast } from 'react-toastify';
import { API_URL } from '../../../../apiconfig';
 const EditFAQs = () => {
  const { id } = useParams();
  const [data, setData] = useState({ faq_question: '', faq_answer: '' });
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      handleGetEdit();
    }
  }, [id]);

  const handleGetEdit = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/faq/${id}`);
      console.log("response",response);
      setData({
        faq_question: response.data.faq_question,
        faq_answer: response.data.faq_answer,
      });
    } catch (error) {
      console.error('Error fetching FAQ data:', error.message);
    }
  };

  const handleQuestionChange = (e) => {
    setData((prevState) => ({
      ...prevState,
      faq_question: e.target.value
    }));
  };

  const handleAnswerChange = (event, editor) => {
    const answer = editor.getData();
    setData((prevState) => ({
      ...prevState,
      faq_answer: answer
    }));
  };

  const amptyField=(val)=>{
		toast.warn(`❗ ${val} Field is Empty`, {
			position: "top-right",
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			});
	}

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(data.faq_question ===""){
      amptyField( "FAQ Question"|| "FAQ Answer")
    }else if(data.faq_answer === ""){
      amptyField( "FAQ Answer")
    }
    else {
      try {
        const response = await axios.put(`${API_URL}/api/faq/${id}`, {
          faq_question: data.faq_question,
          faq_answer: data.faq_answer,
        });
  
        console.log('Response data:', response);
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
        console.error('Error submitting FAQ data:', error.message);
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
            name="faq_question"
            type="text"
            style={{ height: 89 }}
            className="form-control"
            placeholder="Ask a Question"
            value={data.faq_question}
            onChange={handleQuestionChange}
            required
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
              data={data.faq_answer}
              onChange={handleAnswerChange}
              required
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
    </div>
  );
};
export default EditFAQs;
