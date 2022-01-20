import React, { Component } from 'react'
import Hover from 'react-3d-hover';
import '../styles/ChartComponentStyle.css'


class FearAndGreed extends Component {
    state = {
        fNgValue: '',
        fNgText: '',
        fNgStyle: '',
        hoverStyle: "FearAndGreed"
    }
    
    
        
    
    componentDidMount(){
        
        fetch('/fearandgreed').then(res => res.json()).then(item =>{
            // console.log(item.data[0].value)
            
            this.setState({
      
              fNgValue: item.data[0].value,
              fNgText:item.data[0].value_classification,
              flag: true,
            
            })
            if(item.data[0].value <= 20){
                this.setState({ fNgStyle: '#ff2600'})
            }
            else if(item.data[0].value <= 40){
                this.setState({ fNgStyle: '#ff8800'})
            }
            else if(item.data[0].value <= 60){
                this.setState({ fNgStyle: '#fff200'})
            }
            else if(item.data[0].value <= 80){
                this.setState({ fNgStyle: '#a6ff00'})
            }
            else if(item.data[0].value <= 100){
                this.setState({ fNgStyle: '#2bff00'})
            }
        
            
            
          })
          .catch(error => {
            console.log(error)
          });
       
        
    }
    render() { 
        return ( 
            <Hover  scale={1} perspective={580} speed={1000} max={20}  >
                
                <div className="FearAndGreed">
                    <h1>FearAndGreed</h1>
                    <p style={{color:this.state.fNgStyle}}>{this.state.fNgText}</p>
                    <h2 className="greedColor" style={{color:this.state.fNgStyle}}>{this.state.fNgValue}</h2>
                
                </div> 
        </Hover>
        
        );
    }
}
 
export default FearAndGreed;