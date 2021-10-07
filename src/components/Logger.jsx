import { useEffect, useState,useRef } from "react";
import { ApiNode } from "../middleware/thunk";
import CheckBox from "./TrendComponents/CheckBox.jsx";
import DatePicker from "react-datepicker";
import moment from "moment";

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



    useEffect( ()=>{
        fetchData();
        async function fetchData() {
            if(typeRange===0){
                const logs = await ApiNode.GetLogs(tail,tabIndex+1);
                if(typeof logs.logs !== "undefined"){
                    setTextConsole(fillTextConsole(logs.logs));
                }
            }else if(typeRange){
                const logs = await ApiNode.GetLogsRange(typePeriod,tabIndex+1,dateLog);
    
                if(typeof logs.logs !== "undefined"){
                    setTextConsole(fillTextConsole(logs.logs));
                }
            }
        }
    }, [tabIndex,tail,typeRange,dateLog,typePeriod,reload]);


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
        console.log(line)

            var lineaux = ''
            for (const word of line){
                lineaux += word.text;
            }
            logDoc +=lineaux+"\n"
        }
        // const data = new Blob([logDoc], { type: 'text/plain' })
        // const downloadLink = window.URL.createObjectURL(data)
        // window.location.href = downloadLink;
        console.log(logDoc)
        const element = document.createElement("a");
        const file = new Blob([logDoc], {type: 'text/plain'});
        element.href = URL.createObjectURL(file);
        var fileName = "Log-"+(tabIndex===0?"Front_End":(tabIndex===1?"Back_End":"Services"))+moment().format("YYYY[-]MM[-]SS[T_]HH[-]mm[-]ss")+".txt"
        element.download = fileName;
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();

    };

    const fillTextConsole = (logs) =>{
        var allText = [];
            for(var i = 0;i<logs.length;i++){
                var element = logs[i];
                // eslint-disable-next-line
                var rx = new RegExp("([\[(])32m[\\d\\D]*([\[(])39m", "g");
                // eslint-disable-next-line
                var rxError = new RegExp("([\[(])31m[\\d\\D]*([\[(])39m", "g");
                var line = [];
                line.push({
                    text:element.substring(0,19)+" ",
                    color:"#828489"
                });
                element = element.substring(31);
                if((element.split("\x1b[32m")).length !==1){

                    line.push({
                        text:element.split("\x1b[32m")[0],
                        color:"white"

                    });
                    line.push({
                        text:element.replace("\x1b","").replace("\x1B","").match(rx).toString().replace("[32m","").replace("[39m",""),
                        color:"#61cf7f"
                    });
                    line.push({
                        text:element.split("\x1b[39m")[1],
                        color:"white"

                    });
                }else if((element.split("\x1b[31m")).length !==1){
                    line.push({
                        text:element.split("\x1b[31m")[0],
                        color:"white"

                    });
                    line.push({
                        text:element.replace("\x1b","").replace("\x1B","").match(rxError).toString().replace("[31m","").replace("[39m",""),
                        color:"red"
                    });
                    line.push({
                        text:element.split("\x1b[39m")[1],
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
        return allText;

    }
    const handleTabOnChange = (index)=> (event) => {
        setTabIndex(index)
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
    <div className="row justify-content-center mx-1 h-100">
      <div className="card d-flex h-100 overflow-hidden">
        <h5 className="m-2">Logger</h5>
        <div className="row g-3 align-items-center">
            <div className="col-auto">
            <CheckBox
                    label="Per Lines"
                    componentState={0}
                    state={typeRange}
                    eventChange={changeMode}
                    />
            </div>
            <div className="col-auto">
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
                <button type="submit" className="btn btn-principal" onClick={handleSubmitChanges}>Change</button>

            </div>
            <div className="col-auto">
                <button type="submit" className="btn btn-principal" onClick={changeReload}>Reload</button>
            </div>

        </div>
        <div className={"row g-3 align-items-center " + (typeRange!==1?"collapsed":"")}>
            <div className="col-auto">
                <label htmlFor="inputTail" className="col-form-label">Date|Time </label>
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
                <button type="submit" className="btn btn-principal" onClick={handleSubmitRangeChanges}>Change</button>
            </div>
            <div className="col-auto">
                <button type="submit" className="btn btn-principal" onClick={changeReload}>Reload</button>
            </div>

        </div>

        <ul className="nav nav-tabs">
            <li className="nav-item">
                <button className={"nav-link " + (tabIndex===0?"active":"")} onClick={handleTabOnChange(0)}>Front End</button>
            </li>
            <li className="nav-item">
                <button className={"nav-link " + (tabIndex===1?"active":"")} onClick={handleTabOnChange(1)}>Back End</button>
            </li>
            <li className="nav-item">
                <button className={"nav-link " + (tabIndex===2?"active":"")} onClick={handleTabOnChange(2)}>Services</button>
            </li>
        </ul>
        
            
            <div className="p-2 bg-white  d-flex position-relative flex-grow-1" style={{overflow:"inherit",backgroundColor:"#282a36",color:"white"}}>
                <div className="position-absolute top-0 end-0 me-4 mt-2" style={{cursor:"pointer"}} onClick={donloadLog} >
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#eeeeee">
                            <path d="M0 0h24v24H0z" fill="none"/><path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/>
                            </svg>
                        
            </div>
            
                <div className="font-code overflow-auto p-1 w-100" style={{backgroundColor:"#282a36",color:"white",}}>
                        {
                            textConsole.length === 0 ?"":
                            textConsole.map((line,index)=>{
                                return  (<p style={{margin:0,whiteSpace:"nowrap"}}> <span style={{color:"#445386",width:"32px",display:"inline-block"}}> {index+1} </span><span style={{color:"#445386"}}>|</span> {line.map(word=>(<span style={{color:word.color}}>{word.text}</span>))}</p>) 
                            })
                        }
                            <AlwaysScrollToBottom />

                </div>
            

            </div>
       
        </div>
    </div>
  );
}