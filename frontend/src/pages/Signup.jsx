import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

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
      const res = await axios.post("/api/signup", user, {
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success("Account created successfully 🎉", { id: toastId });

        navigate("/signin", { replace: true }); // 👉 better UX
      }
    } catch (error) {
      // ❌ no toast.error here (handled by interceptor)
      toast.dismiss(toastId);
    }
  };

  return (
    <div>
      <h1>Register Yourself</h1>

      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            placeholder="username"
            required
            id="username"
            onChange={(e) =>
              setuser({ ...user, username: e.target.value })
            }
          />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder="abc@123"
            required
            id="email"
            onChange={(e) =>
              setuser({ ...user, email: e.target.value })
            }
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="password"
            required
            id="password"
            onChange={(e) =>
              setuser({ ...user, password: e.target.value })
            }
          />
        </div>

        <div>
          <button className="bg-red-300">Sign Up</button>
        </div>
      </form>
    </div>
  );
};

export default Signup;