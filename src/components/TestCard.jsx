import React from 'react';
import { useSelector } from 'react-redux';
import { SendMessage } from '../middleware/socketio.js';

const TestCard = () =>{
    const itemP = ['PressurePID','Current'];
    const itemL = ['cLevel','Percentage'];
  
  
    const pressure = useSelector(state=>state.Tags.getIn(itemP));
    const level = useSelector(state=>state.Tags.getIn(itemL));
  

  
    function IncresePressure () {
      var pressureNew = pressure +5;
      SendMessage(itemP,pressureNew)
  
    }
  
    function DecresePressure () {
      var pressureNew = pressure -5;
      SendMessage(itemP,pressureNew)
  
    }
  
    function IncreseLevel () {
      var levelNew = level +5;
      SendMessage(itemL,levelNew)
  
    }
  
    function DecreseLevel () {
      var levelNew = level -5;
      SendMessage(itemL,levelNew)
  
    }
    return (
        <div className="card col m-2" style={{maxWidth:"450px"}}>
            <h5 className="card-title">Demo Area</h5>
            <div className="row">
                <button className="col btn btn-principal mx-1 my-1" type="button" onClick={IncreseLevel}> Increase <br></br> Level</button>
                <button className="col btn btn-principal mx-1 my-1" type="button" onClick={DecreseLevel}> Decrease <br></br> Level</button>
                <button className="col btn btn-principal mx-1 my-1" type="button" onClick={IncresePressure}> Increase <br></br> Pressure</button>
                <button className="col btn btn-principal mx-1 my-1" type="button" onClick={DecresePressure}> Decrease <br></br> Pressure</button>
            </div>
            

        </div>

    );
    
}

export default TestCard
