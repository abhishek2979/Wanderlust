const Listing = require("../models/Listing");
const getAllListings = async (req, res) => {
  try {
    const allListings = await Listing.find({}).populate("owner", "username");
    res.json(allListings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/listings/:id - get single listing
const getListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id)
      .populate({ path: "reviews", populate: { path: "author", select: "username" } })
      .populate("owner", "username");

    if (!listing) {
      return res.status(404).json({ message: "Listing not found!" });
    }
    res.json(listing);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/listings - create new listing
const createListing = async (req, res) => {
  try {
    const { title, description, price, location, country } = req.body;

    const newListing = new Listing({
      title,
      description,
      price,
      location,
      country,
      owner: req.user._id,
    });

    // If image uploaded via Cloudinary
    if (req.file) {
      newListing.image = {
        url: req.file.path,
        filename: req.file.filename,
      };
    }

    const saved = await newListing.save();
    res.status(201).json({ message: "Listing created!", listing: saved });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT /api/listings/:id - update listing
const updateListing = async (req, res) => {
  try {
    const { title, description, price, location, country } = req.body;

    const listing = await Listing.findByIdAndUpdate(
      req.params.id,
      { title, description, price, location, country },
      { new: true, runValidators: true }
    );

    if (!listing) {
      return res.status(404).json({ message: "Listing not found!" });
    }

    // Update image if new one uploaded
    if (req.file) {
      listing.image = { url: req.file.path, filename: req.file.filename };
      await listing.save();
    }

    res.json({ message: "Listing updated!", listing });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE /api/listings/:id - delete listing
const deleteListing = async (req, res) => {
  try {
    const listing = await Listing.findByIdAndDelete(req.params.id);
    if (!listing) {
      return res.status(404).json({ message: "Listing not found!" });
    }
    res.json({ message: "Listing deleted successfully!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAllListings, getListing, createListing, updateListing, deleteListing };
