import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Home.css";
import OnDutyHome from "../../components/SingleOnDuty/OnDutyHome";
import Footer from "../../components/Footer/Footer";
import Nav from "../../components/Nav/Nav";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

const Home = () => {
  useEffect(() => {
    getHome();
  }, []);

  const [homeImage, setHomeImage] = useState("");

  const getHome = async () => {
    const response = await axios.get(
      `http://localhost:5000/api/page/getPage/645f54fbdbe2f957c26726f6`
    );

    setHomeImage(response.data.data);
  };
  return (
    <div className="Daddy-div">
      <Nav />

      <div className="Hero-image">
        <div className="opacity-home">
          <h2 className="h2-home">Recent Posts</h2>
        </div>
      </div>
      <div>
        <OnDutyHome />
      </div>
      <div className="border-mid"></div>
      <div className="div-p-btn">
        <p className="p-home">
          This platform was created for people to contribute helping stray dogs
          who are in need of rescuing all across Lebanon region.
        </p>
        <Link to="/about">
          <button className="btn-home">About Us</button>
        </Link>
      </div>
      <div className="border-mid"></div>
      <p className="label-logo">Visit Our OnDuty Page</p>
      <div className="logo-div">
        <img className="logo-home" src={logo} alt="logo" />
        <br />
        <Link to="/onduty">
          <button className="btn-onduty-home">OnDuty</button>
        </Link>
      </div>
      <br />

      <div className="border-mid"></div>
      <div className="div-sos">
        <label className="sos-label">
          Looking for Somewhere To Adopt Or Directly Report A Case? <br/> Check Out
          Our SOS Page Now!
        </label>
        <Link to='/sos' >
          <button className="btn-sos-homepage">SOS</button>
        </Link>
      </div>
      <div>
      <Link>
        <h2>For Further Info Contact Us!</h2>
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
