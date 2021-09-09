import React, { useState,useEffect } from "react"
import { useDispatch } from "react-redux"
import { ChangeStateTrend } from "../../store/actions/index.js";


export default function DurationButton(props){
    const dispatch = useDispatch();
    const duration = props.duration;
    const buttonDuration = props.buttonDuration;
    const label = props.label;
    const [selected,setSelected] = useState(duration===buttonDuration?true:false)

    useEffect(()=>{
        setSelected(duration===buttonDuration?true:false)
    },[props.duration])

    const handleChange = event =>{
        console.log(selected)

        if(selected===false){
            props.eventChange(buttonDuration);
      
        }
    }
    return(
    <div className="d-inline-block align-middle m-1"  onClick={handleChange}>
        <div className={"btn text-center align-middle p-0" +(selected===true?' selectedDuration':'')} style={{height:"30px",width:"100px"}}>
            <p className="m-0" >{label}</p>
            <hr className={(selected===true?'':'collapsed ') + " m-0 "}></hr>
        </div>
    </div>
    )
}

/*
const state = props.state
    const [componentState,setComponentState] = useState(props.componentState)

    const   [check,setcheck] = useState(state===componentState?true:false)
    useEffect(()=>{
        setcheck(state===componentState?true:false)
    },[props.state])

    const handleChange = event =>{
        if(event.target.checked===true&& state!==componentState){
            props.eventChange(componentState);
      
        }else{
            event.target.checked = false;
            event.target.value = false;
        }
    }
*/

