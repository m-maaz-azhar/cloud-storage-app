import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ setFiles, getAllFiles }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = async (e) => {
    setSearchQuery(e.target.value);

    if (e.target.value === "") {
      getAllFiles();
      return;
    }
    
    setFiles((prevFiles) =>
      prevFiles.filter((file) =>
        file.name.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );

  };

  return (
    <div className="flex items-center border rounded-md p-2 mt-2 mb-4 bg-[white] shadow-md">
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleSearch}
        className="border-none outline-none flex-1 px-2"
      />
      <FaSearch className="text-gray-400 cursor-pointer" />
    </div>
  );
};

export default SearchBar;
