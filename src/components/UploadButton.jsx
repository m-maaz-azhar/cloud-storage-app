import React, { useRef } from "react";
import { FiUpload } from "react-icons/fi";

function UploadButton({ user, getAllFiles, setLoading }) {
  const fileInputRef = useRef(null);

  const handleUpload = async () => {
    setLoading(true);
    const file = fileInputRef.current.files[0];

    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch(
          `https://cloud-storage-app-g87t.onrender.com/file/upload?user_id=${user._id}`,
          {
            method: "POST",
            body: formData,
          }
        );

        let data = await response.json();

        if (data.ok) {
          console.log("File uploaded successfully.");
          getAllFiles();
        } else {
          console.error("File upload failed.");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <input
        type="file"
        style={{ display: "none" }}
        onChange={handleUpload}
        ref={fileInputRef}
      />
      <button
        className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        onClick={() => fileInputRef.current.click()}
      >
        <FiUpload className="mr-2" />
        Upload
      </button>
    </div>
  );
}

export default UploadButton;
