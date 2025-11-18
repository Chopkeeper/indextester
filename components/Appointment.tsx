
import React from 'react';
import { PhoneIcon, MailIcon } from './Icons';

const Appointment: React.FC = () => {
    return (
        <section className="py-16 bg-brand-blue-light">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                     <h3 className="text-brand-blue font-semibold text-lg mb-2">APPOINTMENT</h3>
                     <h2 className="text-4xl font-bold text-brand-blue-dark">Make An Appointment To Visit Our Doctor</h2>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    <div className="space-y-6">
                         <p className="text-brand-secondary">
                           Eirmod sed tempor lorem ut dolores. Aliquyam sit sadipscing kasd ipsum. Dolor ea et dolore et at sea ea at dolor, justo ipsum duo rebum sea invidunt voluptua. Eos vero eos vero ea et dolore eirmod et. Dolores diam duo invidunt lorem. Elitr ut dolores magna sit. Sea dolore sanctus sed et. Takimata takimata sanctus sed.
                        </p>
                        <div className="flex items-center space-x-4 p-4 bg-white rounded-lg">
                            <PhoneIcon className="w-8 h-8 text-brand-blue" />
                            <div>
                                <h4 className="font-semibold text-brand-blue-dark">Call Us Now</h4>
                                <p className="text-brand-secondary">+012 345 6789</p>
                            </div>
                        </div>
                         <div className="flex items-center space-x-4 p-4 bg-white rounded-lg">
                            <MailIcon className="w-8 h-8 text-brand-blue" />
                            <div>
                                <h4 className="font-semibold text-brand-blue-dark">Mail Us Now</h4>
                                <p className="text-brand-secondary">info@example.com</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-8 rounded-lg shadow-md">
                        <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <input type="text" placeholder="Your Name" className="p-3 border rounded-md w-full focus:ring-brand-blue focus:border-brand-blue" />
                            <input type="email" placeholder="Your Email" className="p-3 border rounded-md w-full focus:ring-brand-blue focus:border-brand-blue" />
                            <input type="date" className="p-3 border rounded-md w-full text-gray-500 focus:ring-brand-blue focus:border-brand-blue" />
                            <select className="p-3 border rounded-md w-full text-gray-500 focus:ring-brand-blue focus:border-brand-blue">
                                <option>Choose Service</option>
                                <option>Cardiology</option>
                                <option>Pulmonary</option>
                                <option>Neurology</option>
                            </select>
                            <textarea placeholder="Your Message" rows={5} className="sm:col-span-2 p-3 border rounded-md w-full focus:ring-brand-blue focus:border-brand-blue"></textarea>
                            <button type="submit" className="sm:col-span-2 bg-brand-blue text-white font-semibold py-3 px-8 rounded-md hover:bg-opacity-90 transition duration-300 w-full">Book Appointment</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Appointment;
