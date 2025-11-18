import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import WhyChooseUs from './components/WhyChooseUs';
import Doctors from './components/Doctors';
import Appointment from './components/Appointment';
import Testimonial from './components/Testimonial';
import Footer from './components/Footer';
import Admin from './components/Admin';
import NewsTicker from './components/NewsTicker';
import AboutPage from './components/AboutPage';
import ServicesPage from './components/ServicesPage';
import ContactPage from './components/ContactPage';
import GenericPage from './components/GenericPage';
import ItaPage from './components/ItaPage';

const App: React.FC = () => {
  const getRoute = () => window.location.hash || '#home';
  const [route, setRoute] = useState(getRoute());

  useEffect(() => {
    const handleHashChange = () => {
        setRoute(getRoute());
        window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', handleHashChange, false);

    return () => {
      window.removeEventListener('hashchange', handleHashChange, false);
    };
  }, []);

  const renderPage = () => {
    switch (route) {
      case '#admin':
        return <Admin />;
      case '#about':
        return <AboutPage />;
      case '#services':
        return <ServicesPage />;
       case '#pages':
        return <GenericPage />;
      case '#contact':
        return <ContactPage />;
      case '#ita':
        return <ItaPage />;
      case '#home':
      default:
        return (
          <main>
            <Hero />
            <About />
            <Services />
            <WhyChooseUs />
            <Doctors />
            <Appointment />
            <Testimonial />
          </main>
        );
    }
  };

  if (route === '#admin') {
    return <Admin />;
  }

  return (
    <div className="bg-white font-sans">
      <NewsTicker />
      <Header />
      {renderPage()}
      <Footer />
    </div>
  );
};

export default App;
