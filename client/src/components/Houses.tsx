import React, { useEffect, useState, useMemo } from "react";
import HouseCard from "../components/HouseCard";

const Houses = () => {
  const [searchTerm, setSearchTerm] = useState(""); //state variable for search term [value, setValue] = useState(initialValue)
  const [isFilterOpen, setIsFilterOpen] = useState(false); //boolean state to control filter drawer visibility
  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    priceRange: "",
    location: "",
    bedrooms: "",
    utilities: "",
    furnished: false,
    petFriendly: false,
    minPrice: 0,
    maxPrice: 2000,
    currentPrice: 2000,
  });
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/rentals`)
      .then((r) => r.json())
      .then((data) => {
        const arr = Array.isArray(data) ? data : [];
        setListings(arr);

        // compute a reasonable max from cost/price
        const max = arr.reduce((m, h) => {
          const p =
            typeof h.cost === "number"
              ? h.cost
              : typeof h.price === "number"
                ? h.price
                : parseFloat(
                    String(h.price ?? h.cost ?? "0").replace(/[^0-9.]/g, ""),
                  ) || 0;
          return Math.max(m, p);
        }, 0);

        if (max > 0) {
          setFilters((prev) => ({
            ...prev,
            maxPrice: Math.ceil(max),
            currentPrice: Math.ceil(max),
          }));
        }
      })
      .catch((e) => setError(String(e)))
      .finally(() => setLoading(false));
  }, []);

  const filteredListings = listings.filter((house) => {
    // search (title/description)
    const title = String(house.title ?? "").toLowerCase();
    const desc = String(house.description ?? "").toLowerCase();
    const matchesSearch =
      title.includes(searchTerm.toLowerCase()) ||
      desc.includes(searchTerm.toLowerCase());

    // price: use cost (DB) or fallback to price
    const price =
      typeof house.cost === "number"
        ? house.cost
        : typeof house.price === "number"
          ? house.price
          : parseFloat(
              String(house.price ?? house.cost ?? "0").replace(/[^0-9.]/g, ""),
            ) || 0;

    // IMPORTANT: compare to currentPrice (the slider), not priceRange
    const matchesPrice = price <= (Number(filters.currentPrice) || Infinity);

    // location: DB has address, sometimes city/state
    const loc = String(
      house.location ??
        house.address ??
        [house.city, house.state].filter(Boolean).join(", ") ??
        "",
    ).toLowerCase();
    const matchesLocation =
      !filters.location || loc.includes(String(filters.location).toLowerCase());

    // bedrooms: DB uses num_beds
    const bedroomsVal =
      house.num_beds ?? house.details?.bedrooms ?? house.bedrooms;
    const bedroomsNum = Number.isFinite(Number(bedroomsVal))
      ? Number(bedroomsVal)
      : undefined;
    const matchesBedrooms =
      !filters.bedrooms ||
      (Number.isFinite(bedroomsNum) &&
        bedroomsNum === Number(filters.bedrooms));

    // utilities: DB boolean is_utilities_included → make it searchable text
    const utilitiesText =
      typeof house.is_utilities_included === "boolean"
        ? house.is_utilities_included
          ? "utilities included included"
          : "utilities not included excluded"
        : String(house.details?.utilities ?? "");
    const matchesUtilities = String(utilitiesText)
      .toLowerCase()
      .includes(String(filters.utilities || "").toLowerCase());

    // furnished / pet: only filter if user toggled; your DB doesn’t have these, so don’t exclude by accident
    const hasFurnished =
      Array.isArray(house.amenities) &&
      house.amenities.some((a: any) => /furnish/i.test(String(a)));
    const hasPet =
      Array.isArray(house.amenities) &&
      house.amenities.some((a: any) => /pet/i.test(String(a)));

    const matchesFurnished = !filters.furnished || hasFurnished;
    const matchesPetFriendly = !filters.petFriendly || hasPet;

    return (
      matchesSearch &&
      matchesPrice &&
      matchesLocation &&
      matchesBedrooms &&
      matchesUtilities &&
      matchesFurnished &&
      matchesPetFriendly
    );
  });

  // Render the component
  return (
    <div className="min-h-screen bg-bg py-10">
      {/* Header */}
      <div className="px-4 mt-[5rem]">
        <h1 className="text-4xl font-extrabold text-[#4A4032]">
          Housing Listings
        </h1>
      </div>

      {/* Disclaimer */}
      <div className="px-4 py-6">
        <h2 className="text-2xl text-[#4A4032]">
          Campus Cart does not guarantee all content in the classifieds section
          to be true. Duplicate and/or multiple listings for the same content
          will be deleted.
        </h2>
      </div>

      {/* Search Bar */}
      <section className="px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between gap-8">
            {/* Search Bar */}
            <div className="flex-1">
              <div className="flex items-center gap-2 bg-white rounded-lg shadow-md p-2">
                <input
                  type="text"
                  placeholder="Search listings..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)} // updates the search term state as the user types
                  className="w-full px-4 py-2 text-lg text-[#4A4032] outline-none"
                />
                <button className="bg-[#4A4032] text-white px-4 py-2 rounded-lg hover:bg-[#5C503E] transition-colors">
                  🔍
                </button>
              </div>
            </div>

            {/* Filter Button */}
            <button
              onClick={() => setIsFilterOpen(true)} // opens the filter drawer
              className="bg-[#4A4032] text-white px-6 py-2 rounded-lg shadow hover:bg-[#5C503E] flex items-center gap-2 whitespace-nowrap"
            >
              <span>Filters</span>
              <span className="text-xl">⚙️</span>
            </button>
          </div>
        </div>
      </section>

      {/* Filter Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white shadow-lg z-50 transition-transform duration-300 ease-in-out ${
          isFilterOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b pt-[4.5rem]">
          <h3 className="text-xl font-bold text-[#4A4032]">Filters</h3>
          <button
            onClick={() => setIsFilterOpen(false)}
            className="text-[#4A4032] text-lg"
          >
            ✕
          </button>
        </div>

        <div className="p-6 space-y-4">
          {/* Bedrooms */}
          <div>
            <p className="text-primary-fg mb-2">Bedrooms</p>
            <div className="flex flex-wrap gap-2">
              {["Any", "1", "2", "3", "4", "5"].map((count) => (
                <button
                  key={count}
                  onClick={() =>
                    setFilters((prev) => ({
                      // updates the filters state with the selected number of bedrooms
                      ...prev,
                      bedrooms: count === "Any" ? "" : count,
                    }))
                  }
                  className={`px-3 py-1 rounded-full border text-sm transition ${
                    filters.bedrooms === (count === "Any" ? "" : count)
                      ? "bg-[#4A4032] text-white"
                      : "bg-white border-[#E8DFD0] text-[#4A4032]"
                  }`}
                >
                  {count}
                </button>
              ))}
            </div>
          </div>

          {/* Checkboxes */}
          <div className="space-y-2">
            <label className="flex gap-2 text-secondary-fg items-center">
              <input
                type="checkbox"
                checked={filters.furnished}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    furnished: e.target.checked,
                  }))
                }
                className="accent-secondary-fg"
              />
              Furnished
            </label>
            <label className="flex gap-2 text-secondary-fg items-center">
              <input
                type="checkbox"
                checked={filters.petFriendly}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    petFriendly: e.target.checked,
                  }))
                }
                className="accent-primary-fg"
              />
              Pet Friendly
            </label>
          </div>

          {/* Price Slider */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-primary-fg mb-2">Price Range</p>
              <span className="text-secondary-fg font-medium">
                ${filters.currentPrice}
              </span>
            </div>

            <div className="relative pt-1">
              <input
                type="range" // creates a slider for selecting the current price
                min={filters.minPrice}
                max={filters.maxPrice}
                value={filters.currentPrice} // sets the value of the slider to the current price
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  setFilters((prev) => ({
                    ...prev,
                    currentPrice: value,
                    priceRange: value.toString(),
                  })); //...prev spreads the previous filters state and updates the current price and price range
                }}
                className="w-full h-2 bg-[#E8DFD0] rounded-lg appearance-none cursor-pointer
        [&::-webkit-slider-thumb]:appearance-none
        [&::-webkit-slider-thumb]:w-6
        [&::-webkit-slider-thumb]:h-6
        [&::-webkit-slider-thumb]:rounded-full
        [&::-webkit-slider-thumb]:bg-[#4A4032]
        [&::-webkit-slider-thumb]:cursor-pointer
        [&::-moz-range-thumb]:w-6
        [&::-moz-range-thumb]:h-6
        [&::-moz-range-thumb]:rounded-full
        [&::-moz-range-thumb]:bg-[#4A4032]
        [&::-moz-range-thumb]:border-0
        [&::-moz-range-thumb]:cursor-pointer
        hover:[&::-webkit-slider-thumb]:bg-[#5C503E]
        hover:[&::-moz-range-thumb]:bg-[#5C503E]"
              />

              <div className="flex justify-between mt-2 text-xs text-[#8B7355]">
                <span>${filters.minPrice}</span>
                <span>${filters.maxPrice}</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsFilterOpen(false)}
            className="mt-6 w-full bg-primary-fg text-white py-2 rounded-lg hover:bg-primary-fg/75"
          >
            APPLY FILTERS
          </button>
        </div>
      </div>

      {/* Listings */}
      <div className="px-4 py-8">
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredListings.map((house) => (
            <HouseCard key={house.id} house={house} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Houses;
