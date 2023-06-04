import React from 'react';
import { BeatLoader } from 'react-spinners';

const MyComponent = () => {
  return (
    <div>
      <h1>Welcome to My App</h1>
      <BeatLoader color="#123abc" loading={true} />
    </div>
  );
};

export default MyComponent;









// import React from "react";
// import { useState } from "react";
// import axios from "axios";

// const Test = () => {
//   const [selectedInfo, setSelectedInfo] = useState({});
//   const [isUpdateMode, setIsUpdateMode] = useState(false);

//   const [newInfo, setNewInfo] = useState({
//     location: "",
//     description: "",
//     latitude: "",
//     longitude: "",
//     images: [],
//   });

//   const storedId = sessionStorage.getItem("id");

//   const handleFormSubmit = async (event) => {
//     event.preventDefault();

//     const formData = new FormData();
//     formData.append("location", newInfo.location);
//     formData.append("description", newInfo.description);
//     formData.append("latitude", newInfo.latitude);
//     formData.append("longitude", newInfo.longitude);

//     for (let i = 0; i < newInfo.images.length; i++) {
//       formData.append("images", newInfo.images[i]);
//     }

//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/location",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       if (response.status !== 200) {
//         throw new Error("Failed to post location");
//       }

//       setNewInfo({
//         location: "",
//         latitude: "",
//         description: "",
//         longitude: "",
//         images: [],
//       });
//     } catch (error) {
//       console.error("Error creating location:", error);
//     }
//   };

//   function handleImages(e) {
//     const filesArray = Array.from(e.target.files);
//     if (filesArray.length > 0) {
//       setNewInfo((prevInfo) => ({ ...prevInfo, images: filesArray }));
//     }
//   }

//   const handleUpdate = (info) => {
//     setSelectedInfo(info);
//     setIsUpdateMode(true);
//   };

//   return (
//     <div>
//       <form
//         ref={selectedInfo}
//         className="contact-formmm"
//         encType="multipart/form-data"
//       >
//         <input
//           className="onduty-input"
//           type="text"
//           value={newInfo.location}
//           onChange={(e) => setNewInfo({ ...newInfo, location: e.target.value })}
//           placeholder="Enter location"
//         />
//         <input
//           placeholder="Kindly fill a detailed description of the case."
//           className="description-textarea"
//           type="text"
//           value={newInfo.description}
//           onChange={(e) =>
//             setNewInfo({ ...newInfo, description: e.target.value })
//           }
//         />

//         <input
//           className="input-file"
//           type="file"
//           multiple
//           onChange={(e) => handleImages(e)}
//         />
//         <button className="buttonadd" onClick={handleFormSubmit}>
//           Add
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Test;
