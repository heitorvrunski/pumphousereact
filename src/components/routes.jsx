import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import Trend from "./Trend";
import ProtectedRoute from "./ProtectedRoute";
import Settings from "./Settings";



const Routes = () => (
  
    <Switch>
      <Route exact path="/login" component={Login}/>
      <ProtectedRoute exact path="/" component={Home} redirectto="/login" />
      <ProtectedRoute path="/trend" component={Trend} redirectto="/login" />
      <ProtectedRoute path="/Settings" component={Settings} redirectto="/login" />

      <Route path="*" component={() => <h1>Page not found</h1>} />
    </Switch>
);

export default Routes;