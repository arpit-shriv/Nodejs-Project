const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listings.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({storage});

const listingsController = require("../controllers/listings.js");

router
  .route("/")
  .get(wrapAsync(listingsController.index))
  .post(
    isLoggedIn,
    upload.single('listing[image]'),
    validateListing,
    wrapAsync(listingsController.createListing)
  );

  //New route
router.get("/new", isLoggedIn, listingsController.renderNewForm);

router
  .route("/:id")
  .get(wrapAsync(listingsController.showListing))
  .put(
  isLoggedIn,
  isOwner,
  upload.single('listing[image]'),
  validateListing,
  wrapAsync(listingsController.updateListing))
  .delete(
  isLoggedIn,
  isOwner,
  wrapAsync(listingsController.destroyListing)
);

//Index route
// router.get("/", wrapAsync(listingsController.index));

//Show route
// router.get("/:id", wrapAsync(listingsController.showListing));

//Create route
// router.post(
//   "/", isLoggedIn, validateListing, wrapAsync(listingsController.createListing));

//Edit route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingsController.renderEditForm)
);

//Update route
// router.put(
//   "/:id",
//   isLoggedIn,
//   isOwner,
//   validateListing,
//   wrapAsync(listingsController.updateListing)
// );

//Delete route
// router.delete(
//   "/:id",
//   isLoggedIn,
//   isOwner,
//   wrapAsync(listingsController.destroyListing)
// );

module.exports = router;
