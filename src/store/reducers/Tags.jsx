import Immutable  from "immutable";

const INITIAL_STATE =  Immutable.fromJS(
{
    cPump:[
        { Label:"PUMP 1 - 30 HP", Status: 1, Command:10, Frequency:42, IPAddress:"", Amps:1.2, setFrequency:0, errorCode:0, MaxRamp:0, IncRamp:0, RampTime:100, Increment:1, StartRamp:0 },
        { Label:"PUMP 2 - 30 HP", Status: 0, Command:1, Frequency:0, IPAddress:"", Amps:0, setFrequency:0, errorCode:0, MaxRamp:0, IncRamp:0, RampTime:100, Increment:1, StartRamp:0 },
        { Label:"PUMP 3 - 6 HP", Status: 0, Command:1, Frequency:0, IPAddress:"", Amps:0, setFrequency:0, errorCode:0, MaxRamp:0, IncRamp:0, RampTime:100, Increment:1, StartRamp:0 },
        { Label:"POND FILL", Status: 1, Command:10, Frequency:60, IPAddress:"", Amps:1.5, setFrequency:0, errorCode:0, MaxRamp:0, IncRamp:0, RampTime:100, Increment:1, StartRamp:0 }],
    cLevel:{Value:10,PLCValue:1.2,LevelMax:100, LSL:1, LSH:0,Percentage:60},
    Meter:{meterName:"" , currentPulseCount: 0 , lastPulseCount: 0 , power: 0 , battery: 0 , shutDownPump: 0 , doorOpen: 0 , longitude: 0 , latitude: 0 , enabled: 0 , newColor: "" , lastWrite: "" , acreFeet: 0 , GPM: 0 , readStatus: 0 , writeStatus: 0 , readCompleted: 0 , writeCompleted: 0 , gpmAlarm: 0 , totalizer: 0 , GPSLatitude: 0 , GPS: "" , PLCBoxOpen: 0 , waterLidOpen: 0 , waterTable: 0 , startReading: 0 , pressure: 0 , sensorLength: 0 , distanceToSlab: 0 , eventTrigger: 0 , WaterPressure: 0 , KFactor: 0 , WaterPressureIn: 0 , WellSensorRange: 0 , RainGauge: 0 , vRainGauge: 0 , RainGaugeCalc: 0 , BeginCount: 0},
    saveMeterData:0,
    ConnectionString:"",
    PressurePID:{Step:0 , SetPoint: 0 , enable: 0 , Current: 105.6 , Pump1Time: 0 , Pump2Time: 0 , Pump3Time: 0 , Pump0Time: 0 , OffSet: 0 , PumpOffSet: 0 , PumpMaxFreq: 0 , PumpMinFreq: 0 , PLCValue: 0 , MaxValue: 0 , Safety: 0 , Pump1TimeOutFreq: 0 , Pump1TimeOut: 0},
    PondFill:{MinPercent:100,MaxPercent:0},
    ReadStatus:0 , 
    ReadCompleted: 0 , 
    WatchDog: 0 , 
    test: 0 , 
    MinScale: 0 , 
    MaxScale: "" , 
    strCursorValue: 0 , 
    EnablePondFill: "" , 
    SendEmailTS: 0 , 
    SendEmailLevel: 0 , 
    bSecond: 0 , 
    SetOrderPump: 0
});

export default function Tags(state= INITIAL_STATE, action){
    switch(action.type){
        case 'UpdateData':
            return state.setIn(action.dataUpdate.tag,action.dataUpdate.value)
        default:
            return state;
    }
}


