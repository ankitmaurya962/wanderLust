import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="h-[80vh] flex flex-col justify-center items-center text-center">
      
      <h1 className="text-4xl font-bold mb-4">
        Welcome to WanderLust 🌍
      </h1>

      <p className="text-gray-600 mb-6">
        Discover amazing places around the world
      </p>

      <Link
        to="/listings"
        className="bg-black text-white px-6 py-3 rounded"
      >
        Explore Listings
      </Link>

    </div>
  );
};

export default Home;