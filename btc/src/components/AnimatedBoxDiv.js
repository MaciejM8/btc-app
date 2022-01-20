import React from "react";
import AnimatedBoxPart from "./AnimatedBoxPart";
import "../styles/ChartComponentStyle.css";

const AnimatedBox = (props) => {
  return (
    <div className="AnimatedBoxDiv">
      <AnimatedBoxPart
        LivePr={props.LivePr}
        DayVol={props.DayVol}
        MarkCap={props.MarkCap}
        
      />
    </div>
  );
};

export default AnimatedBox;
