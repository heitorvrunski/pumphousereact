import React from "react";
import NavMenu from "./Navmenu";

export default function LayoutDesktop(props) {

return (
    // <IdleTimer ref={idleTimerRef} timeout={300000} onIdle={onIdleHandle}>

    <div className="container-fluid p-0">
        <div className="row flex-nowrap p-0">
            <NavMenu/>
            <div className="col  container-fluid overflow-auto p-2" style={{"height":"98vh"}}>
            {props.children}

            </div>
        </div>
    </div>
    // </IdleTimer>

  );
}