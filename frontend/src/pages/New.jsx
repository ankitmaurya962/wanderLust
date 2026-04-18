import React, { useState } from "react";
import API from "../utils/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";

const New = () => {
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [form, setForm] = useState({
    title: "",
    price: "",
    location: "",
    country: "",
    desc: "",
    image: "",
    category: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const toastId = toast.loading("Creating listing...");

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("title", form.title);
      formData.append("price", Number(form.price));
      formData.append("location", form.location);
      formData.append("country", form.country);
      formData.append("desc", form.desc);
      formData.append("category", form.category);
      if (file) {
        formData.append("image", file);
      }

      const res = await API.post("/api/listings", formData);

      toast.success("Listing created successfully 🎉", { id: toastId });

      navigate("/listings");
    } catch (err) {
      toast.dismiss(toastId);
      console.error(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    "trending",
    "rooms",
    "iconic",
    "mountains",
    "castles",
    "pools",
    "camping",
    "farms",
    "arctic",
    "boat",
    "spiritual",
    "forest",
    "desert",
  ];

  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <Navbar />

      {/* Form Container */}
      <div className="pt-24 px-4 flex justify-center">
        <div className="w-full max-w-2xl bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl">
          <h1 className="text-3xl font-semibold mb-6 text-center">
            Create New Listing
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Title */}
            <input
              name="title"
              placeholder="Title"
              value={form.title}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded bg-black text-white border border-white/20 focus:border-yellow-400 outline-none"
              required
            />

            {/* Price */}
            <input
              name="price"
              type="number"
              placeholder="Price"
              value={form.price}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded bg-black text-white border border-white/20 focus:border-yellow-400 outline-none"
              required
            />

            {/* Location */}
            <input
              name="location"
              placeholder="Location"
              value={form.location}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded bg-black text-white border border-white/20 focus:border-yellow-400 outline-none"
              required
            />

            {/* Country */}
            <input
              name="country"
              placeholder="Country"
              value={form.country}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded bg-black text-white border border-white/20 focus:border-yellow-400 outline-none"
            />

            {/* File Upload */}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const selectedFile = e.target.files[0];
                setFile(selectedFile);

                if (selectedFile) {
                  setPreview(URL.createObjectURL(selectedFile));
                }
              }}
              className="w-full text-sm text-gray-300 file:bg-yellow-400 file:text-black file:px-4 file:py-2 file:rounded-full file:border-none file:cursor-pointer"
            />
            <img
              src={
                preview ||
                "https://res.cloudinary.com/dldtcjzis/image/upload/v1776517498/defaultlisting_zpazmc.jpg"
              }
              className="w-full h-[250px] object-cover rounded-xl mt-2"
            />
            {/* Description */}
            <textarea
              name="desc"
              placeholder="Description"
              value={form.desc}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded bg-black text-white border border-white/20 focus:border-yellow-400 outline-none"
            />

            {/* Category */}
            <div className="relative">
              <div
                onClick={() => setOpen(!open)}
                className="w-full px-3 py-2 rounded bg-black text-white border border-white/20 cursor-pointer"
              >
                {form.category || "Select Category"}
              </div>

              {open && (
                <div className="absolute bottom-full mb-2 w-full bg-black border border-white/10 rounded-xl max-h-60 overflow-y-auto z-50">
                  {categories.map((cat) => (
                    <div
                      key={cat}
                      onClick={() => {
                        setForm({ ...form, category: cat });
                        setOpen(false);
                      }}
                      className="px-3 py-2 hover:bg-yellow-400 hover:text-black cursor-pointer capitalize"
                    >
                      {cat}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Button */}
            <button
              disabled={loading}
              className="w-full bg-yellow-400 text-black py-2 rounded-full font-semibold hover:bg-yellow-300 transition"
            >
              {loading ? "Creating..." : "Create Listing"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default New;
