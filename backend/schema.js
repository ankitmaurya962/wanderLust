const Joi = require("joi");

module.exports.listingSchema = Joi.object({
  title: Joi.string().required(),
  desc: Joi.string().required(),
  location: Joi.string().required(),
  country: Joi.string().required(),
  price: Joi.number().min(0).required(),
  image: Joi.string().allow("", null),
  category: Joi.string()
    .valid(
      "trending",
      "rooms",
      "iconic",
      "mountains",
      "castles",
      "pools",
      "camping",
      "farms",
      "arctic",
      "boat",
      "spiritual",
      "forest",
      "desert",
    )
    .required(),
});

module.exports.reviewSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number().required().min(1).max(5),
    comments: Joi.string().required(),
  }).required(),
});

module.exports.bookingSchema = Joi.object({
  listing: Joi.string().length(24).hex().required(),

  checkIn: Joi.date().required(),

  checkOut: Joi.date()
    .greater(Joi.ref("checkIn"))
    .required()
    .messages({
      "date.greater": "Check-out must be after check-in",
    }),

  guests: Joi.number().min(1).default(1),

  totalPrice: Joi.number().min(0).optional(),

  orderId: Joi.string().allow("", null),
  paymentId: Joi.string().allow("", null),
  signature: Joi.string().allow("", null),

  paymentStatus: Joi.string()
    .valid("pending", "paid", "failed")
    .default("pending"),

  bookingStatus: Joi.string()
    .valid("confirmed", "cancelled")
    .default("confirmed"),
});
