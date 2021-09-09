import React,{useEffect} from 'react';
import NavMenu  from './NavMenu';
import {useDispatch } from 'react-redux';
import  {UpdateData}  from '../store/actions/index.js';
import io from "socket.io-client";
const socket = io.connect(`http://${window.location.hostname}:3000`,
{   withCredentials: true

});
export default function Layout(props){
  const dispatch = useDispatch();


    
    useEffect(()=>{
      socket.on('loadData',(data) =>{
        dispatch(UpdateData(data))
      });

      socket.on('writeError',(data) =>{

      });
    });

    socket.emit("joined");

    return (
      <div>
            <NavMenu />
            <div className="container-fluid" style={{marginTop:"60px",height:"90vh"}}>
              {props.children}

            </div>
      </div>
    );
  
}
/*<Home socket = {socket}/>  */
