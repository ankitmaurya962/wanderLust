import React, { useEffect, useState } from "react";

const Index = () => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    fetch("/api/listings")
      .then((res) => res.json())
      .then(setListings);
  }, []);

  return (
    <div className="px-6 md:px-12 py-6">
      
      {/* Heading */}
      <h1 className="text-3xl font-semibold mb-6">WanderLust</h1>

      {/* Listings Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {listings.map((list) => (
          
          <div
            key={list._id}
            className="cursor-pointer group"
          >
            
            {/* Image */}
            <div className="overflow-hidden rounded-xl">
              <img
                src={list.image.url}
                alt={list.title}
                className="h-[250px] w-full object-cover rounded-xl group-hover:scale-105 transition duration-300"
              />
            </div>

            {/* Info */}
            <div className="mt-2">
              <h2 className="font-semibold text-lg truncate">
                {list.title}
              </h2>

              <p className="text-gray-500 text-sm">
                2 nights · Free cancellation
              </p>

              <p className="mt-1 font-semibold">
                ₹{list.price} <span className="font-normal text-gray-600">/ night</span>
              </p>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Index;