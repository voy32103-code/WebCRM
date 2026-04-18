import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronRight, ChevronLeft, Sparkles } from 'lucide-react';

const STEPS = [
  {
    title: 'Chào mừng đến với WebCRM! 👋',
    description: 'Đây là trung tâm điều hành của bạn — nơi quản lý toàn bộ khách hàng tiềm năng, tự động hoá công việc, và theo dõi doanh thu theo thời gian thực.',
    target: null, // center screen
    icon: '🚀',
  },
  {
    title: 'Kanban Board — Kéo thả trực quan',
    description: 'Xem toàn bộ yêu cầu theo dạng thẻ trực quan. Nhấn vào bất kỳ thẻ nào để mở chi tiết. Bạn có thể đổi trạng thái ngay trên thẻ hoặc dùng Side Panel bên phải.',
    target: 'kanban-hint',
    icon: '🗂️',
  },
  {
    title: 'Cảnh báo SLA thông minh',
    description: 'Hệ thống tự động phát hiện lead nào đã chờ quá 24h mà chưa được xử lý và hiển thị cảnh báo màu đỏ. Không bao giờ bỏ quên khách hàng tiềm năng nữa!',
    target: null,
    icon: '⏰',
  },
  {
    title: 'AI Agent phân tích yêu cầu',
    description: 'Chọn một khách hàng, mở Side Panel và nhấn "Phân tích yêu cầu này". AI sẽ gợi ý chiến lược tiếp cận phù hợp dựa trên nội dung yêu cầu.',
    target: null,
    icon: '🤖',
  },
  {
    title: 'Workflow tự động hóa',
    description: 'Khi bạn chuyển trạng thái Lead sang "Hoàn Thành", hệ thống sẽ tự động tạo Biên bản Nghiệm thu PDF và gửi thông báo cho khách hàng — không cần làm thủ công!',
    target: null,
    icon: '⚡',
  },
  {
    title: 'Bạn đã sẵn sàng! 🎉',
    description: 'Bấm vào bất kỳ thẻ Lead nào để bắt đầu trải nghiệm. Mọi thắc mắc, liên hệ team qua mục Cài Đặt → Integration Hub.',
    target: null,
    icon: '✅',
  },
];

const STORAGE_KEY = 'crm_onboarding_done';

/**
 * OnboardingWalkthrough — hướng dẫn từng bước cho người dùng mới.
 * Chỉ hiển thị 1 lần, sau đó lưu flag vào localStorage.
 *
 * @param {Object} props
 * @param {boolean} [props.forceShow=false] - Force show (dùng cho nút "Xem lại hướng dẫn")
 * @param {()=>void} [props.onComplete]
 */
export default function OnboardingWalkthrough({ forceShow = false, onComplete }) {
  const [step, setStep] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (forceShow) {
      setStep(0);
      setVisible(true);
      return;
    }
    const isDone = localStorage.getItem(STORAGE_KEY);
    if (!isDone) {
      // Delay nhẹ để trang load xong mới show
      const t = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(t);
    }
  }, [forceShow]);

  const handleNext = () => {
    if (step < STEPS.length - 1) setStep(s => s + 1);
    else handleComplete();
  };

  const handlePrev = () => setStep(s => Math.max(0, s - 1));

  const handleComplete = () => {
    localStorage.setItem(STORAGE_KEY, 'true');
    setVisible(false);
    onComplete?.();
  };

  const current = STEPS[step];

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Overlay */}
          <motion.div
            key="onboard-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm z-[200]"
          />

          {/* Dialog */}
          <motion.div
            key="onboard-dialog"
            initial={{ opacity: 0, scale: 0.88, y: 30 }}
            animate={{ opacity: 1, scale: 1,    y: 0  }}
            exit={{    opacity: 0, scale: 0.88, y: 30  }}
            transition={{ type: 'spring', damping: 22, stiffness: 220 }}
            className="fixed inset-0 z-[201] flex items-center justify-center p-6 pointer-events-none"
          >
            <div className="bg-[#0d0d0d] border border-white/10 rounded-3xl p-8 w-full max-w-lg shadow-2xl pointer-events-auto relative overflow-hidden">
              {/* Glow accent */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-indigo-500/20 blur-[60px] rounded-full pointer-events-none" />

              {/* Close */}
              <button
                onClick={handleComplete}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/50 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Step indicator */}
              <div className="flex gap-1.5 mb-6">
                {STEPS.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      i === step ? 'bg-indigo-400 flex-[2]' : i < step ? 'bg-indigo-400/40 flex-1' : 'bg-white/10 flex-1'
                    }`}
                  />
                ))}
              </div>

              {/* Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0  }}
                  exit={{    opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="text-5xl mb-5">{current.icon}</div>
                  <h2 className="text-2xl font-heading italic text-white mb-3 leading-tight">
                    {current.title}
                  </h2>
                  <p className="text-white/60 leading-relaxed text-sm">
                    {current.description}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-8">
                <button
                  onClick={handlePrev}
                  disabled={step === 0}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white/50 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" /> Trước
                </button>

                <span className="text-white/30 text-xs">{step + 1} / {STEPS.length}</span>

                <button
                  onClick={handleNext}
                  className="flex items-center gap-2 px-5 py-2.5 bg-indigo-500 hover:bg-indigo-600 rounded-xl text-sm font-semibold text-white transition-colors shadow-[0_0_20px_rgba(99,102,241,0.3)]"
                >
                  {step === STEPS.length - 1 ? (
                    <><Sparkles className="w-4 h-4" /> Bắt đầu ngay!</>
                  ) : (
                    <>Tiếp theo <ChevronRight className="w-4 h-4" /></>
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
