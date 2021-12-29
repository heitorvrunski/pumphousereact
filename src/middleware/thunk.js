import axios from "axios";
import Actions from "../store/actions.jsx";
const ApiNode = {
  GetSysConfig: () => (dispatch) => {
    axios
      .get(`http://${window.location.hostname}:${process.env.NODE_PORT??3000}/node/api/sysConfig`, {
        withCredentials: true,
      })
      .then((resp) => resp.data)
      .then((tasks) => dispatch(Actions.GetSysConfig(tasks)));
  },
  PutSysConfig: (sysConfig) => (dispatch) => {
    axios
      .put(
        `http://${window.location.hostname}:${process.env.NODE_PORT??3000}/node/api/sysConfig/${sysConfig.param}`,
        {
          param: sysConfig.param,
          value: sysConfig.value
        },
        {
          withCredentials: true,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then((data) => {
        setTimeout(() => {
          dispatch(ApiNode.GetSysConfig());
        }, 100);
      })
      .catch((data) => {
        if (data.response) {
          dispatch(Actions.SetMessageError(data.response.data.error));
        } else {
          dispatch(Actions.SetMessageError("Error to update Config"));
        }
      });
  },
  PostSysConfig: (sysConfig) => (dispatch) => {
    axios
      .post(
        `http://${window.location.hostname}:${process.env.NODE_PORT??3000}/node/api/sysConfig`,
        {
          param: sysConfig.param,
          value: sysConfig.value
        },
        {
          withCredentials: true,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then((data) => {
        setTimeout(() => {
          dispatch(ApiNode.GetSysConfig());
        }, 100);
      })
      .catch((data) => {
        if (data.response) {
          dispatch(Actions.SetMessageError(data.response.data.error));
        } else {
          dispatch(Actions.SetMessageError("Error to Create Config"));
        }
      });
  },
  DeleteSysConfig: (sysConfig) => (dispatch) => {
    axios
      .post(
        `http://${window.location.hostname}:${process.env.NODE_PORT??3000}/node/api/sysConfig/${sysConfig.param}`,
        {
        },
        {
          withCredentials: true,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then((data) => {
        setTimeout(() => {
          dispatch(ApiNode.GetSysConfig());
        }, 100);
      })
      .catch((data) => {
        if (data.response) {
          dispatch(Actions.SetMessageError(data.response.data.error));
        } else {
          dispatch(Actions.SetMessageError("Error to delete Config"));
        }
      });
  },
  RefreshToken: () => (dispatch) => {
    axios
      .get(`http://${window.location.hostname}:${process.env.NODE_PORT??3000}/node/api/auth/refresh`, {
        withCredentials: true,
      })
      .then((resp) => resp.data)
      .then((tasks) => dispatch(Actions.ActionLogin(tasks)));
  },
 Logoff: () => (dispatch) => {
    axios
      .get(`http://${window.location.hostname}:${process.env.NODE_PORT??3000}/node/api/auth/logoff`, {
        withCredentials: true,
      })
      .then((resp) => resp.data)
      .then((tasks) => dispatch(Actions.ActionLogoff(tasks)));
  },
  GetUsers: () => (dispatch) => {
    axios
      .get(`http://${window.location.hostname}:${process.env.NODE_PORT??3000}/node/api/Users`, {
        withCredentials: true,
      })
      .then((resp) => resp.data)
      .then((tasks) => dispatch(Actions.GetUsers(tasks)));
  },
 GetLogs:  async function  (tail,module){
    var result;

    await axios
      .get(`http://${window.location.hostname}:${process.env.NODE_PORT??3000}/node/api/logDocker/${tail}/${module}`, {
        withCredentials: true,
      })
      .then((resp) => {result = resp.data});
    return result
  },
  GetLogsFile:  async function  (tail){
    var result;

    await axios
      .get(`http://${window.location.hostname}:${process.env.NODE_PORT??3000}/node/api/log/${tail}`, {
        withCredentials: true,
      })
      .then((resp) => {result = resp.data});
    return result
  },
  CheckDocker:  async function  (){
    var result;

    await axios
      .get(`http://${window.location.hostname}:${process.env.NODE_PORT??3000}/node/api/cdocker`, {
        withCredentials: true,
      })
      .then((resp) => {
        if(resp.status===201)
          result = true
        else
          result = false
        })
      .catch((resp)=>{result = false});
      
    return result
  },
  GetLogsRange:  async function  (type,module,date){
      var result;
  
      await axios
        .post(
          `http://${window.location.hostname}:${process.env.NODE_PORT??3000}/node/api/logDocker/range`,
          {
            type: type,
            module: module,
            date: date,
          },
          {
            withCredentials: true,
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        )
        .then((resp) => {result = resp.data});
      return result
  },

  CreateUser: (newUser) => (dispatch) => {
    axios
      .post(
        `http://${window.location.hostname}:${process.env.NODE_PORT??3000}/node/api/Users`,
        {
          user: newUser.user,
          password: newUser.password,
          group: newUser.group,
        },
        {
          withCredentials: true,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then((data) => {
        setTimeout(() => {
          dispatch(ApiNode.GetUsers());
        }, 100);
      })
      .catch((data) => {
        if (data.response) {
          dispatch(Actions.SetMessageError(data.response.data.error));
        } else {
          dispatch(Actions.SetMessageError("Error to Create User"));
        }
      });
  },

  EditUser: (user) => (dispatch) => {
    axios
      .put(
        `http://${window.location.hostname}:${process.env.NODE_PORT??3000}/node/api/Users/${user.user}`,
        {
          user: user.user,
          block: user.block,
          group: user.group,
        },
        {
          withCredentials: true,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then((data) => {
        setTimeout(() => {
          dispatch(ApiNode.GetUsers());
        }, 100);
      })
      .catch((data) => {
        if (data.response) {
          dispatch(Actions.SetMessageError(data.response.data.error));
        } else {
          dispatch(Actions.SetMessageError("Error to Edit User"));
        }
      });
  },
  DeleteUser: (user) => (dispatch) => {
    axios
      .post(
        `http://${window.location.hostname}:${process.env.NODE_PORT??3000}/node/api/Users/${user.user}`,
        {},
        {
          withCredentials: true,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then((data) => {
        setTimeout(() => {
          dispatch(ApiNode.GetUsers());
        }, 100);
      })
      .catch((data) => {
        if (data.response) {
          dispatch(Actions.SetMessageError(data.response.data.error));
        } else {
          dispatch(Actions.SetMessageError("Error to Delete User"));
        }
      });
  },
  GetAlarmRange: async function  (startDate,endDate){
    var result;
    await axios
      .post(
        `http://${window.location.hostname}:${process.env.NODE_PORT??3000}/node/api/alarm/range`,
        {
          startDate: startDate,
          endDate: endDate,
        },
        {
          withCredentials: true,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then((resp) => {
        result = resp.data});

      return result


  },
  GetAlarmOnline:  async function  (){
    var result;

    await axios
      .get(`http://${window.location.hostname}:${process.env.NODE_PORT??3000}/node/api/alarm/online`, {
        withCredentials: true,
      })
      .then((resp) => {result = resp.data});
    return result
  },
  RestartNode: () => {
    axios
      .get(
        `http://${window.location.hostname}:${process.env.NODE_PORT??3000}/node/api/Docker/rbackend`,
        {
          withCredentials: true,
        }
      )
      .then(window.location.href = "/")
      .catch(console.log("Error to restart node"));
  },
};

export { ApiNode };
