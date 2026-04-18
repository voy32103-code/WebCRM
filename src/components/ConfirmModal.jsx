import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertTriangle, X } from 'lucide-react';

/**
 * Production-grade confirmation modal — replaces window.confirm().
 *
 * @param {Object} props
 * @param {boolean}  props.isOpen
 * @param {string}   props.title
 * @param {string}   props.message
 * @param {string}   [props.confirmLabel='Xác nhận']
 * @param {string}   [props.cancelLabel='Huỷ']
 * @param {'danger'|'warning'|'info'} [props.variant='danger']
 * @param {()=>void} props.onConfirm
 * @param {()=>void} props.onCancel
 */
export default function ConfirmModal({
  isOpen,
  title,
  message,
  confirmLabel = 'Xác nhận',
  cancelLabel = 'Huỷ',
  variant = 'danger',
  onConfirm,
  onCancel,
}) {
  const variantStyles = {
    danger:  { icon: 'bg-red-500/20 text-red-400',    btn: 'bg-red-500 hover:bg-red-600 text-white shadow-[0_0_15px_rgba(239,68,68,0.3)]' },
    warning: { icon: 'bg-yellow-500/20 text-yellow-400', btn: 'bg-yellow-500 hover:bg-yellow-600 text-black shadow-[0_0_15px_rgba(234,179,8,0.3)]' },
    info:    { icon: 'bg-indigo-500/20 text-indigo-400', btn: 'bg-indigo-500 hover:bg-indigo-600 text-white shadow-[0_0_15px_rgba(99,102,241,0.3)]' },
  };
  const s = variantStyles[variant];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="confirm-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCancel}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100]"
          />

          {/* Modal */}
          <motion.div
            key="confirm-modal"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1,   y: 0  }}
            exit={{    opacity: 0, scale: 0.9, y: 20  }}
            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="bg-[#0d0d0d] border border-white/10 rounded-2xl p-6 w-full max-w-md shadow-2xl pointer-events-auto">
              {/* Header */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${s.icon}`}>
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <h3 className="text-white font-semibold text-lg leading-tight">{title}</h3>
                </div>
                <button onClick={onCancel} className="text-white/30 hover:text-white transition-colors p-1 shrink-0">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Message */}
              <p className="text-white/60 text-sm leading-relaxed mb-6 pl-[52px]">{message}</p>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3">
                <button
                  onClick={onCancel}
                  className="px-5 py-2.5 rounded-xl text-sm font-medium text-white/60 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                >
                  {cancelLabel}
                </button>
                <button
                  onClick={onConfirm}
                  className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${s.btn}`}
                >
                  {confirmLabel}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
