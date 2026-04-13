import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [place, setPlace] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!place.trim()) return;

    navigate(`/listings?place=${place}`);
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
      <div className="flex gap-2">
        <div className="flex gap-2">
          <Link to="/signup">Sign up</Link>
          <Link to="/signin">Sign in</Link>
        </div>
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
