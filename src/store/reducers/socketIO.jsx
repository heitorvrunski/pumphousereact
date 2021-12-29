import io from "socket.io-client";
const socket = io.connect(`http://${window.location.hostname}:${process.env.REACT_APP_NODE_PORT??3000}`, {
  withCredentials: true,
});
const INITIAL_STATE = {
  socket: socket,
};

export default function Socket(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "Connect_Socket":
      socket.connect({
        withCredentials: true,
      });
      socket.emit("joined");
      return state;

    default:
      return state;
  }
}
