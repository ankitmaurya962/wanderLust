const express = require("express");
const mongoose = require("mongoose");
const Listing = require("./models/listing");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "public")));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

main()
  .then(() => console.log("connected DB"))
  .catch((err) => console.log(err));

//home
app.get("/", async (req, res) => {
  res.send("home route");
});
//index route
app.get("/listing", async (req, res) => {
  const AllList = await Listing.find({});
  res.render("./listing/index.ejs", { AllList });
});

//new route
app.get("/listing/new", async (req, res) => {
  res.render("./listing/new");
});
//create
app.post("/listing", async (req, res) => {
  const list = new Listing(req.body);
  await list.save().then(() => console.log(list));
  res.redirect("/listing");
});

//show
app.get("/listing/:id", async (req, res) => {
  const { id } = req.params;
  const data = await Listing.findById(id);
  res.render("./listing/show.ejs", { data });
});

//edit route
app.get("/listing/:id/edit", async (req, res) => {
  const { id } = req.params;
  const list = await Listing.findById(id);
  res.render("./listing/edit", { list });
});

app.patch("/listing/:id", async (req, res) => {
  const { id } = req.params;
  const newList = req.body;
  const list = await Listing.findByIdAndUpdate(id, newList, { new: true });
  console.log(list);
  res.redirect("/listing");
});

//delete
app.delete("/listing/:id", async (req, res) => {
  const { id } = req.params;
  const deleted = await Listing.findByIdAndDelete(id);
  console.log(deleted);
  res.redirect("/listing");
});

app.listen(8080, () => {
  console.log("listening on port 8080");
});
