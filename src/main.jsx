import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import "./Css/components/loading.css";
import "./Css/components/button.css";
import "./Css/components/alerts.css";
import "./Css/components/google.css";
import "./Pages/Auth/AuthOperations/auth.css";
import "./Pages/Dashboard/dashboard.css";
import "bootstrap/dist/css/bootstrap.css";
import "animate.css";
import "./custom.css";
import MenuContext from "./context/menucontext";
import WindowResize from "./context/windowresize";
import { Provider } from "react-redux";
import { store } from "./Redux/store";

const rootElement = document.getElementById("root");

  ReactDOM.createRoot(rootElement).render(
    <StrictMode>
    <Provider store={store}>
    <BrowserRouter>
    <WindowResize>
    <MenuContext>
    <App />
    </MenuContext>
    </WindowResize>
    </BrowserRouter>
    </Provider>
    </StrictMode>
  );

