require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const CustomError = require("./utils/CustomError");
const session = require("express-session");
const MongoStore = require("connect-mongo").default;
const flash = require("connect-flash");
const passport = require("passport");
const localStrategy = require("passport-local");
const cors = require("cors");
const User = require("./models/user.js");
const wrapAsync = require("./utils/wrapAsync.js");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "public")));

// ✅ TRUST PROXY (IMPORTANT FOR RENDER)
app.set("trust proxy", 1);
const isProduction = process.env.NODE_ENV === "production";

// ✅ CORS CONFIG (VERY IMPORTANT)
app.use(
  cors({
    origin: ["http://localhost:5173", "https://wander-lust-lac.vercel.app"],
    credentials: true,
  }),
);

const dbURL = process.env.ATLASDB_URL;

// SESSION STORE
const store = MongoStore.create({
  mongoUrl: dbURL,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600,
});

store.on("error", () => {
  console.log("Error in Mongo Session");
});

// SESSION CONFIG
const sessionOption = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: true, // 🔥 true only in production
    sameSite: 'none', // 🔥 important
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  },
};

async function main() {
  await mongoose.connect(dbURL);
}
main()
  .then(() => console.log("connected DB"))
  .catch((err) => console.log(err));

// ROUTES
const listingRouter = require("./routes/listing.js");
const apiListingRouter = require("./routes/api/listing.js");
const reviewRouter = require("./routes/review.js");
const apiReviewRouter = require("./routes/api/review.js");
const userRouter = require("./routes/user.js");
const apiUserRouter = require("./routes/api/user.js");
const razorpayroute = require("./routes/api/razorpayroute.js");
const verifyroute = require("./routes/api/verifyroute.js");
const bookingRoute = require("./routes/api/bookingRoute.js");
const myBookingRoute = require("./routes/api/myBookingRoute.js");

// ✅ SESSION MUST COME AFTER CORS
app.use(session(sessionOption));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// FLASH MIDDLEWARE
app.use((req, res, next) => {
  res.locals.msg = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

// ROUTES
app.use("/listing", listingRouter);
app.use("/api/listings", apiListingRouter);
app.use("/listing/:id", reviewRouter);
app.use("/api/listings/:id", apiReviewRouter);
app.use("/", userRouter);
app.use("/api", apiUserRouter);
app.use("/api", razorpayroute);
app.use("/api", verifyroute);
app.use("/api", bookingRoute);
app.use("/api", myBookingRoute);

// HOME
app.get(
  "/",
  wrapAsync(async (req, res, next) => {
    res.render("listing/home");
  }),
);

// 404 HANDLER
app.use((req, res, next) => {
  next(new CustomError(404, "page not found"));
});

// ERROR HANDLER
app.use((err, req, res, next) => {
  let { status = 500, message = "something went wrong" } = err;

  if (req.originalUrl.startsWith("/api")) {
    return res.status(status).json({
      success: false,
      message,
    });
  }

  res.status(status).render("error", { message });
});

app.listen(8080, () => {
  console.log("listening on port 8080");
});
