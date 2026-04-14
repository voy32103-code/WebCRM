import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Play } from 'lucide-react';
import BlurText from './BlurText';

export default function Hero({ onOpenContact }) {
  return (
    <section className="relative overflow-visible h-[1000px] w-full flex flex-col items-center justify-start pt-[150px]">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute left-0 w-full h-auto object-contain mix-blend-screen opacity-80"
        style={{ top: '20%', zIndex: 0 }}
      >
        <source 
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4" 
          type="video/mp4" 
        />
      </video>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/5 z-0 pointer-events-none" />

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 w-full h-[300px] bg-gradient-to-b from-transparent to-black z-0 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-4xl mx-auto w-full">
        
        {/* Badge Pill */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="liquid-glass rounded-full px-1 py-1 flex items-center gap-3 mb-8"
        >
          <span className="bg-white text-black rounded-full px-3 py-1 text-xs font-semibold">
            Mới
          </span>
          <span className="text-white/80 text-sm pr-3">
            Giới thiệu thiết kế web dùng AI.
          </span>
        </motion.div>

        {/* Heading */}
        <BlurText 
          text="Website Xứng Tầm" 
          className="text-6xl md:text-7xl lg:text-[5.5rem] font-heading italic text-foreground leading-[0.8] tracking-[-4px]"
          delay={100}
        />
        <BlurText 
          text="Với Thương Hiệu Của Bạn" 
          className="text-5xl md:text-6xl lg:text-[5rem] font-heading italic text-foreground leading-[0.8] tracking-[-4px] mt-4"
          delay={300}
        />

        {/* Subtext */}
        <motion.p
          initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
          animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-8 text-sm md:text-base text-white/70 font-body font-light leading-relaxed max-w-lg"
        >
          Thiết kế tuyệt mỹ. Hiệu suất mượt mà. Được thiết kế bởi AI, hoàn thiện bởi chuyên gia. Trải nghiệm thiết kế web hoàn toàn mới.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
          animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-6"
        >
          <button onClick={onOpenContact} className="liquid-glass-strong rounded-full px-5 py-2.5 flex items-center gap-2 text-white font-medium">
            Bắt Đầu Ngay
            <ArrowUpRight className="w-4 h-4" />
          </button>
          <button className="group flex items-center gap-2 text-white/80 hover:text-white transition-colors">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
              <Play className="w-3.5 h-3.5 fill-current" />
            </div>
            <span className="text-sm font-medium">Xem Video</span>
          </button>
        </motion.div>
      </div>

    </section>
  );
}
