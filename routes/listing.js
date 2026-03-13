const express = require("express");
const router = express.Router();
const Listing = require("../models/listing");
const wrapAsync = require("../utils/wrapAsync");
const { listingSchema} = require("../schema");
const CustomError = require("../utils/CustomError");

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
router.get(
  "/new",
  wrapAsync(async (req, res, next) => {
    res.render("./listing/new");
  }),
);
//create
router.post(
  "/",
  validate,
  wrapAsync(async (req, res, next) => {
    const list = new Listing(req.body);
    await list.save().then(() => console.log(list));
    res.redirect("/listing");
  }),
);

//show
router.get(
  "/:id",
  wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const data = await Listing.findById(id).populate("reviews");
    res.render("./listing/show.ejs", { data });
  }),
);

//edit route
router.get(
  "/:id/edit",
  wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const list = await Listing.findById(id);
    res.render("./listing/edit", { list });
  }),
);

router.patch(
  "/:id",
  validate,
  wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const newList = req.body;
    await Listing.findByIdAndUpdate(id, newList, { new: true });
    res.redirect("/listing");
  }),
);

//delete
router.delete(
  "/:id",
  wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const deleted = await Listing.findByIdAndDelete(id);
    console.log(deleted);
    res.redirect("/listing");
  }),
);

module.exports = router;
