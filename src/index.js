// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// // const myFirstElement = <h1>Hello React!</h1>

// // const root = ReactDOM.createRoot(document.getElementById('root'));
// // root.render(myFirstElement);
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();


import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from 'react-router-dom';
import {Provider} from 'react-redux';
import {store} from './store/store';
import reportWebVitals from "./reportWebVitals";
//import SimpleReactLightbox from "simple-react-lightbox";
// import  GlobalContext  from "./context/globle"; 
import ThemeContext from "./context/ThemeContext"
// import { StyledEngineProvider } from '@mui/material/styles';

ReactDOM.render(
	<React.StrictMode>
		<Provider store = {store}>
            <BrowserRouter basename=''>
                <ThemeContext>
                    <App />
                </ThemeContext>  
            </BrowserRouter>    
        </Provider>	
	</React.StrictMode>,
  document.getElementById("root")
);
reportWebVitals();
