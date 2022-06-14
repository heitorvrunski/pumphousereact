import React, { useState }  from "react";
import { useSelector } from "react-redux";
import CheckGroup from "../../utils/CheckGroup";
import { useHistory } from "react-router";
import Button from "../SystemComponents/Button";


// import TestCard from "./TestCard.jsx";

export default function Home() {
  const history = useHistory();
  const [collapsed, SetCollapsed] = useState(true);
    const groupUser = useSelector((state) => state.Auth.group);
    const totalAlarms = useSelector(
      (state) =>
        (state.Tags.loading === true ? 0 : state.Tags.get("TotalAlarmsActive")) ?? 0
    );


  //CheckGroup.checkGroup("admin",groupUser)===true
  return (
    <div className="justify-content-center" style={{"maxWidth":"450px"}}>
      <div className="card p-2 d-flex justify-content-between flex-row my-2" style={{"minHeight":"85px"}}>
        <svg className="mx-3" id="Layer_1" width="13px" data-name="Layer 1" fill="#5836e5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10.4 89.09"><path d="M2.73,65.86c-.34,0-.42.29-.42.59s.08.63.47.61.42-.29.42-.58S3.13,65.84,2.73,65.86Z" transform="translate(-0.18 0.09)"/><path d="M2.79,64.51c.29,0,.4-.25.41-.51,0-.42,0-.84,0-1.27h0c0-.45,0-.9,0-1.36a.42.42,0,0,0-.46-.44.41.41,0,0,0-.39.42c0,.91,0,1.81,0,2.72A.41.41,0,0,0,2.79,64.51Z" transform="translate(-0.18 0.09)"/><path d="M10.07,55.68V45.13A.14.14,0,0,0,9.93,45H9.36V43.07h.48a.4.4,0,0,0,0-.8H9.36V41.7H10a.39.39,0,0,0,.4-.4.4.4,0,0,0-.4-.4h-.6V37.69H10a.4.4,0,1,0,0-.8h-.6V33.74c.55,0,1-.29,1-.65V29.7h0L9.22,27.75h.22c.55,0,1-.29,1-.65V23.71h0L9.2,21.58h.15c.55,0,1-.29,1-.65V17.54h0l-1.2-2.07h.3a1,1,0,0,0,1-1V9.31h0L8.83,5.08H9.4a1,1,0,0,0,1-1V.91a1,1,0,0,0-1-1h-8a1,1,0,0,0-1,1V4.08a1,1,0,0,0,1,1h.62L.46,9.31h0v5.16a1,1,0,0,0,1,1h.09L.37,17.54h0v3.39c0,.36.45.65,1,.65h.3L.46,23.71h0V27.1c0,.36.44.65,1,.65h0L.37,29.7h0v3.39c0,.36.45.65,1,.65h.09v3.15H1a.4.4,0,1,0,0,.8h.47V40.9H1a.4.4,0,0,0-.4.4.39.39,0,0,0,.4.4h.47v.57H.88a.4.4,0,1,0,0,.8h.59V45H.87a.15.15,0,0,0-.15.15V55.69a.57.57,0,0,0-.49.57v.34h0V57a.23.23,0,0,0,.23.23H.74V73.37H.42a.24.24,0,0,0-.23.25v.3s0,0,0,.08v.36A.61.61,0,0,0,.69,75V86.3a.15.15,0,0,0,.15.16h1v2.13a.42.42,0,0,0,.42.41h.61a.42.42,0,0,0,.41-.41V86.46H7.43v2.13a.42.42,0,0,0,.42.41h.6a.42.42,0,0,0,.42-.41V86.46h1A.16.16,0,0,0,10,86.3V75a.62.62,0,0,0,.49-.62V74h0s0,0,0,0v-.32a.24.24,0,0,0-.23-.25H10V57.18h.36a.22.22,0,0,0,.22-.23v-.27s0-.06,0-.08v-.34A.59.59,0,0,0,10.07,55.68ZM1.45,13.15V11a.46.46,0,0,1,.45-.46h.19a.46.46,0,0,1,.45.46v2.14a.45.45,0,0,1-.45.45H1.9A.45.45,0,0,1,1.45,13.15Zm-.09,6.91v-1.4c0-.17.21-.3.46-.3H2c.25,0,.46.13.46.3v1.4c0,.17-.21.3-.46.3H1.82C1.57,20.36,1.36,20.23,1.36,20.06Zm.09,6.17v-1.4c0-.17.2-.3.45-.3h.19c.25,0,.45.13.45.3v1.4c0,.17-.2.3-.45.3H1.9C1.65,26.53,1.45,26.4,1.45,26.23Zm-.09,6v-1.4c0-.17.21-.3.46-.3H2c.25,0,.46.13.46.3v1.4c0,.16-.21.3-.46.3H1.82C1.57,32.52,1.36,32.38,1.36,32.22Zm1.18,1.52H8.42v3.15H2.54Zm0,3.95H8.42V40.9H2.54Zm0,4H8.42v.57H2.54Zm0,1.37H8.42V45H2.54ZM6.26,65.58v6c0,1.33,0,1.35-1.37,1.35-.72,0-1.44,0-2.15,0s-.81-.22-.8-.84C2,70,2,68,2,65.92s0-4.19,0-6.28c0-.72.25-1,.94-.94a21.71,21.71,0,0,0,2.42,0c.79-.05,1,.38,1,1.06C6.25,61.7,6.26,63.64,6.26,65.58ZM1.68,77.91v-1a.43.43,0,0,1,.43-.43h0a.43.43,0,0,1,.43.43v1a.43.43,0,0,1-.43.43h0A.43.43,0,0,1,1.68,77.91Z" transform="translate(-0.18 0.09)"/></svg>
        <div className="w-100 ms-1">
          <h4 className="text-Dark f-400 m-0 my-1">
            Control
          </h4>
          <h6 className="text-Light p-0 m-0 f-400">
            Activate PID control or manual control
          </h6>
        </div>
        <div className="align-self-end ms-2">
          <div className="d-flex flex-column me-2" style={{"width":"70px"}}>
              <Button className="btn btn-lg btn-principal btn-block m-0 p-0 px-1  mb-2" onClick={()=>history.push("/Control")}>Open</Button>
              
          </div>
        </div>
      </div>
      <div className="card p-2 d-flex justify-content-between flex-row my-2" style={{"minHeight":"85px"}}>
        <svg style={{"marginTop":"-10px"}} className="align-self-start" id="Layer_1" height="60px" width="60px" data-name="Layer 1" fill="#5836e5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path d="M43.85 46 37.15 39.3Q36.1 40.05 34.875 40.45Q33.65 40.85 32.35 40.85Q28.8 40.85 26.325 38.375Q23.85 35.9 23.85 32.35Q23.85 28.8 26.325 26.325Q28.8 23.85 32.35 23.85Q35.9 23.85 38.375 26.325Q40.85 28.8 40.85 32.35Q40.85 33.65 40.425 34.875Q40 36.1 39.3 37.2L46 43.85ZM32.35 37.85Q34.65 37.85 36.25 36.25Q37.85 34.65 37.85 32.35Q37.85 30.05 36.25 28.45Q34.65 26.85 32.35 26.85Q30.05 26.85 28.45 28.45Q26.85 30.05 26.85 32.35Q26.85 34.65 28.45 36.25Q30.05 37.85 32.35 37.85ZM4.45 35.55 2 33.75 11.4 18.75 17.4 25.75 25.35 12.85 30.8 20.95Q30 21.05 29.25 21.275Q28.5 21.5 27.75 21.8L25.5 18.35L17.85 30.8L11.8 23.75ZM36.05 21.45Q35.3 21.15 34.5 21.05Q33.7 20.95 32.85 20.85L43.55 4L46 5.8Z"/></svg>
        <div  className="w-100 ms-2">
          <h4 className="text-Dark f-400 m-0 my-1">
            Trending
          </h4>
          <h6 className="text-Light p-0 m-0 f-400">
            See data trend
          </h6>
        </div>
        <div className="align-self-end ms-2">
          <div className="d-flex flex-column me-2" style={{"width":"70px"}}>
              <Button className="btn btn-lg btn-principal btn-block m-0 p-0 px-1  mb-2" onClick={()=>history.push("/trend")}>Open</Button>
              
          </div>
        </div>
      </div>
      <div className="card p-2 d-flex justify-content-between flex-row my-2" style={{"minHeight":"85px"}}>
        <svg style={{"marginTop":"-10px"}} className="align-self-start" id="Layer_1" height="60px" width="60px" data-name="Layer 1" fill="#5836e5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path d="M24.05 24.45ZM2 42 24 4 46 42ZM22.7 30.6H25.7V19.4H22.7ZM24.2 36.15Q24.85 36.15 25.275 35.725Q25.7 35.3 25.7 34.65Q25.7 34 25.275 33.575Q24.85 33.15 24.2 33.15Q23.55 33.15 23.125 33.575Q22.7 34 22.7 34.65Q22.7 35.3 23.125 35.725Q23.55 36.15 24.2 36.15ZM7.2 39H40.8L24 10Z"/></svg>
        <div  className="w-100 ms-2">
          <h4 className="text-Dark f-400 m-0 my-1">
            Alarms
          </h4>
          <h6 className="text-Light p-0 m-0 f-400">
            See alarm table
          </h6>
        </div>
        <div className="align-self-end ms-2">
          <div className="d-flex flex-column me-2" style={{"width":"70px"}}>
              <Button className="btn btn-lg btn-principal btn-block m-0 p-0 px-1  mb-2" onClick={()=>history.push("/Alarms")}>Open</Button>
              
          </div>
        </div>
      </div>
      {CheckGroup.checkGroup("admin",groupUser)===true?
      <div>
        <div className="card p-2 d-flex justify-content-between flex-row my-2" style={{"minHeight":"85px"}}>
          <svg style={{"marginTop":"-10px"}} className="align-self-start" id="Layer_1" height="60px" width="60px" data-name="Layer 1" fill="#5836e5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path d="M19.4 44 18.4 37.7Q17.45 37.35 16.4 36.75Q15.35 36.15 14.55 35.5L8.65 38.2L4 30L9.4 26.05Q9.3 25.6 9.275 25.025Q9.25 24.45 9.25 24Q9.25 23.55 9.275 22.975Q9.3 22.4 9.4 21.95L4 18L8.65 9.8L14.55 12.5Q15.35 11.85 16.4 11.25Q17.45 10.65 18.4 10.35L19.4 4H28.6L29.6 10.3Q30.55 10.65 31.625 11.225Q32.7 11.8 33.45 12.5L39.35 9.8L44 18L38.6 21.85Q38.7 22.35 38.725 22.925Q38.75 23.5 38.75 24Q38.75 24.5 38.725 25.05Q38.7 25.6 38.6 26.1L44 30L39.35 38.2L33.45 35.5Q32.65 36.15 31.625 36.775Q30.6 37.4 29.6 37.7L28.6 44ZM24 30.5Q26.7 30.5 28.6 28.6Q30.5 26.7 30.5 24Q30.5 21.3 28.6 19.4Q26.7 17.5 24 17.5Q21.3 17.5 19.4 19.4Q17.5 21.3 17.5 24Q17.5 26.7 19.4 28.6Q21.3 30.5 24 30.5ZM24 27.5Q22.55 27.5 21.525 26.475Q20.5 25.45 20.5 24Q20.5 22.55 21.525 21.525Q22.55 20.5 24 20.5Q25.45 20.5 26.475 21.525Q27.5 22.55 27.5 24Q27.5 25.45 26.475 26.475Q25.45 27.5 24 27.5ZM24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24ZM21.8 41H26.2L26.9 35.4Q28.55 35 30.025 34.15Q31.5 33.3 32.7 32.1L38 34.4L40 30.8L35.3 27.35Q35.5 26.5 35.625 25.675Q35.75 24.85 35.75 24Q35.75 23.15 35.65 22.325Q35.55 21.5 35.3 20.65L40 17.2L38 13.6L32.7 15.9Q31.55 14.6 30.1 13.725Q28.65 12.85 26.9 12.6L26.2 7H21.8L21.1 12.6Q19.4 12.95 17.925 13.8Q16.45 14.65 15.3 15.9L10 13.6L8 17.2L12.7 20.65Q12.5 21.5 12.375 22.325Q12.25 23.15 12.25 24Q12.25 24.85 12.375 25.675Q12.5 26.5 12.7 27.35L8 30.8L10 34.4L15.3 32.1Q16.5 33.3 17.975 34.15Q19.45 35 21.1 35.4Z"/></svg>
          <div  className="w-100 ms-2">
            <h4 className="text-Dark f-400 m-0 my-1">
              Settings
            </h4>
            <h6 className="text-Light p-0 m-0 f-400">
              Configure Pump Setpoints and more
            </h6>
          </div>
          <div className="align-self-end ms-2">
            <div className="d-flex flex-column me-2" style={{"width":"70px"}}>
                <Button className="btn btn-lg btn-principal btn-block m-0 p-0 px-1  mb-2" onClick={()=>history.push("/Settings")}>Open</Button>
                
            </div>
          </div>
        </div>
        <div className="card p-2 d-flex justify-content-between flex-row my-2" style={{"minHeight":"85px"}}>
          <svg style={{"marginTop":"-10px"}} className="align-self-start" id="Layer_1" height="60px" width="60px" data-name="Layer 1" fill="#5836e5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path d="M24 31.5Q27.55 31.5 30.025 29.025Q32.5 26.55 32.5 23Q32.5 19.45 30.025 16.975Q27.55 14.5 24 14.5Q20.45 14.5 17.975 16.975Q15.5 19.45 15.5 23Q15.5 26.55 17.975 29.025Q20.45 31.5 24 31.5ZM24 28.6Q21.65 28.6 20.025 26.975Q18.4 25.35 18.4 23Q18.4 20.65 20.025 19.025Q21.65 17.4 24 17.4Q26.35 17.4 27.975 19.025Q29.6 20.65 29.6 23Q29.6 25.35 27.975 26.975Q26.35 28.6 24 28.6ZM24 38Q16.7 38 10.8 33.85Q4.9 29.7 2 23Q4.9 16.3 10.8 12.15Q16.7 8 24 8Q31.3 8 37.2 12.15Q43.1 16.3 46 23Q43.1 29.7 37.2 33.85Q31.3 38 24 38ZM24 23Q24 23 24 23Q24 23 24 23Q24 23 24 23Q24 23 24 23Q24 23 24 23Q24 23 24 23Q24 23 24 23Q24 23 24 23ZM24 35Q30.05 35 35.125 31.725Q40.2 28.45 42.85 23Q40.2 17.55 35.125 14.275Q30.05 11 24 11Q17.95 11 12.875 14.275Q7.8 17.55 5.1 23Q7.8 28.45 12.875 31.725Q17.95 35 24 35Z"/></svg>
          <div  className="w-100 ms-2">
            <h4 className="text-Dark f-400 m-0 my-1">
              Watch Window
            </h4>
            <h6 className="text-Light p-0 m-0 f-400">
              Get and Set Tag Values
            </h6>
          </div>
          <div className="align-self-end ms-2">
            <div className="d-flex flex-column me-2" style={{"width":"70px"}}>
                <Button className="btn btn-lg btn-principal btn-block m-0 p-0 px-1  mb-2" onClick={()=>history.push("/Watch")}>Open</Button>
                
            </div>
          </div>
        </div>
        <div className="card p-2 d-flex justify-content-between flex-row my-2" style={{"minHeight":"85px"}}>
          <svg style={{"marginTop":"-10px"}} className="align-self-start" id="Layer_1" height="60px" width="60px" data-name="Layer 1" fill="#5836e5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path d="M35.25 41.6 22.35 28.6Q21.2 29 20.05 29.25Q18.9 29.5 17.7 29.5Q12.85 29.5 9.45 26.125Q6.05 22.75 6.05 17.9Q6.05 16.35 6.45 14.875Q6.85 13.4 7.6 12.1L14.85 19.35L19.45 15.05L12 7.6Q13.3 6.85 14.75 6.425Q16.2 6 17.7 6Q22.65 6 26.125 9.475Q29.6 12.95 29.6 17.9Q29.6 19.1 29.35 20.25Q29.1 21.4 28.7 22.55L41.65 35.45Q42.2 36 42.2 36.775Q42.2 37.55 41.65 38.1L37.85 41.6Q37.3 42.15 36.55 42.15Q35.8 42.15 35.25 41.6ZM36.65 38.75 38.65 36.75 25 23.1Q25.8 22.05 26.2 20.625Q26.6 19.2 26.6 17.9Q26.6 14.15 23.825 11.55Q21.05 8.95 17.5 8.9L22.55 14.05Q23 14.5 23 15.15Q23 15.8 22.55 16.25L15.95 22.45Q15.5 22.9 14.85 22.9Q14.2 22.9 13.75 22.45L8.9 17.65Q9.05 21.5 11.625 24Q14.2 26.5 17.7 26.5Q18.95 26.5 20.35 26.1Q21.75 25.7 22.8 24.9ZM23.8 23.8Q23.8 23.8 23.8 23.8Q23.8 23.8 23.8 23.8Q23.8 23.8 23.8 23.8Q23.8 23.8 23.8 23.8Q23.8 23.8 23.8 23.8Q23.8 23.8 23.8 23.8Q23.8 23.8 23.8 23.8Q23.8 23.8 23.8 23.8Q23.8 23.8 23.8 23.8Q23.8 23.8 23.8 23.8Q23.8 23.8 23.8 23.8Q23.8 23.8 23.8 23.8Z"/></svg>
          <div  className="w-100 ms-2">
            <h4 className="text-Dark f-400 m-0 my-1">
              System
            </h4>
            <h6 className="text-Light p-0 m-0 f-400">
              Create New Users, see System Logs and More
            </h6>
          </div>
          <div className="align-self-end ms-2">
            <div className="d-flex flex-column me-2" style={{"width":"70px"}}>
                <Button className="btn btn-lg btn-principal btn-block m-0 p-0 px-1  mb-2" onClick={()=>history.push("/System")}>Open</Button>
                
            </div>
          </div>
        </div>
      </div>
      :null}
    </div>
  );
}