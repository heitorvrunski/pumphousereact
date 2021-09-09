import React, { useEffect, useState } from "react"


export default function CheckBox(props){
    const state = props.state
    const componentState = props.componentState

    const   [check,setcheck] = useState(state===componentState?true:false)

    useEffect(()=>{
        setcheck(state===componentState?true:false)
    },[props.state,state,componentState])

    const handleChange = event =>{
        if(event.target.checked===true&& state!==componentState){
            props.eventChange(componentState);
      
        }else{
            event.target.checked = false;
            event.target.value = false;
        }
    }
    return(
    <div className={(props.className?props.className:"") +" d-flex "}>
        <div className="d-flex">
            <input className={" form-check-input m-1"} type="checkbox" checked={check} value={check} onChange={handleChange}  ></input>
            <h6 className="mt-1">{props.label}</h6>
        </div>
        
    </div>
    )
}
