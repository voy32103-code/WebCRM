import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Check, ArrowRight, Bot } from 'lucide-react';
import { useApp } from '../context/AppContext';

// Component để tạo hiệu ứng gõ phím
const TypewriterText = ({ text, onComplete }) => {
  const [displayedText, setDisplayedText] = useState('');
  const index = useRef(0);

  useEffect(() => {
    // Reset khi text thay đổi
    setDisplayedText('');
    index.current = 0;

    const timer = setInterval(() => {
      if (index.current < text.length) {
        setDisplayedText((prev) => prev + text.charAt(index.current));
        index.current += 1;
      } else {
        clearInterval(timer);
        if (onComplete) onComplete();
      }
    }, 15); // tốc độ gõ (ms)

    return () => clearInterval(timer);
  }, [text, onComplete]);

  return <span className="whitespace-pre-wrap">{displayedText}</span>;
};


export default function ContactModal({ isOpen, onClose, initialMessage = '' }) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  // Các bước: 'form' -> 'analyzing' -> 'drafting' -> 'success'
  const [step, setStep] = useState('form');
  const [aiDraftText, setAiDraftText] = useState('');
  const [isTypingDone, setIsTypingDone] = useState(false);
  const { addLead, settings } = useApp();

  const draftContainerRef = useRef(null);

  const performAIAnalysis = async (message) => {
    // Nếu có API key thật, gọi Google Gemini
    if (settings && settings.geminiApiKey) {
      const modelsToTry = ['gemini-2.0-flash-lite', 'gemini-flash-lite-latest', 'gemini-2.0-flash'];
      let lastError = null;

      for (const model of modelsToTry) {
        try {
          const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${settings.geminiApiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: `
Đóng vai trợ lý AI thông minh của agency thiết kế phần mềm Antigravity. 
Khách hàng vừa nhập yêu cầu sau để đăng ký tư vấn: "${message}".
Hãy phản hồi lại họ bằng tiếng Việt trong khoảng 2-3 câu ngắn gọn sắc sảo. 
Cho họ thấy chúng ta đã tiếp nhận thông tin và hứa hẹn một giải pháp đẳng cấp.
              ` }] }]
            })
          });
          const data = await response.json();
          if (!data.error && data.candidates && data.candidates[0].content.parts[0].text) {
             return data.candidates[0].content.parts[0].text;
          } else if (data.error) {
             lastError = data.error.message;
             console.error(`Gemini AI API Error (${model}):`, data.error.message);
          }
        } catch (e) {
          lastError = e.message;
          console.error(`Gemini AI Error (${model}):`, e);
        }
      }
      return `Lỗi API (Tất cả Model đều quá tải): ${lastError}`;
    }
    
    // Fallback: Code giả lập
    const lowerMsg = message.toLowerCase();
    if (lowerMsg.includes('tăng trưởng') || lowerMsg.includes('growth')) {
      return 'Phân tích ban đầu: Nhu cầu nâng cấp hệ thống toàn diện.\n\nĐề xuất: Khởi chạy gói Tăng Trưởng với bộ kho ứng dụng tuỳ chỉnh và CMS cá nhân hoá. Hệ thống sẽ tích hợp sẵn API CRM để tối ưu vận hành.\n\nChúng tôi sẽ sớm liên hệ với bạn để kick-off dự án.';
    }
    if (lowerMsg.includes('3d') || lowerMsg.includes('animation')) {
      return 'Phân tích ban đầu: Trọng tâm trải nghiệm WebGL / Tương tác.\n\nĐề xuất: Tích hợp Three.js cho trải nghiệm mượt mà 60fps mà không làm giảm tốc độ tải trang. Phù hợp cho chiến dịch Branding.\n\nLịch tư vấn Demo Tech sẽ được gửi vào email của bạn ngay hôm nay.';
    }
    return 'Phân tích ban đầu: Xây dựng nền tảng số hoá chuyên nghiệp.\n\nĐề xuất:\n- Tư vấn giải pháp phù hợp với quy mô hiện tại.\n- Áp dụng quy trình linh hoạt để dễ cập nhật tính năng.\n\nChúng tôi đã lưu lại thông tin và sẽ gọi điện cho bạn ngay ngày mai để khảo sát kỹ hơn.';
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Reset state khi mở lại
      setStep('form');
      setIsTypingDone(false);
      setFormData({ name: '', email: '', message: initialMessage });
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, initialMessage]);

  // Tự động cuộn xuống khi đang gõ text
  useEffect(() => {
    if (step === 'drafting' && draftContainerRef.current) {
      const scrollable = draftContainerRef.current;
      scrollable.scrollTop = scrollable.scrollHeight;
    }
  });

  const handleStartAI = async (e) => {
    e.preventDefault();
    setStep('analyzing');
    
    // Đợi AI phân tích thực sự hoặc giả lập (min 1.5s để người dùng kịp đọc UX)
    const startTime = Date.now();
    const generated = await performAIAnalysis(formData.message);
    const elapsedTime = Date.now() - startTime;
    
    const remainingTime = Math.max(0, 1500 - elapsedTime);
    
    setTimeout(() => {
      setAiDraftText(generated);
      setStep('drafting');
    }, remainingTime);
  };

  const handleConfirm = () => {
    // Lưu xuống hệ thống
    const leadData = {
      ...formData,
      aiDraft: aiDraftText
    };
    addLead(leadData);
    setStep('success');
    
    // Tự đóng sau 3s
    setTimeout(() => {
      onClose();
    }, 3000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg relative shadow-[0_0_50px_rgba(255,255,255,0.05)]"
          >
            <div className="liquid-glass rounded-3xl p-8 relative border border-white/20 min-h-[400px] flex flex-col transition-all duration-500">
              {step !== 'analyzing' && step !== 'drafting' && (
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 text-white/50 hover:text-white transition-colors z-20"
                >
                  <X size={20} />
                </button>
              )}

              {/* BƯỚC 1: NHẬP FORM */}
              {step === 'form' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col h-full">
                  <h3 className="text-3xl font-heading italic text-white mb-2">Bắt đầu dự án.</h3>
                  <p className="text-white/60 font-body text-sm mb-6">Mô tả thiết kế của bạn, trí tuệ nhân tạo sẽ phác thảo cơ chế ngay trên màn hình này.</p>
                  <form onSubmit={handleStartAI} className="flex flex-col gap-4 flex-1">
                    <input
                      type="text" required placeholder="Tên của bạn"
                      value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white/40 transition-colors font-body text-sm"
                    />
                    <input
                      type="email" required placeholder="Email làm việc"
                      value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white/40 transition-colors font-body text-sm"
                    />
                    <textarea
                      required rows="4" placeholder="Ví dụ: Tôi muốn làm 1 website tin tức, hoặc thiết kế 3D..."
                      value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white/40 transition-colors font-body text-sm resize-none"
                    />
                    <button
                      type="submit"
                      className="mt-2 w-full bg-white text-black hover:bg-white/90 rounded-xl py-3 font-medium text-sm transition-all flex items-center justify-center gap-2 group"
                    >
                      <Sparkles size={16} className="text-black inline-block group-hover:rotate-12 transition-transform" />
                      Phác thảo bằng AI
                    </button>
                  </form>
                </motion.div>
              )}

              {/* BƯỚC 2: AI PHÂN TÍCH */}
              {step === 'analyzing' && (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center h-[320px] m-auto text-center">
                  <div className="relative w-20 h-20 mb-8">
                    <div className="absolute inset-0 border-2 border-dashed border-white/30 rounded-full animate-[spin_4s_linear_infinite]" />
                    <div className="absolute inset-2 bg-gradient-to-tr from-white to-white/20 rounded-full blur-xl animate-pulse" />
                    <div className="absolute inset-0 flex items-center justify-center text-black">
                      <Sparkles size={24} className="animate-pulse" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-heading italic text-white animate-pulse">Hệ thống đang nạp thông tin...</h3>
                  <p className="text-white/40 font-body text-sm mt-3">Quét từ khoá yêu cầu để sắp xếp phương án</p>
                </motion.div>
              )}

              {/* BƯỚC 3: AI ĐANG GÕ BẢN NHÁP */}
              {step === 'drafting' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col h-full">
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                      <Bot size={20} className="text-white drop-shadow-md" />
                    </div>
                    <div>
                      <h3 className="font-heading italic text-xl text-white">Antigravity AI</h3>
                      <p className="text-white/40 text-xs flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" /> Đang trực tuyến
                      </p>
                    </div>
                  </div>
                  
                  <div 
                    ref={draftContainerRef}
                    className="flex-1 overflow-y-auto mb-6 pr-2 font-body text-white/80 text-sm leading-relaxed"
                    style={{ maxHeight: '200px' }}
                  >
                    <TypewriterText text={aiDraftText} onComplete={() => setIsTypingDone(true)} />
                  </div>

                  <AnimatePresence>
                    {isTypingDone && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex gap-3 pt-4 border-t border-white/10"
                      >
                        <button
                          onClick={onClose}
                          className="flex-1 py-3 liquid-glass-strong rounded-xl text-white/70 hover:text-white text-sm font-medium transition-colors"
                        >
                          Hủy bỏ
                        </button>
                        <button
                          onClick={handleConfirm}
                          className="flex-1 py-3 bg-white text-black hover:bg-white/90 rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.3)] text-sm font-medium transition-all flex items-center justify-center gap-2"
                        >
                          Chốt phương án <ArrowRight size={16} />
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}

              {/* BƯỚC 4: HOÀN THÀNH */}
              {step === 'success' && (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center h-[320px] m-auto text-center">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(255,255,255,0.5)]">
                    <Check size={32} className="text-black" />
                  </div>
                  <h3 className="text-3xl font-heading italic text-white mb-3">Thành Công!</h3>
                  <p className="text-white/60 font-body text-sm px-4">
                    Yêu cầu và phản hồi AI giả lập đã được lưu. <br/>
                    Hãy vào Dashboard quản trị để kiểm tra!
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
