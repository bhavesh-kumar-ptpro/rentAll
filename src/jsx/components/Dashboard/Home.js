import React, {
  useContext,
  useEffect,
  Fragment,
  useState,
  useReducer,
} from "react";
import Stripe from "stripe";
//Import
import { ThemeContext } from "../../../context/ThemeContext";
import PageHead from "../Griya/PageHead";
import axios from "axios";
import { API_URL } from "../../../apiconfig";
import { Button } from "react-bootstrap";
import { useParams, useLocation } from 'react-router-dom';

// import DonutChart from '../Griya/Home/DonutChart';
// import CustomerMap from '../Griya/Home/CustomerMap';
// import OverView from '../Griya/Home/OverView';
// import PieChartSection from '../Griya/Home/PieChartSection';
// import PropetiesMap from '../Griya/Home/PropetiesMap';
// import ProgressBar from '../Griya/Home/ProgressBar';
// import CustomerReview from '../Griya/Home/CustomerReview';
// import RecentCustomer from '../Griya/Home/RecentCustomer';

const Home = () => {
  const { changeBackground } = useContext(ThemeContext);
  const [userData, setUserData] = useState({
    TotalHMO: 0,
    TotalHospitals: 0,
    TotalProducts: 0,
    TotalIndividulPlans: 0,
  });
//   const { search } = useLocation();
//   const params = new URLSearchParams(search);
//   const sessionId = params.get('id');
//   console.log("session_id",sessionId);
// const [amount,setAmount] = useState(0)
  useEffect(async () => {
    const response = await axios.get(`${API_URL}/api/hmo/count`);
    const response1 = await axios.get(`${API_URL}/api/hospital/count`);
    const response2 = await axios.get(`${API_URL}/api/Planpolicy_mapping_master/count`);
    const response3 = await axios.get(`${API_URL}/api/indivual_plan_master/count`);

    // await getId()

    // console.log(response.data.count,"success");
    setUserData({
		...userData,
      TotalHMO: response.data.count,
      TotalHospitals: response1.data.count,
      TotalProducts: response2.data.count,
      TotalIndividulPlans: response3.data.count,
    });
    changeBackground({ value: "light", label: "Light" });
  }, []);
  //  const getId =async ()=>{
  //   if(  sessionId){
  //     const session = await  Stripe.checkout.sessions.retrieve(sessionId);
  //     console.log("session_id",sessionId);
  //     // console.log("session",);
  //   }
  // }
// const getStripeTest = async ()=>{
//   const stripe = new Stripe(  "sk_test_51OcN1bSBagUy9FTJ8VjAdf8nXiqaLY89ZQV4Up8CNvujHMrLFfV7kcDpPMakEHit9qyGwAmyO7SfsAvy98yjKN0W00Pbcv539f", {
//     apiVersion: "2022-11-15",
//   });

//   const session = await stripe.checkout.sessions.create({
//     payment_method_types:["card"],
//     line_items:[{
//       price_data : {
//         currency:'usd',
//         product_data:{
//           name:"Xpro"
//         },
//         unit_amount:Number(amount)*100

//       },
//       quantity:1
//   }],
//     mode: "payment",
//     // success_url: "http://localhost:3000/admin/view/dashboard",
//     success_url: "http://localhost:3000/admin/view/ViewHMO/?id={CHECKOUT_SESSION_ID}",
//     cancel_url: "http://localhost:3000/admin/view/dashboard",
// })
 
// console.log("session",session);
// }
// const handleChange =(e)=>{
//   setAmount(Number(e.target.value))
// console.log("target",e.target.value);
// }
  console.log(userData);
  return (
    <>
      <PageHead activePage="Dashboard" pageName="Dashboard" />
      <div class="row">
        <div class="col-lg-3 col-6">
          <div class="small-box bg-info">
            <div class="inner">
              <h3>{userData.TotalHMO}</h3>

              <p>Total HMO</p>
            </div>
            <div class="icon">
              <i class="ion ion-bag"></i>
            </div>
            <a href="/admin/view/ViewHMO" class="small-box-footer">
              More info <i class="fas fa-arrow-circle-right"></i>
            </a>
          </div>
        </div>

        <div class="col-lg-3 col-6">
          <div class="small-box bg-success">
            <div class="inner">
              <h3>{userData.TotalHospitals}</h3>

              <p>Total Hospitals</p>
            </div>
            <div class="icon">
              <i class="ion ion ion-bag"></i>
            </div>
            <a href="/admin/view/ViewHospitals" class="small-box-footer">
              More info <i class="fas fa-arrow-circle-right"></i>
            </a>
          </div>
        </div>

        <div class="col-lg-3 col-6">
          <div class="small-box bg-warning">
            <div class="inner">
              <h3>{userData.TotalProducts}</h3>

              <p>Total Products</p>
            </div>
            <div class="icon">
              <i class="ion ion ion-bag"></i>
            </div>
            <a href="#" class="small-box-footer">
              More info <i class="fas fa-arrow-circle-right"></i>
            </a>
          </div>
        </div>

        <div class="col-lg-3 col-6">
          <div class="small-box bg-danger">
            <div class="inner">
              <h3>{userData.TotalIndividulPlans}</h3>

              <p>Total Individul Plans</p>
            </div>
            <div class="icon">
              <i class="ion ion ion-bag"></i>
            </div>
            <a href="/admin/view/view_individual_plan" class="small-box-footer">
              More info <i class="fas fa-arrow-circle-right"></i>
            </a>
          </div>
        </div>
           

      </div>
      {/* <input type="number" onChange={handleChange}/>
      <Button onClick={getStripeTest}>Button</Button> */}
    </>
  );
};
export default Home;
