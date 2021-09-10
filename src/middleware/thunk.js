import axios from "axios"
import { GetSysConfig,SetExpiresToken } from "../store/actions.jsx"
const ApiNode = {
    GetSysConfig: () => dispatch => {
        axios.get(`http://${window.location.hostname}:3000/node/api/sysConfig`,{withCredentials:true}).then(resp => resp.data).then(tasks => dispatch(GetSysConfig(tasks)))
    },
    RefreshToken: () => dispatch => {
        axios.get(`http://${window.location.hostname}:3000/node/api/auth/refresh`,{withCredentials:true}).then(resp => resp.data).then(tasks => dispatch(SetExpiresToken(tasks)))
    }
}

export {ApiNode}