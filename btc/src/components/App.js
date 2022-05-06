import React, { useCallback, useEffect, useState } from "react";
import "../styles/App.css";

import FearAndGreed from "./FearAndGreed";
import FeesRate from "./FeesRate";
import ActiveAdresses from "./ActiveAdresses";
import BtcPriceChart from "./BtcPriceChart";
import HashRateBtc from "./HashRateBtc";
import LivePrice from "./LivePrice";
import Footer from "./Footer";
import NewAdresses from "./NewAdresses";
import VideoBg from "./VideoBg";
import ChartDate from "./ChartDate";
import TweetsContainer from "./TweetsContainer";
import { Chart, defaults } from "react-chartjs-2";

import zoomPlugin from "chartjs-plugin-zoom";

const App = () => {
  const [time, setTime] = useState([]);
  const [activeAd, setActiveAd] = useState([]);
  const [btcPrice, setBtcPrice] = useState([]);
  const [feesRate, setFeesRate] = useState([]);
  const [hashRate, setHashRate] = useState([]);
  const [newAd, setNewAd] = useState([]);

  const [dateValue, setDateValue] = useState();

  const [newBtcPriceArray, setNewBtcPriceArray] = useState([]);
  const [newTimelineArray, setNewTimelineArray] = useState([]);
  const [newActiveAdressesArray, setNewActiveAdressesArray] = useState([]);
  const [newFeesRateArray, setNewFeesRateArray] = useState([]);
  const [newHashRateArray, setNewHashRateArray] = useState([]);
  const [newAressesArray, setNewAressesArray] = useState([]);

  const [currentDate] = useState(new Date().toISOString().slice(0, 10));

  const [chartFont] = useState((defaults.font.family = "'Ultra', serif"));
  const [chartFontWeight] = useState((defaults.font.weight = 100));
  const [chartFontSize] = useState((defaults.font.size = 13));
  const [func] = useState(Chart.register(zoomPlugin));

  useEffect(() => {
    if (dateValue) {
      console.log(`date event target value = ${dateValue}`);
      // creating index value to cut every chart Array. we can use this methode because every array lenght is the same
      let TimeLineArrayIndexCutter = time.indexOf(dateValue);
      console.log(`time line index cutter value = ${TimeLineArrayIndexCutter}`);

      setNewBtcPriceArray(btcPrice.slice(TimeLineArrayIndexCutter));
      setNewTimelineArray(time.slice(TimeLineArrayIndexCutter));
      setNewActiveAdressesArray(activeAd.slice(TimeLineArrayIndexCutter));
      setNewFeesRateArray(feesRate.slice(TimeLineArrayIndexCutter));
      setNewHashRateArray(hashRate.slice(TimeLineArrayIndexCutter));
      setNewAressesArray(newAd.slice(TimeLineArrayIndexCutter));
    }
  }, [dateValue]);

  useEffect(() => {
    fetch("/api/chart_time_line")
      .then((res) => res.json())
      .then((data) => {
        setTime(data);
      })
      .catch((error) => {
        console.log(error);
      });
    fetch("/api/btc_active_adresses")
      .then((res) => res.json())
      .then((data) => {
        setActiveAd(data);
      })
      .catch((error) => {
        console.log(error);
      });
    fetch("/api/btc_price")
      .then((res) => res.json())
      .then((data) => {
        setBtcPrice(data);
      })
      .catch((error) => {
        console.log(error);
      });
    fetch("/api/btc_fees_rate")
      .then((res) => res.json())
      .then((data) => {
        setFeesRate(data);
      })
      .catch((error) => {
        console.log(error);
      });
    fetch("/api/btc_hash_rate")
      .then((res) => res.json())
      .then((data) => {
        setHashRate(data);
      })
      .catch((error) => {
        console.log(error);
      });
    fetch("/api/btc_new_adresses")
      .then((res) => res.json())
      .then((data) => {
        setNewAd(data);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log("data collected");
  }, []);

  return (
    <>
      <div className="App">
        <VideoBg />
        <div className="LandingPageContainer">
          <LivePrice />
          <TweetsContainer />
        </div>

        <ChartDate setDateValue={setDateValue} CurrentDate={currentDate} />

        <BtcPriceChart
          xAxes={newTimelineArray.length > 0 ? newTimelineArray : time}
          yAxes={newBtcPriceArray.length > 0 ? newBtcPriceArray : btcPrice}
        />

        <FeesRate
          xAxes={newTimelineArray.length > 0 ? newTimelineArray : time}
          yAxes={newFeesRateArray.length > 0 ? newFeesRateArray : feesRate}
          btcPri={newBtcPriceArray.length > 0 ? newBtcPriceArray : btcPrice}
        />

        <ActiveAdresses
          xAxes={newTimelineArray.length > 0 ? newTimelineArray : time}
          yAxes={
            newActiveAdressesArray.lenght > 0
              ? newActiveAdressesArray
              : activeAd
          }
          btcPri={newBtcPriceArray.length > 0 ? newBtcPriceArray : btcPrice}
        />

        <NewAdresses
          xAxes={newTimelineArray.length > 0 ? newTimelineArray : time}
          yAxes={newAressesArray.lenght > 0 ? newAressesArray : newAd}
          btcPri={newBtcPriceArray.length > 0 ? newBtcPriceArray : btcPrice}
        />

        <HashRateBtc
          xAxes={newTimelineArray.length > 0 ? newTimelineArray : time}
          yAxes={newHashRateArray.lenght > 0 ? newHashRateArray : hashRate}
          btcPri={newBtcPriceArray.length > 0 ? newBtcPriceArray : btcPrice}
        />

        <FearAndGreed />
      </div>
      <Footer />
    </>
  );
};

export default App;
