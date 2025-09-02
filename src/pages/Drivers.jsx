import React, { useEffect, useState } from "react";
import { supabase } from "../supabase-client";

export default function Drivers() {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDrivers = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("drivers")
        .select("id, name, phone, vehicle_number, status");

      if (!error) setDrivers(data || []);
      setLoading(false);
    };

    fetchDrivers();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Drivers</h1>
        <button
          onClick={() => alert("let me know if you need this option")}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
        >
          + Add Driver
        </button>
      </div>

      {/* Table */}
      <div className="bg-white shadow rounded-2xl overflow-x-auto">
        {loading ? (
          <div className="p-6 text-center text-gray-500">Loading drivers…</div>
        ) : drivers.length === 0 ? (
          <div className="p-6 text-center text-gray-400">No drivers found.</div>
        ) : (
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left border-b text-gray-500">
                <th className="py-2 px-3">ID</th>
                <th className="py-2 px-3">Name</th>
                <th className="py-2 px-3">Phone</th>
                <th className="py-2 px-3">Vehicle</th>
                <th className="py-2 px-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {drivers.map((driver) => (
                <tr key={driver.id} className="border-b last:border-0">
                  <td className="py-2 px-3">{driver.id}</td>
                  <td className="py-2 px-3">{driver.name}</td>
                  <td className="py-2 px-3">{driver.phone}</td>
                  <td className="py-2 px-3">{driver.vehicle_number}</td>
                  <td className="py-2 px-3">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        driver.status === "ACTIVE"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {driver.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
