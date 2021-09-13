import React, { useState, useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import isAuthenticated from "../services/auth.js";
import { ApiNode } from "../middleware/thunk.js";
import ReactLoading from 'react-loading';

const ProtectedRoute = ({ component: Comp, path, redirectto, ...rest }) => {
  const dispatch = useDispatch()
  const [state, setState] = useState('loading');
  const expiresJWT = useSelector(state => state.ExpiresJWT)

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

  
  useEffect(() => {
    if(state==='loggedin'&&expiresJWT.isAuth===false){
      dispatch(ApiNode.RefreshToken());

    }


}, );
  

  if(state === 'loading') {
    return (
    <div className="position-absolute top-50 start-50">
        <div className="d-flex flex-column align-items-center">
          <ReactLoading type="spokes" color="#ffffff" height={'40px'} width={'40px'}></ReactLoading>
          <h6 className="my-2">Loading...</h6>
        </div>   
    </div>
    )}

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