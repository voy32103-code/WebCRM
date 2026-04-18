import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Clock, User, AlertTriangle, MessageCircle, FileText, ChevronRight } from 'lucide-react';
import { formatDate } from '../utils/format';
import { LEAD_STATUS } from '../constants';

const STATUS_DOT = {
  [LEAD_STATUS.NEW]:       'bg-white',
  [LEAD_STATUS.CONTACTED]: 'bg-yellow-400',
  [LEAD_STATUS.DONE]:      'bg-green-400',
};

/**
 * Quick View Popover — xuất hiện khi hover vào thẻ Kanban/Table.
 * Hiện nhanh thông tin mà không cần mở Side Panel.
 *
 * @param {Object} props
 * @param {Object}    props.lead           - Lead data object
 * @param {boolean}   props.isSlaBreached  - SLA status
 * @param {ReactNode} props.children       - Element kích hoạt hover
 * @param {'top'|'bottom'} [props.position='top']
 */
export default function QuickViewPopover({ lead, isSlaBreached, children, position = 'top' }) {
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef(null);

  const show = useCallback(() => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setVisible(true), 300); // 300ms delay
  }, []);

  const hide = useCallback(() => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setVisible(false), 150);
  }, []);

  const positionClass = position === 'top'
    ? 'bottom-[calc(100%+12px)] left-1/2 -translate-x-1/2'
    : 'top-[calc(100%+12px)] left-1/2 -translate-x-1/2';

  const arrowClass = position === 'top'
    ? 'top-full left-1/2 -translate-x-1/2 border-t-[#1a1a1a] border-x-transparent border-b-transparent'
    : 'bottom-full left-1/2 -translate-x-1/2 border-b-[#1a1a1a] border-x-transparent border-t-transparent';

  return (
    <div className="relative" onMouseEnter={show} onMouseLeave={hide}>
      {children}

      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: position === 'top' ? 8 : -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{    opacity: 0, scale: 0.92, y: position === 'top' ? 8 : -8 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className={`absolute ${positionClass} z-50 w-72 pointer-events-none`}
          >
            {/* Arrow */}
            <div className={`absolute w-0 h-0 border-[6px] ${arrowClass}`} />

            {/* Card */}
            <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-4 shadow-2xl shadow-black/60">
              {/* Header */}
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="flex-1 min-w-0">
                  <p className="text-white font-semibold text-sm truncate">{lead.name || 'Không Tên'}</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <Mail className="w-3 h-3 text-white/30 shrink-0" />
                    <p className="text-white/50 text-xs truncate">{lead.email}</p>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className={`w-1.5 h-1.5 rounded-full ${STATUS_DOT[lead.status] || 'bg-white/30'}`} />
                  <span className="text-white/60 text-[10px] font-medium">{lead.status}</span>
                </div>
              </div>

              {/* SLA Alert */}
              {isSlaBreached && (
                <div className="flex items-center gap-1.5 bg-red-500/10 border border-red-500/20 rounded-lg px-2.5 py-1.5 mb-3">
                  <AlertTriangle className="w-3 h-3 text-red-400 shrink-0" />
                  <span className="text-red-400 text-[10px] font-bold">VI PHẠM SLA — Quá 24h chưa xử lý</span>
                </div>
              )}

              {/* Message preview */}
              <p className="text-white/60 text-xs leading-relaxed line-clamp-2 mb-3 border-t border-white/5 pt-3">
                {lead.message || '(Không có nội dung)'}
              </p>

              {/* Stats row */}
              <div className="flex items-center gap-3 text-[10px] text-white/40">
                {lead.assignee && (
                  <span className="flex items-center gap-1">
                    <User className="w-3 h-3" /> {lead.assignee}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <MessageCircle className="w-3 h-3" /> {lead.comments?.length || 0} tin
                </span>
                <span className="flex items-center gap-1">
                  <FileText className="w-3 h-3" /> {lead.files?.length || 0} file
                </span>
                <span className="flex items-center gap-1 ml-auto">
                  <Clock className="w-3 h-3" /> {formatDate(lead.date)}
                </span>
              </div>

              {/* Click hint */}
              <p className="text-white/20 text-[9px] mt-2 pt-2 border-t border-white/5 flex items-center gap-1">
                <ChevronRight className="w-3 h-3" /> Nhấn để xem chi tiết đầy đủ
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
