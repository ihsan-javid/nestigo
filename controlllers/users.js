const User = require("../model/user");
module.exports.rederSignupForm = (req, res) => {
  res.render("users/signup.ejs");
};

module.exports.signup = async (req, res, next) => {
  let { username, email, password } = req.body;
  let newUser = new User({ username, email });
  let registeredUser = await User.register(newUser, password);
  req.login(registeredUser, (err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "Wellcome to Wanderlust!");
    res.redirect("/listings");
  });
};

module.exports.rederLoginForm = (req, res) => {
  res.render("users/login.ejs");
};

module.exports.login = async (req, res) => {
  req.flash("success", "Wellcome back to Wanderlust!");
  let redirectUrl = res.locals.redirectUrl || "/listings";
  res.redirect(redirectUrl);
};

module.exports.logout = (req, res, next) => {
  req.logOut((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "You have been logged out!");
    res.redirect("/listings");
  });
};
