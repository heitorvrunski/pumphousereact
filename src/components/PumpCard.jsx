import React from 'react';
import PumpImage from './PumpImage';
import { useDispatch } from 'react-redux';

function activePumpAction(cPump){
    return { type: 'ChangeStatePump',cPump}
}

//ChangeStatePump
export default function PumpCard(props){
    const dispatch = useDispatch();
    
    function activePump(){
        dispatch(activePumpAction(props.cPump))
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
                    <input type="text" className="form-control mx-0 my-1 w-100 text-end"/>
                </li>
                <li>
                    <button type="button" className="btn btn-principal mx-0 my-1 w-100 " disabled={props.cPump.Status===1} onClick={activePump}> Start</button>
                </li>
                <li>
                    <button type="button" className="btn btn-principal mx-0 my-1 w-100 mb-2" disabled={props.cPump.Status!==1} onClick={activePump}> STOP</button>
                </li>
            </ul>

        </div>

    );
    
}
