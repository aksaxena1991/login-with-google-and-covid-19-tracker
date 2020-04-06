import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";
import "../node_modules/mdbreact/dist/scss/mdb-free.scss";
import "../node_modules/leaflet/dist/leaflet.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
ReactDOM.render(
  <BrowserRouter>
    <App/>
</BrowserRouter>
, document.getElementById("root"));

serviceWorker.unregister();