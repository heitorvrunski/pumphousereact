import { useState,useEffect,useRef } from "react";
import { useSelector,useDispatch } from "react-redux";
import { FindConfig } from "../../utils/SettingsUtils";
import update from "react-addons-update";
import Select from "react-select";
import Button from "./Button"
import Modal from "./Modal"
import Actions from "../../store/actions";
import "./SettingsConfig.scss"
import { ApiNode } from "../../middleware/thunk";
import CheckBox from "./CheckBox";

export default function SettingsConfig(props) {
    const dispatch = useDispatch();
    const inputSettings = useRef(null)
    const inputColumn = useRef(null)
    const [columns, setColumns] = useState([]);
    const [newSettingsOpen, setNewSettingsOpen] = useState(false);
    const [newParam, setNewParam] = useState("");
    const [newColumn, setNewColumn] = useState("");
    const [typeNewColumn, setTypeNewColumn] = useState(0);
    const [settings, setSettings] = useState([]);
    const settingsNode = useSelector((state) => state.SysConfig);
    const [selectedSettings,setSelectedSettings] = useState(0);
    const [browseNames,setBrowseNames] = useState([]);
    const [options,setOptions] = useState([]);
    const [isOpenModal,setIsOpenModal] = useState(false);
    const [isOpenDelete,setIsOpenDelete] = useState(false);
    const [isOpenNewColumn,setIsOpenNewColumn] = useState(false);
    const [typeDelete,setTypeDelete] = useState(0);
    const [typeOptions,setTypeOptions] = useState(0);
    const [deleteConfigIndex,setDeleteConfigIndex] = useState(0);
    const [nameSettings,setNameSettings] = useState("");
    const [deleteColumnIndex,setDeleteColumnIndex] = useState(0);
    const [reloadConfigs,setReloadConfigs] = useState(false);
    const [newConfig,setNewConfig] = useState({});
    const [sysConfigs,setSysConfigs] = useState([]);
    const tags = useSelector((state) => state.Tags);

    useEffect(() => {
        var keys = Object.keys(tags.toJS());
        var list2Fill = []
        keys.map((tag,i) => {
            rowTable(tag,i,tags.toJS(),0,list2Fill)
            return null
        })
        setBrowseNames(list2Fill)
        // eslint-disable-next-line
    },[tags] );


    useEffect(() => {
        if(typeof settingsNode[selectedSettings] === "undefined"){
            if(selectedSettings!==0)
                setSelectedSettings(0)
            return;
        }
        var settingsAux = [];

        const config = FindConfig(settingsNode, settingsNode[selectedSettings].name);

        if(config.value.length >0){
            setColumns(Object.keys(config.value[0]))
            config.value.forEach((element,index) => {
                var keys = Object.keys(element);
                var object = {}
                if(nameSettings!==settingsNode[selectedSettings].name||settings.length!==config.value.length){
                    keys.map((tag,i) => {
                        object[tag] = element[tag];
                        object[tag+"New"] = element[tag];
                        return null;
    
                    })
                }else{
                    keys.map((tag,i) => {
                        object[tag] = element[tag];
                        object[tag+"New"] = settings[index][tag+"New"];
                        return null;
    
                    })
                }
                
                settingsAux.push(object);
            });

            setTypeOptions(typeof settingsAux[0]?.browseName==="string"?0:1)
        }else{
            setColumns(["label"])
            setTypeOptions(1)
        }
        setNameSettings(settingsNode[selectedSettings].name)
        setNewConfig({})
        setSettings(settingsAux)
    // eslint-disable-next-line
    }, [settingsNode,selectedSettings,reloadConfigs]);


    useEffect(() => {
        var auxOptions = [];
        browseNames.forEach(element => {
            const label = typeOptions===0 ? element.join('_') :'["'+element.join('","')+'"]';
            const value = typeOptions===0?label:element;
            auxOptions.push({value:value,label:label})
        });
        setOptions(auxOptions);

        
    }, [typeOptions,browseNames]);


    useEffect(() => {
        try {
            var auxSysconfig = [];
            settingsNode.forEach(element => {
                auxSysconfig.push([element.name,element.value.length])
            });
            setSysConfigs(auxSysconfig)
        } catch (error) {
            
        }

    }, [settingsNode]);

    function rowTable(row,i,list,father,list2fill,downLevel){
        if(!father)
            father=[]
        if(downLevel===true&&i!==0)
            father.pop()  
        father.push(row)
        if( parseInt(father[1], 10)>=0&&  parseInt(father[2], 10)>0){
            father.splice(1,1)
        }

        if(typeof list[row] === 'object'){
            var listElements = [];
            Object.keys(list[row]).map((key,index)=>{
                listElements.push(rowTable(key,index,list[row],father,list2fill,true))
                return null;
            })
            return father
        }else{
            let nf = []
            for (let index = 0; index < father.length; index++) {
                nf.push(father[index])
                
            }
            list2fill.push(nf)
            return father
        }
        

        }
    const handleCanEditSettings = idx  =>{
        const properties = Object.keys(settings[idx]);
        for (let index = 0; index < properties.length; index++) {
            if(!properties[index].endsWith("New"))
                if(settings[idx][properties[index]]!==settings[idx][properties[index]+"New"]){
                
                    if(typeof settings[idx][properties[index]].push==="function"){
                        for(let i = 0 ; i<settings[idx][properties[index]].length;i++){
                            if(settings[idx][properties[index]][i]!==settings[idx][properties[index]+"New"][i])
                            return true
                        }
                    }else{
                        return true
                    }

                }
        }
        return false
    }

    const handleNewParam = event =>{
        if(newParam!==""){
            var exists = false;
            sysConfigs.forEach(element => {
                if(element[0]===newParam)
                    exists=true;
            });

            if(exists===true){
                dispatch(Actions.SetMessageError("The Param is already exists"));
                return;
            }
            
            dispatch(ApiNode.PostSysConfig({param:newParam,value:'[{"label":"","browseName":[]}]'}));
            setNewParam("")
            setIsOpenModal(false)

            
        }
    }
    const handleEditSettings = (index,canEdit) => event =>{
        if(canEdit===false)
            return;
            
        var continueV = true;
        const editElement = settings[index];
        const properties = Object.keys(settings[index]);
        properties.forEach(element => {
            if(!element.endsWith("New"))
                return;
            if(typeof editElement[element]==="undefined"){
                continueV = false;
                return;
            }
            if(element==="browseNameNew"){
                if(typeOptions===0){
                    if(editElement[element] === ""){
                        continueV = false;
                        return;

                    }
                }else{
                    if(typeof editElement[element].length==="undefined"){
                        continueV = false;
                        return;

                    }
                }
            }else{

                if(editElement[element] === ""){
                    continueV = false;
                    return;

                }
            }
        });
        if(continueV===true){
            const param = settingsNode[selectedSettings].name;
            const config = FindConfig(settingsNode, param);
            var array = [];
            config.value.forEach(element => {
                array.push(element)
            });
            columns.map(col=>{
                array[index][col] = editElement[col+"New"];
                return null;
            })
            const value = JSON.stringify(array);
            dispatch(ApiNode.PutSysConfig({param:param,value}))
        }
    }

    const handleSaveConfig  = event =>{
        var continueV = true;
        columns.forEach(element => {
            if(typeof newConfig[element]==="undefined"){
                continueV = false;
                return;
            }
            if(element==="browseName"){
                if(typeOptions===0){
                    if(newConfig[element] === ""){
                        continueV = false;
                        return;

                    }
                }else{
                    if(typeof newConfig[element].length==="undefined"){
                        continueV = false;
                        return;

                    }
                }
            }else{
                if(newConfig[element] === ""){
                    continueV = false;
                    return;

                }
            }
        });
        if(continueV===true){
            const param = settingsNode[selectedSettings].name;
            const config = FindConfig(settingsNode, param);
            config.value.push(newConfig)
            const value = JSON.stringify(config.value);
            dispatch(ApiNode.PutSysConfig({param:param,value}))
            setColumns([]);
            setReloadConfigs(!reloadConfigs)


        }
    }
    const handleDelete = event =>{
        if(typeDelete===0){
            const param = settingsNode[selectedSettings].name;
            dispatch(ApiNode.DeleteSysConfig({param:param}));
            setIsOpenDelete(false)
        }else if(typeDelete===1){
            const param = settingsNode[selectedSettings].name;
            const config = FindConfig(settingsNode, param);
            columns.splice(deleteColumnIndex,1)
            var array = [];
            config.value.forEach(element => {
                var row = {}
                columns.forEach(col=>{
                    row[col] = element[col]
                })
                array.push(row)
            });
            const value = JSON.stringify(array);
            dispatch(ApiNode.PutSysConfig({param:param,value}))
            setIsOpenDelete(false)

        }else if(typeDelete===2){
            const param = settingsNode[selectedSettings].name;
            const config = FindConfig(settingsNode, param);
            var arrayRow = [];
            config.value.forEach(element => {
                arrayRow.push(element)
            });
            arrayRow.splice(deleteConfigIndex,1);
            const value = JSON.stringify(arrayRow);
            dispatch(ApiNode.PutSysConfig({param:param,value}))
            setIsOpenDelete(false)

        }
    }

    const handleChangeSettings = index => event =>{
        setSettings([]);
        setColumns([]);
        setReloadConfigs(!reloadConfigs)

        setSelectedSettings(index)
    }

    const handleCreateNewColumn = event =>{
        if(newColumn===""){
            return;
        }
        if((columns.indexOf(newColumn) >= 0))
            return;
        columns.push(`${newColumn.replace(" ","")}`);
        const param = settingsNode[selectedSettings].name;
        const config = FindConfig(settingsNode, param);
        var array = [];
        config.value.forEach(element => {
            var row = {}
            columns.forEach(col=>{
                row[col] = element[col]??(newColumn==="browseName"?(typeNewColumn===0?"":[]):"")
            })
            array.push(row)
        });
        const value = JSON.stringify(array);
        dispatch(ApiNode.PutSysConfig({param:param,value}))
        if(newColumn==="browseName")
            setTypeOptions(typeNewColumn)
        setIsOpenNewColumn(false)
        setNewColumn("")
    }
    return (
        <>
        <div className="row justify-content-center d-flex p-2 h-100">
            <div className="d-flex p-0 m-2 flex-column mb-2  w-auto " style={{height:"fit-content"}}>
            <h5>Settings</h5>

            <ul className="list-group card">
                {sysConfigs.map((element,index)=>(
                <li key={index+"Setting"} className={"list-group-item d-flex justify-content-between align-items-center "+(selectedSettings===index?"selected-row":"")} onClick={handleChangeSettings(index)} style={{cursor:"pointer"}}>
                    {element[0]}
                    <span className="badge bg-primary rounded-pill ms-2">{element[1]}</span>
                </li>
                ))}

                
            </ul>
            <div className="w-100 d-flex justify-content-center my-2 icon-principal ">
                <svg xmlns="http://www.w3.org/2000/svg" className="btn-Icon" height="24px" viewBox="0 0 24 24" width="24px" onClick={()=>{setIsOpenModal(true);inputSettings.current.value=""}}>
                    <path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                </svg>

            </div>
            <hr></hr>

            </div>

            <div className="d-flex  p-0 m-2 flex-column mb-2 w-auto ">
                <h5>Configs</h5>

                <div className="d-flex flex-row justify-content-between">
                    <Button className="btn  btn-principal my-2 " style={{alignSelf:"flex-start",minHeight:"40px"}} onClick={()=>setNewSettingsOpen(!newSettingsOpen)}>
                        { newSettingsOpen===true?"Close":"New Config" }
                    </Button>
                    <Button className="btn  btn-danger my-2 " style={{alignSelf:"flex-start",minHeight:"40px"}} onClick={()=>{
                        setTypeDelete(0)
                        setIsOpenDelete(true)
                        }}>
                        Delete Setting
                    </Button>
                </div>

                <div className={"transition "+(newSettingsOpen===true?"":"off")}                
                >
                    <div className={"card  d-flex p-2 h-auto "}>
                        <div className="mb-2 d-flex flex-wrap">
                            {columns.map((col,idx)=>{
                                if(col==="browseName"){
                                    return (
                                        <div key={idx+"newConfig"} className="d-flex flex-column">
                                            <p className="p-0 m-0">{col}:</p>
                                            <div style={{minWidth:"220px"}} >
                                            <Select
                                                className="basic-single me-2"
                                                classNamePrefix="select"
                                                isClearable={true}
                                                isSearchable={true}
                                                options={options}

                                                onChange={(e)=>{
                                                    newConfig.browseName = e.value;
                                                    setNewConfig(newConfig)}}

                                            />
                                            </div>
                                            
                                        </div>
                                    )
                                }else{
                                    return (
                                        <div key={idx+"newConfig"} className="d-flex flex-column">
                                            <p className="p-0 m-0">{col}:</p>
                                            <input 
                                            type="text" 
                                            className="me-2"
                                            defaultValue={""} 
                                            onChange={(e)=>{
                                                newConfig[col] = e.target.value;

                                                setNewConfig(newConfig)}}
                                            ></input>

                                        </div>
                                    )

                                }
                            })}
                        </div>
                    </div>
                    <Button className="btn  btn-principal my-2 " style={{alignSelf:"flex-start"}} onClick={handleSaveConfig}>Save</Button>
                </div>
                <h5>List</h5>

                <div className="d-flex card overflow-settings" >

                    <table className="table overflow-settings m-0 p-0" >
                        <thead>
                            <tr>
                                {columns.map((element,idx)=>(
                                    <th key={idx+"Header"}>
                                        <div className="d-flex flex-row justify-content-between" style={{borderRight:"1px solid rgba(0,0,0,0.4)"}}>
                                        <h6>{element}</h6>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000" className="btn-Icon icon-danger" 
                                        onClick={()=>{
                                            setDeleteColumnIndex(idx)
                                            setTypeDelete(1)
                                            setIsOpenDelete(true)
                                            }}>
                                            <path d="M0 0h24v24H0V0z" fill="none"/>
                                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z"/></svg>
                                        </div>
                                        
                                        
                                    </th>
                                ))}
                                    <th>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="btn-Icon" height="24px" viewBox="0 0 24 24" width="24px" onClick={()=>{setIsOpenNewColumn(true);inputColumn.current.value=""}}>
                                        <path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                                    </svg>
                                    </th>
                            </tr>
                        </thead>
                        <tbody>
                        {settings.map((element,index)=>(
                            <tr key={index+"row"}>
                                {columns.map((cell,i)=>{
                                    if(!cell.endsWith("New"))
                                    return(
                                    
                                    <td key={index+"c"+i} style={{minWidth:"220px"}}>
                                        {cell==="browseName"?
                                        <Select
                                        className="basic-single"
                                        classNamePrefix="select"
                                        defaultValue={{ 
                                            value: typeof element.browseName!=="undefined" ? (typeof element.browseName === "string"? element.browseName : '["'+element.browseName.join('","')+'"]'):"",
                                            label: typeof element.browseName!=="undefined" ? (typeof element.browseName === "string"? element.browseName : '["'+element.browseName.join('","')+'"]'):"",
                                        }}
                                        isClearable={false}
                                        isSearchable={true}
                                        options={options}
                                        menuPortalTarget={document.body}
                                        styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                        onChange={(e)=>{setSettings(update(settings,{[index]:{ browseNameNew: {$set:e.value}}}))}}

                                        />
                                        :
                                        <input type="text" defaultValue={element[cell]} onChange={(e)=>{setSettings(update(settings,{[index]:{ [cell+"New"]: {$set:e.target.value}}}))}}></input>
                                        }
                                    </td>

                                    )
                                    else return null
                                })}
                                <td>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        height="24px"
                                        viewBox="0 0 24 24"
                                        width="24px"
                                        className={ (handleCanEditSettings(index)===true?"":"deactivate-Icon")+
                                        " btn-Icon icon-ok me-2"
                                        }
                                        onClick={handleEditSettings(index,handleCanEditSettings(index))}
                                    >
                                        <path d="M0 0h24v24H0V0z" fill="none" />
                                        <path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm2 16H5V5h11.17L19 7.83V19zm-7-7c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zM6 6h9v4H6z" />
                                    </svg>
                                    
                                </td>
                                <td>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        height="24px"
                                        viewBox="0 0 24 24"
                                        width="24px"
                                        className="btn-Icon icon-danger"
                                        onClick={()=>{
                                            setDeleteConfigIndex(index)
                                            setTypeDelete(2)
                                            setIsOpenDelete(true)
                                        }}
                                    >
                                        <path d="M0 0h24v24H0V0z" fill="none" />
                                        <path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z" />
                                    </svg>
                                </td>

                            </tr>
                        ))}
                            
                        </tbody>
                        
                    </table>
                </div>

            </div>
        </div>
        <Modal isOpen={isOpenModal} handleOnClose={()=>{setIsOpenModal(false)}}>
            <div className="d-flex flex-row my-2">
                <h5>Name:</h5>
                <input ref={inputSettings} type="text" className="mx-2" placeholder="setting" onChange={(e)=>setNewParam(e.target.value)}></input>
            </div>
            <div className="d-flex flex-row justify-content-end">
                <Button className="btn  btn-principal me-2" onClick={()=>{setIsOpenModal(false)}}> Cancel</Button>
                <Button className="btn  btn-principal" onClick={handleNewParam}> Create</Button>

            </div>
        </Modal>
        <Modal isOpen={isOpenDelete} handleOnClose={()=>{setIsOpenDelete(false)}}>
            <div className="d-flex flex-row my-2">
                <h5>Are you sure? This action cannot be undone</h5>
            </div>
            <div className="d-flex flex-row justify-content-end">
                <Button className="btn  btn-principal me-2" onClick={()=>{setIsOpenDelete(false)}}> Cancel</Button>
                <Button className="btn  btn-principal" onClick={handleDelete}> Delete</Button>

            </div>
        </Modal>

        <Modal isOpen={isOpenNewColumn} handleOnClose={()=>{setIsOpenNewColumn(false)}}>
            <div className="d-flex flex-column my-2">
                <div className="d-flex flex-row my-2">
                    <h5>Name:</h5>
                    <input ref={inputColumn}  type="text" className="mx-2" placeholder="column" onChange={(e)=>setNewColumn(e.target.value)}></input>
                </div>    
                <div className={"d-flex flex-row my-2 "+(newColumn==="browseName"?"":"collapsed")}>
                    <CheckBox
                        label="string"
                        componentState={0}
                        state={typeNewColumn}
                        eventChange={()=>setTypeNewColumn(0)}
                      />
                      <CheckBox
                        label="array"
                        componentState={1}
                        state={typeNewColumn}
                        eventChange={()=>setTypeNewColumn(1)}
                      />
                </div>         
            </div>
            <div className="d-flex flex-row justify-content-end">
                <Button className="btn  btn-principal me-2" onClick={()=>{setIsOpenNewColumn(false)}}> Cancel</Button>
                <Button className="btn  btn-principal" onClick={handleCreateNewColumn}> Create</Button>

            </div>
        </Modal>
        </>
    );
  }
  