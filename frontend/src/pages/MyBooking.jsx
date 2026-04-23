import React, { useEffect, useState } from "react";
import API from "../utils/api";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const MyBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [loadingId, setLoadingId] = useState(null);
  const navigate = useNavigate();

  const [selectedBooking, setSelectedBooking] = useState(null);
  const [modalRefund, setModalRefund] = useState(null);
  const [loadingRefund, setLoadingRefund] = useState(false);

  const openCancelModal = async (id) => {
    setSelectedBooking(id);
    setLoadingRefund(true);

    try {
      const res = await API.get(`/api/bookings/${id}/refund-preview`);
      setModalRefund(res.data.refund);
    } catch {
      toast.error("Failed to fetch refund");
      setSelectedBooking(null);
    } finally {
      setLoadingRefund(false);
    }
  };

  const confirmCancel = async () => {
    try {
      setLoadingId(selectedBooking);

      await API.patch(`/api/bookings/${selectedBooking}/cancel`);

      setBookings((prev) =>
        prev.map((b) =>
          b._id === selectedBooking
            ? { ...b, bookingStatus: "cancelled", paymentStatus: "refunded" }
            : b,
        ),
      );

      toast.success("Booking cancelled");
      setSelectedBooking(null);
      setModalRefund(null);
    } catch {
      toast.error("Cancel failed");
    } finally {
      setLoadingId(null);
    }
  };

  const deleteBooking = async (id) => {
    try {
      setLoadingId(id);

      await API.delete(`/api/bookings/${id}`);

      // remove from UI
      setBookings((prev) => prev.filter((b) => b._id !== id));

      toast.success("Booking deleted");
    } catch (err) {
      toast.error("Delete failed");
    } finally {
      setLoadingId(null);
    }
  };

  useEffect(() => {
    const fetchBooking = async () => {
      const res = await API.get("/api/mybooking");
      setBookings(res.data);
    };
    fetchBooking();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="pt-24 px-6 md:px-12 pb-10">
        <h1 className="text-3xl font-semibold mb-8 tracking-wide">
          My Bookings
        </h1>

        {bookings.length === 0 ? (
          <p className="text-gray-400 text-center mt-20">No bookings found</p>
        ) : (
          <div className="grid gap-6">
            {bookings.map((b) => (
              <div
                key={b._id}
                className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 flex gap-5 hover:scale-[1.02] transition duration-300 shadow-lg"
              >
                {b.bookingStatus === "cancelled" && (
                  <button
                    onClick={() => deleteBooking(b._id)}
                    disabled={loadingId === b._id}
                    className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-black/40 hover:bg-red-500/80 text-white transition"
                  >
                    {loadingId === b._id ? "..." : "✕"}
                  </button>
                )}
                {/* image */}
                <img
                  src={b.listing?.image?.url}
                  className="w-40 h-40 object-cover rounded-xl"
                  alt=""
                />

                {/* content */}
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

                  {/* bottom */}
                  <div className="flex justify-between items-center mt-3">
                    <p className="text-lg font-bold text-yellow-400">
                      ₹{b.totalPrice}
                    </p>

                    <span
                      className={`text-xs px-3 py-1 rounded-full font-medium ${
                        b.bookingStatus === "confirmed"
                          ? "bg-green-600/80"
                          : "bg-red-600/80"
                      }`}
                    >
                      {b.bookingStatus}
                    </span>
                  </div>

                  {/* actions */}
                  <div className="mt-4 flex items-center justify-between">
                    {/* LEFT SIDE */}
                    <button
                      className="bg-yellow-400 text-black px-4 py-1.5 rounded-full font-medium hover:bg-yellow-300 transition"
                      onClick={() => navigate(`/listings/${b.listing?._id}`)}
                    >
                      View
                    </button>

                    {/* RIGHT SIDE */}
                    <div>
                      {b.bookingStatus === "confirmed" ? (
                        <button
                          className="bg-red-500 px-4 py-1.5 rounded-full hover:bg-red-600 transition"
                          onClick={() => openCancelModal(b._id)}
                        >
                          Cancel Booking
                        </button>
                      ) : (
                        <span className="text-green-400 text-sm font-medium">
                          Refunded
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 🔥 MODAL (UPGRADED) */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 text-white p-6 rounded-2xl w-80 shadow-2xl animate-fadeIn">
            <h2 className="text-lg font-semibold mb-3 text-center">
              Cancel Booking
            </h2>

            {loadingRefund ? (
              <p className="text-center text-gray-300">Calculating refund...</p>
            ) : (
              <>
                <p className="text-sm text-gray-300 text-center">
                  Refund Amount
                </p>

                <p className="text-2xl font-bold text-yellow-400 text-center my-3">
                  ₹{modalRefund}
                </p>

                {modalRefund === 0 && (
                  <p className="text-red-400 text-xs text-center mb-3">
                    No refund will be issued
                  </p>
                )}
              </>
            )}

            <div className="flex justify-between gap-3 mt-4">
              <button
                className="w-full py-1.5 rounded-full bg-gray-600 hover:bg-gray-500 transition"
                onClick={() => {
                  setSelectedBooking(null);
                  setModalRefund(null);
                }}
              >
                Close
              </button>

              <button
                className="w-full py-1.5 rounded-full bg-red-500 hover:bg-red-600 transition disabled:opacity-50"
                onClick={confirmCancel}
                disabled={loadingRefund || loadingId === selectedBooking}
              >
                {loadingId === selectedBooking ? "Cancelling..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBooking;
