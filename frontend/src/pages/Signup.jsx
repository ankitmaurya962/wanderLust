import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";

const Signup = () => {
  const navigate = useNavigate();

  const [user, setuser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const submitHandler = async (e) => {
    e.preventDefault();

    const toastId = toast.loading("Creating account...");

    try {
      const res = await API.post("/api/signup", user, {
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success("Account created successfully 🎉", { id: toastId });
        navigate("/signin", { replace: true });
      }
    } catch (error) {
      toast.dismiss(toastId);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">

      {/* Navbar */}
      <Navbar />

      {/* Centered Form */}
      <div className="flex items-center justify-center h-[90vh] px-4">

        <div className="w-full max-w-md bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl">

          <h1 className="text-3xl font-semibold mb-6 text-center">
            Create Account
          </h1>

          <form onSubmit={submitHandler} className="space-y-5">

            {/* Username */}
            <div>
              <label className="block mb-1 text-sm">
                Username
              </label>
              <input
                type="text"
                placeholder="Enter username"
                required
                value={user.username}
                onChange={(e) =>
                  setuser({ ...user, username: e.target.value })
                }
                className="w-full px-3 py-2 rounded bg-black text-white border border-white/20 outline-none focus:border-yellow-400"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block mb-1 text-sm">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter email"
                required
                value={user.email}
                onChange={(e) =>
                  setuser({ ...user, email: e.target.value })
                }
                className="w-full px-3 py-2 rounded bg-black text-white border border-white/20 outline-none focus:border-yellow-400"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block mb-1 text-sm">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter password"
                required
                value={user.password}
                onChange={(e) =>
                  setuser({ ...user, password: e.target.value })
                }
                className="w-full px-3 py-2 rounded bg-black text-white border border-white/20 outline-none focus:border-yellow-400"
              />
            </div>

            {/* Button */}
            <button className="w-full bg-yellow-400 text-black py-2 rounded-full font-semibold hover:bg-yellow-300 transition">
              Sign Up
            </button>

          </form>

        </div>

      </div>
    </div>
  );
};

export default Signup;