import { useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Footer from "../components/Footer/Footer";
export default function Mainlayout() {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      once: true, // Whether animation should only happen once
    });
  }, []);
  return (
    <div className="min-h-screen mx-auto max-w-7xl bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}
