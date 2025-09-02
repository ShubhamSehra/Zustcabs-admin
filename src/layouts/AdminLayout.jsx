import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function AdminLayout({session}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
   <div className="flex min-h-screen bg-gray-100 font-montserrat">
  {/* Sidebar: hidden on small screens */}
  <div className="hidden md:block">
    <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
  </div>

  {/* Mobile Sidebar Drawer */}
  {sidebarOpen && (
    <div className="fixed inset-0 z-40 flex md:hidden">
      <Sidebar isOpen={true} toggleSidebar={toggleSidebar} />
      {/* Click outside to close */}
      <div className="flex-1 bg-black/50" onClick={toggleSidebar}></div>
    </div>
  )}

  {/* Main Content */}
  <div className="flex flex-col flex-1 min-h-screen">
    <Navbar session={session} sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
    <main className="p-4 md:p-6 flex-1 overflow-y-auto">
      <Outlet />
    </main>
  </div>
</div>
  );
}
