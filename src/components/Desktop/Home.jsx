import React from "react";
import { useSelector } from "react-redux";
// import TestCard from "./TestCard.jsx";

export default function Home() {
  const cPump = useSelector((state) => state.Tags.get("cPump")).sort(order);
  function order(a, b) {
    return a.toJS().Order < b.toJS().Order ? -1 : (a.toJS().Order > b.toJS().Order ? 1 : 0);
}
  return (
    <>

    </>
  );
}