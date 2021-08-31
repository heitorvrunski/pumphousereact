import React, { Component, useState  } from 'react';
import pressureImage from '../Resource/Pressure_Transmitter.png';
import tankImage from '../Resource/Submersible_Pump1.png';
import PumpImage from './PumpImage';
import { useSelector } from 'react-redux';


export default function MainCard(){
const cPump = useSelector(state=>state.Tags.cPump);
return(
            <div className="card col-xl-5 my-2 card-Principal" style={{maxWidth:"490px"} } >

                <div className="container">
    
                    <div className="row d-flex my-2 mx-2">
                        <button type="button" className="col btn btn-principal mx-1 w-20 ">Enable Auto PID</button>
                        <button type="button" className="col btn btn-principal mx-1 w-20 ">Enable Pond Control</button>

                    </div>
                    
                    <div className="row">
                        <div className="col col-xl-7 col-md-7" style={{minWidth:"330px",maxWidth:'330px'} }>
                            <div className="d-block" style={{ "width": "305px", "height": "430px", }}>
                                <div className="position-absolute water-Tank-Box  ms-5 ">
                                    <div className="w-100 water-Tank mt-1" style={{ height: "90%" }}></div>
                                </div>
                                <div className="position-absolute ms-5 pumps-Images">
                                    <div className="row">
                                        <div className="pressure-Image p-0" style={{marginBottom:'-5px'}}>
                                            <img className="h-100 w-100" src={pressureImage} alt="Pressure" />
                                        </div>
                                        <div className=" pump-horizontal-div mb-0 p-0">
                                            <div className="position-absolute d-flex mb-5 ms-2" style={{ marginTop: "-35px" ,marginRight:"-10px"}}>
                                            <span className="span-Primary d-inline-flex px-2"><h6>Pressure Trans.</h6></span>
                                            <span className="bg-white d-inline-flex border px-2 text-info "><h6><b>102.5 PSIG</b></h6></span>
                                            </div>
                                            <div className="pump-horizontal-Pipe "></div>



                                        </div>
                                    </div>
                                    <div className="row mx-2">
                                        <div className="col px-1">
                                            <div className="pump-vertical-Pipe"></div>
                                            <PumpImage cPump={cPump[0]}  width="64px" className="mx-0"/>

                                        </div>
                                        <div className="col px-1">
                                            <div className="pump-vertical-Pipe"></div>

                                            <PumpImage cPump={cPump[1]}  width="64px" className="mx-0"/>

                                        </div>
                                        <div className="col px-1">
                                            <div className="pump-vertical-Pipe"></div>
                                            <PumpImage cPump={cPump[2]}  width="64px" className="mx-0"/>


                                        </div>
                                    </div>
                                    
                                </div>
                                <div className="position-absolute  mt-5 ld-div" >
                                    <div className="d-flex align-items-start flex-column bd-highlight mt-5 h-100">
                                        <div className="mb-auto d-block  bd-highlight">
                                            <div className="d-flex">
                                                <div className="rounded-circle ld-Circle bg-inactive"></div>
                                                <hr className="ld-hr" />
                                            </div>
                                            <span className="span-Primary d-inline-flex px-1"> <h5>LSH</h5></span>

                                        </div>


                                        <div className="d-block bd-highlight mb-0">
                                            <div className="d-flex">
                                                <div className="rounded-circle ld-Circle bg-inactive"></div>
                                                <hr className="ld-hr" />
                                            </div>
                                            <span className="span-Primary d-inline-flex px-1"> <h5>LSL</h5></span>
                                        </div>
                                    </div>
                                </div>
                                <div className="position-absolute mt-4 ld-div" style={{ marginLeft: "-22px" }}>
                                    <div className="d-flex justify-content-end flex-column mt-5 h-100">
                                        <div className=" align-items-center">
                                            <PumpImage cPump={cPump[3]} width="62px"/>
                                        </div>
                                        <div className=" align-items-center my-1 align-self-center">
                                            <div >
                                                <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 0 24 24" width="40px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z" /></svg>
                                            </div>
                                        </div>
                                        <div className="mb-5">

                                            <div className="d-flex align-items-center">
                                                <div className="pond-cube"></div>
                                                <div className="pondfill-pipe"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex mx-auto justify-content-between mb-2" >
                                <div style={{width:"70px"}}></div>
                                <div><span className="span-Primary d-inline-flex px-2 "><h6>Level</h6></span>
                                    <span className="bg-white d-inline-flex border px-2 text-info "><h6><b>70%</b></h6></span>
                                    </div>
                                    <span className="bg-white d-inline-flex border px-2 text-info me-2"><h5><b>Step 0</b></h5></span>
                            </div>
                        </div>
                        <div className="col col-xl-1 px-0 col-md-1 mx-0 mb-2">
                            <button type="button" className="btn btn-principal m-0 me-1 mb-1" style={{ "height": "60px" }}>Configuration</button>
                            <button type="button" className="btn btn-principal m-0 me-1 mb-1" style={{ "height": "60px" }}>Pond Fill<br /> Configuration</button>
                            <button type="button" className="btn btn-principal m-0" style={{ "height": "60px" }}>Pump 1<br />Configuration</button>
                        </div>
                    </div>
                </div>
            </div> 


);
}