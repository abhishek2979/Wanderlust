import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Signup = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [form, setForm] = useState({ username: "", email: "", password: "", confirm: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Basic client-side validation
    if (form.password !== form.confirm) {
      return setError("Passwords do not match!");
    }
    if (form.password.length < 6) {
      return setError("Password must be at least 6 characters.");
    }

    setLoading(true);
    try {
      await register(form.username, form.email, form.password);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="form-card">
        <h2>🌍 Join Wanderlust</h2>
        <p className="text-muted mb-4">Create your account and start exploring.</p>

        {error && <div className="flash-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Username</label>
            <input
              type="text"
              name="username"
              className="form-control"
              placeholder="Choose a username"
              value={form.username}
              onChange={handleChange}
              required
              autoFocus
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="your@email.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Min. 6 characters"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold">Confirm Password</label>
            <input
              type="password"
              name="confirm"
              className="form-control"
              placeholder="Re-enter password"
              value={form.confirm}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-wanderlust w-100"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2"></span>
                Creating account...
              </>
            ) : (
              "Create Account 🚀"
            )}
          </button>
        </form>

        <p className="text-center mt-3 text-muted">
          Already have an account?{" "}
          <Link to="/login" className="text-decoration-none" style={{ color: "#ff385c" }}>
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
