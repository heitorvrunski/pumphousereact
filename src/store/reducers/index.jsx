import { combineReducers } from "redux";
import Tags from './Tags';
import SysConfig from "./SysConfig";
import Trend from "./Trend";
export default combineReducers({
    Tags,
    SysConfig,
    Trend
});