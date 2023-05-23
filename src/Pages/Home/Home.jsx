import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Home.css";
// import ImageSlider from '../components/Carousel/ImageSlider'
// import { SliderData } from "../components/Carousel/SliderData";
import OnDutyHome from "../../components/SingleOnDuty/OnDutyHome";
import Footer from "../../components/Footer/Footer";
import Nav from "../../components/Nav/Nav";
import { Link } from "react-router-dom";

const Home = () => {
  useEffect(() => {
    getHome();
  }, []);

  // const [home, setHome] = useState("");
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
        <Link to='/about' >
        <button className="btn-home">About Us</button>
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default Home;

