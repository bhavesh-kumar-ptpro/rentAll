import React, { useState } from 'react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../../../apiconfig';

function AddNews() {
  const [title, setTitle] = useState('');
  const [description, setdescription] = useState('');
  const navigate = useNavigate();

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
};
 
 
const handleDescriptionChange = (data) => {
  setdescription(data);
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
  if (title.trim() === '') {
      console.log("empty");
      showWarning('Title');
  } else if (description.trim() === '') {
      console.log("description");
      showWarning('description');
  } else {
      try {
          const response = await axios.post(`${API_URL}/api/Managenews`, {
            title:title,
            description:description
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
              navigate("/admin/view/view_news");
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
    <h5>Latest News</h5>
    <div className="mb-3 row">
        <label className="card-title ">Title</label>
        <div className="col-sm-9">
            <textarea
                name="title"
                type="text"
                style={{ height: 89 }}
                className="form-control"
                placeholder="Write Your Title"
                value={title}
                onChange={handleTitleChange}
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
                    data={description}
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        handleDescriptionChange(data);
                    }}
                />
            </div>
        </div>
    </div>
    <div className="mb-3 row">
        <div className="col-sm-10">
            <button type="submit"  onClick={handleSubmit} className="btn btn-primary">
                Submit
            </button>
        </div>
    </div>
    <ToastContainer />
</div>
  )
}

export default AddNews