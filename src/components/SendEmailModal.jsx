import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Send, ChevronDown, Loader2, CheckCircle, Sparkles } from 'lucide-react';
import { useToast } from './Toast';

// ─── Email Templates ─────────────────────────────────────────────────────────

const TEMPLATES = [
  {
    id: 'welcome',
    label: '👋 Chào mừng & Xác nhận yêu cầu',
    subject: 'Chúng tôi đã nhận được yêu cầu của bạn — Antigravity Studio',
    body: (lead) =>
      `Xin chào ${lead.name || 'Quý khách'},\n\nCảm ơn bạn đã liên hệ với Antigravity Studio!\n\nChúng tôi đã nhận được yêu cầu của bạn và sẽ phản hồi trong vòng 24h làm việc.\n\nNhìn lại yêu cầu của bạn:\n"${lead.message || '(Không có nội dung)'}"\n\nNếu có bất kỳ câu hỏi nào, đừng ngần ngại trả lời email này.\n\nTrân trọng,\nTeam Antigravity Studio`,
  },
  {
    id: 'quote',
    label: '💰 Gửi báo giá dự án',
    subject: 'Báo giá dự án từ Antigravity Studio',
    body: (lead) =>
      `Xin chào ${lead.name || 'Quý khách'},\n\nCảm ơn bạn đã quan tâm đến dịch vụ của chúng tôi!\n\nDựa trên yêu cầu của bạn, chúng tôi đề xuất gói dịch vụ phù hợp:\n\n• Gói STANDARD: $2,000 — Website 5-10 trang, thiết kế custom\n• Gói PROFESSIONAL: $4,500 — Bao gồm UI/UX, SEO, Dashboard quản trị\n• Gói ENTERPRISE: Liên hệ — Giải pháp toàn diện theo yêu cầu\n\nThời gian thực hiện: 4-8 tuần tùy gói.\n\nBạn muốn tư vấn thêm? Hãy đặt lịch cuộc gọi ngay hôm nay!\n\nTrân trọng,\nTeam Antigravity Studio`,
  },
  {
    id: 'followup',
    label: '🔁 Follow-up sau 3 ngày',
    subject: 'Cập nhật về yêu cầu của bạn — Antigravity Studio',
    body: (lead) =>
      `Xin chào ${lead.name || 'Quý khách'},\n\nChúng tôi chỉ muốn kiểm tra xem bạn đã nhận được thông tin từ lần liên hệ trước chưa?\n\nNếu bạn vẫn đang tìm kiếm giải pháp thiết kế website chuyên nghiệp, chúng tôi sẵn sàng hỗ trợ ngay.\n\nBạn có muốn sắp xếp một cuộc gọi ngắn 15 phút để trao đổi cụ thể hơn không?\n\nTrân trọng,\nTeam Antigravity Studio`,
  },
  {
    id: 'completed',
    label: '✅ Thông báo hoàn thành dự án',
    subject: 'Dự án của bạn đã hoàn thành — Antigravity Studio',
    body: (lead) =>
      `Xin chào ${lead.name || 'Quý khách'},\n\nChúc mừng! Dự án của bạn đã chính thức hoàn thành và được bàn giao.\n\nBiên bản nghiệm thu và tài liệu kỹ thuật đã được gửi vào hệ thống của bạn.\n\nBạn có thể đăng nhập vào hệ thống để xem và tải xuống tất cả tài liệu.\n\nCảm ơn bạn đã tin tưởng Antigravity Studio. Chúng tôi rất mong được hợp tác trong các dự án tiếp theo!\n\nTrân trọng,\nTeam Antigravity Studio`,
  },
  {
    id: 'custom',
    label: '✏️ Soạn thủ công',
    subject: '',
    body: () => '',
  },
];

// ─── AI Draft Generator ───────────────────────────────────────────────────────

/**
 * Phân tích message của lead và sinh email cá nhân hoá.
 * Có thể upgrade thay bằng fetch tới Gemini / GPT API.
 */
