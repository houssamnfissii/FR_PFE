
const calculateAvgRating = (reviews) => {
  const totalRating = reviews.reduce((total, review) => total + review.rating, 0);
  const avgRating = reviews.length > 0 ? (totalRating / reviews.length).toFixed(1) : '';

  return {
    totalRating,
    avgRating
  };
};

export default calculateAvgRating;
