// Simple star rating display component
const StarRating = ({ rating }) => {
  return (
    <span className="star-rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <i
          key={star}
          className={star <= rating ? "bi bi-star-fill" : "bi bi-star"}
        ></i>
      ))}
    </span>
  );
};

export default StarRating;
