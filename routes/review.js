const express = require("express");
const router = express.Router({mergeParams : true});
const wrapAsync = require("../utils/wrapAsync.js");
const Review = require("../models/reviews.js");
const Listing = require("../models/listings.js");
const {validateReview, isLoggedIn, isReviewAuthor} = require("../middleware.js");

const reviewsController = require("../controllers/reviews.js");

//Reviews > Post route
router.post("/", isLoggedIn ,validateReview, wrapAsync(reviewsController.createReview));

//Reviews > Delete route
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(reviewsController.destroyReview));

module.exports = router;