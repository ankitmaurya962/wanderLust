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
  country: {
    type: String,
  },
  reviews:[
     {
      type: Schema.Types.ObjectId,
      ref: 'Review',
     }
  ],
  owner:
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
});
//middleware to delete review after deleting listing

listingSchema.post("findOneAndDelete", async(listing)=>{
  if(listing){
    await Review.deleteMany({_id: {$in: listing.reviews}});
  }
})
const Listing = mongoose.model("listing", listingSchema);
module.exports = Listing;
