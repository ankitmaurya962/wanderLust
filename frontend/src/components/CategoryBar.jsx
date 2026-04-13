import React from "react";
import {
  FaFire,
  FaBed,
  FaCity,
  FaMountain,
  FaChessRook,
  FaTree,
  FaWater,
  FaCampground,
  FaTractor,
  FaSnowflake,
  FaShip,
  FaPray,
  FaSun,
} from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

const categories = [
  { name: "trending", icon: <FaFire /> },
  { name: "rooms", icon: <FaBed /> },
  { name: "iconic", icon: <FaCity /> },
  { name: "mountains", icon: <FaMountain /> },
  { name: "castles", icon: <FaChessRook /> },
  { name: "forest", icon: <FaTree /> },
  { name: "pools", icon: <FaWater /> },
  { name: "camping", icon: <FaCampground /> },
  { name: "farms", icon: <FaTractor /> },
  { name: "arctic", icon: <FaSnowflake /> },
  { name: "boat", icon: <FaShip /> },
  { name: "spiritual", icon: <FaPray /> },
  { name: "desert", icon: <FaSun /> },
];

const CategoryBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const place = queryParams.get("place");

  return (
    <div className="flex gap-6 overflow-x-auto px-4 py-2">

      {/* ALL BUTTON */}
      <div
        onClick={() => navigate("/listings")}
        className="flex flex-col items-center cursor-pointer hover:scale-110 transition"
      >
        <p className="text-sm">All</p>
      </div>

      {/* CATEGORIES */}
      {categories.map((cat) => (
        <div
          key={cat.name}
          onClick={() =>
            navigate(
              `/listings?category=${cat.name}${
                place ? `&place=${place}` : ""
              }`
            )
          }
          className="flex flex-col items-center cursor-pointer hover:scale-110 transition"
        >
          <div className="text-xl">{cat.icon}</div>
          <p className="text-sm">{cat.name}</p>
        </div>
      ))}
    </div>
  );
};

export default CategoryBar;