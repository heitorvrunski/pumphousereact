import React from "react";
import HomeMobile from "./Mobile/Home";
import Ismobile from "is-mobile";
import { useHistory } from "react-router";



export default function Home() {
  const ismobile = Ismobile()
  const history = useHistory()

    
    if(ismobile===true)
      return (
        <HomeMobile/>
      );
    else{
      history.push("/control");
      return (
        <div></div>
      );
    }

  }
