import React from "react";
import "../styles/ChartComponentStyle.css";
import AnimatedBoxDiv from "./AnimatedBoxDiv";

const LivePrice = () => {
  return (
    <>
      <div className="btcTicker">
        <h1>"BTC APP"</h1>

        <AnimatedBoxDiv />
      </div>
    </>
  );
};

export default LivePrice;
