import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import StartSection from '../components/StartSection';
import FeaturesChess from '../components/FeaturesChess';
import FeaturesGrid from '../components/FeaturesGrid';
import WorkGallery from '../components/WorkGallery';
import Stats from '../components/Stats';
import Pricing from '../components/Pricing';
import Testimonials from '../components/Testimonials';
import CtaFooter from '../components/CtaFooter';
import ContactModal from '../components/ContactModal';

export default function Landing() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState('');

  const openContactWithPackage = (pkgName = '') => {
    setSelectedPackage(pkgName);
    setIsModalOpen(true);
  };

  return (
    <div className="bg-black min-h-screen text-foreground">
      <div className="relative z-10 w-full overflow-hidden">
        <Navbar onOpenContact={() => openContactWithPackage()} />
        <Hero onOpenContact={() => openContactWithPackage()} />
        <div className="bg-black relative z-20">
          <StartSection onOpenContact={() => openContactWithPackage()} />
          <FeaturesChess />
          <FeaturesGrid />
          <WorkGallery />
          <Stats />
          <Pricing onSelectPackage={openContactWithPackage} />
          <Testimonials />
          <CtaFooter onOpenContact={() => openContactWithPackage()} />
        </div>
      </div>
      
      <ContactModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        initialMessage={selectedPackage ? `Đăng ký tư vấn gói dịch vụ: ${selectedPackage}.` : ''}
      />
    </div>
  );
}
