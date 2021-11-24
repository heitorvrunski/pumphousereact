import tankImage from "../Resource/Submersible_Pump4a.png";
import tankHeader from "../Resource/PumpHeadera.png";

export default function PumpImage(props) {
  const cPump = props.cPump;
  const active = colorPump();
  function colorPump(){
    if(cPump.StatusOPC === 2)
      return "pump-Grey blink-Yellow "
    return cPump.StatusOPC === 1 ? "pump-Green" : "";
  }
  return (
    <div
      className="pump_Image d-flex"
      style={{ width: props.width, height: props.height }}
    >
      <img
        className="position-absolute  "
        width={props.width}
        src={tankImage}
        alt="Pump"
        style={{objectFit:"cover",objectPosition:"12px 0"  }}
      />
      <img
        className={active + " position-absolute"}
        width={props.width}
        src={tankHeader}
        style={{objectFit:"cover",objectPosition:"12px 0"  }}
        alt=""
      />
    </div>
  );
}
