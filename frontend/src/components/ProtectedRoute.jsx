import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FaRegCompass } from "react-icons/fa";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-3 bg-black text-white">
        <FaRegCompass className="text-5xl text-yellow-400 animate-spin" />
        <p className="text-sm tracking-wide text-gray-300">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <Navigate
        to="/signin"
        state={{ from: location.pathname, message: "Please login first" }}
        replace
      />
    );
  }

  return children;
};

export default ProtectedRoute;
