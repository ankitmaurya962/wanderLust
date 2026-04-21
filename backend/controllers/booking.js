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
  const refund = await razorpay.payments.refund(booking.paymentId, {
    amount: booking.totalPrice*100,
  });
  res.json(refund);
};
