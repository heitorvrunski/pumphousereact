import { SendMessage } from "../middleware/socketio";
import store from "../store";


const Commands = {
  SendGenericMessage: (browseName, value, socket)=>{
    SendMessage(browseName, value, socket);
  },
  EnablePressurePID : (cPumps,setOrderPump, socket) => {
    var i,
      sendMessages = [];
    for (i === 0; i < cPumps.length; i++) {
      if (cPumps[i].Command === 0) {
        sendMessages.push([["cPumps", i, "Frequency"], 0]);
      }
      sendMessages.push([["cPumps", i, "MaxRamp"], cPumps[i].StartRamp]);
    }
    //push
    sendMessages.push([["PressurePID", "enable"], 1]);
    //setOrderPump = setOrderPump===1?0:1;
    //sendMessages.push([["SetOrderPump"], setOrderPump]);
    SendMessages(sendMessages, socket);
  },
  DisablePressurePID : (socket) => {
    var sendMessages = [];
    //sendMessages.push([["cPump",0, "Command"], 0]);
    sendMessages.push([["cPump",0, "ForceValue"], 0]);
    sendMessages.push([["cPump",0, "ForceCommand"], 1]);
    sendMessages.push([["cPump",0, "Frequency"], 0]);
    sendMessages.push([["cPump",0, "MaxRamp"], 0]);
  
    //sendMessages.push([["cPump",1, "Command"], 0]);
    sendMessages.push([["cPump",1, "ForceValue"], 0]);
    sendMessages.push([["cPump",1, "ForceCommand"], 1]);
    sendMessages.push([["cPump",1, "Frequency"], 0]);
    sendMessages.push([["cPump",1, "MaxRamp"], 0]);
  
    //sendMessages.push([["cPump",2, "Command"], 0]);
    sendMessages.push([["cPump",2, "ForceValue"], 0]);
    sendMessages.push([["cPump",2, "ForceCommand"], 1]);
    sendMessages.push([["cPump",2, "Frequency"], 0]);
    sendMessages.push([["cPump",2, "MaxRamp"], 0]);
    
  
  
    sendMessages.push([["PressurePID", "enable"], 0]);
    sendMessages.push([["PressurePID", "Step "], 0]);
    SendMessages(sendMessages, socket);
  },
  EnableDesablePondPID : (enablePondFill, socket) => {
    enablePondFill = enablePondFill === 1 ? 0 : 1;
    SendMessage(["EnablePondFill"], enablePondFill, socket);
  },
  DisableAllPump : (socket) => {
    var sendMessages = [];
    sendMessages.push([["PressurePID", "enable"], 0]);
    sendMessages.push([["cPump",0, "ForceValue"], 0]);
    sendMessages.push([["cPump",0, "ForceCommand"], 1]);
    sendMessages.push([["cPump",1, "ForceValue"], 0]);
    sendMessages.push([["cPump",1, "ForceCommand"], 1]);
    sendMessages.push([["cPump",2, "ForceValue"], 0]);
    sendMessages.push([["cPump",2, "ForceCommand"], 1]);
    sendMessages.push([["PressurePID", "Step"], 0]);
    //sendMessages.push([["cPump", 0, "Command"], 0]);
    sendMessages.push([["cPump", 0, "MaxRamp"], 0]);
    //sendMessages.push([["cPump", 1, "Command"], 0]);
    sendMessages.push([["cPump", 1, "MaxRamp"], 0]);
    //sendMessages.push([["cPump", 2, "Command"], 0]);
    sendMessages.push([["cPump", 2, "MaxRamp"], 0]);
    SendMessages(sendMessages, socket);
  },
  StartManualPump : (cPump, index, socket) => {
    var maxRamp = cPump.StartRamp;
    var sendMessages = [];
    sendMessages.push([["cPump", index, "MaxRamp"], maxRamp]);
    sendMessages.push([["cPump",index, "ForceValue"], 1]);
    sendMessages.push([["cPump",index, "ForceCommand"], 1]);
    //sendMessages.push([["cPump", index, "Frequency"], 5]);

    //sendMessages.push([["cPump", index, "Command"], 1]);
    //sendMessages.push([['cPump',index,'status'],1])
    SendMessages(sendMessages, socket);
  },
  StopManualPump : (index) => {
    const state = store.getState();
    const socket = state.SocketIO.socket;
  
    var maxRamp = state.Tags.getIn(["cPump",index,"StartRamp"]);
    var sendMessages = [];
    sendMessages.push([["cPump", index, "MaxRamp"], maxRamp]);
    sendMessages.push([["cPump",index, "ForceValue"], 0]);
    sendMessages.push([["cPump",index, "ForceCommand"], 1]);

    //sendMessages.push([["cPump", index, "Command"], 0]);
    //sendMessages.push([["cPump", index, "status"], 0]);
    SendMessages(sendMessages, socket);
  },
  SetManualFreqPump : (index, value, socket) => {
    if(value<5){
      var sendMessages = [];
      sendMessages.push([["cPump", index, "MaxRamp"], 0]);
      sendMessages.push([["cPump",index, "ForceValue"], 0]);
      sendMessages.push([["cPump",index, "ForceCommand"], 1]);
      sendMessages.push([["cPump",index, "Frequency"], 0]);
      SendMessages(sendMessages, socket);

    }else{
      SendMessage(["cPump", index, "Frequency"], value, socket);

    }
  },
  UpdateSettings : (browseName, value, socket) => {
    SendMessage(browseName, value, socket);
  },
  ActAlarm : (actRow, comment,tagAlarmList, socket) => {

    const tag = (actRow.status==="Active"?1:(actRow.status==="Ack"?2:(actRow.status==="Norm"?3:4)))+"|"+FormatDate(actRow.activeTime)+"|"+actRow.type+"|"+actRow.tag+"|"+comment+"@"
    tagAlarmList = tagAlarmList + tag;
    SendMessage(["ActAlarm"], tagAlarmList, socket);
  },
  ActAllAlarm : (actAllAlarms,socket) => {
    actAllAlarms = actAllAlarms===1?0:1
    SendMessage(["AckAllAlarms"], actAllAlarms, socket);
    SendMessage(["AckAllTrigger"], 1, socket);
  
  },
  ToggleFountainCommand : () => {
    const state = store.getState();
    const socket = state.SocketIO.socket;
    const FountainCommand = state.Tags.getIn(["Fountain","Command"]);
    const value = FountainCommand===1?0:1;
    SendMessage(["Fountain","Command"], value, socket);
  },
  ToggleBackFlushCommand : () => {
    const state = store.getState();
    const socket = state.SocketIO.socket;
    const backFlushCommand = state.Tags.getIn(["BackFlush","Command"]);
    const value = backFlushCommand===1?0:1;
    SendMessage(["BackFlush","Command"], value, socket);
  },
}



function FormatDate(date){
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
}

function SendMessages(listItems, socket) {
  listItems.forEach((element) => {
    SendMessage(element[0], element[1], socket);
  });
}

export default Commands;

