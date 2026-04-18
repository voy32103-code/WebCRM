import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowUpRight, LogOut, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import MyDesignsModal from './MyDesignsModal';

export default function Navbar({ onOpenContact }) {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMyDesignsOpen, setIsMyDesignsOpen] = useState(false);
  const { isAuthenticated, currentUser, logout } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

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
          {!isAuthenticated ? (
            <>
              <Link to="/login" className="hidden md:flex text-sm font-medium text-white/80 hover:text-white transition-colors">
                Đăng Nhập
              </Link>
              <Link to="/register" className="hidden md:flex liquid-glass border border-white/20 rounded-full px-4 py-2 text-sm font-medium text-white hover:bg-white/10 transition-colors">
                Đăng Ký
              </Link>
            </>
          ) : (
            <div className="hidden md:flex items-center gap-4">
              <span className="text-sm font-medium text-white/80 flex items-center gap-2">
                <User className="w-4 h-4" /> {currentUser?.email?.split('@')[0]}
              </span>
              <button onClick={handleLogout} className="text-sm font-medium text-red-400 hover:text-red-300 transition-colors flex items-center gap-1">
                Thoát
              </button>
              {currentUser?.role === 'admin' ? (
                <Link to="/dashboard" className="liquid-glass border border-white/20 rounded-full px-4 py-2 text-sm font-medium text-white hover:bg-white/10 transition-colors">
                  Vào Dashboard
                </Link>
              ) : (
                <button onClick={() => setIsMyDesignsOpen(true)} className="liquid-glass border border-white/20 rounded-full px-4 py-2 text-sm font-medium text-white hover:bg-white/10 transition-colors">
                  Dự Án Của Tôi
                </button>
              )}
            </div>
          )}

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

            <div className="flex gap-4 mt-4">
              {!isAuthenticated ? (
                <>
                  <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="px-6 py-2 text-lg font-medium text-white/80 hover:text-white transition-colors">
                    Đăng Nhập
                  </Link>
                  <Link to="/register" onClick={() => setIsMobileMenuOpen(false)} className="px-6 py-2 text-lg font-medium text-white border border-white/20 rounded-full hover:bg-white/10 transition-colors">
                    Đăng Ký
                  </Link>
                </>
              ) : (
                <div className="flex flex-col items-center gap-4">
                  <span className="text-lg text-white/80"><User className="w-5 h-5 inline mr-2" /> {currentUser?.email}</span>
                  {currentUser?.role === 'admin' ? (
                    <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="px-6 py-2 text-lg font-medium text-white border border-white/20 rounded-full hover:bg-white/10 transition-colors">
                      Vào Dashboard
                    </Link>
                  ) : (
                    <button onClick={() => { setIsMobileMenuOpen(false); setIsMyDesignsOpen(true); }} className="px-6 py-2 text-lg font-medium text-white border border-white/20 rounded-full hover:bg-white/10 transition-colors">
                      ✨ Dự Án Của Tôi
                    </button>
                  )}
                  <button onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }} className="text-red-400">Thoát</button>
                </div>
              )}
            </div>
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

      {/* Modal hiện Dự án của tôi */}
      <MyDesignsModal isOpen={isMyDesignsOpen} onClose={() => setIsMyDesignsOpen(false)} />
    </>
  );
}
