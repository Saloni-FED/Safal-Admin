import React, { useContext } from "react";
import './SearchBar.css'
import { AppContext } from "@/Context/AppContext";

const SearchBar = () => {
  const { searchQuery, setSearchQuery } = useContext(AppContext)
  return (
    <div className="searchBar">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search..."
      />
    </div>
  );
};

export default SearchBar;
