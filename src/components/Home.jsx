import React from "react";
import HomeMobile from "./Mobile/Home";
import DesktopMobile from "./Desktop/Home";



export default function Home() {
<<<<<<< HEAD
    
    
    return (
      <HomeMobile/>
    );
  }
=======
  const cPump = useSelector((state) => state.Tags.get("cPump")).sort(order);
  function order(a, b) {
    return a.toJS().Order < b.toJS().Order ? -1 : (a.toJS().Order > b.toJS().Order ? 1 : 0);
}
  return (
    <>
      {/* <div className="row justify-content-start">
        <TestCard/>
      </div>  */}
      <div className="row justify-content-center">
        <MainCard />
        {cPump.map((pump, index) => (
          <PumpCard key={index} index={index===1 ? 2 : index === 2 ? 1 : index} cPump={pump.toJS()} />
        ))}
      </div>
    </>
  );
}
>>>>>>> 0d121a590b6d4120dd35e081cb45862a13378db2
