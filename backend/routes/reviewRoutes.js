const express = require("express");
const router = express.Router({ mergeParams: true }); // mergeParams to access :id from parent route

const { protect } = require("../middleware/auth");
const { createReview, deleteReview } = require("../controllers/reviewController");

router.post("/", protect, createReview);
router.delete("/:reviewId", protect, deleteReview);

module.exports = router;
