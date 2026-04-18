import React from 'react';
import { useDashboard } from '../hooks/useDashboard';
import DashboardMetrics  from './dashboard/DashboardMetrics';
import DashboardToolbar  from './dashboard/DashboardToolbar';
import LeadTableView     from './dashboard/LeadTableView';
import LeadKanbanView    from './dashboard/LeadKanbanView';
import LeadSidePanel     from './dashboard/LeadSidePanel';
import BulkActionBar     from './dashboard/BulkActionBar';
import ConfirmModal      from '../components/ConfirmModal';
import { SkeletonKanban, SkeletonTable } from '../components/Skeleton';

export default function Dashboard() {
  const {
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
  } = useDashboard();

  // Show skeleton only on very first load when leads haven't arrived yet
  const isLoading = false; // controlled by AppContext isLoading when connected to real API

  return (
    <div className="min-h-screen bg-black pt-24 pb-12 px-4 sm:px-6 lg:px-8 font-sans relative overflow-hidden">
      {/* Ambient background */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none mix-blend-screen" />

      <div className="max-w-[1600px] mx-auto relative z-10 flex flex-col h-[calc(100vh-8rem)]">

        {/* Metrics bar */}
        <div className="mb-8 shrink-0">
          <DashboardMetrics
            currentRevenue={currentRevenue}
            targetRevenue={100000}
            progressPercent={progressPercent}
            leads={leads}
            isSlaBreached={isSlaBreached}
          />
        </div>

        {/* Main panel */}
        <div className="flex flex-col flex-1 min-h-0 bg-white/[0.02] border border-white/5 rounded-3xl overflow-hidden backdrop-blur-md shadow-2xl">

          {/* Toolbar */}
          <div className="p-4 lg:p-6 border-b border-white/5 shrink-0 bg-black/20">
            <DashboardToolbar
              viewMode={viewMode}         setViewMode={setViewMode}
              searchTerm={searchTerm}     setSearchTerm={setSearchTerm}
              statusFilter={statusFilter} setStatusFilter={setStatusFilter}
              timeFilter={timeFilter}     setTimeFilter={setTimeFilter}
              handleExportCSV={handleExportCSV}
            />
          </div>

          {/* Content */}
          <div className="flex-1 overflow-hidden relative">
            {isLoading ? (
              viewMode === 'table' ? <SkeletonTable /> : <SkeletonKanban />
            ) : viewMode === 'table' ? (
              <LeadTableView
                filteredLeads={filteredLeads}
                selectedLeadsIds={selectedLeadsIds}
                handleSelectAll={handleSelectAll}
                handleSelectLead={handleSelectLead}
                updateLeadStatus={handleStatusChange}
                getStatusColor={getStatusColor}
                selectedLead={selectedLead}
                setSelectedLead={setSelectedLead}
                setAgentResponse={setAgentResponse}
                isSlaBreached={isSlaBreached}
              />
            ) : (
              <LeadKanbanView
                filteredLeads={filteredLeads}
                selectedLead={selectedLead}
                setSelectedLead={setSelectedLead}
                setAgentResponse={setAgentResponse}
                getStatusColor={getStatusColor}
                updateLeadStatus={handleStatusChange}
                isSlaBreached={isSlaBreached}
              />
            )}
          </div>
        </div>
      </div>

      {/* Side Panel */}
      <LeadSidePanel
        currentSelectedLead={currentSelectedLead}
        setSelectedLead={setSelectedLead}
        updateLeadStatus={handleStatusChange}
        updateLeadNotes={updateLeadNotes}
        updateLeadAssignee={handleUpdateAssignee}
        addLeadComment={handleAddComment}
        handleDeleteLead={handleDeleteLead}
        agentResponse={agentResponse}
        setAgentResponse={setAgentResponse}
        isAgentTyping={isAgentTyping}
        setIsAgentTyping={setIsAgentTyping}
      />

      {/* Bulk Action Bar */}
      <BulkActionBar
        selectedLeadsIds={selectedLeadsIds}
        handleBulkStatusChange={handleBulkStatusChange}
        handleBulkDelete={handleBulkDelete}
        setSelectedLeadsIds={setSelectedLeadsIds}
      />

      {/* Confirm Modal — replaces window.confirm() */}
      <ConfirmModal
        isOpen={confirmModal.open}
        title={confirmModal.config.title}
        message={confirmModal.config.message}
        confirmLabel={confirmModal.config.confirmLabel}
        variant={confirmModal.config.variant}
        onConfirm={confirmModal.config.onConfirm}
        onCancel={closeConfirm}
      />
    </div>
  );
}
