import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import Trend from "./Trend";
import Logs from "./Logs";
import Alarm from "./alarm";


import ProtectedRoute from "./ProtectedRoute";
import Settings from "./Settings";
import UsersConfig from "./UsersConfig";

const Routes = ({ socket }) => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoute
      exact
      path="/"
      socket={socket}
      component={Home}
      redirectto="/login"
    />
    <ProtectedRoute
      path="/trend"
      socket={socket}
      component={Trend}
      redirectto="/login"
    />
    <ProtectedRoute
      path="/Settings"
      socket={socket}
      component={Settings}
      redirectto="/login"
    />

    <ProtectedRoute
    exact
      path="/system"
      socket={socket}
      component={UsersConfig}
      redirectto="/login"
    />
    <ProtectedRoute
      exact
      path="/system/TG9nc1N5c3RlbQ=="
      socket={socket}
      component={Logs}
      redirectto="/login"
    />
    <ProtectedRoute
      path="/alarms"
      socket={socket}
      component={Alarm}
      redirectto="/login"
    />

    <Route path="*" component={() => <h1>Page not found</h1>} />
  </Switch>
);

export default Routes;
