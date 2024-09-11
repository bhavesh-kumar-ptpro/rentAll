import {
    formatError,
    login,
    runLogoutTimer,
    saveTokenInLocalStorage,
    signUp,
    userlogin
} from '../../services/AuthService';


export const SIGNUP_CONFIRMED_ACTION = '[signup action] confirmed signup';
export const SIGNUP_FAILED_ACTION = '[signup action] failed signup';
export const LOGIN_CONFIRMED_ACTION = '[login action] confirmed login';
export const LOGIN_FAILED_ACTION = '[login action] failed login';
export const LOADING_TOGGLE_ACTION = '[Loading action] toggle loading';
export const LOGOUT_ACTION = '[Logout action] logout action';

export function signupAction(email, password, navigate) {
    return (dispatch) => {
        signUp(email, password)
            .then((response) => {
                saveTokenInLocalStorage(response.data);
                runLogoutTimer(
                    dispatch,
                    72000 * 1000,
                    navigate,
                );
                dispatch(confirmedSignupAction(response.data));
                //history.push('/dashboard');
                navigate('/');
            })
            .catch((error) => {
                const errorMessage = formatError(error.response.data);
                dispatch(signupFailedAction(errorMessage));
            });
    };
}

export function logout(navigate) {
    localStorage.removeItem('userDetails');
    //history.push('/login');
    navigate('/admin/view/login');
    return {
        type: LOGOUT_ACTION,
    };
}
export function userlogout(navigate) {
    localStorage.removeItem('userDetails');
    // history.push('/');
    navigate('/login');
    return {
        type: LOGOUT_ACTION,
    };
}

export function loginAction(email, password, navigate) {
    return (dispatch) => {
        login(email, password)
            .then((response) => {
                console.log(response.data);
                saveTokenInLocalStorage(response.data);
                runLogoutTimer(
                    dispatch,
                    72000 * 1000,
                    navigate,
                );
                dispatch(loginConfirmedAction(response.data));
                //history.push('/dashboard');                
                navigate('/admin/view/dashboard');
            })
            .catch((error) => {
                // console.log(error);
                const errorMessage = formatError(error.response);
                dispatch(loginFailedAction(errorMessage));
            });
    };
}
export function userloginAction(username, password, navigate) {

    return (dispatch) => {
        console.log(username, password);
        userlogin(username, password)
            .then((response) => {
                console.log(response.data);
                saveTokenInLocalStorage(response.data.data);
                runLogoutTimer(
                    dispatch,
                    72000 * 1000,
                    navigate,
                );
                dispatch(userloginConfirmedAction(response.data.data));

                const lastLocation = localStorage.getItem('lastLocation');
                if (lastLocation) {
                    navigate(lastLocation);
                    localStorage.removeItem('lastLocation'); // Clean up
                } else {
                    navigate('/');
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };
}

export function loginFailedAction(data) {
    return {
        type: LOGIN_FAILED_ACTION,
        payload: data,
    };
}
export function userloginFailedAction(data) {
    return {
        type: LOGIN_FAILED_ACTION,
        payload: data,
    };
}

export function loginConfirmedAction(data) {
    return {
        type: LOGIN_CONFIRMED_ACTION,
        payload: data,
    };
}
export function userloginConfirmedAction(data) {
    return {
        type: LOGIN_CONFIRMED_ACTION,
        payload: data,
    };
}

export function confirmedSignupAction(payload) {
    return {
        type: SIGNUP_CONFIRMED_ACTION,
        payload,
    };
}

export function signupFailedAction(message) {
    return {
        type: SIGNUP_FAILED_ACTION,
        payload: message,
    };
}

export function loadingToggleAction(status) {
    return {
        type: LOADING_TOGGLE_ACTION,
        payload: status,
    };
}
