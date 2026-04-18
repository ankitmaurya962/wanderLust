const crypto = require("crypto");

exports.verifyController = (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ error: "Invalid payment data" });
    }

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZOR_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      return res.json({ status: "success" });
    } else {
      return res.status(400).json({ status: "failed" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
};