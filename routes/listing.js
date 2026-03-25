const express = require("express");
const router = express.Router();
const Listing = require("../models/listing");
const wrapAsync = require("../utils/wrapAsync");
const {isLoggedIn, isOwner, validate} = require("../middleware");

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
  isLoggedIn,
  validate,
  wrapAsync(async (req, res, next) => {
    const list = new Listing(req.body);
    list.owner = req.user._id;
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
    const data = await Listing.findById(id).populate("reviews").populate("owner");
    if(!data){
      req.flash("error","Listing does not exists !");
      return res.redirect("/listing");
    }
    res.render("./listing/show.ejs", { data });
  }),
);

//edit route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
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
  isLoggedIn,
  isOwner,
  validate,
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
  isOwner,
  wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Lisiting Deleted!");
    res.redirect("/listing");
  }),
);

module.exports = router;
