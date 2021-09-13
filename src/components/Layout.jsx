import React, { useEffect, useState } from "react";
import NavMenu from "./NavMenu";
import { useDispatch, useSelector } from "react-redux";
import { UpdateData } from "../middleware/socketio";
import io from "socket.io-client";
import Toast from "./Toast.jsx";
import { ApiNode } from "../middleware/thunk";

const FirstRender = () => {
  socket.emit("joined");
};

const socket = io.connect(`http://${window.location.hostname}:3000`, {
  withCredentials: true,
});
export default function Layout(props) {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const expiresJWT = useSelector((state) => state.ExpiresJWT);

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
      setErrorMessage(tagName);
    });
    socket.on("loadData", (data) => {
      dispatch(UpdateData(data));
    });
  });

  useEffect(() => {
    if (expiresJWT.isAuth === true) {
      const dateNow = new Date();
      const dateExpires = new Date(expiresJWT.expires);

      const timeout = dateExpires.getTime() - dateNow.getTime() - 60 * 1000;

      setTimeout(() => {
        dispatch(ApiNode.RefreshToken());
      }, timeout);
    }
  });

  useEffect(() => {
    FirstRender();
  }, []);

  dispatch(ApiNode.GetSysConfig());

  const onChangeErrorMessage = () => {
    setErrorMessage("");
  };

  return (
    <div>
      <NavMenu />
      <div
        className="container-fluid"
        style={{ marginTop: "60px", height: "90vh" }}
      >
        {props.children}
      </div>
      <Toast
        messageError={errorMessage}
        className="bg-warning text-white"
        onChangeErrorMessage={onChangeErrorMessage}
      />
    </div>
  );
}
/*<Home socket = {socket}/>  */
