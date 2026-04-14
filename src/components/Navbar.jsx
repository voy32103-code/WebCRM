import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Navbar({ onOpenContact }) {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-4 left-0 right-0 z-[60] px-8 lg:px-16 py-3 flex items-center justify-between transition-all duration-300 ${scrolled ? 'top-0 py-4 bg-black/50 backdrop-blur-md' : ''}`}
      >
        {/* Logo */}
        <a href="#" className="h-12 w-12 rounded-full overflow-hidden flex items-center justify-center liquid-glass group hover:scale-105 transition-transform z-10">
          <div className="w-4 h-4 bg-white rounded-full group-hover:scale-75 transition-transform duration-300"></div>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center absolute left-1/2 -translate-x-1/2 liquid-glass rounded-full p-1.5 z-10">
          <a href="#services" className="px-5 py-2 text-sm font-medium text-foreground/90 font-body hover:text-white transition-colors">Dịch Vụ</a>
          <a href="#work" className="px-5 py-2 text-sm font-medium text-foreground/90 font-body hover:text-white transition-colors">Dự Án</a>
          <a href="#process" className="px-5 py-2 text-sm font-medium text-foreground/90 font-body hover:text-white transition-colors">Quy Trình</a>
          <a href="#pricing-section" className="px-5 py-2 text-sm font-medium text-foreground/90 font-body hover:text-white transition-colors">Bảng Giá</a>
        </div>

        {/* CTAs & Mobile Toggle */}
        <div className="flex items-center gap-3 z-10">
          <button onClick={onOpenContact} className="hidden md:flex bg-white text-black rounded-full px-5 py-2.5 text-sm font-medium font-body items-center gap-1.5 hover:bg-white/90 transition-colors">
            Bắt Đầu
            <ArrowUpRight className="w-4 h-4" />
          </button>
          
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden liquid-glass rounded-full px-4 py-2 text-sm font-medium text-white flex items-center gap-2"
          >
            {isMobileMenuOpen ? 'Đóng' : 'Menu'}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: '-100%' }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: '-100%' }}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center px-6"
        >
          <div className="flex flex-col items-center gap-8 w-full">
            <a href="#services" onClick={() => setIsMobileMenuOpen(false)} className="text-4xl font-heading italic text-white hover:text-white/70 transition-colors">Dịch Vụ</a>
            <a href="#work" onClick={() => setIsMobileMenuOpen(false)} className="text-4xl font-heading italic text-white hover:text-white/70 transition-colors">Dự Án</a>
            <a href="#process" onClick={() => setIsMobileMenuOpen(false)} className="text-4xl font-heading italic text-white hover:text-white/70 transition-colors">Quy Trình</a>
            <a href="#pricing-section" onClick={() => setIsMobileMenuOpen(false)} className="text-4xl font-heading italic text-white hover:text-white/70 transition-colors">Bảng Giá</a>
            
            <button 
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenContact();
              }}
              className="mt-8 liquid-glass hover:bg-white hover:text-black rounded-full px-8 py-4 text-xl font-medium transition-all"
            >
              Bắt Đầu Dự Án
            </button>
          </div>
        </motion.div>
      )}
    </>
  );
}
