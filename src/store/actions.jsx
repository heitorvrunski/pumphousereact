export const GetSysConfig = (value) => {
  return { type: "Config_Settings", value };
};

export const ConfigTrends = (value) => {
  return { type: "Config_Trends", value };
};

export const ChangeStateTrend = (index) => {
  return { type: "Change_State_Trend", index };
};

export const ChangeMode = (value) => {
  return { type: "Change_Mode", value };
};

export const ChangeDuration = (value) => {
  return { type: "Change_Duration", value };
};

export const SetDateRangeAction = (value, name) => {
  const dateSplit = value.replaceAll("-", "/");

  return { type: "Set_Date_Range", dateSplit, name };
};

export const ClearAllTrends = () => {
  return { type: "Clear_All_Trends" };
};

export const SetExpiresToken = (date) => {
  const dateExpires = date.expires;
  return { type: "Set_Expires", dateExpires };
};
export const ChangeFisrtTime = (value) => {
  return { type: "Change_Fisrt_Time", value };
};

//Change_Fisrt_Time

//SetExpiresToken
