import update from "react-addons-update";
const INITIAL_STATE = {
  isAuth: false,
  group: "",
  name: "",
  expires: new Date(),
};

export default function Auth(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "Login":
      return update(state, {
        isAuth: { $set: true },
        expires: { $set: action.data.expires },
        name: { $set: action.data.user },
        group: { $set: action.data.group },
      });
    case "Logoff":
      return update(state, {
        isAuth: { $set: false },
        expires: { $set: action.data.expires },
        name: { $set: action.data.user },
        group: { $set: action.data.group },
      });
    default:
      return state;
  }
}
