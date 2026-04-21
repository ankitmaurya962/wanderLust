import React, { useEffect, useState } from "react";
import API from "../utils/api";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";

const MyBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [loadingId, setLoadingId] = useState(null);

  const cancelHandler = async (id) => {
    const confirm = window.confirm("Are you sure you want to cancel?");
    if (!confirm) return;

    try {
      setLoadingId(id);

      const res = await API.patch(`/api/bookings/${id}/cancel`);

      // ✅ Update UI instantly
      setBookings((prev) =>
        prev.map((b) =>
          b._id === id
            ? { ...b, bookingStatus: "cancelled", paymentStatus: "refunded" }
            : b,
        ),
      );

      toast.success(res.data.message || "Booking cancelled");
    } catch (err) {
      const msg = err.response?.data?.message || "Booking cancel failed";

      toast.error(msg);
    } finally {
      setLoadingId(null);
    }
  };

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const res = await API.get("/api/mybooking");
        setBookings(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBooking();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <Navbar />

      <div className="pt-24 px-6 md:px-12 pb-10">
        <h1 className="text-3xl font-semibold mb-8">My Bookings</h1>

        {bookings.length === 0 ? (
          <p className="text-gray-400">No bookings found</p>
        ) : (
          <div className="grid gap-6">
            {bookings.map((b) => (
              <div
                key={b._id}
                className="bg-white/5 backdrop-blur-md rounded-xl p-5 flex gap-5 border border-white/10 hover:scale-[1.02] transition"
              >
                {/* Image */}
                <img
                  src={b.listing?.image.url}
                  className="w-36 h-36 object-cover rounded-xl"
                  alt=""
                />

                {/* Content */}
                <div className="flex flex-col justify-between w-full">
                  <div>
                    <h2 className="text-xl font-semibold">
                      {b.listing?.title}
                    </h2>

                    <p className="text-gray-400 text-sm">
                      {b.listing?.location}
                    </p>

                    <p className="mt-2 text-sm text-gray-300">
                      📅 {new Date(b.checkIn).toDateString()} →{" "}
                      {new Date(b.checkOut).toDateString()}
                    </p>

                    <p className="text-sm text-gray-300">
                      👤 Guests: {b.guests}
                    </p>
                  </div>

                  {/* Bottom */}
                  <div className="flex justify-between items-center mt-3">
                    <p className="text-lg font-bold text-yellow-400">
                      ₹{b.totalPrice}
                    </p>

                    <span
                      className={`text-sm px-3 py-1 rounded-full ${
                        b.bookingStatus === "confirmed"
                          ? "bg-green-600"
                          : b.bookingStatus === "cancelled"
                            ? "bg-red-600"
                            : "bg-yellow-400 text-black"
                      }`}
                    >
                      {b.bookingStatus}
                    </span>
                  </div>

                  {/* Buttons */}
                  <div className="mt-3 flex gap-3">
                    <button className="bg-yellow-400 text-black px-4 py-1 rounded-full font-medium hover:bg-yellow-300 transition">
                      View
                    </button>

                    <button
                      className="bg-red-500 px-4 py-1 rounded-full hover:bg-red-600 transition"
                      onClick={() => cancelHandler(b._id)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBooking;
