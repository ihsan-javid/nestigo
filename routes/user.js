const express = require("express");
const router = express.Router();
const User = require("../model/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middlewre.js");

const userController = require("../controlllers/users.js");

router
  .route("/signup")
  .get(userController.rederSignupForm)
  .post(wrapAsync(userController.signup));

router
  .route("/login")
  .get(userController.rederLoginForm)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    wrapAsync(userController.login)
  );

router.get("/logout", userController.logout);

module.exports = router;
