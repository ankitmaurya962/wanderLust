import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Show = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Review form state
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");

  // 🔹 Fetch listing
  useEffect(() => {
    if (!id) return;

    const fetchListing = async () => {
      try {
        const res = await axios.get(`/api/listings/${id}`);
        setListing(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load listing");
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [id]);

  // 🔹 Delete listing (no auth check)
  const handleDeleteListing = async () => {
    try {
      await axios.delete(`/api/listings/${id}`);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  // 🔹 Add review
  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`/api/listings/${id}/reviews`, {
        rating,
        comments: comment,
      });

      // Refresh listing
      const res = await axios.get(`/api/listings/${id}`);
      setListing(res.data);

      setRating(1);
      setComment("");
    } catch (err) {
      console.error(err);
    }
  };

  // 🔹 Delete review
  const handleDeleteReview = async (reviewId) => {
    try {
      await axios.delete(`/api/listings/${id}/reviews/${reviewId}`);

      // Update UI without refetch
      setListing((prev) => ({
        ...prev,
        reviews: prev.reviews.filter((r) => r._id !== reviewId),
      }));
    } catch (err) {
      console.error(err);
    }
  };

  // 🔹 UI states
  if (loading) return <h2 className="text-center mt-10">Loading...</h2>;
  if (error) return <h2 className="text-center text-red-500 mt-10">{error}</h2>;
  if (!listing) return <h2>No listing found</h2>;

  return (
    <div className="px-6 md:px-12 py-6">
      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <h2 className="text-3xl font-semibold mb-4">{listing.title}</h2>

        {/* Image */}
        <img
          src={listing.image?.url || "https://via.placeholder.com/400"}
          alt="listing"
          className="w-full h-[400px] object-cover rounded-xl"
        />

        {/* Info */}
        <div className="mt-4 space-y-2">
          <p className="font-semibold">{listing.owner?.username}</p>

          <p>{listing.desc}</p>

          <p>
            {listing.location}, {listing.country}
          </p>

          <p className="text-xl font-semibold">
            ₹{listing.price?.toLocaleString("en-IN")}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mt-4">
          {user?._id === listing.owner?._id && (
            <>
              <button
                onClick={() => navigate(`/listings/${id}/edit`)}
                className="bg-black text-white px-4 py-2 rounded"
              >
                Edit
              </button>

              <button
                onClick={handleDeleteListing}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </>
          )}
        </div>

        <hr className="my-6" />

        {/* 🔹 Review Form */}
        <h4 className="text-xl font-semibold mb-2">Leave a Review</h4>

        <form onSubmit={handleReviewSubmit} className="space-y-4">
          <div>
            <label>Rating</label>
            <select
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="border p-2 rounded w-full"
            >
              {[1, 2, 3, 4, 5].map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Comments</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="border p-2 rounded w-full"
              required
            />
          </div>

          <button className="border px-4 py-2 rounded">Submit</button>
        </form>

        <hr className="my-6" />

        {/* 🔹 Reviews */}
        {listing.reviews?.length > 0 && (
          <>
            <h4 className="text-xl font-semibold mb-4">All Reviews</h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {listing.reviews.map((review) => (
                <div key={review._id} className="border p-4 rounded shadow">
                  <h5 className="font-semibold">{review.author?.username}</h5>

                  <p>{review.comments}</p>

                  <p>⭐ {review.rating}</p>

                  <button
                    onClick={() => handleDeleteReview(review._id)}
                    className="mt-2 text-sm bg-black text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        <hr className="my-6" />

        {/* Map */}
        <h4 className="text-xl font-semibold mb-2">Location</h4>

        <div className="h-[300px] bg-gray-200 flex items-center justify-center rounded">
          Map coming soon
        </div>
      </div>
    </div>
  );
};

export default Show;
