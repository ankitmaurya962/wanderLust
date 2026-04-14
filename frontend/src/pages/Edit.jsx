import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";

const Edit = () => {
  const [file, setFile] = useState(null);
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    desc: "",
    price: "",
    location: "",
    country: "",
    category: "",
    image: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔹 Fetch existing listing
  useEffect(() => {
    const fetchListing = async () => {
      const toastId = toast.loading("Fetching listing...");

      try {
        const res = await axios.get(`/api/listings/${id}`);
        const data = res.data.data || res.data;

        // 🔐 OWNER CHECK (🔥 main fix)
        if (user && user._id !== data.owner?._id) {
          toast.dismiss(toastId);
          toast.error("You are not authorized ❌");
          navigate("/listings");
          return;
        }

        setForm({
          title: data.title || "",
          desc: data.desc || "",
          price: data.price || "",
          location: data.location || "",
          country: data.country || "",
          category: data.category || "",
          image: data.image?.url || "",
        });

        toast.dismiss(toastId);
      } catch (err) {
        toast.dismiss(toastId);
        console.error(err);
        setError("Failed to load listing");
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [id, user, navigate]);

  // 🔹 Handle input change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // 🔹 Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.price <= 0) {
      toast.error("Price must be greater than 0");
      return;
    }

    if (!form.category) {
      toast.error("Please select a category");
      return;
    }

    const toastId = toast.loading("Updating listing...");

    try {
      const formData = new FormData();

      formData.append("title", form.title);
      formData.append("desc", form.desc);
      formData.append("price", Number(form.price));
      formData.append("location", form.location);
      formData.append("country", form.country);
      formData.append("category", form.category);

      if (file) {
        formData.append("image", file);
      }

      await axios.patch(`/api/listings/${id}`, formData);

      toast.success("Listing updated successfully ✨", { id: toastId });

      navigate(`/listings/${id}`);
    } catch (err) {
      toast.dismiss(toastId);
      console.error(err);
    }
  };

  if (loading) return <h2 className="text-center mt-10">Loading...</h2>;
  if (error) return <h2 className="text-center text-red-500">{error}</h2>;

  return (
    <div className="px-6 md:px-12 py-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Edit Listing</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full border p-2 rounded"
          required
        />

        <textarea
          name="desc"
          value={form.desc}
          onChange={handleChange}
          placeholder="Description"
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full border p-2 rounded"
        />

        {form.image && (
          <img
            src={form.image}
            alt="preview"
            className="w-full h-[250px] object-cover rounded"
          />
        )}

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        >
          <option value="">Select Category</option>
          <option value="trending">Trending</option>
          <option value="rooms">Rooms</option>
          <option value="iconic">Iconic Cities</option>
          <option value="mountains">Mountains</option>
          <option value="castles">Castles</option>
          <option value="pools">Pools</option>
          <option value="camping">Camping</option>
          <option value="farms">Farms</option>
          <option value="forest">Forest</option>
          <option value="arctic">Arctic</option>
          <option value="boat">Boat</option>
          <option value="spiritual">Spiritual</option>
          <option value="desert">Desert</option>
        </select>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Price"
            className="border p-2 rounded"
            required
          />

          <input
            type="text"
            name="country"
            value={form.country}
            onChange={handleChange}
            placeholder="Country"
            className="border p-2 rounded"
          />
        </div>

        <input
          type="text"
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="Location"
          className="w-full border p-2 rounded"
          required
        />

        <button className="bg-black text-white px-4 py-2 rounded">
          Update Listing
        </button>
      </form>
    </div>
  );
};

export default Edit;
