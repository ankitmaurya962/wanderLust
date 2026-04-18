import React from "react";
import API from "../utils/api";
const Booking = ({ price }) => {
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const res = await API.post("api/create-order", {
        amount: price,
      });

      const order = res.data;
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: "INR",
        name: "Wanderlust",
        description: "Booking Payment",
        order_id: order.id,

        handler: async function (response) {
          // send to backend for verification
          const res = await API.post("api/verify-payment", response);
          console.log(res.data);
        },

        theme: {
          color: "#3399cc",
        },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.log("FULL ERROR:", error.response?.data);
      console.log("paymeny error: ", error);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex">
          <label htmlFor="checkin">Check In</label>
          <input type="date" name="checkin" id="checkin" />

          <label htmlFor="checkout">Check Out</label>
          <input type="date" name="checkout" id="checkout" />
        </div>

        <button className="red-400">Book Now</button>
      </form>
    </div>
  );
};

export default Booking;
