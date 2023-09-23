import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Home.css";
import OnDutyHome from "../../components/SingleOnDuty/OnDutyHome";
import Footer from "../../components/Footer/Footer";
import Nav from "../../components/Nav/Nav";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelopesBulk } from "@fortawesome/free-solid-svg-icons";
import { BeatLoader } from "react-spinners";
import { useContext } from "react";
import ThemeContext from "../../ThemeContext";

const Home = () => {
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    getHome();
  }, []);

  const [homeImage, setHomeImage] = useState("");
  const [loading, setLoading] = useState(true); // Add loading state

  const getHome = async () => {
    const response = await axios.get(
      `https://angelsprotectorss.onrender.com/api/page/getPage/645f54fbdbe2f957c26726f6`
    );

    setHomeImage(response.data.data);
    setLoading(false);
  };
  return (
    <div className={`Daddy-div ${theme}`}>
      {loading ? ( // Render the BeatLoader while loading is true
        <BeatLoader className="Loader" color="#dbca72" loading={true} />
      ) : (
        <Nav />
      )}

      <div className="Hero-image">
        <div className="opacity-home">
          <h2 className="h2-home">Recent Posts</h2>
        </div>
      </div>
      <div>
        {loading ? ( // Render the BeatLoader while loading is true
          <BeatLoader className="Loader" color="#dbca72" loading={true} />
        ) : (
          <OnDutyHome />
        )}
      </div>
      <div className="div-p-btn">
        <p className="p-home">
          This platform was created for people to contribute helping stray dogs
          who are in need of rescuing all across Lebanon region.
        </p>
        <Link className="Link-home" to="/about">
          <button className="btn-home">About Us</button>
        </Link>
      </div>
      <div className="border-mid"></div>
      <div className="logo-div-home">
        <p className="label-logo">Visit Our OnDuty Page</p>
        <img className="logo-home" src={logo} alt="logo" />
        <br />
        <Link to="/onduty">
          <button className="btn-onduty-home">OnDuty</button>
        </Link>
      </div>
      <br />

      <div className="border-mid-second"></div>
      <div className="div-sos">
        <label className="sos-label">
          Looking for somewhere to adopt or directly report a case? check
          out our SOS page now!
        </label>
        <Link to="/sos">
          <button className="btn-sos-homepage">SOS</button>
        </Link>
      </div>
      <div className="border-mid-"></div>

      <div className="contact-div-icon-home">
        <Link className="link-home-contact" to="/contact">
          <span className="span-home-contact"> Contact Us!</span>
          <FontAwesomeIcon
            className="icon-home-email"
            icon={faEnvelopesBulk}
            size="2xl"
          />
        </Link>
      </div>
      <br />
      <br />
      {loading ? ( // Render the BeatLoader while loading is true
        <BeatLoader className="Loader" color="#dbca72" loading={true} />
      ) : (
        ""
      )}
      <Footer />
    </div>
  );
};

export default Home;
