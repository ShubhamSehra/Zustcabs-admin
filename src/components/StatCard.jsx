import React from "react";

const StatCard = ({ title, value, icon, color }) => {
  return (
    <div className="bg-white shadow-card rounded-2xl p-4 flex items-center justify-between">
      {/* Left side text */}
      <div>
        <span className="text-sm text-gray-600">{title}</span>
        <div className="text-2xl font-bold text-gray-900 mt-1">{value}</div>
      </div>

      {/* Right side icon */}
      {icon && (
        <div
          className={`flex items-center justify-center w-12 h-12 rounded-full ${color}`}
        >
          <span className="text-xl">{icon}</span>
        </div>
      )}
    </div>
  );
};

export default StatCard;
