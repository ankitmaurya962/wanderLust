import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast"; // ✅ added

const New = () => {
  const navigate = useNavigate();

  const [file, setFile] = useState(null);

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

  // handle input change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const toastId = toast.loading("Creating listing..."); // ✅ added

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("title", form.title);
      formData.append("price", Number(form.price));
      formData.append("location", form.location);
      formData.append("country", form.country);
      formData.append("desc", form.desc);
      formData.append("category", form.category);
      formData.append("image", file);

      const res = await axios.post("/api/listings", formData);

      console.log(res.data);

      toast.success("Listing created successfully 🎉", { id: toastId }); // ✅ added

      navigate("/listings");
    } catch (err) {
      toast.dismiss(toastId); // ✅ added
      console.error(err.response?.data || err.message);
      // ❌ removed alert (interceptor will handle error)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-6 md:px-12 py-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Create New Listing</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          name="price"
          placeholder="Price"
          type="number"
          value={form.price}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          name="country"
          placeholder="Country"
          value={form.country}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full border p-2 rounded"
        />

        <textarea
          name="desc"
          placeholder="Description"
          value={form.desc}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="">Select Category</option>
          <option value="trending">Trending</option>
          <option value="rooms">Rooms</option>
          <option value="iconic">Iconic</option>
          <option value="mountains">Mountains</option>
          <option value="castles">Castles</option>
          <option value="pools">Pools</option>
          <option value="camping">Camping</option>
          <option value="farms">Farms</option>
          <option value="arctic">Arctic</option>
          <option value="boat">Boat</option>
          <option value="spiritual">Spiritual</option>
          <option value="forest">Forest</option>
          <option value="desert">Desert</option>
        </select>

        <button
          disabled={loading}
          className="bg-black text-white px-4 py-2 rounded"
        >
          {loading ? "Creating..." : "Create"}
        </button>
      </form>
    </div>
  );
};

export default New;
