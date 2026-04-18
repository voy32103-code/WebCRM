import React, { useState } from 'react';
import { motion } from 'motion/react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import StartSection from '../components/StartSection';
import FeaturesChess from '../components/FeaturesChess';
import FeaturesGrid from '../components/FeaturesGrid';
import CRMAutomation from '../components/CRMAutomation';
import CRMDashboardFeature from '../components/CRMDashboardFeature';
import CRMWorkflowFeature from '../components/CRMWorkflowFeature';
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
          
          {/* TRANSITION HEADER - ENTERPRISE ECOSYSTEM */}
          <div className="w-full pt-32 pb-16 flex flex-col items-center justify-center relative overflow-hidden bg-black z-30">
             <div className="absolute inset-0 bg-gradient-to-b from-black via-indigo-950/10 to-black pointer-events-none" />
             <div className="max-w-4xl mx-auto px-4 md:px-6 text-center relative z-10">
                 <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                 >
                     <div className="liquid-glass rounded-full px-4 py-1.5 inline-block mb-8 border border-indigo-500/30">
                        <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent text-sm font-bold uppercase tracking-widest">
                           Enterprise CRM OS
                        </span>
                     </div>
                     <h2 className="text-4xl md:text-5xl lg:text-7xl font-heading italic text-white leading-[1.1] mb-8">
                        Không chỉ dừng lại ở giao diện.<br/>
                        <span className="bg-gradient-to-r from-indigo-300 via-white to-purple-300 bg-clip-text text-transparent">Tự động hoá cả doanh nghiệp.</span>
                     </h2>
                     <p className="text-white/50 text-base md:text-lg max-w-2xl mx-auto font-body font-light leading-relaxed">
                        Chấm dứt việc trả tiền cho hàng chục phần mềm rời rạc. Một hệ thống Quản trị (CRM) mạnh mẽ được chúng tôi may đo trực tiếp vào Landing Page của bạn để hứng trọn luồng khách hàng khổng lồ mỗi ngày.
                     </p>
                 </motion.div>
             </div>
          </div>

          <div className="flex flex-col gap-24 lg:gap-40 pb-32 relative z-20 bg-black pt-16">
             <CRMAutomation />
             <CRMDashboardFeature />
             <CRMWorkflowFeature />
          </div>

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
