import React from "react";
import TradingBg from "../imgs/tradingBg.mp4";
// import btcGif from '../imgs/btcTradingGif.gif'
const VideoBg = () => {
  return (
    <div>
      {/* <img className="videoInsert" src={btcGif} alt="btc trading gif" /> */}
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
