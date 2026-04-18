const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const bookingSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    listing: {
      type: Schema.Types.ObjectId,
      ref: "Listing",
      required: true,
    },

    checkIn: {
      type: Date,
      required: true,
    },

    checkOut: {
      type: Date,
      required: true,
    },

    guests: Number,

    totalPrice: {
      type: Number,
      required: true,
    },

    orderId: String,
    paymentId: String,
    signature: String,

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },

    bookingStatus: {
      type: String,
      enum: ["confirmed", "cancelled"],
      default: "confirmed",
    },
  },
  { timestamps: true },
);
const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;
