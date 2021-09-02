import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import isAuthenticated from "../services/auth.js";

const ProtectedRoute = ({ component: Comp, path, redirectto, ...rest }) => {

  /* Track the state of your app instead. Start with a "loading" state */
  const [state, setState] = useState('loading');


  useEffect(() => {
        (async function() {
            try {
              /* Update effect logic to track correct state */
              var isUserLogged = await isAuthenticated();

              setState(isUserLogged===true ? 'loggedin' : 'redirect');
            }
            catch {
              setState('redirect');
            }
          })();
      

    
  }, [state]);
  
  /* If in loading state, return loading message while waiting for 
  isValidToken to complete */
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