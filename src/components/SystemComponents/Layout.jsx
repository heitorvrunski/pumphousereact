import React, { useEffect, useState } from "react";
import NavMenu from "./NavMenu";
import LayoutMobile from "../Mobile/LayoutMobile";

import { useDispatch, useSelector } from "react-redux";
import { UpdateData, FirstReadDone,SendLogs } from "../../middleware/socketio";
import Toast from "./Toast.jsx";
import { ApiNode } from "../../middleware/thunk";
//import IdleTimer from "react-idle-timer";


export default function Layout(props) {
  //const idleTimerRef = useRef(null)
  const socket = useSelector((state) => state.SocketIO.socket);
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  
  const [errorStyle, setErrorStyle] = useState("");
 
  const Auth = useSelector((state) => state.Auth);

  useEffect(() => {
    socket.on("writeError", (data) => {
      const browseName = data.browseName;
      const tagName =
        "to write tag: " +
        (browseName.length === 3
          ? `${browseName[0]}[${browseName[1]}].${browseName[2]}`
          : browseName.length === 1
          ? `${browseName[0]}`
          : `${browseName[0]}.${browseName[1]}`);
      //bg-warning
      setErrorStyle("bg-danger");

      setErrorMessage(tagName);
    });
  }, [socket]);

  useEffect(() => {
    socket.on("invalidAccess", (data) => {
      const messageError = "No has Access to Write Tags";

      setErrorStyle("bg-warning");
      setErrorMessage(messageError);
    });
  }, [socket]);

  useEffect(() => {
    socket.on("loadData", (data) => {
      dispatch(UpdateData(data));
      dispatch(SendLogs(data,0));

    });
    socket.on("firstReadDone", () => {
      dispatch(FirstReadDone());
    });
  }, [dispatch, socket]);

  useEffect(() => {
    if (Auth.isAuth === true) {
      const dateNow = new Date();
      const dateExpires = new Date(Auth.expires);
      const timeout = dateExpires.getTime() - dateNow.getTime() - 60 * 1000;

      setTimeout(() => {
        dispatch(ApiNode.RefreshToken());
      }, timeout);
    }
  });

  const onChangeErrorMessage = () => {
    setErrorMessage("");
  };

  /*const onIdleHandle = () =>{
    dispatch(ApiNode.Logoff());
    window.location.href = "/#/login"
  }*/

  return (
    // <IdleTimer ref={idleTimerRef} timeout={300000} onIdle={onIdleHandle}>
      <div>
        <LayoutMobile>
          {props.children}
        </LayoutMobile>
        
        <Toast
          messageError={errorMessage}
          className={errorStyle + " text-white"}
          onChangeErrorMessage={onChangeErrorMessage}
        />
      </div>
    // </IdleTimer>

  );
}
/*<Home socket = {socket}/>  */
