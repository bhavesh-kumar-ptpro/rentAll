import { lazy, Suspense, useEffect } from "react";

// /// Components
import Index from "./jsx";
// import UserIndex from "./jsx/userIndex";
import { connect, useDispatch } from "react-redux";
import {
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
// // action
import { checkAutoLogin, checkuserAutoLogin } from "./services/AuthService";
import {
  isAuthenticated,
  isadminAuthenticated,
} from "./store/selectors/AuthSelectors";
// Style
import "./vendor/bootstrap-select/dist/css/bootstrap-select.min.css";
import "./css/style.css";
import UserRegistration from "./jsx/pages/UserRegistration";
import MyPlans from "./jsx/pages/MyPlans";
//User routes 
const SignUp = lazy(() => import("./jsx/pages/UserRegistration"));
const ForgotPassword = lazy(() => import("./jsx/pages/UserForgotPassword"));
const UserLogin = lazy(() => import("./jsx/pages/UserLogin"));
const Header = lazy(() => import("./jsx/layouts/UserHeader"));
const Footer = lazy(() => import("./jsx/layouts/UserFooter"));
const Error404 = lazy(() => import("./jsx/pages/Error404"));
const UserHome = lazy(() => import("./jsx/pages/Home"));
const Ewallet = lazy(() => import("./jsx/pages/Ewallet"));
const About = lazy(() => import("./jsx/pages/About"));
const AppAbout = lazy(() => import("./jsx/pages/AppAbout"));
const HowWorks = lazy(() => import("./jsx/pages/HowWorks"));
const BuyPlan = lazy(() => import("./jsx/pages/BuyPlan"));
const PaymentOption = lazy(() => import("./jsx/pages/PaymentOption"));
const PaymentConfirm = lazy(() => import("./jsx/pages/PaymentConfirm"));
const AppHowWorks = lazy(() => import("./jsx/pages/AppHowWorks"));
// const UserSignup = lazy(() => import("./jsx/components/UserAuth/UserSignup"));
const IndividualPlanPurchase = lazy(() => import("./jsx/pages/IndividualPlan"));
const CorporatePlanPurchase = lazy(() => import("./jsx/pages/CorporatePlan"));
const TravelPlanPurchase = lazy(() => import("./jsx/pages/TravelPlan"));
const SearchResult = lazy(() => import("./jsx/pages/SearchResult"));
const FamilyVideo = lazy(() => import("./jsx/pages/FamilyVideo"));
const NoticeDisclaimer = lazy(() => import("./jsx/pages/NoticeDisclaimer"));
const FamilyInsurance = lazy(() => import("./jsx/pages/FamilyInsurance"));
const HospitalSearch = lazy(() => import("./jsx/pages/HospitalSearch"));
const FindHospital = lazy(() => import("./jsx/pages/FindHospital"));
const CorporateForm = lazy(() => import("./jsx/pages/CorporateForm"));
const CorporatePlan = lazy(() => import("./jsx/pages/CorporatePlan"));
const CorporateDetails = lazy(() => import("./jsx/pages/CorporateDetails"));
const OtpVerification = lazy(() => import("./jsx/pages/OtpVerification"));
const StatePlans = lazy(() => import("./jsx/pages/StatePlans"));
const StatePlan = lazy(() => import("./jsx/pages/StatePlan"));
//import FindHospital from "./jsx/pages/FindHospital";
//import HospitalSearch from "./jsx/pages/HospitalSearch";
// const SearchResult = lazy(() => import("./jsx/pages/SearchResult"));
// import Error404 from './pages/Error404';

//admin routes
const Login = lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(import("./jsx/pages/Login")), 500);
  });
});

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    //console.log('====',Component);
    return <Component {...props} router={{ location, navigate, params }} />;
  }
  return ComponentWithRouterProp;
}

