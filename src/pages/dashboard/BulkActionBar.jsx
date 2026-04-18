import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, CheckSquare } from 'lucide-react';

export default function BulkActionBar({
  selectedLeadsIds,
  handleBulkStatusChange,
  handleBulkDelete,
  setSelectedLeadsIds
}) {
  return (
    <AnimatePresence>
      {selectedLeadsIds.length > 0 && (
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-xl border border-indigo-500/50 shadow-[0_0_30px_rgba(99,102,241,0.2)] rounded-2xl px-6 py-4 flex items-center gap-6 z-40"
        >
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-500 text-white font-bold text-xs">
              {selectedLeadsIds.length}
            </span>
            <span className="text-white/80 text-sm">đã chọn</span>
          </div>
          
          <div className="w-px h-8 bg-white/10"></div>
          
          <div className="flex items-center gap-3">
             <button 
               onClick={() => handleBulkStatusChange('Đã Liên Hệ')}
               className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-500 text-sm font-medium transition-colors border border-yellow-500/30"
             >
               <CheckSquare className="w-4 h-4"/> Đánh dấu "Đã Liên Hệ"
             </button>
             <button 
               onClick={() => handleBulkStatusChange('Hoàn Thành')}
               className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-green-500/20 hover:bg-green-500/30 text-green-500 text-sm font-medium transition-colors border border-green-500/30"
             >
               <CheckSquare className="w-4 h-4"/> Đánh dấu "Hoàn Thành"
             </button>
             <button 
               onClick={handleBulkDelete}
               className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-500 text-sm font-medium transition-colors border border-red-500/30"
             >
               <Trash2 className="w-4 h-4"/> Xoá
             </button>
          </div>

          <div className="w-px h-8 bg-white/10"></div>

          <button 
            onClick={() => setSelectedLeadsIds([])}
            className="p-1 text-white/50 hover:text-white"
          >
            <X className="w-5 h-5"/>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
