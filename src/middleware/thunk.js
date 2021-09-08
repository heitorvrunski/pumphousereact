import axios from "axios"
import { GetSysConfig } from "../store/actions/index.js"
const ApiNode = {
    GetSysConfig: () => dispatch => {
        axios.get('http://localhost:3000/node/api/sysConfig',{withCredentials:true}).then(resp => resp.data).then(tasks => dispatch(GetSysConfig(tasks)))
    }
}

export {ApiNode}