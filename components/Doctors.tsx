
import React from 'react';

const doctors = [
    { name: 'Doctor Name', department: 'Cardiology', image: 'https://picsum.photos/400/500?random=5' },
    { name: 'Doctor Name', department: 'Pulmonary', image: 'https://picsum.photos/400/500?random=6' },
    { name: 'Doctor Name', department: 'Neurology', image: 'https://picsum.photos/400/500?random=7' },
    { name: 'Doctor Name', department: 'Orthopedics', image: 'https://picsum.photos/400/500?random=8' },
];

const DoctorProfile: React.FC<{ name: string; department: string; image: string; }> = ({ name, department, image }) => {
    return (
        <div className="text-center bg-brand-blue-light rounded-lg overflow-hidden group">
            <div className="overflow-hidden">
                <img src={image} alt={name} className="w-full h-auto transform group-hover:scale-110 transition duration-500" />
            </div>
            <div className="p-6">
                <h3 className="text-xl font-bold text-brand-blue-dark">{name}</h3>
                <p className="text-brand-secondary">{department}</p>
            </div>
        </div>
    );
};

const Doctors: React.FC = () => {
    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4 text-center">
                <h3 className="text-brand-blue font-semibold text-lg mb-2">OUR DOCTORS</h3>
                <h2 className="text-4xl font-bold text-brand-blue-dark mb-12">Our Experience Doctors</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {doctors.map((doctor, index) => (
                        <DoctorProfile key={index} {...doctor} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Doctors;
