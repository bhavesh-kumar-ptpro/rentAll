import axios from 'axios';
import swal from "sweetalert";
import {
    loginConfirmedAction,
    logout,
    userloginConfirmedAction,
    userlogout
} from '../store/actions/AuthActions';
import { toast } from "react-toastify";
import { API_URL }from "../apiconfig";

export function signUp(email, password) {
    //axios call
    const postData = {
        email,
        password,
        returnSecureToken: true,
    };
    return axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD3RPAp3nuETDn9OQimqn_YF6zdzqWITII`,
        postData,
        
    );
}

export function login(email, password) {
    const postData = {
        email,
        password,
        returnSecureToken: true,
    };
    return axios.post(
        `${API_URL}/api/user/login`,
        postData,
    );
}
export function userlogin(username, password) {
    const postData = {
        username,
        password,
        // returnSecureToken: true,
    };
    return axios.post(
        `${API_URL}/api/user/loginuser`,
        postData,
    );
}
export function paypalapi(amount) {
    //axios call
    const postData = {
        amount
    };
    return axios.post(
        `${API_URL}/api/E_Wallet/paypal`,
        postData,
        
    );
}
export function showToast(toastMessage) {
    if (toastMessage.code === 200 && toastMessage.status === true) {
        toast.success(toastMessage.message, {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
        });
    } else {
        toast.error(toastMessage.message, {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
        });
    }
}

export function formatError(errorResponse) {
    swal("Oops", errorResponse.message, "error");
    
    // switch (errorResponse.error.message) {
    //     case 'EMAIL_EXISTS':
    //         //return 'Email already exists';
    //         swal("Oops", "Email already exists", "error");
    //         break;
    //     case 'EMAIL_NOT_FOUND':
    //         //return 'Email not found';
    //        swal("Oops", "Email not found", "error",{ button: "Try Again!",});
    //        break;
    //     case 'INVALID_PASSWORD':
    //         //return 'Invalid Password';
    //         swal("Oops", "Invalid Password", "error",{ button: "Try Again!",});
    //         break;
    //     case 'USER_DISABLED':
    //         return 'User Disabled';
    //     default:
    //         return '';
    // }
}

export function saveTokenInLocalStorage(tokenDetails) {
    // for 1 Hour
    tokenDetails.expireDate = new Date(
        new Date().getTime() + 72000 * 1000,
    );
    // console.log(JSON.stringify(tokenDetails),"token");
    localStorage.setItem('userDetails', JSON.stringify(tokenDetails));
    // localStorage.setItem('newdetails', "helo");
}

export function runLogoutTimer(dispatch, timer, navigate) {
    setTimeout(() => {
        dispatch(logout(navigate));
    }, timer);
}
export function runUserLogoutTimer(dispatch, timer, navigate) {
    setTimeout(() => {
        dispatch(userlogout(navigate));
    }, timer);
}

export function checkAutoLogin(dispatch, navigate) {
    const tokenDetailsString = localStorage.getItem('userDetails');
    let tokenDetails = '';
    let tokennDetails = JSON.parse(tokenDetailsString);
    

    if (!tokenDetailsString) {
        dispatch(logout(navigate));
        return;
    }
    if (tokennDetails.UserId!==1) {
        dispatch(logout(navigate));
        return;
    }
    // console.log("tokennDetails",tokennDetails);

    tokenDetails = JSON.parse(tokenDetailsString);
    if(tokenDetailsString){
        // if (tokenDetails.id != 1) {
        //     dispatch(logout(navigate));
        //     return;
        // }

    
    
    let expireDate = new Date(tokenDetails.expireDate);
    let todaysDate = new Date();

    if (todaysDate > expireDate) {
        dispatch(logout(navigate));
        return;
    }
    dispatch(loginConfirmedAction(tokenDetails));

    const timer = expireDate.getTime() - todaysDate.getTime();
    runLogoutTimer(dispatch, timer, navigate);
}
}
export function checkuserAutoLogin(dispatch, navigate,path) {
    const tokenDetailsString = localStorage.getItem('userDetails');
    let tokenDetails = '';
    let tokennDetails = JSON.parse(tokenDetailsString);
    if(path){
        if (!tokenDetailsString) {
        dispatch(userlogout(navigate));
        return;
    }
    if (tokennDetails.UserId===1) {
        dispatch(userlogout(navigate));
        return;
    }
    }
    

    
    if(tokenDetailsString){
        tokenDetails = JSON.parse(tokenDetailsString);
        let expireDate = new Date(tokenDetails.expireDate);
    let todaysDate = new Date();

    if (todaysDate > expireDate) {
        dispatch(userlogout(navigate));
        return;
    }
    dispatch(userloginConfirmedAction(tokenDetails));

    const timer = expireDate.getTime() - todaysDate.getTime();
    runUserLogoutTimer(dispatch, timer, navigate);

    }
    
}
