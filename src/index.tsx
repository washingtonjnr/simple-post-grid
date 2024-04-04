import React from "react";
import ReactDOM from "react-dom/client";
// 
import Home from "./templates/Home";
// 
import "./styles/global-styles.scss";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>
);
