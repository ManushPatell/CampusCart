import React, { useState } from "react";
import HouseCard from "../components/HouseCard";
import mockListings from "../data/mockListings"; // import mock data for housing listings

const Houses = () => {
  const [searchTerm, setSearchTerm] = useState(""); //state variable for search term [value, setValue] = useState(initialValue)
  const [isFilterOpen, setIsFilterOpen] = useState(false); //boolean state to control filter drawer visibility
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

  const filteredListings = mockListings.filter((house) => {
    // filters the mock listings based on search term and selected filters
    const matchesSearch =
      house.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      house.description.toLowerCase().includes(searchTerm.toLowerCase());

    const price = parseFloat(house.price.replace(/[^0-9.]/g, "")); //removes anything but digits and decimal points and converts to float
    const matchesPrice =
      !filters.priceRange || price <= parseFloat(filters.priceRange); // checks if price is less than or equal to the selected price range
    const matchesLocation =
      !filters.location || house.location.includes(filters.location); // checks if the house location includes the selected location
    const matchesBedrooms =
      !filters.bedrooms ||
      house.details.bedrooms.toString() === filters.bedrooms; // checks if the number of bedrooms matches the selected number of bedrooms
    const matchesUtilities = house.details.utilities
      .toLowerCase()
      .includes(filters.utilities.toLowerCase());
    const matchesFurnished =
      !filters.furnished ||
      house.amenities.some((a) => a.toLowerCase().includes("furnished"));
    const matchesPetFriendly =
      !filters.petFriendly ||
      house.amenities.some((a) => a.toLowerCase().includes("pet"));

    return (
      matchesSearch &&
      matchesPrice &&
      matchesLocation &&
      matchesBedrooms &&
      matchesUtilities &&
      (!filters.furnished || matchesFurnished) &&
      (!filters.petFriendly || matchesPetFriendly)
    );
  });

  // Render the component
  return (
    <div className="min-h-screen bg-[#F5F1EA] font-serif">
      {/* Header */}
      <div className="py-8 px-4">
        <h1 className="text-4xl font-extrabold text-[#4A4032]">
          Housing Listings
        </h1>
      </div>

      {/* Disclaimer */}
      <div className="px-4 py-6">
        <h2 className="text-2xl text-[#4A4032] font-serif">
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
        <div className="flex justify-between items-center p-4 border-b">
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
            <p className="text-[#6B5B45] mb-2">Bedrooms</p>
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
            <label className="flex gap-2 text-[#4A4032] items-center">
              <input
                type="checkbox"
                checked={filters.furnished}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    furnished: e.target.checked,
                  }))
                }
                className="accent-[#4A4032]"
              />
              Furnished
            </label>
            <label className="flex gap-2 text-[#4A4032] items-center">
              <input
                type="checkbox"
                checked={filters.petFriendly}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    petFriendly: e.target.checked,
                  }))
                }
                className="accent-[#4A4032]"
              />
              Pet Friendly
            </label>
          </div>

          {/* Price Slider */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-[#6B5B45] mb-2">Price Range</p>
              <span className="text-[#4A4032] font-medium">
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
            className="mt-6 w-full bg-[#4A4032] text-white py-2 rounded-lg hover:bg-[#5C503E]"
          >
            APPLY FILTERS
          </button>
        </div>
      </div>

      {/* Listings */}
      <div className="px-4 py-8">
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6">
          {filteredListings.map((house) => (
            <HouseCard key={house.id} house={house} description={house.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Houses;
