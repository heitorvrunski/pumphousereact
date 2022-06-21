import React from "react";
import ControlMobile from "./Mobile/Control";
import ControlDesktop from "./Desktop/Control";

import Ismobile from "is-mobile";



export default function Control() {
  const ismobile = Ismobile()
  if(ismobile===true)
    return (
      <ControlMobile/>
    );
  else
  return (
    <ControlDesktop/>
  );
  }