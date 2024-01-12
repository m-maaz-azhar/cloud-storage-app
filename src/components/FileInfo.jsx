import React, { useEffect, useState } from "react";
import { FiFile, FiDownload } from "react-icons/fi";
import moment from "moment";

function FileInfo({ fileId }) {
  const [file, setFile] = useState(null);

  const getFile = async () => {
    try {
      const response = await fetch(`https://cloud-storage-app-g87t.onrender.com/file/get/${fileId}`);
      const data = await response.json();
      setFile(data.file);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getFile();
  }, []);

  return (
    <div>
      {file && (
        <>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <FiFile className="text-gray-500 text-2xl" />
              <h2 className="text-lg font-medium text-gray-900">{file.name}</h2>
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <div>
              <span className="text-gray-600 pr-4">Size:</span>
              <span className="text-gray-600">
                {file.size < 1024
                  ? `${file.size} bytes`
                  : `${(file.size / 1024).toFixed(2)} KBs`}
              </span>
            </div>
            <div>
              <span className="text-gray-600 pr-4">Date:</span>
              <span className="text-sm text-gray-500">
                {moment(file.date).format("MMMM Do, YYYY")}
              </span>
            </div>
          </div>
          <a
            href={file.url}
            target="_blank"
            rel="noopener noreferrer"
            className="max-w-[130px] flex justify-center mt-4 flex items-center text-white bg-blue-500 hover:bg-blue-600 rounded-md px-4 py-2 text-sm"
          >
            <FiDownload className="mr-2" />
            Download
          </a>
        </>
      )}
    </div>
  );
}

export default FileInfo;
