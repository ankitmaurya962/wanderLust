const axios = require("axios");

async function getCoordinates(location) {
  const apiKey = process.env.GEOAPIFY_KEY;

  const url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(location)}&apiKey=${apiKey}`;

  const response = await axios.get(url);

  if (!response.data.features.length) {
    throw new Error("Location not found");
  }

  const coords = response.data.features[0].geometry.coordinates;

  return {
    type: "Point",
    coordinates: [coords[0], coords[1]] // [lng, lat]
  };
}

module.exports = getCoordinates;