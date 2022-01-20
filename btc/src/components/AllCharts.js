import React from "react";

import FeesRate from "./FeesRate";
import ActiveAdresses from "./ActiveAdresses";
import BtcPriceChart from "./BtcPriceChart";
import HashRateBtc from "./HashRateBtc";
import NewAdresses from "./NewAdresses";

const AllCharts = () => {
  return (
    <>
      <BtcPriceChart xAxes={this.state.czas} yAxes={this.state.btcPrice} />

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
    </>
  );
};

export default AllCharts;
