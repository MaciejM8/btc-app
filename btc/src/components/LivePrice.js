
import React, { Component } from 'react';
import '../styles/ChartComponentStyle.css'
import AnimatedBoxDiv from './AnimatedBoxDiv';





class LivePrice extends Component {
    state={
      
        LivePrice:'Refresh / 30s ',
        DayVolume:'Refresh / 30s ',
        MarketCap:'Refresh / 30s ',
        
        
    }

    setData = () => {
      fetch('/ticker').then(res => res.json()).then(data =>{
              console.log(data)
              this.setState(
                {
                  LivePrice: data.bitcoin.usd.toLocaleString() +' $',
                  DayVolume: Math.floor(data.bitcoin.usd_24h_vol).toLocaleString() +' $',
                  MarketCap: Math.floor(data.bitcoin.usd_market_cap).toLocaleString() +' $',
                  
                }
                
                )
              
            })
            .catch(error => {
              console.log(error)
            })
            
      };

    
      

    componentDidMount(){
      
      setInterval(this.setData, 30000)
      
       

    };
    
    
    render() { 
        return ( 
        <>
          
          <div className="btcTicker" >
            
            <h1>"BTC APP"</h1>
            
              
              
              
              <AnimatedBoxDiv  LivePr={this.state.LivePrice} DayVol={this.state.DayVolume} MarkCap={this.state.MarketCap}/>
          </div>
        
        </>
          );
    }
}
 

 
export default LivePrice;