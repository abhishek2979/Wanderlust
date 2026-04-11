import { useNavigate } from "react-router-dom";

const ListingCard = ({ listing }) => {
  const navigate = useNavigate();

  return (
    <div
      className="listing-card"
      onClick={() => navigate(`/listings/${listing._id}`)}
    >
      <img
        src={listing.image?.url || "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800"}
        alt={listing.title}
        onError={(e) => {
          e.target.src = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800";
        }}
      />
      <div className="card-body">
        <h5 className="card-title">{listing.title}</h5>
        <p className="location">
          <i className="bi bi-geo-alt me-1"></i>
          {listing.location}, {listing.country}
        </p>
        <p className="price">
          <span className="fw-bold">₹{listing.price?.toLocaleString()}</span>
          <span className="text-muted fw-normal"> / night</span>
        </p>
        {listing.owner && (
          <small className="text-muted">
            <i className="bi bi-person me-1"></i>
            {listing.owner.username}
          </small>
        )}
      </div>
    </div>
  );
};

export default ListingCard;
