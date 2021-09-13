const INITIAL_STATE = {};

export default function SysConfig(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "Config_Settings":
      state = action.value;
      return state;
    default:
      return state;
  }
}
