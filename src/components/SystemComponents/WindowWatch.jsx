import { useState,useEffect } from "react";
import { useSelector } from "react-redux";
import { GetBrowserNames } from "../../utils/GetBrowserNames";
import update from "react-addons-update";
import Button from "./Button"
import Commands from "../../commands";
import customStyles from '../../utils/SelectCustomStyle'

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
            var auxSelected2 = []

            for(var k = 0 ; k<numLines;k++){
                if(selectedRows[k].browseName!==null)
                    auxSelected2.push({browseName:selectedRows[k].browseName,value:tags.getIn(selectedRows[k].browseName),setValue:selectedRows[k].setValue,selectedTag:selectedRows[k].selectedTag})
                else
                    auxSelected2.push({browseName:null,value:'',setValue:'',selectedTag:''})

            }
            setSelectedRows(auxSelected2)

                
                    //setSelectedRows(update(selectedRows,{[k]:{$set:{browseName:selectedRows[k].browseName,value:tags.getIn(selectedRows[k].browseName),setValue:selectedRows[k].setValue}}}))
            

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
                                styles={customStyles}
 
                                    isClearable={true}
                                    isSearchable={true}
                                    value={selectedRows[i].selectedTag}
                                    menuPortalTarget={document.body}
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
                            <Button className="btn btn-principal btn-block m-0 p-1 px-2" onClick={e=> handleOnSendValue(i)}>Set</Button>
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
    <div className="row justify-content-center m-2 py-2 w-auto d-flex h-100 overflow-auto text-Dark">
        <div className="card h-100 d-flex py-2 w-auto flex-column overflow-auto" > 
            <h5 className="ms-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="#5836e5" className="me-2" height="30" width="30" viewBox="0 0 48 48"><path d="M24 31.5Q27.55 31.5 30.025 29.025Q32.5 26.55 32.5 23Q32.5 19.45 30.025 16.975Q27.55 14.5 24 14.5Q20.45 14.5 17.975 16.975Q15.5 19.45 15.5 23Q15.5 26.55 17.975 29.025Q20.45 31.5 24 31.5ZM24 28.6Q21.65 28.6 20.025 26.975Q18.4 25.35 18.4 23Q18.4 20.65 20.025 19.025Q21.65 17.4 24 17.4Q26.35 17.4 27.975 19.025Q29.6 20.65 29.6 23Q29.6 25.35 27.975 26.975Q26.35 28.6 24 28.6ZM24 38Q16.7 38 10.8 33.85Q4.9 29.7 2 23Q4.9 16.3 10.8 12.15Q16.7 8 24 8Q31.3 8 37.2 12.15Q43.1 16.3 46 23Q43.1 29.7 37.2 33.85Q31.3 38 24 38ZM24 23Q24 23 24 23Q24 23 24 23Q24 23 24 23Q24 23 24 23Q24 23 24 23Q24 23 24 23Q24 23 24 23Q24 23 24 23ZM24 35Q30.05 35 35.125 31.725Q40.2 28.45 42.85 23Q40.2 17.55 35.125 14.275Q30.05 11 24 11Q17.95 11 12.875 14.275Q7.8 17.55 5.1 23Q7.8 28.45 12.875 31.725Q17.95 35 24 35Z"/></svg>
                Windows Watch</h5>
            <div>
            <Button className="btn btn-principal m-2 "  onClick={e => handleClearTags()}>Clear Tags</Button>

            </div>
            <div className="table-responsive overflow-auto">
            <table className="table m-0 p-0 w-auto text-Dark">
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