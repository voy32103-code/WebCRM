import React from 'react';

export default function FeaturesChess() {
  return (
    <section id="services" className="relative w-full py-24 px-6 md:px-12 lg:px-24">
      
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <div className="liquid-glass rounded-full px-3.5 py-1 mb-8">
          <span className="text-xs font-medium text-white font-body tracking-wide uppercase">
            Năng Lực Đột Phá
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading italic text-white tracking-tight leading-[0.9] mb-24 text-center">
          Tính năng chuyên nghiệp.<br/>Không hề rườm rà.
        </h2>

        <div className="flex flex-col gap-32 w-full">
          {/* Row 1 */}
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
            <div className="flex-1 lg:pr-12 text-center lg:text-left">
              <h3 className="text-3xl md:text-4xl font-heading italic text-white mb-6">
                Thiết kế để chuyển đổi.<br/>Xây dựng để hiệu quả.
              </h3>
              <p className="text-white/60 font-body font-light text-base md:text-lg mb-8 leading-relaxed">
                Mọi pixel đều có mục đích. AI của chúng tôi phân tích dữ liệu hiệu suất của hàng ngàn trang web hàng đầu—sau đó kiến tạo nên trang web của bạn để vượt mặt tất cả.
              </p>
              <button className="liquid-glass-strong rounded-full px-6 py-2.5 text-white font-medium text-sm transition-transform hover:scale-105">
                Tìm hiểu thêm
              </button>
            </div>
            <div className="flex-1 w-full relative">
              <div className="liquid-glass rounded-2xl overflow-hidden p-2 w-full max-w-xl mx-auto shadow-2xl">
                <img 
                  src="https://motionsites.ai/assets/hero-finlytic-preview-CV9g0FHP.gif" 
                  alt="Feature showcase 1" 
                  className="w-full h-auto rounded-xl block border border-white/10"
                />
              </div>
            </div>
          </div>

          {/* Row 2 */}
          <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-24">
            <div className="flex-1 lg:pl-12 text-center lg:text-left">
              <h3 className="text-3xl md:text-4xl font-heading italic text-white mb-6">
                Thông minh hơn.<br/>Một cách tự động.
              </h3>
              <p className="text-white/60 font-body font-light text-base md:text-lg mb-8 leading-relaxed">
                Website tự động tiến hóa. AI theo dõi từ cú click, lần cuộn chuột cho đến tỷ lệ chuyển đổi—sau đó tối ưu thời gian thực. Không cập nhật thủ công. Mãi mãi tiện lợi.
              </p>
              <button className="liquid-glass-strong rounded-full px-6 py-2.5 text-white font-medium text-sm transition-transform hover:scale-105">
                Xem cách hoạt động
              </button>
            </div>
            <div className="flex-1 w-full relative">
              <div className="liquid-glass rounded-2xl overflow-hidden p-2 w-full max-w-xl mx-auto shadow-2xl">
                <img 
                  src="https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif" 
                  alt="Feature showcase 2" 
                  className="w-full h-auto rounded-xl block border border-white/10"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
