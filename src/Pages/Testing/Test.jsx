
import { useState } from "react";
import axios from "axios";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/ngo`);
      const results = response.data.data;
      
      // Filter the results based on the searchQuery
      const filteredResults = results.filter((ngo) => {
        // Perform case-insensitive search on name and address
        const nameMatch = ngo.name.toLowerCase().includes(searchQuery.toLowerCase());
        const addressMatch = ngo.address.toLowerCase().includes(searchQuery.toLowerCase());
        return nameMatch || addressMatch;
      });
  
      setSearchResults(filteredResults);
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data);
      } else {
        setErrorMessage("An error occurred. Please try again.");
      }
    }
  };
  

  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search by name or location"
      />
      <button onClick={handleSearch}>Search</button>

      {errorMessage && <p>{errorMessage}</p>}

      <ul>
        {searchResults.map((ngo) => (
          <li key={ngo._id}>
            <h3>{ngo.name}</h3>
            <p>Address: {ngo.address}</p>
            <p>Phone Number: {ngo.phoneNumber}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBar;





// import { useState } from "react";
// import axios from "axios";
// import { Navigate } from "react-router-dom";

// const Register = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [redirectToLogin, setRedirectToLogin] = useState(false);

//   const handleRegister = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/user/register",
//         {
//           name,
//           email,
//           password,
//           phoneNumber,
//         }
//       );

//       const user = response.data;
//       console.log(user); // Handle the user object as needed

//       setRedirectToLogin(true);
//       // Redirect the user or perform any other actions
//     } catch (error) {
//       if (error.response && error.response.data) {
//         setErrorMessage(error.response.data);
//       } else {
//         setErrorMessage("An error occurred. Please try again.");
//       }
//     }
//   };
//   if (redirectToLogin) {
//     return <Navigate to="/login" replace />;
//   }

//   return (
//     <div>
//       <h2>Register</h2>
//       <form onSubmit={handleRegister}>
//         <div>
//           <label>Name:</label>
//           <input
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Email:</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Password:</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Phone Number:</label>
//           <input
//             type="text"
//             value={phoneNumber}
//             onChange={(e) => setPhoneNumber(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <button type="submit">Register</button>
//         </div>
//       </form>
//       {errorMessage && <p>{errorMessage}</p>}
//     </div>
//   );
// };

// export default Register;

// import React, { useState, useEffect } from "react";
// import axios from "axios";

// function NgoSearch() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [data, setData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/ngo");
//       setData(response.data);
//       setFilteredData(response.data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   const handleInputChange = (event) => {
//     setSearchTerm(event.target.value);
//     filterData(event.target.value);
//   };

//   const filterData = (searchTerm) => {
//     if (searchTerm.trim() === "") {
//       setFilteredData(data);
//     } else {
//       const filteredResults = data.filter((item) =>
//         item.name.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//       setFilteredData(filteredResults);
//     }
//   };
//   return (
//     <div>
//       <input
//         type="text"
//         placeholder="Search"
//         value={searchTerm}
//         onChange={handleInputChange}
//       />
//       <ul>
//         {filteredData.map((item) => (
//           <li key={item._id}>{item.name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default NgoSearch;

// import React, { useState } from "react";
// import "./Test.css";
// import {IoArrowRedoCircleOutline} from 'react-icons/fa'
// import { IoArrowRedoCircleOutline } from "react-icons/io5";

// export const Test = () => {
//   const [click, setClick] = useState(null);
//   const toggle = (i) => {
//     if (click === i) {
//       return setClick(null);
//     }
//     setClick(i);
//   };
//   return (
//     <div>
//       <div className="accordion">

//         content
//         {Sos.map((item, i) => (
//           <div className="name-sos" onClick={() => toggle(i)}>
//             <h2>{item.Name}</h2>
//             <span>
//               {click === i ? (
//                 <IoArrowRedoCircleOutline className="up-arrow" />
//               ) : (
//                 <IoArrowRedoCircleOutline className="down-arrow" />
//               )}
//             </span>
//             <div className={click === i ? "adress-sos.show" : "adress-sos"}>
//               {item.Adress}
//               <div className="phone-sos">{item.phoneNumber}</div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// const Sos = [
//   {
//     Name: " Animals Lebanon",
//     phoneNumber: +9611751678,
//     Adress: "Hamra, Beirut",
//   },
//   {
//     Name: " Mt Lebanon Dog Shelter ",
//     phoneNumber: 2472482,
//     Adress: "Aley, Mount Lebanon",
//   },
//   {
//     Name: " Beta Lebanon",
//     phoneNumber: 70-248765,
//     Adress: "Baabda",
//   },
//   {
//     Name: " Adopt Dont Shop",
//     phoneNumber: +96171533202,
//     Adress: "Unavailable",
//   },
//   {
//     Name: " CARE International in Lebanon",
//     phoneNumber: "01381775",
//     Adress: "Beirut-Badaro",
//   },
//   {
//     Name: " Animal Lives Lebanon",
//     phoneNumber: 81869264,
//     Adress: "Lebanon-Tyre",
//   },
//   {
//     Name: "The Kennel Club of Lebanon",
//     phoneNumber: "01303145",
//     Adress: "Lebanon-Beirut",
//   },
// ];

// export default Test;

// import React, { useState, useEffect, useRef } from "react";
// import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";
// import axios from "axios";

// const containerStyle = {
//   width: "400px",
//   height: "400px",
// };

// const Test = () => {
//   const [latitude, setLatitude] = useState("");
//   const [longitude, setLongitude] = useState("");
//   const [photo, setPhoto] = useState(null);
//   const [showLocation, setShowLocation] = useState(false);
//   const mapRef = useRef(null);

//   useEffect(() => {
//     // Get user's current location
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           setLatitude(latitude);
//           setLongitude(longitude);
//         },
//         (error) => {
//           console.error(error);
//         }
//       );
//     } else {
//       console.error("Geolocation is not supported by this browser.");
//     }
//   }, []);

//   const handleFileChange = (event) => {
//     setPhoto(event.target.files[0]);
//   };

//   const handleLocationSubmit = async () => {
//     const formData = new FormData();
//     formData.append("latitude", latitude);
//     formData.append("longitude", longitude);
//     formData.append("photo", photo);

//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/location",
//         formData
//       );
//       console.log(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleShowLocation = () => {
//     if (latitude && longitude) {
//       setShowLocation(true);
//     } else {
//       console.error("User location not available");
//     }
//   };

//   const handleSaveMap = () => {
//     if (latitude && longitude) {
//       const mapImageURL = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=17&size=400x400&markers=color:red%7Clabel:You%7C${latitude},${longitude}&key=AIzaSyAFMeBhortuziszMT3prAJ4NMd9SaG07vw
//       `;

