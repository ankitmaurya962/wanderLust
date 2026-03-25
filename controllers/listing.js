const Listing = require("../models/listing");

module.exports.index = async (req, res, next) => {
  const AllList = await Listing.find({});
  res.render("./listing/index.ejs", { AllList });
};

module.exports.renderNewForm = (req, res) => {
  res.render("listing/new");
};

module.exports.newListing = async (req, res, next) => {
  const list = new Listing(req.body);
  list.owner = req.user._id;
  await list.save();
  req.flash("success", "new listing added");
  res.redirect("./listing");
};

module.exports.show = async (req, res, next) => {
  const { id } = req.params;
  const data = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");
  if (!data) {
    req.flash("error", "Listing does not exists !");
    return res.redirect("/listing");
  }
  res.render("./listing/show.ejs", { data });
};

module.exports.renderEditForm = async (req, res, next) => {
  const { id } = req.params;
  const list = await Listing.findById(id);
  if (!list) {
    req.flash("error", "Listing does not exists !");
    return res.redirect("/listing");
  }
  res.render("./listing/edit", { list });
};

module.exports.edit = async (req, res, next) => {
  const { id } = req.params;
  const newList = req.body;
  await Listing.findByIdAndUpdate(id, newList);
  req.flash("success", "Lisiting updated!");
  res.redirect("/listing");
};

module.exports.delete = async (req, res, next) => {
  const { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Lisiting Deleted!");
  res.redirect("/listing");
};
