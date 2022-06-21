import React from "react";
import { useSelector } from "react-redux";
import PumpCard from "./PumpCard"
import Button from "../SystemComponents/Button";
import Commands from "../../commands/index.js";


// import TestCard from "./TestCard.jsx";

export default function Control() {

  const socket = useSelector((state) => state.SocketIO.socket);
  const Tags = useSelector((state) => state.Tags.toJS());
  const setOrderPump = useSelector((state) => state.Tags.getIn(["SetOrderPump"]));

  const cPump = useSelector((state) => state.Tags.get("cPump")).sort(order);
  function order(a, b) {
    return a.toJS().Order < b.toJS().Order ? -1 : (a.toJS().Order > b.toJS().Order ? 1 : 0);
  }



  function autoPressurePIDAction() {
    if (Tags.PressurePID.enable !== 1) {
      Commands.EnablePressurePID(Tags.cPump, setOrderPump, socket);
    } else {
      Commands.DisablePressurePID(socket);
    }
  }

  function autoPondFillPIDAction() {
    Commands.EnableDesablePondPID(Tags.EnablePondFill, socket);
  }

  function disableAllPumpsAction() {
    Commands.DisableAllPump(socket);
  }

  return (
    <div className="d-flex row justify-content-center">
      <div className="d-flex col-12 justify-content-between align-items-center">
        <h4 className="text-Dark f-400 mt-1">Control</h4>


      </div>
      <div className="d-flex row">
        <div className="col-12 col-md-4" style={{ "maxWidth": "400px", "minWidth": "350px" }}>

          <div className={"d-flex  flex-" + (Tags.PressurePID.enable === 1 ? "column" : "row")}
          // style={{"maxWidth":"350px"}}
          >
            <div className={"card p-2 d-flex flex-column position-relative  " + (Tags.PressurePID.enable === 1 ? "" : " mb-2")} style={Tags.PressurePID.enable === 1 ? { "height": "110px" } : { "width": "400px" }}>

              <h4 className="text-Dark f-400 ms-2">

                <svg id="Layer_1" data-name="Layer 1" width="35px" fill="#5836e5" className="me-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 54.68 28.33"><defs><style>.cls-1</style></defs><path className="cls-1" d="M54.68.67a6.54,6.54,0,0,0-5,2.48c-1,1.05-2,2-3.8,2s-2.76-.91-3.81-2S39.59.67,37,.67a6.54,6.54,0,0,0-5,2.48c-1,1.05-1.95,2-3.8,2s-2.75-.91-3.8-2S21.93.67,19.36.67s-3.87,1.32-5,2.48-1.95,2-3.8,2-2.75-.91-3.8-2A6.54,6.54,0,0,0,1.7.67a.84.84,0,0,0-.85.83.85.85,0,0,0,.85.84c1.85,0,2.76.91,3.8,2s2.46,2.47,5,2.47a6.53,6.53,0,0,0,5-2.47c1-1.06,2-2,3.8-2s2.75.91,3.8,2a6.53,6.53,0,0,0,5,2.47c2.57,0,3.87-1.31,5-2.47s2-2,3.8-2,2.75.91,3.8,2a6.53,6.53,0,0,0,5,2.47,6.51,6.51,0,0,0,5-2.47c1.05-1.06,2-2,3.81-2a.85.85,0,0,0,.85-.84A.84.84,0,0,0,54.68.67Z" transform="translate(-0.85 -0.67)" /><path className="cls-1" d="M54.68,11.78a6.54,6.54,0,0,0-5,2.48c-1,1.05-2,2-3.8,2s-2.76-.91-3.81-2-2.45-2.48-5-2.48a6.54,6.54,0,0,0-5,2.48c-1,1.05-1.95,2-3.8,2s-2.75-.91-3.8-2-2.46-2.48-5-2.48-3.87,1.32-5,2.48-1.95,2-3.8,2-2.75-.91-3.8-2a6.54,6.54,0,0,0-5-2.48.84.84,0,1,0,0,1.67c1.85,0,2.76.91,3.8,2s2.46,2.47,5,2.47a6.53,6.53,0,0,0,5-2.47c1-1.06,2-2,3.8-2s2.75.91,3.8,2a6.53,6.53,0,0,0,5,2.47c2.57,0,3.87-1.31,5-2.47s2-2,3.8-2,2.75.91,3.8,2a6.35,6.35,0,0,0,10,0c1.05-1.06,2-2,3.81-2a.84.84,0,1,0,0-1.67Z" transform="translate(-0.85 -0.67)" /><path className="cls-1" d="M54.68,22.89a6.53,6.53,0,0,0-5,2.47c-1,1.06-2,2-3.8,2s-2.76-.91-3.81-2a6.35,6.35,0,0,0-10,0c-1,1.06-1.95,2-3.8,2s-2.75-.91-3.8-2-2.46-2.47-5-2.47-3.87,1.31-5,2.47-1.95,2-3.8,2-2.75-.91-3.8-2a6.53,6.53,0,0,0-5-2.47.84.84,0,1,0,0,1.67c1.85,0,2.76.91,3.8,2S8,29,10.53,29a6.53,6.53,0,0,0,5-2.47c1-1.06,2-2,3.8-2s2.75.91,3.8,2a6.53,6.53,0,0,0,5,2.47c2.57,0,3.87-1.31,5-2.47s2-2,3.8-2,2.75.91,3.8,2a6.35,6.35,0,0,0,10,0c1.05-1.06,2-2,3.81-2a.84.84,0,1,0,0-1.67Z" transform="translate(-0.85 -0.67)" /></svg>

                Water Level
              </h4>
              <div className="Water-Box position-absolute end-0 m-2" style={Tags.PressurePID.enable === 1 ? { "height": "80px" } : { "height": "130px" }}>
                <div className="WaterBoxDiv align-bottom" style={{ height: Tags.cLevel.Percentage + "%" }}></div>
                <div className="lslDiv"></div>
                <div className="Perclabel f-400" style={Tags.PressurePID.enable === 1 ? {} : { "bottom": "70px" }}>
                  <h3>
                    {Tags.cLevel.Percentage + "%"}
                  </h3>
                </div>
                <div className="LSLLabel f-400">LSL {Tags.cLevel.LSL === 1 ? "is" : "is not"} actived</div>

              </div>
            </div>
            <div className={"" + (Tags.PressurePID.enable === 1 ? "row mt-2 " : " ms-2")}>
              <div className={"card p-1 d-flex mb-2 flex-column position-relative col w-auto" + (Tags.PressurePID.enable === 1 ? " me-2" : " ")}>
                <h4 className="text-Mid mt-1  w-100 text-center f-400 p-0 mb-1 ">
                  Flow
                </h4>
                <h4 className="text-Light  w-100 text-center f-400 p-0 ">
                  {Tags.cFlux.Value.toFixed(2)}
                </h4>
              </div>
              <div className="card p-1 d-flex mb-2 flex-column position-relative col px-2">
                <h4 className="text-Mid mt-1 w-100 text-center f-400 p-0 mb-1">
                  Pressure
                </h4>
                <h4 className="text-Light w-100 text-center f-400 p-0">
                  {Tags.PressurePID.Current.toFixed(2)}
                </h4>
              </div>
              {
                Tags.PressurePID.enable === 1 ?
                  <div className="card p-1 d-flex mb-2 ms-2 flex-column position-relative col" style={{ "maxWidth": "80px" }}>
                    <h4 className="text-Mid mt-1 w-100 text-center f-400 p-0 mb-1">
                      Step
                    </h4>
                    <h4 className="text-Light  w-100 text-center f-400 p-0 ">
                      {Tags.PressurePID.Step}
                    </h4>
                  </div>
                  :
                  null
              }


            </div>
          </div>
          <div className="d-flex flex-row my-2" >
            <Button className="btn btn-lg btn-principal btn-block m-0 p-0 pb-1 col me-2" type="button" onClick={() => autoPressurePIDAction()}>{Tags.PressurePID.enable === 1 ? "Disable PID" : "Enable PID"}</Button>
            <Button className="btn btn-lg btn-principal btn-block m-0 p-0 pb-1 col ms-1" type="button" onClick={() => autoPondFillPIDAction()}>{Tags.EnablePondFill === 1 ? "Disable Pond Fill" : "Enable Pond Fill"}</Button>
          </div>
          <div className="w-100 mt-3">
            <Button className="btn btn-lg btn-principal btn-block m-0 p-0 pb-1 w-100 me-2" type="button" onClick={() => disableAllPumpsAction()}>Disable All Pumps</Button>
          </div>
          {Tags.PressurePID.Safety === 1 ?
            <h6 className="  p-0 safetyDiv px-4 blink text-center d-block mt-2">Safety Mode ON</h6>
            :
            <div></div>
          }
        </div>

        <div className="col-12 col-md-5 ms-md-2" style={{ "maxWidth": "400px" }}>
          {cPump.map((pump, index) => (
            <PumpCard key={index} index={index === 1 ? 2 : index === 2 ? 1 : index} cPump={pump.toJS()} />
          ))}
        </div>
      </div>
    </div>
  );
}