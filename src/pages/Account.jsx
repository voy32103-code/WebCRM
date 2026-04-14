import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { User, Mail, Shield, Save } from 'lucide-react';

export default function Account() {
  const { currentUser, setCurrentUser } = useApp();
  const [name, setName] = useState(currentUser?.name || 'Admin User');
  const [email, setEmail] = useState(currentUser?.email || 'admin@studio.com');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setCurrentUser({ ...currentUser, name, email });
      setIsSaving(false);
    }, 800);
  };

  return (
    <div className="p-8 md:p-12 h-full flex flex-col gap-10 max-w-4xl">
      <div>
        <h1 className="text-4xl font-heading italic text-white mb-2">Hồ sơ Của Bạn</h1>
        <p className="text-white/50 font-body">Cập nhật thông tin quản trị viên của Studio.</p>
      </div>

      <div className="liquid-glass rounded-3xl p-8 border border-white/5">
        <form onSubmit={handleSave} className="flex flex-col gap-8">
          <div className="flex items-center gap-6 pb-8 border-b border-white/5">
            <div className="w-24 h-24 rounded-full liquid-glass-strong flex flex-col items-center justify-center border border-white/10 relative group cursor-pointer overflow-hidden">
              <span className="font-heading italic text-3xl text-white z-10">{name.charAt(0)}</span>
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity z-20 flex items-center justify-center">
                <span className="text-xs text-white/80 font-medium">Đổi Ảnh</span>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-heading italic text-white mb-1">{name}</h3>
              <p className="text-white/50 text-sm">{currentUser?.role === 'admin' ? 'Super Admin' : 'Editor'}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-white/60 text-sm flex items-center gap-2">
                <User className="w-4 h-4" /> Họ và Tên
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/40 transition-colors font-body text-sm"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-white/60 text-sm flex items-center gap-2">
                <Mail className="w-4 h-4" /> Email liên hệ
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/40 transition-colors font-body text-sm"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2 pt-2">
            <label className="text-white/60 text-sm flex items-center gap-2">
              <Shield className="w-4 h-4" /> Đổi mật khẩu
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full md:w-1/2 bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-white/40 transition-colors font-body text-sm"
            />
          </div>

          <div className="pt-4 border-t border-white/5 flex justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className="bg-white text-black hover:bg-white/90 rounded-xl px-6 py-2.5 font-medium text-sm transition-all flex items-center gap-2 disabled:opacity-70"
            >
              {isSaving ? (
                <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              {isSaving ? 'Đang lưu...' : 'Lưu Thay Đổi'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
