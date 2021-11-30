  
  const  CheckGroup = {
  checkGroup:  (group2check,groupSystem) => {
    if (groupSystem !== group2check) {
      return false;
    }
    return true;
  },

  checkIfHasnoGroup: (groupSystem) => {
    if (groupSystem === "") {
      return true;
    }
    return false;
  }
}

export default CheckGroup

