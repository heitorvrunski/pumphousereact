const ConvertTime = (value,measure, measure2Convert) =>{
    if(measure.toLowerCase()===measure2Convert.toLowerCase()){
        return value
    }
    const firstMeasure = LevelMeasureTime(measure)
    const secondMeasure = LevelMeasureTime(measure2Convert)

    const unit2Convert = firstMeasure+secondMeasure
    var diference = -1
    if(unit2Convert===3)
        diference = 1000;
    else if(unit2Convert===5)
        diference = 60000;
    else if(unit2Convert===9)
        diference = 3600000;
    else if(unit2Convert===6)
        diference = 60;
    else if(unit2Convert===10)
        diference = 3600;
    else if(unit2Convert===12)
        diference = 60;

    if(firstMeasure>secondMeasure)
        return value*diference
    else
        return value/diference
}
function LevelMeasureTime(measure){
    var measure2return = -1
    if(measure.toLowerCase()==="ms")
        measure2return = 1
    if(measure.toLowerCase()==="s")
        measure2return = 2
    if(measure.toLowerCase()==="m")
        measure2return = 4
    if(measure.toLowerCase()==="h")
        measure2return = 8
    return measure2return
}


export default ConvertTime