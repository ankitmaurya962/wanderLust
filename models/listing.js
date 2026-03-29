const mongoose = require("mongoose");
const Review = require("./review.js");
// const User = require("./user.js");
const Schema = mongoose.Schema;
const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
  },
  image: {
    url: String,
    filename: String,
  },
  price: {
    type: Number,
  },
  location: {
    type: String,
  },
  geometry: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ["Point"], // 'location.type' must be 'Point'
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  country: {
    type: String,
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  category: {
    type: String,
    enum: [
      "trending",
      "rooms",
      "iconic",
      "mountains",
      "castles",
      "pools",
      "camping",
      "farms",
      "arctic",
      "boat",
      "spiritual",
      "forest",
      "desert"
    ],
  },
});

// ADD GEO INDEX HERE
listingSchema.index({ geometry: "2dsphere" });

//middleware to delete review after deleting listing
listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});
const Listing = mongoose.model("listing", listingSchema);
module.exports = Listing;
