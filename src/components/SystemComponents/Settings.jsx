import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Table from "./Table";
import update from "react-addons-update";
import { FindConfig } from "../../utils/SettingsUtils";
import { useSelector } from "react-redux";
import Commands from "../../commands";
import "./Settings.scss";
import Button from "./Button";
import ConvertTime from "../../utils/ConvertMeasure";
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';


export default function Config() {
  const socket = useSelector((state) => state.SocketIO.socket);
  const [search, setSearch] = useState("")
  const history = useHistory();
  const [settings, setSettings] = useState([]);
  const settingsNode = useSelector((state) => state.SysConfig);
  const tags = useSelector((state) => state.Tags);

  useEffect(() => {
    if (settings.length === 0) {
      var settingsAux = [];
      if(!settingsNode)
        return
      const config = FindConfig(settingsNode, "Settings");

      config.value.forEach((element,index) => {
        var value = tags.getIn(element.browseName);
        var measureType = 0
        if(element.measure==="ms"||element.measure==="s"||element.measure==="m"||element.measure==="h"){
          measureType = 1
          value = ConvertTime(value,element.measure,element.viewMeasure)
        }
        settingsAux.push({
          label: element.label,
          measure: element.measure,
          viewMeasure: element.viewMeasure,
          value: value,
          browseName: element.browseName,
          measureType:measureType,
          index:index
        });
      });

      setSettings(settingsAux);
    }
  }, [settings, settingsNode, tags]);

  const handleOptionOnChange = (event) => {
    const target = event.target;
    const idx = parseInt(target.id);
    const value = target.value;
    console.log(target.id)

    console.log(value)

    const state = update(settings, {
      [idx]: {
        value: { $set: value },
      },
    });
    setSettings(state);
  };

  const handleChangeMeasure = (index) => (event) => {

    const newValue = ConvertTime(settings[index].value,settings[index].viewMeasure,event.value)
    const state = update(settings, {
      [index]: {
        value: { $set: newValue },
        viewMeasure: { $set: event.value },
      },
    });
    setSettings(state);


  };


  const handleSubmitChanges = (event) => {
    for (const element of settings) {
      const prevValue = tags.getIn(element.browseName);
      var value = element.value;
      if(element.measure!==element.viewMeasure){
        value = ConvertTime(element.value,element.viewMeasure,element.measure)
      }
      if (prevValue !== value) {
        Commands.UpdateSettings(element.browseName, value, socket);
      }
    }
  };

  return (
    <div className="row justify-content-center m-2 d-flex h-100">
      <div className="card m-2 h-100 d-flex flex-column " style={{ minWidth: "320px",width:"auto" }}>
        <div className="m-2 d-flex justify-content-between">
          <h5 >Settings</h5>
          <svg className="ms-auto btn-Icon" style={{opacity:"0.7"}} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"  fill="#000000" onClick={()=>history.push("/Settings/config")}>
            <path d="M0 0h24v24H0V0z" fill="none"/>
            <path d="M19.43 12.98c.04-.32.07-.64.07-.98 0-.34-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.09-.16-.26-.25-.44-.25-.06 0-.12.01-.17.03l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.06-.02-.12-.03-.18-.03-.17 0-.34.09-.43.25l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98 0 .33.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.09.16.26.25.44.25.06 0 .12-.01.17-.03l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.06.02.12.03.18.03.17 0 .34-.09.43-.25l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zm-1.98-1.71c.04.31.05.52.05.73 0 .21-.02.43-.05.73l-.14 1.13.89.7 1.08.84-.7 1.21-1.27-.51-1.04-.42-.9.68c-.43.32-.84.56-1.25.73l-1.06.43-.16 1.13-.2 1.35h-1.4l-.19-1.35-.16-1.13-1.06-.43c-.43-.18-.83-.41-1.23-.71l-.91-.7-1.06.43-1.27.51-.7-1.21 1.08-.84.89-.7-.14-1.13c-.03-.31-.05-.54-.05-.74s.02-.43.05-.73l.14-1.13-.89-.7-1.08-.84.7-1.21 1.27.51 1.04.42.9-.68c.43-.32.84-.56 1.25-.73l1.06-.43.16-1.13.2-1.35h1.39l.19 1.35.16 1.13 1.06.43c.43.18.83.41 1.23.71l.91.7 1.06-.43 1.27-.51.7 1.21-1.07.85-.89.7.14 1.13zM12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
          </svg>
        </div>
        <div className="d-flex flex-row align-items-center">
        <TextField
          variant="standard"
          value={search}
          onChange={(e)=>{setSearch(e.target.value)}}
          placeholder="Search…"
          className={""}
          InputProps={{
            startAdornment: <SearchIcon fontSize="small" />,
            endAdornment: (
              <IconButton
                title="Clear"
                aria-label="Clear"
                size="small"
                style={{ visibility: search!=="" ? 'visible' : 'hidden' }}
                onClick={()=> setSearch("")}
              >
                <ClearIcon fontSize="small" />
              </IconButton>
            ),
          }}
        />
        </div>
        <Table
          data={settings}
          filter={search}
          classTable="table-sm d-flex overflow-auto h6 mb-0"
          classInput="tableInput"
          handleChangeMeasure={handleChangeMeasure}
          handleOptionOnChange={handleOptionOnChange}
        />

        <Button
          type="button"
          className="btn btn-principal mb-2"
          onClick={handleSubmitChanges}
          style={{minHeight:"40px",marginTop:"auto"}}
        >
          Update
        </Button>
      </div>
    </div>
  );
}
