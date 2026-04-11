import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";

const NewListing = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    country: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!currentUser) {
    return (
      <div className="container mt-5 text-center">
        <div className="flash-error">Please <Link to="/login">log in</Link> to create a listing.</div>
      </div>
    );
  }

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Use FormData because we're sending a file
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("price", form.price);
      formData.append("location", form.location);
      formData.append("country", form.country);
      if (imageFile) formData.append("image", imageFile);

      const { data } = await API.post("/listings", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      navigate(`/listings/${data.listing._id}`);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create listing");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="form-card">
        <h2>🏠 Add a New Listing</h2>

        {error && <div className="flash-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Title *</label>
            <input
              type="text"
              name="title"
              className="form-control"
              placeholder="e.g. Cozy Mountain Cabin"
              value={form.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Description</label>
            <textarea
              name="description"
              className="form-control"
              rows="4"
              placeholder="Describe your place..."
              value={form.description}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="row mb-3">
            <div className="col">
              <label className="form-label fw-semibold">Location *</label>
              <input
                type="text"
                name="location"
                className="form-control"
                placeholder="City / Area"
                value={form.location}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col">
              <label className="form-label fw-semibold">Country *</label>
              <input
                type="text"
                name="country"
                className="form-control"
                placeholder="Country"
                value={form.country}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Price per night (₹) *</label>
            <input
              type="number"
              name="price"
              className="form-control"
              placeholder="e.g. 2500"
              value={form.price}
              onChange={handleChange}
              min="0"
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold">Upload Image</label>
            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={handleImageChange}
            />
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="mt-2 rounded"
                style={{ width: "100%", height: "180px", objectFit: "cover" }}
              />
            )}
          </div>

          <button
            type="submit"
            className="btn btn-wanderlust w-100"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2"></span>
                Creating...
              </>
            ) : (
              "Create Listing 🚀"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewListing;
