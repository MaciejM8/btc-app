import React, { Component } from "react";
import "../styles/ChartComponentStyle.css";

class Span30sAnim extends Component {
  state = {
    counter: this.props.number,
    spanClass: "Loading",
    spanLoaded: "Loading Loaded",
    spanLoadingMiddle: "LoadingMiddle",
    spanClassMiddle: "LoadingMiddle Loaded",
  };


  render() {
    const {
      counter,
      spanClass,
      spanLoaded,
      spanClassMiddle,
      spanLoadingMiddle,
    } = this.state;
    return (
      <>
        <div className="ContainerLoading">
          <span className={counter >= 5 ? spanLoaded : spanClass}></span>
          <span className={counter >= 11 ? spanLoaded : spanClass}></span>
          <span className={counter >= 17 ? spanClassMiddle : spanLoadingMiddle}>
            <p>{this.state.counter}</p>
          </span>
          <span className={counter >= 23 ? spanLoaded : spanClass}></span>
          <span className={counter >= 29 ? spanLoaded : spanClass}></span>
        </div>
      </>
    );
  }
}

export default Span30sAnim;
