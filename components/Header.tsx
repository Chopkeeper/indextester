import React, { useState } from 'react';
import { LocationIcon, ClockIcon, PhoneIcon, MailIcon } from './Icons';

const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="w-full">
            {/* Top Bar */}
            <div className="bg-brand-blue-dark text-white py-2 text-sm">
                <div className="container mx-auto px-4 flex flex-wrap justify-between items-center">
                    <div className="flex items-center space-x-4 mb-2 md:mb-0">
                        <div className="flex items-center space-x-1">
                            <LocationIcon className="w-4 h-4 text-brand-blue" />
                            <span>123 Street, New York, USA</span>
                        </div>
                        <div className="hidden md:flex items-center space-x-1">
                            <ClockIcon className="w-4 h-4 text-brand-blue" />
                            <span>Mon - Fri : 09.00 AM - 09.00 PM</span>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                            <PhoneIcon className="w-4 h-4 text-brand-blue" />
                            <span>+012 345 6789</span>
                        </div>
                        <div className="flex space-x-2">
                            {/* Social Icons Placeholder */}
                            <a href="#" className="hover:text-brand-blue">F</a>
                            <a href="#" className="hover:text-brand-blue">T</a>
                            <a href="#" className="hover:text-brand-blue">L</a>
                            <a href="#" className="hover:text-brand-blue">I</a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Navigation */}
            <nav className="bg-white shadow-md">
                <div className="container mx-auto px-4 flex justify-between items-center py-4">
                    <a href="#home" className="text-3xl font-bold text-brand-blue-dark">
                        <span className="text-brand-blue">K</span>linik
                    </a>
                    <div className="hidden md:flex items-center space-x-6 text-brand-blue-dark font-medium">
                        <a href="#home" className="hover:text-brand-blue">HOME</a>
                        <a href="#about" className="hover:text-brand-blue">ABOUT</a>
                        <a href="#services" className="hover:text-brand-blue">SERVICE</a>
                        <a href="#ita" className="hover:text-brand-blue">ITA</a>
                        <a href="#pages" className="hover:text-brand-blue">PAGES</a>
                        <a href="#contact" className="hover:text-brand-blue">CONTACT</a>
                    </div>
                    <div className="flex items-center space-x-4">
                        <a href="#contact" className="hidden md:inline-block bg-brand-blue text-white font-semibold py-2 px-6 rounded-md hover:bg-opacity-90 transition duration-300">
                            Appointment
                        </a>
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-brand-blue-dark">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
                        </button>
                    </div>
                </div>
                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden bg-white border-t">
                        <a href="#home" className="block py-2 px-4 text-sm text-brand-blue-dark hover:bg-gray-100">HOME</a>
                        <a href="#about" className="block py-2 px-4 text-sm text-brand-blue-dark hover:bg-gray-100">ABOUT</a>
                        <a href="#services" className="block py-2 px-4 text-sm text-brand-blue-dark hover:bg-gray-100">SERVICE</a>
                        <a href="#ita" className="block py-2 px-4 text-sm text-brand-blue-dark hover:bg-gray-100">ITA</a>
                        <a href="#pages" className="block py-2 px-4 text-sm text-brand-blue-dark hover:bg-gray-100">PAGES</a>
                        <a href="#contact" className="block py-2 px-4 text-sm text-brand-blue-dark hover:bg-gray-100">CONTACT</a>
                        <a href="#contact" className="block py-2 px-4 text-sm text-white bg-brand-blue text-center rounded-md m-2">Appointment</a>
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Header;
