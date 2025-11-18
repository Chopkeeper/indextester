
import React from 'react';
import { LocationIcon, PhoneIcon, MailIcon } from './Icons';

const Footer: React.FC = () => {
    return (
        <footer className="bg-brand-blue-dark text-gray-300">
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-xl font-bold text-white mb-4">Address</h3>
                        <div className="flex items-start space-x-2 mb-2">
                            <LocationIcon className="w-5 h-5 mt-1 text-brand-blue" />
                            <span>123 Street, New York, USA</span>
                        </div>
                        <div className="flex items-center space-x-2 mb-2">
                            <PhoneIcon className="w-5 h-5 text-brand-blue" />
                            <span>+012 345 6789</span>
                        </div>
                        <div className="flex items-center space-x-2 mb-2">
                            <MailIcon className="w-5 h-5 text-brand-blue" />
                            <span>info@example.com</span>
                        </div>
                         <div className="flex space-x-2 mt-4">
                            {/* Social Icons Placeholder */}
                            <a href="#" className="w-10 h-10 border border-gray-500 rounded-full flex items-center justify-center hover:bg-brand-blue hover:border-brand-blue transition">T</a>
                            <a href="#" className="w-10 h-10 border border-gray-500 rounded-full flex items-center justify-center hover:bg-brand-blue hover:border-brand-blue transition">F</a>
                            <a href="#" className="w-10 h-10 border border-gray-500 rounded-full flex items-center justify-center hover:bg-brand-blue hover:border-brand-blue transition">Y</a>
                            <a href="#" className="w-10 h-10 border border-gray-500 rounded-full flex items-center justify-center hover:bg-brand-blue hover:border-brand-blue transition">L</a>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white mb-4">Services</h3>
                        <ul className="space-y-2">
                            <li><a href="#services" className="hover:text-white">> Cardiology</a></li>
                            <li><a href="#services" className="hover:text-white">> Pulmonary</a></li>
                            <li><a href="#services" className="hover:text-white">> Neurology</a></li>
                            <li><a href="#services" className="hover:text-white">> Orthopedics</a></li>
                            <li><a href="#services" className="hover:text-white">> Laboratory</a></li>
                        </ul>
                    </div>
                     <div>
                        <h3 className="text-xl font-bold text-white mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><a href="#about" className="hover:text-white">> About Us</a></li>
                            <li><a href="#contact" className="hover:text-white">> Contact Us</a></li>
                            <li><a href="#services" className="hover:text-white">> Our Services</a></li>
                            <li><a href="#" className="hover:text-white">> Terms & Condition</a></li>
                            <li><a href="#" className="hover:text-white">> Support</a></li>
                            <li><a href="#admin" className="hover:text-white">> Admin Panel</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white mb-4">Newsletter</h3>
                        <p className="mb-4">Dolor amet sit justo amet elitr clita ipsum elitr est.</p>
                        <div className="flex">
                            <input type="email" placeholder="Your Email" className="p-3 rounded-l-md w-full bg-gray-700 border-0 text-white focus:ring-0" />
                            <button className="bg-brand-blue text-white font-semibold py-3 px-4 rounded-r-md hover:bg-opacity-90">Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-black bg-opacity-20 py-4">
                <div className="container mx-auto px-4 text-center md:flex md:justify-between">
                    <p>&copy; <a href="#home" className="text-brand-blue">Klinik</a>. All Rights Reserved.</p>
                    <p>Designed by <a href="https://htmlcodex.com" className="text-brand-blue">HTML Codex</a></p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
