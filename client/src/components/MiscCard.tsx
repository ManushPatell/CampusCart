import { Link } from "react-router-dom";

type ListingType = "Wanting" | "Selling";

export interface MiscItem {
  id: string | number;
  title: string;
  description: string;
  price: number | string;
  listing_type: ListingType;
  image?: string | null;
}

interface MiscCardProps {
  misc: MiscItem;
}

const MiscCard: React.FC<MiscCardProps> = ({ misc }) => {
  const hasImage = Boolean(misc.image);

  return (
    <div className="mb-4 break-inside-avoid rounded-lg shadow bg-primary-bg">
      {hasImage ? (
        <img
          src={misc.image as string}
          alt={misc.title}
          className="w-full h-48 object-cover rounded-t-lg"
        />
      ) : (
        <div className="w-full h-48 rounded-t-lg bg-secondary-bg flex items-center justify-center text-secondary-fg">
          No image
        </div>
      )}

      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-xl font-semibold text-primary-fg">{misc.title}</h2>
          <span
            className={`px-2 py-1 text-xs rounded-md shrink-0 ${
              misc.listing_type === "Selling"
                ? "bg-green-200 text-green-900"
                : "bg-blue-200 text-blue-900"
            }`}
            title="Listing type"
          >
            {misc.listing_type}
          </span>
        </div>

        <p className="mt-1 text-secondary-fg">
          {typeof misc.price === "number" || misc.price === ""
            ? (misc.price !== "" ? `$${misc.price}` : "—")
            : misc.price}
        </p>

        <p className="mt-2 text-secondary-fg truncate" title={misc.description}>
          {misc.description}
        </p>

        <Link to={`/misc/${misc.id}`}>
          <button className="mt-4 bg-[#4A4032] text-white px-4 py-2 rounded-lg hover:bg-[#5C503E] transition-colors">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default MiscCard;
