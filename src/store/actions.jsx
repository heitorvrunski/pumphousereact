const Actions = {
  GetSysConfig: (value) => {
    return { type: "Config_Settings", value };
  },
  ConfigTrends: (value) => {
    return { type: "Config_Trends", value };
  },
  ChangeStateTrend: (index) => {
    return { type: "Change_State_Trend", index };
  },
  ChangeMode: (value) => {
    return { type: "Change_Mode", value };
  },
  ChangeDuration: (value) => {
    return { type: "Change_Duration", value };
  },
  SetDateRangeAction: (value, name) => {
    const dateSplit = value.replaceAll("-", "/");
    return { type: "Set_Date_Range", dateSplit, name };
  },
  SetTimeRangeAction: (time, name) => {
    return { type: "Set_Time_Range", time, name };
  },
  ClearAllTrends: (value) => {
    return { type: "Clear_All_Trends" };
  },
  ActionLogin: (data) => {
    return { type: "Login", data };
  },
  ActionLogoff: (data) => {
    return { type: "Logoff", data };
  },
  ChangeFisrtTime: (value) => {
    return { type: "Change_Fisrt_Time", value };
  },
  GetUsers: (value) => {
    return { type: "Get_Users", value };
  },
  SetMessageError: (value) => {
    return { type: "Set_Error_Message", value };
  },
  SetModalUser: (userModel, isOpen) => {
    return { type: "Set_Modal_User", userModel, isOpen };
  },
  SetByTime: (value) => {
    return { type: "Set_byTime", value };
  },
};
export default Actions;
