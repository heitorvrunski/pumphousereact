import { SendMessage } from "../middleware/socketio";

export const EnablePressurePID = (cPumps, socket) => {
  var i,
    sendMessages = [];
  for (i === 0; i < cPumps.length; i++) {
    if (cPumps[i].Command <= 1) {
      sendMessages.push([["cPumps", i, "Frequency"], 0]);
    }
    sendMessages.push([["cPumps", i, "MaxRamp"], cPumps[i].StartRamp]);
  }
  //push
  sendMessages.push([["PressurePID", "enable"], 1]);
  SendMessages(sendMessages, socket);
};
export const DisablePressurePID = (socket) => {
  var sendMessages = [];
  sendMessages.push([["PressurePID", "enable"], 0]);
  sendMessages.push([["PressurePID", "Step "], 0]);
  SendMessages(sendMessages, socket);
};

export const EnableDesablePondPID = (enablePondFill, socket) => {
  enablePondFill = enablePondFill === 1 ? 0 : 1;
  SendMessage(["EnablePondFill"], enablePondFill, socket);
};
export const DisableAllPump = (socket) => {
  var sendMessages = [];
  sendMessages.push([["PressurePID", "enable"], 0]);
  sendMessages.push([["PressurePID", "Step"], 0]);
  sendMessages.push([["cPump", 0, "Command"], 1]);
  sendMessages.push([["cPump", 0, "MaxRamp"], 0]);
  sendMessages.push([["cPump", 1, "Command"], 1]);
  sendMessages.push([["cPump", 1, "MaxRamp"], 0]);
  sendMessages.push([["cPump", 2, "Command"], 1]);
  sendMessages.push([["cPump", 2, "MaxRamp"], 0]);
  SendMessages(sendMessages, socket);
};

export const UpdateSettings = (browseName, value, socket) => {
  SendMessage(browseName, value, socket);
};

export const ActAlarm = (actRow, comment,tagAlarmList, socket) => {
  const tag = actRow.status+"|"+FormatDate(actRow.activeTime)+"|"+actRow.type+"|"+actRow.tag+"|"+comment+"@"
  tagAlarmList = tagAlarmList + tag;
  SendMessage(["ActAlarm"], tagAlarmList, socket);
};

export const ActAllAlarm = (actAllAlarms,socket) => {
  actAllAlarms = actAllAlarms===1?0:1
  SendMessage(["AckAllAlarms"], actAllAlarms, socket);
  SendMessage(["AckAllTrigger"], 1, socket);

};

//ActAllAlarm

function FormatDate(date){
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
}

export const StartManualPump = (cPump, index, socket) => {
  var maxRamp = cPump.StartRamp;
  var sendMessages = [];
  sendMessages.push([["cPump", index, "MaxRamp"], maxRamp]);
  sendMessages.push([["cPump", index, "Command"], 10]);
  //sendMessages.push([['cPump',index,'status'],1])
  SendMessages(sendMessages, socket);
};

export const StopManualPump = (index, socket) => {
  var sendMessages = [];

  sendMessages.push([["cPump", index, "MaxRamp"], 0]);
  sendMessages.push([["cPump", index, "Command"], 1]);
  sendMessages.push([["cPump", index, "status"], 0]);
  SendMessages(sendMessages, socket);
};

export const SetManualFreqPump = (index, value, socket) => {
  SendMessage(["cPump", index, "setFrequency"], value, socket);
};

function SendMessages(listItems, socket) {
  listItems.forEach((element) => {
    SendMessage(element[0], element[1], socket);
  });
}
