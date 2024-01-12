import React, { useEffect, useState } from "react";
import { FiFile, FiDownload, FiLink } from "react-icons/fi";
import moment from "moment";
import { shortText } from "../utils";

function EmailForm({ fileId }) {
  const [file, setFile] = useState(null);
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const sendMail = async () => {
    try {
      if (email === "") {
        setMessage(null);
        return setError("Email is required");
      }
      const response = await fetch(`https://cloud-storage-app-g87t.onrender.com/file/mail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, file }),
      });
      const data = await response.json();
      setError(null);
      setMessage("Email sent successfully");
      console.log(data);
    } catch (error) {
      console.error(error);
      setMessage(null);
      setError("Something went wrong");
    }
  };

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
              <h2 className="text-lg font-medium text-gray-900">
                {shortText(file.name, 30)}
              </h2>
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
          <div className="flex align-center gap-3">
            <input
              type="email"
              placeholder="Enter Email"
              className="border-2 border-gray-300 p-2 mt-4 rounded-md focus:outline-none focus:border-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              onClick={sendMail}
              className="max-w-[120px] max-h-[44px] outline-none border-none flex justify-center mt-4 flex items-center text-white bg-blue-500 hover:bg-blue-600 rounded-md px-4 text-sm"
            >
              Email
            </button>
            {/* copy link */}
            <button
              onClick={() => {
                navigator.clipboard.writeText(file.url);
                setMessage("Link copied to clipboard");
                setError(null);
              }}
              className="max-w-[120px] max-h-[44px] outline-none border-none flex justify-center mt-4 flex items-center text-white bg-blue-500 hover:bg-blue-600 rounded-md px-4 text-sm"
            >
              <FiLink className="mr-2" />
              Copy Link
            </button>
          </div>
          {error && <div className="text-red-500 text-sm mt-4">{error}</div>}
          {message && (
            <div className="text-green-500 text-sm mt-4">{message}</div>
          )}
        </>
      )}
    </div>
  );
}

export default EmailForm;
