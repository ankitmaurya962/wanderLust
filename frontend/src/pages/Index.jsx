import React, { useEffect, useState } from "react";
import API from "../utils/api";
import { useNavigate, useLocation } from "react-router-dom";
import ListingCard from "../components/ListingCard";
import CategoryBar from "../components/CategoryBar";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";


const Index = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const place = queryParams.get("place");
  const category = queryParams.get("category");

  useEffect(() => {
    const fetchListings = async () => {
      const toastId = toast.loading("Fetching listings...");

      try {
        setLoading(true);

        const res = await API.get("/api/listings", {
          params: { place, category },
        });

        setListings(res.data);
        toast.dismiss(toastId);
      } catch (err) {
        toast.dismiss(toastId);
        console.error(err);
        setError("Failed to load listings");
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [place, category]);

  // Loading UI
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white">
        <h2 className="text-lg animate-pulse">Loading listings...</h2>
      </div>
    );
  }

  // Error UI
  if (error) {
    return (
      <div className="h-screen flex items-center justify-center bg-black">
        <h2 className="text-red-400 text-lg">{error}</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">

      {/* Navbar */}
      <Navbar />

      {/* Content */}
      <div className="pt-24 px-6 md:px-12 pb-10">

        {/* Category Bar */}
        <div className="mb-8">
          <CategoryBar />
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-semibold mb-6">
          Explore Places
        </h2>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {listings.length > 0 ? (
            listings.map((list) => (
              <div
                key={list._id}
                className="bg-white/5 backdrop-blur-md rounded-xl overflow-hidden hover:scale-105 transition cursor-pointer border border-white/10"
                onClick={() => navigate(`/listings/${list._id}`)}
              >
                <ListingCard list={list} />
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-400">
              No listings found
            </p>
          )}

        </div>
      </div>
    </div>
  );
};

export default Index;