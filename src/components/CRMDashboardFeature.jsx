import React from 'react';
import { motion } from 'motion/react';
import { PieChart, LineChart, LayoutDashboard, Lightbulb, TrendingUp, Activity } from 'lucide-react';

export default function CRMDashboardFeature() {
  const benefits = [
    {
      icon: LayoutDashboard,
      title: "Thông tin trực quan",
      desc: "Xem dữ liệu thời gian thực dưới dạng biểu đồ, đồ thị và báo cáo, giúp ra quyết định nhanh hơn và sáng suốt hơn.",
      delay: 0.1
    },
    {
      icon: TrendingUp,
      title: "Theo dõi các chỉ số chính",
      desc: "Theo dõi các KPI quan trọng như tỷ lệ chuyển đổi, quy trình bán hàng và tỷ lệ giữ chân khách hàng.",
      delay: 0.2
    },
    {
      icon: LineChart,
      title: "Báo cáo dễ dàng",
      desc: "Tạo báo cáo chi tiết để phân tích dữ liệu CRM, theo dõi xu hướng và đo lường hiệu suất của nhóm.",
      delay: 0.3
    }
  ];

  return (
    <section className="relative w-full py-24 px-6 md:px-12 lg:px-24 bg-black overflow-hidden border-t border-white/5">
      {/* Background Gradients */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-600/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-teal-600/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-20">
        
        {/* Left Column: Interactive Dashboard Mockup */}
        <div className="w-full lg:w-1/2 relative min-h-[600px] flex items-center justify-center z-10 perspective-[1000px]">
          
          <motion.div 
            initial={{ opacity: 0, rotateY: -20, scale: 0.9 }}
            whileInView={{ opacity: 1, rotateY: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="w-full max-w-lg bg-[#0F1115] border border-white/10 rounded-3xl p-6 backdrop-blur-2xl shadow-[0_20px_60px_-15px_rgba(16,185,129,0.2)] relative overflow-hidden"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <PieChart className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-white/80 text-sm font-medium">Báo cáo hiệu suất</div>
              </div>
              <div className="flex space-x-2">
                <div className="w-8 h-2 rounded-full bg-white/10" />
                <div className="w-8 h-2 rounded-full bg-white/10" />
              </div>
            </div>

            {/* Dashboard Content Grid */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              
              {/* Box 1: Revenue Line Chart Mock */}
              <div className="col-span-2 p-5 rounded-2xl bg-white/5 border border-white/5">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <div className="text-white/40 text-xs uppercase tracking-widest font-medium mb-1">Doanh thu</div>
                    <div className="text-2xl font-heading text-white">$45,280</div>
                  </div>
                  <div className="px-2 py-1 rounded bg-emerald-500/20 text-emerald-400 text-xs font-bold">+12%</div>
                </div>
                
                {/* Simple animated line chart using SVG */}
                <div className="w-full h-24 relative flex items-end justify-between gap-2">
                   {[40, 60, 45, 80, 50, 90, 70, 100].map((height, i) => (
                     <motion.div 
                       key={i}
                       initial={{ height: 0 }}
                       whileInView={{ height: `${height}%` }}
                       transition={{ duration: 1, delay: i * 0.1 }}
                       viewport={{ once: true }}
                       className="w-full bg-gradient-to-t from-emerald-500/20 to-emerald-400 rounded-t-sm"
                     />
                   ))}
                </div>
              </div>

              {/* Box 2: Conversion Pie Chart */}
              <div className="p-5 rounded-2xl bg-white/5 border border-white/5 flex flex-col items-center justify-center relative overflow-hidden">
                <div className="text-white/40 text-[10px] uppercase tracking-widest absolute top-4 left-4">Tỉ lệ chốt sale</div>
                
                <motion.div 
                  initial={{ rotate: -90, opacity: 0 }}
                  whileInView={{ rotate: 0, opacity: 1 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className="w-24 h-24 rounded-full mt-6 flex items-center justify-center relative"
                  style={{
                    background: "conic-gradient(from 0deg, #10B981 0% 68%, #0F1115 68% 100%)",
                    boxShadow: "0 0 20px rgba(16,185,129,0.3)"
                  }}
                >
                  <div className="absolute inset-2 bg-[#1b1e24] rounded-full flex items-center justify-center">
                    <span className="text-white font-heading text-lg">68%</span>
                  </div>
                </motion.div>
              </div>

              {/* Box 3: Activities list */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex flex-col gap-3">
                <div className="text-white/40 text-[10px] uppercase tracking-widest mb-1">Hoạt động mới</div>
                
                {[1,2,3].map((item, i) => (
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    viewport={{ once: true }}
                    key={i} className="flex items-center gap-3"
                  >
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                      <Activity className="w-3 h-3 text-white/50" />
                    </div>
                    <div className="flex-1">
                      <div className="w-full h-2 bg-white/20 rounded-full mb-1" />
                      <div className="w-2/3 h-1.5 bg-white/10 rounded-full" />
                    </div>
                  </motion.div>
                ))}
              </div>

            </div>

            {/* Floating indicator */}
            <motion.div 
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 1, type: "spring" }}
              viewport={{ once: true }}
              className="absolute -right-6 top-20 bg-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg border border-emerald-400 rotate-12 flex items-center gap-1"
            >
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              Live Data
            </motion.div>
          </motion.div>

        </div>

        {/* Right Column: Content */}
        <div className="w-full lg:w-1/2 flex flex-col items-start z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="liquid-glass rounded-full px-4 py-1.5 mb-8 flex items-center gap-2 border-emerald-500/30 bg-emerald-500/10"
          >
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-medium text-emerald-300 font-body uppercase tracking-wider">
              Dữ liệu theo thời gian thực
            </span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-5xl font-heading italic text-white tracking-tight leading-[1] mb-6"
          >
            Bảng điều khiển và báo cáo <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
              tùy chỉnh cho riêng bạn.
            </span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/60 font-body text-lg font-light leading-relaxed mb-12 max-w-xl"
          >
            Cho phép người dùng tạo chế độ xem dữ liệu cá nhân hóa, theo dõi các chỉ số quan trọng như doanh số, sự hài lòng của khách hàng và hiệu suất trực tiếp giúp các nhóm ra quyết định sáng suốt.
          </motion.p>

          <div className="flex flex-col gap-8 w-full mb-12">
            {benefits.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: item.delay }}
                className="flex items-start gap-5 group"
              >
                <div className="w-12 h-12 rounded-2xl liquid-glass flex items-center justify-center shrink-0 border border-white/5 group-hover:border-emerald-500/30 group-hover:bg-emerald-500/10 transition-colors">
                  <item.icon className="w-5 h-5 text-emerald-300" />
                </div>
                <div>
                  <h3 className="text-xl font-heading text-white mb-2 group-hover:text-emerald-200 transition-colors">{item.title}</h3>
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
            className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/40 to-teal-950/40 border border-emerald-500/20 backdrop-blur-md relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Lightbulb className="w-24 h-24 text-emerald-400" />
            </div>
            <div className="flex gap-4 items-start relative z-10">
              <div className="p-2 bg-emerald-500/20 rounded-lg shrink-0">
                <Lightbulb className="w-5 h-5 text-emerald-300" />
              </div>
              <div>
                <h4 className="text-emerald-300 font-heading text-sm uppercase tracking-wider mb-2">Mẹo chuyên gia</h4>
                <p className="text-white/80 font-body text-sm leading-relaxed">
                  Tạo bảng điều khiển tùy chỉnh tập trung vào các chỉ số quan trọng nhất của nhóm, chẳng hạn như doanh thu bán hàng, phiếu dịch vụ khách hàng hoặc hiệu suất chiến dịch.
                </p>
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
