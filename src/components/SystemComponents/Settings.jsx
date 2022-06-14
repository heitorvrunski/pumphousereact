import { useEffect, useState,useMemo } from "react";
import { useHistory } from "react-router";
import Table from "./Table";
import { createTheme, ThemeProvider } from '@mui/material/styles';

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
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: 'dark' ,
        },
      }),
    [],
  );
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
    <div className="row justify-content-center m-2 d-flex h-100 text-Light">
      <div className="card m-2 h-100 d-flex flex-column " style={{ minWidth: "320px",width:"auto" }}>
        <div className="m-2 d-flex justify-content-between">
          <h4 className="text-Dark f-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="me-2" fill="#5836e5" height="30" width="30" viewBox="0 0 48 48"><path d="M19.4 44 18.4 37.7Q17.45 37.35 16.4 36.75Q15.35 36.15 14.55 35.5L8.65 38.2L4 30L9.4 26.05Q9.3 25.6 9.275 25.025Q9.25 24.45 9.25 24Q9.25 23.55 9.275 22.975Q9.3 22.4 9.4 21.95L4 18L8.65 9.8L14.55 12.5Q15.35 11.85 16.4 11.25Q17.45 10.65 18.4 10.35L19.4 4H28.6L29.6 10.3Q30.55 10.65 31.625 11.225Q32.7 11.8 33.45 12.5L39.35 9.8L44 18L38.6 21.85Q38.7 22.35 38.725 22.925Q38.75 23.5 38.75 24Q38.75 24.5 38.725 25.05Q38.7 25.6 38.6 26.1L44 30L39.35 38.2L33.45 35.5Q32.65 36.15 31.625 36.775Q30.6 37.4 29.6 37.7L28.6 44ZM24 30.5Q26.7 30.5 28.6 28.6Q30.5 26.7 30.5 24Q30.5 21.3 28.6 19.4Q26.7 17.5 24 17.5Q21.3 17.5 19.4 19.4Q17.5 21.3 17.5 24Q17.5 26.7 19.4 28.6Q21.3 30.5 24 30.5ZM24 27.5Q22.55 27.5 21.525 26.475Q20.5 25.45 20.5 24Q20.5 22.55 21.525 21.525Q22.55 20.5 24 20.5Q25.45 20.5 26.475 21.525Q27.5 22.55 27.5 24Q27.5 25.45 26.475 26.475Q25.45 27.5 24 27.5ZM24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24ZM21.8 41H26.2L26.9 35.4Q28.55 35 30.025 34.15Q31.5 33.3 32.7 32.1L38 34.4L40 30.8L35.3 27.35Q35.5 26.5 35.625 25.675Q35.75 24.85 35.75 24Q35.75 23.15 35.65 22.325Q35.55 21.5 35.3 20.65L40 17.2L38 13.6L32.7 15.9Q31.55 14.6 30.1 13.725Q28.65 12.85 26.9 12.6L26.2 7H21.8L21.1 12.6Q19.4 12.95 17.925 13.8Q16.45 14.65 15.3 15.9L10 13.6L8 17.2L12.7 20.65Q12.5 21.5 12.375 22.325Q12.25 23.15 12.25 24Q12.25 24.85 12.375 25.675Q12.5 26.5 12.7 27.35L8 30.8L10 34.4L15.3 32.1Q16.5 33.3 17.975 34.15Q19.45 35 21.1 35.4Z"/></svg>
            Settings</h4>
          <svg className="ms-auto btn-Icon" style={{opacity:"0.7"}} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"  fill="#f0f0f0" onClick={()=>history.push("/Settings/config")}>
            <path d="M0 0h24v24H0V0z" fill="none"/>
            <path d="M19.43 12.98c.04-.32.07-.64.07-.98 0-.34-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.09-.16-.26-.25-.44-.25-.06 0-.12.01-.17.03l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.06-.02-.12-.03-.18-.03-.17 0-.34.09-.43.25l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98 0 .33.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.09.16.26.25.44.25.06 0 .12-.01.17-.03l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.06.02.12.03.18.03.17 0 .34-.09.43-.25l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zm-1.98-1.71c.04.31.05.52.05.73 0 .21-.02.43-.05.73l-.14 1.13.89.7 1.08.84-.7 1.21-1.27-.51-1.04-.42-.9.68c-.43.32-.84.56-1.25.73l-1.06.43-.16 1.13-.2 1.35h-1.4l-.19-1.35-.16-1.13-1.06-.43c-.43-.18-.83-.41-1.23-.71l-.91-.7-1.06.43-1.27.51-.7-1.21 1.08-.84.89-.7-.14-1.13c-.03-.31-.05-.54-.05-.74s.02-.43.05-.73l.14-1.13-.89-.7-1.08-.84.7-1.21 1.27.51 1.04.42.9-.68c.43-.32.84-.56 1.25-.73l1.06-.43.16-1.13.2-1.35h1.39l.19 1.35.16 1.13 1.06.43c.43.18.83.41 1.23.71l.91.7 1.06-.43 1.27-.51.7 1.21-1.07.85-.89.7.14 1.13zM12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
          </svg>
        </div>
        <div className="d-flex flex-row align-items-center m-1">
        <ThemeProvider theme={theme}>

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
        </ThemeProvider>
        </div>
        <Table
          data={settings}
          filter={search}
          classTable="table-sm d-flex overflow-auto text-Light mb-0 ms-1"
          classInput="form-control form-Dark form-settings"
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
