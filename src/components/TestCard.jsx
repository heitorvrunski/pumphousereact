import React from "react";
import { useSelector } from "react-redux";
import { SendMessage } from "../middleware/socketio.js";
import Button from "./SystemComponents/Button.jsx";

const TestCard = () => {
  const itemP = ["PressurePID", "Current"];
  const itemL = ["cLevel", "Percentage"];
  const socket = useSelector((state) => state.SocketIO.socket);

  const pressure = useSelector((state) => state.Tags.getIn(itemP));
  const level = useSelector((state) => state.Tags.getIn(itemL));

  function IncresePressure() {
    var pressureNew = pressure + 5;
    SendMessage(itemP, pressureNew, socket);
  }

  function DecresePressure() {
    var pressureNew = pressure - 5;
    SendMessage(itemP, pressureNew, socket);
  }

  function IncreseLevel() {
    var levelNew = level + 5;
    SendMessage(itemL, levelNew, socket);
  }

  function DecreseLevel() {
    var levelNew = level - 5;
    SendMessage(itemL, levelNew, socket);
  }
  return (
    <div className="card col m-2" style={{ maxWidth: "450px" }}>
      <h5 className="card-title">Demo Area</h5>
      <div className="row">
        <Button
          className="col btn btn-principal mx-1 my-1"
          type="button"
          onClick={IncreseLevel}
        >
          {" "}
          Increase <br></br> Level
        </Button>
        <Button
          className="col btn btn-principal mx-1 my-1"
          type="button"
          onClick={DecreseLevel}
        >
          {" "}
          Decrease <br></br> Level
        </Button>
        <Button
          className="col btn btn-principal mx-1 my-1"
          type="button"
          onClick={IncresePressure}
        >
          {" "}
          Increase <br></br> Pressure
        </Button>
        <Button
          className="col btn btn-principal mx-1 my-1"
          type="button"
          onClick={DecresePressure}
        >
          {" "}
          Decrease <br></br> Pressure
        </Button>
      </div>
    </div>
  );
};

export default TestCard;
