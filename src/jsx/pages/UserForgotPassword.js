import axios from "axios";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
// image
const ForgotPassword = () => {
  const[email,setEmail]=useState("")
  const [loading, setLoading] = useState(false);
   console.log("email",email)
 
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
   
    try{
      const { data } = await axios.post(`http://localhost:3000/api/user/forgotpassword`, {email});
      if(data.status == 400){
        toast.error(`❗ ${data.message}!`, {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
          setLoading(false)
        }else {
              toast.success(" Check your email. !", {
                position: "top-right",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
              setLoading(false)
            }
      
        } catch (error) {
          toast.error(`❗ user not found!`, {
            position: "top-right",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            })
            setLoading(false)
    }
      }
  return (
    <div className="authincation h-100 p-meddle">
      <div className="container h-100">
        <div className="row justify-content-center align-items-center" style={{height:"680px"}}>
          <div className="col-md-6">
            <div className="authincation-content">
              <div className="row no-gutters">
                <div className="col-xl-12">
                  <div className="auth-form">
                    <div className="mb-4 text-centre ">
                      <h3 className="dz-title mb-1" style={{ textAlign: "center" }}>Forgot Password</h3>
                    </div>
                    <form onSubmit={onSubmit}>
                      <div className="form-group">
                        <label className="">
                          <strong>Email</strong>
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="hello@example.com"
                          value={email}
                          onChange={(e)=>setEmail(e.target.value)}
                          required
                        />
                      </div>
                    <div className="text-center">
                    {loading ?  <button type="loading" className="btn btn-primary" disabled>
											  Submitting
										  </button>:
										  <button type="submit" className="btn btn-primary">
											  Submit
										  </button>}
                      </div>
                    </form>
                    <ToastContainer />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;




