import React from "react";
import API from "../utils/api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { useState } from "react";

const Booking = ({ price, listingId }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [totalPrice, setTotalPrice] = useState(null);
  const [order, setOrder] = useState(null);
  const [form, setForm] = useState({
    checkin: "",
    checkout: "",
    guests: 1,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please login to book this listing");
      navigate("/signin", {
        state: { from: location.pathname },
      });
      return;
    }

    try {
      // 🟡 FIRST CLICK → calculate price
      if (!totalPrice || !order) {
        const res = await API.post("/api/create-order", {
          listing: listingId,
          checkIn: form.checkin,
          checkOut: form.checkout,
          guests: Number(form.guests),
        });

        const { totalPrice: priceFromBackend, order: orderData } = res.data;

        setTotalPrice(priceFromBackend);
        setOrder(orderData);

        return; // stop here → don't open Razorpay yet
      }

      // 🟢 SECOND CLICK → open Razorpay
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: "INR",
        name: "Wanderlust",
        description: "Booking Payment",
        order_id: order.id,

        handler: async function (response) {
          const verify = await API.post("/api/verify-payment", response);

          if (verify.data.status === "success") {
            const bookConfirmed = await API.post("/api/bookings", {
              listing: listingId,
              checkIn: form.checkin,
              checkOut: form.checkout,
              guests: Number(form.guests),
              orderId: response.razorpay_order_id,
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature,
              paymentStatus: "paid",
            });
            navigate('/mybooking');
            toast.success("Booking confirmed ✅");
            
          }
        },

        theme: {
          color: "#facc15",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.log("FULL ERROR:", error.response?.data);
      console.log("payment error:", error);
    }
  };
  return (
    <div className="max-w-md bg-[#111] text-white rounded-2xl p-6 border border-white/10 shadow-2xl backdrop-blur-md">
      {/* Price */}
      <h2 className="text-2xl font-semibold mb-4">
        ₹{price} <span className="text-gray-400 text-sm">/ night</span>
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Dates */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-gray-400" htmlFor="checkin">
              Check-in
            </label>
            <input
              type="date"
              value={form.checkin}
              min={new Date().toISOString().split("T")[0]}
              className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-white focus:ring-2 focus:ring-yellow-400 outline-none"
              onChange={(e) => setForm({ ...form, checkin: e.target.value })}
              id="checkin"
              required
            />
          </div>

          <div>
            <label className="text-xs text-gray-400" htmlFor="checkout">
              Check-out
            </label>
            <input
              type="date"
              value={form.checkout}
              min={form.checkin || new Date().toISOString().split("T")[0]}
              className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-white focus:ring-2 focus:ring-yellow-400 outline-none"
              onChange={(e) => setForm({ ...form, checkout: e.target.value })}
              id="checkout"
              required
            />
          </div>
        </div>

        {/* Guests */}
        <div>
          <label className="text-xs text-gray-400">Guests</label>
          <input
            type="number"
            value={form.guests}
            min="1"
            className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-white focus:ring-2 focus:ring-yellow-400 outline-none"
            onChange={(e) => setForm({ ...form, guests: e.target.value })}
          />
        </div>

        {/* Divider */}
        <div className="border-t border-white/10"></div>
        {totalPrice && (
          <div className="text-lg font-semibold text-yellow-400 text-center">
            Total: ₹{totalPrice}
          </div>
        )}

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-yellow-400 text-black py-3 rounded-xl font-semibold hover:bg-yellow-300 transition duration-300 shadow-lg"
        >
          {totalPrice ? "Pay Now" : "Book Now"}
        </button>

        <p className="text-xs text-gray-500 text-center">
          Secure your luxury stay
        </p>
      </form>
    </div>
  );
};

export default Booking;
