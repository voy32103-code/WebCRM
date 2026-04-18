import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, FileText, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function MyDesignsModal({ isOpen, onClose }) {
  const { currentUser } = useApp();
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && currentUser?.email) {
      fetchMyDesigns();
    }
  }, [isOpen, currentUser]);

  const fetchMyDesigns = async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/user-leads/${currentUser.email}`);
      const data = await res.json();
      if (data.success) {
        setLeads(data.data);
      }
    } catch (err) {
      console.error('Error fetching designs:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'MỚI': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'ĐÃ PHẢN HỒI': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      default: return 'bg-white/5 text-white/50 border-white/10';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <React.Fragment>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90]"
          />
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-black border-l border-white/10 z-[100] flex flex-col p-6 shadow-2xl overflow-y-scroll"
          >
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/10">
              <div>
                <h2 className="text-2xl font-heading italic text-white flex items-center gap-2">
                  <FileText className="w-5 h-5 text-purple-400" />
                  Dự Án Của Tôi
                </h2>
                <p className="text-white/50 text-sm mt-1">Các yêu cầu thiết kế bạn đã gửi</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/50 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 flex flex-col gap-4 pb-12">
              {loading ? (
                <div className="flex-1 flex items-center justify-center">
                  <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                </div>
              ) : leads.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center opacity-50 h-full">
                  <FileText className="w-12 h-12 mb-4" />
                  <p>Bạn chưa gửi yêu cầu thiết kế nào.</p>
                </div>
              ) : (
                leads.map(lead => (
                  <div key={lead.id} className="liquid-glass border border-white/10 rounded-2xl p-5 flex flex-col gap-3">
                    <div className="flex justify-between items-start">
                      <h3 className="text-white font-medium">{lead.name}</h3>
                      <span className={`text-xs px-2.5 py-1 rounded-full border ${getStatusColor(lead.status)}`}>
                        {lead.status}
                      </span>
                    </div>
                    <p className="text-white/60 text-sm italic">"{lead.message}"</p>
                    {lead.ai_draft && (
                      <div className="mt-2 pt-3 border-t border-white/10">
                        <div className="text-xs text-purple-400 mb-2 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Phản hồi từ Studio:
                        </div>
                        <p className="text-white/80 text-sm whitespace-pre-wrap leading-relaxed bg-black/30 p-3 rounded-lg border border-white/5">
                          {lead.ai_draft}
                        </p>
                      </div>
                    )}
                    <div className="text-xs text-white/30 mt-2 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(lead.created_at).toLocaleDateString('vi-VN')}
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </React.Fragment>
      )}
    </AnimatePresence>
  );
}
