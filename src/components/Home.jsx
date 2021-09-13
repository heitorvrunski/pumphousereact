import React from "react";
import PumpCard from "./PumpCard.jsx";
import { useSelector } from "react-redux";
import MainCard from "./MainCard.jsx";
import TestCard from "./TestCard.jsx";

export default function Home() {
  const cPump = useSelector((state) => state.Tags.get("cPump"));
  return (
    <>
      <div className="row justify-content-start">
        <TestCard />
      </div>
      <div className="row justify-content-center">
        <MainCard />
        {cPump.map((pump, index) => (
          <PumpCard key={index} index={index} cPump={pump.toJS()} />
        ))}
      </div>
    </>
  );
}
