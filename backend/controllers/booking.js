const Booking = require("../models/booking");
const Listing = require("../models/listing");
const calculatePrice = require("../utils/calculatePrice");
const Razorpay = require("razorpay");

module.exports.bookingController = async (req, res, next) => {
  const { listing, checkIn, checkOut, guests } = req.body;

  const listingData = await Listing.findById(listing);

  if (!listingData) {
    return res.status(404).json({ message: "Listing not found" });
  }

  const { totalPrice } = calculatePrice(listingData, checkIn, checkOut, guests);

  const book = new Booking({
    listing,
    checkIn,
    checkOut,
    guests,
    totalPrice,

    orderId: req.body.orderId,
    paymentId: req.body.paymentId,
    signature: req.body.signature,

    paymentStatus: "paid",
  });

  if (req.user) {
    book.user = req.user._id;
  }

  await book.save();

  res.status(201).json({
    success: true,
    message: "Booking Confirmed",
    data: book,
  });
};

module.exports.previewRefund = async (req, res, next) => {
  const { id } = req.params;
  const booking = await Booking.findById(id);
  if (!booking) {
    return res.status(404).json({ message: "Booking not found" });
  }
  const now = new Date();
  const checkin = new Date(booking.checkIn);
  const diff = (checkin - now) / (1000 * 60 * 60);
  const totalPrice = booking.totalPrice;
  let refund = 0;
  if (diff > 72) {
    refund = totalPrice;
  } else if (diff > 24) {
    refund = totalPrice * 0.5;
  }

  res.json({
    refund,
  });
};

module.exports.cancelBooking = async (req, res, next) => {
  const razorpay = new Razorpay({
    key_id: process.env.RAZOR_KEY_ID,
    key_secret: process.env.RAZOR_KEY_SECRET,
  });

  const { id } = req.params;

  const booking = await Booking.findById(id);

  if (!booking) {
    return res.status(404).json({ message: "Booking not found" });
  }

  if (booking.bookingStatus === "cancelled") {
    return res.status(400).json({ message: "Already cancelled" });
  }

  const now = new Date();
  const checkin = new Date(booking.checkIn);
  const diff = (checkin - now) / (1000 * 60 * 60);
  const totalPrice = booking.totalPrice;
  let refundAmount = 0;
  if (diff > 72) {
    refundAmount = totalPrice;
  } else if (diff > 24) {
    refundAmount = totalPrice * 0.5;
  }
  
  if (refundAmount <= 0) {
  booking.bookingStatus = 'cancelled';
  await booking.save();
  return res.json({ message: "Booking cancelled. No refund applicable." });
}
  const refund = await razorpay.payments.refund(booking.paymentId, {
    amount: Math.round(refundAmount * 100),
  });

  booking.bookingStatus = 'cancelled';
  await booking.save();
  res.json(refund);
};
