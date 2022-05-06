import React from "react";
import "../styles/ChartComponentStyle.css";
import AnimatedBoxDiv from "./AnimatedBoxDiv";

const LivePrice = () => {
  return (
    <>
      <div className="btcTicker">
        <AnimatedBoxDiv />
      </div>
    </>
  );
};

export default LivePrice;
