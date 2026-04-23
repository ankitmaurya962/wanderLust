import React, { useState, useContext, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import API from "../utils/api";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import {
  FaBars,
  FaTimes,
  FaRegCompass,
  FaUserCircle,
} from "react-icons/fa";

const Navbar = () => {
  const [place, setPlace] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef();

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
      setDropdownOpen(false);
      setMenuOpen(false);
    } catch {
      toast.dismiss(toastId);
    }
  };

  // close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <>
      {/* NAVBAR */}
      <div
        className={`fixed top-0 left-0 w-full z-50 flex justify-between items-center px-4 md:px-6 py-3 md:py-4 text-white
        ${menuOpen ? "bg-black" : isHome ? "bg-transparent" : "bg-black"}`}
      >
        {/* LOGO */}
        <Link
          to="/"
          className="flex items-center gap-2 text-lg md:text-xl font-semibold group"
        >
          <FaRegCompass className="text-yellow-400 text-xl group-hover:rotate-180 transition" />
          <span className="group-hover:text-yellow-400">WanderLust</span>
        </Link>

        {/* SEARCH */}
        <form
          onSubmit={handleSubmit}
          className="hidden md:flex items-center bg-white/10 px-3 py-1 rounded-full border border-white/20"
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

        {/* RIGHT */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/listings/new"
            className="bg-yellow-400 text-black px-4 py-2 rounded-full font-medium"
          >
            Become a host
          </Link>

          {/* USER ICON */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="text-2xl hover:text-yellow-400"
            >
              <FaUserCircle />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-3 w-48 bg-black border border-gray-700 rounded-lg shadow-lg py-2">
                {!user ? (
                  <>
                    <Link
                      to="/signin"
                      className="block px-4 py-2 text-white hover:bg-gray-800"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Sign in
                    </Link>
                    <Link
                      to="/signup"
                      className="block px-4 py-2 text-white hover:bg-gray-800"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Sign up
                    </Link>
                  </>
                ) : (
                  <>
                    <div className="px-4 py-2 text-gray-300 text-sm">
                      Hi, {user.username}
                    </div>
                    <Link
                      to="/mybooking"
                      className="block px-4 py-2 text-white hover:bg-gray-800"
                      onClick={() => setDropdownOpen(false)}
                    >
                      My Booking
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-red-400 hover:bg-gray-800"
                    >
                      Logout
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* MOBILE BUTTON */}
        <button
          className="md:hidden w-10 h-10 flex items-center justify-center"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="fixed top-[64px] left-0 w-full bg-black px-5 py-6 flex flex-col gap-4 md:hidden z-40 text-white">
          {/* SEARCH */}
          <form
            onSubmit={handleSubmit}
            className="flex items-center bg-white/10 px-3 py-2 rounded-full border border-white/20"
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

          {!user ? (
            <>
              <Link
                to="/signup"
                onClick={() => setMenuOpen(false)}
                className="text-center py-2"
              >
                Sign up
              </Link>
              <Link
                to="/signin"
                onClick={() => setMenuOpen(false)}
                className="text-center py-2"
              >
                Sign in
              </Link>
            </>
          ) : (
            <>
              <div className="text-center py-2">
                Hi, {user.username}
              </div>
              <Link
                to="/mybooking"
                onClick={() => setMenuOpen(false)}
                className="text-center py-2"
              >
                My Booking
              </Link>
              <button
                onClick={handleLogout}
                className="text-red-400 text-center py-2"
              >
                Logout
              </button>
            </>
          )}

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