import React from "react";
import { IndexRoute } from "react-router";
import { Route } from "react-router-dom";
import App from "./App";
import WelcomePage from "../components/common/WelcomePage";
import NotFound from "../components/NotFound/NotFound";
import requireAuth from "./requireAuth";
import Dashboard from "../components/Dashboard/Dashboard";
import UsersWhoRented from "../components/UsersWhoRented/Users";
import MyPosts from "../components/MyPosts/MyPosts";
import MyAuctions from "../components/MyAuctions/MyAuctions";
import ActiveAuctions from "../components/ActiveAuctions/ActiveAuctions";
import ActiveAuction from "../components/ActiveAuction/ActiveAuction";

export default (
  <Route path="/" component={App}>
    {/*Common routes*/}
    <IndexRoute component={WelcomePage} />
    {/*User routes*/}
    <Route path="/dashboard" component={requireAuth(Dashboard)} />
    <Route path="/userswhorented" component={requireAuth(UsersWhoRented)} />
    <Route path="/myposts" component={requireAuth(MyPosts)} />
    <Route path="/myauctions" component={requireAuth(MyAuctions)} />
    <Route path="/activeauctions" component={requireAuth(ActiveAuctions)} />
    <Route path="/activeauction" component={requireAuth(ActiveAuction)} />

    {/*Error route*/}
    <Route path="*" exact={true} component={NotFound} />
  </Route>
);
