import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import API from "../utils/api";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";

const Signin = () => {
  const { setUser } = useContext(AuthContext);

  const [login, setlogin] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || "/listings";

  const submitHandler = async (e) => {
    e.preventDefault();

    const toastId = toast.loading("Logging in...");

    try {
      const res = await API.post("/api/signin", login, {
        withCredentials: true,
      });

      if (res.data.success) {
        setUser(res.data.user);
        toast.success("Login successful ✅", { id: toastId });
        navigate(from, { replace: true });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid username or password ❌", {
        id: toastId,
      });
    }
  };

  useEffect(() => {
    if (location.state?.message) {
      toast.error(location.state.message);
      window.history.replaceState({}, document.title);
    }
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <Navbar />

      {/* Centered Form */}
      <div className="flex items-center justify-center h-[90vh] px-4">
        <div className="w-full max-w-md bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl">
          <h1 className="text-3xl font-semibold mb-6 text-center">Sign In</h1>

          <form onSubmit={submitHandler} className="space-y-5">
            {/* Username */}
            <div>
              <label className="block mb-1 text-sm">Username</label>
              <input
                type="text"
                placeholder="Enter username"
                value={login.username}
                onChange={(e) =>
                  setlogin({ ...login, username: e.target.value })
                }
                className="w-full px-3 py-2 rounded bg-black text-white border border-white/20 outline-none focus:border-yellow-400"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block mb-1 text-sm">Password</label>
              <input
                type="password"
                placeholder="Enter password"
                value={login.password}
                onChange={(e) =>
                  setlogin({ ...login, password: e.target.value })
                }
                className="w-full px-3 py-2 rounded bg-black text-white border border-white/20 outline-none focus:border-yellow-400"
              />
            </div>

            {/* Button */}
            <button className="w-full bg-yellow-400 text-black py-2 rounded-full font-semibold hover:bg-yellow-300 transition">
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signin;
