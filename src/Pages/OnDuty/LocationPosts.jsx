import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";
import Nav from "../../components/Nav/Nav";
import logo from "../../assets/logo.png";
import Footer from "../../components/Footer/Footer";
import "./LocationPosts.css";
import { useNavigate } from "react-router-dom";



const containerStyle = {
  width: "600px",
  height: "400px",
};

const LocationPosts = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [mapImage, setMapImage] = useState(null);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [selectedInfo, setSelectedInfo] = useState({});
  const [showLocation, setShowLocation] = useState(false);
  const [newInfo, setNewInfo] = useState({
    location: "",
    description: "",
    latitude: "",
    longitude: "",
    images: [],
  });

  const mapRef = useRef(null);
  const navigate = useNavigate();
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

  useEffect (() => {
    if (!storedId){
      navigate('/login')
    }
  })

  function handleImages(e) {
    const filesArray = Array.from(e.target.files);
    if (filesArray.length > 0) {
      setNewInfo((prevInfo) => ({ ...prevInfo, images: filesArray }));
    }
  }

  const handleFileChange = (event) => {
    setMapImage(event.target.files[0]);
  };

  const uploadMapImage = async (mapImage) => {
    try {
      const formData = new FormData();
      formData.append("photo", mapImage);

      const response = await axios.post(
        "https://angelsprotectorss.onrender.com/api/mapImage", // Replace with your backend endpoint for uploading map image
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Assuming the response from the server contains the URL for the map image
      const mapImageId = response.data.data._id;
      console.log("MAPIMAGE", response);
      return mapImageId;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  const storedId = sessionStorage.getItem("id");

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const mapImageId = await uploadMapImage(mapImage);

    const formData = new FormData();
    formData.append("location", newInfo.location);
    formData.append("description", newInfo.description);
    formData.append("latitude", newInfo.latitude);
    formData.append("longitude", newInfo.longitude);
    formData.append("mapImage", mapImageId);
    formData.append("user", storedId);

    for (let i = 0; i < newInfo.images.length; i++) {
      formData.append("images", newInfo.images[i]);
    }

    try {
      const response = await axios.post(
        "https://angelsprotectorss.onrender.com/api/location",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status !== 200) {
        throw new Error("Failed to post location");
      }

      setNewInfo({
        location: "",
        latitude: "",
        description: "",
        longitude: "",
        images: [],
      });
    } catch (error) {
      console.error("Error creating location:", error);
    }
  };

  const handleUpdate = (info) => {
    setSelectedInfo(info);
    setIsUpdateMode(true);
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
      const mapImageURL = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=17&size=400x400&markers=color:red%7Clabel:You%7C${latitude},${longitude}&key=AIzaSyAFMeBhortuziszMT3prAJ4NMd9SaG07vw`;

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
      <img className="logo-onduty" src={logo} alt="main-logo" />
      <p className="p-onduty">
        By visiting this page, you have the opportunity to make a meaningful
        difference in the lives of stray dogs and become a protector of these
        vulnerable creatures.
      </p>
      <form
        ref={selectedInfo}
        className="contact-formmm"
        encType="multipart/form-data"
      >
        {" "}
        <label className="label">Which City</label>
        <input
          className="onduty-input"
          type="text"
          value={newInfo.location}
          onChange={(e) => setNewInfo({ ...newInfo, location: e.target.value })}
          placeholder="Enter location"
        />
        <br />
        <label className="label-file">
          Share Images
          <input
            className="input-file"
            type="file"
            multiple
            onChange={(e) => handleImages(e)}
          />
        </label>
        <br />
        <br />
        <label className="label">Description</label>
        <input
          placeholder="Kindly fill a detailed description of the case."
          className="description-textarea"
          type="text"
          value={newInfo.description}
          onChange={(e) =>
            setNewInfo({ ...newInfo, description: e.target.value })
          }
        />
        <div>
          <div className="location-button-div">
            <button
              className="location-button"
              onClick={(e) => {
                e.preventDefault();
                handleShowLocation();
              }}
            >
              Show Location on Map
            </button>
          </div>
          <LoadScript googleMapsApiKey="AIzaSyAFMeBhortuziszMT3prAJ4NMd9SaG07vw">
            <br />
            {showLocation && (
              <div className="map-position">
                <GoogleMap
                  mapContainerStyle={containerStyle}
                  center={{
                    lat: parseFloat(latitude),
                    lng: parseFloat(longitude),
                  }}
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
              </div>
            )}
          </LoadScript>

          {showLocation && (
            <div>
              <div className="save-map-div">
                <button
                  className="save-map-button"
                  onClick={(e) => {
                    e.preventDefault();
                    handleSaveMap();
                  }}
                >
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
              <br />
              <br />
              <label className="submit-btn-label">
                <button className="submit-btn" onClick={handleFormSubmit}>
                  Submit
                </button>
              </label>
            </div>
          )}
          <div className="footer-onduty">
          <Footer />
          </div>
        </div>
      </form>
    </div>
  );
};

export default LocationPosts;
