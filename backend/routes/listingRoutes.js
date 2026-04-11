const express = require("express");
const router = express.Router();
const multer = require("multer");
const { storage } = require("../utils/cloudinary");
const upload = multer({ storage });

const { protect, isOwner } = require("../middleware/auth");
const Listing = require("../models/Listing");
const {
  getAllListings,
  getListing,
  createListing,
  updateListing,
  deleteListing,
} = require("../controllers/listingController");

// Public routes
router.get("/", getAllListings);
router.get("/:id", getListing);

// Protected routes (login required)
router.post("/", protect, upload.single("image"), createListing);
router.put("/:id", protect, isOwner(Listing), upload.single("image"), updateListing);
router.delete("/:id", protect, isOwner(Listing), deleteListing);

module.exports = router;
