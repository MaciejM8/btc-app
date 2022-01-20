import React from 'react'


import '../styles/ChartComponentStyle.css'
import logo1 from "../imgs/FlaskLogo.png"
import logo2 from "../imgs/Python.png"

import logo3 from "../imgs/React.png"
import logo4 from "../imgs/Chartjs.png"
import logo5 from "../imgs/glassnode.png"
import logo6 from "../imgs/CoinGecko.png"



const Footer = () => {
    return ( 
        <div className="footerWrap">
        <div className="footer">
            
            <img src={logo1} alt="Flask Logo" className="imgClass"></img>
            <img src={logo2} alt="Python Logo" className="imgClass"></img>
            
            <img src={logo3} alt="React logo" className="imgClass"></img>
            <img src={logo4} alt="Chartjs Logo" className="imgClass"></img>
            <img src={logo5} alt="Glassnode Logo" className="imgClass bigger"></img>
            <img src={logo6} alt="CoinGecko Logo" className="imgClass bigger"></img>

            </div>
            </div>
     );
}
 
export default Footer;