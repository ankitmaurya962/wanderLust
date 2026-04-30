import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="h-[80vh] flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-xl mb-6">Page not found</p>

        <Link
          to="/listings"
          className="bg-yellow-400 text-black px-6 py-2 rounded-full font-semibold hover:bg-yellow-300 transition"
        >
          Go to Listings
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
