import React, { useContext } from "react";

/// React router dom
import {  Routes, Route } from "react-router-dom";

import Error404 from './pages/Error404';

import Ewallet from"./pages/Ewallet";
// const UserSignup = lazy(() => import("./jsx/components/UserAuth/UserSignup"));
import IndividualPlanPurchase from"./pages/IndividualPlan";
import CorporatePlanPurchase from"./components/AllPlans/PurchaseCorporatePlan";
import TravelPlanPurchase from"./pages/TravelPlan";
import SearchResult from"./pages/SearchResult";
import Header  from "./layouts/UserHeader";
import UserFooter from"./layouts/UserFooter";
import UserHome from"../jsx/pages/Home";
import About from "../jsx/pages/About";
import HowWorks from "../jsx/pages/HowWorks";
import BuyPlan from "../jsx/pages/BuyPlan";
import PaymentOption from "../jsx/pages/PaymentOption";
import PaymentConfirm from "../jsx/pages/PaymentConfirm";

// Style
import "../vendor/bootstrap-select/dist/css/bootstrap-select.min.css";
// import "../css/style.css";

const UserIndex = () => {
    // const { menuToggle } = useContext(ThemeContext);
    
    const routes = [
      /// Dashboard
      
      // <Route path="" element={< />} />
      { url: "*", component: <Error404/> },
      {url:"",component: <UserHome/>},
      { url:"/about", component:<About/>},
      { url:"/howworks" ,component:<HowWorks/>},
      { url: "/plans/1", component: <IndividualPlanPurchase/> },
      { url: "/plans/2", component: <CorporatePlanPurchase/> },
      { url: "/plans/3", component: <TravelPlanPurchase/> },
      { url: "user/search_result", component: <SearchResult/> },
      { url: "user/e-wallet", component: <Ewallet/> },
      { url: "user/buyplan/:id", component: <BuyPlan/> },
      { url: "user/paymentoption/:id", component: <PaymentOption/> },
      { url: "user/paymentconfirm/:id", component: <PaymentConfirm/> },
    ];
    let path = window.location.pathname;
    path = path.split("/").includes("admin");
    let pagePath = path;
    console.log(pagePath,"pagePath");
      return (   
        <div id={"main-wrapper"}
        className={"show"}>
          {<Header />}

          <div className={"content-body"}>
            <div className={`${!path ? "container-fluid" : ""}`}
              style={{ minHeight: window.screen.height - 60 }}>
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
          {<UserFooter />}
        </div>
      )
    
  };

  export default UserIndex;