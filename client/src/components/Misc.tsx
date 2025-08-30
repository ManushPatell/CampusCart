// pages/Misc.tsx
import React, { useEffect, useMemo, useState } from "react";
import MiscCard, { MiscItem } from "../components/MiscCard";

const Misc = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [listings, setListings] = useState<MiscItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [filters, setFilters] = useState({
    listingType: "",
    minPrice: 0,
    maxPrice: 1000,
    currentPrice: 1000,
  });

      useEffect(() => {
        // Initial load (you can also pass query params here)
        fetch(`/api/misc`)
          .then((r) => r.json())
          .then((data) => {
      const raw = Array.isArray(data) ? data : [];

      // 🔧 1-liner-ish normalization: always give the card `image: string[]`
      const arr: MiscItem[] = raw.map((it: any) => ({
        ...it,
        image: Array.isArray(it.image)
          ? it.image
          : Array.isArray(it.images)
          ? it.images
          : Array.isArray(it.photos)
          ? it.photos
          : it.photo
          ? [it.photo]
          : [],
      }));

      setListings(arr); // ← keep the rest of your code the same

      // ... your slider max code below stays as-is
      const max = arr.reduce((m, it) => {
        const p =
          typeof it.price === "number"
            ? it.price
            : parseFloat(String(it.price).replace(/[^0-9.]/g, "")) || 0;
        return Math.max(m, p);
      }, 0);

      if (max > 0) {
        const ceil = Math.ceil(max);
        setFilters((prev) => ({
          ...prev,
          maxPrice: ceil,
          currentPrice: ceil,
        }));
      }
    })
      .catch((e) => setError(String(e)))
      .finally(() => setLoading(false));
  }, []);

  const filteredListings = useMemo(() => {
    return listings.filter((item: MiscItem) => {
      const matchesSearch =
        String(item.title ?? "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        String(item.description ?? "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      const numericPrice =
        typeof item.price === "number"
          ? item.price
          : parseFloat(String(item.price).replace(/[^0-9.]/g, "")) || 0;

      const matchesPrice = numericPrice <= filters.currentPrice;

      const matchesListingType =
        !filters.listingType || item.listing_type === filters.listingType;

      return matchesSearch && matchesPrice && matchesListingType;
    });
  }, [listings, searchTerm, filters]);

  if (loading) return <div className="p-6">Loading…</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="min-h-screen bg-bg">
      {/* Header */}
      <div className="py-8 px-4">
        <h1 className="text-4xl font-extrabold text-[#4A4032]">
          Extras & Misc Listings
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

      {/* Search + Filter Bar */}
      <section className="px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between gap-8">
            {/* Search */}
            <div className="flex-1">
              <div className="flex items-center gap-2 bg-white rounded-lg shadow-md p-2">
                <input
                  type="text"
                  placeholder="Search misc listings..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 text-lg text-[#4A4032] outline-none"
                />
                <button className="bg-[#4A4032] text-white px-4 py-2 rounded-lg hover:bg-[#5C503E] transition-colors">
                  🔍
                </button>
              </div>
            </div>

            {/* Filter button */}
            <button
              onClick={() => setIsFilterOpen(true)}
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

        <div className="p-6 space-y-6">
          {/* Listing Type */}
          <div>
            <p className="text-primary-fg mb-2">Listing Type</p>
            <div className="flex gap-3">
              {["Any", "Selling", "Wanting"].map((type) => (
                <button
                  key={type}
                  onClick={() =>
                    setFilters((prev) => ({
                      ...prev,
                      listingType: type === "Any" ? "" : type,
                    }))
                  }
                  className={`px-3 py-1 rounded-full border text-sm transition ${
                    filters.listingType === (type === "Any" ? "" : type)
                      ? "bg-[#4A4032] text-white"
                      : "bg-white border-[#E8DFD0] text-[#4A4032]"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Price Slider */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-primary-fg mb-2">Max Price</p>
              <span className="text-secondary-fg font-medium">
                ${filters.currentPrice}
              </span>
            </div>

            <input
              type="range"
              min={filters.minPrice}
              max={filters.maxPrice}
              value={filters.currentPrice}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  currentPrice: parseInt(e.target.value),
                }))
              }
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
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6">
          {filteredListings.map((item) => (
            <MiscCard key={item.id} misc={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Misc;
