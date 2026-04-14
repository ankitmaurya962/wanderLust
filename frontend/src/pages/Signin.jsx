import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

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
      const res = await axios.post("/api/signin", login, {
        withCredentials: true,
      });

      if (res.data.success) {
        setUser(res.data.user);

        toast.success("Login successful ✅", { id: toastId });

        navigate(from, { replace: true });
      }
    } catch (error) {
      // ❌ NO manual toast.error here (handled by interceptor)
      toast.dismiss(toastId); // stop loading toast
    }
  };

  // 🔥 show redirect message once
  useEffect(() => {
    if (location.state?.message) {
      toast.error(location.state.message);

      // ✅ prevent duplicate toast on refresh
      window.history.replaceState({}, document.title);
    }
  }, []);

  return (
    <div>
      <h1 className="text-[2rem]">Sign In</h1>

      <form onSubmit={submitHandler}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          placeholder="username"
          id="username"
          onChange={(e) =>
            setlogin({ ...login, username: e.target.value })
          }
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={(e) =>
            setlogin({ ...login, password: e.target.value })
          }
        />

        <button className="red-300">Sign IN</button>
      </form>
    </div>
  );
};

export default Signin;