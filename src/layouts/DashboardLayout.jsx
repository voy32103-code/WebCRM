import React, { useState } from 'react';
import { Outlet, Navigate, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, Settings, LogOut, Hexagon, BarChart3, FolderGit2, Sun, Moon, HelpCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useTheme } from '../context/ThemeContext';
import OnboardingWalkthrough from '../components/OnboardingWalkthrough';

export default function DashboardLayout() {
  const { isAuthenticated, logout, currentUser } = useApp();
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();
  const [showOnboarding, setShowOnboarding] = useState(false);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const isAdmin = currentUser?.role === 'admin';

  if (!isAdmin && (location.pathname === '/dashboard' || location.pathname === '/dashboard/analytics' || location.pathname === '/dashboard/settings')) {
    return <Navigate to="/dashboard/portal" replace />;
  }

  if (isAdmin && location.pathname === '/dashboard/portal') {
    return <Navigate to="/dashboard" replace />;
  }

  const navItems = [
    ...(isAdmin ? [
      { name: 'Quản Lý Yêu Cầu', path: '/dashboard', icon: LayoutDashboard },
      { name: 'AI Báo Cáo', path: '/dashboard/analytics', icon: BarChart3 }
    ] : [
      { name: 'Dự Án Của Tôi', path: '/dashboard/portal', icon: FolderGit2 }
    ]),
    { name: 'Tài Khoản', path: '/dashboard/account', icon: Users },
    ...(isAdmin ? [{ name: 'Cài Đặt', path: '/dashboard/settings', icon: Settings }] : []),
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
          {/* User info */}
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-10 h-10 rounded-full liquid-glass flex items-center justify-center shrink-0">
              <span className="font-heading italic text-white uppercase">{currentUser?.email?.substring(0, 2) || 'Ad'}</span>
            </div>
            <div className="overflow-hidden">
              <p className="text-white text-sm font-medium truncate">{currentUser?.email || 'admin@studio.com'}</p>
              <p className="text-white/50 text-xs">{isAdmin ? 'Quản trị viên' : 'Khách hàng'}</p>
            </div>
          </div>

          {/* Utility row: Theme Toggle + Help */}
          <div className="flex gap-2 mb-3">
            <button
              onClick={toggleTheme}
              title={isDark ? 'Chuyển sang Light Mode' : 'Chuyển sang Dark Mode'}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-white/60 hover:text-white hover:bg-white/5 border border-white/5 transition-all text-xs font-medium"
            >
              {isDark
                ? <Sun  className="w-4 h-4 text-yellow-400" />
                : <Moon className="w-4 h-4 text-indigo-400" />}
              <span>{isDark ? 'Light' : 'Dark'}</span>
            </button>

            <button
              onClick={() => setShowOnboarding(true)}
              title="Xem lại hướng dẫn sử dụng"
              className="w-10 h-10 flex items-center justify-center rounded-xl text-white/40 hover:text-white hover:bg-white/5 border border-white/5 transition-all"
            >
              <HelpCircle className="w-4 h-4" />
            </button>
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

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto w-full">
        <Outlet />
      </main>

      {/* Onboarding Walkthrough */}
      <OnboardingWalkthrough
        forceShow={showOnboarding}
        onComplete={() => setShowOnboarding(false)}
      />
    </div>
  );
}
