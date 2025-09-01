import React, { useEffect, useState } from "react";
import { supabase } from "../supabase-client";

export default function Rides() {
  const [rides, setRides] = useState([]);
  const [statusFilter, setStatusFilter] = useState("ALL"); // ALL | UPCOMING | COMPLETED | ONGOING
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRides = async () => {
      setLoading(true);

      let query = supabase
        .from("rides")
        .select("id, customer_name, pickup, drop, status, start_time");

      if (statusFilter !== "ALL") {
        query = query.eq("status", statusFilter);
      }

      const { data, error } = await query.order("created_at", { ascending: false });

      if (!error) setRides(data || []);
      setLoading(false);
    };

    fetchRides();
  }, [statusFilter]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Rides</h1>

        {/* Filter Tabs */}
        <div className="flex space-x-2">
          {["ALL", "UPCOMING", "ONGOING", "COMPLETED"].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1 rounded ${
                statusFilter === status
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white shadow rounded-2xl overflow-x-auto">
        {loading ? (
          <div className="p-6 text-center text-gray-500">Loading rides…</div>
        ) : rides.length === 0 ? (
          <div className="p-6 text-center text-gray-400">No rides found.</div>
        ) : (
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left border-b text-gray-500">
                <th className="py-2 px-3">ID</th>
                <th className="py-2 px-3">Customer</th>
                <th className="py-2 px-3">Pickup</th>
                <th className="py-2 px-3">Drop</th>
                <th className="py-2 px-3">Status</th>
                <th className="py-2 px-3">Start Time</th>
              </tr>
            </thead>
            <tbody>
              {rides.map((ride) => (
                <tr key={ride.id} className="border-b last:border-0">
                  <td className="py-2 px-3">{ride.id}</td>
                  <td className="py-2 px-3">{ride.customer_name}</td>
                  <td className="py-2 px-3">{ride.pickup}</td>
                  <td className="py-2 px-3">{ride.drop}</td>
                  <td className="py-2 px-3">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        ride.status === "COMPLETED"
                          ? "bg-green-100 text-green-700"
                          : ride.status === "UPCOMING"
                          ? "bg-yellow-100 text-yellow-700"
                          : ride.status === "ONGOING"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {ride.status}
                    </span>
                  </td>
                  <td className="py-2 px-3">
                    {new Date(ride.start_time).toLocaleString()}
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
