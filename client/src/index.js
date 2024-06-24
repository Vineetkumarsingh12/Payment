import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { CssBaseline } from "@mui/material";
import { Provider } from "react-redux";
import store from "./reduxslice/store.js";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { Toaster } from "react-hot-toast";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
<BrowserRouter>
        <CssBaseline />
        <Toaster />
        <App />
        </BrowserRouter>
    </Provider>
    
  </React.StrictMode>
);
