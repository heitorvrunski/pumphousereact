import tankImage from '../Resource/Submersible_Pump4.png';
import tankHeader from '../Resource/PumpHeader.png';


export default function PumpImage(props){
    var cPump = props.cPump;
    var active = cPump.Status===1?"pump-Green":"";
    return(
        <div className="pump_Image d-flex" style={{ "width": props.width,height: props.height }}>
            <img className="position-absolute  " width={props.width} src={tankImage} alt="Pump" />
            <img className={active+" position-absolute"} width={props.width} src={tankHeader} style={{marginLeft:"-2px"}}  />
        </div>
    );}
    /*            <img className="position-absolute w-100 pump-Active" src={tankHeader} style={{marginLeft:"-2px"}}  />
*/