//       fetch(mapImageURL)
//         .then((response) => response.blob())
//         .then((blob) => {
//           const objectURL = URL.createObjectURL(blob);

//           const link = document.createElement("a");
//           link.href = objectURL;
//           link.download = "map_image.png";
//           link.click();

//           URL.revokeObjectURL(objectURL);
//         })
//         .catch((error) => {
//           console.error(error);
//         });
//     }
//   };

//   return (
//     <div>
//       <h1>Upload Location</h1>
//       <button onClick={handleShowLocation}>Show Location on Map</button>

//       <LoadScript
//         googleMapsApiKey="AIzaSyAFMeBhortuziszMT3prAJ4NMd9SaG07vw
// "
//       >
//         {showLocation && (
//           <GoogleMap
//             mapContainerStyle={containerStyle}
//             center={{ lat: parseFloat(latitude), lng: parseFloat(longitude) }}
//             zoom={17}
//             onLoad={(map) => {
//               mapRef.current = map;
//             }}
//           >
//             <Marker
//               position={{
//                 lat: parseFloat(latitude),
//                 lng: parseFloat(longitude),
//               }}
//             />
//           </GoogleMap>
//         )}
//       </LoadScript>

//       {showLocation && (
//         <div>
//           <h2>Your Location:</h2>
//           <p>Latitude: {latitude}</p>
//           <p>Longitude: {longitude}</p>
//           <input type="file" accept="image/*" onChange={handleFileChange} />
//           <button onClick={handleLocationSubmit}>Submit Photo</button>
//           <button onClick={handleSaveMap}>Save Map</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Test;

