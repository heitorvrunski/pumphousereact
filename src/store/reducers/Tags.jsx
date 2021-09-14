import Immutable from "immutable";

const INITIAL_STATE = { loading: true };

export default function Tags(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "UpdateData":
      if (state.loading === true) {
        if (action.dataUpdate.tag !== "End") {
          const jsonTag = parseBrowseName2Object(
            action.dataUpdate.tag,
            action.dataUpdate.value,
            state
          );

          return jsonTag;
        } else {
          state.loading = false;
          return Immutable.fromJS(state);
        }
      } else {
        if (action.dataUpdate.tag !== "End") {
          return state.setIn(action.dataUpdate.tag, action.dataUpdate.value);
        }
        return state;
      }
    default:
      return state;
  }
}

const parseBrowseName2Object = (browseName, value, state) => {
  if (browseName.length === 3) {
    if (state[browseName[0]]) {
      const classProp = Object.assign({}, state[browseName[0]][browseName[1]], {
        [browseName[2]]: value,
      });

      state[browseName[0]][browseName[1]] = classProp;
    } else {
      state[browseName[0]] = [];
      state[browseName[0]][browseName[1]] = {};
      state[browseName[0]][browseName[1]][browseName[2]] = value;
    }
  } else if (browseName.length === 1) {
    state[browseName[0]] = value;
  } else {
    var tryParse = parseInt(browseName[1], 10);
    const isAnArray = tryParse >= 0 ? true : false;
    if (isAnArray) {
      if (state[browseName[0]]) {
        state[browseName[0]][browseName[1]] = value;
      } else {
        state[browseName[0]] = [];
        state[browseName[0]][browseName[1]] = value;
      }
    } else {
      if (state[browseName[0]]) {
        state[browseName[0]][browseName[1]] = value;
      } else {
        state[browseName[0]] = {};
        state[browseName[0]][browseName[1]] = value;
      }
    }
  }

  return state;
};
