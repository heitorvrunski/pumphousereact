import tankImage from "../Resource/Submersible_Pump4a.png";
import tankHeader from "../Resource/PumpHeadera.png";

export default function PumpImage(props) {
  var cPump = props.cPump;
  var active = cPump.Status === 1 ? "pump-Green" : "";
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
