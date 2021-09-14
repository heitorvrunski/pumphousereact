import React from "react";
import pressureImage from "../Resource/Pressure_Transmitter.png";
import PumpImage from "./PumpImage";
import { useSelector } from "react-redux";
import {
  EnablePressurePID,
  DisablePressurePID,
  EnableDesablePondPID,
  DisableAllPump,
} from "../commands/index.js";

//PressurePID.enable
export default function MainCard() {
  const Tags = useSelector((state) => state.Tags.toJS());
  const socket = useSelector((state) => state.SocketIO.socket);

  function autoPressurePIDAction() {
    if (Tags.PressurePID.enable !== 1) {
      EnablePressurePID(Tags.cPump, socket);
    } else {
      DisablePressurePID(socket);
    }
  }

  function autoPondFillPIDAction() {
    EnableDesablePondPID(Tags.EnablePondFill, socket);
  }
  function disableAllPumpAction() {
    DisableAllPump(socket);
  }
  return (
    <div
      className="card col-xl-5 my-2 card-Principal"
      style={{ maxWidth: "500px" }}
    >
      <div className="container">
        <div className="row d-flex my-2 mx-2">
          <button
            type="button"
            className="col btn btn-principal mx-1 w-20 "
            onClick={autoPressurePIDAction}
          >
            {Tags.PressurePID.enable === 1
              ? "Disable Auto PID"
              : "Enable Auto PID"}
          </button>
          <button
            type="button"
            className="col btn btn-principal mx-1 w-20 "
            onClick={autoPondFillPIDAction}
          >
            {Tags.EnablePondFill === 1
              ? "Disable Pond Control"
              : "Enable Pond Control"}
          </button>
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
                <div
                  className="w-100 water-Tank mt-1"
                  style={{ height: Tags.cLevel.Percentage + "%" }}
                ></div>
              </div>
              <div className="position-absolute ms-5 pumps-Images">
                <div className="row">
                  <div
                    className="pressure-Image p-0"
                    style={{ marginBottom: "-5px" }}
                  >
                    <img
                      className="h-100 w-100"
                      src={pressureImage}
                      alt="Pressure"
                    />
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
                      width="64px"
                      className="mx-0"
                    />
                  </div>
                  <div className="col px-1">
                    <div className="pump-vertical-Pipe"></div>

                    <PumpImage
                      cPump={Tags.cPump[1]}
                      width="64px"
                      className="mx-0"
                    />
                  </div>
                  <div className="col px-1">
                    <div className="pump-vertical-Pipe"></div>
                    <PumpImage
                      cPump={Tags.cPump[2]}
                      width="64px"
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
                  <div className=" align-items-center">
                    <PumpImage cPump={Tags.cPump[3]} width="62px" />
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
                <h5>
                  <b>Step {Tags.PressurePID.Step}</b>
                </h5>
              </span>
            </div>
          </div>
          <div className="col col-xl-1 px-0 col-md-1 mx-0 mb-2">
            <button
              type="button"
              className="btn btn-principal m-0 text-nowrap mx-0"
              style={{ height: "60px" }}
              onClick={disableAllPumpAction}
            >
              Disable <br />
              All Pumps
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
