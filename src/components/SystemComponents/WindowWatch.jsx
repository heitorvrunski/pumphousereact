import { useState,useEffect } from "react";
import { useSelector } from "react-redux";
import { GetBrowserNames } from "../../utils/GetBrowserNames";
import update from "react-addons-update";
import Button from "./Button"
import Commands from "../../commands";

import Select from 'react-select'


export default function WindowWatch(props) {
    const tags = useSelector((state) => state.Tags);
    const [browseNames,setBrowseNames] = useState([]);
    const [browseNameString,setBrowseNameString] = useState([]);
    //const [numLines,setNumLines] = useState(20);
    const numLines = 20;

    const [numRows,setRows] = useState([]);
    const socket = useSelector((state) => state.SocketIO.socket);
    const [selectedRows,setSelectedRows] = useState([]);

    useEffect(() => {
        if(browseNames.length<=0)
            setBrowseNames(GetBrowserNames(tags))
        // eslint-disable-next-line
    },[tags] );

    useEffect(() => {
        if(selectedRows.length<=0){
            var auxSelected = []
            for(var i = 0 ; i<numLines;i++)
                auxSelected.push({browseName:null,value:'',setValue:'',selectedTag:''})
            setSelectedRows(auxSelected)
        }else{
            for(var k = 0 ; k<numLines;k++)
                if(selectedRows[k].browseName!==null)
                    setSelectedRows(update(selectedRows,{[k]:{$set:{browseName:selectedRows[k].browseName,value:tags.getIn(selectedRows[k].browseName),setValue:selectedRows[k].setValue}}}))
            

        }
       // eslint-disable-next-line
    },[numLines,tags] );


    useEffect(() => {
        if(browseNameString.length<=0&&browseNames.length>0){
            var auxArray = [];
            for(var browseName of browseNames){
                var auxString = '';
                auxString +=browseName[0];
                if(browseName.length===2){
                    var parseIndex = parseInt(browseName[1]);
                        if(!isNaN(parseIndex) && browseName[1] === '' + parseIndex)
                            auxString += '['+parseIndex+']'
                        else
                            auxString += '.'+browseName[1]
                }
                if(browseName.length===3){
                    var parseIndex2 = parseInt(browseName[1]);
                    auxString += '['+parseIndex2+'].'+browseName[2]
                }

                auxArray.push({label:auxString,value:browseName})
            }
            setBrowseNameString(auxArray)
        }

        // eslint-disable-next-line
    },[browseNames] );

    const handleOnSendValue = index =>{
        Commands.SendGenericMessage(selectedRows[index].browseName,selectedRows[index].setValue,socket);

    }

    useEffect(()=>{
        if(browseNameString.length>0&&selectedRows.length>0){
            var auxRows = [];
            for(let i = 0; i<numLines;i++){
                auxRows.push(
                    <tr key={i}>
                        <td style={{"minWidth":"250px"}}>
                            <Select 
                                options={browseNameString}  
                                    isClearable={true}
                                    isSearchable={true}
                                    value={selectedRows[i].selectedTag}
                                    menuPortalTarget={document.body}
                                    styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                    onChange={handleOnSelected(i)}
                                />
                        </td>
                        <td>
                            <input type="text" value={selectedRows[i].value} className="mx-0 p-1" readOnly></input>

                            
                        </td>
                        <td>
                            {selectedRows[i].browseName!==null?
                            <div className="d-flex d-column">
                            <input type="text" className="me-2" value={selectedRows[i].setValue} onChange={e=> setSelectedRows(update(selectedRows,{[i]:{ setValue: {$set:e.target.value}}}))}></input>
                            <Button className="btn btn-Light btn-block m-0 p-1 px-2" onClick={e=> handleOnSendValue(i)}>Set</Button>
                        </div>
                        :null
                        }
                            

                        </td>
                    </tr>
                )
            }
            setRows(auxRows)
        }
        // eslint-disable-next-line
    },[numLines,browseNameString,selectedRows])


    const handleOnSelected = index => e =>{
        if(e!==null){
            setSelectedRows(update(selectedRows,{[index]:{$set:{browseName:e.value,value:tags.getIn(e.value),setValue:tags.getIn(e.value)}}}))

        }
        else
            setSelectedRows(update(selectedRows,{[index]:{$set:{browseName:null,value:'',setValue:''}}}))

    }
    const handleClearTags = e =>{
        var auxSelected = []
            for(var i = 0 ; i<numLines;i++)
                auxSelected.push({browseName:null,value:'',setValue:'',selectedTag:''})
            setSelectedRows(auxSelected)

    }
    //numLines
    return(
    <div className="row justify-content-center m-2 py-2 w-auto d-flex h-100 overflow-auto">
        <div className="card h-100 d-flex py-2 w-auto flex-column overflow-auto" > 
            <h5>Watch</h5>
            <div>
            <Button className="btn btn-principal m-2 "  onClick={e => handleClearTags()}>Clear Tags</Button>

            </div>
            <div className="table-responsive overflow-auto">
            <table className="table m-0 p-0 w-auto">
                <thead>
                    <tr>
                        <td>
                            Tag
                        </td>
                        <td>
                            Value
                        </td>
                        <td>
                            Set Value
                        </td>
                    </tr>
                </thead>
                <tbody>
                    {numRows}
                </tbody>
            </table>
            </div>
            


        </div>
    </div>
    )

}