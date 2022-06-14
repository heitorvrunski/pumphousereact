import React,{useState,useEffect,useRef,useMemo} from "react";

import { useSelector } from "react-redux";
import { ApiNode } from "../middleware/thunk.js";
import { DataGrid,GridToolbarExport,GridToolbarDensitySelector  } from '@mui/x-data-grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import DatePicker from "react-datepicker";
import Modal from "./SystemComponents/Modal.jsx";
import Button from "./SystemComponents/Button.jsx"
import Commands from "../commands/index.js";
import CheckGroup from "../utils/CheckGroup.js";
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';

import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';

function escapeRegExp(value) {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
  }
  

function QuickSearchToolbar(props) {
  
    return (
      <div className={"d-flex justify-content-between m-1"}>
        <div>
          <GridToolbarDensitySelector />
          <GridToolbarExport />

        </div>
        <TextField
          variant="standard"
          value={props.value}
          onChange={props.onChange}
          placeholder="Search…"
          className={""}
          InputProps={{
            startAdornment: <SearchIcon fontSize="small" />,
            endAdornment: (
              <IconButton
                title="Clear"
                aria-label="Clear"
                size="small"
                style={{ visibility: props.value ? 'visible' : 'hidden' }}
                onClick={props.clearSearch}
              >
                <ClearIcon fontSize="small" />
              </IconButton>
            ),
          }}
        />
      </div>
    );
  }
  
  QuickSearchToolbar.propTypes = {
    clearSearch: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
  };



const columns = [
    {
      field: 'status',
      headerName: 'Status',
      renderCell: (params) => (

            <div style={{height:"100%",alignItems:"center",display:"flex",lineHeight:"normal"
        }}>

                <div style={{backgroundColor:params.value==="Active"?"#ba2d3d":(params.value==="Ack"?"#636500":(params.value==="Norm"?"#006265":"white")),
                    color:"white",
                    height:"25px",
                    padding:"5px",
                    paddingLeft:"15px",
                    paddingRight:"15px",


                    borderRadius: "15px 15px 15px 15px"

                    }}>
                    <p>
                        {params.value}
                    </p>
                </div>
            </div>
          
      ),
    },
    { field: 'activeTime', headerName: 'Active Time', width: 160,type: 'dateTime' },
    { field: 'ackTime', headerName: 'Ack Time', width: 160, type: 'date'},
    { field: 'normTime', headerName: 'Norm Time', width: 160,type: 'date' },
    { field: 'type', headerName: 'Type', width: 60 },
    { field: 'message', headerName: 'Tag', width: 200 },
    { field: 'group', headerName: 'Group', width: 130 },
    { field: 'setPoint', headerName: 'Set Point', width: 90 },
    { field: 'value', headerName: 'Value', width: 90 },
    { field: 'comment', headerName: 'Comment', width: 200 },
    { field: 'user', headerName: 'User', width: 130 },




  ];


