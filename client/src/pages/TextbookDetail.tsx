import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../components/Nav";
import { Textbook } from "../types/types";

export default function TextbookDetail() {
  const { id } = useParams();
  const [textbook, setTextbook] = useState<Textbook | null>(null);
  const [error, setError] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchTextbook = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/textbooks/${id}`);
        if (!res.ok) {
          setError("Textbook not found");
          return;
        }
        const data = await res.json();
        setTextbook(data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch textbook data.");
      }
    };

    fetchTextbook();
  }, [id]);

  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (!textbook) return <div className="text-center text-gray-500">Loading...</div>;

  return (
    <>
      <NavBar />
      <div className="bg-white shadow-lg p-8 max-w-3xl mx-auto mt-8 rounded-lg">
        {textbook.photos && textbook.photos.length > 0 ? (
          <div className="relative w-full h-80 mb-6">
            <img
              src={textbook.photos[currentImageIndex]}
              alt={`Image ${currentImageIndex + 1}`}
              className="w-full h-80 object-cover rounded-lg"
            />
            {textbook.photos.length > 1 && (
              <>
                <button
                  onClick={() =>
                    setCurrentImageIndex(
                      (currentImageIndex - 1 + textbook.photos.length) % textbook.photos.length
                    )
                  }
                  className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-80 p-2 rounded-full shadow"
                >
                  ◀
                </button>
                <button
                  onClick={() =>
                    setCurrentImageIndex((currentImageIndex + 1) % textbook.photos.length)
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

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
          <h1 className="text-3xl font-bold text-[#4A4032]">{textbook.book_title}</h1>
          <span className="text-2xl font-semibold text-[#4A4032]">${textbook.price}</span>
        </div>

        <div className="text-[#6B5B45] mb-4 space-y-1">
          <div><strong>Author:</strong> {textbook.author}</div>
          <div><strong>Edition:</strong> {textbook.edition}</div>
          <div><strong>Condition:</strong> {textbook.condition}</div>
          <div><strong>Course Code:</strong> {textbook.course_code}</div>
          <div><strong>Faculty:</strong> {textbook.faculty}</div>
          <div><strong>Year:</strong> {textbook.year}</div>
          <div><strong>Date Posted:</strong> {textbook.date_posted}</div>
        </div>

        <div className="border-t pt-4 mt-6 text-[#8B7355]">
          <h2 className="text-lg font-semibold mb-1">Contact Seller</h2>
          <div>Seller ID: {textbook.seller}</div>
        </div>
      </div>
    </>
  );
}
