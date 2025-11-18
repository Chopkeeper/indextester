
import React from 'react';

const Testimonial: React.FC = () => {
    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4 text-center">
                <h3 className="text-brand-blue font-semibold text-lg mb-2">TESTIMONIAL</h3>
                <h2 className="text-4xl font-bold text-brand-blue-dark mb-12">What Say Our Patients!</h2>
                <div className="max-w-3xl mx-auto">
                    <div className="bg-brand-blue text-white p-8 rounded-lg relative">
                        <img src="https://picsum.photos/100/100?random=9" alt="Patient" className="w-24 h-24 rounded-full mx-auto -mt-20 mb-6 border-4 border-white shadow-lg" />
                        <p className="text-lg italic mb-6">
                            "Dolor et eos labore, stet justo sed est sed. Diam sed sed dolor stet amet eirmod eos labore diam. Magna elitr accusam sed sanctus et at clita ea lorem."
                        </p>
                        <h4 className="font-bold text-xl">Patient Name</h4>
                        <p className="opacity-80">Profession</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonial;
