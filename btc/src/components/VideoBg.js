import React from "react";
import TradingBg from "../imgs/tradingBg.mp4";

const VideoBg = () => {
  return (
    <div>
      
      <video
        className="videoInsert"
        autoPlay={true}
        muted={true}
        loop={true}
        id="bgvid"
      >
        <source src={TradingBg} type="video/mp4" />
      </video>
    </div>
  );
};

export default VideoBg;
