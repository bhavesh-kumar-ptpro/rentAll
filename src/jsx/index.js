import React, { useContext } from "react";

/// React router dom
import {  Routes, Route } from "react-router-dom";

/// Css
import "./index.css";
import "./chart.css";
import "./step.css";

/// Layout
import Nav from "./layouts/nav";
import Footer from "./layouts/Footer";


import Home from "./components/Dashboard/Home";
import AddHMO from "./components/HMOM/AddHMO/AddHMO";
import EditHMO from "./components/HMOM/EditHMO/EditHMO";
import ViewHMO from "./components/HMOM/ViewHMO/ViewHMO";
import AddHospital from "./components/HospitalM/AddHospital/AddHospital";
import EditHospital from "./components/HospitalM/EditHospital/EditHospital";
import ViewHospitals from "./components/HospitalM/ViewHospitals/ViewHospitals";

import AddMapping from "./components/HMOMap/AddMapping/AddMapping";
import ViewMapping from "./components/HMOMap/ViewMapping/ViewMapping";
import EditMapping from "./components/HMOMap/EditMapping/EditMapping";
import UploadMapping from "./components/HMOMap/UploadMapping/UploadMapping";
import FAQs from "./components/FAQs/AddFAQ/FAQs";
import EditFAQs from "./components/FAQs/EditFAQ/EditFAQs";
import ViewFAQ from "./components/FAQs/ViewFAQ/ViewFAQ";
import ClientDescription from "./components/ClientSpeak/AddClientDescription/ClientDescription";
import ViewClientDescription from "./components/ClientSpeak/ViewClientDescription/ViewClientDescription";
import EditClientDescription from "./components/ClientSpeak/EditClientDescription/EditClientDescription";
import ViewCorporatePlan from "./components/ReportM/CorporatePlan/ViewCorporatePlan";
import EditCorporatePlan from "./components/ReportM/CorporatePlan/EditCorporatePlan";
import ViewIndividualPlan from "./components/ReportM/IndividualPlan/ViewIndividualPlan";
import ViewStudentPlan from "./components/ReportM/StudentPlan/ViewStudentPlan";
import ViewTravelPlan from "./components/ReportM/TravelPlan/ViewTravelPlan";
import EditIndividualPlan from "./components/ReportM/IndividualPlan/EditIndividualPlan";
import EditTravelPlan from "./components/ReportM/TravelPlan/EditTravelPlan";
import ViewUser from "./components/ViewUser/ViewUser";

import Error404 from './pages/Error404';

import { ThemeContext } from "../context/ThemeContext";
import AddPlan from "./components/PlanM/AddPlan/AddPlan";
import EditPlan from "./components/PlanM/EditPlan/EditPlan";
import ViewPlan from "./components/PlanM/ViewPlan/ViewPlan";
import UploadPlan from "./components/PlanM/UploadPlan/UploadPlan";
// import Stripe from "./components/Stripe";
import UserSignup from "./components/UserAuth/UserSignup";
// import UserRegistration from "./pages/UserRegistration";
import AddNews from "./components/LatestNews/AddNews/AddNews";
import ViewNews from "./components/LatestNews/ViewNews/ViewNews";
import EditNews from "./components/LatestNews/EditNews/EditNews";
import AddMember from "./components/AddMembers/AddMember/AddMember";
import EditMember from "./components/AddMembers/EditMember/EditMember";
import ViewMember from "./components/AddMembers/ViewMember/ViewMember";
import AddHowItWorks from "./components/HowItWorks/AddHowItWorks/AddHowItWorks";
import EditHowItWorks from "./components/HowItWorks/EditHowItWorks/EditHowItWorks";
import ViewHowItWorks from "./components/HowItWorks/ViewHowItWorks/ViewHowItWorks";
import ViewStatePlans from "./components/ReportM/StatePlan/ViewStatePlan";
import EditStatePlans from "./components/ReportM/StatePlan/EditStatePlan";
// User Routes