function App(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let path = window.location.pathname;
  let userpath = window.location.pathname;
  let apppath = window.location.pathname;
  apppath = apppath.split("/").includes("app");
  path = path.split("/").includes("admin");
  userpath = userpath.split("/").includes("user");
  useEffect(() => {
    if (path) {
      checkAutoLogin(dispatch, navigate);
    } else {
      checkuserAutoLogin(dispatch, navigate, userpath);
    }
  }, []);
  console.log(props.isadminAuthenticated, "isadminAuthenticated");
  console.log(props.isAuthenticated, "isAuthenticated");
  let routeblog;
  let authrouteblog;
  console.log(path);
  if (path) {
    routeblog = (
      <Routes>
        <Route path="/admin/view/login" element={<Login />} />
      </Routes>
    );

    if (props.isadminAuthenticated) {
      return (
        <>
          <Suspense
            fallback={
              <div id="preloader">
                <div className="sk-three-bounce">
                  <div className="sk-child sk-bounce1"></div>
                  <div className="sk-child sk-bounce2"></div>
                  <div className="sk-child sk-bounce3"></div>
                </div>
              </div>
            }
          >
            <Index />
          </Suspense>
        </>
      );
    } else {
      return (
        <div className="vh-100">
          <Suspense
            fallback={
              <div id="preloader">
                <div className="sk-three-bounce">
                  <div className="sk-child sk-bounce1"></div>
                  <div className="sk-child sk-bounce2"></div>
                  <div className="sk-child sk-bounce3"></div>
                </div>
              </div>
            }
          >
            {routeblog}
          </Suspense>
        </div>
      );
    }
  } else {
    console.log("flase", props.isAuthenticated);
    routeblog = (
      <Routes>
        <Route path="/login" element={<UserLogin />} />
        <Route path="" element={<UserHome />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        {/* <Route path="/e-wallet" element={<Ewallet />} /> */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/plans/1" element={<IndividualPlanPurchase />} />
        <Route path="/plans/2" element={<CorporatePlan />} />
        <Route path="/plans/2/form/:userId/:hmo_Id" element={<CorporateForm />} />
        <Route path="/user/plans/2/details" element={<CorporateDetails />} />
        <Route path="/plans/3" element={<TravelPlanPurchase />} />
        <Route path="/plans/4" element={<StatePlans/>} />
        <Route path="/plans/5" element={<StatePlan/>} />
        <Route path="/about" element={<About />} />
        <Route path="/app/about" element={<AppAbout />} />
        <Route path="/howworks" element={<HowWorks />} />
        <Route path="/app/howworks" element={<AppHowWorks />} />
        <Route path="/code-verify/:email" element={<OtpVerification />} />
        <Route path="/user/find-hospital" element={<FindHospital />} />
        <Route path="*" element={<Error404 />} />
        
      </Routes>
    );
    if (props.isAuthenticated) {
      authrouteblog = (
        <Routes>
          <Route path="" element={<UserHome />} />
          <Route path="/user/search_result" element={<SearchResult />} />
          <Route path="/user/e-wallet" element={<Ewallet />} />
          <Route path="/about" element={<About />} />
          <Route path="/user/find-hospital" element={<FindHospital />} />
          <Route path="/user/search-hospital/:hospital_type/:local_govt/:state" element={<HospitalSearch />} />
          {/* <Route path="/user/search-hospital" element={<HospitalSearch />} /> */}
          <Route path="/app/about" element={<AppAbout />} />
          <Route path="/howworks" element={<HowWorks />} />
          <Route path="/app/howworks" element={<AppHowWorks />} />
          <Route path="/plans/1" element={<IndividualPlanPurchase />} />
          <Route path="/plans/2" element={<CorporatePlan />} />
          <Route path="/plans/2/form/:userId/:hmo_Id" element={<CorporateForm />} />
          <Route path="/user/plans/2/details" element={<CorporateDetails />} />
          <Route path="/plans/3" element={<TravelPlanPurchase />} />
          <Route path="/plans/4" element={<StatePlans/>} />
          <Route path="/plans/5" element={<StatePlan/>} />
          <Route path="/user/buyplan/:id/:planType" element={<BuyPlan />} />
          <Route path="/user/paymentoption/:id/:planType" element={<PaymentOption />} />
          <Route path="/user/paymentconfirm/:planId/:id/:planType" element={<PaymentConfirm />} />
          <Route path="/user/FamilyInsurance/:id" element={<FamilyInsurance />} />
          <Route path="/user/FamilyVideo/:id" element={<FamilyVideo />} />
          <Route path="/user/NoticeDisclaimer/:id" element={<NoticeDisclaimer />} />
          <Route path="*" element={<Error404 />} />
          <Route path="/code-verify/:email" element={<OtpVerification />} />
          <Route path="/user/my-plans" element={<MyPlans />} />
        </Routes>
      );
      return (
        <>
          <Suspense
            fallback={
              <div id="preloader">
                <div className="sk-three-bounce">
                  <div className="sk-child sk-bounce1"></div>
                  <div className="sk-child sk-bounce2"></div>
                  <div className="sk-child sk-bounce3"></div>
                </div>
              </div>
            }
          >
            <div>
              {!path && !apppath && <Header />}

              <div>
                <div className={`${!path ? "container-fluid" : ""}`}
                  style={{ minHeight: window.screen.height - 60 }}>
                  {authrouteblog}
                </div>
              </div>
              {!path && !apppath && <Footer />}
            </div>
          </Suspense>
        </>
      );
    } else {
      return (
        // <div className="vh-100">
        <Suspense
          fallback={
            <div id="preloader">
              <div className="sk-three-bounce">
                <div className="sk-child sk-bounce1"></div>
                <div className="sk-child sk-bounce2"></div>
                <div className="sk-child sk-bounce3"></div>
              </div>
            </div>
          }
        >
          <div>
            {!path && !apppath && <Header />}

            <div>
              <div className={`${!path ? "container-fluid" : ""}`}
                style={{ minHeight: window.screen.height - 60 }}>
                {routeblog}
              </div>
            </div>
            {!path && !apppath && <Footer />}
          </div>
        </Suspense>
        // </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: isAuthenticated(state),
    isadminAuthenticated: isadminAuthenticated(state),
  };
};

{
  /* export default connect((mapStateToProps)(App));  */
}
export default withRouter(connect(mapStateToProps)(App));
