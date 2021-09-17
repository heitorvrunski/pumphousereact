import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import Trend from "./Trend";
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
      path="/UsersConfig"
      socket={socket}
      component={UsersConfig}
      redirectto="/login"
    />

    <Route path="*" component={() => <h1>Page not found</h1>} />
  </Switch>
);

export default Routes;
