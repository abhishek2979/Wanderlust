import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";
import ListingCard from "../components/ListingCard";

const Home = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      const { data } = await API.get("/listings");
      setListings(data);
    } catch (err) {
      setError("Failed to load listings. Is the server running?");
    } finally {
      setLoading(false);
    }
  };

  const filtered = listings.filter(
    (l) =>
      l.title.toLowerCase().includes(search.toLowerCase()) ||
      l.location.toLowerCase().includes(search.toLowerCase()) ||
      l.country.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* ── Hero Section ── */}
      <section style={{
        position: "relative",
        minHeight: "520px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background: "#0f0f1a",
      }}>
        {/* Background image with overlay */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.35)",
        }} />

        {/* Content */}
        <div style={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          padding: "48px 24px",
          maxWidth: "780px",
          width: "100%",
        }}>
          {/* Pill badge */}
          <span style={{
            display: "inline-block",
            background: "rgba(255,56,92,0.18)",
            color: "#ff385c",
            border: "1px solid rgba(255,56,92,0.4)",
            borderRadius: "30px",
            padding: "5px 18px",
            fontSize: "0.8rem",
            fontWeight: 600,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            marginBottom: "20px",
          }}>
            🌍 Explore the World
          </span>

          <h1 style={{
            fontSize: "clamp(2rem, 5vw, 3.4rem)",
            fontWeight: 800,
            color: "#ffffff",
            lineHeight: 1.15,
            marginBottom: "18px",
          }}>
            Find Your Perfect <br />
            <span style={{ color: "#ff385c" }}>Home Away</span> From Home
          </h1>

          <p style={{
            fontSize: "1.05rem",
            color: "rgba(255,255,255,0.72)",
            marginBottom: "36px",
            lineHeight: 1.7,
          }}>
            Discover handpicked stays across mountains, beaches, and heritage cities.
            <br />Book unique experiences with trusted local hosts.
          </p>

          {/* Search bar */}
          <div style={{
            display: "flex",
            alignItems: "center",
            background: "#fff",
            borderRadius: "50px",
            overflow: "hidden",
            maxWidth: "560px",
            margin: "0 auto",
            boxShadow: "0 8px 32px rgba(0,0,0,0.35)",
          }}>
            <span style={{ padding: "0 16px", color: "#aaa", fontSize: "1.1rem" }}>
              <i className="bi bi-search"></i>
            </span>
            <input
              type="text"
              placeholder="Search by city, country or title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                flex: 1,
                border: "none",
                outline: "none",
                fontSize: "0.95rem",
                padding: "14px 4px",
                color: "#222",
                background: "transparent",
              }}
            />
            <button style={{
              background: "#ff385c",
              color: "#fff",
              border: "none",
              padding: "12px 28px",
              margin: "5px",
              borderRadius: "40px",
              fontWeight: 600,
              fontSize: "0.9rem",
              cursor: "pointer",
            }}>
              Search
            </button>
          </div>


        </div>
      </section>


      {/* ── Listings Grid ── */}
      <div className="container mb-5 mt-4">
        <h5 style={{ fontWeight: 700, marginBottom: "20px", color: "#222" }}>
          {search ? `Results for "${search}"` : "All Listings"}
          {!loading && <span style={{ fontWeight: 400, color: "#888", fontSize: "0.9rem", marginLeft: "8px" }}>({filtered.length} places)</span>}
        </h5>

        {loading && (
          <div className="spinner-wrapper">
            <div className="spinner-border text-danger" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        {error && <div className="flash-error">{error}</div>}

        {!loading && filtered.length === 0 && (
          <div className="text-center mt-5">
            <h4>No listings found 😕</h4>
            <Link to="/listings/new" className="btn btn-wanderlust mt-3">
              Add the first one!
            </Link>
          </div>
        )}

        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          {filtered.map((listing) => (
            <div className="col" key={listing._id}>
              <ListingCard listing={listing} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
