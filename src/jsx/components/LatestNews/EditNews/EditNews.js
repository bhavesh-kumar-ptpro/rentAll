import React, { useEffect, useState } from 'react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { API_URL } from '../../../../apiconfig';
function EditNews() {
    const { id } = useParams();
    const [data, setData] = useState({ title: '', description: '' });
    const navigate = useNavigate();
    useEffect(() => {
        if (id) {
          handleGetEdit();
        }
      }, [id]);
    
      const handleGetEdit = async () => {
        try {
          const response = await axios.get(`${API_URL}/api/Managenews/${id}`);
          console.log("response",response);
          setData({
            title: response.data.title,
            description: response.data.description,
          });
        } catch (error) {
          console.error('Error fetching  data:', error.message);
        }
      };

      const handleTitleChange = (e) => {
        setData((prevState) => ({
          ...prevState,
          title: e.target.value
        }));
      };


      const handleDescriptionChange = (event, editor) => {
        const answer = editor.getData();
        setData((prevState) => ({
          ...prevState,
          description: answer
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
        if(data.title ===""){
          amptyField( "Title"|| "Description")
        }else if(data.description === ""){
          amptyField( "Description")
        }
        else {
          try {
            const response = await axios.put(`${API_URL}/api/Managenews/${id}`, {
              title: data.title,
              description: data.description,
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
              navigate("/admin/view/view_news");
      
            }
          } catch (error) {
            console.error('Error submitting  data:', error.message);
          }
        }
      };

  return (
    <div>
    <h5>Latest News</h5>
    <div className="mb-3 row">
      <label className="col-form-label">Title</label>
      <div className="col-sm-9">
        <textarea
          name="title"
          type="text"
          style={{ height: 89 }}
          className="form-control"
          placeholder="Ask a Question"
          value={data.title}
          onChange={handleTitleChange}
          required
        ></textarea>
      </div>
    </div>
    <div className="col-xl-12 col-xxl-12">
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">Description</h4>
        </div>
        <div className="card-body custom-ekeditor">
          <CKEditor
            editor={ClassicEditor}
            data={data.description}
            onChange={handleDescriptionChange}
            required
          />
        </div>
      </div>
    </div>
    <div className="mb-3 row">
      <div className="col-sm-10">
        <button type="submit" onClick={handleSubmit}   className="btn btn-primary">
          Submit
        </button>
      </div>
    </div>
    <ToastContainer />
  </div>
  )
}

export default EditNews