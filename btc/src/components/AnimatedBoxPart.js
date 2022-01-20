import React from "react";
import "../styles/ChartComponentStyle.css";
import Hover from "react-3d-hover";
import Span30sAnim from "../components/Span30sAnim";

const AnimatedBoxPart = (props) => {
  return (
    <>
      <Hover scale={1} perspective={580} speed={1000} max={20}>
        <div className="AnimatedBoxPart">
          <Span30sAnim />

          <span>
            <p>Actual Bitcoin Price</p>
            {props.LivePr}
          </span>
        </div>
      </Hover>
      <Hover scale={1} perspective={580} speed={1000} max={20}>
        <div className="AnimatedBoxPart">
          <Span30sAnim />
          <span>
            <p>Daily Volume</p>
            {props.DayVol}
          </span>
        </div>
      </Hover>
      <Hover scale={1} perspective={580} speed={1000} max={20}>
        <div className="AnimatedBoxPart">
          <Span30sAnim />
          <span>
            <p>Total Market Cap</p>
            {props.MarkCap}
          </span>
        </div>
      </Hover>
    </>
  );
};

export default AnimatedBoxPart;