function generateAiDraft(lead) {
  const msg = (lead.message || '').toLowerCase();
  const name = lead.name || 'Quý khách';

  const isPrice   = msg.includes('giá') || msg.includes('chi phí') || msg.includes('budget') || msg.includes('bao nhiêu');
  const isUrgent  = msg.includes('gấp') || msg.includes('asap') || msg.includes('nhanh') || msg.includes('urgent');
  const isWebsite = msg.includes('website') || msg.includes('web') || msg.includes('landing');
  const isApp     = msg.includes('app') || msg.includes('mobile') || msg.includes('ứng dụng');
  const isDesign  = msg.includes('thiết kế') || msg.includes('design') || msg.includes('ui') || msg.includes('ux');
  const isSEO     = msg.includes('seo') || msg.includes('google') || msg.includes('tìm kiếm');

  let serviceHint = 'dịch vụ thiết kế số';
  if (isWebsite) serviceHint = 'thiết kế website chuyên nghiệp';
  if (isApp)     serviceHint = 'phát triển ứng dụng mobile';
  if (isDesign)  serviceHint = 'thiết kế UI/UX';
  if (isSEO)     serviceHint = 'tối ưu SEO & Digital Marketing';

  if (isUrgent) {
    return {
      subject: `[Ưu tiên cao] Phản hồi yêu cầu của ${name} — Antigravity Studio`,
      body: `Xin chào ${name},\n\nChúng tôi hiểu rằng dự án của bạn có yêu cầu về tiến độ. Chúng tôi đã đọc kỹ nội dung của bạn:\n\n"${lead.message}"\n\nĐể đáp ứng timeline gấp, chúng tôi đề xuất:\n• Cuộc gọi kickoff trong vòng 24h\n• Bản nháp thiết kế đầu tiên sau 48h\n• Phiên review & chỉnh sửa nhanh trong 2-3 ngày\n\nBạn có thể đặt lịch gọi ngay hôm nay không? Chúng tôi sẵn sàng ưu tiên dự án này.\n\nTrân trọng,\nTeam Antigravity Studio`,
    };
  }

  if (isPrice) {
    return {
      subject: `Báo giá ${serviceHint} cho ${name} — Antigravity Studio`,
      body: `Xin chào ${name},\n\nCảm ơn bạn đã quan tâm đến ${serviceHint} của chúng tôi!\n\nDựa trên mô tả yêu cầu của bạn, chúng tôi đề xuất các gói phù hợp:\n\n• STARTER — $1,500: Phù hợp cho dự án nhỏ, thời gian 3-4 tuần\n• PROFESSIONAL — $3,500: Đầy đủ tính năng, thiết kế custom, 6-8 tuần\n• ENTERPRISE — Liên hệ: Giải pháp toàn diện, bảo trì dài hạn\n\nMỗi gói đều bao gồm: Thiết kế responsive, tối ưu hiệu năng, và 30 ngày hỗ trợ sau bàn giao.\n\nBạn muốn tư vấn thêm về gói nào?\n\nTrân trọng,\nTeam Antigravity Studio`,
    };
  }

  return {
    subject: `Phản hồi yêu cầu ${serviceHint} — Antigravity Studio`,
    body: `Xin chào ${name},\n\nCảm ơn bạn đã tin tưởng liên hệ với Antigravity Studio!\n\nChúng tôi đã xem xét kỹ yêu cầu của bạn về ${serviceHint}. Để có thể đề xuất giải pháp phù hợp nhất, chúng tôi muốn hiểu thêm:\n\n1. Mục tiêu chính của dự án là gì?\n2. Bạn có website/sản phẩm tham khảo nào chưa?\n3. Timeline và ngân sách dự kiến của bạn?\n\nChúng tôi sẽ phản hồi với đề xuất chi tiết trong vòng 24h.\n\nTrân trọng,\nTeam Antigravity Studio`,
  };
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * SendEmailModal — modal soạn và gửi email tới khách hàng.
 *
 * @param {Object}   props
 * @param {boolean}  props.isOpen
 * @param {Object}   props.lead     - Lead data (cần .email, .name, .message)
 * @param {()=>void} props.onClose
 */
export default function SendEmailModal({ isOpen, lead, onClose }) {
  const { toast } = useToast();
  const [selectedTemplate, setSelectedTemplate] = useState(TEMPLATES[0]);
  const [subject, setSubject] = useState(TEMPLATES[0].subject);
  const [body, setBody] = useState(lead ? TEMPLATES[0].body(lead) : '');
  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [isAiDrafting, setIsAiDrafting] = useState(false);

  const handleTemplateChange = (templateId) => {
    const t = TEMPLATES.find(t => t.id === templateId);
    setSelectedTemplate(t);
    if (t.id !== 'custom') {
      setSubject(t.subject);
      setBody(lead ? t.body(lead) : '');
    }
  };

  /** Gọi Gemini API để soạn email cá nhân hoá */
  const handleAiDraft = async () => {
    if (!lead) return;
    setIsAiDrafting(true);
    try {
      const res = await fetch('http://localhost:5000/api/ai/draft-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lead }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      setSubject(data.subject);
      setBody(data.body);
      setSelectedTemplate(TEMPLATES.find(t => t.id === 'custom'));
      toast('✨ Gemini đã soạn xong nội dung email', 'success');
    } catch (err) {
      toast(`AI soạn thất bại: ${err.message}`, 'error');
    } finally {
      setIsAiDrafting(false);
    }
  };

  const handleSend = async () => {
    if (!subject.trim() || !body.trim()) {
      toast('Vui lòng nhập đầy đủ Tiêu đề và Nội dung', 'error');
      return;
    }
    setIsSending(true);
    try {
      const res = await fetch('http://localhost:5000/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to: lead.email, subject, text: body }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      setSent(true);
      toast(`✅ Đã gửi email tới ${lead.email}`, 'success');
      setTimeout(() => {
        setSent(false);
        onClose();
      }, 2000);
    } catch (err) {
      toast(`Gửi thất bại: ${err.message}`, 'error');
    } finally {
      setIsSending(false);
    }
  };

  const handleOpen = () => {
    setSent(false);
    const t = TEMPLATES[0];
    setSelectedTemplate(t);
    setSubject(t.subject);
    setBody(lead ? t.body(lead) : '');
  };

  return (
    <AnimatePresence onExitComplete={handleOpen}>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="email-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[150]"
          />

          {/* Modal */}
          <motion.div
            key="email-modal"
            initial={{ opacity: 0, scale: 0.93, y: 24 }}
            animate={{ opacity: 1, scale: 1,    y: 0  }}
            exit={{    opacity: 0, scale: 0.93, y: 24  }}
            transition={{ type: 'spring', damping: 24, stiffness: 240 }}
            className="fixed inset-0 z-[151] flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="bg-[#0d0d0d] border border-white/10 rounded-3xl w-full max-w-xl shadow-2xl pointer-events-auto overflow-hidden flex flex-col max-h-[90vh]">

              {/* Header */}
              <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-white/5 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
                    <Mail className="w-4 h-4 text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-base">Gửi Email</h3>
                    <p className="text-white/40 text-xs">Tới: {lead?.email}</p>
                  </div>
                </div>
                <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/40 hover:text-white transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">

                {/* Template Selector + AI Draft button */}
                <div>
                  <label className="text-white/50 text-xs font-medium mb-2 block">Template</label>
                  <div className="flex gap-2">
                    {/* Dropdown */}
                    <div className="relative flex-1">
                      <select
                        value={selectedTemplate.id}
                        onChange={(e) => handleTemplateChange(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm appearance-none pr-10 focus:outline-none focus:border-indigo-500/50 transition-colors"
                      >
                        {TEMPLATES.map(t => (
                          <option key={t.id} value={t.id} className="bg-[#1a1a1a]">{t.label}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
                    </div>

                    {/* AI Draft button */}
                    <button
                      onClick={handleAiDraft}
                      disabled={isAiDrafting}
                      title="Để AI phân tích yêu cầu và soạn email cá nhân hoá"
                      className="flex items-center gap-2 px-4 py-3 rounded-xl border border-indigo-500/30 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 text-sm font-semibold transition-colors disabled:opacity-50 whitespace-nowrap shadow-[0_0_12px_rgba(99,102,241,0.15)]"
                    >
                      {isAiDrafting
                        ? <><Loader2 className="w-4 h-4 animate-spin" /> Đang soạn...</>
                        : <><Sparkles className="w-4 h-4" /> AI Soạn</>
                      }
                    </button>
                  </div>
                </div>

                {/* AI typing indicator */}
                <AnimatePresence>
                  {isAiDrafting && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex items-center gap-3 bg-indigo-500/5 border border-indigo-500/20 rounded-xl px-4 py-3"
                    >
                      <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse shrink-0" />
                      <p className="text-indigo-300 text-xs">AI đang phân tích yêu cầu và soạn email cá nhân hoá...</p>
                      <div className="ml-auto flex gap-1">
                        {[0, 1, 2].map(i => (
                          <motion.div
                            key={i}
                            animate={{ scale: [1, 1.4, 1] }}
                            transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.2 }}
                            className="w-1.5 h-1.5 rounded-full bg-indigo-400"
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Subject */}
                <div>
                  <label className="text-white/50 text-xs font-medium mb-2 block">Tiêu đề</label>
                  <input
                    type="text"
                    value={subject}
                    onChange={e => setSubject(e.target.value)}
                    placeholder="Nhập tiêu đề email..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-indigo-500/50 transition-colors placeholder:text-white/20"
                  />
                </div>

                {/* Body */}
                <div>
                  <label className="text-white/50 text-xs font-medium mb-2 block">Nội dung</label>
                  <textarea
                    value={body}
                    onChange={e => setBody(e.target.value)}
                    rows={10}
                    placeholder="Soạn nội dung email hoặc nhấn ✨ AI Soạn để AI tự viết..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-indigo-500/50 transition-colors resize-none placeholder:text-white/20 leading-relaxed font-mono text-xs"
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between px-6 py-4 border-t border-white/5 shrink-0 bg-black/20">
                <p className="text-white/30 text-xs">Gửi từ: namla32103@gmail.com</p>
                <button
                  onClick={handleSend}
                  disabled={isSending || sent}
                  className="flex items-center gap-2 px-5 py-2.5 bg-indigo-500 hover:bg-indigo-600 disabled:opacity-60 disabled:cursor-not-allowed rounded-xl text-white text-sm font-semibold transition-colors shadow-[0_0_15px_rgba(99,102,241,0.3)]"
                >
                  {sent ? (
                    <><CheckCircle className="w-4 h-4" /> Đã gửi!</>
                  ) : isSending ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Đang gửi...</>
                  ) : (
                    <><Send className="w-4 h-4" /> Gửi Email</>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
