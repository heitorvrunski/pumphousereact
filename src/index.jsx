import "bootstrap/dist/css/bootstrap.css";
import './Resource/fonts/Monaco.ttf';

import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import App from "./App.jsx";
import reportWebVitals from "./reportWebVitals";
const rootElement = document.getElementById("root");


ReactDOM.render(
  <HashRouter>
    <App />
  </HashRouter>,
  rootElement
);

reportWebVitals();
