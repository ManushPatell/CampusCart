import React, { useState, useEffect } from "react";
import NavBar from "../components/Nav.js";
import { useParams } from "react-router-dom";
import { Rental } from "../types/types.js";

export default function HouseDetail() {
  const { id } = useParams();
  const [house, setHouse] = useState<Rental | null>(null);
  const [error, setError] = useState<string>("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchHouse = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/rentals/${id}`,
        );
        if (!res.ok) {
          setError("House not found");
          return;
        }
        const data = await res.json();
        setHouse(data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch rental data.");
      }
    };

    fetchHouse();
  }, [id]);

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (!house) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  return (
    <>
      <NavBar />
      <div className="bg-white rounded-none shadow-lg p-8 w-full">
        {/* Image Slideshow */}
        {house.images && house.images.length > 0 ? (
          <div className="relative w-full h-80 mb-6">
            <img
              src={house.images[currentImageIndex]}
              alt={`Image ${currentImageIndex + 1}`}
              className="w-full h-80 object-cover rounded-lg"
            />

            {/* Navigation Arrows */}
            {house.images.length > 1 && (
              <>
                <button
                  onClick={() =>
                    setCurrentImageIndex(
                      (currentImageIndex - 1 + house.images.length) %
                        house.images.length,
                    )
                  }
                  className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-80 p-2 rounded-full shadow"
                >
                  ◀
                </button>
                <button
                  onClick={() =>
                    setCurrentImageIndex(
                      (currentImageIndex + 1) % house.images.length,
                    )
                  }
                  className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-80 p-2 rounded-full shadow"
                >
                  ▶
                </button>
              </>
            )}
          </div>
        ) : (
          <img
            src="https://via.placeholder.com/600x300?text=No+Image"
            alt="No image"
            className="w-full h-80 object-cover rounded-lg mb-6"
          />
        )}

        {/* Title and Price */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
          <h1 className="text-3xl font-bold text-[#4A4032]">
            {house.house_type}
          </h1>
          <span className="text-2xl font-semibold text-[#4A4032]">
            ${house.cost}
          </span>
        </div>

        {/* Location and Dates */}
        <div className="flex flex-col md:flex-row md:gap-8 text-[#6B5B45] mb-4">
          <div>Location: {house.address}</div>
          <div>Available: {house.date_available}</div>
          <div>Posted: {house.post_date}</div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-[#4A4032] mb-2">
            Description
          </h2>
          <p className="text-[#6B5B45]">{house.description}</p>
        </div>

        {/* Amenities */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-[#4A4032] mb-2">
            Amenities
          </h2>
          <div className="flex flex-wrap gap-2">
            {house.amenities.map((amenity: string, idx: number) => (
              <span
                key={idx}
                className="bg-[#F5F1EA] text-[#6B5B45] px-3 py-1 rounded text-sm"
              >
                {amenity}
              </span>
            ))}
          </div>
        </div>

        {/* Seller Info */}
        <div className="border-t pt-4 mt-4 text-[#8B7355]">
          <h2 className="text-lg font-semibold mb-1">Contact</h2>
          <div>Name: {house.seller.name}</div>
          <div>Email: {house.seller.contact}</div>
        </div>
      </div>
    </>
  );
}
