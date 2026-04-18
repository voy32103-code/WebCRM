import React from 'react';
import { motion } from 'motion/react';
import { Clock, Target, BarChart, Lightbulb, Mail, ArrowRight, MousePointerClick } from 'lucide-react';

export default function CRMAutomation() {
  const benefits = [
    {
      icon: Clock,
      title: "Tiết kiệm thời gian",
      desc: "Tự động hóa các công việc lặp đi lặp lại như chiến dịch email, theo dõi và đăng bài để nhóm tiếp thị tập trung vào chiến lược.",
      delay: 0.1
    },
    {
      icon: Target,
      title: "Cải thiện mục tiêu",
      desc: "Sử dụng dữ liệu để gửi tin nhắn được cá nhân hóa, thu hút sự chú ý của đối tượng mục tiêu, tăng mức độ tương tác.",
      delay: 0.2
    },
    {
      icon: BarChart,
      title: "Theo dõi hiệu suất",
      desc: "Theo dõi các chỉ số quan trọng để hiểu những gì đang hiệu quả và đưa ra quyết định dựa trên dữ liệu để tối ưu hóa nỗ lực.",
      delay: 0.3
    }
  ];

  return (
    <section className="relative w-full py-32 px-6 md:px-12 lg:px-24 bg-black overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/20 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20">
        
        {/* Left Column: Content */}
        <div className="w-full lg:w-1/2 flex flex-col items-start z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="liquid-glass rounded-full px-4 py-1.5 mb-8 flex items-center gap-2 border-indigo-500/30 bg-indigo-500/10"
          >
            <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
            <span className="text-xs font-medium text-indigo-300 font-body uppercase tracking-wider">
              Hệ thống CRM thông minh
            </span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-heading italic text-white tracking-tight leading-[1] mb-6"
          >
            Tự động hóa tiếp thị <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              không cần nhập liệu.
            </span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/60 font-body text-lg font-light leading-relaxed mb-12 max-w-xl"
          >
            Cho phép bạn hợp lý hóa các chiến dịch tiếp thị, kích hoạt chuỗi email được cá nhân hóa và theo dõi hành vi của khách hàng tiềm năng trên các nền tảng khác nhau.
          </motion.p>

          <div className="flex flex-col gap-8 w-full mb-12">
            {benefits.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: item.delay }}
                className="flex items-start gap-5 group"
              >
                <div className="w-12 h-12 rounded-2xl liquid-glass flex items-center justify-center shrink-0 border border-white/5 group-hover:border-indigo-500/30 group-hover:bg-indigo-500/10 transition-colors">
                  <item.icon className="w-5 h-5 text-indigo-300" />
                </div>
                <div>
                  <h3 className="text-xl font-heading text-white mb-2 group-hover:text-indigo-200 transition-colors">{item.title}</h3>
                  <p className="text-white/50 font-body text-sm leading-relaxed max-w-sm">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="p-5 rounded-2xl bg-gradient-to-r from-indigo-950/40 to-purple-950/40 border border-indigo-500/20 backdrop-blur-md relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Lightbulb className="w-24 h-24 text-indigo-400" />
            </div>
            <div className="flex gap-4 items-start relative z-10">
              <div className="p-2 bg-indigo-500/20 rounded-lg shrink-0">
                <Lightbulb className="w-5 h-5 text-indigo-300" />
              </div>
              <div>
                <h4 className="text-indigo-300 font-heading text-sm uppercase tracking-wider mb-2">Mẹo chuyên gia</h4>
                <p className="text-white/80 font-body text-sm leading-relaxed">
                  Tự động hóa các chiến dịch nuôi dưỡng khách hàng tiềm năng bằng cách thiết lập quy trình công việc kích hoạt email dựa trên hành động của khách hàng, như gửi biểu mẫu hoặc xem bảng giá.
                </p>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Right Column: Interactive visual representation */}
        <div className="w-full lg:w-1/2 relative min-h-[600px] flex items-center justify-center z-10 perspective-[1000px]">
          {/* Main Visual Container */}
          <motion.div 
            initial={{ opacity: 0, rotateY: 20, scale: 0.9 }}
            whileInView={{ opacity: 1, rotateY: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="w-full max-w-md bg-black/40 border border-white/10 rounded-3xl p-6 backdrop-blur-2xl shadow-[0_20px_60px_-15px_rgba(79,70,229,0.3)] relative"
          >
            {/* Header mockup */}
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
              </div>
              <div className="text-white/40 text-xs font-body font-medium uppercase tracking-widest">Workflow Builder</div>
            </div>

            {/* Workflow Nodes */}
            <div className="flex flex-col gap-4 relative">
              {/* Connecting line */}
              <div className="absolute left-8 top-8 bottom-8 w-px bg-gradient-to-b from-indigo-500/50 via-purple-500/50 to-transparent z-0" />

              {/* Node 1: Trigger */}
              <motion.div 
                animate={{ y: [0, -5, 0] }} 
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10 p-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-4 hover:bg-white/10 transition-colors cursor-pointer"
              >
                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                  <MousePointerClick className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <div className="text-white text-sm font-medium">Khách hàng Đặt Cọc</div>
                  <div className="text-white/40 text-xs mt-1">Trình kích hoạt (Trigger)</div>
                </div>
              </motion.div>

              {/* Node 2: Action - Email */}
              <motion.div 
                animate={{ y: [0, 5, 0] }} 
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="relative z-10 p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center gap-4 shadow-[0_0_30px_rgba(99,102,241,0.15)] origin-left"
              >
                <div className="absolute -left-[32px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)] flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full animate-ping" />
                </div>
                <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-indigo-400" />
                </div>
                <div className="flex-1">
                  <div className="text-white text-sm font-medium">Gửi Email Cảm Ơn</div>
                  <div className="text-white/40 text-xs mt-1">Độ trễ: 0 phút (Ngay lập tức)</div>
                </div>
                <div className="w-16 h-6 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center text-[10px] text-green-400 font-medium">
                  Hoàn tất
                </div>
              </motion.div>

              {/* Node 3: Update CRM */}
              <motion.div 
                animate={{ y: [0, -3, 0] }} 
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="relative z-10 p-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-4 hover:bg-white/10 transition-colors cursor-pointer"
              >
                <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center shrink-0">
                  <Target className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <div className="text-white text-sm font-medium">Chuyển nhãn thành "VIP"</div>
                  <div className="text-white/40 text-xs mt-1">Hành động tự động Data</div>
                </div>
              </motion.div>

              {/* Node 4: Review */}
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1 }}
                className="relative z-10 p-4 rounded-xl border border-dashed border-white/20 flex flex-col items-center justify-center gap-2 mt-4 text-center cursor-pointer hover:border-white/40 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center mb-1">
                  <span className="text-2xl leading-none text-white/50">+</span>
                </div>
                <div className="text-white/60 text-xs font-medium">Thêm bước tự động</div>
              </motion.div>
            </div>
            
            {/* Floating stats card */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              viewport={{ once: true }}
              className="absolute -right-12 -bottom-12 liquid-glass p-4 rounded-2xl border border-white/10 shadow-2xl flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                <BarChart className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <div className="text-2xl font-heading text-white">+312%</div>
                <div className="text-[10px] text-white/50 uppercase tracking-widest font-medium">Cải thiện chốt sale</div>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
