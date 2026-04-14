import React from 'react';
import { motion } from 'motion/react';
import { Check } from 'lucide-react';

const plans = [
  {
    name: "Khởi Đầu",
    price: "1,500$",
    description: "Website thông tin tối giản, thiết kế thanh lịch.",
    features: [
      "Tối ưu UI/UX cơ bản",
      "Giao diện chuẩn Mobile",
      "Tốc độ tải trang siêu tốc",
      "Hỗ trợ SEO cơ bản"
    ],
    popular: false
  },
  {
    name: "Tăng Trưởng",
    price: "3,500$",
    description: "Giải pháp toàn diện với kho ứng dụng tuỳ chỉnh.",
    features: [
      "Tất cả các tính năng mục Khởi Đầu",
      "Thiết kế 3D / Animation mượt",
      "Tích hợp hệ thống quản trị nội dung (CMS)",
      "Bảo mật nâng cao"
    ],
    popular: true
  },
  {
    name: "Doanh Nghiệp",
    price: "Tùy Chọn",
    description: "Cấu trúc hạ tầng cao cấp với cam kết chỉ tiêu KPI.",
    features: [
      "Tất cả các tính năng mục Tăng Trưởng",
      "Thiết kế nền tảng Web App",
      "Báo cáo phân tích hiệu suất chuyên sâu",
      "Uptime SLA 99.99%"
    ],
    popular: false
  }
];

export default function Pricing({ onSelectPackage }) {
  return (
    <section id="pricing-section" className="relative w-full py-32 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        <div className="liquid-glass rounded-full px-3.5 py-1 mb-8">
          <span className="text-xs font-medium text-white font-body tracking-wide uppercase">
            Bảng Giá
          </span>
        </div>
        
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading italic text-white tracking-tight leading-[0.9] mb-16 text-center">
          Quản trị chi phí.<br/>Không giới hạn tầm nhìn.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl mx-auto">
          {plans.map((plan, index) => {
            const isEnterprise = plan.name === "Doanh Nghiệp";
            
            return (
              <motion.div 
                key={index}
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex-1 w-full h-full"
              >
                <div className={`relative liquid-glass rounded-3xl p-8 flex flex-col h-full transition-all duration-300 ${!isEnterprise && 'hover:-translate-y-2'} ${plan.popular ? 'border-primary/50 scale-100 md:scale-105 z-10 shadow-2xl shadow-primary/20 bg-white/10 hover:shadow-primary/40' : 'border-white/10 scale-100 hover:bg-white/[0.02]'}`}>
                  
                  {/* Khu vực tiêu đề cố định chiều cao để không bị lệch nhau */}
                  <div className="h-[48px] mb-2 flex items-start justify-between">
                    <h3 className="text-2xl font-heading italic text-white leading-none">{plan.name}</h3>
                    {plan.popular && (
                      <div className="bg-white text-black px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(255,255,255,0.4)] whitespace-nowrap ml-4">
                        Tốt nhất
                      </div>
                    )}
                  </div>
                  
                  <p className="text-white/60 font-body text-sm mb-6 pb-6 border-b border-white/10 min-h-[50px] md:min-h-[70px]">
                    {plan.description}
                  </p>
                  
                  <div className="mb-8">
                    <span className="text-4xl lg:text-5xl font-heading italic text-white">{plan.price}</span>
                  </div>

                  <ul className="flex-1 flex flex-col gap-4 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 group/item">
                        <div className={`mt-1 flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center transition-colors ${isEnterprise ? 'bg-white/10 text-white/30' : 'bg-white/20 text-current group-hover/item:bg-white group-hover/item:text-black'}`}>
                          <Check size={10} className="text-current" />
                        </div>
                        <span className={`font-body text-sm leading-snug transition-colors ${isEnterprise ? 'text-white/40' : 'text-white/80 group-hover/item:text-white'}`}>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button 
                    onClick={() => {
                      if (!isEnterprise && onSelectPackage) {
                        onSelectPackage(plan.name);
                      }
                    }}
                    disabled={isEnterprise}
                    className={`w-full py-3 rounded-full font-medium text-sm transition-all ${
                      isEnterprise 
                        ? 'bg-white/5 text-white/30 cursor-not-allowed border border-white/10'
                        : plan.popular 
                          ? 'bg-white text-black hover:bg-white/90 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:scale-105' 
                          : 'liquid-glass-strong text-white hover:bg-white/20 hover:scale-105'
                    }`}
                  >
                    {isEnterprise ? 'Sắp Ra Mắt' : 'Chọn Gói Này'}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