export default function Alarm() {
    const theme = useMemo(
        () =>
          createTheme({
            palette: {
              mode: 'dark' ,
            },
          }),
        [],
      );

    const groupUser = useSelector((state) => state.Auth.group);

    const [alarmData, setAlarmData] = useState([]) 
    const [tabIndex, setTabIndex] = useState(0)
    const [reload, setReload] = useState(false) 
    const [isOpenModal, setIsOpenModal] = useState(false) 
    const [isOpenModalActAll, setIsOpenModalActAll] = useState(false) 

    const [tagAct, setTagAct] = useState({}) 
    const [commentTagAct, setCommentTagAct] = useState("") 
    const inputSettings = useRef(null)
    const socket = useSelector((state) => state.SocketIO.socket);
    const [dateFrom, setDateFrom] = useState(new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate())) 
    const [dateTo, setDateTo] = useState(new Date(new Date(dateFrom).setDate(dateFrom.getDate()+1)))
    const verifyAlarm = useSelector((state) => state.Tags.get("VerifyAlarm"));
    const tagAlarmList = useSelector((state) => state.Tags.get("ActAlarm"));//AckAllAlarms
    const actAllAlarms = useSelector((state) => state.Tags.get("AckAllAlarms"));
    const [rows, setRows] = useState(alarmData);


    const [searchText, setSearchText] = useState('');
  
    const requestSearch = (searchValue) => {
      setSearchText(searchValue);
      const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
      const filteredRows = alarmData.filter((row) => {
        return Object.keys(row).some((field) => {
          return searchRegex.test(row[field].toString());
        });
      });
      setRows(filteredRows);
    };


    useEffect(() => {
        fetchData();
        async function fetchData() {
            if(tabIndex===0){
                const alarms = await ApiNode.GetAlarmOnline();
                if(typeof alarms !== "undefined"){
                    setAlarmData(FetchAlarmData(alarms));
                }else{
                    setAlarmData([])
                }
            }else{
                const alarms = await ApiNode.GetAlarmRange(dateFrom,dateTo);
                if(typeof alarms !== "undefined"){
                    setAlarmData(FetchAlarmData(alarms));
                }else{
                    setAlarmData([])
                }
            }
            
        }
        // eslint-disable-next-line
    }, [verifyAlarm,tabIndex,dateFrom,dateTo,reload])

    useEffect(() => {
        setRows(alarmData);
      }, [alarmData]);
    function FetchAlarmData(alarmData){
        var data = [];

        alarmData.forEach((element,index) => {
            const result = element.result.split("@");
            const row=
            {
                id:index,
                status : result[0]==="1"?"Active":(result[0]==="2"?"Ack":(result[0]==="3"?"Norm":"Ok"))                ,//result[0],
                activeTime : FormatDate(result[1]),
                ackTime : result[2],
                normTime : result[3],
                value : result[4],
                user : result[5],
                type : result[6].split("|")[1],
                tag : element.Al_Tag,
                message : element.Al_Message,

                setPoint : result[7],
                group : result[8].split("|")[0],
                comment : element.Al_User_Comment,


            }
            data.push(row);
            
        });
        return data;
    }
    function FormatDate(dateS){
        const dateSplit = dateS.split("/")
        const time = dateSplit[2].split(" ")[1].split(":");
        const date = new Date(dateSplit[2].split(" ")[0],dateSplit[1],dateSplit[0],time[0],time[1],time[2]);
        return date
    }

    const onclickRow = (params,event) => {
        if(tabIndex===0&&(params.row.status==="Active"||params.row.status==="Norm")&&CheckGroup.checkGroup("guest",groupUser)===false){
            setTagAct(params.row)
            inputSettings.current.value = ""
            setCommentTagAct("")
            setIsOpenModal(true)
        }
    };
    const HandleActRow = () => {
        Commands.ActAlarm(tagAct,commentTagAct,tagAlarmList,socket)
        setIsOpenModal(false)
        setCommentTagAct("")

    };

    const HandleActAll = () => {
        Commands.ActAllAlarm(actAllAlarms,socket)
        setIsOpenModalActAll(false)

    };

    const styleButton = (compIndex) =>{
        if(tabIndex===compIndex)
            return {opacity:"1"}
        else
            return {opacity:"0.3"}
    }
    return (
        <>
        <div className="h-100 d-flex flex-column mt-1 ">
            <div className="d-flex flex-row mx-2">
                <Button className="btn  btn-principal me-2 " style={styleButton(0)} onClick={()=>{setTabIndex(0)}}> Online</Button>
                <Button className="btn  btn-principal " style={styleButton(1)} onClick={()=>{setTabIndex(1)}}> History</Button>
            </div>
            <div className={"row mx-2 d-flex justify-content-start text-Light " + (tabIndex!==1?"collapsed":"")}>
                <div className="col-12 col-sm-3 d-flex align-items-center" style={{minWidth:"230px"}}>
                    <label htmlFor="inputTail" className="col-form-label me-2">From </label>
                    <DatePicker
                        selected={dateFrom}
                        showTimeSelect
                        dateFormat="MM/dd/yy HH:mm"
                        onChange={(date) => setDateFrom(date)}
                    />  
                </div>
                <div className="col-12 col-sm-4  d-flex align-items-center" style={{minWidth:"355px"}}>
                    <label htmlFor="inputTail" className="col-form-label me-2 ">To </label>
                    <DatePicker
                        selected={dateTo}
                        showTimeSelect
                        dateFormat="MM/dd/yy HH:mm"
                        onChange={(date) => setDateTo(date)}
                    />    
                    <Button type="submit" className="btn btn-principal" style={{width:"155px"}}
                onClick={()=>setReload(!reload)}
                >Reload </Button>           
                </div>
            
                
            

        
        
            </div>
            <div className={" mt-2 ms-2 align-items-center " + (tabIndex!==0?"collapsed":"")}>
                <Button className="btn btn-principal " onClick={()=>{setIsOpenModalActAll(true)}} style={{width:"157px"}}             disable={CheckGroup.checkGroup("guest",groupUser)}> Act All</Button>
            </div>

            <div style={{height:"-webkit-fill-available"}}>
            <div className="card m-2 h-100" >
                <div style={{ height: "100%", width: '100%' }}>
                <ThemeProvider theme={theme}>
                    <DataGrid 
                        className="border-0"
                        rows={rows} 
                        columns={columns} 
                        onCellClick={onclickRow}
                        disableSelectionOnClick
                        components={{ Toolbar: QuickSearchToolbar }}
                        componentsProps={{
                            toolbar: {
                              value: searchText,
                              onChange: (event) => requestSearch(event.target.value),
                              clearSearch: () => requestSearch(''),
                            },
                          }}
                          sx={{
                            border: 0

                          }}
                        />
                        </ThemeProvider>
                </div>
            </div>
            </div>
            
            
        </div>
        <Modal header={"Act Alarm "+tagAct.type} isOpen={isOpenModal} handleOnClose={()=>{setIsOpenModal(false)}}>
            <div className="d-flex flex-row my-2 justify-content-center">
                <h5>{tagAct.message}</h5>
            </div>
            <div className="d-flex flex-row my-2">
                <h6>Act <br/> comment</h6>
                <textarea ref={inputSettings} type="text" className="mx-2" placeholder="Comment Act" style={{minHeight:"100px",width:"-webkit-fill-available"}} onChange={(e)=>setCommentTagAct(e.target.value)}></textarea>
            </div>
            <div className="d-flex flex-row justify-content-end">
                <Button className="btn  btn-principal me-2" onClick={()=>{setIsOpenModal(false)}}> Cancel</Button>
                <Button className="btn  btn-principal" 
                onClick={HandleActRow}
                > Act</Button>

            </div>
        </Modal>
        <Modal header={"Act All Alarm "} isOpen={isOpenModalActAll} handleOnClose={()=>{setIsOpenModalActAll(false)}}>
            <div className="d-flex flex-row my-2 justify-content-center">
                <h5>Are you sure? This action cannot be undone</h5>
            </div>
            <div className="d-flex flex-row justify-content-end">
                <Button className="btn  btn-principal me-2" onClick={()=>{setIsOpenModalActAll(false)}}> Cancel</Button>
                <Button className="btn  btn-principal" 
                onClick={HandleActAll}
                > Act All</Button>

            </div>
        </Modal>
        </>
    );
}
