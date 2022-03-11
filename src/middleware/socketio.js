export const UpdateData = (data) => {
  //console.log("Received Data <-", data);

  var tag = data.browseName;
  var value = data.value;
  var dataUpdate = {
    tag: tag,
    value: value,
  };
  return { type: "UpdateData", dataUpdate };
};

export const SendLogs = (data,logType) => {
  var type = 'Received Data <-'
  var tagstring = '';
  data.browseName.forEach(element => {
    tagstring += element+"."
  });
  tagstring=  tagstring.substring(0,tagstring.length-1);
  var message = data.timestamp + ' ' + type + ' TAG - ' +tagstring+' | value: ' + data.value;

  
  return { type: "Add_OPCLogs", message };
};

export const FirstReadDone = () => {
  console.log("First Read Done!");
  return { type: "FirstReadDone" };
};

export const SendMessage = (item, value, socket) => {
  const data = {
    browseName: item,
    value: value,
    dataType: DataType(value),
  };
  console.log("Sent Data ->", data);
  socket.emit("write", data);
};

function DataType(value) {
  if (typeof value === "number") {
    if (Number.isInteger(value)) {
      return 6;
    }
    return 11;
  } else if (typeof value === "string") {
    return 12;
  } else {
    return 1;
  }
}

export const ActionSocketConnect = () => {
  return { type: "Connect_Socket" };
};
