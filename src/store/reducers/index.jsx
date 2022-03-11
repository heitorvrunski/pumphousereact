import { combineReducers } from "redux";
import Tags from "./Tags";
import SysConfig from "./SysConfig";
import Trend from "./Trend";
import Auth from "./Auth";
import SocketIO from "./socketIO";
import Users from "./Users";
import OPCLogs from "./OPCLogs";


export default combineReducers({
  Tags,
  SysConfig,
  Trend,
  Auth,
  SocketIO,
  Users,
  OPCLogs,
});
