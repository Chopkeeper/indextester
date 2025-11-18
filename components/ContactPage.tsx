
import React from 'react';
import PageHeader from './PageHeader';
import { PhoneIcon, MailIcon, LocationIcon } from './Icons';

const ContactPage: React.FC = () => {
    return (
        <main>
            <PageHeader title="Contact Us" breadcrumb="Contact" />
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                         <h3 className="text-brand-blue font-semibold text-lg mb-2">CONTACT US</h3>
                         <h2 className="text-4xl font-bold text-brand-blue-dark">Contact For Any Query</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 text-center">
                        <div className="bg-brand-blue-light p-6 rounded-lg">
                            <LocationIcon className="w-12 h-12 text-brand-blue mx-auto mb-4"/>
                            <h3 className="text-xl font-bold text-brand-blue-dark">Our Office</h3>
                            <p className="text-brand-secondary">123 Street, New York, USA</p>
                        </div>
                        <div className="bg-brand-blue-light p-6 rounded-lg">
                            <MailIcon className="w-12 h-12 text-brand-blue mx-auto mb-4"/>
                            <h3 className="text-xl font-bold text-brand-blue-dark">Email Us</h3>
                            <p className="text-brand-secondary">info@example.com</p>
                        </div>
                        <div className="bg-brand-blue-light p-6 rounded-lg">
                            <PhoneIcon className="w-12 h-12 text-brand-blue mx-auto mb-4"/>
                            <h3 className="text-xl font-bold text-brand-blue-dark">Call Us</h3>
                            <p className="text-brand-secondary">+012 345 6789</p>
                        </div>
                    </div>
                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="bg-brand-blue-light p-8 rounded-lg">
                             <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <input type="text" placeholder="Your Name" className="p-3 border rounded-md w-full focus:ring-brand-blue focus:border-brand-blue" />
                                <input type="email" placeholder="Your Email" className="p-3 border rounded-md w-full focus:ring-brand-blue focus:border-brand-blue" />
                                <input type="text" placeholder="Subject" className="sm:col-span-2 p-3 border rounded-md w-full focus:ring-brand-blue focus:border-brand-blue" />
                                <textarea placeholder="Message" rows={5} className="sm:col-span-2 p-3 border rounded-md w-full focus:ring-brand-blue focus:border-brand-blue"></textarea>
                                <button type="submit" className="sm:col-span-2 bg-brand-blue text-white font-semibold py-3 px-8 rounded-md hover:bg-opacity-90 transition duration-300 w-full">Send Message</button>
                            </form>
                        </div>
                        <div>
                             <div className="w-full h-full min-h-[300px] bg-gray-200 rounded-lg flex items-center justify-center">
                                <p className="text-gray-500">Map Placeholder</p>
                             </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default ContactPage;
