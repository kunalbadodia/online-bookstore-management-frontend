const StarRating = ({ rating, size = "small" }) => {
  // Convert rating to nearest half star
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 >= 0.5

  const starClass = size === "large" ? "fs-5" : "fs-6"

  return (
    <span className="rating d-inline-flex">
      {[...Array(5)].map((_, i) => {
        if (i < fullStars) {
          return <i key={i} className={`bi bi-star-fill ${starClass}`}></i>
        } else if (i === fullStars && hasHalfStar) {
          return <i key={i} className={`bi bi-star-half ${starClass}`}></i>
        } else {
          return <i key={i} className={`bi bi-star ${starClass}`}></i>
        }
      })}
    </span>
  )
}

export default StarRating

