import tankImageTurbine from "../Resource/Submersible_Pump4a.png";
import tankHeaderTurbine from "../Resource/PumpHeadera.png";
import tankImagePond from "../Resource/Submersible_Pump4.png";
import tankHeaderPond from "../Resource/PumpHeader.png";

export default function PumpImage(props) {
  const cPump = props.cPump;
  const tankImage = props.cPump.IsPond===1?tankImagePond:tankImageTurbine;
  const tankHeader = props.cPump.IsPond===1?tankHeaderPond:tankHeaderTurbine;
  const style1 = props.cPump.IsPond===1?{}:{objectFit:"cover",objectPosition:"12px 0"};
  const style2 = props.cPump.IsPond===1?{ marginLeft: "-2px" }:{objectFit:"cover",objectPosition:"12px 0"};

  const active = colorPump();
  function colorPump(){
    if(cPump.StatusOPC === 2)
      return "pump-Grey blink-Yellow "
    return cPump.StatusOPC === 1 ? "pump-Green" : "";
  }
  return (
    <div
      className="pump_Image d-flex"
      style={props.style??{}}
    >
      <img
        className="position-absolute  "
        width={props.width}
        src={tankImage}
        alt="Pump"
        style={style1}
      />
      <img
        className={active + " position-absolute"}
        width={props.width}
        src={tankHeader}
        style={style2}
        alt=""
      />
    </div>
  );
}
