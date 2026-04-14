import React from 'react';
import { motion } from 'motion/react';
import HlsVideo from './HlsVideo';

export default function StartSection({ onOpenContact }) {
  return (
    <section id="process" className="relative w-full min-h-[500px] flex items-center justify-center py-32 overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <HlsVideo 
          src="https://stream.mux.com/9JXDljEVWYwWu01PUkAemafDugK89o01BR6zqJ3aS9u00A.m3u8"
          className="w-full h-full object-cover opacity-60"
        />
      </div>

      {/* Gradients */}
      <div className="absolute top-0 w-full h-[200px] bg-gradient-to-b from-black to-transparent z-0 pointer-events-none" />
      <div className="absolute bottom-0 w-full h-[200px] bg-gradient-to-t from-black to-transparent z-0 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-3xl mx-auto">
        <div className="liquid-glass rounded-full px-3.5 py-1 mb-8">
          <span className="text-xs font-medium text-white font-body tracking-wide uppercase">
            Cách Hoạt Động
          </span>
        </div>

        <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading italic text-white tracking-tight leading-[0.9] mb-6">
          Bạn đưa ý tưởng.<br/>Chúng tôi hiện thực hóa.
        </h2>

        <p className="text-white/60 font-body font-light text-sm md:text-base max-w-xl mx-auto mb-10 leading-relaxed">
          Hãy chia sẻ tầm nhìn của bạn. AI của chúng tôi sẽ lo phần còn lại—từ phác thảo, thiết kế, lập trình, cho đến khi ra mắt. Tất cả chỉ mất vài ngày, không phải vài tháng học hỏi.
        </p>

        <button onClick={onOpenContact} className="liquid-glass-strong rounded-full px-6 py-3 text-white font-medium text-sm transition-transform hover:scale-105">
          Bắt Đầu Ngay
        </button>
      </div>
    </section>
  );
}
