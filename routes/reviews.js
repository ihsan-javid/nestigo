const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const Review = require("../model/review.js");
const Listing = require("../model/listing.js");
const {
  validateReviews,
  isLoggedIn,
  isReviewAuthor,
} = require("../middlewre.js");

const reviewController = require("../controlllers/reviews.js");

//Reviews
// post Route
router.post(
  "/",
  isLoggedIn,
  validateReviews,
  wrapAsync(reviewController.createReview)
);

// Delte Route
router.delete(
  "/:reviewId",
  isReviewAuthor,
  wrapAsync(reviewController.destoryReview)
);

module.exports = router;
