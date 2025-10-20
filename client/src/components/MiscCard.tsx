import React from "react";
import { Link } from "react-router-dom";

type ListingType = "Wanting" | "Selling";

export interface MiscItem {
  id: string | number;
  title: string;
  description: string;
  price: number | string;
  listing_type: ListingType;
  image?: string[];
}

interface MiscCardProps {
  misc: MiscItem;
  /**
   * When true, the parent is wrapping this card in a <Link>.
   * We still show a “View Details” element for visual consistency,
   * but render it as a non-interactive <span> to avoid nested links.
   */
  hideViewDetails?: boolean;
}

const MiscCard: React.FC<MiscCardProps> = ({
  misc,
  hideViewDetails = false,
}) => {
  const hasImage = Array.isArray(misc.image) && misc.image.length > 0;
  const photo = hasImage ? misc.image![0] : "/placeholder-house.jpg";

  const formattedPrice =
    typeof misc.price === "number"
      ? `$${misc.price}`
      : misc.price === ""
        ? "—"
        : misc.price;

  return (
    <article
      className="mb-4 break-inside-avoid rounded-lg shadow bg-primary-bg hover:shadow-lg transition"
      aria-label={misc.title}
    >
      {hasImage ? (
        <img
          src={photo}
          alt={misc.title}
          className="w-full h-48 object-cover rounded-t-lg"
          loading="lazy"
        />
      ) : (
        <div className="w-full h-48 rounded-t-lg bg-secondary-bg flex items-center justify-center text-secondary-fg">
          No image
        </div>
      )}

      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-xl font-semibold text-primary-fg line-clamp-1">
            {misc.title}
          </h2>
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

        <p className="mt-1 text-secondary-fg">{formattedPrice}</p>

        <p className="mt-2 text-secondary-fg truncate" title={misc.description}>
          {misc.description}
        </p>

        {/* View Details control:
            - When wrapped (hideViewDetails=true): visual-only <span>.
            - When not wrapped: real Link + button. */}
        {hideViewDetails ? (
          <span
            aria-hidden="true"
            className="mt-4 inline-block bg-[#4A4032] text-white px-4 py-2 rounded-lg"
          >
            View Details
          </span>
        ) : (
          <Link to={`/misc/${misc.id}`}>
            <button
              className="mt-4 bg-[#4A4032] text-white px-4 py-2 rounded-lg hover:bg-[#5C503E] transition-colors"
              aria-label={`View details for ${misc.title}`}
            >
              View Details
            </button>
          </Link>
        )}
      </div>
    </article>
  );
};

export default MiscCard;
