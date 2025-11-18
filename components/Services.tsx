
import React from 'react';
import { HeartIcon, LungsIcon, BrainIcon, BoneIcon, ToothIcon, MicroscopeIcon, PlusIcon } from './Icons';

const services = [
    { title: 'Cardiology', icon: <HeartIcon className="w-8 h-8" />, description: 'Erat ipsum justo amet duo et elitr dolor, est duo duo eos lorem sed diam stet.' },
    { title: 'Pulmonary', icon: <LungsIcon className="w-8 h-8" />, description: 'Erat ipsum justo amet duo et elitr dolor, est duo duo eos lorem sed diam stet.' },
    { title: 'Neurology', icon: <BrainIcon className="w-8 h-8" />, description: 'Erat ipsum justo amet duo et elitr dolor, est duo duo eos lorem sed diam stet.' },
    { title: 'Orthopedics', icon: <BoneIcon className="w-8 h-8" />, description: 'Erat ipsum justo amet duo et elitr dolor, est duo duo eos lorem sed diam stet.' },
    { title: 'Dental Surgery', icon: <ToothIcon className="w-8 h-8" />, description: 'Erat ipsum justo amet duo et elitr dolor, est duo duo eos lorem sed diam stet.' },
    { title: 'Laboratory', icon: <MicroscopeIcon className="w-8 h-8" />, description: 'Erat ipsum justo amet duo et elitr dolor, est duo duo eos lorem sed diam stet.' },
];

const ServiceCard: React.FC<{ title: string; icon: React.ReactNode; description: string }> = ({ title, icon, description }) => {
    return (
        <div className="bg-brand-blue-light p-8 rounded-lg text-center group hover:bg-brand-blue transition duration-300">
            <div className="text-brand-blue group-hover:text-white inline-block mb-4">
                {icon}
            </div>
            <h3 className="text-xl font-bold text-brand-blue-dark group-hover:text-white mb-3">{title}</h3>
            <p className="text-brand-secondary group-hover:text-white mb-4">{description}</p>
            <a href="#" className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white text-brand-blue group-hover:bg-brand-blue-dark group-hover:text-white transition duration-300">
                <PlusIcon className="w-6 h-6" />
            </a>
        </div>
    );
};

const Services: React.FC = () => {
    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4 text-center">
                <h3 className="text-brand-blue font-semibold text-lg mb-2">SERVICES</h3>
                <h2 className="text-4xl font-bold text-brand-blue-dark mb-12">Health Care Solutions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <ServiceCard key={index} {...service} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
