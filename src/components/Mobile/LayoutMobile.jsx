import React from "react";
import NavMenu from "./NavMenu";

import { useSelector } from "react-redux";
export default function LayoutMobile(props) {

return (
    // <IdleTimer ref={idleTimerRef} timeout={300000} onIdle={onIdleHandle}>
      <div>
        <NavMenu />
        <main>
          <div
            className="container-fluid"
            style={{ marginTop: "65px", height: "88vh" }}
          >
            {props.children}
          </div>
        </main>
        
      </div>
    // </IdleTimer>

  );
}