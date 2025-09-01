import React, { useEffect, useState } from "react";
import { BarChart } from "@mui/x-charts";
import { supabase } from "../supabase-client";

const WeeklyUpdate = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchWeeklyData = async () => {
     
      const { data: ridesData, error } = await supabase
        .from("rides")
        .select("id, start_time, status")
        .gte(
          "start_time",
          new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
        )
        .order("start_time", { ascending: true });

      if (error) {
        console.error("Weekly data error:", error.message);
        return;
      }

 
      const summary = {};

      ridesData.forEach((ride) => {
        const day = new Date(ride.start_time).toLocaleDateString("en-IN", {
          weekday: "short",
        });

        if (!summary[day]) {
          summary[day] = { day, rides: 0 };
        }

        summary[day].rides += 1;
      });

      setData(Object.values(summary));
    };

    fetchWeeklyData();
  }, []);

  return (
    <div>
      {data.length === 0 ? (
        <div className="p-6 text-center text-gray-500">No data available</div>
      ) : (
        <BarChart
          dataset={data}
          xAxis={[{ scaleType: "band", dataKey: "day" }]}
          yAxis={[{ id: "ridesAxis", label: "Rides", min: 0 }]}
          series={[{ dataKey: "rides", label: "Rides", yAxisId: "ridesAxis", color: "#3b82f6" }]}
          height={300}
        />
      )}
    </div>
  );
};

export default WeeklyUpdate;
