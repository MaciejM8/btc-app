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

import { Chart, defaults } from "react-chartjs-2";

import zoomPlugin from "chartjs-plugin-zoom";

const App = () => {
  const [time, setTime] = useState([]);
  const [activeAd, setActiveAd] = useState([]);
  const [btcPrice, setBtcPrice] = useState([]);
  const [feesRate, setFeesRate] = useState([]);
  const [hashRate, setHashRate] = useState([]);
  const [newAd, setNewAd] = useState([]);

  // test ustawienia stanu poprzez dziecko i wyslanie danych z dziecka do rodzica
  const [dateValue, setDateValue] = useState();

  const [newTimeArray, setNewTimeArray] = useState([]);
  const [newBtcPriceArray, setNewBtcPriceArray] = useState([]);
  const [targetArray, setTargetArray] = useState("");

  const [currentDate] = useState(new Date().toISOString().slice(0, 10));

  const [chartFont] = useState((defaults.font.family = "'Ultra', serif"));
  const [chartFontWeight] = useState((defaults.font.weight = 100));
  const [chartFontSize] = useState((defaults.font.size = 13));
  const [func] = useState(Chart.register(zoomPlugin));

  // proba wyodrebnienia nowej listy DAT z danych pozyskanych od dizecka
  useEffect(() => {
    console.log(dateValue);
    // metoda filter aby sprawdzic czy wycinamy pozyskany poprzez fetch ARRAY TIME na nowa liste z odpowiednimi
    // datami zgodnie z wybrana w dziecku data
    console.log(time.filter((dates) => dates >= dateValue));
  }, [dateValue]);

  useEffect(() => {
    fetch("/time")
      .then((res) => res.json())
      .then((data) => {
        setTime(data);
      })
      .catch((error) => {
        console.log(error);
      });
    fetch("/activeAd")
      .then((res) => res.json())
      .then((data) => {
        setActiveAd(data);
      })
      .catch((error) => {
        console.log(error);
      });
    fetch("/btcprice")
      .then((res) => res.json())
      .then((data) => {
        setBtcPrice(data);
      })
      .catch((error) => {
        console.log(error);
      });
    fetch("/feesrate")
      .then((res) => res.json())
      .then((data) => {
        setFeesRate(data);
      })
      .catch((error) => {
        console.log(error);
      });
    fetch("/hashrate")
      .then((res) => res.json())
      .then((data) => {
        setHashRate(data);
      })
      .catch((error) => {
        console.log(error);
      });
    fetch("/new-ad")
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
        <LivePrice />
        <ChartDate setDateValue={setDateValue} CurrentDate={currentDate} />

        <BtcPriceChart
          xAxes={newTimeArray.length > 0 ? newTimeArray : time}
          yAxes={newBtcPriceArray.length > 0 ? newBtcPriceArray : btcPrice}
        />

        <FeesRate xAxes={time} yAxes={feesRate} btcPri={btcPrice} />

        <ActiveAdresses xAxes={time} yAxes={activeAd} btcPri={btcPrice} />

        <NewAdresses xAxes={time} yAxes={newAd} btcPri={btcPrice} />

        <HashRateBtc xAxes={time} yAxes={hashRate} btcPri={btcPrice} />

        <FearAndGreed />
      </div>
      <Footer />
    </>
  );
};

export default App;
