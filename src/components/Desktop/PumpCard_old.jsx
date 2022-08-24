import React, { useState } from "react";
import { useSelector } from "react-redux";
import Commands from "../../commands/index.js";
//import CheckGroup from "../../utils/CheckGroup";
import Button from "../SystemComponents/Button.jsx";
import Modal from "../SystemComponents/Modal";


export default function PumpCard(props) {
  const pidEnableNode = ["PressurePID", "enable"];
  const pidEnable = useSelector((state) => state.Tags.getIn(pidEnableNode));
  const pondEnableNode = ["EnablePondFill"];
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [newFrequency, setNewFrequency] = useState(0)

  const pondEnable = useSelector((state) => state.Tags.getIn(pondEnableNode));





    /*const groupUser = useSelector((state) => state.Auth.group);*/

  //const [NewFreq, SetNewFreq] = useState(props.cPump.setFrequency);
  const socket = useSelector((state) => state.SocketIO.socket);

  function setManualFreqPump() {
    if (newFrequency > 60 || newFrequency < 5) {
      setNewFrequency(0);
    } else {
      setIsOpenModal(false);

      Commands.SetManualFreqPump(props.index, newFrequency, socket);
    }

  }


  function actionManualPump(status) {
    if (status === 1)
      Commands.StopManualPump(props.index, socket);
    else
      Commands.StartManualPump(props.cPump, props.index, socket);

  }

  function openNewFrequency() {
    setIsOpenModal(true);
    setNewFrequency(0);
  }
  return (
    <div className="card p-2 d-flex  position-relative justify-content-start flex-row mb-2" style={{ "minWidth": "330px" }}>
      {props.cPump.IsPond !== 1 ?
        <svg className={"mx-3 " +(props.cPump.StatusOPC===2?"pump-gray blink-yellow":(props.cPump.StatusOPC===1?"pump-green":"pump-red"))} id="Layer_1" height="70px" width="10px" data-name="Layer 1"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10.4 89.09"><path d="M2.73,65.86c-.34,0-.42.29-.42.59s.08.63.47.61.42-.29.42-.58S3.13,65.84,2.73,65.86Z" transform="translate(-0.18 0.09)" /><path d="M2.79,64.51c.29,0,.4-.25.41-.51,0-.42,0-.84,0-1.27h0c0-.45,0-.9,0-1.36a.42.42,0,0,0-.46-.44.41.41,0,0,0-.39.42c0,.91,0,1.81,0,2.72A.41.41,0,0,0,2.79,64.51Z" transform="translate(-0.18 0.09)" /><path d="M10.07,55.68V45.13A.14.14,0,0,0,9.93,45H9.36V43.07h.48a.4.4,0,0,0,0-.8H9.36V41.7H10a.39.39,0,0,0,.4-.4.4.4,0,0,0-.4-.4h-.6V37.69H10a.4.4,0,1,0,0-.8h-.6V33.74c.55,0,1-.29,1-.65V29.7h0L9.22,27.75h.22c.55,0,1-.29,1-.65V23.71h0L9.2,21.58h.15c.55,0,1-.29,1-.65V17.54h0l-1.2-2.07h.3a1,1,0,0,0,1-1V9.31h0L8.83,5.08H9.4a1,1,0,0,0,1-1V.91a1,1,0,0,0-1-1h-8a1,1,0,0,0-1,1V4.08a1,1,0,0,0,1,1h.62L.46,9.31h0v5.16a1,1,0,0,0,1,1h.09L.37,17.54h0v3.39c0,.36.45.65,1,.65h.3L.46,23.71h0V27.1c0,.36.44.65,1,.65h0L.37,29.7h0v3.39c0,.36.45.65,1,.65h.09v3.15H1a.4.4,0,1,0,0,.8h.47V40.9H1a.4.4,0,0,0-.4.4.39.39,0,0,0,.4.4h.47v.57H.88a.4.4,0,1,0,0,.8h.59V45H.87a.15.15,0,0,0-.15.15V55.69a.57.57,0,0,0-.49.57v.34h0V57a.23.23,0,0,0,.23.23H.74V73.37H.42a.24.24,0,0,0-.23.25v.3s0,0,0,.08v.36A.61.61,0,0,0,.69,75V86.3a.15.15,0,0,0,.15.16h1v2.13a.42.42,0,0,0,.42.41h.61a.42.42,0,0,0,.41-.41V86.46H7.43v2.13a.42.42,0,0,0,.42.41h.6a.42.42,0,0,0,.42-.41V86.46h1A.16.16,0,0,0,10,86.3V75a.62.62,0,0,0,.49-.62V74h0s0,0,0,0v-.32a.24.24,0,0,0-.23-.25H10V57.18h.36a.22.22,0,0,0,.22-.23v-.27s0-.06,0-.08v-.34A.59.59,0,0,0,10.07,55.68ZM1.45,13.15V11a.46.46,0,0,1,.45-.46h.19a.46.46,0,0,1,.45.46v2.14a.45.45,0,0,1-.45.45H1.9A.45.45,0,0,1,1.45,13.15Zm-.09,6.91v-1.4c0-.17.21-.3.46-.3H2c.25,0,.46.13.46.3v1.4c0,.17-.21.3-.46.3H1.82C1.57,20.36,1.36,20.23,1.36,20.06Zm.09,6.17v-1.4c0-.17.2-.3.45-.3h.19c.25,0,.45.13.45.3v1.4c0,.17-.2.3-.45.3H1.9C1.65,26.53,1.45,26.4,1.45,26.23Zm-.09,6v-1.4c0-.17.21-.3.46-.3H2c.25,0,.46.13.46.3v1.4c0,.16-.21.3-.46.3H1.82C1.57,32.52,1.36,32.38,1.36,32.22Zm1.18,1.52H8.42v3.15H2.54Zm0,3.95H8.42V40.9H2.54Zm0,4H8.42v.57H2.54Zm0,1.37H8.42V45H2.54ZM6.26,65.58v6c0,1.33,0,1.35-1.37,1.35-.72,0-1.44,0-2.15,0s-.81-.22-.8-.84C2,70,2,68,2,65.92s0-4.19,0-6.28c0-.72.25-1,.94-.94a21.71,21.71,0,0,0,2.42,0c.79-.05,1,.38,1,1.06C6.25,61.7,6.26,63.64,6.26,65.58ZM1.68,77.91v-1a.43.43,0,0,1,.43-.43h0a.43.43,0,0,1,.43.43v1a.43.43,0,0,1-.43.43h0A.43.43,0,0,1,1.68,77.91Z" transform="translate(-0.18 0.09)" /></svg>
        :
        <svg className={(props.cPump.StatusOPC===2?"pump-gray blink-yellow":(props.cPump.StatusOPC===1?"pump-green":"pump-red"))} id="Layer_1" data-name="Layer 1" height="40px" xmlns="http://www.w3.org/2000/svg" fill={props.cPump.StatusOPC === 1 ? "#007400" : "#8a0000"} viewBox="0 0 81.09 79.67"><path d="M62.21,62.71a8.15,8.15,0,0,0-1.64-5.08l-3.31,2.59c1,2.91.43,5-2,7a13.92,13.92,0,0,1-3.49,2.12,27.36,27.36,0,0,1-14.62,1.49,18.39,18.39,0,0,1-8.36-3c-1.45-1-2.79-2.18-3.1-4a1,1,0,0,0-.74-.64c-1.23-.06-2.47,0-3.87,0V67a8.6,8.6,0,0,0,1.23,4.43,13.33,13.33,0,0,0,5.16,4.71,26.91,26.91,0,0,0,11.67,3.18c6.17.35,12.08-.45,17.4-3.59,3.66-2.16,5.9-5.13,5.66-9.38C62.14,65.12,62.21,63.91,62.21,62.71Z" transform="translate(-0.02 0.31)" /><path d="M80.35,56c-1.48,0-3,0-4.43,0-2.28,0-3.52-1.81-3.52-5V37.86c0-5.11,0-10.22,0-15.32s-2.68-9.44-6.27-9.93a58,58,0,0,0-6.33-.15c-.38,0-.48.24-.48.72,0,1.39,0,2.77,0,4.16,0,.69.23.81.65.81,1.64,0,3.28,0,4.91,0,2.31.07,3.46,1.77,3.46,5q0,14.13,0,28.28c0,4.93,2.43,9.32,5.81,10a46.29,46.29,0,0,0,6.94.38c0-1.75,0-3.26,0-4.76C81.12,56.27,81,56,80.35,56Z" transform="translate(-0.02 0.31)" /><path d="M24,54.56a18.41,18.41,0,0,0,8.25,5,30.41,30.41,0,0,0,14.27,1A22.68,22.68,0,0,0,58,55.79a9.62,9.62,0,0,0,3.84-6.44,54.62,54.62,0,0,0,0-8.09,8.35,8.35,0,0,0-2.56-5.14c0,2-.09,3.65,0,5.34C59.57,45.4,57.63,48,54.5,50a22.86,22.86,0,0,1-11.63,3.19c-5.16.13-10.12-.71-14.57-3.56-2.78-1.79-4.47-4.25-4.29-7.78.08-1.51,0-3,0-4.54,0-.28-.05-.55-.1-1.06A8.56,8.56,0,0,0,21.52,41a67.94,67.94,0,0,0-.21,7A9.59,9.59,0,0,0,24,54.56Z" transform="translate(-0.02 0.31)" /><path d="M29.5,13.25c-.64,0-1.28,0-2.07,0a4.74,4.74,0,0,0,.91,1.31,20.93,20.93,0,0,0,3.91,2.6c4.87,2.11,10,2.2,15.23,1.26a14.9,14.9,0,0,0,7.46-3.23,17.24,17.24,0,0,0,1.61-1.95c-.93,0-1.61,0-2.28,0-1.66-.11-2.55-1-2.55-2.44,0-1.17,0-2.34,0-3.51,0-.49-.2-.68-.73-.65s-1.14,0-1.7,0c-5.41,0-10.81,0-16.21,0-.78,0-1,.25-.94.88,0,1.07,0,2.14,0,3.2C32.14,12.26,31.25,13.13,29.5,13.25Z" transform="translate(-0.02 0.31)" /><path d="M26.55,11.66a5,5,0,0,0,1.54.07,1.31,1.31,0,0,0,1.36-1.54c-.06-1.88,0-3.76,0-5.63,0-.69.15-1,.92-1q11.3,0,22.61,0c.72,0,1,.24.95,1,0,1.88,0,3.76,0,5.63a1.32,1.32,0,0,0,1.31,1.58,5.62,5.62,0,0,0,1.16,0,1.33,1.33,0,0,0,1.37-1.53c-.06-2.4,0-4.81,0-7.21s-1-3.3-3.3-3.3c-4.26,0-8.52,0-12.77,0s-8.71,0-13.06,0a2.73,2.73,0,0,0-2.94,2.87c0,2.63,0,5.27,0,7.9A1.08,1.08,0,0,0,26.55,11.66Z" transform="translate(-0.02 0.31)" /><path d="M33.39,29.33a3.8,3.8,0,0,0-.07.53c0,6.09,0,12.19,0,18.28a1,1,0,0,0,.6.71c1.84.36,3.68.66,5.53.93,1.08.16,1.12.09,1.12-.91q0-8.76,0-17.53c0-.35,0-.7-.06-1Z" transform="translate(-0.02 0.31)" /><path d="M43.91,49.82c1.71-.28,3.41-.58,5.13-.82.74-.11,1-.45.94-1.18,0-4.46,0-8.93,0-13.39v-5.1c-2.23.28-4.3.56-6.38.8-.56.06-.53.41-.53.77,0,6.06,0,12.11,0,18.17C43.05,49.72,43.29,49.92,43.91,49.82Z" transform="translate(-0.02 0.31)" /><path d="M57.58,16.27C53.17,20.69,47.65,22,41.77,22s-11.46-1.3-16-5.62a12,12,0,0,1,0,2.48,3.63,3.63,0,0,0,1.21,3.46,13.79,13.79,0,0,0,2.46,2.06,20.25,20.25,0,0,0,8.72,2.89A25.47,25.47,0,0,0,52.74,25.1C56.86,23.08,58.34,20.39,57.58,16.27Z" transform="translate(-0.02 0.31)" /><path d="M30.88,27.56a13.45,13.45,0,0,1-4.56-3.07,3.56,3.56,0,0,1-.39-.72l-.27.23c0,.14,0,.27,0,.41,0,5.74,0,11.48,0,17.22a5.14,5.14,0,0,0,.73,2.4c1.13,1.92,3,2.89,5,3.77a3.37,3.37,0,0,0,.11-.4c0-6.36,0-12.73,0-19.1A1.09,1.09,0,0,0,30.88,27.56Z" transform="translate(-0.02 0.31)" /><path d="M51.89,48.38l.25.19c1.08-.66,2.21-1.25,3.23-2a5.63,5.63,0,0,0,2.37-5c-.08-5.11,0-10.23,0-15.35,0-.29,0-.58,0-1a3.36,3.36,0,0,0-.4.36,11.56,11.56,0,0,1-4.65,3.15,1,1,0,0,0-.75,1.16c0,4.73,0,9.46,0,14.18Z" transform="translate(-0.02 0.31)" /><path d="M40.72,66.71c-1.26,0-1.28-.06-1.28-1.38,0-3,0-3-3-3.09a1.74,1.74,0,0,0-.35.1V66c-.77-.27-1.35-.46-1.91-.68-2.39-.93-2.41-1-2.51-3.5,0-.31-.16-.78-.38-.88-1.35-.63-2.73-1.17-4.09-1.74-1.09,2,.22,5,1.94,6.28a14.81,14.81,0,0,0,2.37,1.54,21.51,21.51,0,0,0,8.95,2.13,23,23,0,0,0,11.29-2.11A8.78,8.78,0,0,0,56,63.35a4.54,4.54,0,0,0,.17-4.17,23.61,23.61,0,0,1-3.21,1.39c-1.19.31-1.43,1-1.33,2.07.05.49,0,1.22-.25,1.47a8.39,8.39,0,0,1-4.18,1.82V62.19l-3.24.39v1C43.89,66.82,43.89,66.82,40.72,66.71Z" transform="translate(-0.02 0.31)" /><path d="M0,53.65c0,2.15.06,4.09,0,6a2.94,2.94,0,0,0,1.68,3,10.06,10.06,0,0,0,10-.07c.6-.33,1.35-1.06,1.39-1.65.17-2.27.07-4.56.07-6.87C8.89,57.65,3.17,57.54,0,53.65Z" transform="translate(-0.02 0.31)" /><path d="M15,52.49h5.73c-.23-.72-.44-1.3-.6-1.89-.43-1.5-.42-1.5-2-1.5H13.19c.58,1.29,1,2.3,1.5,3.31C14.71,52.46,14.86,52.49,15,52.49Z" transform="translate(-0.02 0.31)" /><path d="M23.48,60.4a.85.85,0,0,0,.79-.9v-.1a3.17,3.17,0,0,0-.58-1.92c-.91-1-1.78-2.12-2.69-3.14a1.51,1.51,0,0,0-.9-.55c-1.61,0-3.22,0-4.82,0-.51,0-.73.19-.73.8,0,1.67,0,3.35,0,5,0,.68.26.84.79.82h8.15Z" transform="translate(-0.02 0.31)" /><path d="M2.59,53.29a9.39,9.39,0,0,0,8.24,0A2.23,2.23,0,0,0,12.24,51c0-3.14,0-6.29,0-9.43a2.31,2.31,0,0,0-1.43-2.3,9.36,9.36,0,0,0-8.32,0,2.21,2.21,0,0,0-1.36,2.24c.05,1.55,0,3.11,0,4.67s0,3.17,0,4.76A2.26,2.26,0,0,0,2.59,53.29ZM6.92,39.65c1.84,0,3.33.59,3.33,1.32s-1.49,1.32-3.33,1.32S3.6,41.7,3.6,41,5.09,39.65,6.92,39.65Z" transform="translate(-0.02 0.31)" /></svg>
      }
      <div>
        <h4 className="text-Dark f-400">
          {props.cPump.Label}
        </h4>
        <h6 className="text-Light p-0 m-0 f-400">
          Status: {props.cPump.StatusOPC === 1 ? "Running" : "Stopped"}
        </h6>
        <div className="d-flex flex-row">
          <h6 className="text-Light p-0 m-0 f-400" style={{ "width": "120px" }}>
            Amps: {props.cPump.Amps} A
          </h6>
          <h6 className="text-Light p-0 m-0 f-400">
            Freq: {props.cPump.Frequency} Hz
          </h6>
        </div>
      </div>
      {
        props.cPump.IsPond === 1 ?
        pondEnable !== 1 ?
            <div className="position-absolute end-0 me-2">
              <div className="d-flex flex-column" style={{ "width": "70px" }}>
                <Button className="btn btn-lg btn-principal btn-block m-0 p-0 px-1  mb-2" onClick={() => actionManualPump(props.cPump.Status)}>{props.cPump.Status === 1 ? "Stop" : "Start"}</Button>
                <Button className="btn btn-lg btn-principal btn-block m-0 p-0 px-1 " onClick={() => openNewFrequency()}>Set</Button>

              </div>
            </div>
            :
            <div className="position-absolute end-0 me-2">
              <h6 className="text-Light">
                Auto
              </h6>
            </div>
          :
          pidEnable !== 1 ?
            <div className="position-absolute end-0 me-2">
              <div className="d-flex flex-column" style={{ "width": "70px" }}>
                <Button className="btn btn-lg btn-principal btn-block m-0 p-0 px-1  mb-2" onClick={() => actionManualPump(props.cPump.Status)}>{props.cPump.Status === 1 ? "Stop" : "Start"}</Button>
                <Button className="btn btn-lg btn-principal btn-block m-0 p-0 px-1 " onClick={() => openNewFrequency()}>Set</Button>

              </div>


            </div>
            :
            <div className="position-absolute end-0 me-2">
              <h6 className="text-Light">
                Auto
              </h6>
            </div>

      }

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