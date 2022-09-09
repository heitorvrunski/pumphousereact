import React from "react";
import { useSelector } from "react-redux";
import PumpCard from "./PumpCard"
import Button from "../SystemComponents/Button";
import Commands from "../../commands/index.js";
import { useHistory } from "react-router";


// import TestCard from "./TestCard.jsx";

export default function Control() {
  const history = useHistory();

  const socket = useSelector((state) => state.SocketIO.socket);
  const Tags = useSelector((state) => state.Tags.toJS());
  const setOrderPump = useSelector((state) => state.Tags.getIn(["SetOrderPump"]));
  const siteType = process.env.REACT_APP_SITE_TYPE??0;
  const redirectLink = process.env.REACT_APP_REDIRECT_LINK??"";

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
  function disableAllPumpsAction() {
    Commands.DisableAllPump(socket);
  }

  function changeSite() {
     window.location.href = redirectLink;
  }
  /*
  function autoPondFillPIDAction() {
    Commands.EnableDesablePondPID(Tags.EnablePondFill, socket);
  }*/
  /*
  function disableAllPumpAction() {
    Commands.DisableAllPump(socket);
  }*/
  return (
    <div className="d-flex row justify-content-center">
      <div className="d-flex col-12 justify-content-between align-items-center">
        <h4 className="text-Dark f-400 mt-1">Control</h4>
        {Tags.PressurePID.Safety === 1 ?
          <div className=" m-0 p-0 safetyDiv px-4 blink">Safety Mode ON</div>
          :
          <div></div>
        }
        <h5 className="f-400 text-Light m-0 p-0 text-center btn-Icon" style={{ "fontSize": "20px" }} onClick={() => history.push("/")}>
          <svg xmlns="http://www.w3.org/2000/svg" className="me-1" fill="#b4b4b4" height="25px" viewBox="0 0 48 48"><path d="M24 40 8 24 24 8 26.1 10.1 13.7 22.5H40V25.5H13.7L26.1 37.9Z" /></svg>
          Home
        </h5>
      </div>
      <div className="d-flex row">
        <div className="col-12 col-md-6">
          <div className="d-flex flex-row">
            <Button className="btn btn-lg btn-principal btn-block m-0 p-0 pb-1 col me-2" type="button" onClick={() => autoPressurePIDAction()}>{Tags.PressurePID.enable === 1 ? "Disable PID" : "Enable PID"}</Button>
            <Button className="btn btn-lg btn-principal btn-block m-0 p-0 pb-1 col " type="button" onClick={() => disableAllPumpsAction()}>Disable All Pumps</Button>
            {/* <Button className="btn btn-lg btn-principal btn-block m-0 p-0 pb-1 col ms-1" type="button" onClick={()=>autoPondFillPIDAction()}>{Tags.EnablePondFill===1?"Disable Pond Fill":"Enable Pond Fill"}</Button> */}
          </div>
          <div className="d-flex flex-row my-2" >
            <Button className="btn btn-lg btn-principal btn-block m-0 p-0 pb-1 col" type="button" onClick={() => changeSite()}>{siteType === 0 ? "Change to Site B" : "Change to Site A"}</Button>
          </div>

          <div className={"d-flex  flex-row"}
          // style={{"maxWidth":"350px"}}
          >

            <div className={"card p-1 d-flex mb-2 flex-column position-relative col w-auto me-2 "}>
              <h4 className="text-Mid mt-1  w-100 text-center f-400 p-0 mb-1 ">
                Flow
              </h4>
              <h4 className="text-Light  w-100 text-center f-400 p-0 ">
                {Tags.cFlux.Value.toFixed(2)}
              </h4>
              <svg xmlns="http://www.w3.org/2000/svg"  width="40" viewBox="0 0 48 48" className={"position-absolute top-0 start-0 pump-red m-1 blink-yellow "+ (Tags.cFlux.PLCValueOPC<192?"":"d-none")}><path d="M2 42 24 4l22 38Zm5.2-3h33.6L24 10Zm17-2.85q.65 0 1.075-.425.425-.425.425-1.075 0-.65-.425-1.075-.425-.425-1.075-.425-.65 0-1.075.425Q22.7 34 22.7 34.65q0 .65.425 1.075.425.425 1.075.425Zm-1.5-5.55h3V19.4h-3Zm1.3-6.1Z"/></svg>
            </div>
            <div className="card p-1 d-flex mb-2 flex-column position-relative col px-2">
              <h4 className="text-Mid mt-1 w-100 text-center f-400 p-0 mb-1">
                Pressure
              </h4>
              <h4 className="text-Light w-100 text-center f-400 p-0">
                {Tags.PressurePID.Current.toFixed(2)}
              </h4>
              <svg xmlns="http://www.w3.org/2000/svg"  width="40" viewBox="0 0 48 48" className={"position-absolute top-0 start-0 pump-red m-1 blink-yellow "+ (Tags.PressurePID.PLCValueOPC<192?"":"d-none")}><path d="M2 42 24 4l22 38Zm5.2-3h33.6L24 10Zm17-2.85q.65 0 1.075-.425.425-.425.425-1.075 0-.65-.425-1.075-.425-.425-1.075-.425-.65 0-1.075.425Q22.7 34 22.7 34.65q0 .65.425 1.075.425.425 1.075.425Zm-1.5-5.55h3V19.4h-3Zm1.3-6.1Z"/></svg>

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

        <div className="col-12 col-md-5 ms-md-2" style={{ "maxWidth": "400px" }}>
          {cPump.map((pump, index) => (
            <PumpCard key={index} index={index} cPump={pump.toJS()} />
          ))}
        </div>
      </div>
    </div>
  );
}