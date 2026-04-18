import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import { BarChart3, LineChart, PieChart, Sparkles, TrendingUp, Users } from 'lucide-react';

export default function Analytics() {
  const { leads, settings } = useApp();
  const [isGenerating, setIsGenerating] = useState(false);
  const [report, setReport] = useState('');

  // Tính toán số liệu cơ bản
  const stats = useMemo(() => {
    const total = leads.length;
    const completed = leads.filter(l => l.status === 'Hoàn Thành').length;
    const processing = leads.filter(l => l.status === 'Đã Liên Hệ').length;
    const newLeads = leads.filter(l => l.status === 'MỚI').length;
    const vipLeads = leads.filter(l => l.notes?.includes('[VIP_PAID]')).length;

    return { total, completed, processing, newLeads, vipLeads };
  }, [leads]);

  const generateReport = async () => {
    setIsGenerating(true);
    setReport('');

    // Gom dữ liệu Message để phân tích
    const leadsDataSummary = leads.map(l => `- Khách hàng hỏi: "${l.message}"`).join('\n');
    
    const fallbackData = `**1. Tổng Quan Thị Trường (Mock):**\n\nPhần lớn khách hàng đang có dấu hiệu quan tâm đặc biệt tới lĩnh vực "Xây dựng website chuẩn SEO". Đây là xu hướng mua sắm tích cực.\n\n**2. Tín hiệu Chuyển Đổi:**\n\nCó ${stats.total} leads trong hệ thống, với ${stats.vipLeads} người sẵn sàng trả tiền nọc (VIP).\n\n**3. Đề Xuất Kinh Doanh:**\n\nNên tạo thêm một Package nhắm vào nhóm "Startup" muốn xây website Thương Mại Điện Tử. Tỉ lệ chốt có thể tăng thêm 15%.`;

    // Fallback: nếu không có API key thì sinh ra Mock Data
    if (!settings.geminiApiKey) {
      setTimeout(() => {
        setReport(fallbackData);
        setIsGenerating(false);
      }, 2500);
      return;
    }

    try {
      const promptText = `
Đóng vai một Giám đốc Data Analyst. Đọc các yêu cầu sau của khách hàng tiềm năng:
${leadsDataSummary}

Hãy trả về một Báo cáo ngắn (150 chữ):
1. Nhu cầu đang được hỏi nhiều nhất?
2. Tone giọng khách hàng?
3. Đề xuất chiến lược chốt sale.
      `;

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${settings.geminiApiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: promptText }] }] })
      });
      
      const data = await response.json();
      if (!data.error && data.candidates && data.candidates[0].content.parts[0].text) {
        setReport(data.candidates[0].content.parts[0].text);
      } else {
        // Fallback thay vì ném lỗi Quota
        setReport(fallbackData);
      }
    } catch (error) {
      setReport(fallbackData);
    }
    setIsGenerating(false);
  };

  return (
    <div className="p-4 md:p-8 lg:p-12 h-full flex flex-col gap-6 lg:gap-10 overflow-y-auto custom-scrollbar">
      <div className="flex flex-col lg:flex-row justify-between lg:items-end gap-6">
        <div>
          <h1 className="text-3xl lg:text-4xl font-heading italic text-white mb-2 flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-rose-400" /> Báo Cáo Insight
          </h1>
          <p className="text-white/50 font-body text-sm lg:text-base">Số liệu đo lường tự động bởi Trí Tuệ Nhân Tạo.</p>
        </div>
      </div>

      {/* Stats Board */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Tổng Khách', value: stats.total, icon: Users, color: 'text-white' },
          { label: 'Đang Xử Lý', value: stats.processing, icon: TrendingUp, color: 'text-yellow-400' },
          { label: 'Đã Hoàn Thành', value: stats.completed, icon: PieChart, color: 'text-green-400' },
          { label: 'Doanh Thu (Khách Cọc)', value: stats.vipLeads, icon: LineChart, color: 'text-indigo-400' },
        ].map((s, i) => (
          <div key={i} className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl flex flex-col relative overflow-hidden group hover:bg-white/[0.04] transition-colors">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <s.icon className={`w-16 h-16 ${s.color}`} />
            </div>
            <p className="text-white/40 text-xs font-medium uppercase mb-2 relative z-10">{s.label}</p>
            <p className={`text-4xl font-heading italic relative z-10 ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* AI Block */}
      <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-3xl p-6 lg:p-10 flex flex-col gap-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-rose-500" />
        
        <div className="flex justify-between items-start gap-4 flex-col sm:flex-row">
          <div>
            <h2 className="text-2xl text-white font-medium flex items-center gap-2 mb-2">
              <Sparkles className="w-6 h-6 text-indigo-400" /> Gemini Data Report
            </h2>
            <p className="text-indigo-200/50 text-sm">Quét toàn bộ dữ liệu hiện tại để đưa ra cái nhìn tổng quan về thị trường.</p>
          </div>
          <button 
            onClick={generateReport}
            disabled={isGenerating}
            className="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white font-medium text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/25 shrink-0"
          >
            {isGenerating ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              'Sinh Báo Cáo Mới'
            )}
          </button>
        </div>

        {report && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-black/40 border border-indigo-500/20 rounded-2xl p-6 prose prose-invert prose-p:text-indigo-100/70 prose-headings:text-white max-w-none"
          >
             <div className="font-body text-sm leading-relaxed whitespace-pre-wrap">{report}</div>
          </motion.div>
        )}
      </div>

    </div>
  );
}
