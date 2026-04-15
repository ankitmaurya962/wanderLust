import Rating from "@mui/material/Rating";

const StarRating = ({ value = 0, size = "medium" }) => {
  return (
    <Rating
      value={value}
      readOnly
      size={size}
      sx={{
        color: "#facc15", // Tailwind yellow-400
      }}
    />
  );
};

export default StarRating;