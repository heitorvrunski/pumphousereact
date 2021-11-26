import React, { useState, useEffect } from "react";

export default function DurationButton(props) {
  const duration = props.duration;
  const buttonDuration = props.buttonDuration;
  const label = props.label;
  const [selected, setSelected] = useState(
    duration === buttonDuration ? true : false
  );

  useEffect(() => {
    setSelected(duration === buttonDuration ? true : false);
  }, [props.duration, duration, buttonDuration]);

  const handleChange = (event) => {
    if (selected === false) {
      props.eventChange(buttonDuration);
    }
  };
  return (
    <div
      className={"d-inline-block align-middle m-1 " + (props.className ?? "")}
      onClick={handleChange}
    >
      <div
        className={
          "btn text-center align-middle p-0 flex-nowrap" 
        }
        style={{ height: "30px", width: "105px" }}
      >
        <p className={"m-0 "+
          (selected === true ? " actived" : "")}>{label}</p>
      </div>
    </div>
  );
}
