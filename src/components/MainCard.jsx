import React from "react";
import pressureImage from "../Resource/Pressure_Transmitter.png";
import PumpImage from "./PumpImage";
import wave from "../Resource/wave.svg";
import Button from "./SystemComponents/Button.jsx";
import { useSelector } from "react-redux";
import Commands from "../commands/index.js";
import CheckGroup from "../utils/CheckGroup";
import AlarmIcon from "./SystemComponents/AlarmIcon";

//PressurePID.enable
export default function MainCard() {
  const Tags = useSelector((state) => state.Tags.toJS());
  const socket = useSelector((state) => state.SocketIO.socket);
  const safetyNode = ["PressurePID", "Safety"];
  const watchdog = useSelector((state) => state.Tags.getIn(["WatchDog"]));;
  const groupUser = useSelector((state) => state.Auth.group);


  const safety = useSelector(
    (state) =>
      (state.Tags.loading === true ? 0 : state.Tags.getIn(safetyNode)) ?? 0
  );


  function autoPressurePIDAction() {
    if (Tags.PressurePID.enable !== 1) {
      Commands.EnablePressurePID(Tags.cPump, socket);
    } else {
      Commands.DisablePressurePID(socket);
    }
  }

  function autoPondFillPIDAction() {
    Commands.EnableDesablePondPID(Tags.EnablePondFill, socket);
  }
  function disableAllPumpAction() {
    Commands.DisableAllPump(socket);
  }
  return (
    <div
      className="card col-xl-5 my-2 card-Principal"
      style={{ maxWidth: "500px" }}
    >
      <div className="container">
        <div className="row d-flex my-2 mx-2">
          <Button
            type="button"
            className="col btn btn-Light mx-1 w-20 "
            onClick={autoPressurePIDAction}
                          disable={CheckGroup.checkGroup("guest",groupUser)===true?true:false}

          >
            {Tags.PressurePID.enable === 1
              ? "Disable Auto PID"
              : "Enable Auto PID"}
          </Button>
          <Button
            type="button"
            className="col btn btn-Light mx-1 w-20 "
            onClick={autoPondFillPIDAction}
            disable={CheckGroup.checkGroup("guest",groupUser)===true?true:false}

          >
            {Tags.EnablePondFill === 1
              ? "Disable Pond Control"
              : "Enable Pond Control"}
          </Button>
        </div>

        <div className="row">
          <div
            className="col col-xl-7 col-md-7"
            style={{ minWidth: "330px", maxWidth: "330px" }}
          >
            <div
              className="d-block"
              style={{ width: "305px", height: "430px" }}
            >
              <div className="position-absolute water-Tank-Box  ms-5 ">

                <div className="wave" style={{background: `url(${wave}) repeat-x`}}></div>
                <div
                  className="w-100 water-Tank"
                  style={{ height: Tags.cLevel.Percentage + "%" }}></div>
                  <div className="position-absolute top-0 end-0" style={{zIndex:1000}}>
                    <AlarmIcon  width="25px" alarm="cLevel.Percentage" type="hihi" tooltip="Level % "/>
                    <AlarmIcon  width="25px" alarm="cLevel.Percentage" type="hi" tooltip="Level % "/>
                    <AlarmIcon  width="25px" alarm="cLevel.Percentage" type="lo" tooltip="Level % "/>
                    <AlarmIcon  width="25px" alarm="cLevel.Percentage" type="lolo" tooltip="Level % "/>

                  </div>


              </div>
              <div className="position-absolute ms-5 pumps-Images">
                <div className="row">
                  <div
                    className="pressure-Image p-0 position-relative"
                    style={{ marginBottom: "-5px" }}
                  >
                    <img
                      className="h-100 w-100 position-absolute"
                      src={pressureImage}
                      alt="Pressure"
                    />
                    <div className="ms-4 position-absolute mt-4">
                      <AlarmIcon  width="25px" alarm="PressurePID.Current" type="lo"/>
                      <AlarmIcon  width="25px" alarm="PressurePID.Current" type="lolo"/>
                      <AlarmIcon  width="25px" alarm="PressurePID.Current" type="hi"/>
                      <AlarmIcon  width="25px" alarm="PressurePID.Current" type="hihi"/>
                    </div>
                  </div>
                  <div className=" pump-horizontal-div mb-0 p-0">
                    <div
                      className="position-absolute d-flex mb-5 ms-2"
                      style={{ marginTop: "-35px", marginRight: "-10px" }}
                    >
                      <span className="span-Primary d-inline-flex px-2">
                        <h6>Pressure Trans.</h6>
                      </span>
                      <span className="bg-white d-inline-flex border px-2 text-info ">
                        <h6>
                          <b>{Tags.PressurePID.Current} PSIG</b>
                        </h6>
                      </span>
                    </div>
                    <div className="pump-horizontal-Pipe "></div>
                  </div>
                </div>
                <div className="row mx-2">
                  <div className="col px-1">
                    <div className="pump-vertical-Pipe"></div>
                    <PumpImage
                      cPump={Tags.cPump[0]}
                      width="55px"
                      className="ms-2"
                    />
                  </div>
                  <div className="col px-1">
                    <div className="pump-vertical-Pipe"></div>

                    <PumpImage
                      cPump={Tags.cPump[2]}
                      width="45px"
                      className="m-auto"
                      style={{marginLeft:"3px"}}
                    />
                  </div>
                  <div className="col px-1">
                    <div className="pump-vertical-Pipe"></div>
                    <PumpImage
                      cPump={Tags.cPump[1]}
                      width="55px"
                      className="mx-0"
                    />
                  </div>
                </div>
              </div>
              <div className="position-absolute  mt-5 ld-div">
                <div className="d-flex align-items-start flex-column bd-highlight mt-5 h-100">
                  <div className="mb-auto d-block  bd-highlight">
                    <div className="d-flex">
                      <div
                        className={
                          "rounded-circle ld-Circle " +
                          (Tags.cLevel.LSH === 1
                            ? "ld-Circle-Active"
                            : "ld-Circle-Inactive")
                        }
                      ></div>
                      <hr className="ld-hr" />
                    </div>
                    <span className="span-Primary d-inline-flex px-1">
                      {" "}
                      <h5 className="m-0">LSH</h5>
                    </span>
                  </div>

                  <div className="d-block bd-highlight mb-0">
                    <div className="d-flex">
                      <div
                        className={
                          "rounded-circle ld-Circle " +
                          (Tags.cLevel.LSL === 1
                            ? "ld-Circle-Active"
                            : "ld-Circle-Inactive")
                        }
                      ></div>
                      <hr className="ld-hr" />
                    </div>
                    <span className="span-Primary d-inline-flex px-1">
                      {" "}
                      <h5 className="m-0">LSL</h5>
                    </span>
                  </div>
                </div>
              </div>
              <div
                className="position-absolute mt-4 ld-div"
                style={{ marginLeft: "-22px" }}
              >
                <div className="d-flex justify-content-end flex-column mt-5 h-100">
                  <div className=" align-items-center" >
                    <PumpImage cPump={Tags.cPump[3]} width="62px"  />
                  </div>
                  <div className="mb-5">
                    <div className="d-flex align-items-center">
                      <div className="pond-cube"></div>
                      <div className={"pondfill-pipe"}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="d-flex  justify-content-between mb-2"
              style={{ marginLeft: "-22px" }}
            >
              <div>
                <span className="span-Primary d-inline-flex px-2 ">
                  <h6>Flow Trans.</h6>
                </span>
                <span className="bg-white d-inline-flex border px-2 text-info ">
                  <h6>
                    <b>0</b>{" "}
                  </h6>
                </span>
              </div>{" "}
              <div>
                <span className="span-Primary d-inline-flex px-2 ">
                  <h6>Level</h6>
                </span>
                <span className="bg-white d-inline-flex border px-2 text-info ">
                  <h6>
                    <b>{Tags.cLevel.Percentage} %</b>
                  </h6>
                </span>
              </div>
              <span className="bg-white d-inline-flex border px-2 text-info me-2">
                <h6>
                  <b>Step {Tags.PressurePID.Step}</b>
                </h6>
              </span>
            </div>
          </div>
          <div className="col col-xl-1 px-0 col-md-1 mx-0 mb-2">
            <Button
              type="button"
              className="btn btn-Light m-0 text-nowrap mx-0"
              style={{ height: "60px" }}
              onClick={disableAllPumpAction}
              disable={CheckGroup.checkGroup("guest",groupUser)===true?true:false}
            >
              Disable <br />
              All Pumps
            </Button>
            <div
                  className={
                    safety === 1 && watchdog !== 1
                      ? "safetyDiv align-content-center flex-wrap text-center blink my-2 "
                      : "collapsed"
                  }
                >
                  {" "}
                  <h5>Safety Mode ON</h5>
                </div>
                <div
                  className={
                    watchdog === 1
                      ? "safetyDiv align-content-center flex-wrap text-center blink my-2 "
                      : "collapsed"
                  }
                >
                  {" "}
                  <h6>Comunication Error !</h6>
                </div>
          </div>
        </div>
      </div>
    </div>
  );
}
