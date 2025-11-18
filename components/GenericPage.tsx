
import React from 'react';
import PageHeader from './PageHeader';
import WhyChooseUs from './WhyChooseUs';
import Testimonial from './Testimonial';

const GenericPage: React.FC = () => {
  return (
    <main>
      <PageHeader title="Our Pages" breadcrumb="Pages" />
       <div className="container mx-auto px-4 py-16">
          <div className="text-center">
              <h2 className="text-3xl font-bold text-brand-blue-dark mb-4">Explore More</h2>
              <p className="text-brand-secondary max-w-2xl mx-auto">
                  This is a placeholder page. You can add more specific content here, such as a blog, a gallery, or other custom pages. For now, here are some of our key sections.
              </p>
          </div>
      </div>
      <WhyChooseUs/>
      <Testimonial/>
    </main>
  );
};

export default GenericPage;
