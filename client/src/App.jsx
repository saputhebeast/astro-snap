import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import AnimatedRoutes from './routes'
import {Provider} from "react-redux";
import store from './store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
    return (
        <Provider store={store}>
            <div className="App ">
                <BrowserRouter>
                    <AnimatedRoutes />
                    <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick pauseOnHover />
                </BrowserRouter>
            </div>
        </Provider>
    );
};

export default App
