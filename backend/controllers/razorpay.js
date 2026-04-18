const Razorpay = require("razorpay");

exports.createOrder = async (req, res) => {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZOR_KEY_ID,
      key_secret: process.env.RAZOR_KEY_SECRET,
    });
    
    const { amount } = req.body;

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    res.json(order);
  } catch (err) {
    res.status(500).json({
      error: "Failed to create order",
      details: err.message,
    });
  }
};
