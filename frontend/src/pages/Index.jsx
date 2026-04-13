import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import ListingCard from "../components/ListingCard";

const Index = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // ✅ get query from URL
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const place = queryParams.get("place");
  const category = queryParams.get("category"); // (future use)

  useEffect(() => {
    const fetchListings = async () => {
      try {
        setLoading(true);

        const res = await axios.get("/api/listings", {
          params: {
            place,
            category,
          },
        });

        setListings(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load listings");
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [place, category]); 

  // 🔹 Loading UI
  if (loading) {
    return <h2 className="text-center mt-10 text-lg">Loading...</h2>;
  }

  // 🔹 Error UI
  if (error) {
    return <h2 className="text-center mt-10 text-red-500">{error}</h2>;
  }

  return (
    <div className="px-6 md:px-12 py-6">
      
      {/* Listings Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {listings.length > 0 ? (
          listings.map((list) => (
            <ListingCard
              key={list._id}
              list={list}
              onClick={() => navigate(`/listings/${list._id}`)}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No listings found
          </p>
        )}
      </div>
    </div>
  );
};

export default Index;