import React from 'react'
import { Line } from 'react-chartjs-2';

import '../styles/ChartComponentStyle.css'


const HashRateBtc = (props) => {
    return ( 
    <div className="chartContainer">
        <Line
        
        data={{
            labels: props.xAxes,
            datasets:[
              {
              label: "BTC HashRate/second",
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
            maintainAspectRatio: false,
            responsive: true,
            elements:{
              point:{
                radius:2,
                pointStyle:"circle",
                hitRadius: 100,
                
              
              
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
                    font:{size:30,weight:100},
                    display: true,
                    text: 'HASH RATE + BTC PRICE',
                    color:'white'
                },
                zoom: {
                  limits: {
                    y1: {min: -25000, max: 80000},
                    y: {min:45950746419676000000,
                      max:240519419579320000000,},},
                  drag:false,
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
            
            
            scales: {
              
              y1: {
                offset: true,
                position: 'right',
                max: 80000,
                min: -25000,
                grid:{display:false},
                ticks: {
                  color:'white'},
              },
              y:{
                
                min:45950746419676000000,
                max:208519419579320000000,
                grid:{display:false},
                ticks: {
                  color:'white'},
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
 
export default HashRateBtc;