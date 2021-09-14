import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import isAuthenticated from "../services/auth.js";
import { ApiNode } from "../middleware/thunk.js";
import Loading from "./Loading.jsx";
import { ActionSocketConnect } from "../middleware/socketio.js";

const ProtectedRoute = ({
  component: Comp,
  path,

  redirectto,
  ...rest
}) => {
  const dispatch = useDispatch();
  const [state, setState] = useState("loading");
  const [isJoined, setIsJoined] = useState(false);

  const [canOpen, setCanOpen] = useState("loading");

  const expiresJWT = useSelector((state) => state.ExpiresJWT);
  const loadingRender = useSelector((state) => state.Tags.loading);
  const socket = useSelector((state) => state.SocketIO.socket);

  useEffect(() => {
    (async function () {
      try {
        var isUserLogged = await isAuthenticated();
        setState(isUserLogged === true ? "loggedin" : "redirect");
      } catch {
        setState("redirect");
      }
      if (state === "redirect") {
        setCanOpen("redirect");
      }
    })();
  }, [state]);

  useEffect(() => {
    if (state === "loggedin" && expiresJWT.isAuth === false) {
      dispatch(ApiNode.RefreshToken());
    }
  });

  useEffect(() => {
    if (state === "loggedin" && loadingRender === true && isJoined === false) {
      dispatch(ActionSocketConnect());
      dispatch(ApiNode.GetSysConfig());

      setIsJoined(true);
    } else if (state === "loggedin" && !loadingRender) {
      setCanOpen("ok");
    }
  }, [state, loadingRender, socket, isJoined, dispatch]);

  if (canOpen === "loading") {
    return <Loading />;
  }

  return (
    <Route
      path={path}
      {...rest}
      render={(props) =>
        canOpen === "ok" ? <Comp {...props} /> : <Redirect to={redirectto} />
      }
    />
  );
};

export default ProtectedRoute;
