import {
    paypalapi
} from '../../../services/AuthService';



export function paypalPayment(amount, navigate) {

    return (dispatch) => {
        paypalapi(amount)
        .then((response) => {
            
            // const { status, errorMessage, redirect } =  response;
    if (response.data.status == 200 && response.data.redirect) window.location = response.data.redirect;
    return {
        status: response.data.status,
        errorMessage: response.data.errorMessage
    }
            
        })
        .catch((error) => {
            console.log(error);
        });
    };
}