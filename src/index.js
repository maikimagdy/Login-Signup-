import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "./css/media.css";
import "./css/form.css";
import "./components/Bars/alldashboard.css";
import "./css/google.css";
import "./components/Loading/Loading.css";
import "./all.min.css";
import "./pages/Website/403.css";
import { BrowserRouter as Router } from "react-router-dom";
import MenuFun from "./components/context/menuContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <MenuFun>
      <Router>
        <App />
      </Router>
    </MenuFun>
  </React.StrictMode>,
  <App />
);
