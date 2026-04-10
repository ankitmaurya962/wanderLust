document.addEventListener("DOMContentLoaded", function () {

  // safety check
  if (typeof listing === "undefined") {
    console.error("Listing data not found");
    return;
  }

  const map = L.map('map').setView([listing.lat, listing.lng], 13);

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  L.marker([listing.lat, listing.lng])
    .addTo(map)
    .bindPopup(`<b>${listing.title}</b>`)
    .openPopup();
});