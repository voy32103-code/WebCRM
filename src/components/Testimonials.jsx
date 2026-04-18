import React from 'react';
import { motion } from 'motion/react';

const testimonials = [
  {
    quote: "Làm lại toàn bộ chỉ trong 5 ngày. Kết quả vượt xa những gì chúng tôi chắp vá nhiều tháng liền trước đây.",
    name: "Sarah Chen",
    role: "CEO, Luminary"
  },
  {
    quote: "Chuyển đổi tăng 4 lần. Không phải sai sót đâu. Bản thiết kế vận hành hoàn toàn khác khi nó xây dựng bằng công nghệ phân tích người dùng.",
    name: "Marcus Webb",
    role: "Trưởng phòng Tăng trưởng, Arcline"
  },
  {
    quote: "Họ không chỉ thiết kế web. Họ kiến tạo luôn quy trình chuyển đổi thương hiệu. Phải ở đẳng cấp vũ khí công nghệ mới diễn tả nổi.",
    name: "Elena Voss",
    role: "Giám đốc Thương hiệu, Helix"
  }
];

export default function Testimonials() {
  return (
    <section className="relative w-full py-32 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        <div className="liquid-glass rounded-full px-3.5 py-1 mb-8">
          <span className="text-xs font-medium text-white font-body tracking-wide uppercase">
            Khách Hàng Đánh Giá
          </span>
        </div>
        
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading italic text-white tracking-tight leading-[0.9] mb-16 text-center max-w-2xl">
          Đừng chỉ nghe chúng tôi nói.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {testimonials.map((item, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
              viewport={{ once: true, margin: "-50px" }}
              style={{ willChange: "transform, opacity" }}
              className="liquid-glass rounded-2xl p-8 flex flex-col justify-between min-h-[220px]"
            >
              <p className="text-white/80 font-body font-light text-base md:text-lg italic leading-relaxed mb-8">
                "{item.quote}"
              </p>
              <div>
                <p className="text-white font-body font-medium text-sm">
                  {item.name}
                </p>
                <p className="text-white/50 font-body font-light text-xs mt-1">
                  {item.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
