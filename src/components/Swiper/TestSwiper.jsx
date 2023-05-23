import React, { useEffect, useState } from "react";
import axios from "axios";
import SwiperCore, { Pagination, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/swiper-bundle.min.css";
import "swiper/css";
import './Swiper.css'

SwiperCore.use([Pagination, Navigation]);

const ImageSlider = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Fetch data from the API using Axios
    axios
      .get("http://localhost:5000/api/onduty")
      .then((response) => {
        setImages(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  console.log('showimage',images)
  return (
    <div className="swiper-container">
      <Swiper slidesPerView={4} spaceBetween={10} navigation>
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img className="Image-slider" src={image.image} alt={`Image ${index}`} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageSlider;
