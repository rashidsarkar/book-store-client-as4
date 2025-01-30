import React from "react";
import Navbar from "../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";

export default function Mainlayout() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      
      <Navbar />
      <Outlet />
    </div>
  );
}
