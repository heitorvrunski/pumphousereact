import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import isAuthenticated from "../services/auth.js";

const ProtectedRoute = ({ component: Comp, path, redirectto, ...rest }) => {

  const [state, setState] = useState('loading');


  useEffect(() => {
        (async function() {
            try {
              var isUserLogged = await isAuthenticated();

              setState(isUserLogged===true ? 'loggedin' : 'redirect');
            }
            catch {
              setState('redirect');
            }
          })();
      

    
  }, [state]);
  

  if(state === 'loading') {
    return <div>Loading..</div>
  }

  return (
    <Route
      path={path}
      {...rest}
      render={props => ((state === 'loggedin') ? 
        <Comp {...props} /> : 
        <Redirect to={redirectto} />) }
    />
  );
};

export default ProtectedRoute;