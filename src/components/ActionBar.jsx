import React, { useState } from "react";
import { FiMail, FiInfo, FiTrash, FiStar } from "react-icons/fi";
import PopupModal from "./PopupModal";
import FileInfo from "./FileInfo";
import EmailForm from "./EmailForm";

const ActionBar = ({ selectedFile, getAllFiles, setLoading }) => {
  const [showInfo, setShowInfo] = useState(false);
  const [showMail, setShowMail] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://cloud-storage-app-g87t.onrender.com/file/remove?file_id=${selectedFile}`,
        {
          method: "DELETE",
        }
      );

      let data = await response.json();

      if (data.ok) {
        console.log("File deleted successfully.");
        getAllFiles();
      } else {
        console.error("File deletion failed.");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <aside className="fixed right-0 flex flex-col items-center justify-center gap-5 bg-[white] p-4 min-h-screen w-[100px] shadow-md">
      <div
        className="flex flex-col items-center justify-center cursor-pointer"
        onClick={() => setShowMail(true)}
      >
        <FiMail className="text-gray-500 text-2xl mb-2" />
      </div>
      <div
        className="flex flex-col items-center justify-center cursor-pointer"
        onClick={() => setShowInfo(true)}
      >
        <FiInfo className="text-gray-500 text-2xl mb-2" />
      </div>
      <div
        className="flex flex-col items-center justify-center cursor-pointer"
        onClick={handleDelete}
      >
        <FiTrash className="text-gray-500 text-2xl mb-2" />
      </div>
      <PopupModal isOpen={showMail} onClose={() => setShowMail(false)}>
        <EmailForm fileId={selectedFile} />
      </PopupModal>
      <PopupModal isOpen={showInfo} onClose={() => setShowInfo(false)}>
        <FileInfo fileId={selectedFile} />
      </PopupModal>
    </aside>
  );
};

export default ActionBar;
