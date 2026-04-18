import React from 'react';
import { motion } from 'motion/react';
import { Mail, User, Save, Clock, AlertTriangle } from 'lucide-react';
import QuickViewPopover from '../../components/QuickViewPopover';

const KANBAN_COLUMNS = ['MỚI', 'Đã Liên Hệ', 'Hoàn Thành'];

export default function LeadKanbanView({
  filteredLeads,
  selectedLead,
  setSelectedLead,
  setAgentResponse,
  getStatusColor,
  updateLeadStatus,
  isSlaBreached
}) {
  const getColumnColor = (status) => {
    switch (status) {
      case 'MỚI': return 'border-white/20 hover:border-white/40 bg-white/5';
      case 'Đã Liên Hệ': return 'border-yellow-500/30 hover:border-yellow-500/50 bg-yellow-500/5';
      case 'Hoàn Thành': return 'border-green-500/30 hover:border-green-500/50 bg-green-500/5';
      default: return 'border-white/10';
    }
  };

  const getHeaderColor = (status) => {
    switch (status) {
        case 'MỚI': return 'text-white bg-white/10';
        case 'Đã Liên Hệ': return 'text-yellow-400 bg-yellow-400/10';
        case 'Hoàn Thành': return 'text-green-400 bg-green-400/10';
        default: return 'text-white border-white/10';
    }
  };

  return (
    <div className="flex-1 overflow-x-auto min-h-full custom-scrollbar pb-6">
      <div className="flex gap-4 lg:gap-6 min-w-[800px] lg:min-w-0 h-full items-start">
        {KANBAN_COLUMNS.map((status) => {
          const colLeads = filteredLeads.filter(l => l.status === status);
          return (
            <div key={status} className={`flex-1 flex flex-col liquid-glass rounded-2xl border transition-colors min-h-[500px] shrink-0 w-80 lg:w-auto ${getColumnColor(status)}`}>
              {/* Column Header */}
              <div className="p-4 border-b border-inherit flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold leading-none ${getHeaderColor(status)}`}>
                        {status}
                    </span>
                    <span className="text-white/40 text-sm font-medium">{colLeads.length}</span>
                </div>
              </div>

              {/* Column Body */}
              <div className="p-4 flex-1 flex flex-col gap-3 overflow-y-auto custom-scrollbar">
                {colLeads.map((lead, index) => (
                  <QuickViewPopover key={lead.id} lead={lead} isSlaBreached={isSlaBreached(lead)} position="top">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => {
                        setSelectedLead(lead);
                        setAgentResponse('');
                    }}
                    className={`bg-black/50 border rounded-xl p-4 cursor-pointer hover:bg-black/80 hover:-translate-y-1 transition-all duration-300 flex flex-col ${selectedLead?.id === lead.id ? 'border-primary ring-1 ring-primary/50' : 'border-white/10'} shadow-lg`}
                  >
                    <div className="flex justify-between items-start mb-2 gap-2">
                      <p className="text-white font-medium line-clamp-1">{lead.name || 'Không Tên'}</p>
                      {lead.notes?.includes('[VIP_PAID]') && (
                        <span className="px-1.5 py-0.5 rounded text-[8px] font-bold bg-gradient-to-r from-yellow-400 to-amber-500 text-black shadow-[0_0_10px_rgba(250,204,21,0.4)] shrink-0 mt-0.5">VIP</span>
                      )}
                    </div>
                    
                    <p className="text-white/70 text-xs font-light line-clamp-2 mb-3 h-8">{lead.message}</p>
                    
                    {/* SLA Warning Badge */}
                    {isSlaBreached(lead) && (
                       <div className="mb-3 px-2 py-1 bg-red-600/20 border border-red-500/30 rounded text-[10px] font-bold text-red-400 flex items-center gap-1 w-max">
                          <AlertTriangle className="w-3 h-3" /> VI PHẠM SLA ({'>'}24H)
                       </div>
                    )}
                    
                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/5 text-xs pointer-events-none">
                      <div className="flex items-center gap-2">
                        {lead.assignee && <span className="text-white/60 flex items-center gap-1 bg-white/5 px-1.5 py-0.5 rounded"><User className="w-3 h-3" /> {lead.assignee}</span>}
                        {lead.notes && <span className="text-indigo-400 flex items-center gap-1"><Save className="w-3 h-3" /></span>}
                      </div>
                      <span className="text-white/30 flex items-center gap-1"><Clock className="w-3 h-3" /> {new Date(lead.date).toLocaleDateString('vi-VN')}</span>
                    </div>
                  </motion.div>
                  </QuickViewPopover>
                ))}
                
                {colLeads.length === 0 && (
                  <div className="flex-1 flex items-center justify-center border-2 border-dashed border-white/5 rounded-xl">
                    <p className="text-white/20 text-sm font-medium">Trống</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
