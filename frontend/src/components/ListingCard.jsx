const ListingCard = ({ list, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer group"
    >
      {/* Image */}
      <div className="relative overflow-hidden rounded-xl border border-white/10">
        <img
          src={list.image?.url || "https://res.cloudinary.com/dldtcjzis/image/upload/v1776517498/defaultlisting_zpazmc.jpg"}
          alt={list.title}
          className="h-[250px] w-full object-cover transition duration-500 group-hover:scale-110"
        />

        {/* 🔥 Overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition duration-300"></div>
      </div>

      {/* Info */}
      <div className="mt-3 space-y-1">
        
        {/* Title */}
        <h2 className="font-semibold text-white text-base truncate group-hover:text-yellow-400 transition">
          {list.title}
        </h2>

        {/* Subtitle */}
        <p className="text-gray-400 text-sm">
          2 nights · Free cancellation
        </p>

        {/* Price */}
        <p className="text-white font-semibold">
          ₹{list.price}{" "}
          <span className="text-gray-400 font-normal text-sm">
            / night
          </span>
        </p>
      </div>
    </div>
  );
};

export default ListingCard;