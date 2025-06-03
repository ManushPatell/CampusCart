import React from 'react';
import Houses from '../components/Houses';
import mockListings from '../data/mockListings';
import NavBar from '../components/NavBar';

import { useParams } from 'react-router-dom';

export default function HouseDetail(){

    const {id}=useParams(); //grabs the houseId from the URL
    const house = mockListings.find(h => h.id.toString() === id); //finds the house with the matching ID
    if (!house) {
        return <div className="text-center text-red-500">House not found</div>;
    }   
    return (
        <>
            <NavBar/>
            <h1 className="text-4xl text-left py-20">{house.title}</h1>

            <div className="text-2xl text-left">{house.price}</div>
        </>
    )

}