import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import isAuthenticated from "../../services/auth.js";
import { ApiNode } from "../../middleware/thunk.js";
import Loading from "./Loading.jsx";
import { ActionSocketConnect } from "../../middleware/socketio.js";

const ProtectedRoute = ({ component: Comp, path, redirectto, ...rest }) => {
  const dispatch = useDispatch();
  const [state, setState] = useState("loading");
  const [isJoined, setIsJoined] = useState(false);

  const [canOpen, setCanOpen] = useState("loading");
  const [labelLoading, setLabelLoading] = useState("Loading...");

  const [checkIsLoadTags, setCheckIsLoadTags] = useState(false);

  const Auth = useSelector((state) => state.Auth);
  const loadingRender = useSelector((state) => state.Tags.loading);
  const socket = useSelector((state) => state.SocketIO.socket);

  useEffect(() => {

    async function fetchData() {
      try {
        var isUserLogged = await isAuthenticated();
        setState(isUserLogged === true ? "loggedin" : "redirect");
      } catch {
        setState("redirect");
      }
      if (state === "redirect") {
        setCanOpen("redirect");
      }
    };
    return fetchData();
  }, [state]);

  useEffect(() => {
    if (state === "loggedin" && Auth.isAuth === false) {
      dispatch(ApiNode.RefreshToken());
    }
  });

  useEffect(() => {
    if (checkIsLoadTags === true) {
      setCheckIsLoadTags(false);
      if (state === "loggedin" && loadingRender === true) {
        console.log("Error to read Tags from Node");
        setLabelLoading(
          "Error reading Tags. You will be redirected to the main page"
        );
        setTimeout(() => {
          window.location.href = "/";
        }, 4000);
      }
    }
  }, [checkIsLoadTags, loadingRender, state]);

  useEffect(() => {
    if (state === "loggedin" && loadingRender === true && isJoined === false) {
      dispatch(ActionSocketConnect());
      dispatch(ApiNode.GetSysConfig());
      setTimeout(() => {
        setCheckIsLoadTags(true);
      }, 3000);

      setIsJoined(true);
    } else if (state === "loggedin" && !loadingRender) {
      setCanOpen("ok");
    }
  }, [state, loadingRender, socket, isJoined, dispatch]);

  if (canOpen === "loading") {
    return <Loading className="text-Light" label={labelLoading} />;
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
