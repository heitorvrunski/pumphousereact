import React, { useState } from "react";
import PumpImage from "./PumpImage";
import { useSelector } from "react-redux";
import Commands from "../commands/index.js";
import CheckGroup from "../utils/CheckGroup";
import Button from "./SystemComponents/Button.jsx";

export default function PumpCard(props) {
  const pidEnableNode = ["PressurePID", "enable"];
  const pidEnable = useSelector((state) => state.Tags.getIn(pidEnableNode));
  const groupUser = useSelector((state) => state.Auth.group);

  const [NewFreq, SetNewFreq] = useState(props.cPump.setFrequency);
  const socket = useSelector((state) => state.SocketIO.socket);
  const handleChange = (event) => {
    const newFrenqHandle = event.target.validity.valid
      ? event.target.value
      : NewFreq;
    SetNewFreq(newFrenqHandle);
  };
  function setManualFreqPump() {
    if (NewFreq > 60 || NewFreq < 5) {
      SetNewFreq(0);
    } else {
      Commands.SetManualFreqPump(props.index, NewFreq, socket);
    }
  }

  function startManualPump() {
    Commands.StartManualPump(props.cPump, props.index, socket);
  }
  function stopManualPump() {
    Commands.StopManualPump(props.index, socket);
  }
  return (
    <div className="card col mx-2 col-4 my-2 col-xl-1 card-Pump position-relative" style={{height:"-webkit-fill-available"}}>
      {props.cPump.IsPond!==1?
        <div className={" mt-1 d-flex position-absolute "} style={{marginLeft:"-28px "}} >
        <PumpImage cPump={props.cPump} width={props.cPump.SmallImage===1?"50px":"60px"} className="mx-0" />
      </div>
      :
      null
      }
      
      <ul
        className={"text-center text-wrap p-0  py-1 " + (props.cPump.IsPond!==1?"ms-4":"")}
        style={{ listStyleType: "none" }}
      >
        <li>
          <h5 className="mx-0 w-100" style={{fontWeight:"bold"}}>{props.cPump.Label} </h5>
        </li>
        {props.cPump.IsPond===1?
          <li>
            <div className="row my-1 card-Pump-Image">
              <div className="my-auto h-100 mt-1 justify-content-center d-flex">
                <PumpImage cPump={props.cPump} width="90px" className="mx-0" style={{width:"90px"}} />
              </div>
            </div>
          </li>
        :
          null
        }

        <li>
          <h4
            className={
              "mx-0 my-1 w-100 " +
              (props.cPump.Status === 1 ? "text-success" : "text-danger")
            }
          >
            {props.cPump.Status === 1 ? "RUNNING" : "STOP"}
          </h4>
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
          <input
            type="text"
            className="form-control mx-0 my-1 w-100 text-end"
            disabled={pidEnable === 1}
            pattern="[0-9^.,]*"
            onInput={handleChange}
            value={NewFreq}
          />
        </li>
        {/* <li>
          <Button
            type="button"
            className="btn btn-principal mx-0 my-1 w-100 "
            disabled={props.cPump.Status !== 1 || pidEnable === 1}
            onClick={setManualFreqPump}
          >
            Set Frequency
          </Button>
        </li>
        <li>
          <Button
            type="button"
            className="btn btn-principal mx-0 my-1 w-100 "
            disabled={props.cPump.Status === 1 || pidEnable === 1}
            onClick={startManualPump}
          >
            {" "}
            Start
          </Button>
        </li>
        <li>
          <Button
            type="button"
            className="btn btn-principal mx-0 my-1 w-100 mb-2"
            disabled={props.cPump.Status !== 1 || pidEnable === 1}
            onClick={stopManualPump}
          >
            {" "}
            STOP
          </Button>
        </li> */}
      </ul>
      <ul
        className="text-center text-wrap p-0"
        style={{ listStyleType: "none" }}
      >
        <li>
          <Button
            type="button"
            className="btn btn-Light mx-0 my-1 w-100 "
            disable={(props.cPump.Status !== 1 || pidEnable === 1)||CheckGroup.checkGroup("guest",groupUser)}
            onClick={setManualFreqPump}
          >
            Set Frequency
          </Button>
        </li>
        <li>
          <Button
            type="button"
            className="btn btn-Light mx-0 my-1 w-100 "
            disable={(props.cPump.Status === 1 || pidEnable === 1)||CheckGroup.checkGroup("guest",groupUser)}
            onClick={startManualPump}
          >
            {" "}
            Start
          </Button>
        </li>
        <li>
          <Button
            type="button"
            className="btn btn-Light mx-0 my-1 w-100 mb-2"
            disable={(props.cPump.Status !== 1 || pidEnable === 1)||CheckGroup.checkGroup("guest",groupUser)}
            onClick={stopManualPump}
          >
            {" "}
            STOP
          </Button>
        </li>
      </ul>
    </div>
  );
}
