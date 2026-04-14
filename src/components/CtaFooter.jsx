import React from 'react';
import HlsVideo from './HlsVideo';

export default function CtaFooter({ onOpenContact }) {
  return (
    <section id="pricing" className="relative w-full min-h-[700px] flex flex-col items-center justify-end overflow-hidden pt-32 px-6">
      {/* Background Video */}
      <div className="absolute inset-0 z-0 opacity-50">
        <HlsVideo 
          src="https://stream.mux.com/8wrHPCX2dC3msyYU9ObwqNdm00u3ViXvOSHUMRYSEe5Q.m3u8"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Gradients */}
      <div className="absolute top-0 w-full h-[200px] bg-gradient-to-b from-black to-transparent z-0 pointer-events-none" />
      <div className="absolute bottom-0 w-full h-[200px] bg-gradient-to-t from-black to-transparent z-0 pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto w-full mb-32">
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-heading italic text-white tracking-tight leading-[0.85] mb-6">
          Trang web tiếp theo của bạn<br/>Bắt đầu từ đây.
        </h2>
        
        <p className="text-white/70 font-body font-light text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
          Đặt một cuộc gọi chiến lược miễn phí. Trải nghiệm giải pháp thiết kế với sức mạnh của AI. Không bắt buộc, không áp lực. Toàn quyền đột phá doanh thu.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <button onClick={onOpenContact} className="liquid-glass-strong rounded-full px-8 py-3 text-white font-medium text-sm whitespace-nowrap transition-transform hover:scale-105">
            Đặt Lịch Gọi
          </button>
          <button className="bg-white text-black rounded-full px-8 py-3 font-medium text-sm whitespace-nowrap transition-colors hover:bg-white/90">
            Xem Bảng Giá
          </button>
        </div>
      </div>

      {/* Footer Bar */}
      <div className="relative z-10 w-full max-w-7xl mx-auto mt-auto pt-8 pb-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-white/40 font-body text-xs">
          © 2026 Studio. Đã đăng ký bản quyền.
        </p>
        <div className="flex items-center gap-6">
          <a href="#" className="text-white/40 font-body text-xs hover:text-white/80 transition-colors">Bảo mật</a>
          <a href="#" className="text-white/40 font-body text-xs hover:text-white/80 transition-colors">Điều khoản</a>
          <a href="#" className="text-white/40 font-body text-xs hover:text-white/80 transition-colors">Liên hệ</a>
        </div>
      </div>
    </section>
  );
}
