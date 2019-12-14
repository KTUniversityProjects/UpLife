import React from "react";
import ReactDOM from "react-dom";
import "./App/index.scss";
import { Router, browserHistory } from "react-router";
import routes from "./utils/routes";

ReactDOM.render(
  <Router history={browserHistory} routes={routes} />,
  document.getElementById("root")
);
