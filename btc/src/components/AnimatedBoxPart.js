import React, { useState, useEffect, createContext } from "react";
import "../styles/ChartComponentStyle.css";
import Hover from "react-3d-hover";
import Span30sAnim from "../components/Span30sAnim";

const AnimatedBoxPart = () => {
  const [livePrice, setLivePrice] = useState("Refresh / 30s ");
  const [dayVolume, setDayVolume] = useState("Refresh / 30s ");
  const [marketCap, setMarketCap] = useState("Refresh / 30s ");
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    let intervalCounter = null;

    if (counter > 30) {
      setCounter(0);
    } else {
      intervalCounter = setInterval(() => {
        setCounter((prevValue) => prevValue + 1);
      }, 1000);
    }

    return () => {
      clearInterval(intervalCounter);
    };
  }, [counter]);

  useEffect(() => {
    if (counter > 30) {
      fetch("/api/price_timed_module")
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
      console.log("data was collected after 30s");
    }
  }, [counter]);

  return (
    <>
      <CounterContext.Provider value={[counter]}>
        <Hover scale={1} perspective={580} speed={1000} max={20}>
          <div className="AnimatedBoxPart">
            <Span30sAnim />

            <span>
              <p>Actual Bitcoin Price</p>

              {livePrice}
            </span>
          </div>
        </Hover>
        <Hover scale={1} perspective={580} speed={1000} max={20}>
          <div className="AnimatedBoxPart">
            <Span30sAnim />
            <span>
              <p>Daily Volume</p>
              {dayVolume}
            </span>
          </div>
        </Hover>
        <Hover scale={1} perspective={580} speed={1000} max={20}>
          <div className="AnimatedBoxPart">
            <Span30sAnim />
            <span>
              <p>Total Market Cap</p>
              {marketCap}
            </span>
          </div>
        </Hover>
      </CounterContext.Provider>
    </>
  );
};
export const CounterContext = createContext();
export default AnimatedBoxPart;
