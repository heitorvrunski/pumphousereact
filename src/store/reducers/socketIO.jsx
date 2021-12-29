import * as signalR from "@microsoft/signalr";
import { UpdateData, FirstReadDone } from "../../middleware/socketio";

// var socket = getConnection();

// async function getConnection() 
// {
//   var config = await new signalR.HubConnectionBuilder()
//     .withUrl("http://localhost:3000/opcuahub")
//     .configureLogging(signalR.LogLevel.Information)  
//     .build();
//   return config
// }

async function firstLogin(dispatch) 
{
  var config = await new signalR.HubConnectionBuilder()
    .withUrl("http://localhost:3000/opcuahub")
    .configureLogging(signalR.LogLevel.Information)  
    .build();
    config.on("loadData", (data) => {
      dispatch(UpdateData(data));
    });
    config.on("firstReadDone", () => {
      dispatch(FirstReadDone());
    });

  await config.start();
  
  return config
}

const INITIAL_STATE = {
  socket: null,
};

export default async function Socket(state = INITIAL_STATE, action) {

  switch (action.type) {
    case "Connect_Socket":

      var socket = await firstLogin(action.dispatch);
      socket.send("Joined",null);
      return {socket: socket};

    default:
      return state;
  }
}
