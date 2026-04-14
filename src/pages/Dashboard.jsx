import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext';
import { Mail, Clock, Trash2, Search, Filter, X, Save, Bot, Sparkles, Send } from 'lucide-react';

export default function Dashboard() {
  const { leads, updateLeadStatus, updateLeadNotes, deleteLead, settings } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  
  // State panel chi tiết
  const [selectedLead, setSelectedLead] = useState(null);
  
  // State AI Agent
  const [isAgentTyping, setIsAgentTyping] = useState(false);
  const [agentResponse, setAgentResponse] = useState('');

  const getStatusColor = (status) => {
    switch (status) {
      case 'MỚI': return 'text-primary bg-primary/10 border-primary/20';
      case 'Đã Liên Hệ': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'Hoàn Thành': return 'text-green-400 bg-green-400/10 border-green-400/20';
      default: return 'text-white bg-white/10 border-white/20';
    }
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = (lead.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) || 
                          (lead.email?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
                          (lead.message?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // AI Agent Functionality
  const handleAskAgent = async () => {
    if (!selectedLead) return;
    
    setIsAgentTyping(true);
    setAgentResponse('');

    const promptText = `
Hãy đóng vai một chuyên gia tư vấn phần mềm và thiết kế website hạng sang (Agency).
Một khách hàng tiềm năng vừa gửi yêu cầu sau:
- Tên: ${selectedLead.name}
- Email: ${selectedLead.email}
- Tin nhắn gốc: "${selectedLead.message}"
- Bản nháp (AI đã phân tích trước đó): "${selectedLead.aiDraft || 'Không có'}"

Hãy viết ngay một mẫu Email Tiếng Việt thật lịch sự, chuyên nghiệp, sang trọng để tôi (Admin) có thể copy và báo giá/phản hồi lại cho người này. Đừng dài quá, hãy sắc sảo.
    `;

    // Nếu có API Key, dùng API Thật
    if (settings.geminiApiKey) {
      const modelsToTry = ['gemini-2.0-flash-lite', 'gemini-flash-lite-latest', 'gemini-2.0-flash'];
      let successData = null;
      let lastError = null;

      for (const model of modelsToTry) {
        try {
          const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${settings.geminiApiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: promptText }] }]
            })
          });
          
          const data = await response.json();
          
          if (!data.error && data.candidates && data.candidates[0].content.parts[0].text) {
            successData = data.candidates[0].content.parts[0].text;
            break; // Tìm thấy model chạy ngon, thoát Loop!
          } else if (data.error) {
            lastError = data.error.message;
            console.error(`Gemini Error Data with ${model}:`, data.error);
          }
        } catch (error) {
          lastError = error.message;
        }
      }

      if (successData) {
        setAgentResponse(successData);
      } else {
        setAgentResponse(`Lỗi API (Tất cả Model đều quá tải): ${lastError || 'Không thể kết nối.'}`);
      }
    } else {
      // Giả lập
      setTimeout(() => {
        setAgentResponse(`Chào anh/chị ${selectedLead.name || 'Khách hàng'},\n\nCảm ơn anh/chị đã liên hệ với Antigravity Studio.\nChúng tôi đã nhận được yêu cầu của anh chị về: "${selectedLead.message.substring(0, 30)}..."\n\nDựa trên sơ bộ, dự án này hoàn toàn nằm trong chuyên môn của chúng tôi. Chúng tôi có thể sắp xếp một buổi Google Meet 15 phút vào tuần tới để thảo luận chi tiết hơn về ngân sách và tiến độ được không ạ?\n\nTrân trọng,\nĐội ngũ Antigravity.`);
      }, 1500);
    }
    
    setIsAgentTyping(false);
  };

  return (
    <div className="p-4 md:p-8 lg:p-12 h-full flex flex-col gap-6 lg:gap-10 relative">
      <div className="flex flex-col lg:flex-row justify-between lg:items-end gap-6">
        <div>
          <h1 className="text-3xl lg:text-4xl font-heading italic text-white mb-2">Quản Trị CRM</h1>
          <p className="text-white/50 font-body text-sm lg:text-base">Hệ thống quản lý khách hàng tiềm năng tích hợp AI.</p>
        </div>
        
        <div className="flex flex-wrap lg:flex-nowrap gap-4">
          <div className="liquid-glass rounded-2xl px-5 py-3 border border-white/5 flex-1 lg:flex-none">
            <p className="text-white/50 text-[10px] lg:text-xs font-medium uppercase tracking-wider mb-1">Tổng cộng</p>
            <p className="text-2xl lg:text-3xl font-heading italic text-white">{leads.length}</p>
          </div>
          <div className="liquid-glass rounded-2xl px-5 py-3 border border-white/5 flex-1 lg:flex-none">
            <p className="text-white/50 text-[10px] lg:text-xs font-medium uppercase tracking-wider mb-1">Cần xử lý</p>
            <p className="text-2xl lg:text-3xl font-heading italic text-primary">{leads.filter(l => l.status === 'MỚI').length}</p>
          </div>
        </div>
      </div>

      {/* Toolbox: Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4 items-center w-full">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 w-4 h-4" />
          <input 
            type="text" 
            placeholder="Tìm kiếm theo Tên, Email hoặc Nội dung..." 
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full bg-black/40 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-white/40 transition-colors font-body text-sm"
          />
        </div>
        <div className="relative w-full md:w-auto">
          <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 w-4 h-4" />
          <select 
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="w-full md:w-48 bg-black/40 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white appearance-none focus:outline-none focus:border-white/40 transition-colors font-body text-sm cursor-pointer"
          >
            <option value="ALL">Tất cả trạng thái</option>
            <option value="MỚI">MỚI</option>
            <option value="Đã Liên Hệ">Đã Liên Hệ</option>
            <option value="Hoàn Thành">Hoàn Thành</option>
          </select>
        </div>
      </div>

      <div className="flex-1 bg-black/20 rounded-3xl border border-white/5 overflow-hidden flex min-h-[400px]">
        {/* Table View */}
        <div className="flex-1 overflow-x-auto min-h-full">
          <table className="w-full text-left font-body text-sm">
            <thead className="border-b border-white/5 bg-white/[0.02]">
              <tr>
                <th className="px-6 py-5 text-white/50 font-medium">Trạng thái</th>
                <th className="px-6 py-5 text-white/50 font-medium">Khách hàng</th>
                <th className="px-6 py-5 text-white/50 font-medium pl-0 hidden md:table-cell">Nội dung tóm tắt</th>
                <th className="px-6 py-5 text-white/50 font-medium text-right">Ngày gửi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-16 text-center text-white/30 italic">
                    Không tìm thấy yêu cầu nào!
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead, index) => (
                  <motion.tr 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    key={lead.id} 
                    onClick={() => {
                        setSelectedLead(lead);
                        setAgentResponse('');
                    }}
                    className={`transition-colors cursor-pointer group ${selectedLead?.id === lead.id ? 'bg-white/5' : 'hover:bg-white/[0.02]'}`}
                  >
                    <td className="px-6 py-6 align-top w-40" onClick={e => e.stopPropagation()}>
                      <select 
                        value={lead.status}
                        onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                        className={`inline-flex py-1 px-3 items-center gap-1.5 rounded-full text-xs font-medium border appearance-none outline-none cursor-pointer transition-colors ${getStatusColor(lead.status)}`}
                      >
                        <option value="MỚI" className="bg-black text-white">MỚI</option>
                        <option value="Đã Liên Hệ" className="bg-black text-yellow-400">Đã Liên Hệ</option>
                        <option value="Hoàn Thành" className="bg-black text-green-400">Hoàn Thành</option>
                      </select>
                    </td>
                    <td className="px-6 py-6 align-top w-56">
                      <p className="text-white font-medium mb-1 truncate">{lead.name || 'Không Tên'}</p>
                      <div className="flex items-center gap-1.5 text-white/50 text-xs text-ellipsis overflow-hidden">
                        <Mail className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">{lead.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-6 align-top pl-0 hidden md:table-cell">
                      <p className="text-white/70 leading-relaxed font-light line-clamp-2">{lead.message}</p>
                      {lead.notes && (
                        <div className="mt-2 text-xs text-indigo-300 font-medium flex items-center gap-1">
                          <Save className="w-3 h-3" /> Đã có ghi chú
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-6 align-top text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2 text-white/40 text-xs mt-1">
                        <Clock className="w-3.5 h-3.5" />
                        {new Date(lead.date).toLocaleDateString('vi-VN')}
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Side Panel (Lead Detail & AI Agent) */}
        <AnimatePresence>
          {selectedLead && (
            <motion.div 
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 450, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className="border-l border-white/5 bg-black/40 flex flex-col overflow-hidden shrink-0"
            >
              <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
                <h2 className="text-lg font-heading italic text-white flex items-center gap-2">
                  Hồ Sơ Yêu Cầu
                </h2>
                <div className="flex items-center gap-3">
                  <button onClick={() => { deleteLead(selectedLead.id); setSelectedLead(null); }} className="text-white/30 hover:text-red-400 transition-colors" title="Xóa">
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <button onClick={() => setSelectedLead(null)} className="text-white/50 hover:text-white transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-8 custom-scrollbar">
                {/* Info */}
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-wider mb-2">Khách hàng</p>
                  <p className="text-white font-medium text-lg">{selectedLead.name}</p>
                  <p className="text-primary text-sm mt-1">{selectedLead.email}</p>
                </div>

                <div>
                  <p className="text-white/40 text-xs uppercase tracking-wider mb-2">Thông điệp</p>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <p className="text-white/80 font-body text-sm leading-relaxed">{selectedLead.message}</p>
                  </div>
                </div>

                {selectedLead.aiDraft && (
                   <div>
                     <p className="text-white/40 text-xs uppercase tracking-wider mb-2">AI Phân Tích Kèm Theo</p>
                     <div className="bg-[#202020] border border-white/5 rounded-xl p-4">
                       <p className="text-white/60 font-body text-xs leading-relaxed whitespace-pre-wrap italic">{selectedLead.aiDraft}</p>
                     </div>
                   </div>
                )}

                {/* Internal Notes */}
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-wider mb-2">Ghi chú Nội bộ</p>
                  <textarea 
                    value={selectedLead.notes || ''}
                    onChange={(e) => {
                      updateLeadNotes(selectedLead.id, e.target.value);
                      setSelectedLead({...selectedLead, notes: e.target.value});
                    }}
                    placeholder="Ghi chú lại cuộc gọi, thỏa thuận..."
                    className="w-full bg-black border border-white/10 rounded-xl p-4 text-white/80 focus:outline-none focus:border-white/30 font-body text-sm resize-none h-24"
                  />
                </div>

                {/* AI Agent Section */}
                <div className="mt-auto border-t border-white/10 pt-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Bot className="w-5 h-5 text-indigo-400" />
                    <p className="text-white font-heading italic text-lg">Agent Hỗ Trợ Đóng Sale</p>
                  </div>
                  
                  {agentResponse ? (
                    <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-4 relative">
                       <button onClick={() => navigator.clipboard.writeText(agentResponse)} className="absolute top-3 right-3 text-indigo-400/50 hover:text-indigo-400">
                         <Save className="w-4 h-4" />
                       </button>
                       <p className="text-indigo-200/80 font-body text-sm whitespace-pre-wrap leading-relaxed">{agentResponse}</p>
                    </div>
                  ) : (
                    <button 
                      onClick={handleAskAgent}
                      disabled={isAgentTyping}
                      className="w-full py-4 bg-indigo-500/20 hover:bg-indigo-500/30 border border-indigo-500/50 rounded-xl text-indigo-300 font-medium text-sm transition-all flex items-center justify-center gap-2"
                    >
                      {isAgentTyping ? (
                        <div className="w-4 h-4 border-2 border-indigo-400/30 border-t-indigo-400 rounded-full animate-spin" />
                      ) : (
                        <><Sparkles className="w-4 h-4" /> Nhờ AI Viết Email Trả Lời Khách</>
                      )}
                    </button>
                  )}
                  {!settings.geminiApiKey && !agentResponse && (
                     <p className="text-white/30 text-[10px] mt-3 text-center">Bản demo đang sử dụng kịch bản Text mẫu. Thêm API Key ở mục Cài đặt để kích hoạt não AI thật.</p>
                  )}
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
