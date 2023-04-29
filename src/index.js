import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter } from "react-router-dom";
import { ProSidebarProvider } from "react-pro-sidebar";
import App from "./App";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";

// context hook
import LoginProvider from "./components/context/LoginProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ProSidebarProvider>
      <LoginProvider>
        <App />
      </LoginProvider>
    </ProSidebarProvider>
  </BrowserRouter>
);
