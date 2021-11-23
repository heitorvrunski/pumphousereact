import React,{useEffect,useState} from "react";
import { useSelector } from "react-redux";
import Tooltip from '@mui/material/Tooltip';
import ClickAwayListener from '@mui/material/ClickAwayListener';

import { GetActiveAlarm } from "../../utils/GetActiveAlarm";

import Icon from "../../Resource/alarmicon.png"
export default function AlarmIcon(props) {
    const AlarmsActived = useSelector((state) => state.Tags.get("AlarmsActived"));
    const [alarm,setAlarm] = useState({})

    const active = alarm.Actived === true ? true : false;
    const color = getTypeAlarm(alarm);
    const [open, setOpen] = useState(false);
    const handleTooltipClose = () => {
        setOpen(false);
      };
    
      const handleTooltipOpen = () => {
        setOpen(true);
      };
    
    useEffect(() => {
        setAlarm(GetActiveAlarm(props.alarm,props.type,AlarmsActived.toJS()))
    }, [AlarmsActived,props.alarm,props.type])


    useEffect(() => {
        if(open===true)
        {
            const timer = setTimeout(() => {
                handleTooltipClose()
                          }, 2000);
              return () => {
                clearTimeout(timer);
              };        }
    }, [open])


    function getTypeAlarm(alarm){
        if(alarm.Active===2)
            return "alarm-Green";
        if(alarm.Active===3)
            return "alarm-Blue";
        var hihilolo = false
        if(props.type.toUpperCase()==="HIHI"||props.type.toUpperCase()==="LOLO")
            hihilolo = true
        if(hihilolo===true)
            return ""
        else
            return "alarm-Yellow";
    }


    if(active===true)
        return(
            <ClickAwayListener onClickAway={handleTooltipClose}>
                        
            
            <Tooltip

            onClose={handleTooltipClose}
            open={open}
            TransitionProps={{ timeout: 200 }}
            disableFocusListener
            disableHoverListener
            disableTouchListener
            title={props.type.toUpperCase()+" Alarm"}
          >
                <div className={ active+ " blink "+props.className??""} style={props.style??{}}>
                    <img 
                        onClick={handleTooltipOpen}
                        className={color}
                        width={props.width}
                        src={Icon}
                        alt="">
                    </img>
                </div>          

            </Tooltip>

            </ClickAwayListener>
            
        )
    else
        return null

    
}