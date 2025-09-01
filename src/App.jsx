import React, { useState, useEffect } from "react";
import { Auth } from "./components/Auth";
import { supabase } from "./supabase-client";
import "./index.css";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/Dashboard";
import Rides from "./pages/Rides";
import Drivers from "./pages/Drivers";

export default function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let sub;

    const init = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) console.error("getSession error:", error.message);
        setSession(data?.session ?? null);
      } finally {
        setLoading(false);
      }
    };

    init();

    const { data } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });
    sub = data?.subscription;

    return () => {
      if (sub) sub.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center">
        <div className="text-sm text-gray-500">Checking session…</div>
      </div>
    );
  }

  const router = createBrowserRouter([
    {
      path: "/login",
      element: session ? <Navigate to="/dashboard" /> : <Auth />
    },
    {
      path: "/",
      element: session ? <AdminLayout session={session} /> : <Navigate to="/login" />,
      children: [
        { index: true, element: <Dashboard /> },
        {path: "dashboard", element: <Dashboard /> },
        {path: "rides", element: <Rides /> },
        {path: "drivers", element: <Drivers /> }
      ],
    },
    {
      path: "*",
      element: <Navigate to={session ? "/dashboard" : "/login"} />
    },
  ]);

  return <RouterProvider router={router} />
  
}
