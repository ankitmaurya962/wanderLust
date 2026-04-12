const Listing = require("../models/listing");
const getCoordinates = require("../utils/geocoding"); 

module.exports.index = async (req, res, next) => {
  const { category, place } = req.query;
  let filter = {};
  if (category) {
    filter.category = category;
  }
  if(place){
    filter.location = {$regex: place, $options: 'i'};
  }
  const AllList = await Listing.find(filter);
  res.json(AllList);
};

module.exports.newListing = async (req, res, next) => {
  try {
    const geometry = await getCoordinates(req.body.location);

    const list = new Listing({
      title: req.body.title,
      desc: req.body.desc,
      price: Number(req.body.price), 
      location: req.body.location,
      country: req.body.country,
      category: req.body.category, 
      geometry,
      image: {
        url: req.body.image,
        filename: "custom",
      },
    });

    if (req.user) {
      list.owner = req.user._id;
    }

    await list.save();

    res.status(201).json({
      success: true,
      message: "Listing created",
      data: list,
    });
  } catch (err) {
    next(err);
  }
};

module.exports.show = async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = await Listing.findById(id)
      .populate({ path: "reviews", populate: { path: "author" } })
      .populate("owner");

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Listing not found",
      });
    }

    res.json(data);
  } catch (err) {
    next(err);
  }
};

module.exports.edit = async (req, res, next) => {
  try {
    const { id } = req.params;

    const geometry = await getCoordinates(req.body.location);

    const updatedData = {
      title: req.body.title,
      desc: req.body.desc,
      price: Number(req.body.price),
      location: req.body.location,
      country: req.body.country,
      category: req.body.category,
      geometry,
      image: {
        url: req.body.image,
        filename: "custom",
      },
    };

    const list = await Listing.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!list) {
      return res.status(404).json({
        success: false,
        message: "Listing not found",
      });
    }

    res.json({
      success: true,
      message: "Listing updated",
      data: list,
    });
  } catch (err) {
    next(err);
  }
};

module.exports.delete = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deleted = await Listing.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Listing not found",
      });
    }

    res.json({
      success: true,
      message: "Listing deleted",
    });
  } catch (err) {
    next(err);
  }
};
