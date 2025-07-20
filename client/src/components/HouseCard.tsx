// src/components/HouseCard.jsx
import { Link } from "react-router-dom";

const HouseCard = ({ house }) => {
  return (
    <div className="mb-4 break-inside-avoid rounded-lg shadow bg-primary-bg">
      <img
        src={house.image}
        alt={house.title}
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold text-primary-fg">{house.title}</h2>
        <p className="text-secondary-fg">Location: {house.location}</p>
        <p className="text-secondary-fg">Price: {house.price}</p>

        {/*Create link to further house details */}
        <Link to={`/rentals/${house.id}`}>
          <button className="mt-4 bg-[#4A4032] text-white px-4 py-2 rounded-lg hover:bg-[#5C503E] transition-colors">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HouseCard;
