import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <div className="relative h-[100vh] w-full overflow-hidden">

      {/* Background Image */}
      <img
        src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85"
        alt="hero"
        className="absolute w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Navbar */}
      <Navbar />

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-4">

        <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
          Where Nature <br />
          Feels Like{" "}
          <span className="text-yellow-400">Home</span>
        </h1>

        <p className="text-gray-300 mt-6 max-w-xl">
          Discover amazing places around the world with WanderLust.
        </p>

        <Link
          to="/listings"
          className="mt-8 bg-yellow-400 text-black px-8 py-3 rounded-full font-semibold hover:bg-yellow-300 transition"
        >
          Explore Listings
        </Link>

      </div>
    </div>
  );
};

export default Home;