import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import keycloak from "./config/keycloak.js";

keycloak
  .init({
    onLoad: "login-required",
    checkLoginIframe: false,
  })
  .then((authenticated) => {
    if (!authenticated) {
      keycloak.login();
      return;
    }

    localStorage.setItem("access_token", keycloak.token);

    ReactDOM.createRoot(document.getElementById("root")).render(
      <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.StrictMode>
    );
  })
  .catch((error) => {
    console.error("Keycloak init failed:", error);
  });