import { SendMessage } from "../middleware/socketio"


export const EnablePressurePID = (cPumps) =>{

    var i , sendMessages = []
    for(i===0;i<cPumps.length;i++){
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


export const UpdateSettings = (browseName,value) =>{
    SendMessage(browseName,value);
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
  
  