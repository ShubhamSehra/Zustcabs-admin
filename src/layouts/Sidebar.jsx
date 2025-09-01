import React from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, Car, Users, Settings } from "lucide-react";

const menuItems = [
  { path: "/dashboard", name: "Dashboard", icon: <LayoutDashboard size={18} /> },
  { path: "/rides", name: "Rides", icon: <Car size={18} /> },
  { path: "/drivers", name: "Drivers", icon: <Users size={18} /> },
];

export default function Sidebar({ isOpen, toggleSidebar }) {
  return (
    <aside
      className={`bg-gradient-to-b from-indigo-700 via-purple-700 to-pink-700 text-white transition-all duration-300 ${
        isOpen ? "w-64" : "w-20"
      } min-h-screen flex flex-col`}
    >
      {/* Top Brand */}
      <div className="flex items-center justify-between p-4 border-b border-white/20">
        <span className={`font-bold text-lg ${!isOpen && "hidden"}`}>ZustCabs</span>
        <button onClick={toggleSidebar} className="text-white/70 hover:text-white">
          ☰
        </button>
      </div>

      {/* Menu */}
      <nav className="mt-4 flex-1">
        {menuItems.map((item, i) => (
          <NavLink
            key={i}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-md transition-colors ${
                isActive
                  ? "bg-white/20 font-semibold"
                  : "hover:bg-white/10 text-white/80"
              }`
            }
          >
            {item.icon}
            {isOpen && <span>{item.name}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/20 text-sm text-white/70">
        {isOpen ? "© 2025 ZustCabs" : "©"}
      </div>
    </aside>
  );
}
