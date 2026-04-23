import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div className="relative h-[100vh] w-full overflow-hidden">

      {/* Background Image */}
      <motion.img
        src="https://images.unsplash.com/photo-1628583768483-a762d81fa84c?q=80&w=1987&auto=format&fit=crop"
        alt="hero"
        className="absolute w-full h-full object-cover"
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />

      {/* Overlay */}
      <motion.div
        className="absolute inset-0 bg-black/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />

      {/* Navbar */}
      <Navbar />

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-4">

        <motion.h1
          className="text-5xl md:text-6xl font-bold text-white leading-tight"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Where Nature <br />
          Feels Like <span className="text-yellow-400">Home</span>
        </motion.h1>

        <motion.p
          className="text-gray-300 mt-6 max-w-xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Discover amazing places around the world with WanderLust.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <Link
            to="/listings"
            className="mt-8 inline-block bg-yellow-400 text-black px-8 py-3 rounded-full font-semibold hover:bg-yellow-300 transition"
          >
            Explore Listings
          </Link>
        </motion.div>

      </div>
    </div>
  );
};

export default Home;