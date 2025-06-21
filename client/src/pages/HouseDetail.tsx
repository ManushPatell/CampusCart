import React from 'react';
import mockListings from '../data/mockListings';
import NavBar from '../components/NavBar';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';


export default function HouseDetail() {
  const { id } = useParams();
//   const house = mockListings.find(h => h.id.toString() === id); Remove mock listings when connected to backend
    

    const [house, setHouse] = useState<any>(null);
    const [error, setError] = useState('');

    useEffect(() => {
    fetch(`http://localhost:3001/api/rentals/${id}`)
    .then((res) => {
        if (!res.ok) throw new Error('House not found');
        return res.json();
    })
    .then((data) => setHouse(data))
    .catch((err) => {
        console.error(err);
        setError(err.message);
    });
    }, [id]);

    // If there's an error, display it
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
        {/* Images */}
        <img
            src={house.image || 'https://via.placeholder.com/600x300?text=No+Image'}
            alt={house.title}
            className="w-full h-80 object-cover rounded-lg mb-6"
        />

         {/* Want to implement a slideshow gallery */}

        {/* Title and Price */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
          <h1 className="text-3xl font-bold text-[#4A4032]">{house.title}</h1>
          <span className="text-2xl font-semibold text-[#4A4032]">{house.price}</span>
        </div>

        {/* Location and Dates */}
        <div className="flex flex-col md:flex-row md:gap-8 text-[#6B5B45] mb-4">
          <div>Location: {house.location}</div>
          <div>Available: {house.details.available}</div>
          <div>Lease: {house.details.lease}</div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-[#4A4032] mb-2">Description</h2>
          <p className="text-[#6B5B45]">{house.description}</p>
        </div>

        {/* Amenities */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-[#4A4032] mb-2">Amenities</h2>
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