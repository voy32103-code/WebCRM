import React from 'react';
import { Zap, Palette, BarChart3, Shield } from 'lucide-react';
import { motion } from 'motion/react';

const features = [
  {
    icon: Zap,
    title: "Tính bằng Ngày, Không phải Tháng",
    description: "Đẩy nhanh lên sóng dự án với tốc độ định nghĩa lại sự thần tốc. Bởi chờ đợi chẳng phải là một chiến lược."
  },
  {
    icon: Palette,
    title: "Trau chuốt đến Ám ảnh",
    description: "Mọi chi tiết được cân nhắc cẩn thận. Từng yếu tố được tinh chỉnh. Thiết kế chính xác đến mức hoàn hảo."
  },
  {
    icon: BarChart3,
    title: "Tạo ra để Bước nhảy vọt Chuyển đổi",
    description: "Bố cục dựa trên nghiên cứu dữ liệu thực. Mọi quyết định được hậu thuẫn bởi hiệu suất và thực thi. Chuyển đổi đo lường dễ dàng."
  },
  {
    icon: Shield,
    title: "An toàn Mặc định",
    description: "Bảo vệ tài khoản cấp độ chuẩn doanh nghiệp số. SSL, chống tấn công DDoS, tuân thủ dữ liệu."
  }
];

export default function FeaturesGrid() {
  return (
    <section className="relative w-full py-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        <div className="liquid-glass rounded-full px-3.5 py-1 mb-8">
          <span className="text-xs font-medium text-white font-body tracking-wide uppercase">
            Vì sao chọn chúng tôi
          </span>
        </div>
        
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading italic text-white tracking-tight leading-[0.9] mb-16 text-center">
          Sự khác biệt là tất cả.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
                viewport={{ once: true }}
                className="liquid-glass group rounded-2xl p-6 flex flex-col items-start hover:bg-white/[0.05] hover:border-white/20 transition-colors cursor-default border border-transparent"
              >
                <div className="liquid-glass-strong rounded-full w-10 h-10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-white transition-all duration-300 shadow-[0_0_0_rgba(255,255,255,0)] group-hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]">
                  <Icon className="w-5 h-5 text-white group-hover:text-black transition-colors" />
                </div>
                <h3 className="text-xl font-heading italic text-white mb-3 group-hover:text-glow transition-colors">
                  {feature.title}
                </h3>
                <p className="text-white/60 font-body font-light text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
