import React from 'react';
import { motion } from 'motion/react';
import { Mail, Save, AlertTriangle, Clock, User } from 'lucide-react';

export default function LeadTableView({
  filteredLeads, 
  selectedLeadsIds, 
  handleSelectAll, 
  handleSelectLead, 
  updateLeadStatus, 
  getStatusColor, 
  selectedLead, 
  setSelectedLead, 
  setAgentResponse, 
  isSlaBreached
}) {
  return (
    <div className="flex-1 overflow-x-auto min-h-full custom-scrollbar">
      <table className="w-full text-left font-body text-sm">
        <thead className="border-b border-white/5 bg-white/[0.02]">
          <tr>
            <th className="px-6 py-5 text-center w-12 hidden md:table-cell">
               <input 
                 type="checkbox" 
                 className="w-4 h-4 rounded border-white/20 bg-black/50 accent-indigo-500 cursor-pointer"
                 onChange={handleSelectAll}
                 checked={selectedLeadsIds.length === filteredLeads.length && filteredLeads.length > 0}
               />
            </th>
            <th className="px-6 py-5 text-white/50 font-medium">Trạng thái</th>
            <th className="px-6 py-5 text-white/50 font-medium">Khách hàng</th>
            <th className="px-6 py-5 text-white/50 font-medium pl-0 hidden lg:table-cell">Nội dung tóm tắt</th>
            <th className="px-6 py-5 text-white/50 font-medium text-right">Ngày gửi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {filteredLeads.length === 0 ? (
            <tr>
              <td colSpan="5" className="px-6 py-16 text-center text-white/30 italic">
                Không tìm thấy yêu cầu nào!
              </td>
            </tr>
          ) : (
            filteredLeads.map((lead, index) => (
              <motion.tr 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                key={lead.id} 
                onClick={() => {
                    setSelectedLead(lead);
                    setAgentResponse('');
                }}
                className={`transition-colors cursor-pointer group hover:bg-white/[0.02] ${selectedLeadsIds.includes(lead.id) ? 'bg-indigo-500/10' : (selectedLead?.id === lead.id ? 'bg-white/5' : '')}`}
              >
                <td className="px-6 py-6 text-center hidden md:table-cell" onClick={e => e.stopPropagation()}>
                   <input 
                     type="checkbox" 
                     className="w-4 h-4 rounded border-white/20 bg-black/50 accent-indigo-500 cursor-pointer pointer-events-auto"
                     checked={selectedLeadsIds.includes(lead.id)}
                     onChange={() => handleSelectLead(lead.id)}
                   />
                </td>
                <td className="px-6 py-6 align-top w-40" onClick={e => e.stopPropagation()}>
                  <select 
                    value={lead.status}
                    onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                    className={`inline-flex py-1 px-3 items-center gap-1.5 rounded-full text-xs font-medium border appearance-none outline-none cursor-pointer transition-colors ${getStatusColor(lead.status)}`}
                  >
                    <option value="MỚI" className="bg-black text-white">MỚI</option>
                    <option value="Đã Liên Hệ" className="bg-black text-yellow-400">Đã Liên Hệ</option>
                    <option value="Hoàn Thành" className="bg-black text-green-400">Hoàn Thành</option>
                  </select>
                </td>
                <td className="px-6 py-6 align-top w-56">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-white font-medium truncate">{lead.name || 'Không Tên'}</p>
                    {lead.notes?.includes('[VIP_PAID]') && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-gradient-to-r from-yellow-400 to-amber-500 text-black shadow-[0_0_10px_rgba(250,204,21,0.4)] shrink-0">VIP ĐÃ CỌC</span>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 text-white/50 text-xs text-ellipsis overflow-hidden mt-1">
                    <Mail className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{lead.email}</span>
                  </div>
                  {lead.assignee && (
                    <div className="flex items-center gap-1.5 text-indigo-400 text-xs mt-1 bg-indigo-500/10 w-fit px-2 py-0.5 rounded border border-indigo-500/20">
                      <User className="w-3 h-3 shrink-0" />
                      <span className="truncate">{lead.assignee}</span>
                    </div>
                  )}
                </td>
                <td className="px-6 py-6 align-top pl-0 hidden lg:table-cell w-1/3">
                  <p className="text-white/70 leading-relaxed font-light line-clamp-2">{lead.message}</p>
                  <div className="mt-2 flex gap-2">
                    {lead.notes && (
                      <div className="text-xs text-indigo-300 font-medium flex items-center gap-1 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                        <Save className="w-3 h-3" /> Có ghi chú
                      </div>
                    )}
                    {isSlaBreached(lead) && (
                      <div className="text-xs font-bold text-red-500 bg-red-500/10 rounded px-2 py-0.5 border border-red-500/20 animate-pulse flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3"/> SLA TRỄ HẠN
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-6 align-top text-right whitespace-nowrap">
                  <div className="flex items-center justify-end gap-2 text-white/40 text-xs mt-1">
                    <Clock className="w-3.5 h-3.5" />
                    {new Date(lead.date).toLocaleDateString('vi-VN')}
                  </div>
                </td>
              </motion.tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
