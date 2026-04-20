const Booking = require('../models/booking') 

module.exports.myBooking = async(req, res, next)=>{
   const Allbooking = await Booking.find({user: req.user._id});
   res.json(Allbooking);
}