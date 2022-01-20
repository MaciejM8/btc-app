import React, { Component } from 'react';
import '../styles/ChartComponentStyle.css'


class Span30sAnim extends Component{

    state ={
        counter: 0,
        spanClass: "Loading",
        spanLoaded: "Loading Loaded",
        spanLoadingMiddle: "LoadingMiddle",
        spanClassMiddle: "LoadingMiddle Loaded",
    }



    increment = () => {
        this.setState(prevState => ({
          counter:  this.state.counter + 1
        }))
        if(this.state.counter === 30){
          this.setState({
            counter: 0
          })
        }
      }

    
    

    componentDidMount(){
        
        setInterval(this.increment, 1000)
    }


    render(){
        const { counter, spanClass, spanLoaded, spanClassMiddle, spanLoadingMiddle } = this.state
    return ( 
        <>
        <div className="ContainerLoading">
            
            <span className={counter >= 5 ? spanLoaded : spanClass}></span>
            <span className={counter >= 11 ? spanLoaded : spanClass}></span>
            <span  className=
            
            {counter >= 17 ? spanClassMiddle  : spanLoadingMiddle }
            
            >

              <p>{this.state.counter}</p>
              
              </span>
            <span className={counter >= 23 ? spanLoaded : spanClass}></span>
            <span className={counter >= 29 ? spanLoaded : spanClass}></span>
            
        </div>
    
        </>
    );
}}
 
export default Span30sAnim;