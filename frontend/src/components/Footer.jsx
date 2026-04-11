import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ background: "#1a1a2e", color: "#ccc", paddingTop: "48px", marginTop: "60px" }}>
      <div className="container">
        <div className="row g-4 pb-4" style={{ borderBottom: "1px solid #2e2e4a" }}>

          {/* Brand Column */}
          <div className="col-md-5">
            <h5 style={{ color: "#fff", fontWeight: 700, fontSize: "1.4rem", marginBottom: "12px" }}>
              🌍 Wander<span style={{ color: "#ff385c" }}>lust</span>
            </h5>
            <p style={{ fontSize: "0.88rem", lineHeight: 1.8, color: "#aaa", maxWidth: "340px" }}>
              Discover handpicked stays across India and beyond.
              From mountain retreats to beachfront villas — your next
              adventure starts here.
            </p>
            {/* Social Icons */}
            <div className="d-flex gap-3 mt-3">
              {[
                { icon: "bi-github",    href: "https://github.com" },
                { icon: "bi-linkedin",  href: "https://linkedin.com" },
                { icon: "bi-twitter-x", href: "https://twitter.com" },
                { icon: "bi-instagram", href: "https://instagram.com" },
              ].map(({ icon, href }) => (
                <a
                  key={icon}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    width: "36px", height: "36px",
                    borderRadius: "50%",
                    border: "1px solid #2e2e4a",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#aaa", textDecoration: "none", fontSize: "15px",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = "#ff385c";
                    e.currentTarget.style.borderColor = "#ff385c";
                    e.currentTarget.style.color = "#fff";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.borderColor = "#2e2e4a";
                    e.currentTarget.style.color = "#aaa";
                  }}
                >
                  <i className={`bi ${icon}`}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Explore Column */}
          <div className="col-6 col-md-3">
            <h6 style={{ color: "#fff", fontWeight: 600, marginBottom: "14px", fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>
              Explore
            </h6>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {[
                { label: "All Listings",  to: "/" },
                { label: "Add Listing",   to: "/listings/new" },
                { label: "Sign Up",       to: "/signup" },
                { label: "Log In",        to: "/login" },
              ].map(({ label, to }) => (
                <li key={label} style={{ marginBottom: "10px" }}>
                  <Link
                    to={to}
                    style={{ color: "#aaa", textDecoration: "none", fontSize: "0.88rem", transition: "color 0.2s" }}
                    onMouseEnter={e => e.currentTarget.style.color = "#ff385c"}
                    onMouseLeave={e => e.currentTarget.style.color = "#aaa"}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Destinations Column */}
          <div className="col-6 col-md-4">
            <h6 style={{ color: "#fff", fontWeight: 600, marginBottom: "14px", fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>
              Popular Destinations
            </h6>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {[
                { name: "Manali",     icon: "🏔️" },
                { name: "Goa",        icon: "🏖️" },
                { name: "Jaipur",     icon: "🏰" },
                { name: "Alleppey",   icon: "🛶" },
                { name: "Wayanad",    icon: "🌿" },
                { name: "Mussoorie",  icon: "⛰️" },
              ].map(({ name, icon }) => (
                <li key={name} style={{ marginBottom: "9px" }}>
                  <span
                    style={{ color: "#aaa", fontSize: "0.88rem", cursor: "pointer", transition: "color 0.2s" }}
                    onMouseEnter={e => e.currentTarget.style.color = "#ff385c"}
                    onMouseLeave={e => e.currentTarget.style.color = "#aaa"}
                  >
                    {icon} {name}
                  </span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div
          className="d-flex flex-column flex-md-row justify-content-between align-items-center py-3 gap-2"
          style={{ fontSize: "0.8rem", color: "#555" }}
        >
          <p style={{ margin: 0 }}>
            © {currentYear} <span style={{ color: "#ff385c", fontWeight: 600 }}>Wanderlust</span>. All rights reserved.
          </p>
          <p style={{ margin: 0 }}>
            Made with <span style={{ color: "#ff385c" }}>♥</span> by <strong style={{ color: "#aaa" }}>Ahishek</strong> 
          </p>
          <div className="d-flex gap-3">
            {["Privacy Policy", "Terms of Use", "Contact"].map((item) => (
              <span
                key={item}
                style={{ cursor: "pointer", transition: "color 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.color = "#ff385c"}
                onMouseLeave={e => e.currentTarget.style.color = "#555"}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
