import io from "socket.io-client";
const socket = io.connect(`http://${window.location.hostname}:3000`,
{   withCredentials: true

});


export const  UpdateData =(data) =>{
    console.log('Received Data <-',data)
  
  
    var tag = data.browseName;
    var value = data.value;
    var dataUpdate = { 
      tag:tag,
      value:value
    }
    return { type: 'UpdateData',dataUpdate}
  }
  
export const  SendMessage =(item,value) =>{


const data = {
    browseName:item,
    value:value,
    dataType:DataType(value)
}
console.log('Sent Data ->',data)
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