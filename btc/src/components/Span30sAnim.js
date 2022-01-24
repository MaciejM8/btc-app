import React, { useState,  useContext } from "react";
import { CounterContext } from "./AnimatedBoxPart";
import "../styles/ChartComponentStyle.css";

const Span30sAnim = () => {
  const [Counter] = useContext(CounterContext);
  const [State, setState] = useState({
    spanClass: "Loading",
    spanLoaded: "Loading Loaded",
    spanLoadingMiddle: "LoadingMiddle",
    spanClassMiddle: "LoadingMiddle Loaded",
  });

  const { spanClass, spanLoaded, spanClassMiddle, spanLoadingMiddle } = State;
  return (
    <>
      <div className="ContainerLoading">
        <span className={Counter >= 5 ? spanLoaded : spanClass}></span>
        <span className={Counter >= 10 ? spanLoaded : spanClass}></span>
        <span className={Counter >= 20 ? spanClassMiddle : spanLoadingMiddle}>
          <p>{Counter}</p>
        </span>
        <span className={Counter >= 25 ? spanLoaded : spanClass}></span>
        <span className={Counter >= 30 ? spanLoaded : spanClass}></span>
      </div>
    </>
  );
};

export default Span30sAnim;

