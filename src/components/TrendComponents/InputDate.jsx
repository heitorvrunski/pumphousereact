import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { SetDateRangeAction } from "../../store/actions.jsx";


export default function InputDate(props){
    const dispatch = useDispatch();
    const [defaltInput,setdefaltInput] = useState(new Date())
    const name = props.name;
    const changeDateRange = event => {
        if(event.target.value){
            dispatch(SetDateRangeAction(event.target.value,name))
        }
    }
    useEffect(()=>{
        setdefaltInput(props.input)
    },[props.input]);


    return(
        <div className={(props.className?props.className:'') +" d-flex justify-content-end"}>
            <h6>{props.label}</h6>
            <input type="date" value={defaltInput} onChange={changeDateRange} style={{width:"135px"}}></input>
        </div>

    )
}
