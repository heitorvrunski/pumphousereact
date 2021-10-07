import axios from "axios";
import Actions from "../store/actions.jsx";
const ApiNode = {
  GetSysConfig: () => (dispatch) => {
    axios
      .get(`http://${window.location.hostname}:3000/node/api/sysConfig`, {
        withCredentials: true,
      })
      .then((resp) => resp.data)
      .then((tasks) => dispatch(Actions.GetSysConfig(tasks)));
  },
  RefreshToken: () => (dispatch) => {
    axios
      .get(`http://${window.location.hostname}:3000/node/api/auth/refresh`, {
        withCredentials: true,
      })
      .then((resp) => resp.data)
      .then((tasks) => dispatch(Actions.ActionLogin(tasks)));
  },
 Logoff: () => (dispatch) => {
    axios
      .get(`http://${window.location.hostname}:3000/node/api/auth/logoff`, {
        withCredentials: true,
      })
      .then((resp) => resp.data)
      .then((tasks) => dispatch(Actions.ActionLogoff(tasks)));
  },
  GetUsers: () => (dispatch) => {
    axios
      .get(`http://${window.location.hostname}:3000/node/api/Users`, {
        withCredentials: true,
      })
      .then((resp) => resp.data)
      .then((tasks) => dispatch(Actions.GetUsers(tasks)));
  },
 GetLogs:  async function  (tail,module){
    var result;

    await axios
      .get(`http://${window.location.hostname}:3000/node/api/logDocker/${tail}/${module}`, {
        withCredentials: true,
      })
      .then((resp) => {result = resp.data});
    return result
  },
  GetLogsRange:  async function  (type,module,date){
      var result;
  
      await axios
        .post(
          `http://${window.location.hostname}:3000/node/api/logDocker/range`,
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
        `http://${window.location.hostname}:3000/node/api/Users`,
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
        `http://${window.location.hostname}:3000/node/api/Users/${user.user}`,
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
        `http://${window.location.hostname}:3000/node/api/Users/${user.user}`,
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
};

export { ApiNode };
