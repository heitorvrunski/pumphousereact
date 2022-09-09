import React, { useState } from "react";
import { useSelector } from "react-redux";
import Commands from "../../commands/index.js";
//import CheckGroup from "../../utils/CheckGroup";
import Button from "../SystemComponents/Button.jsx";
import Modal from "../SystemComponents/Modal";


export default function PumpCard(props) {
  const pidEnableNode = ["PressurePID", "enable"];//
  const pumpMaxFreqNode = ["PressurePID", "PumpMaxFreq"];//
  const pumpMaxFreq = useSelector((state) => state.Tags.getIn(pumpMaxFreqNode));

  const pidEnable = useSelector((state) => state.Tags.getIn(pidEnableNode));
  //const pondEnableNode = ["EnablePondFill"];
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [newFrequency, setNewFrequency] = useState(0)

  //const pondEnable = useSelector((state) => state.Tags.getIn(pondEnableNode));





  /*const groupUser = useSelector((state) => state.Auth.group);*/

  //const [NewFreq, SetNewFreq] = useState(props.cPump.setFrequency);
  const socket = useSelector((state) => state.SocketIO.socket);
  /*
  const handleChange = (event) => {
    const newFrenqHandle = event.target.validity.valid
      ? event.target.value
      : NewFreq;
    SetNewFreq(newFrenqHandle);
  };*/
  function setManualFreqPump() {
    if (newFrequency > 60 || newFrequency < 5) {
      setNewFrequency(0);
    } else {
      setIsOpenModal(false);

      Commands.SetManualFreqPump(props.index, newFrequency, socket);
    }

  }


  function actionManualPump(status) {
    if (status !== 0)
      Commands.StopManualPump(props.index, socket);
    else
      Commands.StartManualPump(props.cPump, props.index, socket);

  }

  function openNewFrequency() {
    setIsOpenModal(true);
    setNewFrequency(0);
  }
  return (
    <div className="mb-2">
      <h5 className="text-light f-400">
        {props.cPump.Label}
      </h5>
      <div className="d-flex flex-row">
        <div className="d-flex flex-column me-2">
          <div className="card p-2 d-flex  position-relative justify-content-start flex-row " style={{ "Height":"-webkit-fill-available","minHeight":"85px" }}>
            {props.cPump.BooleanPump === 1 ?
              <svg height="25px" className={"mx-2 " + (props.cPump.StatusOPC === 2 ? "pump-gray blink-yellow" : (props.cPump.StatusOPC === 1 ? "pump-green" : "pump-red"))} data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80.97 106.54"><defs></defs><path className="cls-1" d="M30.17,34.64V7.58H6.93V63.85h.2A35.78,35.78,0,0,1,30.17,34.64Z" /><rect className="cls-1" x="0.04" y="0.07" width="38.42" height="5.91" /><path className="cls-1" d="M44.73,34.11a36.19,36.19,0,1,0,36.2,36.18A36.19,36.19,0,0,0,44.73,34.11Zm8.72,14.31a23.83,23.83,0,0,1,8.35,5.51c.27.27.53.54.78.82a24,24,0,0,1-2.76,8.31l-.24.24a16.76,16.76,0,0,0-3-4.14A16,16,0,0,0,53.89,57c-.13-2.9.12-5.71-.45-8.52Zm4.21,21.89a13,13,0,1,1-13-13A13,13,0,0,1,57.66,70.31ZM35.25,48.68A24.05,24.05,0,0,1,45,46.61q.57,0,1.14,0a24.08,24.08,0,0,1,4,7.8v.34a16.77,16.77,0,0,0-8.51-.42c-2.16-1.94-4-4.09-6.39-5.66Zm-7.06,4.59.82-.78a24.14,24.14,0,0,1,8.33,2.72l.24.24a16.55,16.55,0,0,0-4.13,3,17.06,17.06,0,0,0-2.2,2.71c-2.89.15-5.7-.09-8.51.5h0A23.92,23.92,0,0,1,28.19,53.27ZM23,79.69A23.88,23.88,0,0,1,21,69.9q0-.57,0-1.14a24.21,24.21,0,0,1,7.81-4h.34a16.68,16.68,0,0,0-.43,8.52c-1.95,2.15-4.1,4-5.67,6.37ZM36,92.24a24,24,0,0,1-8.38-5.48l-.78-.82a24.25,24.25,0,0,1,2.73-8.32l.24-.24a16.8,16.8,0,0,0,3,4.13,16.46,16.46,0,0,0,2.7,2.2c.15,2.89-.1,5.71.49,8.52ZM54,92a23.76,23.76,0,0,1-9.8,2c-.38,0-.76,0-1.13,0a24,24,0,0,1-3.95-7.82v-.34a16.23,16.23,0,0,0,5,.8,15.9,15.9,0,0,0,3.47-.35c2.14,2,4,4.11,6.36,5.69Zm7.08-4.56c-.27.27-.55.53-.83.78A24.09,24.09,0,0,1,52,85.44l-.24-.24a16.76,16.76,0,0,0,4.14-3,17.52,17.52,0,0,0,2.21-2.7c2.89-.14,5.7.11,8.51-.48v0A23.81,23.81,0,0,1,61.09,87.41ZM68.34,72a24.34,24.34,0,0,1-7.83,3.93h-.34a16.77,16.77,0,0,0,.47-8.51c2-2.15,4.11-4,5.69-6.36h0a24,24,0,0,1,2,9.81C68.37,71.2,68.36,71.58,68.34,72Z" /></svg>

              // <svg className={"mx-3 " +(props.cPump.StatusOPC===2?"pump-gray blink-yellow":(props.cPump.StatusOPC===1?"pump-green":"pump-red"))} id="Layer_1" height="65px" width="10px" data-name="Layer 1"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10.4 89.09"><path d="M2.73,65.86c-.34,0-.42.29-.42.59s.08.63.47.61.42-.29.42-.58S3.13,65.84,2.73,65.86Z" transform="translate(-0.18 0.09)" /><path d="M2.79,64.51c.29,0,.4-.25.41-.51,0-.42,0-.84,0-1.27h0c0-.45,0-.9,0-1.36a.42.42,0,0,0-.46-.44.41.41,0,0,0-.39.42c0,.91,0,1.81,0,2.72A.41.41,0,0,0,2.79,64.51Z" transform="translate(-0.18 0.09)" /><path d="M10.07,55.68V45.13A.14.14,0,0,0,9.93,45H9.36V43.07h.48a.4.4,0,0,0,0-.8H9.36V41.7H10a.39.39,0,0,0,.4-.4.4.4,0,0,0-.4-.4h-.6V37.69H10a.4.4,0,1,0,0-.8h-.6V33.74c.55,0,1-.29,1-.65V29.7h0L9.22,27.75h.22c.55,0,1-.29,1-.65V23.71h0L9.2,21.58h.15c.55,0,1-.29,1-.65V17.54h0l-1.2-2.07h.3a1,1,0,0,0,1-1V9.31h0L8.83,5.08H9.4a1,1,0,0,0,1-1V.91a1,1,0,0,0-1-1h-8a1,1,0,0,0-1,1V4.08a1,1,0,0,0,1,1h.62L.46,9.31h0v5.16a1,1,0,0,0,1,1h.09L.37,17.54h0v3.39c0,.36.45.65,1,.65h.3L.46,23.71h0V27.1c0,.36.44.65,1,.65h0L.37,29.7h0v3.39c0,.36.45.65,1,.65h.09v3.15H1a.4.4,0,1,0,0,.8h.47V40.9H1a.4.4,0,0,0-.4.4.39.39,0,0,0,.4.4h.47v.57H.88a.4.4,0,1,0,0,.8h.59V45H.87a.15.15,0,0,0-.15.15V55.69a.57.57,0,0,0-.49.57v.34h0V57a.23.23,0,0,0,.23.23H.74V73.37H.42a.24.24,0,0,0-.23.25v.3s0,0,0,.08v.36A.61.61,0,0,0,.69,75V86.3a.15.15,0,0,0,.15.16h1v2.13a.42.42,0,0,0,.42.41h.61a.42.42,0,0,0,.41-.41V86.46H7.43v2.13a.42.42,0,0,0,.42.41h.6a.42.42,0,0,0,.42-.41V86.46h1A.16.16,0,0,0,10,86.3V75a.62.62,0,0,0,.49-.62V74h0s0,0,0,0v-.32a.24.24,0,0,0-.23-.25H10V57.18h.36a.22.22,0,0,0,.22-.23v-.27s0-.06,0-.08v-.34A.59.59,0,0,0,10.07,55.68ZM1.45,13.15V11a.46.46,0,0,1,.45-.46h.19a.46.46,0,0,1,.45.46v2.14a.45.45,0,0,1-.45.45H1.9A.45.45,0,0,1,1.45,13.15Zm-.09,6.91v-1.4c0-.17.21-.3.46-.3H2c.25,0,.46.13.46.3v1.4c0,.17-.21.3-.46.3H1.82C1.57,20.36,1.36,20.23,1.36,20.06Zm.09,6.17v-1.4c0-.17.2-.3.45-.3h.19c.25,0,.45.13.45.3v1.4c0,.17-.2.3-.45.3H1.9C1.65,26.53,1.45,26.4,1.45,26.23Zm-.09,6v-1.4c0-.17.21-.3.46-.3H2c.25,0,.46.13.46.3v1.4c0,.16-.21.3-.46.3H1.82C1.57,32.52,1.36,32.38,1.36,32.22Zm1.18,1.52H8.42v3.15H2.54Zm0,3.95H8.42V40.9H2.54Zm0,4H8.42v.57H2.54Zm0,1.37H8.42V45H2.54ZM6.26,65.58v6c0,1.33,0,1.35-1.37,1.35-.72,0-1.44,0-2.15,0s-.81-.22-.8-.84C2,70,2,68,2,65.92s0-4.19,0-6.28c0-.72.25-1,.94-.94a21.71,21.71,0,0,0,2.42,0c.79-.05,1,.38,1,1.06C6.25,61.7,6.26,63.64,6.26,65.58ZM1.68,77.91v-1a.43.43,0,0,1,.43-.43h0a.43.43,0,0,1,.43.43v1a.43.43,0,0,1-.43.43h0A.43.43,0,0,1,1.68,77.91Z" transform="translate(-0.18 0.09)" /></svg>
              :
              <svg height="40px" className={"mx-2 " + (props.cPump.StatusOPC === 2 ? "pump-gray blink-yellow" : (props.cPump.StatusOPC === 1 ? "pump-green" : "pump-red"))} data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80.97 106.54"><defs></defs><path className="cls-1" d="M30.17,34.64V7.58H6.93V63.85h.2A35.78,35.78,0,0,1,30.17,34.64Z" /><rect className="cls-1" x="0.04" y="0.07" width="38.42" height="5.91" /><path className="cls-1" d="M44.73,34.11a36.19,36.19,0,1,0,36.2,36.18A36.19,36.19,0,0,0,44.73,34.11Zm8.72,14.31a23.83,23.83,0,0,1,8.35,5.51c.27.27.53.54.78.82a24,24,0,0,1-2.76,8.31l-.24.24a16.76,16.76,0,0,0-3-4.14A16,16,0,0,0,53.89,57c-.13-2.9.12-5.71-.45-8.52Zm4.21,21.89a13,13,0,1,1-13-13A13,13,0,0,1,57.66,70.31ZM35.25,48.68A24.05,24.05,0,0,1,45,46.61q.57,0,1.14,0a24.08,24.08,0,0,1,4,7.8v.34a16.77,16.77,0,0,0-8.51-.42c-2.16-1.94-4-4.09-6.39-5.66Zm-7.06,4.59.82-.78a24.14,24.14,0,0,1,8.33,2.72l.24.24a16.55,16.55,0,0,0-4.13,3,17.06,17.06,0,0,0-2.2,2.71c-2.89.15-5.7-.09-8.51.5h0A23.92,23.92,0,0,1,28.19,53.27ZM23,79.69A23.88,23.88,0,0,1,21,69.9q0-.57,0-1.14a24.21,24.21,0,0,1,7.81-4h.34a16.68,16.68,0,0,0-.43,8.52c-1.95,2.15-4.1,4-5.67,6.37ZM36,92.24a24,24,0,0,1-8.38-5.48l-.78-.82a24.25,24.25,0,0,1,2.73-8.32l.24-.24a16.8,16.8,0,0,0,3,4.13,16.46,16.46,0,0,0,2.7,2.2c.15,2.89-.1,5.71.49,8.52ZM54,92a23.76,23.76,0,0,1-9.8,2c-.38,0-.76,0-1.13,0a24,24,0,0,1-3.95-7.82v-.34a16.23,16.23,0,0,0,5,.8,15.9,15.9,0,0,0,3.47-.35c2.14,2,4,4.11,6.36,5.69Zm7.08-4.56c-.27.27-.55.53-.83.78A24.09,24.09,0,0,1,52,85.44l-.24-.24a16.76,16.76,0,0,0,4.14-3,17.52,17.52,0,0,0,2.21-2.7c2.89-.14,5.7.11,8.51-.48v0A23.81,23.81,0,0,1,61.09,87.41ZM68.34,72a24.34,24.34,0,0,1-7.83,3.93h-.34a16.77,16.77,0,0,0,.47-8.51c2-2.15,4.11-4,5.69-6.36h0a24,24,0,0,1,2,9.81C68.37,71.2,68.36,71.58,68.34,72Z" /></svg>
            }
            <div>
              <h5 className="text-Dark f-400 m-0">
                Status
              </h5>
              <h6 className="text-Light p-0 m-0 f-400">
                {props.cPump.StatusOPC !== 0 ? "Running" : "Stopped"}
              </h6>


            </div>

          </div>
          {props.cPump.BooleanPump === 0 ?

            <div className="card p-2 d-flex  position-relative justify-content-start flex-row mt-2" style={{ "height": "72px" }}>
              <div className="w-100 text-center">
                <h5 className="text-Dark f-400 ">
                  Amps
                </h5>
                <h5 className="text-Light p-0 m-0 f-400">
                  {props.cPump.Amps}
                </h5>
              </div>

            </div>
            :
            null
          }
        </div>
        {props.cPump.BooleanPump === 0 ?

          <div className="card p-2 ps-0 d-flex  position-relative justify-content-start flex-row me-2 " style={{ "maxWidth": "300px", "minWidth": "220px" }}>

            <div className="w-100 text-center h-100" >
              <h5 className="text-Mid f-400 ">
                Frequency
              </h5>
              <div className="d-flex justify-content-center">
                <div className="position-relative container-relative" >
                  <div className="container">
                    <div className="gauge-a"></div>
                    <div className="gauge-b"></div>
                    <div className="gauge-c" style={{ "transform": "rotate(" + ((props.cPump.FrequencyStatus * 180) / (pumpMaxFreq)) + "deg)" }}></div>
                    <div className="gauge-data">
                      <h5 id="percent">{props.cPump.FrequencyStatus} hz</h5>
                    </div>
                  </div>
                  <div className="position-absolute gauge-label">
                    <div className="d-flex justify-content-between me-2">
                      <h6>0 hz</h6>
                      <h6>{props.cPump.IsPond !== 1 ? (pumpMaxFreq + "") : "60"} hz</h6>

                    </div>
                  </div>
                </div>
              </div>

            </div>


          </div>
          :
          null
        }

        <div className="card p-2  d-flex  justify-content-start " style={{ "minWidth": "150px" }}>
          <div className="w-100 text-center h-100" >
            <h5 className="text-Mid f-400 ">
              Commands
            </h5>
              {props.cPump.BooleanPump !== 1 ?
                <div className="d-flex flex-column" >
                  <Button disable={pidEnable === 1} className="btn btn-lg btn-principal btn-block m-0 p-0 px-1  mb-2" onClick={() => actionManualPump(props.cPump.Status)}>{props.cPump.StatusOPC !== 0 ? "Stop" : "Start"}</Button>                
                  <Button className="btn btn-lg btn-principal btn-block m-0 p-0 px-1 " onClick={() => openNewFrequency()}>Set</Button>
                </div>

                :
                <div className="d-flex flex-column" >
                  <Button disable={pidEnable === 1} className="btn btn-lg btn-principal btn-block m-0 p-0 px-1  mb-2" onClick={() => actionManualPump(props.cPump.Status)}>{props.cPump.Command !== 0 ? "Stop" : "Start"}</Button>                
                </div>
              }

          </div>
        </div>
      </div>
      <Modal header={"Act All Alarm "} isOpen={isOpenModal} handleOnClose={() => { setIsOpenModal(false) }}>
        <div className="d-flex flex-column my-2 justify-content-start text-Light">
          <h5 >Set New Frequency</h5>
          <input
            type="number"
            className="form-control form-Dark"
            required=""
            autoFocus=""
            value={newFrequency}
            onChange={e => setNewFrequency(e.target.value)}
          ></input>
        </div>
        <div className="d-flex flex-row justify-content-end">
          <Button className="btn  btn-principal me-2" onClick={() => { setIsOpenModal(false) }}> Cancel</Button>
          <Button className="btn  btn-principal" onClick={() => { setManualFreqPump() }}> Set</Button>
        </div>
      </Modal>
    </div>

  )
}