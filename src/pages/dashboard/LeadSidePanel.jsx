import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Bot, Send, Trash2, Mail } from 'lucide-react';
import SendEmailModal from '../../components/SendEmailModal';

export default function LeadSidePanel({
  currentSelectedLead,
  setSelectedLead,
  updateLeadStatus,
  updateLeadNotes,
  updateLeadAssignee,
  addLeadComment,
  handleDeleteLead,
  agentResponse,
  setAgentResponse,
  isAgentTyping,
  setIsAgentTyping
}) {
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const handleAskAgent = async () => {
    if (!currentSelectedLead) return;
    setIsAgentTyping(true);
    setAgentResponse('');
    try {
      const res = await fetch('http://localhost:5000/api/ai/analyze-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lead: currentSelectedLead }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      setAgentResponse(data.analysis);
    } catch (err) {
      setAgentResponse(`Lỗi kết nối AI: ${err.message}. Vui lòng kiểm tra server đang chạy.`);
    } finally {
      setIsAgentTyping(false);
    }
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    const form = e.target;
    const content = form.comment.value.trim();
    if (content) {
      addLeadComment(currentSelectedLead.id, content, 'admin');
      form.reset();
    }
  };

  return (
    <>
      <AnimatePresence>
      {currentSelectedLead && (
        <>
          {/* Backdrop */}
          <motion.div 
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedLead(null)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 block lg:hidden"
          />

          <motion.div 
            key="panel"
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-full md:w-[450px] lg:w-[400px] xl:w-[450px] liquid-glass border-l border-white/10 z-50 flex flex-col shadow-2xl safe-area-padding"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-white/10 shrink-0">
              <h2 className="text-xl font-heading italic text-white flex items-center gap-2">
                Chi tiết
                {currentSelectedLead.notes?.includes('[VIP_PAID]') && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-gradient-to-r from-yellow-400 to-amber-500 text-black shadow-[0_0_10px_rgba(250,204,21,0.4)] tracking-widest uppercase">VIP</span>
                )}
              </h2>
              <button 
                onClick={() => setSelectedLead(null)}
                className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:bg-white/10 hover:text-white transition-colors"
              >
                 <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
              {/* Customer Info */}
              <div>
                <p className="text-white/40 text-xs uppercase tracking-wider mb-2">Khách hàng</p>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <p className="text-white font-medium text-lg">{currentSelectedLead.name}</p>
                  <p className="text-primary text-sm mt-1">{currentSelectedLead.email}</p>
                </div>

                {/* Task Assignment */}
                <div className="mt-4">
                  <p className="text-white/40 text-xs uppercase tracking-wider mb-2">Phụ trách (Assignee)</p>
                  <select
                    value={currentSelectedLead.assignee || ''}
                    onChange={(e) => updateLeadAssignee(currentSelectedLead.id, e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white appearance-none focus:outline-none focus:border-indigo-500 transition-colors text-sm cursor-pointer"
                  >
                    <option value="">-- Chưa gán báo cáo --</option>
                    <option value="Hải Designer">Hải Designer</option>
                    <option value="Yến Sale">Yến Sale</option>
                    <option value="Quản lý Trưởng">Quản lý Trưởng</option>
                  </select>
                </div>

                <div className="mt-4">
                  <p className="text-white/40 text-xs uppercase tracking-wider mb-2">Thông điệp</p>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <p className="text-white/80 text-sm leading-relaxed whitespace-pre-wrap">{currentSelectedLead.message}</p>
                  </div>
                </div>
              </div>

              {/* Status Update */}
              <div>
                <p className="text-white/40 text-xs uppercase tracking-wider mb-2">Trạng thái</p>
                <select 
                  value={currentSelectedLead.status}
                  onChange={(e) => updateLeadStatus(currentSelectedLead.id, e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl pl-4 pr-10 py-3 text-white appearance-none focus:outline-none focus:border-white/40 transition-colors text-sm cursor-pointer"
                >
                  <option value="MỚI">🔥 MỚI</option>
                  <option value="Đã Liên Hệ">💬 Đã Liên Hệ</option>
                  <option value="Hoàn Thành">✅ Hoàn Thành</option>
                </select>
              </div>

              {/* Giao tiếp / Comments */}
              <div>
                <p className="text-white/40 text-xs uppercase tracking-wider mb-2 flex justify-between items-center">
                  Trao đổi nội bộ
                  <span className="text-[10px] text-primary lowercase">{currentSelectedLead.comments?.length || 0} tin nhắn</span>
                </p>
                
                <div className="bg-black/20 border border-white/10 rounded-xl px-4 pt-4 pb-2 h-64 flex flex-col relative overflow-hidden">
                   {/* Comments list */}
                   <div className="flex-1 overflow-y-auto custom-scrollbar mb-2 space-y-3 pr-2">
                       {(!currentSelectedLead.comments || currentSelectedLead.comments.length === 0) ? (
                         <div className="h-full flex items-center justify-center">
                           <p className="text-white/20 text-xs italic">Chưa có bình luận nào</p>
                         </div>
                       ) : (
                         currentSelectedLead.comments.map(c => (
                            <div key={c.id} className={`flex flex-col ${c.role === 'admin' ? 'items-end' : c.role === 'system' ? 'items-center' : 'items-start'}`}>
                               {c.role === 'system' ? (
                                  <div className="bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-[10px] px-3 py-1.5 rounded-full flex items-center gap-1.5 max-w-[90%] text-center">
                                    <Bot className="w-3 h-3 shrink-0" /> {c.content}
                                  </div>
                               ) : (
                                  <div className={`px-3 py-2 rounded-2xl max-w-[85%] text-xs ${c.role === 'admin' ? 'bg-primary text-black rounded-tr-sm' : 'bg-white/10 text-white rounded-tl-sm border border-white/5'}`}>
                                    {c.content}
                                  </div>
                               )}
                               {c.role !== 'system' && <span className="text-[9px] text-white/30 mt-1 px-1">{new Date(c.timestamp).toLocaleTimeString('vi-VN', {hour: '2-digit', minute:'2-digit'})}</span>}
                            </div>
                         ))
                       )}
                   </div>
                   
                   {/* Comment Input */}
                   <form onSubmit={handleAddComment} className="mt-auto relative">
                      <input 
                        type="text" 
                        name="comment"
                        placeholder="Nhập tin nhắn..." 
                        autoComplete="off"
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-3 pr-10 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-indigo-500 transition-colors text-xs"
                      />
                      <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-primary hover:text-indigo-400 transition-colors bg-white/5 rounded-lg">
                         <Send className="w-3 h-3" />
                      </button>
                   </form>
                </div>
              </div>

              {/* Internal Notes */}
              <div>
                <p className="text-white/40 text-xs uppercase tracking-wider mb-2">Ghi chú Private</p>
                <textarea 
                  value={currentSelectedLead.notes || ''}
                  onChange={(e) => updateLeadNotes(currentSelectedLead.id, e.target.value)}
                  className="w-full h-24 bg-black/40 border border-white/10 rounded-xl p-4 text-white placeholder-white/30 focus:outline-none focus:border-indigo-500 transition-colors text-sm resize-none custom-scrollbar"
                  placeholder="Notes chỉ xem nội bộ..."
                />
              </div>

              {/* AI Agent Analysis */}
              <div>
                <p className="text-white/40 text-xs uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Bot className="w-4 h-4 text-indigo-400" />
                  Gợi ý từ AI
                </p>
                
                {!agentResponse && !isAgentTyping && (
                  <button 
                    onClick={handleAskAgent}
                    className="w-full py-3 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 rounded-xl text-indigo-300 text-sm font-medium transition-colors"
                  >
                    Phân tích yêu cầu này
                  </button>
                )}

                {isAgentTyping && (
                  <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-4 flex gap-2 items-center">
                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
                    <span className="text-indigo-300 text-xs ml-2">Đang phân tích...</span>
                  </div>
                )}

                {agentResponse && !isAgentTyping && (
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-4 relative"
                  >
                    <p className="text-indigo-200 text-sm leading-relaxed">{agentResponse}</p>
                    <button 
                      onClick={handleAskAgent}
                      className="text-xs text-indigo-400 mt-3 font-medium hover:text-indigo-300 underline underline-offset-2"
                    >
                      Phân tích lại
                    </button>
                  </motion.div>
                )}
              </div>
              
              {/* Audit Logs (Mục Nhật ký hoạt động Enterprise) */}
              <div>
                <p className="text-white/40 text-xs uppercase tracking-wider mb-2">Nhật ký hoạt động</p>
                <div className="bg-black/20 border border-white/10 rounded-xl p-4 space-y-4">
                  {(!currentSelectedLead.auditLogs || currentSelectedLead.auditLogs.length === 0) ? (
                    <p className="text-white/20 text-xs italic text-center">Chưa có hoạt động nào</p>
                  ) : (
                    <div className="relative border-l border-white/10 ml-2 space-y-4">
                      {currentSelectedLead.auditLogs.slice().reverse().map(log => (
                        <div key={log.id || log.timestamp} className="relative pl-4">
                          <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-indigo-500 ring-2 ring-black" />
                          <p className="text-white/80 text-xs font-medium">{log.action}</p>
                          <p className="text-white/40 text-[10px] mt-0.5">
                            {new Date(log.timestamp).toLocaleString('vi-VN')} • by {log.by || log.user || 'System'}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Actions (Footer) */}
            <div className="p-6 border-t border-white/10 shrink-0 space-y-3">
               {/* Email button */}
               <button
                  onClick={() => setIsEmailModalOpen(true)}
                  className="w-full py-3 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 rounded-xl text-indigo-400 text-sm font-medium transition-colors flex items-center justify-center gap-2"
               >
                  <Mail className="w-4 h-4" />
                  Gửi Email cho Khách hàng
               </button>

               {/* Delete button */}
               <button 
                  onClick={() => handleDeleteLead(currentSelectedLead.id, currentSelectedLead.name)}
                  className="w-full py-3 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 rounded-xl text-red-500 text-sm font-medium transition-colors flex items-center justify-center gap-2"
               >
                  <Trash2 className="w-4 h-4" />
                  Xoá Hồ Sơ
               </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>

    {/* Email Modal */}
    <SendEmailModal
      isOpen={isEmailModalOpen}
      lead={currentSelectedLead}
      onClose={() => setIsEmailModalOpen(false)}
    />
    </>
  );
}
