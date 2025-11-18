
import React from 'react';
import { CheckCircleIcon } from './Icons';

const About: React.FC = () => {
    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="relative h-80 lg:h-full">
                        <img src="https://picsum.photos/500/350?random=2" alt="Doctor with patient" className="absolute top-0 left-0 w-3/4 h-3/4 object-cover rounded-lg shadow-lg" />
                        <img src="https://picsum.photos/300/400?random=3" alt="Smiling doctor" className="absolute bottom-0 right-0 w-1/2 h-1/2 object-cover rounded-lg shadow-2xl border-4 border-white" />
                    </div>
                    <div>
                        <h3 className="text-brand-blue font-semibold text-lg mb-2">ABOUT US</h3>
                        <h2 className="text-4xl font-bold text-brand-blue-dark mb-4">Why You Should Trust Us? Get To Know About Us!</h2>
                        <p className="text-brand-secondary mb-6">
                            Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo magna dolore erat amet.
                        </p>
                        <ul className="space-y-3 mb-8">
                            <li className="flex items-center">
                                <CheckCircleIcon className="w-6 h-6 text-brand-blue mr-3" />
                                <span className="text-brand-blue-dark">Quality Health Care</span>
                            </li>
                            <li className="flex items-center">
                                <CheckCircleIcon className="w-6 h-6 text-brand-blue mr-3" />
                                <span className="text-brand-blue-dark">Only Qualified Doctors</span>
                            </li>
                            <li className="flex items-center">
                                <CheckCircleIcon className="w-6 h-6 text-brand-blue mr-3" />
                                <span className="text-brand-blue-dark">Medical Research Professionals</span>
                            </li>
                        </ul>
                        <a href="#" className="bg-brand-blue text-white font-semibold py-3 px-8 rounded-md hover:bg-opacity-90 transition duration-300">Read More</a>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default About;
