import { useEffect, useState,useRef } from "react";
import { ApiNode } from "../../middleware/thunk";
import CheckBox from "./CheckBox.jsx";
import DatePicker from "react-datepicker";
import moment from "moment";
import "./Logs.scss";
import Button from "./Button";

import "react-datepicker/dist/react-datepicker.css";


export default function Logger() {
    const [textConsole,setTextConsole] = useState([])
    const [typePeriod,setTypePeriod] = useState(1)
    const [dateLog,setDateLog] = useState(new Date())
    const [typePeriodNew,setTypePeriodNew] = useState(1)
    const [dateLogNew,setDateLogNew] = useState(new Date())
    const [tabIndex,setTabIndex] = useState(0)
    const [tail,setTail] = useState(100)
    const [tailNew,setTailNew] = useState(tail)
    const [typeRange,settypeRange] = useState(0)
    const [reload,setReload] = useState(false)
    const [insideDocker,setInsideDocker] = useState(false)
    


    useEffect( ()=>{
        fetchData();
        async function fetchData() {
            if(tabIndex!==0){
                if(typeRange===0){
                    const logs = await ApiNode.GetLogs(tail,tabIndex);
                    if(typeof logs.logs !== "undefined"){
                        setTextConsole(fillTextConsole(logs.logs));
                    }
                }else if(typeRange){
                    const logs = await ApiNode.GetLogsRange(typePeriod,tabIndex,dateLog);
        
                    if(typeof logs.logs !== "undefined"){
                        setTextConsole(fillTextConsole(logs.logs));
                    }
                }
            }else{
                const logs = await ApiNode.GetLogsFile(tail);
                if(typeof logs.logs !== "undefined"){
                    setTextConsole(fillTextConsole(logs.logs));
                }
            }
            
        }
        // eslint-disable-next-line
    }, [tabIndex,tail,typeRange,dateLog,typePeriod,reload]);

    useEffect( ()=>{
        checkIsDocker();
        async function checkIsDocker() {
            setInsideDocker(await ApiNode.CheckDocker());
        }
    }, []);


    const changeMode = (modeComponent) => {
        settypeRange(modeComponent);
      };

    const changeRangeMode = (modeComponent) => {
        setTypePeriodNew(modeComponent);
    };
    const changeReload = (modeComponent) => {
        setReload(!reload);
    };

    const donloadLog = () => {
        var logDoc = '';
        for(const line of textConsole){
            var lineaux = ''
            for (const word of line){
                lineaux += word.text;
            }
            logDoc +=lineaux+"\n"
        }
        const element = document.createElement("a");
        const file = new Blob([logDoc], {type: 'text/plain'});
        element.href = URL.createObjectURL(file);
        var fileName = "Logs_"+(tabIndex===0?"LogFile":(tabIndex===1?"Front-End":(tabIndex===2?"Back-End":"Services")))+moment().format("YYYY[-]MM[-]SS[T_]HH[-]mm[-]ss")+".txt"
        element.download = fileName;
        document.body.appendChild(element);
        element.click();

    };

    const fillTextConsole = (logs) =>{
        var allText = [];
            for(var i = 0;i<logs.length;i++){
                var element = logs[i];
                if(element!==null){
                // eslint-disable-next-line
                var rx = new RegExp("([\[(])32m[\\d\\D]*([\[(])39m", "g");
                // eslint-disable-next-line
                var rxError = new RegExp("([\[(])31m[\\d\\D]*([\[(])39m", "g");
                var line = [];
                if(tabIndex!==0){
                    line.push({
                        text:element.substring(0,19)+" ",
                        color:"#828489"
                    });
                    element = element.substring(31);
                }
                
                if((element.split("\x1b[32m")).length !==1){

                    line.push({
                        text:element.split("\x1b[32m")[0]??"",
                        color:"white"

                    });
                    line.push({
                        text:element.replace("\x1b","").replace("\x1B","").match(rx)?.toString().replace("[32m","").replace("[39m","")??"",
                        color:"#61cf7f"
                    });
                    line.push({
                        text:element.split("\x1b[39m")[1]??"",
                        color:"white"

                    });
                }else if((element.split("\x1b[31m")).length !==1){
                    line.push({
                        text:element.split("\x1b[31m")[0]??"",
                        color:"white"

                    });
                    line.push({
                        text:element.replace("\x1b","").replace("\x1B","").match(rxError)?.toString().replace("[31m","").replace("[39m","")??"",
                        color:"red"
                    });
                    line.push({
                        text:element.split("\x1b[39m")[1]??"",
                        color:"white"

                    });
                }else
                {
                    line.push(
                        {
                            text:element,
                            color:"white"

                        }
                    )
                }
                allText.push(line);
                }

            }
        return allText;

    }
    const handleTabOnChange = (index)=> (event) => {
        setTabIndex(index)
        if(index ===0){
            settypeRange(0);
        }
    };

    const handleSubmitChanges = (event) => {
        if(tailNew!==tail){
            setTail(tailNew)
        }
    };
    const handleSubmitRangeChanges = (event) => {
        setDateLog(dateLogNew)
        setTypePeriod(typePeriodNew)
    };
    const handleTailChanges = (event) => {
        if(event.target.value>0)
            setTailNew(event.target.value)
    };
    const AlwaysScrollToBottom = () => {
        const elementRef = useRef();
        useEffect(() => elementRef.current.scrollIntoView());
        return <div ref={elementRef} />;
    };

  return (
    <div className="justify-content-center py-2 d-flex flex-column overflow-hidden h-100">
        <div className="card h-auto m-2">
            <div className="card-body">
            <div className={"row align-items-center"}>
            <div className="col-auto">
                <h5>Logs</h5>
            </div>
            <div className="col-auto" >
                <p  style={{display:"inline"}}>Back-End {insideDocker===true?"":<span style={{color:"red",fontWeight:"bold"}} >NOT</span>} running on container</p>
            </div>
        </div>
        <div className="row g-3 align-items-center">
            <div className="col-auto">
            <CheckBox
                    label="Per Lines"
                    componentState={0}
                    state={typeRange}
                    eventChange={changeMode}
                    />
            </div>
            <div className={"col-auto " + (tabIndex===0?"collapsed":"")}>
                <CheckBox
                    label="By Date"
                    componentState={1}
                    state={typeRange}
                    eventChange={changeMode}
                    />
            </div>
            

        </div>

        <div className={"row g-3 align-items-center " + (typeRange!==0?"collapsed":"")}>
            <div className="col-auto">
                <label htmlFor="inputTail" className="col-form-label">Set the num. of last lines: </label>
            </div>
            <div className="col-auto">
                <input type="number" style={{width:"80px"}} id="inputTail" className="form-control" defaultValue={tail} onChange={handleTailChanges}></input>

            </div>
            <div className="col-auto">
                <Button type="submit" className="btn btn-principal" onClick={handleSubmitChanges}>Change</Button>

            </div>
            <div className="col-auto">
            <Button type="submit" className="btn btn-principal" onClick={changeReload}>Reload</Button>

            </div>

        </div>
        <div className={"row g-3 align-items-center " + (typeRange!==1?"collapsed":"")}>
            <div className="col-auto">
                <label htmlFor="inputTail" className="col-form-label">DateTime </label>
            </div>
            <div className="col-auto">
                <DatePicker
                    selected={dateLogNew}
                    showTimeSelect
                    dateFormat="MM/dd/yy HH:mm"
                    onChange={(date) => setDateLogNew(date)}
                />                
            </div>
            <div className="col-auto">
                <CheckBox
                    label="Since"
                    componentState={1}
                    state={typePeriodNew}
                    eventChange={changeRangeMode}
                    />               
            </div>
            <div className="col-auto">
                <CheckBox
                    label="Until"
                    componentState={2}
                    state={typePeriodNew}
                    eventChange={changeRangeMode}
                    />              
            </div>
            <div className="col-auto">
            <Button type="submit" className="btn btn-principal" onClick={handleSubmitRangeChanges}>Change</Button>

            </div>
            <div className="col-auto">
            <Button type="submit" className="btn btn-principal" onClick={changeReload}>Change</Button>

            </div>

        </div>
            </div>


        </div>
      <div className="d-flex overflow-hidden flex-column p-0 flex-grow-1">

        <ul className="nav nav-tabs d-flex flex-nowrap m-2 mb-0">
            <li className="nav-item float-start">
                <button className={"text-nowrap nav-link " + (tabIndex===0?"active":"")} onClick={handleTabOnChange(0)}>LogFile</button>
            </li>
            <li className="nav-item float-start">
                <button className={"text-nowrap nav-link " + (tabIndex===1?"active":"")} onClick={handleTabOnChange(1)}>Front End</button>
            </li>
            <li className="nav-item float-start">
                <button className={"text-nowrap nav-link " + (tabIndex===2?"active":"")} onClick={handleTabOnChange(2)}>Back End</button>
            </li>
            <li className="nav-item float-start">
                <button className={"text-nowrap nav-link " + (tabIndex===3?"active":"")} onClick={handleTabOnChange(3)}>Services</button>
            </li>
        </ul>
        
            
        <div className="p-2 bg-white position-relative div-code h-100 m-2 mt-0">
            <div className="position-absolute top-0 end-0 me-4 mt-2" style={{cursor:"pointer"}} onClick={donloadLog} >
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#eeeeee">
                        <path d="M0 0h24v24H0z" fill="none"/><path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/>
                </svg>
                        
            </div>
        
            <div className="font-code overflow-auto p-1 w-100 h-100 code" >
                    {
                        textConsole.length === 0 ?"":
                        textConsole.map((line,index)=>{
                            return  (<p style={{margin:0,whiteSpace:"nowrap"}}> <span style={{color:"#445386",width:"38px",display:"inline-block"}}> {index+1} </span> {line.map(word=>(<span style={{color:word.color}}>{word.text}</span>))}</p>) 
                        })
                    }
                        <AlwaysScrollToBottom />

            </div>
        

        </div>
    
        </div>
    </div>
  );
}
