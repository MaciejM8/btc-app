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
    czas: [],
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
    fetch("/czas")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data)
        this.setState({
          czas: data,
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

    console.log();
  };

  handleClick = () => {
    let arrayOfTime = this.state.czas;

    let slicer = this.state.value;
    let indexCutter = this.state.czas.indexOf(slicer);
    // console.log(indexCutter)
    let newBtcPriceArray = this.state.btcPrice.slice(indexCutter);
    let target = arrayOfTime.slice(indexCutter);

    this.setState({
      newTimeArray: target,
      newBtcPriceArray: newBtcPriceArray,
    });
    console.log(this.state.newTimeArray);
    console.log(this.state.czas);
    console.log(this.state.btcPrice);
    console.log(newBtcPriceArray);
  };

  render() {
    const { czas, btcPrice, newTimeArray, newBtcPriceArray } = this.state;

    return (
      <> 
        <div className="App">
          <VideoBg />
          <LivePrice />
          <ChartDate
            onClick={this.handleClick}
            onChange={this.handleChange}
            CurrentDate={this.state.CurrentDate}
          />

          {/* <button onClick={this.handleClick}></button> */}
          <BtcPriceChart
            xAxes={newTimeArray.length > 0 ? newTimeArray : czas}
            yAxes={newBtcPriceArray.length > 0 ? newBtcPriceArray : btcPrice}
          />

          <FeesRate
            xAxes={this.state.czas}
            yAxes={this.state.feesRate}
            btcPri={this.state.btcPrice}
          />

          <ActiveAdresses
            xAxes={this.state.czas}
            yAxes={this.state.activeAd}
            btcPri={this.state.btcPrice}
          />

          <NewAdresses
            xAxes={this.state.czas}
            yAxes={this.state.newAd}
            btcPri={this.state.btcPrice}
          />

          <HashRateBtc
            xAxes={this.state.czas}
            yAxes={this.state.hashRate}
            btcPri={this.state.btcPrice}
          />

          <FearAndGreed />
        </div>
        <Footer />
      </>
    );
  }
}

export default App;
