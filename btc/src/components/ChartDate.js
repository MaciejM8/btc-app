import React from "react";

const ChartDate = (props) => {
  // trzeba zmienic tablice czas odcinajac od Value w dol z wylaczeniem value
  // this.setState(prevState => {
  //     return {foo: {...prevState.foo, a: "updated"}};
  // });

  return (
    <div className="ChartDate">
      <p>Chart starting date</p>

      <input
        min="2009-01-03"
        max={props.CurrentDate}
        value={props.Value}
        onChange={props.onChange}
        onKeyDown={(e) => e.preventDefault}
        className="InputDate"
        type="date"
      />

      <button onClick={props.onClick} className="submitBtn">
        Submit
      </button>
    </div>
  );
};

export default ChartDate;
