import update from "react-addons-update";
const INITIAL_STATE = {
  isAuth: false,
  firstTime: true,
  expires: new Date(),
};

export default function ExpiresJWT(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "Change_Fisrt_Time":
      return update(state, {
        firstTime: { $set: action.value },
      });
    case "Set_Expires":
      return update(state, {
        isAuth: { $set: true },
        expires: { $set: action.dateExpires },
      });
    default:
      return state;
  }
}
