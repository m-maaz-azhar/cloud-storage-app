import React, { useState } from "react";
import { FiFile } from "react-icons/fi";
import { shortText } from "../utils";

const FolderCard = ({ file, setSelectedFile, selectedFile }) => {
  const handleClick = (e) => {
    e.stopPropagation();
    setSelectedFile(file._id);
  };

  return (
    <div
      className={`cursor-pointer shadow-md w-[160px] h-[160px] flex flex-col items-center justify-center rounded-lg p-2 border border-gray-300 ${
        selectedFile === file._id ? "bg-[#4891f3] text-white" : "bg-white "
      }`}
      onClick={handleClick}
    >
      <FiFile className="text-6xl mb-4" fill="#fff" color="#4891f3" />
      <span>{shortText(file.name)}</span>
    </div>
  );
};

export default FolderCard;
