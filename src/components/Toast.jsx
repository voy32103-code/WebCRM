import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';

// ─── Context ───────────────────────────────────────────────────────────────

const ToastContext = createContext(null);

// ─── Toast Item Component ───────────────────────────────────────────────────

const ICONS = {
  success: <CheckCircle className="w-4 h-4 text-green-400 shrink-0" />,
  error:   <XCircle    className="w-4 h-4 text-red-400   shrink-0" />,
  info:    <Info       className="w-4 h-4 text-indigo-400 shrink-0" />,
};

const BORDERS = {
  success: 'border-green-500/30 bg-green-500/10',
  error:   'border-red-500/30   bg-red-500/10',
  info:    'border-indigo-500/30 bg-indigo-500/10',
};

function ToastItem({ id, type = 'info', message, onDismiss }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 80, scale: 0.9 }}
      animate={{ opacity: 1, x: 0,  scale: 1   }}
      exit={{    opacity: 0, x: 80, scale: 0.9  }}
      transition={{ type: 'spring', damping: 20, stiffness: 200 }}
      className={`flex items-center gap-3 pl-4 pr-3 py-3 rounded-xl border backdrop-blur-lg shadow-2xl max-w-sm text-sm text-white ${BORDERS[type]}`}
    >
      {ICONS[type]}
      <span className="flex-1 leading-snug">{message}</span>
      <button
        onClick={() => onDismiss(id)}
        className="text-white/40 hover:text-white transition-colors p-0.5 rounded"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </motion.div>
  );
}

// ─── Provider ──────────────────────────────────────────────────────────────

/**
 * Wrap your app with <ToastProvider> to enable toast notifications.
 */
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const dismiss = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  /**
   * Show a toast notification.
   * @param {string} message
   * @param {'success'|'error'|'info'} [type='info']
   * @param {number} [duration=3000] - Auto-dismiss in ms, 0 = no auto-dismiss
   */
  const toast = useCallback((message, type = 'info', duration = 3000) => {
    const id = crypto.randomUUID();
    setToasts(prev => [...prev, { id, message, type }]);
    if (duration > 0) {
      setTimeout(() => dismiss(id), duration);
    }
  }, [dismiss]);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}

      {/* Toast Stack — bottom-right */}
      <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-2 pointer-events-none">
        <AnimatePresence mode="popLayout">
          {toasts.map(t => (
            <div key={t.id} className="pointer-events-auto">
              <ToastItem {...t} onDismiss={dismiss} />
            </div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

// ─── Hook ──────────────────────────────────────────────────────────────────

/**
 * @returns {{ toast: (message: string, type?: 'success'|'error'|'info', duration?: number) => void }}
 */
export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within <ToastProvider>');
  return ctx;
};
