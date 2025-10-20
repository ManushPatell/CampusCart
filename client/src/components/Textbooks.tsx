import React, { useState, useEffect } from "react";
import TextbookCard from "../components/TextbookCard";
// import mockTextbooks from "../data/mockTextbooks"; // not used; remove if unused
import { useNavigate } from "react-router-dom";

const mcmasterFaculties = [
  "Engineering",
  "Health Sciences",
  "Humanities",
  "Business (DeGroote School of Business)",
  "Science",
  "Social Sciences",
];

const Textbooks = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    faculty: "",
    condition: "",
    maxPrice: 200,
    currentPrice: 200,
  });

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/textbooks`)
      .then((r) => r.json())
      .then((data) => setListings(Array.isArray(data) ? data : []))
      .catch((e) => setError(String(e)))
      .finally(() => setLoading(false));
  }, []);

  const filteredTextbooks = listings.filter((book) => {
    const title = String(book.book_title ?? "").toLowerCase();
    const author = String(book.author ?? "").toLowerCase();
    const matchesSearch =
      title.includes(searchTerm.toLowerCase()) ||
      author.includes(searchTerm.toLowerCase());

    const faculty = String(book.faculty ?? "");
    const matchesFaculty =
      !filters.faculty ||
      faculty.toLowerCase() === filters.faculty.toLowerCase();

    const condition = String(book.condition ?? "");
    const matchesCondition =
      !filters.condition ||
      condition.toLowerCase() === filters.condition.toLowerCase();

    const price =
      typeof book.price === "number"
        ? book.price
        : parseFloat(String(book.price ?? "0")) || 0;

    const matchesPrice = price <= filters.currentPrice;

    return matchesSearch && matchesFaculty && matchesCondition && matchesPrice;
  });

  if (loading) return <div className="p-4">Loading…</div>;
  if (error) return <div className="p-4 text-red-600">{error}</div>;

  return (
    <div className="min-h-[100vh] bg-bg py-10">
      {/* Header */}
      <div className="px-4 mt-[5rem]">
        <h1 className="text-4xl font-extrabold text-[#4A4032]">
          Textbook Listings
        </h1>
      </div>

      <div className="px-4 py-6">
        <h2 className="text-2xl text-[#4A4032]">
          Campus Cart does not guarantee all content in the classifieds section
          to be true. Duplicate and/or multiple listings for the same content
          will be deleted.
        </h2>
      </div>

      {/* Search + Filters Button */}
      <section className="px-4 py-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-8">
          <div className="flex-1">
            <div className="flex items-center gap-2 bg-white rounded-lg shadow-md p-2">
              <input
                type="text"
                placeholder="Search textbooks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 text-lg text-[#4A4032] outline-none"
              />
              <button className="bg-[#4A4032] text-white px-4 py-2 rounded-lg hover:bg-[#5C503E]">
                🔍
              </button>
            </div>
          </div>

          <button
            onClick={() => setIsFilterOpen(true)}
            className="bg-[#4A4032] text-white px-6 py-2 rounded-lg shadow hover:bg-[#5C503E] flex items-center gap-2"
          >
            <span>Filters</span>
            <span className="text-xl">⚙️</span>
          </button>
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
          {/* Faculty (McMaster) */}
          <div>
            <label className="text-primary-fg block mb-2">Faculty</label>
            <select
              value={filters.faculty}
              onChange={(e) =>
                setFilters({ ...filters, faculty: e.target.value })
              }
              className="w-full border px-3 py-2 rounded-md text-[#4A4032]"
            >
              <option value="">Any</option>
              {mcmasterFaculties.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
          </div>

          {/* Condition */}
          <div>
            <label className="text-primary-fg block mb-2">Condition</label>
            <select
              value={filters.condition}
              onChange={(e) =>
                setFilters({ ...filters, condition: e.target.value })
              }
              className="w-full border px-3 py-2 rounded-md text-[#4A4032]"
            >
              <option value="">Any</option>
              <option value="New">New</option>
              <option value="Like New">Like New</option>
              <option value="Used">Used</option>
              <option value="Worn">Worn</option>
            </select>
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
              min={0}
              max={filters.maxPrice}
              value={filters.currentPrice}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  currentPrice: parseInt(e.target.value, 10),
                }))
              }
              className="w-full h-2 bg-[#E8DFD0] rounded-lg appearance-none cursor-pointer
              [&::-webkit-slider-thumb]:appearance-none
              [&::-webkit-slider-thumb]:w-6
              [&::-webkit-slider-thumb]:h-6
              [&::-webkit-slider-thumb]:rounded-full
              [&::-webkit-slider-thumb]:bg-[#4A4032]
              hover:[&::-webkit-slider-thumb]:bg-[#5C503E]"
            />
            <div className="flex justify-between mt-2 text-xs text-[#8B7355]">
              <span>$0</span>
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
          {filteredTextbooks.map((book) => {
            const id = String(book.id ?? book._id);
            const path = `/textbooks/${encodeURIComponent(id)}`;
            const label = `Open ${book.book_title ?? "textbook"} details`;

            return (
              <div
                key={id}
                role="link"
                tabIndex={0}
                aria-label={label}
                onClick={() => navigate(path)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    navigate(path);
                  }
                }}
                // 👇 prevents column split/ghost line + clips any ring/overflow
                className="mb-6 inline-block w-full align-top cursor-pointer rounded-lg overflow-hidden outline-none
                     focus-visible:ring-2 focus-visible:ring-[#4A4032] focus-visible:ring-offset-2
                     break-inside-avoid"
                style={{
                  breakInside: "avoid-column", // modern
                  WebkitColumnBreakInside: "avoid", // Safari/old WebKit
                  pageBreakInside: "avoid", // older engines
                }}
              >
                <TextbookCard textbook={book} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Textbooks;
