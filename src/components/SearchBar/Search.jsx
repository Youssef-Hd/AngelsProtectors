import { useState } from "react";
import axios from "axios";
import "./Search.css";
import { FaSearch } from "react-icons/fa";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    try {
      if (query.trim() === "") {
        setSearchResults([]);
        return;
      }
      const response = await axios.get(
        `https://angelsprotectorss.onrender.com/api/ngo`
      );
      const results = response.data.data;

      // Filter the results based on the searchQuery
      const filteredResults = results.filter((ngo) => {
        // Perform case-insensitive search on name and address
        const nameMatch = ngo.name.toLowerCase().includes(query.toLowerCase());
        const addressMatch = ngo.address
          .toLowerCase()
          .includes(query.toLowerCase());

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
    <div className="papa-div-searchbar">
      <div className="input-wrapper">
        <FaSearch id="search-icon" />

        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search"
        />

        {errorMessage && <p>{errorMessage}</p>}
      </div>

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

export default Search;
