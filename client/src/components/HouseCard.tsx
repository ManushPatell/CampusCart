// client/src/components/HouseCard.tsx
import React from "react";
import { Link } from "react-router-dom";

type Props = { house: any };

function formatCurrency(v: unknown) {
  const n =
    typeof v === "number"
      ? v
      : parseFloat(String(v ?? "").replace(/[^0-9.]/g, "")) || 0;
  return n ? `$${Math.round(n).toLocaleString()}` : "—";
}

function formatDate(d: unknown) {
  const dt = new Date(String(d));
  return isNaN(dt.getTime())
    ? null
    : dt.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

const HouseCard: React.FC<Props> = ({ house }) => {
  // ----- Route (detail link) -----
  const id = house.id ?? house._id ?? house.rental_id;
  const href = id ? `/rentals/${encodeURIComponent(String(id))}` : "#";

  // ----- Title / Description / Photo -----
  const title = house.title || "Untitled listing";
  const description = house.description || "No description provided.";
  const photo =
    house.photo ??
    (Array.isArray(house.photos) && house.photos[0]) ??
    "/placeholder-house.jpg";

  // ----- Price -----
  const basePrice = formatCurrency(house.cost);
  const perUnit = house.is_cost_per_room ? "/room" : "/place";
  const priceLabel = basePrice === "—" ? "—" : `${basePrice}${perUnit}`;

  // ----- Location -----
  const locationLabel =
    house.address ||
    [house.city, house.state].filter(Boolean).join(", ") ||
    "—";

  // ----- Bedrooms -----
  const bedroomsNum =
    typeof house.num_beds === "number"
      ? house.num_beds
      : house.num_beds != null
      ? parseInt(String(house.num_beds), 10)
      : undefined;
  const bedroomsLabel = Number.isFinite(bedroomsNum) ? bedroomsNum : "—";

  // ----- Availability -----
  const availableLabel = formatDate(house.date_available);

  // ----- Flags / Amenities -----
  const utilIncluded = !!house.is_utilities_included;
  const isSublet = !!house.is_sublet;
  const isShared = !!house.is_shared;
  const hasLaundry = !!house.has_laundry;
  const hasCooking = !!house.has_cooking;
  const hasParking = !!house.has_parking;
  const noSmoking = !!house.no_smoking;

  return (
    <article className="relative break-inside-avoid rounded-2xl bg-white shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {/* Make the whole card clickable */}
      <Link to={href} aria-label={`View ${title}`}>
        <span className="absolute inset-0 z-10" />
      </Link>

      <div className="aspect-[4/3] w-full bg-gray-100 overflow-hidden">
        <img
          src={photo}
          alt={title}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold text-[#4A4032] line-clamp-2">
            {title}
          </h3>
          <span className="shrink-0 rounded-lg bg-[#4A4032]/10 px-2 py-1 text-sm font-medium text-[#4A4032]">
            {priceLabel}
          </span>
        </div>

        <p className="text-sm text-[#6B5E4A] line-clamp-3">{description}</p>

        {/* Info chips */}
        <div className="flex flex-wrap items-center gap-2 text-sm text-[#6B5E4A]">
          <span className="inline-flex items-center gap-1 rounded-full bg-[#E8DFD0] px-2 py-1">
            🛏 {bedroomsLabel} bd
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-[#E8DFD0] px-2 py-1">
            📍 {locationLabel}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-[#E8DFD0] px-2 py-1">
            ⚡ {utilIncluded ? "Utilities included" : "Utilities extra"}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-[#E8DFD0] px-2 py-1">
            {isSublet ? "🪪 Sublet" : "📄 Lease"}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-[#E8DFD0] px-2 py-1">
            {isShared ? "👥 Shared" : "👤 Private"}
          </span>
          {hasLaundry && (
            <span className="inline-flex items-center gap-1 rounded-full bg-[#E8DFD0] px-2 py-1">
              🧺 Laundry
            </span>
          )}
          {hasCooking && (
            <span className="inline-flex items-center gap-1 rounded-full bg-[#E8DFD0] px-2 py-1">
              🍳 Cooking
            </span>
          )}
          {hasParking && (
            <span className="inline-flex items-center gap-1 rounded-full bg-[#E8DFD0] px-2 py-1">
              🚗 Parking
            </span>
          )}
          {noSmoking && (
            <span className="inline-flex items-center gap-1 rounded-full bg-[#E8DFD0] px-2 py-1">
              🚭 No smoking
            </span>
          )}
        </div>

        {/* Availability + CTA */}
        <div className="flex items-center justify-between pt-1">
          <div className="text-xs text-[#8B7355]">
            {availableLabel ? `Available ${availableLabel}` : ""}
          </div>
          <Link
            to={href}
            className="relative z-20 inline-block rounded-lg bg-[#4A4032] px-3 py-1.5 text-white text-sm hover:bg-[#5C503E]"
          >
            View details →
          </Link>
        </div>
      </div>
    </article>
  );
};

export default HouseCard;
