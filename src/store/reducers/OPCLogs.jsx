const INITIAL_STATE = {
    Logs:[]
};

export default function OPCLogs(state = INITIAL_STATE, action) {
    switch (action.type) {
        case "Add_OPCLogs":
          state.Logs.push(action.message);
          return state;
        default:
          return state;
      }
}