import React from "react";
import "./Footer.css";
import { useState, useEffect } from "react";
import tiny from '../../assets/tiny-logo.png'


const Footer = () => {
const [footer, setFooter] = useState( )



  return (
    <div className="Footer-Css" >
      <span className="Text-Footer"> Giving Voice To The Voiceless</span>
      <img className='tiny-logo' src={tiny} alt="tiny-logo" />
    </div>
  );
};

export default Footer;