const Markup = () => {
    const { menuToggle } = useContext(ThemeContext);
    const routes = [
      /// Dashboard
      
      { url: "/admin/view/dashboard", component: <Home/> },
      { url: "/admin/view/AddHMO", component: <AddHMO/> },
      { url: "/admin/view/EditHMO/:id", component: <EditHMO/> },
      { url: "/admin/view/ViewHMO", component: <ViewHMO/> },
      { url: "/admin/view/AddHospital", component: <AddHospital/> },
      { url: "/admin/view/EditHospital/:id", component: <EditHospital/> },
      { url: "/admin/view/ViewHospitals", component: <ViewHospitals/> },
      { url: "/admin/view/add_hh_mapping", component: <AddMapping/> },
      { url: "/admin/view/view_hh_mapping", component: <ViewMapping/> },
      { url: "/admin/view/edit_hh_mapping/:id", component: <EditMapping/> },

      { url: "/admin/view/add_faq", component: <FAQs/> },
      { url: "/admin/view/view_faq", component: <ViewFAQ/> },
      { url: "/admin/view/edit_faq/:id", component: <EditFAQs/> },
      { url: "/admin/view/add_clientDescription", component:<ClientDescription />},
      { url:"/admin/view/view_clientDescription", component:<ViewClientDescription />},
      { url:"/admin/view/edit_clientDescription/:id", component:<EditClientDescription />}, 
      { url:"/admin/view/view_user", component:<ViewUser />},
      { url:"/admin/view/add_news", component:<AddNews />},
      { url:"/admin/view/view_news", component:<ViewNews />},
      { url:"/admin/view/edit_news/:id", component:<EditNews />},

      { url: "/admin/view/upload_hh_mapping", component: <UploadMapping/> },
      //View Report-management
      { url: "/admin/view/view_individual_plan", component: <ViewIndividualPlan/> },
      { url: "/admin/view/view_state_plan", component: <ViewStatePlans/> },
      { url: "/admin/view/view_corporate_plan", component: <ViewCorporatePlan/> },
      { url: "/admin/view/view_student_plan", component: <ViewStudentPlan/> },
      { url: "/admin/view/view_travel_plan", component: <ViewTravelPlan/> },
            //Edit Report-management
      { url: "/admin/view/edit_individual_plan/:id", component: <EditIndividualPlan/> },
      { url: "/admin/view/edit_state_plan/:id", component: <EditStatePlans/> },
      { url: "/admin/view/edit_corporate_plan/:id", component: <EditCorporatePlan/> },
      { url: "/admin/view/edit_student_plan/:id", component: <UploadMapping/> },
      { url: "/admin/view/edit_travel_plan/:id", component: <EditTravelPlan/> },
            //Plan-management
      { url: "/admin/view/add_plan", component: <AddPlan/> },
      { url: "/admin/view/edit_plan/:id", component: <EditPlan/> },
      { url: "/admin/view/view_plan", component: <ViewPlan/> },
      { url: "/admin/view/upload_plan", component: <UploadPlan/> },
      { url: "/signup", component: <UserSignup/> },
            //Add-member
      { url: "/admin/view/add_member", component: <AddMember/> },
      { url: "/admin/view/edit_member/:id", component: <EditMember/> },
      { url: "/admin/view/view_member", component: <ViewMember/> },
      //How it works
      { url: "/admin/view/add_how", component: <AddHowItWorks/> },
      { url: "/admin/view/edit_how/:id", component: <EditHowItWorks/> },
      { url: "/admin/view/view_how", component: <ViewHowItWorks/> },
      // { url: "/signup", component: <UserRegistration/> },
      // { url: "/stripe", component: },
      { url: "*", component: <Error404/> },
    ];
    const userroutes = [
      // { url: "", component: <UserHome /> },

    ];
    let path = window.location.pathname;
    path = path.split("/").includes("admin");
    let pagePath = path;
    console.log(pagePath,"pagePath");
    // if(pagePath){
      return (
        <>
          <div id={`${pagePath ? "main-wrapper" : ""}`}
          className={`${pagePath ? "show" : "h-100"}  ${
            menuToggle ? "menu-toggle" : ""
          }`}>
            {pagePath && <Nav />}
    
            <div className={`${pagePath ? "content-body" : ""}`}>
              <div
                className={`${pagePath ? "container-fluid" : ""}`}
                style={{ minHeight: window.screen.height - 60 }}
              >
                <Routes>
                  {routes.map((data, i) => (
                    <Route
                      key={i}
                      exact
                      path={`/${data.url}`}
                      element={data.component}
                    />
                  ))}
                </Routes>
              </div>
            </div>
            {pagePath && <Footer />}
          </div>
          {/* <Setting /> */}
        </>
      );
    
  };
  
  export default Markup;