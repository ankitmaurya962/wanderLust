import React, { useEffect, useState, useContext } from "react";
import API from "../utils/api";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import Map from "../components/Map";
import StarRating from "../components/StarRating";
import Rating from "@mui/material/Rating";
import Navbar from "../components/Navbar";
import Booking from "../components/Booking";

const Show = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchListing = async () => {
      try {
        const res = await API.get(`/api/listings/${id}`);
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

  const handleDeleteListing = async () => {
    const toastId = toast.loading("Deleting listing...");
    try {
      await API.delete(`/api/listings/${id}`);
      toast.success("Listing deleted 🗑️", { id: toastId });
      navigate("/listings");
    } catch (err) {
      toast.dismiss(toastId);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    const toastId = toast.loading("Adding review...");
    try {
      await API.post(`/api/listings/${id}/reviews`, {
        review: {
          rating: Number(rating),
          comments: comment,
        },
      });

      toast.success("Review added 🎉", { id: toastId });

      const res = await API.get(`/api/listings/${id}`);
      setListing(res.data);

      setRating(1);
      setComment("");
    } catch (err) {
      toast.dismiss(toastId);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    const toastId = toast.loading("Deleting review...");
    try {
      await API.delete(`/api/listings/${id}/reviews/${reviewId}`);
      toast.success("Review deleted 🗑️", { id: toastId });

      setListing((prev) => ({
        ...prev,
        reviews: prev.reviews.filter((r) => r._id !== reviewId),
      }));
    } catch (err) {
      toast.dismiss(toastId);
    }
  };

  // UI states
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

  if (!listing) return null;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <Navbar />

      <div className="pt-24 px-6 md:px-12 pb-10 max-w-6xl mx-auto">
        {/* Title */}
        <h2 className="text-3xl font-semibold mb-6">{listing.title}</h2>

        {/* Image */}
        <img
          src={
            listing.image?.url ||
            "https://res.cloudinary.com/dldtcjzis/image/upload/v1776517498/defaultlisting_zpazmc.jpg"
          }
          alt="listing"
          className="w-full h-[400px] object-cover rounded-xl border border-white/10"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-6">
          {/* LEFT SIDE (Details) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Info */}
            <div className="space-y-2 text-gray-300">
              <p className="font-semibold text-white">
                Hosted by {listing.owner?.username}
              </p>
              <p>{listing.desc}</p>
              <p>
                {listing.location}, {listing.country}
              </p>
              <p className="text-xl font-semibold text-yellow-400">
                ₹{listing.price?.toLocaleString("en-IN")}
              </p>
            </div>
          </div>

          {/* RIGHT SIDE (Booking Card) */}
          <div className="lg:col-span-1">
            <div className="sticky top-28">
              <Booking price={listing.price} listingId={listing._id} />
            </div>
          </div>
        </div>

        {/* Owner Actions */}
        {user?._id === listing.owner?._id && (
          <div className="flex gap-4 mt-6">
            <button
              onClick={() => navigate(`/listings/${id}/edit`)}
              className="bg-yellow-400 text-black px-4 py-2 rounded-full font-medium"
            >
              Edit
            </button>

            <button
              onClick={handleDeleteListing}
              className="bg-red-500 px-4 py-2 rounded-full"
            >
              Delete
            </button>
          </div>
        )}

        <hr className="my-8 border-white/10" />

        {/* Review Form */}
        <h4 className="text-xl font-semibold mb-4">Leave a Review</h4>

        <form
          onSubmit={handleReviewSubmit}
          className="space-y-4 bg-white/5 p-4 rounded-xl border border-white/10"
        >
          <div>
            <label className="block mb-2">Rating</label>

            <Rating
              value={rating}
              onChange={(event, newValue) => {
                setRating(newValue || 1);
              }}
              size="large"
              sx={{
                color: "#facc15", // filled stars (yellow)
                "& .MuiRating-iconEmpty": {
                  color: "#555", // 👈 visible empty stars (gray)
                },
              }}
            />
          </div>

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your review..."
            className="w-full p-2 rounded bg-black border border-white/20"
            required
          />

          <button className="bg-yellow-400 text-black px-4 py-2 rounded-full font-medium">
            Submit
          </button>
        </form>

        <hr className="my-8 border-white/10" />

        {/* Reviews */}
        {listing.reviews?.length > 0 && (
          <>
            <h4 className="text-xl font-semibold mb-4">All Reviews</h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {listing.reviews.map((review) => (
                <div
                  key={review._id}
                  className="bg-white/5 p-4 rounded-xl border border-white/10"
                >
                  <h5 className="font-semibold text-white">
                    {review.author?.username}
                  </h5>

                  <StarRating value={review.rating} />

                  <p className="text-gray-300">{review.comments}</p>

                  {user?._id === review.author?._id && (
                    <button
                      onClick={() => handleDeleteReview(review._id)}
                      className="mt-2 text-sm bg-red-500 px-3 py-1 rounded-full"
                    >
                      Delete
                    </button>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        <hr className="my-8 border-white/10" />

        {/* Map */}
        <h4 className="text-xl font-semibold mb-4">Location</h4>

        <div className="h-[300px] rounded-xl overflow-hidden border border-white/10">
          {listing.geometry?.coordinates && (
            <Map
              coordinates={listing.geometry.coordinates}
              title={listing.title}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Show;
