import React, { Component, useEffect } from 'react';
import PumpCard  from './PumpCard.jsx';/*
import pressureImage from '../Resource/Pressure_Transmitter.png';
import tankImage from '../Resource/Submersible_Pump1.png';*/
import { useSelector } from 'react-redux';
import MainCard from './MainCard.jsx';


export default function Home({ socket }){
    const cPump = useSelector(state=>state.Tags.get('cPump'));
    return(
                <div className="row justify-content-center">
                    <MainCard/>
                    {cPump.map((pump,index) =>(
                        <PumpCard key={index} cPump={pump.toJS()}/>
                    ))}
                </div>
        );
}



