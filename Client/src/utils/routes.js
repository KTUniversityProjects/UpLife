import React from "react";
import { IndexRoute } from "react-router";
import { Route } from "react-router-dom";
import App from "../App/App";
import WelcomePage from "../containers/WelcomePage/WelcomePage";
import NotFound from "../containers/NotFound/NotFound";
import requireAuth from "./requireAuth";
import Dashboard from "../containers/Dashboard/Dashboard";
import ScoreTable from "../containers/ScoreTable/ScoreTable";
import Routine from "../containers/Routine/Routine";
import Habits from "../containers/Habits/Habits";

export default (
  <Route path="/" component={App}>
    {/*Common routes*/}
    <IndexRoute component={WelcomePage} />
    {/*User routes*/}
    <Route path="/dashboard" component={requireAuth(Dashboard)} />
    <Route path="/ScoreTable" component={requireAuth(ScoreTable)} />
    <Route path="/Habits" component={requireAuth(Habits)} />
    <Route path="/Routine" component={requireAuth(Routine)} />
    {/*Error route*/}
    <Route path="*" exact={true} component={NotFound} />
  </Route>
);
