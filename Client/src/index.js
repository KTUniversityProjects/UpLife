import React from "react";
import ReactDOM from "react-dom";
import "./App/index.scss";
import * as serviceWorker from "./App/serviceWorker";
import { Router, browserHistory } from "react-router";
import routes from "./App/routes";

ReactDOM.render(
  <Router history={browserHistory} routes={routes} />,
  document.getElementById("root")
);
serviceWorker.unregister();
