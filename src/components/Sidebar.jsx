import React from "react";
import {
  FiHome,
  FiFile,
  FiHeart,
  FiTrash,
  FiUser,
  FiLogOut,
} from "react-icons/fi";
import Link from "next/link";
import { useRouter } from "next/router";

const Sidebar = ({ user }) => {
  const router = useRouter();

  const handleLogout = async () => {
    const response = await fetch("/api/logout");
    router.push("/login");
  };

  return (
    <aside className="bg-white shadow-md flex flex-col justify-between p-4 min-h-screen w-[250px]">
      <div>
        <h1 className="text-[18px] font-bold mb-4 text-center text-[#4891f3]">
          CLOUD STORAGE APP
        </h1>
        <div className="flex flex-col mt-16">
          <Link href="/dashboard">
            <div className="flex items-center mb-4 hover:text-[#4891f3] cursor-pointer">
              <FiHome className="mr-2" />
              <span>Home</span>
            </div>
          </Link>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex items-center mb-4 hover:text-[#4891f3] cursor-pointer">
          <FiUser className="mr-2" />
          <span>{user.name}</span>
        </div>
        <div onClick={handleLogout}>
          <div className="flex items-center mb-0 hover:text-[#4891f3] cursor-pointer">
            <FiLogOut className="mr-2" />
            <span>Logout</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
