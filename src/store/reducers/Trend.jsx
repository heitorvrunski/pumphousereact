import update from "react-addons-update";
const INITIAL_STATE =  null;

    //wrapper
    export default function Trend(state= INITIAL_STATE, action){
        switch(action.type){
            case 'Config_Trends':
                const dateNotFormated = new Date(Date.now());
                const timeNow = new Date( dateNotFormated.toISOString().split('T')[0]);
                state = {TagList:action.value,options:{mode:0,duration:1,startPeriod:timeNow.setDate(timeNow.getDate()) ,endPeriod:timeNow.setDate(timeNow.getDate() +1)}};

                return state;
            case 'Change_State_Trend':
                const value = !state.TagList[action.index].checked;
                
                return update(state, { 
                    TagList: { 
                        [action.index]: {
                        checked: {$set: value}
                      }
                    }
                  });
            case 'Change_Mode':
                return update(state, { 
                    options: { 
                        mode: {$set: action.value}
                    }
                  });
            case 'Change_Duration':
                return update(state, { 
                    options: { 
                        duration: {$set: action.value}
                    }
                  });
            case 'Set_Date_Range':
                return update(state, { 
                    options: { 
                        [action.name]: {$set: new Date(action.dateSplit)}
                    }
                  });
            case 'Clear_All_Trends':
                const tags = state.TagList;
                tags.forEach(element => {
                    if(element.checked===true)
                        element.checked=false
                });

                return update(state, { 
                    TagList: {$set: tags}
                    
                  });
            default:
                return state;
        }
    }
    

