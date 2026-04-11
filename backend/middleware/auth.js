const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware to protect routes
const protect = async (req, res, next) => {
  let token;

  // Check if token is in Authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, please login first" });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "mysupersecretjwtkey123");
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token is invalid or expired" });
  }
};

// Check if current user is owner of listing
const isOwner = (Model) => async (req, res, next) => {
  const { id } = req.params;
  const doc = await Model.findById(id);
  if (!doc) return res.status(404).json({ message: "Not found" });

  if (!doc.owner.equals(req.user._id)) {
    return res.status(403).json({ message: "You don't have permission to do this" });
  }
  next();
};

module.exports = { protect, isOwner };
