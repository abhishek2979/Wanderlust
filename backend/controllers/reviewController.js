const Review = require("../models/Review");
const Listing = require("../models/Listing");

// POST /api/listings/:id/reviews - add review
const createReview = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).json({ message: "Listing not found" });

    const review = new Review({
      comment: req.body.comment,
      rating: req.body.rating,
      author: req.user._id,
    });

    await review.save();
    listing.reviews.push(review._id);
    await listing.save();

    await review.populate("author", "username");
    res.status(201).json({ message: "Review added!", review });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE /api/listings/:id/reviews/:reviewId - delete review
const deleteReview = async (req, res) => {
  try {
    const { id, reviewId } = req.params;

    // Remove review reference from listing
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);

    res.json({ message: "Review deleted!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createReview, deleteReview };
