import React, { useState } from "react";
import { supabase } from "../supabase-client";

export default function Navbar({ session, toggleSidebar }) {
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <header className="bg-white shadow flex items-center justify-between px-4 md:px-6 h-16 border-b border-gray-200">
      {/* Mobile menu button */}
      <button
        onClick={toggleSidebar}
        className="md:hidden text-yellow-500 font-bold text-xl"
      >
        ☰
      </button>

      <div className="text-xl font-bold text-black">Admin Panel</div>

      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center space-x-2 text-gray-700 font-semibold"
        >
          <span>{session?.user?.email}</span>
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {open && (
          <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded z-50">
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
