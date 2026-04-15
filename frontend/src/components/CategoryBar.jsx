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
  { name: "all", icon: null },
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
  const activeCategory = queryParams.get("category");

  return (
    <div className="flex gap-8 overflow-x-auto px-6 py-3 border-b border-white/10 bg-black">

      {categories.map((cat) => {
        const isActive =
          (cat.name === "all" && !activeCategory) ||
          activeCategory === cat.name;

        return (
          <div
            key={cat.name}
            onClick={() =>
              cat.name === "all"
                ? navigate("/listings")
                : navigate(
                    `/listings?category=${cat.name}`
                  )
            }
            className="flex flex-col items-center cursor-pointer group"
          >
            {/* Icon */}
            {cat.icon && (
              <div
                className={`text-lg transition 
                ${isActive ? "text-yellow-400" : "text-gray-400 group-hover:text-white"}`}
              >
                {cat.icon}
              </div>
            )}

            {/* Text */}
            <p
              className={`text-xs mt-1 capitalize transition
              ${isActive ? "text-yellow-400" : "text-gray-400 group-hover:text-white"}`}
            >
              {cat.name}
            </p>

            {/* Underline */}
            <div
              className={`h-[2px] w-6 mt-1 transition
              ${isActive ? "bg-yellow-400" : "bg-transparent group-hover:bg-white"}`}
            ></div>
          </div>
        );
      })}
    </div>
  );
};

export default CategoryBar;