import React from "react";
import Sidebar from "./Sidebar";

export default function DashboardLayout({ user, children }) {
  return (
    <div className="flex">
      <Sidebar user={user} />
      <main className="w-[calc(100%-250px)] p-4 bg-gray-100 min-h-screen">
        {children}
      </main>
    </div>
  );
}
