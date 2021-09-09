import React, { useState }  from 'react';
import PumpImage from './PumpImage';
import { useSelector } from 'react-redux';
import { StartManualPump, StopManualPump ,SetManualFreqPump } from '../store/actions/index.js';

export default function PumpCard(props){
    const pidEnableNode = ['PressurePID','enable']
    const pidEnable = useSelector(state=>state.Tags.getIn(pidEnableNode));
    const [NewFreq,SetNewFreq] = useState(props.cPump.setFrequency);

    const handleChange = event => {
        const newFrenqHandle = (event.target.validity.valid) ? event.target.value : NewFreq;
        SetNewFreq(newFrenqHandle);
      }
    function setManualFreqPump(){
        if(NewFreq>60||NewFreq<5){
            SetNewFreq(0);

        }else{
            SetManualFreqPump(props.index,NewFreq,props)
        }
    } 
    
    function startManualPump(){
        StartManualPump(props.cPump,props.index,props)
    }
    function stopManualPump(){
        StopManualPump(props.index,props)
    }
    return (
        <div className="card col mx-2 col-4 my-2 col-xl-1 card-Pump">
            <ul className="text-center text-wrap p-0 m-0 py-1" style={{listStyleType:"none"}}>
                <li>
                    <h4 className="mx-0 w-100">{props.cPump.Label}</h4>
                </li>
                <li>
                    <div className="row my-1 card-Pump-Image">
                        <div className="my-auto h-100 mt-1 justify-content-center d-flex" >
                            <PumpImage cPump={props.cPump}   width="90px" className="mx-0"/>
                        </div>
                    </div>
                </li>
                <li>
                    <h4 className={"mx-0 my-1 w-100 " + (props.cPump.Status === 1 ? "text-success" : "text-danger")}>{props.cPump.Status === 1 ? 'RUNNING' : 'STOP'}</h4>
                </li>
                <li>
                    <h5 className="mx-0 my-1 w-100">Freq.: {props.cPump.Frequency} Hz</h5>
                </li>
                <li>
                    <h5 className="mx-0 my-1 w-100">Amp.: {props.cPump.Amps} A</h5>
                </li>
                <li>
                    <h5 className="mx-0 my-1 w-100">Set Frequency (Hz):</h5>
                </li>
                <li>
                    <input type="text" className="form-control mx-0 my-1 w-100 text-end" disabled={pidEnable===1 }  pattern="[0-9^.,]*" onInput={handleChange} value={NewFreq}/>
                </li>
                <li>
                    <button type="button" className="btn btn-principal mx-0 my-1 w-100 " disabled={props.cPump.Status!==1 ||pidEnable===1 } onClick={setManualFreqPump}>Set Frequency</button>
                </li>
                <li>
                    <button type="button" className="btn btn-principal mx-0 my-1 w-100 " disabled={props.cPump.Status===1 ||pidEnable===1 } onClick={startManualPump}> Start</button>
                </li>
                <li>
                    <button type="button" className="btn btn-principal mx-0 my-1 w-100 mb-2" disabled={props.cPump.Status!==1||pidEnable===1 } onClick={stopManualPump}> STOP</button>
                </li>
            </ul>

        </div>

    );
    
}
