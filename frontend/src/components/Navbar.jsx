import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast"; // ✅ added

const Navbar = () => {
  const [place, setPlace] = useState("");
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!place.trim()) return;
    navigate(`/listings?place=${place}`);
  };

  const handleLogout = async () => {
    const toastId = toast.loading("Logging out..."); // ✅ added

    try {
      await axios.get("/api/logout", {
        withCredentials: true,
      });

      setUser(null);

      toast.success("Logged out successfully 👋", { id: toastId }); // ✅ added

      navigate("/");
    } catch (err) {
      toast.dismiss(toastId); // ✅ added
      console.log(err);
      // ❌ no toast.error (handled by interceptor)
    }
  };

  return (
    <div className="flex justify-between items-center p-4">
      <h1 className="text-xl font-bold">WanderLust</h1>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="search"
          placeholder="Search by place"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
          className="border p-2 rounded"
        />
        <button className="bg-black text-white px-3 py-2 rounded">
          Search
        </button>
      </form>

      <div className="flex gap-2 items-center">

        {!user ? (
          <>
            <Link to="/signup">Sign up</Link>
            <Link to="/signin">Sign in</Link>
          </>
        ) : (
          <>
            <span className="text-sm">Hi, {user.username}</span>
            <button
              onClick={handleLogout}
              className="bg-red-300 px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        )}

        <Link
          to="/listings/new"
          className="bg-black text-white px-4 py-2 rounded"
        >
          Create New Listing
        </Link>
      </div>
    </div>
  );
};

export default Navbar;