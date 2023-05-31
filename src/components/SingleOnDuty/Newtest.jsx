// import { useState, useEffect } from "react";
// import axios from "axios";

// const OnDutyy = () => {
//   const [ondutyData, setOnDutyData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("https://angelsprotectorss.onrender.com/api/onduty");
//         setOnDutyData(response.data.data);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchData();
//   }, []);

//   return (
//     <div>
//       {ondutyData.map((onduty) => (
//         <div key={onduty._id}>
//           <h3>{onduty.location}</h3>
//           <p>{onduty.description}</p>
//           <img src={onduty.image} alt={onduty.description} />
//         </div>
//       ))}
//     </div>
//   );
// };

// export default OnDutyy;
