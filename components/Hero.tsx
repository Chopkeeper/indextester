
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="container mx-auto px-4 py-8 md:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="bg-brand-blue text-white p-8 md:p-12 rounded-lg">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">Good Health Is The Root Of All Happiness</h1>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-4xl font-bold">123</p>
              <p className="text-lg">Expert Doctors</p>
            </div>
            <div className="border-t-2 sm:border-t-0 sm:border-l-2 sm:border-r-2 border-white border-opacity-30 py-4 sm:py-0 px-4">
              <p className="text-4xl font-bold">1234</p>
              <p className="text-lg">Medical Staff</p>
            </div>
            <div>
              <p className="text-4xl font-bold">12345</p>
              <p className="text-lg">Total Patients</p>
            </div>
          </div>
        </div>
        <div className="relative h-64 md:h-96 lg:h-full min-h-[300px] rounded-lg overflow-hidden">
          <img
            src="https://picsum.photos/800/600?random=1"
            alt="Doctors"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
            <h2 className="text-white text-5xl font-bold">Cardiology</h2>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
