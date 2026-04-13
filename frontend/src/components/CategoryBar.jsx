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
import { useNavigate } from "react-router-dom";

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

  return (
    <div>
      <div className="flex gap-6 mb-6">
        {categories.map((cat) => (
          <div
            onClick={()=>navigate(`/listings?category=${cat.name}`)}
            key={cat.name}
            className="flex flex-col items-center cursor-pointer hover:scale-110 transition"
          >
            <div className="text-xl">{cat.icon}</div>
            <p className="text-sm">{cat.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryBar;
