const Booking = require('../models/booking') 

module.exports.myBooking = async(req, res, next)=>{
   const Allbooking = await Booking.find({user: req.user._id}).populate('listing');
   res.json(Allbooking);
}