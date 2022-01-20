import React from "react";
import "../styles/ChartComponentStyle.css";
import { Line } from "react-chartjs-2";

const BtcPriceChart = (props) => {
  return (
    <div className="chartContainer">
      <Line
        height={800}
        width={1700}
        data={{
          labels: props.xAxes,
          datasets: [
            {
              label: "BTC Price",
              data: props.yAxes,
              borderWidth: 2,
              borderColor: "rgba(255, 255, 255, 1)",
              backgroundColor: "rgba(101, 217, 255, 0.7)",
              yAxisID: "y",
            },
          ],
        }}
        options={{
          color: "white",
          elements: {
            point: {
              radius: 3,
              pointStyle: "circle",
              hitRadius: 50,
            },
          },
          interaction: {
            position: "nearest",
            yAlline: "top",

            mode: "index",
            intersect: false,
            bodyFont: { size: 18, family: "Roboto" },
            padding: 10,
            backgroundColor: "rgba(098,098,098, 0.85)",
            caretSize: 10,
          },
          plugins: {
            tooltip: { titleFont: { size: 20, family: "Roboto" } },
            title: {
              display: true,
              font: { size: 30, weight: 100 },
              text: "BTC PRICE",
              color: "white",
            },
            zoom: {
              drag: false,
              limits: {
                y: { min: -20000, max: 68000 },
              },
              pan: {
                enabled: true,
                mode: "xy",
              },

              zoom: {
                drag: true,
                wheel: {
                  enabled: true,
                },
                pinch: {
                  enabled: true,
                },
                mode: "xy",
              },
            },
          },
          maintainAspectRatio: false,
          responsive: true,
          scales: {
            y: {
              offset: true,
              position: "right",
              min: -20000,
              grid: { display: false },
              ticks: { color: "white" },
            },

            x: {
              offset: true,
              grid: { display: false },
              ticks: {
                color: "white",
                // callback: function(value){
                //     const valueLegend = this.getLabelForValue(value);
                //     return valueLegend.slice(5,17);

                //   },
              },
            },
          },
        }}
      />
    </div>
  );
};

export default BtcPriceChart;
