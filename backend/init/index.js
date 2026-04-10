require("dotenv").config({ path: "../.env" });

const mongoose = require("mongoose");
const Listing = require("../models/listing");
const sampledatas = require("./data");

async function main() {
  await mongoose.connect(process.env.ATLASDB_URL);
}

main()
  .then(() => console.log("connected db Successfully"))
  .catch((err) => console.log(err));

async function initDb() {
  //delete existing data
  await Listing.deleteMany({});
  sampledatas.data = sampledatas.data.map((obj) =>({...obj, owner: "69c01c45734c328613b6f5a0"}));
  await Listing.insertMany(sampledatas.data);
  console.log("data initialised")
}

initDb();