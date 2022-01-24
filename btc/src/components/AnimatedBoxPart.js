import React, { useState, useEffect, useContext } from "react";
import "../styles/ChartComponentStyle.css";
import Hover from "react-3d-hover";
import Span30sAnim from "../components/Span30sAnim";

const AnimatedBoxPart = () => {
  const [LivePrice, setLivePrice] = useState("Refresh / 30s ");
  const [DayVolume, setDayVolume] = useState("Refresh / 30s ");
  const [MarketCap, setMarketCap] = useState("Refresh / 30s ");
  const [Counter, setCounter] = useState(0);

  useEffect(() => {
    let intervalCounter = null;

    if (Counter > 30) {
      setCounter(0);
    } else {
      intervalCounter = setInterval(() => {
        setCounter((prevValue) => prevValue + 1);
      }, 1000);
    }

    return () => {
      clearInterval(intervalCounter);
    };
  }, [Counter]);

  useEffect(() => {
    if (Counter > 30) {
      fetch("/ticker")
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setLivePrice(data.bitcoin.usd.toLocaleString() + " $");
          setDayVolume(
            Math.floor(data.bitcoin.usd_24h_vol).toLocaleString() + " $"
          );
          setMarketCap(
            Math.floor(data.bitcoin.usd_market_cap).toLocaleString() + " $"
          );
        })
        .catch((error) => {
          console.log(error);
        });
      console.log("wydobyto dane po 30 s");
    }
  }, [Counter]);

  

  return (
    <>
    <CounterContext.Provider value={[Counter]}>
      <Hover scale={1} perspective={580} speed={1000} max={20}>
        <div className="AnimatedBoxPart">
          
          <Span30sAnim />
          
          <span>
            <p>Actual Bitcoin Price</p>

            {LivePrice}
          </span>
        </div>
      </Hover>
      <Hover scale={1} perspective={580} speed={1000} max={20}>
        <div className="AnimatedBoxPart">
          <Span30sAnim />
          <span>
            <p>Daily Volume</p>
            {DayVolume}
          </span>
        </div>
      </Hover>
      <Hover scale={1} perspective={580} speed={1000} max={20}>
        <div className="AnimatedBoxPart">
          <Span30sAnim />
          <span>
            <p>Total Market Cap</p>
            {MarketCap}
          </span>
        </div>
      </Hover>
      </CounterContext.Provider>
    </>
  );
};
export const CounterContext = React.createContext();
export default AnimatedBoxPart;
