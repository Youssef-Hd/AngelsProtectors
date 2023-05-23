import { useState } from "react";
import { FaSearch } from "react-icons/fa";

import "./SearchBar.css"

export const SearchBar = ({ setResults }) => {
  const [input, setInput] = useState("");

  const fetchData = (value) => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => {
        const results = json.filter((user) => {
          return (
            value &&
            user &&
            user.name &&
            user.name.toLowerCase().includes(value)
          );
        });
        setResults(results);
      });
  };

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };

  return (
    <div className="input-wrapper">
      <FaSearch id="search-icon" />
      <input
        placeholder="Type to search..."
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};


const Sos = [
  {
    Name: " Animals Lebanon",
    phoneNumber: +9611751678,
    Adress: "Hamra, Beirut",
  },
  {
    Name: " Mt Lebanon Dog Shelter ",
    phoneNumber: 2472482,
    Adress: "Aley, Mount Lebanon",
  },
  {
    Name: " Beta Lebanon",
    phoneNumber: 70 - 248765,
    Adress: "Baabda",
  },
  {
    Name: " Adopt Dont Shop",
    phoneNumber: +96171533202,
    Adress: "Unavailable",
  },
  {
    Name: " CARE International",
    phoneNumber: "01381775",
    Adress: "Beirut-Badaro",
  },
  {
    Name: " Animal Lives Lebanon",
    phoneNumber: 81869264,
    Adress: "Lebanon-Tyre",
  },
  {
    Name: "The Kennel Club of Lebanon",
    phoneNumber: "01303145",
    Adress: "Lebanon-Beirut",
  },
];
