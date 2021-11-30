import React, { useEffect, useState } from "react";
import NavMenu from "./NavMenu";
import { useDispatch, useSelector } from "react-redux";
import { UpdateData, FirstReadDone } from "../../middleware/socketio";
import Toast from "./Toast.jsx";
import { ApiNode } from "../../middleware/thunk";

export default function Layout(props) {
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

  return (
    <div>
      <NavMenu />
      <main>
        <div
          className="container-fluid"
          style={{ marginTop: "65px", height: "89vh" }}
        >
          {props.children}
        </div>
      </main>
      
      <Toast
        messageError={errorMessage}
        className={errorStyle + " text-white"}
        onChangeErrorMessage={onChangeErrorMessage}
      />
    </div>
  );
}
/*<Home socket = {socket}/>  */
