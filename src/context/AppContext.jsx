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
        date: new Date().toISOString()
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

  const addLead = (lead) => {
    const newLead = {
      ...lead,
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString(),
      status: 'MỚI',
      notes: '' // Thêm trường ghi chú cho tính năng CRM
    };
    setLeads([newLead, ...leads]);
  };

  const updateLeadStatus = (id, newStatus) => {
    setLeads(leads.map(lead => lead.id === id ? { ...lead, status: newStatus } : lead));
  };

  const updateLeadNotes = (id, notes) => {
    setLeads(leads.map(lead => lead.id === id ? { ...lead, notes } : lead));
  };

  const deleteLead = (id) => {
    setLeads(leads.filter(lead => lead.id !== id));
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
      settings,
      updateSettings
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
