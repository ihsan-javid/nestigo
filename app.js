if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const port = process.env.PORT || 3000;

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./model/user.js");
const ExpressError = require("./utils/ExpressError.js");

const reviewRoute = require("./routes/reviews.js");
const listingRoute = require("./routes/listings.js");
const userRoute = require("./routes/user.js");
// const privacy = require("./routes/privacy.js");

app.set("veiws engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

const dbUrl = process.env.ATLASDB_URL;

async function main() {
  try {
    await mongoose.connect(dbUrl, {
      tls: true,
      tlsAllowInvalidCertificates: true,
      serverApi: {
        version: "1",
        strict: true,
        deprecationErrors: true,
      },
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
}

main()
  .then(() => {
    console.log("connected to  DB");
  })
  .catch((err) => {
    console.log(err);
  });

const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600,
});

store.on("error", () => {
  console.log("Error in MONGO SESSION STROE", err);
});
const sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() * 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  },
};

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currentUser = req.user;
  next();
});

app.get("/privacy", (req, res) => {
  res.render("listings/privacy.ejs");
});
// Add this route with your other routes
app.get("/terms", (req, res) => {
    res.render("listings/terms.ejs");
});
app.get("/", (req, res) => {
  res.redirect("/listings");
});

// app.use("/privacy", privacy);
app.use("/listings", listingRoute);
app.use("/listings/:id/reviews", reviewRoute);
app.use("/", userRoute);


app.all("*", (req, res, next) => {
  next(new ExpressError(404, "page not found!"));
});
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Some things Want Wrong" } = err;
  res.status(statusCode).render("listings/error.ejs", { message });
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
