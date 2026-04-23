import React, { useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import API from "../utils/api";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import { FaBars, FaTimes, FaRegCompass } from "react-icons/fa";

const Navbar = () => {
  const [place, setPlace] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === "/";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!place.trim()) return;
    navigate(`/listings?place=${place}`);
    setMenuOpen(false);
  };

  const handleLogout = async () => {
    const toastId = toast.loading("Logging out...");
    try {
      await API.get("/api/logout", { withCredentials: true });
      setUser(null);
      toast.success("Logged out 👋", { id: toastId });
      navigate("/");
      setMenuOpen(false);
    } catch {
      toast.dismiss(toastId);
    }
  };

  return (
    <>
      {/* NAVBAR */}
      <div
        className={`fixed top-0 left-0 w-full z-50 
        flex justify-between items-center px-4 md:px-6 py-3 md:py-4 text-white
        ${menuOpen ? "bg-black" : isHome ? "bg-transparent" : "bg-black"}`}
      >
        {/* LOGO */}
        <Link
          to="/"
          className="flex items-center gap-2 text-lg md:text-xl font-semibold group"
        >
          <FaRegCompass className="text-yellow-400 text-xl transition-transform duration-300 group-hover:rotate-180" />
          <span className="text-white group-hover:text-yellow-400 transition">
            WanderLust
          </span>
        </Link>

        {/* DESKTOP SEARCH */}
        <form
          onSubmit={handleSubmit}
          className="hidden md:flex items-center bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/20"
        >
          <input
            type="search"
            placeholder="Search places..."
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            className="bg-transparent outline-none px-2 text-sm text-white placeholder-gray-300"
          />
          <button className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm">
            Search
          </button>
        </form>

        {/* DESKTOP RIGHT */}
        <div className="hidden md:flex items-center gap-4 text-sm">
          {!user ? (
            <>
              <Link
                className="text-white hover:text-yellow-400 transition"
                to="/signup"
              >
                Sign up
              </Link>
              <Link
                className="text-white hover:text-yellow-400 transition"
                to="/signin"
              >
                Sign in
              </Link>
            </>
          ) : (
            <>
              <span className="text-white font-medium">
                Hi, {user.username}
              </span>
              <button
                onClick={handleLogout}
                className="text-white hover:text-red-400 transition"
              >
                Logout
              </button>
              <Link to="/mybooking">My Booking</Link>
            </>
          )}

          <Link
            to="/listings/new"
            className="bg-yellow-400 text-black px-4 py-2 rounded-full font-medium"
          >
            Become a host
          </Link>
        </div>

        {/* MOBILE BUTTON */}
        <button
          className="md:hidden w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="fixed top-[64px] left-0 w-full bg-black px-5 py-6 flex flex-col gap-5 md:hidden z-40">
          {/* SEARCH */}
          <form
            onSubmit={handleSubmit}
            className="flex items-center bg-white/10 backdrop-blur-md px-3 py-2 rounded-full border border-white/20"
          >
            <input
              type="search"
              placeholder="Search places..."
              value={place}
              onChange={(e) => setPlace(e.target.value)}
              className="bg-transparent outline-none px-2 text-sm text-white w-full placeholder-gray-300"
            />
            <button className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm">
              Search
            </button>
          </form>

          {/* USER */}
          {!user ? (
            <>
              <Link
                to="/signup"
                onClick={() => setMenuOpen(false)}
                className="text-white hover:text-yellow-400 transition"
              >
                Sign up
              </Link>
              <Link
                to="/signin"
                onClick={() => setMenuOpen(false)}
                className="text-white hover:text-yellow-400 transition"
              >
                Sign in
              </Link>
            </>
          ) : (
            <>
              <Link to="/mybooking" className="text-white font-medium flex justify-center">My Booking</Link>
              <span className="text-white font-medium flex justify-center" >
                Hi, {user.username}
              </span>
              <button
                onClick={handleLogout}
                className="text-white hover:text-red-400 transition"
              >
                Logout
              </button>
            </>
          )}

          {/* ADD LISTING */}
          <Link
            to="/listings/new"
            onClick={() => setMenuOpen(false)}
            className="bg-yellow-400 text-black px-4 py-2 rounded-lg text-center font-medium"
          >
            Become a host
          </Link>
        </div>
      )}
    </>
  );
};

export default Navbar;
