// src/components/HouseCard.jsx
import {Link} from 'react-router-dom';

const HouseCard = ({ house, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="mb-4 break-inside-avoid rounded-lg shadow bg-white cursor-pointer"
    >
      <img
        src={house.image}
        alt={house.title}
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold text-[#4A4032]">{house.title}</h2>
        <p className="text-gray-600">Location: {house.location}</p>
        <p className="text-gray-600">Price: {house.price}</p>
        
        {/*Create link to further house details */}
        <Link to={`/house/${house.id}`}>
          <button className = "mt-4 bg-[#4A4032] text-white px-4 py-2 rounded-lg hover:bg-[#5C503E] transition-colors">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};



export default HouseCard;

// In your App.jsx or router configuration file
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HouseDetail from '../pages/HouseDetail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Houses />} />
        <Route path="/house/:id" element={<HouseDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
