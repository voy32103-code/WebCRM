import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, AlertTriangle } from 'lucide-react';

export default function DashboardMetrics({ currentRevenue, targetRevenue, progressPercent, leads, isSlaBreached }) {
  return (
    <div className="flex flex-col lg:flex-row justify-between lg:items-end gap-6">
      <div>
        <h1 className="text-3xl lg:text-4xl font-heading italic text-white mb-2">Quản Trị CRM</h1>
        <p className="text-white/50 font-body text-sm lg:text-base">Hệ thống quản lý khách hàng tiềm năng tích hợp AI.</p>
      </div>
      
      <div className="flex flex-wrap lg:flex-nowrap gap-4 w-full lg:w-auto">
        {/* Revenue Gamification Pipeline */}
        <div className="liquid-glass rounded-2xl px-5 py-3 border border-indigo-500/20 flex-1 lg:flex-none min-w-[240px] relative overflow-hidden">
          <div className="flex justify-between items-end mb-2 relative z-10">
            <div>
              <p className="text-white/50 text-[10px] font-medium uppercase tracking-wider mb-1 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-yellow-400"/>Mục tiêu doanh thu
              </p>
              <p className="text-xl font-heading italic text-white">${currentRevenue.toLocaleString()} <span className="text-sm text-white/30">/ ${targetRevenue.toLocaleString()}</span></p>
            </div>
            <div className="text-indigo-400 font-bold text-sm bg-indigo-500/20 px-2 py-0.5 rounded shadow-[0_0_10px_rgba(99,102,241,0.3)]">{Math.round(progressPercent)}%</div>
          </div>
          {/* Progress Bar Container */}
          <div className="w-full h-1.5 bg-black rounded-full overflow-hidden relative z-10 border border-white/5">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 relative"
            >
              <div className="absolute top-0 right-0 bottom-0 w-8 bg-white/50 blur-[2px] animate-[ping_2s_ease-in-out_infinite] opacity-50" />
            </motion.div>
          </div>
        </div>

        <div className="liquid-glass rounded-2xl px-5 py-3 border border-white/5 flex-1 lg:flex-none bg-black/40">
          <p className="text-white/50 text-[10px] lg:text-xs font-medium uppercase tracking-wider mb-1">Tổng cộng</p>
          <p className="text-2xl lg:text-3xl font-heading italic text-white">{leads.length}</p>
        </div>
        <div className="liquid-glass rounded-2xl px-5 py-3 border border-white/5 flex-1 lg:flex-none bg-black/40 relative">
          <p className="text-white/50 text-[10px] lg:text-xs font-medium uppercase tracking-wider mb-1">Cần xử lý</p>
          <p className="text-2xl lg:text-3xl font-heading italic text-primary">{leads.filter(l => l.status === 'MỚI').length}</p>
          
          {/* SLA Alert Counter if exists */}
          {leads.filter(l => isSlaBreached(l)).length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full animate-bounce shadow-[0_0_10px_rgba(239,68,68,0.5)] flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" />
              {leads.filter(l => isSlaBreached(l)).length} Bỏ quên
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
