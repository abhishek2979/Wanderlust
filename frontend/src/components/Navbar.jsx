import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Close sidebar on route change
  useEffect(() => {
    setSidebarOpen(false);
  }, [location]);

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [sidebarOpen]);

  const handleLogout = () => {
    logout();
    setSidebarOpen(false);
    navigate("/");
  };

  const initials = currentUser
    ? currentUser.username.slice(0, 2).toUpperCase()
    : "";

  return (
    <>
      {/* ── Navbar ── */}
      <nav className="wanderlust-navbar">
        <div className="container d-flex justify-content-between align-items-center">

          {/* Brand */}
          <Link to="/" className="navbar-brand-text">
            🌍 Wander<span>lust</span>
          </Link>

          {/* Desktop links */}
          <div className="d-none d-md-flex align-items-center gap-3">
            <Link to="/" className="text-decoration-none text-dark">Explore</Link>
            {currentUser ? (
              <>
                <Link to="/listings/new" className="text-decoration-none text-dark">
                  <i className="bi bi-plus-circle me-1"></i> Add Listing
                </Link>
                <span className="text-muted">|</span>
                <span className="text-dark fw-semibold">
                  <i className="bi bi-person-circle me-1"></i>
                  {currentUser.username}
                </span>
                <button className="btn btn-sm btn-outline-danger" onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/signup" className="text-decoration-none text-dark">Sign Up</Link>
                <Link to="/login" className="btn-wanderlust btn btn-sm">Log In</Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="d-md-none"
            onClick={() => setSidebarOpen(true)}
            style={{
              background: "none", border: "1px solid #eee",
              borderRadius: "8px", padding: "6px 10px",
              fontSize: "1.1rem", cursor: "pointer", color: "#333",
            }}
            aria-label="Open menu"
          >
            <i className="bi bi-list"></i>
          </button>
        </div>
      </nav>

      {/* ── Backdrop ── */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: "fixed", inset: 0,
            background: "rgba(0,0,0,0.45)",
            zIndex: 1040,
            backdropFilter: "blur(2px)",
          }}
        />
      )}

      {/* ── Sidebar Drawer ── */}
      <div style={{
        position: "fixed",
        top: 0, right: 0,
        height: "100dvh",
        width: "280px",
        background: "#fff",
        zIndex: 1050,
        boxShadow: "-4px 0 24px rgba(0,0,0,0.15)",
        transform: sidebarOpen ? "translateX(0)" : "translateX(100%)",
        transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)",
        display: "flex",
        flexDirection: "column",
      }}>

        {/* Sidebar Header */}
        <div style={{
          display: "flex", alignItems: "center",
          justifyContent: "space-between",
          padding: "18px 20px",
          borderBottom: "1px solid #f0f0f0",
        }}>
          <span style={{ fontWeight: 700, fontSize: "1.1rem", color: "#ff385c" }}>
            🌍 Wanderlust
          </span>
          <button
            onClick={() => setSidebarOpen(false)}
            style={{
              background: "none", border: "none",
              fontSize: "1.3rem", cursor: "pointer", color: "#666",
            }}
            aria-label="Close menu"
          >
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        {/* User Profile Card (if logged in) */}
        {currentUser ? (
          <div style={{
            margin: "16px", padding: "16px",
            background: "linear-gradient(135deg, #fff5f7, #fff)",
            border: "1px solid #ffe0e6",
            borderRadius: "12px",
          }}>
            {/* Avatar + name */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
              <div style={{
                width: "46px", height: "46px", borderRadius: "50%",
                background: "#ff385c", color: "#fff",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontWeight: 700, fontSize: "1rem", flexShrink: 0,
              }}>
                {initials}
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: "0.95rem", color: "#222" }}>
                  {currentUser.username}
                </div>
                <div style={{ fontSize: "0.78rem", color: "#888" }}>
                  {currentUser.email}
                </div>
              </div>
            </div>
            {/* Logout button */}
            <button
              onClick={handleLogout}
              style={{
                width: "100%", padding: "8px",
                background: "none", border: "1px solid #ffcdd2",
                borderRadius: "8px", color: "#e03050",
                fontSize: "0.85rem", fontWeight: 500, cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
              }}
            >
              <i className="bi bi-box-arrow-right"></i> Logout
            </button>
          </div>
        ) : (
          /* Guest — Auth buttons */
          <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "10px" }}>
            <Link
              to="/login"
              style={{
                display: "block", textAlign: "center",
                padding: "11px", borderRadius: "10px",
                background: "#ff385c", color: "#fff",
                textDecoration: "none", fontWeight: 600, fontSize: "0.95rem",
              }}
            >
              <i className="bi bi-box-arrow-in-right me-2"></i>Log In
            </Link>
            <Link
              to="/signup"
              style={{
                display: "block", textAlign: "center",
                padding: "11px", borderRadius: "10px",
                border: "1px solid #e0e0e0", color: "#333",
                textDecoration: "none", fontWeight: 500, fontSize: "0.95rem",
              }}
            >
              <i className="bi bi-person-plus me-2"></i>Create Account
            </Link>
          </div>
        )}

        {/* Divider */}
        <div style={{ height: "1px", background: "#f0f0f0", margin: "0 16px" }} />

        {/* Nav Links */}
        <nav style={{ flex: 1, overflowY: "auto", padding: "12px 8px" }}>
          {[
            { to: "/",             icon: "bi-compass",      label: "Explore Listings" },
            { to: "/listings/new", icon: "bi-plus-circle",  label: "Add a Listing",   auth: true },
          ].map(({ to, icon, label, auth }) => {
            if (auth && !currentUser) return null;
            return (
              <Link
                key={to}
                to={to}
                style={{
                  display: "flex", alignItems: "center", gap: "12px",
                  padding: "13px 14px", borderRadius: "10px",
                  textDecoration: "none", color: "#333",
                  fontSize: "0.92rem", fontWeight: 500,
                  transition: "background 0.15s",
                }}
                onMouseEnter={e => e.currentTarget.style.background = "#fff5f7"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
              >
                <i className={`bi ${icon}`} style={{ color: "#ff385c", fontSize: "1rem", width: "20px" }}></i>
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Footer strip */}
        <div style={{
          padding: "14px 20px",
          borderTop: "1px solid #f0f0f0",
          fontSize: "0.75rem", color: "#bbb", textAlign: "center",
        }}>
          © {new Date().getFullYear()} Wanderlust · B.Tech CSE Project
        </div>
      </div>
    </>
  );
};

export default Navbar;
