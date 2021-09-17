const INITIAL_STATE = {
  Users: {},
  MessageError: "",
  userDeleting: {},
  modelIsOpen: false,
};

export default function Users(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "Get_Users":
      state.Users = action.value;
      return state;
    case "Set_Error_Message":
      state.MessageError = action.value;
      return state;
    case "Set_Modal_User":
      state.userDeleting = action.userModel;
      state.modelIsOpen = action.isOpen;

      return state;
    default:
      return state;
  }
}
