import React, { Component  } from 'react';
import tankImage from '../Resource/Submersible_Pump1.png';
import PumpImage from './PumpImage';


export class PumpCard extends Component {
    static displayName = PumpCard.name;
    
    render() {
        return (
            <div className="card col mx-2 col-4 my-2 col-xl-1 card-Pump">
                <table className="text-center text-wrap ">
                    <tbody>
                        <tr>
                            <td>
                                <h4 className="mx-0 w-100">{this.props.cPump.Label}</h4>

                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="row card-Pump-Image">
                                    <div className="my-auto h-100 mt-1 justify-content-center d-flex" >
                                        <PumpImage cPump={this.props.cPump}   width="90px" className="mx-0"/>
                                    </div>

                                </div>

                            </td>
                        </tr>
                        <tr>
                            <td>
                                <h4 className={"mx-0 w-100 " + (this.props.cPump.Status === 1 ? "text-success" : "text-danger")}>{this.props.cPump.Status === 1 ? 'RUNNING' : 'STOP'}</h4>

                            </td>
                        </tr>

                        <tr>
                            <td>
                                <h5 className="mx-0 w-100">Freq.: {this.props.cPump.Frequency} Hz</h5>

                            </td>
                        </tr>

                        <tr>
                            <td>
                                <h5 className="mx-0 w-100">Amp.: {this.props.cPump.Amps} A</h5>

                            </td>
                        </tr>

                        <tr>
                            <td>
                                <h5 className="mx-0 w-100">Set Frequency (Hz):</h5>

                            </td>
                        </tr>

                        <tr>
                            <td>
                                <input type="text" className="form-control mx-0 w-100 " />

                            </td>
                        </tr>

                        <tr>
                            <td>
                                <button type="button" className="btn btn-principal mx-0 w-100 "> Start</button>

                            </td>
                        </tr>

                        <tr>
                            <td>
                                <button type="button" className="btn btn-principal mx-0 w-100 mb-2"> STOP</button>

                            </td>
                        </tr>


                    </tbody>

                </table>
            </div>

        );
    }
}
