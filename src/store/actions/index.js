import axios from "axios";
import io from "socket.io-client";
const socket = io.connect(`http://${window.location.hostname}:3000`,
{   withCredentials: true

});

export const EnablePressurePID = (cPumps) =>{

  var i , sendMessages = []
  for(i==0;i<cPumps.length;i++){
    if(cPumps[i].Command <=1){
      sendMessages.push([['cPumps',i,'Frequency'],0])
    }
    sendMessages.push([['cPumps',i,'MaxRamp'],cPumps[i].StartRamp])
  }
  //push
  sendMessages.push( [['PressurePID','enable'],1])
  SendMessages(sendMessages);
}
export const DisablePressurePID = () =>{
  var sendMessages = []
  sendMessages.push( [['PressurePID','enable'],0])
  sendMessages.push( [['PressurePID','Step '],0])
  SendMessages(sendMessages);

}

export const EnableDesablePondPID = (enablePondFill) =>{
  enablePondFill = enablePondFill===1?0:1;
  SendMessage(['EnablePondFill'],enablePondFill);
}
export const DisableAllPump = () =>{
  var sendMessages = [];
  sendMessages.push( [['PressurePID','enable'],0])
  sendMessages.push( [['PressurePID','Step'],0])
  sendMessages.push([['cPump',0,'Command'],1])
  sendMessages.push( [['cPump',0,'MaxRamp'],0])
  sendMessages.push([['cPump',1,'Command'],1])
  sendMessages.push([['cPump',1,'MaxRamp'],0])
  sendMessages.push([['cPump',2,'Command'],1])
  sendMessages.push([['cPump',2,'MaxRamp'],0])
  SendMessages(sendMessages);



}



export const StartManualPump = (cPump,index) =>{
  var maxRamp = cPump.StartRamp;
  var sendMessages = [];
  sendMessages.push([['cPump',index,'MaxRamp'],maxRamp])
  sendMessages.push([['cPump',index,'Command'],10])
  sendMessages.push([['cPump',index,'status'],1])
  SendMessages(sendMessages);

}



export const StopManualPump = (index) =>{
  var sendMessages = [];

  sendMessages.push([['cPump',index,'MaxRamp'],0])
  sendMessages.push([['cPump',index,'Command'],1])
  sendMessages.push([['cPump',index,'status'],0])
  SendMessages(sendMessages);

}



export const SetManualFreqPump = (index,value)=>{
  SendMessage(['cPump',index,'setFrequency'],value);
}


function SendMessages(listItems){
  listItems.forEach(element => {
    SendMessage(element[0],element[1]);
  });
}


export const  UpdateData =(data) =>{
  console.log('Receave Data <-')


  var tag = data.browseName;
  var value = data.value;
  var dataUpdate = { 
    tag:tag,
    value:value
  }
  return { type: 'UpdateData',dataUpdate}
}

export const  SendMessage =(item,value) =>{
  console.log('Send Data ->')

  const data = {
    browseName:item,
    value:value,
    dataType:DataType(value)
  }

  socket.emit("write",data);

}


function DataType(value){
  if(typeof value === 'number'){
    if(Number.isInteger(value)){
      return 6
    }
    return 11
    
  }else if (typeof value === 'string'){
    return 12

  }else{
    return 1
  }
}

export const GetSysConfig = (value) =>{

  return {type: 'Config_Settings',value }
}

export const ConfigTrends = (value) =>{

  return {type: 'Config_Trends',value }
}

export const ChangeStateTrend = (index) =>{

  return {type: 'Change_State_Trend',index }
}

export const ChangeMode = (value) =>{

  return {type: 'Change_Mode',value }
}

export const ChangeDuration = (value) =>{

  return {type: 'Change_Duration',value }
}

export const SetDateRangeAction = (value,name) =>{
  const dateSplit=value.replaceAll('-','/');

  return {type: 'Set_Date_Range',dateSplit,name }

}

export const ClearAllTrends = () =>{

  return {type: 'Clear_All_Trends'}

}