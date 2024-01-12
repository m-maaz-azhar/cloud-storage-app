import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { updateUser } from "../../store/actions/userActions";
import DashboardLayout from "../../components/DashboardLayout";
import ActionBar from "../../components/ActionBar";
import SearchBar from "../../components/SearchBar";
import FolderCard from "../../components/FolderCard";
import UploadButton from "../../components/UploadButton";
import { withSessionSsr } from "../api/lib/withSession";
import Loader from "../../components/Loader";

function Dashboard({ user, session }) {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const getAllFiles = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://cloud-storage-app-g87t.onrender.com/file/get?user_id=${user._id}`
      );
      const data = await res.json();
      setFiles(data.files);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllFiles();
  }, []);

  return (
    <DashboardLayout user={user}>
      <div className="flex justify-between">
        <div className="w-[70vw]" onClick={() => setSelectedFile(null)}>
          <div className="flex items-center justify-between gap-4">
            <SearchBar setFiles={setFiles} getAllFiles={getAllFiles} />
            <UploadButton
              user={user}
              getAllFiles={getAllFiles}
              setLoading={setLoading}
            />
          </div>
          <span className="text-2xl font-bold">All Files</span>
          {loading ? (
            <Loader />
          ) : (
            <div className="flex flex-wrap gap-4 mt-4">
              {files.map((file) => (
                <FolderCard
                  key={file._id}
                  file={file}
                  setSelectedFile={setSelectedFile}
                  selectedFile={selectedFile}
                />
              ))}
            </div>
          )}
        </div>
        {selectedFile && (
          <ActionBar selectedFile={selectedFile} getAllFiles={getAllFiles} setLoading={setLoading} />
        )}
      </div>
    </DashboardLayout>
  );
}

export const getServerSideProps = withSessionSsr(async ({ req, res }) => {
  const user = req.session.user;

  if (!user) {
    return {
      redirect: {
        destination: "/login",
      },
    };
  }

  return {
    props: { user },
  };
});

export default Dashboard;
