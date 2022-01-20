import React from 'react'
import '../styles/ChartComponentStyle.css'
import { Line } from 'react-chartjs-2';






const FeesRate = (props) => {
    return ( 
    <div className="chartContainer">
        <Line
        height={800}
        width={1700}
        data={{
            labels: props.xAxes,
            datasets:[
              {
              label: "BTC Fees Rates",
              data: props.yAxes,
              borderWidth: 1.2,
              borderColor: "rgba(127, 255, 56, 0.7)",
              backgroundColor: "rgba(255, 82, 131, 1)",
              yAxisID: 'y',
          },
            {
              label: "BTC Price",
              data: props.btcPri,
              borderWidth: 1,
              borderColor: "rgba(255, 255, 255, 1)",
              backgroundColor: "rgba(101, 217, 255, 0.7)",
              yAxisID: 'y1',
        
          }
          
        ]}}
        options= {{
          color:'white',
            elements:{
              point:{
                radius:3,
                pointStyle:"circle",
                hitRadius: 50,
                
              
              
              }},
            interaction: {
              position: "nearest",
              yAlline: "top",
              
              mode: 'index',
              intersect: false,
              bodyFont:{size:18,family:'Roboto'},
              padding:10,
              backgroundColor: "rgba(098,098,098, 0.85)",
              caretSize:10,
              
  
            },
              plugins: {
                tooltip:{titleFont:{size:20,family:'Roboto'}},
                title: {
                  display: true,
                  font:{size:30,weight:100},
                  text: 'FEES RATE + BTC PRICE',
                  color:'white'
                },
                zoom: {
                  drag:false,
                  limits: {
                    y1: {min: -35000, max: 80000},
                    y: {min: -10, max: 400},},
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
                      enabled: true
                    },
                    mode: 'xy',
                  }
                }
              },
            maintainAspectRatio: false,
            responsive: true,
            scales: {
              
              y1: {
                ticks: {
                  color:'white'},
                offset: true,
                position: 'right',
                min: -35000,
                grid:{display:false},
              },
              y:{
                ticks: {
                  color:'white'},
                
                grid:{display:false},
              },
              x: {
                offset: true,
                grid:{display:false},
                ticks: {
                  color:'white',
                  // callback: function(value){
                  //     const valueLegend = this.getLabelForValue(value);
                  //     return valueLegend.slice(5,17);
                      
                  //   },
                    
                    },
            }},
            }} 
        />

    </div>);
}
 
export default FeesRate;