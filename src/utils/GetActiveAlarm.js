export function GetActiveAlarm(element2Find,type2Find, allAlarmsActiveds) {
    for (const alarm of allAlarmsActiveds) {
        if(alarm.Tag.toUpperCase() === element2Find.toUpperCase() && alarm.Type.toUpperCase() === type2Find.toUpperCase() ){
            alarm.Actived = true
            return alarm
        }
    }
    return {Actived:false}
  }
  