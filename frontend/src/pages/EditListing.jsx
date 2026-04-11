import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";

const EditListing = () => {
  const { id } = useParams();
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
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchListing();
  }, [id]);

  const fetchListing = async () => {
    try {
      const { data } = await API.get(`/listings/${id}`);

      // Check if current user is owner
      if (!currentUser || data.owner._id !== currentUser._id) {
        setError("You are not authorized to edit this listing.");
        setLoading(false);
        return;
      }

      setForm({
        title: data.title,
        description: data.description || "",
        price: data.price,
        location: data.location,
        country: data.country,
      });
      setPreview(data.image?.url || "");
    } catch (err) {
      setError("Listing not found!");
    } finally {
      setLoading(false);
    }
  };

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
    setSaving(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("price", form.price);
      formData.append("location", form.location);
      formData.append("country", form.country);
      if (imageFile) formData.append("image", imageFile);

      await API.put(`/listings/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      navigate(`/listings/${id}`);
    } catch (err) {
      setError(err.response?.data?.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="spinner-wrapper">
        <div className="spinner-border text-danger"></div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="form-card">
        <h2>✏️ Edit Listing</h2>

        {error && <div className="flash-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Title *</label>
            <input
              type="text"
              name="title"
              className="form-control"
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
              value={form.price}
              onChange={handleChange}
              min="0"
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold">Update Image (optional)</label>
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

          <div className="d-flex gap-3">
            <button
              type="submit"
              className="btn btn-wanderlust flex-grow-1"
              disabled={saving}
            >
              {saving ? "Saving..." : "Save Changes ✅"}
            </button>
            <Link to={`/listings/${id}`} className="btn btn-outline-secondary flex-grow-1">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditListing;
