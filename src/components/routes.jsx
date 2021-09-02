import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Login from "./Login";
import App from "../App";
import Layout from "./Layout";
import ProtectedRoute from "./ProtectedRoute";



const Routes = () => (
  
  <BrowserRouter>
    <Switch>
      <Route  path="/login" component={Login}/>
      <ProtectedRoute exact path="/" component={Layout} redirectto="/login" />
      <Route path="*" component={() => <h1>Page not found</h1>} />
    </Switch>
  </BrowserRouter>
);

export default Routes;