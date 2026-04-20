const Razorpay = require("razorpay");
const Listing = require("../models/listing");
const calculatePrice = require("../utils/calculatePrice");
const CustomError = require("../utils/CustomError");

exports.createOrder = async (req, res) => {
  const razorpay = new Razorpay({
    key_id: process.env.RAZOR_KEY_ID,
    key_secret: process.env.RAZOR_KEY_SECRET,
  });

  const { listing, checkIn, checkOut, guests } = req.body;

  const listingData = await Listing.findById(listing);

  if (!listingData) {
    throw new CustomError(404, "Listing not found");
  }

  const result = calculatePrice(
    listingData,
    checkIn,
    checkOut,
    guests || 1
  );

  const totalPrice = result.totalPrice;

  const options = {
    amount: totalPrice * 100,
    currency: "INR",
    receipt: `receipt_${Date.now()}`,
    notes: {
      listing,
      checkIn,
      checkOut,
      guests: guests || 1,
    },
  };

  const order = await razorpay.orders.create(options);

  res.status(200).json({
    success: true,
    order,
    totalPrice,
  });
};