import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  // Trạng thái đăng nhập
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('currentUser');
    return saved ? JSON.parse(saved) : null;
  });

  // Lưu danh sách Yêu cầu vào local storage
  const [leads, setLeads] = useState(() => {
    const savedLeads = localStorage.getItem('leads');
    if (savedLeads) {
      return JSON.parse(savedLeads);
    }
    return [
      {
        id: 1,
        name: 'Nguyen Van A',
        email: 'nva@company.com',
        message: 'Tôi muốn xây dựng một chuyên trang landing page cao cấp.',
        status: 'MỚI',
        date: new Date().toISOString(),
        comments: [],
        files: [
          { name: 'Brand_Guidelines.pdf', type: 'application/pdf', size: '2.4 MB', url: '#' }
        ],
        contract: { signed: false, signedAt: null, template: 'Hợp đồng Dịch vụ Thiết kế WebCRM - Mẫu Tiêu Chuẩn' },
        auditLogs: [
          { action: 'Khách hàng gửi yêu cầu', user: 'System', timestamp: new Date().toISOString() }
        ],
        assignee: null
      }
    ];
  });

  // Đồng bộ với localStorage mỗi khi đổi giá trị
  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated);
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [isAuthenticated, currentUser]);

  useEffect(() => {
    localStorage.setItem('leads', JSON.stringify(leads));
  }, [leads]);

  // Fetch từ Database khi App tải lên lần đầu
  useEffect(() => {
    fetch('/api/leads')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data && data.data.length > 0) {
          const formattedLeads = data.data.map(item => ({
            id: item.id,
            name: item.name,
            email: item.email,
            message: item.message,
            aiDraft: item.ai_draft,
            status: item.status,
            notes: item.notes || '',
            date: item.created_at,
            comments: item.comments || [],
            files: item.files || [],
            contract: item.contract || { signed: false, signedAt: null, template: 'Hợp đồng Dịch vụ Thiết kế WebCRM - Mẫu Tiêu Chuẩn' },
            auditLogs: item.auditLogs || [],
            assignee: item.assignee || null
          }));
          setLeads(formattedLeads);
        }
      })
      .catch(err => console.error('Lỗi lấy danh sách khách hàng từ DB:', err));
  }, []);

  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('antigravity_settings');
    if (saved) return JSON.parse(saved);
    return {
      geminiApiKey: '',
      emailNotifications: true,
      smsNotifications: false,
    };
  });

  // Lưu xuống localStorage mỗi khi config thay đổi
  useEffect(() => {
    localStorage.setItem('antigravity_settings', JSON.stringify(settings));
  }, [settings]);

  const updateSettings = (updates) => {
    setSettings((prev) => ({ ...prev, ...updates }));
  };

  const addLead = async (lead) => {
    const newLead = {
      ...lead,
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
      status: 'MỚI',
      notes: '', // Thêm trường ghi chú cho tính năng CRM
      comments: [],
      files: [],
      contract: { signed: false, signedAt: null, template: 'Hợp đồng Dịch vụ Thiết kế WebCRM - Mẫu Tiêu Chuẩn' },
      auditLogs: [{ action: 'Thêm mới yêu cầu', user: lead.name, timestamp: new Date().toISOString() }],
      assignee: null
    };
    
    // Ghi vào state Frontend (để UI cập nhật ngay lập tức)
    setLeads((prevLeads) => [newLead, ...prevLeads]);

    // Đẩy ngầm dữ liệu gốc xuống Backend API để lưu vào PostgreSQL
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: lead.name,
          email: lead.email,
          message: lead.message || '',
          aiDraft: lead.aiDraft || '',
          status: 'MỚI'
        })
      });
      const result = await response.json();
      if (result.success && result.data) {
        // Cập nhật lại ID thực từ Database cho bản nháp tạm
        setLeads(prev => prev.map(l => l.id === newLead.id ? { ...l, id: result.data.id } : l));
      }
    } catch (err) {
      console.error('Lỗi khi đẩy dữ liệu xuống DB:', err);
    }
  };

  const updateLeadStatus = async (id, newStatus) => {
    setLeads(prev => prev.map(lead => {
      if (lead.id === id) {
        const timestamp = new Date().toISOString();
        const newLog = { id: crypto.randomUUID(), action: `Chuyển trạng thái thành ${newStatus}`, by: currentUser?.name || 'Admin', timestamp };
        
        // Automated Workflow Trigger: Sinh biên bản nghiệm thu khi Hoàn Thành
        let newFiles = lead.files || [];
        let newComments = lead.comments || [];
        
        if (newStatus === 'Hoàn Thành' && lead.status !== 'Hoàn Thành') {
           newFiles = [...newFiles, { name: `Biên bản nghiệm thu_Dự án_${lead.id.toString().substring(0,6)}.pdf`, type: 'application/pdf', size: '1.2 MB', url: '#' }];
           newComments = [...newComments, { id: crypto.randomUUID(), role: 'system', content: 'Dự án đã được nghiệm thu và số hoá hệ thống. File chứng nhận đã được gửi vào Kho Tài Nguyên.', timestamp }];
           newLog.action += ' (Kích hoạt Workflow)';
        }

        return { ...lead, status: newStatus, comments: newComments, files: newFiles, auditLogs: [...(lead.auditLogs || []), newLog] };
      }
      return lead;
    }));
    try {
      await fetch(`/api/leads/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
    } catch (err) { console.error(err); }
  };

  const updateLeadAssignee = (id, assigneeName) => {
    setLeads(prev => prev.map(lead => {
      if (lead.id === id) {
        const newLog = { id: crypto.randomUUID(), action: `Gán phụ trách cho: ${assigneeName || 'Chưa gán'}`, by: currentUser?.name || 'Admin', timestamp: new Date().toISOString() };
        return { ...lead, assignee: assigneeName, auditLogs: [...(lead.auditLogs || []), newLog] };
      }
      return lead;
    }));
  };

  const updateLeadNotes = async (id, notes) => {
    setLeads(prev => prev.map(lead => lead.id === id ? { ...lead, notes } : lead));
    try {
      await fetch(`/api/leads/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes })
      });
    } catch (err) { console.error(err); }
  };

  // Signature: (id, content: string, role: 'admin'|'client'|'system')
  const addLeadComment = (id, content, role = 'admin') => {
    setLeads(prev => prev.map(lead => {
      if (lead.id === id) {
        const timestamp = new Date().toISOString();
        const newCommentObj = { id: crypto.randomUUID(), content, role, timestamp };
        const newLog = { id: crypto.randomUUID(), action: 'Thêm bình luận mới', by: currentUser?.name || 'Admin', timestamp };
        return { 
          ...lead, 
          comments: [...(lead.comments || []), newCommentObj],
          auditLogs: [...(lead.auditLogs || []), newLog]
        };
      }
      return lead;
    }));
  };

  const signContract = (id) => {
    setLeads(prev => prev.map(lead => {
      if (lead.id === id) {
        const newLog = { id: crypto.randomUUID(), action: 'Đã ký hợp đồng điện tử', by: currentUser?.name || lead.name, timestamp: new Date().toISOString() };
        return { 
          ...lead, 
          contract: { ...lead.contract, signed: true, signedAt: new Date().toISOString() },
          auditLogs: [...(lead.auditLogs || []), newLog]
        };
      }
      return lead;
    }));
  };

  const deleteLead = async (id) => {
    setLeads(prev => prev.filter(lead => lead.id !== id));
    try {
      await fetch(`/api/leads/${id}`, { method: 'DELETE' });
    } catch (err) { console.error(err); }
  };

  const login = (user) => {
    setIsAuthenticated(true);
    setCurrentUser(user);
    localStorage.setItem('antigravity_auth', 'true');
    localStorage.setItem('antigravity_user', JSON.stringify(user));
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    localStorage.removeItem('antigravity_auth');
    localStorage.removeItem('antigravity_user');
  };

  return (
    <AppContext.Provider value={{ 
      isAuthenticated, 
      currentUser, 
      login, 
      logout,
      setCurrentUser,
      leads,
      addLead,
      updateLeadStatus,
      updateLeadNotes,
      deleteLead,
      addLeadComment,
      signContract,
      updateLeadAssignee,
      settings,
      updateSettings
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
