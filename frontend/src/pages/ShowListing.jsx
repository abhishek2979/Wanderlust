import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";
import StarRating from "../components/StarRating";

const ShowListing = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [flash, setFlash] = useState({ type: "", msg: "" });

  // Review form state
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: "" });
  const [reviewLoading, setReviewLoading] = useState(false);

  useEffect(() => {
    fetchListing();
  }, [id]);

  const fetchListing = async () => {
    try {
      const { data } = await API.get(`/listings/${id}`);
      setListing(data);
    } catch (err) {
      setError("Listing not found!");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this listing?")) return;
    try {
      await API.delete(`/listings/${id}`);
      navigate("/");
    } catch (err) {
      setFlash({ type: "error", msg: err.response?.data?.message || "Delete failed" });
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) return navigate("/login");

    setReviewLoading(true);
    try {
      const { data } = await API.post(`/listings/${id}/reviews`, reviewForm);
      // Add new review to state without re-fetching
      setListing((prev) => ({
        ...prev,
        reviews: [...prev.reviews, data.review],
      }));
      setReviewForm({ rating: 5, comment: "" });
      setFlash({ type: "success", msg: "Review added! 🎉" });
    } catch (err) {
      setFlash({ type: "error", msg: err.response?.data?.message || "Failed to add review" });
    } finally {
      setReviewLoading(false);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await API.delete(`/listings/${id}/reviews/${reviewId}`);
      setListing((prev) => ({
        ...prev,
        reviews: prev.reviews.filter((r) => r._id !== reviewId),
      }));
      setFlash({ type: "success", msg: "Review deleted." });
    } catch (err) {
      setFlash({ type: "error", msg: "Could not delete review." });
    }
  };

  if (loading) {
    return (
      <div className="spinner-wrapper">
        <div className="spinner-border text-danger"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="flash-error">{error}</div>
        <Link to="/" className="btn btn-wanderlust">← Back to Listings</Link>
      </div>
    );
  }

  const isOwner = currentUser && listing.owner?._id === currentUser._id;

  return (
    <div className="container py-4">
      {/* Flash Message */}
      {flash.msg && (
        <div className={flash.type === "success" ? "flash-success" : "flash-error"}>
          {flash.msg}
        </div>
      )}

      <Link to="/" className="text-muted text-decoration-none mb-3 d-inline-block">
        ← Back to listings
      </Link>

      {/* Listing Image */}
      <img
        src={listing.image?.url || "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800"}
        alt={listing.title}
        className="show-image"
        onError={(e) => {
          e.target.src = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800";
        }}
      />

      <div className="row">
        {/* Left: Listing Details */}
        <div className="col-md-7">
          <div className="d-flex justify-content-between align-items-start mb-2">
            <h2 className="fw-bold">{listing.title}</h2>
            {isOwner && <span className="owner-badge">Your Listing</span>}
          </div>

          <p className="text-muted mb-1">
            <i className="bi bi-geo-alt me-1"></i>
            {listing.location}, {listing.country}
          </p>

          <p className="fw-bold fs-5 my-2">
            ₹{listing.price?.toLocaleString()}
            <span className="text-muted fw-normal fs-6"> / night</span>
          </p>

          <p className="text-muted mb-1">
            <i className="bi bi-person-circle me-1"></i>
            Hosted by <strong>{listing.owner?.username || "Unknown"}</strong>
          </p>

          <hr />
          <p className="mt-3" style={{ lineHeight: 1.8 }}>
            {listing.description || "No description provided."}
          </p>

          {/* Owner Actions */}
          {isOwner && (
            <div className="d-flex gap-2 mt-4">
              <Link
                to={`/listings/${id}/edit`}
                className="btn btn-outline-secondary"
              >
                <i className="bi bi-pencil me-1"></i> Edit
              </Link>
              <button className="btn btn-outline-danger" onClick={handleDelete}>
                <i className="bi bi-trash me-1"></i> Delete
              </button>
            </div>
          )}
        </div>

        {/* Right: Reviews */}
        <div className="col-md-5">
          <h4 className="fw-bold mb-3">
            <i className="bi bi-chat-square-text me-2"></i>
            Reviews ({listing.reviews?.length || 0})
          </h4>

          {/* Add Review Form */}
          {currentUser ? (
            <div className="review-card mb-4">
              <h6 className="fw-semibold mb-3">Write a review</h6>
              <form onSubmit={handleReviewSubmit}>
                {/* Star Rating Selector */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">Rating</label>
                  <div className="d-flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        style={{ cursor: "pointer", fontSize: "1.4rem" }}
                        onClick={() => setReviewForm((prev) => ({ ...prev, rating: star }))}
                      >
                        <i
                          className={
                            star <= reviewForm.rating ? "bi bi-star-fill" : "bi bi-star"
                          }
                          style={{ color: star <= reviewForm.rating ? "#ff385c" : "#ccc" }}
                        ></i>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-3">
                  <textarea
                    className="form-control"
                    rows="3"
                    placeholder="Share your experience..."
                    value={reviewForm.comment}
                    onChange={(e) =>
                      setReviewForm((prev) => ({ ...prev, comment: e.target.value }))
                    }
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="btn btn-wanderlust w-100"
                  disabled={reviewLoading}
                >
                  {reviewLoading ? "Submitting..." : "Submit Review"}
                </button>
              </form>
            </div>
          ) : (
            <div className="flash-error mb-3">
              Please <Link to="/login">log in</Link> to leave a review.
            </div>
          )}

          {/* Reviews List */}
          {listing.reviews?.length === 0 && (
            <p className="text-muted">No reviews yet. Be the first! 🌟</p>
          )}

          {listing.reviews?.map((review) => (
            <div className="review-card" key={review._id}>
              <div className="d-flex justify-content-between align-items-center mb-1">
                <span className="fw-semibold">
                  <i className="bi bi-person-circle me-1"></i>
                  {review.author?.username || "User"}
                </span>
                <StarRating rating={review.rating} />
              </div>
              <p className="mb-1" style={{ fontSize: "0.95rem" }}>
                {review.comment}
              </p>
              <small className="text-muted">
                {new Date(review.createdAt).toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </small>

              {/* Delete review if it's yours */}
              {currentUser && review.author?._id === currentUser._id && (
                <div className="mt-2">
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDeleteReview(review._id)}
                  >
                    <i className="bi bi-trash"></i> Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShowListing;
