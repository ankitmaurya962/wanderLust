import React from "react";

const ListingCard = ({ list, onClick }) => {
  return (
    <div onClick={onClick} className="cursor-pointer group">
      
      {/* Image */}
      <div className="overflow-hidden rounded-xl">
        <img
          src={list.image?.url || "https://via.placeholder.com/300"}
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
          ₹{list.price}{" "}
          <span className="font-normal text-gray-600">/ night</span>
        </p>
      </div>
    </div>
  );
};

export default ListingCard;