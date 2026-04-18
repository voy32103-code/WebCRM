import React from 'react';
import { motion } from 'motion/react';
import { Cog, CheckCircle, Users, Lightbulb, Bell, Check, User, ArrowRight } from 'lucide-react';

export default function CRMWorkflowFeature() {
  const benefits = [
    {
      icon: Cog,
      title: "Giảm công việc thủ công",
      desc: "Tự động hóa các quy trình như nuôi dưỡng khách hàng, phân công công việc để giải phóng thời gian cho các công việc có giá trị cao.",
      delay: 0.1
    },
    {
      icon: CheckCircle,
      title: "Tăng tính nhất quán",
      desc: "Đảm bảo công việc được hoàn thành kịp thời và nhất quán, ngăn ngừa lỗi và các cơ hội bị bỏ lỡ.",
      delay: 0.2
    },
    {
      icon: Users,
      title: "Cải thiện sự hợp tác",
      desc: "Tự động hóa việc phân công công việc và thông báo để mọi người trong nhóm đội ngũ luôn được đồng bộ.",
      delay: 0.3
    }
  ];

  return (
    <section className="relative w-full py-24 px-6 md:px-12 lg:px-24 bg-black overflow-hidden border-t border-white/5">
      {/* Background Gradients */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-rose-600/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-orange-600/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20">
        
        {/* Left Column: Content */}
        <div className="w-full lg:w-1/2 flex flex-col items-start z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="liquid-glass rounded-full px-4 py-1.5 mb-8 flex items-center gap-2 border-rose-500/30 bg-rose-500/10"
          >
            <div className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
            <span className="text-xs font-medium text-rose-300 font-body uppercase tracking-wider">
              Hệ thống vận hành trơn tru
            </span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-5xl font-heading italic text-white tracking-tight leading-[1] mb-6"
          >
            Tự động hóa chuẩn <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-orange-400">
              quy trình làm việc.
            </span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/60 font-body text-lg font-light leading-relaxed mb-12 max-w-xl"
          >
            Hệ thống CRM giúp giảm thiểu các quy trình thủ công. Từ việc phân công khách hàng đến gửi email theo dõi, mọi thứ giúp các nhóm dễ dàng tổ chức và tập trung hơn.
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
                <div className="w-12 h-12 rounded-2xl liquid-glass flex items-center justify-center shrink-0 border border-white/5 group-hover:border-rose-500/30 group-hover:bg-rose-500/10 transition-colors">
                  <item.icon className="w-5 h-5 text-rose-300" />
                </div>
                <div>
                  <h3 className="text-xl font-heading text-white mb-2 group-hover:text-rose-200 transition-colors">{item.title}</h3>
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
            className="p-5 rounded-2xl bg-gradient-to-r from-rose-950/40 to-orange-950/40 border border-rose-500/20 backdrop-blur-md relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Lightbulb className="w-24 h-24 text-rose-400" />
            </div>
            <div className="flex gap-4 items-start relative z-10">
              <div className="p-2 bg-rose-500/20 rounded-lg shrink-0">
                <Lightbulb className="w-5 h-5 text-rose-300" />
              </div>
              <div>
                <h4 className="text-rose-300 font-heading text-sm uppercase tracking-wider mb-2">Mẹo chuyên gia</h4>
                <p className="text-white/80 font-body text-sm leading-relaxed">
                  Thiết lập nhắc nhở tự động cho các công việc theo dõi để đảm bảo không bỏ sót bất kỳ một bước nào, ngay cả khi các thành viên trong nhóm đang rất bận rộn.
                </p>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Right Column: Visual Kanban Workflow Mockup */}
        <div className="w-full lg:w-1/2 relative min-h-[600px] flex items-center justify-center z-10 perspective-[1000px]">
          
          <motion.div 
            initial={{ opacity: 0, rotateY: 20, scale: 0.9 }}
            whileInView={{ opacity: 1, rotateY: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="w-full max-w-[500px] bg-[#0F1115] border border-white/10 rounded-3xl p-6 backdrop-blur-2xl shadow-[0_20px_60px_-15px_rgba(225,29,72,0.2)] relative"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-rose-500/20 flex items-center justify-center">
                  <Cog className="w-4 h-4 text-rose-400 animate-spin-slow" />
                </div>
                <div className="text-white/80 text-sm font-medium">Bảng Việc (Kanban)</div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center border-2 border-[#0F1115] -mr-4 z-20">
                  <span className="text-[10px] text-white font-bold">NV</span>
                </div>
                <div className="w-6 h-6 rounded-full bg-rose-500 flex items-center justify-center border-2 border-[#0F1115] z-10">
                  <span className="text-[10px] text-white font-bold">QL</span>
                </div>
              </div>
            </div>

            {/* Kanban Columns */}
            <div className="grid grid-cols-2 gap-4 relative">
              
              {/* Column 1: Mới */}
              <div className="flex flex-col gap-3">
                <div className="text-white/40 text-[10px] uppercase tracking-widest font-bold flex justify-between">
                  <span>Mới đến</span>
                  <span className="bg-white/10 px-1.5 py-0.5 rounded text-white/60 text-[8px]">2</span>
                </div>
                
                {/* Static Task */}
                <div className="p-3 bg-white/5 rounded-xl border border-white/5 opacity-50">
                   <div className="w-full h-2 rounded bg-white/10 mb-2" />
                   <div className="w-2/3 h-2 rounded bg-white/10" />
                </div>

                {/* Animated Moving Task */}
                <motion.div 
                  animate={{ 
                    x: [0, 230, 230, 0], 
                    y: [0, 0, 0, 0],
                    opacity: [1, 1, 0, 1] 
                  }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", times: [0, 0.4, 0.8, 1] }}
                  className="z-50 p-3 bg-gradient-to-br from-rose-500/20 to-orange-500/20 rounded-xl border border-rose-500/40 shadow-lg relative cursor-pointer"
                >
                  <div className="absolute top-2 right-2 flex gap-1">
                     <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
                  </div>
                  <div className="text-white text-xs font-medium mb-1">Gửi Báo Giá Bất Động Sản</div>
                  <div className="text-white/50 text-[10px]">Lead: Nguyễn Văn A</div>
                  <div className="mt-3 flex justify-between items-center">
                    <div className="px-1.5 py-0.5 rounded text-[8px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">Auto</div>
                    <ArrowRight className="w-3 h-3 text-white/40" />
                  </div>
                </motion.div>
              </div>

              {/* Column 2: Đang xử lý */}
              <div className="flex flex-col gap-3">
                <div className="text-white/40 text-[10px] uppercase tracking-widest font-bold flex justify-between">
                  <span>Đang xử lý</span>
                  <span className="bg-white/10 px-1.5 py-0.5 rounded text-white/60 text-[8px]">1</span>
                </div>
                
                <div className="p-3 bg-white/5 rounded-xl border border-white/5 relative overflow-hidden h-[88px]">
                   <div className="w-full h-full absolute inset-0 bg-white/[0.02]" />
                   <div className="text-white/30 text-xs text-center w-full mt-4 font-medium italic">Thả vào đây...</div>
                </div>
              </div>

            </div>

            {/* Notification popup animation */}
            <motion.div 
              animate={{ y: [20, 0, 0, 20], opacity: [0, 1, 1, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", times: [0, 0.1, 0.9, 1] }}
              className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-max bg-white text-black p-3 rounded-xl shadow-2xl flex items-center gap-3 border border-white/20"
            >
              <div className="w-8 h-8 rounded-full bg-rose-500/10 flex items-center justify-center">
                <Bell className="w-4 h-4 text-rose-500 animate-[ring_2s_ease-in-out_infinite]" />
              </div>
              <div className="pr-2">
                <div className="text-[11px] font-bold">Bot Tự Động</div>
                <div className="text-[10px] text-black/60">Đã tự động gửi email Follow-up!</div>
              </div>
              <div className="w-5 h-5 rounded-full bg-green-500 shrink-0 flex items-center justify-center ml-2 shadow-sm">
                 <Check className="w-3 h-3 text-white" />
              </div>
            </motion.div>

          </motion.div>
        </div>

      </div>
    </section>
  );
}
