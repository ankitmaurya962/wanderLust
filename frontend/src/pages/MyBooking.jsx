import React, { useEffect } from "react";
import API from "../utils/api";
import { useState } from "react";
const MyBooking = () => {
const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const res = await API.get("/api/mybooking");
        console.log(res.data);
        setBookings(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBooking();
  }, []);
  return (
    <div className="pt-20">
      <h1 className="text-white text-3xl">My Bookings</h1>
      {bookings.map((e)=>(<h1>{e.totalPrice}</h1>))}
    </div>
  );
};

export default MyBooking;
