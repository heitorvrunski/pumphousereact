import React, { useState, useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import isAuthenticated from "../services/auth.js";
import { ApiNode } from "../middleware/thunk.js";

const ProtectedRoute = ({ component: Comp, path, redirectto, ...rest }) => {
  const dispatch = useDispatch()
  const [state, setState] = useState('loading');
  const expiresJWT = useSelector(state => state.ExpiresJWT)

  useEffect(() => {
        (async function() {
            try {
              var isUserLogged = await isAuthenticated();
              /*if(expiresJWT.isAuth===false&&isUserLogged===true){
                dispatch(ApiNode.RefreshToken());
              }*/
              setState(isUserLogged===true ? 'loggedin' : 'redirect');
            }
            catch {
              setState('redirect');
            }
          })();
      

    
  }, [state]);

  
  useEffect(() => {
    if(state==='loggedin'&&expiresJWT.isAuth===false){
      dispatch(ApiNode.RefreshToken());

    }


}, );
  

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