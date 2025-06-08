import React from 'react';
import HowItWorksPage from '../components/HowItWorks';
import PayoutSection from '../components/ClientStories';
import ProcessPage from '../components/ProcessPage';
import WhyUsSection from '../components/WhyUs';
import Title from '../components/Title';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <>
      {/* Title Section */}
      <Title/>

      {/* Why Us Section */}
      <WhyUsSection/>

      {/* How It Works */}
      <HowItWorksPage />

      {/* Client Stories */}
      <PayoutSection />

      {/* Process */}
      <ProcessPage />

      {/* Footer Section */}
      <Footer/>
    </>
  );
};

export default Home;
