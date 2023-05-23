import { useState } from "react";
import { SearchResultsList } from "../../components/SearchBar/SearchResultList.jsx";
import { SearchBar } from "./SearchBar.jsx";

function Result() {
  const [results, setResults] = useState([]);

  return (
    <div className="Result">
      <div className="search-bar-container">
        <SearchBar setResults={setResults} />
        {results && results.length > 0 && (
          <SearchResultsList results={results} />
        )}
      </div>
    </div>
  );
}

export default Result;
