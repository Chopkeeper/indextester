
import React from 'react';
import PageHeader from './PageHeader';
import Services from './Services';
import Appointment from './Appointment';
import Testimonial from './Testimonial';

const ServicesPage: React.FC = () => {
  return (
    <main>
      <PageHeader title="Services" breadcrumb="Services" />
      <Services />
      <Appointment />
      <Testimonial />
    </main>
  );
};

export default ServicesPage;
