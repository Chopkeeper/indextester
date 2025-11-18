
import React from 'react';
import { StethoscopeIcon, CheckCircleIcon, UserGroupIcon, PhoneIcon } from './Icons';

const features = [
    { title: 'Experience Doctors', icon: <StethoscopeIcon className="w-8 h-8 text-brand-blue" /> },
    { title: 'Best Services', icon: <CheckCircleIcon className="w-8 h-8 text-brand-blue" /> },
    { title: 'Free Consultation', icon: <UserGroupIcon className="w-8 h-8 text-brand-blue" /> },
    { title: '24/7 Support', icon: <PhoneIcon className="w-8 h-8 text-brand-blue" /> },
];

const WhyChooseUs: React.FC = () => {
    return (
        <section className="py-16 bg-brand-blue-light">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div className="bg-brand-blue p-8 md:p-12 text-white rounded-lg">
                        <h3 className="font-semibold text-lg mb-2 opacity-80">WHY CHOOSE US</h3>
                        <h2 className="text-4xl font-bold mb-4">Why Choose Us</h2>
                        <p className="mb-8 opacity-90">
                            Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo magna dolore erat amet.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {features.map((feature, index) => (
                                <div key={index} className="flex items-center space-x-4">
                                    <div className="bg-white p-3 rounded-full">{feature.icon}</div>
                                    <span className="text-lg font-semibold">{feature.title}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <img src="https://picsum.photos/600/500?random=4" alt="Medical team" className="w-full h-auto object-cover rounded-lg shadow-lg" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
