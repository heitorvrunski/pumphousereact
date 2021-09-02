
//{value: 30, timestamp: "2021-09-01T12:24:09.544Z", dataType: 11, browseName: "cPump[1].StartRamp"}   [cPump]
//int 6
//bool 1
//string 12
//double 11
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

  export const  SendMessage =(item,value,socket) =>{
    console.log('Send Data ->')

    const data = {
      browseName:item,
      value:value,
      dataType:DataType(value)
    }

    socket.emit("send",data);

    //return { type: 'UpdateData',dataUpdate}
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