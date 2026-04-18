import React from 'react';
import { Search, Filter, LayoutDashboard, List, Download, Calendar } from 'lucide-react';

export default function DashboardToolbar({
  viewMode, setViewMode,
  searchTerm, setSearchTerm,
  statusFilter, setStatusFilter,
  timeFilter, setTimeFilter,
  handleExportCSV
}) {
  return (
    <div className="flex flex-col md:flex-row gap-4 items-center w-full">
      {/* Toggle Mode */}
      <div className="flex bg-black/40 border border-white/10 rounded-xl p-1 md:w-auto w-full justify-center shrink-0">
        <button 
          onClick={() => setViewMode('kanban')}
          className={`flex px-4 py-2.5 rounded-lg items-center gap-2 text-sm font-medium transition-colors ${viewMode === 'kanban' ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white/80'}`}
        >
          <LayoutDashboard className="w-4 h-4" /> Kanban
        </button>
        <button 
          onClick={() => setViewMode('table')}
          className={`flex px-4 py-2.5 rounded-lg items-center gap-2 text-sm font-medium transition-colors ${viewMode === 'table' ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white/80'}`}
        >
          <List className="w-4 h-4" /> Danh Sách
        </button>
      </div>

      <div className="relative flex-1 w-full">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 w-4 h-4" />
        <input 
          type="text" 
          placeholder="Tìm kiếm theo Tên, Email hoặc Nội dung..." 
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full bg-black/40 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-white/40 transition-colors font-body text-sm"
        />
      </div>
      <div className="relative w-full md:w-auto shrink-0 flex gap-2">
        <div className="relative">
          <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 w-4 h-4" />
          <select 
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="w-full md:w-44 bg-black/40 border border-white/10 rounded-xl pl-10 pr-4 py-3.5 text-white appearance-none focus:outline-none focus:border-white/40 transition-colors font-body text-sm cursor-pointer"
          >
            <option value="ALL">Mọi trạng thái</option>
            <option value="MỚI">MỚI</option>
            <option value="Đã Liên Hệ">Đã Liên Hệ</option>
            <option value="Hoàn Thành">Hoàn Thành</option>
          </select>
        </div>
        
        <div className="relative hidden md:block">
          <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 w-4 h-4" />
          <select 
            value={timeFilter}
            onChange={e => setTimeFilter(e.target.value)}
            className="w-full md:w-40 bg-black/40 border border-white/10 rounded-xl pl-10 pr-4 py-3.5 text-white appearance-none focus:outline-none focus:border-white/40 transition-colors font-body text-sm cursor-pointer"
          >
            <option value="ALL">Mọi thời điểm</option>
            <option value="TODAY">Hôm nay</option>
            <option value="WEEK">Tuần này</option>
            <option value="MONTH">Tháng này</option>
          </select>
        </div>

        <button 
          onClick={handleExportCSV}
          className="flex px-4 py-3.5 bg-green-500 hover:bg-green-600 rounded-xl items-center gap-2 text-sm font-medium transition-colors text-white whitespace-nowrap border border-green-400"
          title="Xuất Excel/CSV"
        >
          <Download className="w-4 h-4" /> <span className="hidden lg:inline">Xuất CSV</span>
        </button>
      </div>
    </div>
  );
}
