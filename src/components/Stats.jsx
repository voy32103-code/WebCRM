import React from 'react';
import HlsVideo from './HlsVideo';

const stats = [
  { value: "200+", label: "Website ra mắt" },
  { value: "98%", label: "Mức độ hài lòng" },
  { value: "3.2x", label: "Tăng trưởng chuyển đổi" },
  { value: "5 ngày", label: "Trung bình bàn giao" }
];

export default function Stats() {
  return (
    <section className="relative w-full min-h-[600px] flex items-center justify-center py-32 px-6 md:px-12 overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0 opacity-40">
        <HlsVideo 
          src="https://stream.mux.com/NcU3HlHeF7CUL86azTTzpy3Tlb00d6iF3BmCdFslMJYM.m3u8"
          saturated={false}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Gradients */}
      <div className="absolute top-0 w-full h-[200px] bg-gradient-to-b from-black to-transparent z-0 pointer-events-none" />
      <div className="absolute bottom-0 w-full h-[200px] bg-gradient-to-t from-black to-transparent z-0 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto">
        <div className="liquid-glass rounded-3xl p-12 md:p-16 border border-white/10 shadow-2xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <span className="text-4xl md:text-5xl lg:text-6xl font-heading italic text-white mb-2">
                  {stat.value}
                </span>
                <span className="text-white/60 font-body font-light text-sm uppercase tracking-wider">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
