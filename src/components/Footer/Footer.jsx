import React from "react";
import "./Footer.css";
import tiny from '../../assets/tiny-logo.png'


const Footer = () => {



  return (
    <div className="Footer-Css" >
      <span className="Text-Footer"> Giving Voice To The Voiceless</span>
      <img className='tiny-logo' src={tiny} alt="tiny-logo" />
    </div>
  );
};

export default Footer;
