const express = require("express");
const router = express.Router();
const Listing = require("../models/listing");
const wrapAsync = require("../utils/wrapAsync");
const { listingSchema} = require("../schema");
const CustomError = require("../utils/CustomError");
const {isLoggedIn} = require("../middleware");

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

//index route
router.get(
  "/",
  wrapAsync(async (req, res, next) => {
    const AllList = await Listing.find({});
    res.render("./listing/index.ejs", { AllList });
  }),
);

//new route
router.get("/new", isLoggedIn, (req, res) => {
  res.render("listing/new");
});
//create
router.post(
  "/",
  validate,
  isLoggedIn,
  wrapAsync(async (req, res, next) => {
    const list = new Listing(req.body);
    await list.save();
    req.flash("success", "new listing added");
    res.redirect("./listing");
  }),
);

//show
router.get(
  "/:id",
  wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const data = await Listing.findById(id).populate("reviews");
    if(!data){
      req.flash("error","Lisiting does not exists !");
      return res.redirect("/listing");
    }
    res.render("./listing/show.ejs", { data });
  }),
);

//edit route
router.get(
  "/:id/edit",
  isLoggedIn,
  wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const list = await Listing.findById(id);
    if(!list){
      req.flash("error","Listing does not exists !");
      return res.redirect("/listing");
    }
    res.render("./listing/edit", { list });
  }),
);

router.patch(
  "/:id",
  validate,
  isLoggedIn,
  wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const newList = req.body;
    await Listing.findByIdAndUpdate(id, newList);
    req.flash("success", "Lisiting updated!");
    res.redirect("/listing");
  }),
);

//delete
router.delete(
  "/:id",
  isLoggedIn,
  wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Lisiting Deleted!");
    res.redirect("/listing");
  }),
);

module.exports = router;
