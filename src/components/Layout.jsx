import React, { Component,useEffect } from 'react';
import NavMenu  from './NavMenu';
import Home from './Home';
import { useDispatch } from 'react-redux';
import  {UpdateData}  from '../store/actions/index.js';
import io from "socket.io-client";
const socket = io.connect("http://20.206.129.202:3000",
{   withCredentials: true

});
export default function Layout(){
  const dispatch = useDispatch();


    
    useEffect(()=>{
      socket.on('loadData',(data) =>{
        dispatch(UpdateData(data))
      });

      socket.on('writeError',(data) =>{

      });
    },[]);

    socket.emit("joined");

    return (
      <div>
            <NavMenu socket = {socket}/>
            <div className="container-fluid" style={{marginTop:"60px"}}>
              <Home socket = {socket}/>
            </div>
      </div>
    );
  
}
