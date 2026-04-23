module.exports = function calculatePrice(listing, checkIn, checkOut, guests) {

  const checkInDate = new Date(checkIn + "T00:00:00");
  const checkOutDate = new Date(checkOut + "T00:00:00");

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  //Prevent past check-in
  if (checkInDate < today) {
    throw new Error("Check-in date cannot be in the past");
  }

  //Prevent invalid range
  if (checkOutDate <= checkInDate) {
    throw new Error("Check-out must be after check-in");
  }

  const msInDay = 1000 * 60 * 60 * 24;
  const nights = Math.ceil((checkOutDate - checkInDate) / msInDay);

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