import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./Login";
import Home from "../Home";
import Trend from "../Trend";
import Logs from "./Logs";
import Alarm from "../alarm";
import WindowWatch from "./WindowWatch";



import ProtectedRoute from "./ProtectedRoute";
import Settings from "./Settings";
import SettingsConfig from "./SettingsConfig";

import System from "./System";

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
      path="/Alarms"
      socket={socket}
      component={Alarm}
      redirectto="/login"
    />
    <ProtectedRoute
    exact
      path="/Settings"
      socket={socket}
      component={Settings}
      redirectto="/login"
    />
    <ProtectedRoute
    exact
      path="/watch"
      socket={socket}
      component={WindowWatch}
      redirectto="/login"
    />
    <ProtectedRoute
      path="/Settings/config"
      socket={socket}
      component={SettingsConfig}
      redirectto="/login"
    />
    <ProtectedRoute
    exact
      path="/system"
      socket={socket}
      component={System}
      redirectto="/login"
    />
    <ProtectedRoute
      path="/system/TG9nc1N5c3RlbQ=="
      socket={socket}
      component={Logs}
      redirectto="/login"
    />

    <Route path="*" component={() => <h1>Page not found</h1>} />
  </Switch>
);

export default Routes;
