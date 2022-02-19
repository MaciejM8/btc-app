import React, { useState } from "react";

const ChartDate = (props) => {
  const [value, setValue] = useState([]);

  const handleChange = (e) => {
    console.log(`state changed ${e.target.value}`);
    setValue(e.target.value);
  };

  const handleClick = () => {
    props.setDateValue(value);

    // let indexCutter = time.indexOf(value);
    // let newBtcPriceArray = btcPrice.slice(indexCutter);
    // let targetTime = time.slice(indexCutter);

    // setNewBtcPriceArray(newBtcPriceArray);
    // setNewTimeArray(targetTime);
  };

  return (
    <div className="ChartDate">
      <p>Chart starting date</p>

      <input
        min="2009-01-03"
        max={props.CurrentDate}
        value={value}
        onChange={handleChange}
        onKeyDown={(e) => e.preventDefault}
        className="InputDate"
        type="date"
      />

      <button onClick={handleClick} className="submitBtn">
        Submit
      </button>
    </div>
  );
};

export default ChartDate;
