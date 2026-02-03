const mongoose = require("mongoose");
const Listing = require("../models/listing");
const sampledatas = require("./data");

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

main()
  .then(console.log("connected db Successfully"))
  .catch((err) => console.log(err));

async function initDb() {
  //delete existing data
  await Listing.deleteMany({});
  await Listing.insertMany(sampledatas.data);
  console.log("data initialised")
}

initDb();