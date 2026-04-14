import React from 'react';
import { Outlet, Navigate, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, Settings, LogOut, Hexagon } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function DashboardLayout() {
  const { isAuthenticated, logout, currentUser } = useApp();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const navItems = [
    { name: 'Quản Lý Yêu Cầu', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Tài Khoản', path: '/dashboard/account', icon: Users },
    { name: 'Cài Đặt', path: '/dashboard/settings', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-[#0a0a0a] text-foreground font-body overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 border-r border-white/5 bg-black/50 backdrop-blur-xl flex flex-col justify-between">
        <div>
          <div className="p-6">
            <Link to="/" className="flex items-center gap-3 liquid-glass rounded-2xl p-3 px-4 w-max hover:bg-white/10 transition-colors">
              <Hexagon className="w-6 h-6 text-white shrink-0" />
              <span className="font-heading italic text-lg text-white font-bold tracking-tight">Studio.</span>
            </Link>
          </div>
          
          <nav className="mt-6 px-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    isActive 
                      ? 'bg-white/10 text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]' 
                      : 'text-white/60 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium text-sm">{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-6 border-t border-white/5">
          <div className="flex items-center gap-3 mb-6 px-2">
            <div className="w-10 h-10 rounded-full liquid-glass flex items-center justify-center shrink-0">
              <span className="font-heading italic text-white">Ad</span>
            </div>
            <div className="overflow-hidden">
              <p className="text-white text-sm font-medium truncate">{currentUser?.email || 'admin@studio.com'}</p>
              <p className="text-white/50 text-xs">Quản trị viên</p>
            </div>
          </div>
          
          <button 
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-red-400 hover:bg-red-500/10"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium text-sm">Đăng xuất</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto w-full">
        <Outlet />
      </main>
    </div>
  );
}
