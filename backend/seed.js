// ============================
// Seed script - run with: node seed.js
// This will add sample listings to the DB
// ============================

const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const Listing = require("./models/Listing");
const User = require("./models/User");

const MONGO_URL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/wanderlust";

const sampleListings = [
  {
    title: "Cozy Mountain Retreat",
    description: "A beautiful cabin in the mountains with stunning valley views. Perfect for a weekend escape!",
    image: { url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800" },
    price: 3500,
    location: "Manali",
    country: "India",
  },
  {
    title: "Beachfront Paradise",
    description: "Wake up to the sound of waves! This cozy villa is right on the beach.",
    image: { url: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800" },
    price: 5200,
    location: "Goa",
    country: "India",
  },
  {
    title: "Heritage Haveli",
    description: "Experience royal Rajasthani hospitality in this beautifully restored 200-year-old haveli.",
    image: { url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800" },
    price: 4800,
    location: "Jaipur",
    country: "India",
  },
  {
    title: "Backwater Houseboat",
    description: "Float through Kerala's iconic backwaters on a traditional kettuvallam houseboat.",
    image: { url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800" },
    price: 6000,
    location: "Alleppey",
    country: "India",
  },
  {
    title: "Treehouse Escape",
    description: "Live among the treetops in this magical treehouse surrounded by dense jungle.",
    image: { url: "https://images.unsplash.com/photo-1520984032042-162d526883e0?w=800" },
    price: 2800,
    location: "Wayanad",
    country: "India",
  },
  {
    title: "Valley View Cottage",
    description: "A charming stone cottage with a fireplace and panoramic Himalayan views.",
    image: { url: "https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=800" },
    price: 2200,
    location: "Mussoorie",
    country: "India",
  },
];

async function seed() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("✅ Connected to MongoDB");

    // Create a demo user for seeding
    let seedUser = await User.findOne({ username: "demo" });
    if (!seedUser) {
      seedUser = new User({ username: "demo", email: "demo@wanderlust.com", password: "demo123" });
      await seedUser.save();
      console.log("✅ Demo user created (username: demo, password: demo123)");
    }

    // Clear existing listings
    await Listing.deleteMany({});
    console.log("🗑️  Cleared old listings");

    // Add sample listings
    const listings = sampleListings.map((l) => ({ ...l, owner: seedUser._id }));
    await Listing.insertMany(listings);
    console.log(`✅ Added ${listings.length} sample listings`);

    console.log("\n🎉 Database seeded successfully!");
    console.log("   Login with: username=demo, password=demo123");
  } catch (err) {
    console.error("❌ Seeding failed:", err);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
}

seed();
