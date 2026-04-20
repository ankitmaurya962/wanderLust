module.exports = function calculatePrice(listing, checkIn, checkOut, guests) {

  const checkInDate = new Date(checkIn + "T00:00:00");
  const checkOutDate = new Date(checkOut + "T00:00:00");

  const msInDay = 1000 * 60 * 60 * 24;

  const nights = Math.ceil((checkOutDate - checkInDate) / msInDay);

  if (nights <= 0) {
    throw new Error("Invalid date range");
  }

  let totalPrice = nights * listing.price;

  const baseGuests = 2;
  const extraGuests = Math.max(0, guests - baseGuests);

  if (listing.extraGuestPrice) {
    totalPrice += nights * extraGuests * listing.extraGuestPrice;
  }

  return {
    totalPrice,
    nights,
    extraGuests
  };
};