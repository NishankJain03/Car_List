// SearchBar.js
import React, { useState } from 'react';
import './SearchBar.css'
function SearchBar({ onSearch }) {
  const [searchText, setSearchText] = useState('');

  const handleInputChange = (e) => {
    const text = e.target.value;
    setSearchText(text);
    onSearch(text);
  };

  const handleClearClick = () => {
    setSearchText('');
    onSearch(''); // Call onSearch with an empty string to clear the search results
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search for cars..."
        value={searchText}
        onChange={handleInputChange}
      />
      {searchText && (
        <button className="clear-button" onClick={handleClearClick}>
          Clear
        </button>
      )}
    </div>
  );
}

export default SearchBar;
