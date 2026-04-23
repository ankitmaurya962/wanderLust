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
    const geometry = await getCoordinates(req.body.location);

    const list = new Listing({
      title: req.body.title,
      desc: req.body.desc,
      price: Number(req.body.price),
      location: req.body.location,
      country: req.body.country,
      category: req.body.category,
      geometry,
    });

    if (req.file) {
      list.image = {
        url: req.file.path,        // Cloudinary URL
        filename: req.file.filename, //Cloudinary filename
      };
    }

    if (req.user) {
      list.owner = req.user._id;
    }

    await list.save();

    res.status(201).json({
      success: true,
      message: "Listing created",
      data: list,
    });
};

module.exports.show = async (req, res, next) => {
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
};

module.exports.edit = async (req, res, next) => {
    const { id } = req.params;

    //Only geocode if location is provided & not empty
    let geometry;
    if (req.body.location && req.body.location.trim() !== "") {
      geometry = await getCoordinates(req.body.location);
    }

    //Prepare update object (clean + flexible)
    const updatedData = {
      title: req.body.title,
      desc: req.body.desc,
      price: Number(req.body.price),
      location: req.body.location,
      country: req.body.country,
      category: req.body.category,
    };

    //Add geometry only if it exists
    if (geometry) {
      updatedData.geometry = geometry;
    }

    //Update listing
    const list = await Listing.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    //If not found
    if (!list) {
      return res.status(404).json({
        success: false,
        message: "Listing not found",
      });
    }

    //Handle image update properly
    if (req.file) {
      list.image = {
        url: req.file.path,
        filename: req.file.filename,
      };
      await list.save(); 
    }

    res.json({
      success: true,
      message: "Listing updated",
      data: list,
    });
};

module.exports.delete = async (req, res, next) => {
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
};
