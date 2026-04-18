import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Auth from './pages/Auth';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Account from './pages/Account';
import Settings from './pages/Settings';
import Analytics from './pages/Analytics';
import ClientPortal from './pages/ClientPortal';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Auth type="login" />} />
      <Route path="/register" element={<Auth type="register" />} />
      
      {/* Trong DashboardLayout sẽ bọc giao diện chung cho các màn ở dashboard */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="portal" element={<ClientPortal />} />
        <Route path="account" element={<Account />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default App;
