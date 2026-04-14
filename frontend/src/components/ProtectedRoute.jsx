import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  if (user === undefined) return <p>Loading...</p>;

  if (!user) {
    return (
      <Navigate
        to="/signin"
        state={{ from: location.pathname, message: "Please login first 🔒" }}
        replace
      />
    );
  }

  return children;
};

export default ProtectedRoute;
