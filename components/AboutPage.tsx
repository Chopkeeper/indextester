
import React from 'react';
import PageHeader from './PageHeader';
import About from './About';
import WhyChooseUs from './WhyChooseUs';
import Doctors from './Doctors';

const AboutPage: React.FC = () => {
  return (
    <main>
      <PageHeader title="About Us" breadcrumb="About" />
      <About />
      <WhyChooseUs />
      <Doctors />
    </main>
  );
};

export default AboutPage;
