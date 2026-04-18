import { useState, useMemo, useCallback, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { useToast } from '../components/Toast';
import { isSlaBreached as checkSla } from '../utils/format';
import {
  TARGET_REVENUE,
  REVENUE_PER_DEAL,
  LEAD_STATUS,
} from '../constants';

/**
 * Custom hook encapsulating all Dashboard business logic.
 * Keeps Dashboard.jsx as a pure layout/composition component.
 *
 * @returns Dashboard state + derived values + action handlers
 */
export function useDashboard() {
  const { leads, updateLeadStatus, updateLeadNotes, deleteLead, addLeadComment, updateLeadAssignee } = useApp();
  const { toast } = useToast();

  // ── UI State ──────────────────────────────────────────────────────────────
  const [searchTerm,       setSearchTerm]       = useState('');
  const [statusFilter,     setStatusFilter]     = useState('ALL');
  const [timeFilter,       setTimeFilter]       = useState('ALL');
  const [viewMode,         setViewMode]         = useState('kanban');
  const [selectedLead,     setSelectedLead]     = useState(null);
  const [selectedLeadsIds, setSelectedLeadsIds] = useState([]);
  const [agentResponse,    setAgentResponse]    = useState('');
  const [isAgentTyping,    setIsAgentTyping]    = useState(false);
  const [confirmModal,     setConfirmModal]     = useState({ open: false, config: {} });

  // Keep selectedLead in sync with latest leads data (e.g. after comment added)
  const currentSelectedLead = useMemo(
    () => leads.find(l => l.id === selectedLead?.id) ?? null,
    [leads, selectedLead?.id]
  );

  // ── Derived / Memoized ───────────────────────────────────────────────────

  const currentRevenue = useMemo(
    () => leads.filter(l => l.status === LEAD_STATUS.DONE || l.notes?.includes('[VIP_PAID]')).length * REVENUE_PER_DEAL,
    [leads]
  );

  const progressPercent = useMemo(
    () => Math.min((currentRevenue / TARGET_REVENUE) * 100, 100),
    [currentRevenue]
  );

  const isSlaBreached = useCallback((lead) => checkSla(lead), []);

  const filteredLeads = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return leads.filter(lead => {
      const matchSearch =
        lead.name?.toLowerCase().includes(term) ||
        lead.email?.toLowerCase().includes(term) ||
        lead.message?.toLowerCase().includes(term);

      const matchStatus = statusFilter === 'ALL' || lead.status === statusFilter;

      let matchTime = true;
      if (timeFilter !== 'ALL') {
        const leadDate = new Date(lead.date);
        const now = new Date();
        if      (timeFilter === 'TODAY') matchTime = leadDate.toDateString() === now.toDateString();
        else if (timeFilter === 'WEEK')  matchTime = (now - leadDate) <= 7 * 86_400_000;
        else if (timeFilter === 'MONTH') matchTime = leadDate.getMonth() === now.getMonth() && leadDate.getFullYear() === now.getFullYear();
      }

      return matchSearch && matchStatus && matchTime;
    });
  }, [leads, searchTerm, statusFilter, timeFilter]);

  // ── Keyboard Shortcuts ───────────────────────────────────────────────────

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (confirmModal.open) return setConfirmModal({ open: false, config: {} });
        setSelectedLead(null);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [confirmModal.open]);

  // ── Helpers ───────────────────────────────────────────────────────────────

  const openConfirm = useCallback((config) => {
    setConfirmModal({ open: true, config });
  }, []);

  const closeConfirm = useCallback(() => {
    setConfirmModal({ open: false, config: {} });
  }, []);

  // ── Action Handlers ──────────────────────────────────────────────────────

  const handleSelectAll = useCallback((e) => {
    setSelectedLeadsIds(e.target.checked ? filteredLeads.map(l => l.id) : []);
  }, [filteredLeads]);

  const handleSelectLead = useCallback((id) => {
    setSelectedLeadsIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  }, []);

  const handleStatusChange = useCallback((id, newStatus) => {
    updateLeadStatus(id, newStatus);
    toast(`Đã chuyển trạng thái sang "${newStatus}"`, 'success');
  }, [updateLeadStatus, toast]);

  const handleUpdateAssignee = useCallback((id, name) => {
    updateLeadAssignee(id, name);
    toast(name ? `Đã gán phụ trách: ${name}` : 'Đã huỷ gán phụ trách', 'info');
  }, [updateLeadAssignee, toast]);

  const handleBulkStatusChange = useCallback((newStatus) => {
    selectedLeadsIds.forEach(id => updateLeadStatus(id, newStatus));
    toast(`Đã cập nhật ${selectedLeadsIds.length} yêu cầu → "${newStatus}"`, 'success');
    setSelectedLeadsIds([]);
  }, [selectedLeadsIds, updateLeadStatus, toast]);

  const handleBulkDelete = useCallback(() => {
    openConfirm({
      title: `Xoá ${selectedLeadsIds.length} hồ sơ?`,
      message: 'Hành động này không thể hoàn tác. Tất cả dữ liệu liên quan sẽ bị xoá vĩnh viễn.',
      confirmLabel: 'Xoá tất cả',
      variant: 'danger',
      onConfirm: () => {
        selectedLeadsIds.forEach(id => deleteLead(id));
        if (selectedLeadsIds.includes(selectedLead?.id)) setSelectedLead(null);
        setSelectedLeadsIds([]);
        toast(`Đã xoá ${selectedLeadsIds.length} hồ sơ`, 'success');
        closeConfirm();
      },
    });
  }, [selectedLeadsIds, deleteLead, selectedLead?.id, openConfirm, closeConfirm, toast]);

  const handleDeleteLead = useCallback((id, name) => {
    openConfirm({
      title: 'Xoá hồ sơ khách hàng?',
      message: `Bạn sắp xoá vĩnh viễn hồ sơ của "${name}". Hành động này không thể hoàn tác.`,
      confirmLabel: 'Xoá vĩnh viễn',
      variant: 'danger',
      onConfirm: () => {
        deleteLead(id);
        setSelectedLead(null);
        toast('Đã xoá hồ sơ khách hàng', 'success');
        closeConfirm();
      },
    });
  }, [deleteLead, openConfirm, closeConfirm, toast]);

  const handleAddComment = useCallback((leadId, content, role = 'admin') => {
    if (!content.trim()) return;
    addLeadComment(leadId, content, role);
  }, [addLeadComment]);

  const handleExportCSV = useCallback(() => {
    const headers = ['ID', 'Tên', 'Email', 'Trạng thái', 'Ngày gửi', 'Nội dung'];
    const rows = filteredLeads.map(l =>
      `${l.id},"${l.name || ''}","${l.email}",${l.status},${new Date(l.date).toLocaleDateString()},"${(l.message || '').replace(/"/g, '""')}"`
    );
    const csv = 'data:text/csv;charset=utf-8,\uFEFF' + headers.join(',') + '\n' + rows.join('\n');
    const link = Object.assign(document.createElement('a'), {
      href: encodeURI(csv),
      download: `crm_export_${Date.now()}.csv`,
    });
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast(`Đã xuất ${filteredLeads.length} bản ghi CSV`, 'info');
  }, [filteredLeads, toast]);

  const getStatusColor = useCallback((status) => {
    const map = {
      [LEAD_STATUS.NEW]:       'text-white border-white/20',
      [LEAD_STATUS.CONTACTED]: 'text-yellow-400 border-yellow-400/30',
      [LEAD_STATUS.DONE]:      'text-green-400 border-green-400/30',
    };
    return map[status] ?? 'text-white/50 border-white/10';
  }, []);

  return {
    // State
    searchTerm, setSearchTerm,
    statusFilter, setStatusFilter,
    timeFilter, setTimeFilter,
    viewMode, setViewMode,
    selectedLead, setSelectedLead,
    selectedLeadsIds, setSelectedLeadsIds,
    agentResponse, setAgentResponse,
    isAgentTyping, setIsAgentTyping,
    confirmModal, closeConfirm,

    // Derived
    leads,
    filteredLeads,
    currentSelectedLead,
    currentRevenue,
    progressPercent,
    isSlaBreached,

    // Handlers
    handleSelectAll,
    handleSelectLead,
    handleStatusChange,
    handleUpdateAssignee,
    handleBulkStatusChange,
    handleBulkDelete,
    handleDeleteLead,
    handleAddComment,
    handleExportCSV,
    getStatusColor,
    updateLeadNotes,
  };
}
