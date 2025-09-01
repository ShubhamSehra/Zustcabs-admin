import React, { useEffect, useState } from "react";
import { supabase } from "../supabase-client";
import StatCard from "../components/StatCard";
import WeeklyUpdate from "../components/WeeklyUpdate";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalRides: 0,
    ongoingRides: 0,
    upcomingRides: 0,
    completedRides: 0,
    activeDrivers: 0,
    earnings: 0,
  });
  const [recentRides, setRecentRides] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      // Total rides
      const { count: total } = await supabase
        .from("rides")
        .select("*", { count: "exact", head: true });

      // Ongoing rides
      const { count: ongoing } = await supabase
        .from("rides")
        .select("*", { count: "exact", head: true })
        .eq("status", "ONGOING");

      // Upcoming rides
      const { count: upcoming } = await supabase
        .from("rides")
        .select("*", { count: "exact", head: true })
        .eq("status", "UPCOMING");

      // Completed rides
      const { count: completed } = await supabase
        .from("rides")
        .select("*", { count: "exact", head: true })
        .eq("status", "COMPLETED");

      // Active drivers
      const { count: activeDrivers } = await supabase
        .from("drivers")
        .select("*", { count: "exact", head: true })
        .eq("status", "ACTIVE");

      setStats({
        totalRides: total ?? 0,
        ongoingRides: ongoing ?? 0,
        upcomingRides: upcoming ?? 0,
        completedRides: completed ?? 0,
        activeDrivers: activeDrivers ?? 0,
        earnings: 75140,
      });
    };

    const fetchRecentRides = async () => {
      const { data } = await supabase
        .from("rides")
        .select("id, customer_name, pickup, drop, status, start_time")
        .order("created_at", { ascending: false })
        .limit(5);

      setRecentRides(data || []);
    };

    fetchStats();
    fetchRecentRides();
  }, []);

  return (
    <div className="space-y-8">
      {/* KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard title="Total Rides" value={stats.totalRides} icon="🚕" color="bg-yellow-100 text-yellow-800" />
        <StatCard title="Ongoing Rides" value={stats.ongoingRides} icon="⏳" color="bg-blue-100 text-blue-800" />
        <StatCard title="Upcoming Rides" value={stats.upcomingRides} icon="📅" color="bg-purple-100 text-purple-800" />
        <StatCard title="Completed Rides" value={stats.completedRides} icon="✅" color="bg-green-100 text-green-800" />
      </div>

      {/* Drivers + Earnings */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard title="Active Drivers" value={stats.activeDrivers} icon="👨‍✈️" color="bg-indigo-100 text-indigo-800" />
        <StatCard title="Earnings" value={`₹${stats.earnings}`} icon="💰" color="bg-green-100 text-green-800" />
      </div>

      {/* Weekly Chart */}
      <div className="bg-white shadow-card rounded-2xl p-6">
        <h2 className="text-lg font-semibold mb-4">Weekly Performance</h2>
        <WeeklyUpdate />
      </div>

      {/* Recent Rides */}
      <div className="bg-white shadow-card rounded-2xl p-6">
        <h2 className="text-lg font-semibold mb-4">Recent Rides</h2>
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 border-b">
              <th className="py-2 px-3">ID</th>
              <th className="py-2 px-3">Customer</th>
              <th className="py-2 px-3">Pickup</th>
              <th className="py-2 px-3">Drop</th>
              <th className="py-2 px-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {recentRides.map((ride) => (
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
                        : ride.status === "ONGOING"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {ride.status}
                  </span>
                </td>
              </tr>
            ))}
            {recentRides.length === 0 && (
              <tr>
                <td colSpan="5" className="py-4 text-center text-gray-400">
                  No rides found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
