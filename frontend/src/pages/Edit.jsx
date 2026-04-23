import { useEffect, useState, useContext } from "react";
import API from "../utils/api";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";

const categories = [
  "trending", "rooms", "iconic", "mountains", "castles",
  "pools", "camping", "farms", "forest", "arctic",
  "boat", "spiritual", "desert"
];

const Edit = () => {
  const [file, setFile] = useState(null);
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false); // 🔥 dropdown state

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

  useEffect(() => {
    const fetchListing = async () => {
      const toastId = toast.loading("Fetching listing...");

      try {
        const res = await API.get(`/api/listings/${id}`);
        const data = res.data.data || res.data;

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
        setError("Failed to load listing");
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [id, user, navigate]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

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

      Object.entries(form).forEach(([key, value]) => {
        if (key !== "image") formData.append(key, value);
      });

      formData.set("price", Number(form.price));

      if (file) {
        formData.append("image", file);
      }

      await API.patch(`/api/listings/${id}`, formData);

      toast.success("Listing updated ✨", { id: toastId });
      navigate(`/listings/${id}`);
    } catch (err) {
      toast.dismiss(toastId);
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-red-400">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">

      <Navbar />

      <div className="pt-24 flex justify-center px-4">
        <div className="w-full max-w-2xl bg-white/5 border border-white/10 rounded-2xl p-8">

          <h2 className="text-3xl font-semibold mb-6 text-center">
            Edit Listing
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">

            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Title"
              className="w-full px-3 py-2 rounded bg-black text-white border border-white/20 focus:border-yellow-400 outline-none"
              required
            />

            <textarea
              name="desc"
              value={form.desc}
              onChange={handleChange}
              placeholder="Description"
              className="w-full px-3 py-2 rounded bg-black text-white border border-white/20 focus:border-yellow-400 outline-none"
              required
            />

            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full px-3 py-2 rounded bg-black text-white border border-white/20 focus:border-yellow-400 outline-none"
            />

            {form.image && (
              <img
                src={form.image}
                alt="preview"
                className="w-full h-[250px] object-cover rounded-xl"
              />
            )}

            {/* Custom Dropdown (opens upward) */}
            <div className="relative">
              <div
                onClick={() => setOpen(!open)}
                className="w-full px-3 py-2 rounded bg-black border border-white/20 cursor-pointer"
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

            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="Price"
                className="w-full px-3 py-2 rounded bg-black text-white border border-white/20 focus:border-yellow-400 outline-none"
                required
              />

              <input
                name="country"
                value={form.country}
                onChange={handleChange}
                placeholder="Country"
                className="w-full px-3 py-2 rounded bg-black text-white border border-white/20 focus:border-yellow-400 outline-none"
              />
            </div>

            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="Location"
              className="w-full px-3 py-2 rounded bg-black text-white border border-white/20 focus:border-yellow-400 outline-none"
              required
            />

            <button className="w-full bg-yellow-400 text-black py-2 rounded-full font-semibold hover:bg-yellow-300">
              Update Listing
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Edit;