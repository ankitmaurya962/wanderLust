const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const CustomError = require("./utils/CustomError");
const wrapAsync = require("./utils/wrapAsync");
const session = require("express-session");
const flash = require("connect-flash");

const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "public")));
const sessionOption = {
  secret: "AnkitSecretKey",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

const listing = require("./routes/listing.js");
const review = require("./routes/review.js");

main()
  .then(() => console.log("connected DB"))
  .catch((err) => console.log(err));


app.use(session(sessionOption));
app.use(flash());

//middleware for flash
app.use((req, res, next)=>{
  res.locals.msg = req.flash("success");
  res.locals.error = req.flash("error");
  next();
})
app.use("/listing", listing);
app.use("/listing/:id", review);

//home
app.get(
  "/",
  wrapAsync(async (req, res, next) => {
    res.send("home route");
  }),
);

//if page is not found (if no route is found)
app.use((req, res, next) => {
  next(new CustomError(404, "page not found"));
});

app.use((err, req, res, next) => {
  let { status = 500, message = "something went wrong" } = err;
  res.status(status).render("error", { message });
});

app.listen(8080, () => {
  console.log("listening on port 8080");
});
