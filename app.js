const express = require("express");
const mongoose = require("mongoose");
const Listing = require("./models/listing");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const CustomError = require("./utils/CustomError");
const wrapAsync = require("./utils/wrapAsync");
const { listingSchema, reviewSchema } = require("./schema");
const Review = require("./models/review");

const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.json());
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

//validation for listing
const validate = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new CustomError(400, errMsg);
  } else {
    next();
  }
};
//review validation
const reviewValidate = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);

  if (error) {
    const errMsg = error.details.map(el => el.message).join(",");
    throw new CustomError(400, errMsg);
  }else{
    next();
  }
};
//home
app.get(
  "/",
  wrapAsync(async (req, res, next) => {
    res.send("home route");
  }),
);

//index route
app.get(
  "/listing",
  wrapAsync(async (req, res, next) => {
    const AllList = await Listing.find({});
    res.render("./listing/index.ejs", { AllList });
  }),
);

//new route
app.get(
  "/listing/new",
  wrapAsync(async (req, res, next) => {
    res.render("./listing/new");
  }),
);
//create
app.post(
  "/listing",
  validate,
  wrapAsync(async (req, res, next) => {
    const list = new Listing(req.body);
    await list.save().then(() => console.log(list));
    res.redirect("/listing");
  }),
);

//show
app.get(
  "/listing/:id",
  wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const data = await Listing.findById(id).populate("reviews");
    res.render("./listing/show.ejs", { data });
  }),
);

//edit route
app.get(
  "/listing/:id/edit",
  wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const list = await Listing.findById(id);
    res.render("./listing/edit", { list });
  }),
);

app.patch(
  "/listing/:id",
  validate,
  wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const newList = req.body;
    await Listing.findByIdAndUpdate(id, newList, { new: true });
    res.redirect("/listing");
  }),
);

//delete
app.delete(
  "/listing/:id",
  wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const deleted = await Listing.findByIdAndDelete(id);
    console.log(deleted);
    res.redirect("/listing");
  }),
);

//review
app.post(
  "/listing/:id/reviews",
  reviewValidate,
  wrapAsync(async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    console.log(req.body);
    let newReview = new Review(req.body.review);
    listing.reviews.push(newReview._id);

    await newReview.save();
    await listing.save();

    res.redirect(`/listing/${listing._id}`);
  }),
);

//if page is not found (if no route is found)
app.use((req, res, next) => {
  next(new CustomError(404, "page not found"));
});

app.use((err, req, res, next) => {
  let { status = 500, message = "something went wrong" } = err;
  res.status(status).render("error", { message });
});

app.listen(8080, () => {
  console.log("listening on port 8080");
});
