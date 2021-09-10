import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { ChangeStateTrend } from "../../store/actions.jsx";


export default function CheckBoxList(props){
    const dispatch = useDispatch();
    const [defaltCheck,setDefaltCheck] = useState(props.checked)
    useEffect(()=>{
        setDefaltCheck(props.checked)
    },[props.checked])
    const changeState = event => {
        dispatch(ChangeStateTrend(props.index))
    }
    return(
        <div className="d-flex my-2 pointer-Selected" style={{width:"180px"}}>
            <input className="form-check-input m-1"   checked={defaltCheck} value={defaltCheck} type="checkbox"  onChange={changeState}></input>
            <h6 className="align-middle mt-1" onClick={changeState}>{props.tag}</h6>
        </div>

    )
}

