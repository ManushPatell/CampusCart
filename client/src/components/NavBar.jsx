import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavBar = () => {
    const location = useLocation();

    const linkClasses = (path) =>
        `text-[#6B5B45] text-base transition-colors duration-200 hover:text-[#4A4032] ${
            location.pathname === path ? 'text-[#4A4032] font-semibold' : ''
        }`;

    return (
        <nav className="flex items-center justify-between px-8 py-4 bg-[#F5F1EA] shadow-md border-b border-[#E8DFD0]">
            <Link to="/" className="font-bold text-2xl tracking-wide text-[#4A4032] no-underline">
                CampusCart
            </Link>
            <div className="flex gap-8">
                <Link to="/" className={linkClasses('/')}>
                    Home
                </Link>
                <Link to="/about" className={linkClasses('/about')}>
                    About
                </Link>
                <Link to="/shop" className={linkClasses('/shop')}>
                    Shop
                </Link>
                <Link to="/contact" className={linkClasses('/contact')}>
                    Contact
                </Link>
            </div>
        </nav>
    );
};

export default NavBar;
