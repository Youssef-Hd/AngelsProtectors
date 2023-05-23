import { useState, useEffect } from "react";
import axios from "axios";
import "./OnDutyHome.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const OnDutyHome = () => {

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 2,
    initialSlide: 0,
   
  };


  const [ondutyData, setOnDutyData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/onduty");
        setOnDutyData(response.data.data);
      } catch (error) {
        console.error(error);
      }
      // console.log('Data',ondutyData)
    };
    fetchData();
  }, []);

  return (
    <div className="div-home">
   <Slider {...settings}>

      
        {ondutyData.map((onduty, index) => (
          <div key={onduty._id} className="images-styling">
            <img
              className="caseroul-image-style"
              src={onduty.image}
              alt={onduty.description}
            />
            <p className="caseroul-image-description">{onduty.location}</p>
          </div>

        ))}
   
      
        </Slider>
        </div>
             
  );
};

export default OnDutyHome;

//  <div className="swiper-container">
{
  /* <Swiper slidesPerView={4} spaceBetween={10} navigation> */
}
// {ondutydata.map((onduty, index) => (
// <SwiperSlide key={index}>
{
  /* <img className="caseroul-image-style" src={onduty.image} alt={onduty.description} /> */
}
//     </SwiperSlide>
//   ))}
// </Swiper>
// </div>

// import { useState, useEffect } from "react";
// import axios from "axios";
// import "./OnDutyHome.css";
// import SwiperCore, { Pagination, Navigation } from "swiper";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/swiper-bundle.min.css";
// // import "swiper/css";
// // import './Swiper.css'

// const OnDutyHome = () => {
//   const [ondutyData, setOnDutyData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/onduty");
//         setOnDutyData(response.data.data);
//       } catch (error) {
//         console.error(error);
//       }
//       // console.log('Data',ondutyData)
//     };
//     fetchData();
//   }, []);

//   return (
//     <div className="div-home">
//     <div className="div-carousel" >
//       {ondutyData.map((onduty) => (
//         <div key={onduty._id} className="images-styling">
//           <img
//             className="caseroul-image-style"
//             src={onduty.image}
//             alt={onduty.description}
//           />
//           <p className="caseroul-image-description">{onduty.location}</p>
//         </div>
//       ))}
//     </div>

//       </div>

//   );
// };

// export default OnDutyHome
