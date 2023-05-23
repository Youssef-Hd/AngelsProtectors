import Nav from "../../components/Nav/Nav";
import logo from "../../assets/logo.png";
import Footer from "../../components/Footer/Footer";
import "./OnDuty.css";
import axios from "axios";
import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";
import React, { useState, useEffect, useRef } from "react";
import Button from "../../components/Button/Button";

const containerStyle = {
  width: "400px",
  height: "400px",
};

const OnDuty = () => {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [photo, setPhoto] = useState(null);
  const [showLocation, setShowLocation] = useState(false);
  const mapRef = useRef(null);

  useEffect(() => {
    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLatitude(latitude);
          setLongitude(longitude);
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  const handleFileChange = (event) => {
    setPhoto(event.target.files[0]);
  };

  const handleLocationSubmit = async () => {
    const formData = new FormData();
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);
    formData.append("photo", photo);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/location",
        formData
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleShowLocation = () => {
    if (latitude && longitude) {
      setShowLocation(true);
    } else {
      console.error("User location not available");
    }
  };

  const handleSaveMap = () => {
    if (latitude && longitude) {
      const mapImageURL = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=17&size=400x400&markers=color:red%7Clabel:You%7C${latitude},${longitude}&key=AIzaSyAFMeBhortuziszMT3prAJ4NMd9SaG07vw
      `;

      fetch(mapImageURL)
        .then((response) => response.blob())
        .then((blob) => {
          const objectURL = URL.createObjectURL(blob);

          const link = document.createElement("a");
          link.href = objectURL;
          link.download = "map_image.png";
          link.click();

          URL.revokeObjectURL(objectURL);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <div className="papa-div">
      <Nav />
      {/* <Button/> */}
      <img className="logo-onduty" src={logo} alt="main-logo" />
      <p className="p-onduty">
        {" "}
        By visiting this page, you have the opportunity to make a meaningful
        difference in the lives of stray dogs, and become a protector of these
        vulnerable creatures.{" "}
      </p>
      <label className="label">Which City </label>
      <input type="text" placeholder="Location" className="onduty-input" />
      <br />
      <label className="label-file">
        Share Images
        <input type="file" className="input-file" />{" "}
      </label>
      <br />
      <br />


      <label className="label">Description</label>
      <textarea
        placeholder="Kindly fill a detailed description of the case."
        className="description-textarea"
      />
      <div>
        {/* <h1>Upload Location</h1> */}
        <div className="location-button-div">
          <button className="location-button" onClick={handleShowLocation}>
            Show Location on Map
          </button>
        </div>
        <LoadScript
          googleMapsApiKey="AIzaSyAFMeBhortuziszMT3prAJ4NMd9SaG07vw
"
        >
          <br />

          {showLocation && (
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={{ lat: parseFloat(latitude), lng: parseFloat(longitude) }}
              zoom={17}
              onLoad={(map) => {
                mapRef.current = map;
              }}
            >
              <Marker
                position={{
                  lat: parseFloat(latitude),
                  lng: parseFloat(longitude),
                }}
              />
            </GoogleMap>
          )}
        </LoadScript>

        {showLocation && (
          <div>
            <div className="save-map-div">
              <button className="save-map-button" onClick={handleSaveMap}>
                Save Map
              </button>
            </div>
              <br />
            <label className="label">
              Kindly Save Your Location And attach It Below
            </label>

            <label className="label-file-map">
              <input
                className="input-file-map"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
            </label>
            {/* <h2>Your Location:</h2>
            <p>Latitude: {latitude}</p>
            <p>Longitude: {longitude}</p> */}
            <br />
            <br />

            <label className="submit-btn-label">
              <button className="submit-btn" onClick={handleLocationSubmit}>
                Submit
              </button>
            </label>
          </div>
        )}
        <Footer />
      </div>
    </div>
  );
};
export default OnDuty;