// http://localhost:5000/api/location
// AIzaSyAFMeBhortuziszMT3prAJ4NMd9SaG07vw
// import React, { useState } from 'react';
// import axios from 'axios';
// import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';

// const containerStyle = {
//   width: '400px',
//   height: '400px',
// };

// const center = {
//   lat: 0,
//   lng: 0,
// };

// const Test = () => {
//   const [latitude, setLatitude] = useState(0);
//   const [longitude, setLongitude] = useState(0);
//   const [photo, setPhoto] = useState(0);
//   const [markerPosition, setMarkerPosition] = useState(null);

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Attach location data to the request body
//     const locationData = { latitude, longitude };

//     // Send the location data to the backend API
//     axios
//       .post('http://localhost:5000/api/location', locationData)
//       .then((res) => console.log(res.data))
//       .catch((err) => console.log(err));
//   };

//   const handleLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const lat = position.coords.latitude;
//           const lng = position.coords.longitude;
//           setLatitude(lat);
//           setLongitude(lng);
//           setMarkerPosition({ lat, lng });
//         },
//         (error) => {
//           console.log(error.message);
//         }
//       );
//     } else {
//       console.log('Geolocation is not supported by this browser.');
//     }
//   };

//   return (
//     <div>
//       <h1>Location Form</h1>
//       <form onSubmit={handleSubmit}>
//         <button type="button" onClick={handleLocation}>
//           Get Current Location
//         </button>
//         <br />
//         <label htmlFor="latitude">Latitude:</label>
//         <input
//           type="text"
//           id="latitude"
//           value={latitude}
//           onChange={(e) => setLatitude(e.target.value)}
//         />
//         <br />
//         <label htmlFor="longitude">Longitude:</label>
//         <input
//           type="text"
//           id="longitude"
//           value={longitude}
//           onChange={(e) => setLongitude(e.target.value)}
//         />
//         <br />
//         <button type="submit">Submit</button>
//       </form>
//       <LoadScript googleMapsApiKey="AIzaSyAFMeBhortuziszMT3prAJ4NMd9SaG07vw">
//         <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
//           {markerPosition && <Marker position={markerPosition} />}
//         </GoogleMap>
//       </LoadScript>
//     </div>
//   );
// };

// export default Test;

//
// import React, { useState } from 'react';
// import axios from 'axios';
// import { MapContainer, Marker, TileLayer } from 'react-leaflet';

// const LocationForm = () => {
//   const [latitude, setLatitude] = useState('');
//   const [longitude, setLongitude] = useState('');
//   const [photo, setPhoto] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const formData = new FormData();
//       formData.append('latitude', latitude);
//       formData.append('longitude', longitude);
//       formData.append('photo', photo);

//       // Make an API call to your backend endpoint
//       const response = await axios.post('/api/locations', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       // Handle the response or perform any necessary actions
//       console.log(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleLocationClick = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           setLatitude(position.coords.latitude);
//           setLongitude(position.coords.longitude);
//         },
//         (error) => {
//           console.error(error);
//         }
//       );
//     } else {
//       console.error('Geolocation is not supported by this browser.');
//     }
//   };

//   const handlePhotoChange = (e) => {
//     setPhoto(e.target.files[0]);
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <button type="button" onClick={handleLocationClick}>
//           Get Location
//         </button>
//         <input type="file" accept="image/*" onChange={handlePhotoChange} />
//         <button type="submit">Mark Location</button>
//       </form>
//       {latitude && longitude && (
//         <MapContainer center={[latitude, longitude]} zoom={13} style={{ height: '400px' }}>
//           <TileLayer
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             attribution="Map data &copy; <a href='https://www.openstreetmap.org/'> OpenStreetMap </a> contributors"
//           />
//           <Marker position={[latitude, longitude]}></Marker>
//         </MapContainer>
//       )}
//     </div>
//   );
// };

// export default LocationForm;

// export default Test
