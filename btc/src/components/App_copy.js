import React, { Component } from "react";
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

class App extends Component {
  state = {
    time: [],
    activeAd: [],
    btcPrice: [],
    feesRate: [],
    hashRate: [],
    newAd: [],

    newTimeArray: [],
    newBtcPriceArray: [],

    currentDate: new Date().toISOString().slice(0, 10),
    targetArray: "",
    value: "",

    chartFont: (defaults.font.family = "'Ultra', serif"),
    chartFontWeight: (defaults.font.weight = 100),
    chartFontSize: (defaults.font.size = 13),
    func: Chart.register(zoomPlugin),
  };

  componentDidMount() {
    fetch("/time")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data)
        this.setState({
          time: data,
        });
      })
      .catch((error) => {
        console.log(error);
      });

    fetch("/activeAd")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data)
        this.setState({ activeAd: data });
      })
      .catch((error) => {
        console.log(error);
      });

    fetch("/btcprice")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data)
        this.setState({ btcPrice: data });
      })
      .catch((error) => {
        console.log(error);
      });

    fetch("/feesrate")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data)
        this.setState({ feesRate: data });
      })
      .catch((error) => {
        console.log(error);
      });

    fetch("/hashrate")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data)
        this.setState({ hashRate: data });
      })
      .catch((error) => {
        console.log(error);
      });
    fetch("/new-ad")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data)
        this.setState({ newAd: data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleChange = (e) => {
    e.preventDefault();

    this.setState({
      value: e.target.value,
    });
  };

  handleClick = () => {
    let arrayOfTime = this.state.time;

    let slicer = this.state.value;
    let indexCutter = this.state.time.indexOf(slicer);

    let newBtcPriceArray = this.state.btcPrice.slice(indexCutter);
    let targetTime = arrayOfTime.slice(indexCutter);

    this.setState({
      newTimeArray: targetTime,
      newBtcPriceArray: newBtcPriceArray,
    });
    // console.log(this.state.newTimeArray);
    // console.log(this.state.time);
    // console.log(this.state.btcPrice);
    // console.log(newBtcPriceArray);
  };

  render() {
    const {
      time,
      btcPrice,
      newTimeArray,
      newBtcPriceArray,
      activeAd,
      feesRate,
      hashRate,
      newAd,
      currentDate,
    } = this.state;

    return (
      <>
        <div className="App">
          <VideoBg />
          <LivePrice />
          <ChartDate
            onClick={this.handleClick}
            onChange={this.handleChange}
            CurrentDate={currentDate}
          />

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
  }
}

export default App;
