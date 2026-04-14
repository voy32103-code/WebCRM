import React, { useState } from 'react';
import { Palette, Bell, Globe, Moon } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Settings() {
  const { settings, updateSettings } = useApp();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);

  return (
    <div className="p-8 md:p-12 h-full flex flex-col gap-10 max-w-4xl">
      <div>
        <h1 className="text-4xl font-heading italic text-white mb-2">Cài Đặt Hệ Thống</h1>
        <p className="text-white/50 font-body">Cấu hình các thiết lập giao diện và thông báo cho Studio.</p>
      </div>

      <div className="grid gap-6">
        {/* Appearance Settings */}
        <div className="liquid-glass rounded-3xl p-8 border border-white/5">
          <div className="flex items-center gap-3 mb-6">
            <Palette className="w-5 h-5 text-white" />
            <h2 className="text-xl font-heading italic text-white">Giao diện</h2>
          </div>
          
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium text-sm">Chế độ tối (Dark Mode)</p>
                <p className="text-white/50 text-xs mt-1">Giao diện mặc định của Studio luôn là Dark Mode.</p>
              </div>
              <div className="w-12 h-6 bg-primary rounded-full relative cursor-not-allowed opacity-80">
                <div className="absolute right-1 top-1 w-4 h-4 bg-black rounded-full" />
              </div>
            </div>
            <div className="flex items-center justify-between pt-6 border-t border-white/5">
              <div>
                <p className="text-white font-medium text-sm">Hiệu ứng Kính Mờ (Liquid Glass)</p>
                <p className="text-white/50 text-xs mt-1">Bật/Tắt hiệu ứng mờ nề trên toàn hệ thống.</p>
              </div>
              <div className="w-12 h-6 bg-primary rounded-full relative cursor-pointer">
                <div className="absolute right-1 top-1 w-4 h-4 bg-black rounded-full" />
              </div>
            </div>
          </div>
        </div>

        {/* AI Setup Settings */}
        <div className="liquid-glass rounded-3xl p-8 border border-white/5 relative overflow-hidden group">
          {/* Subtle gradient background for AI section */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 z-0" />
          
          <div className="relative z-10">
            <div className="flex flex-col gap-1 mb-6">
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-indigo-400" />
                <h2 className="text-xl font-heading italic text-white">AI Agent (LLM)</h2>
              </div>
              <p className="text-white/50 text-xs mt-1">Cấu hình API Key của Google Gemini hoặc OpenAI để trợ lý AI hoạt động với trí tuệ thực.</p>
            </div>
            
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-white/80 font-medium text-sm">Google Gemini API Key</label>
                <div className="flex gap-3">
                  <input 
                    type="password" 
                    value={settings.geminiApiKey}
                    onChange={(e) => updateSettings({ geminiApiKey: e.target.value })}
                    placeholder="Nhập API Key bắt đầu bằng AIza..."
                    className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-indigo-400/50 transition-colors font-body text-sm"
                  />
                  <button 
                    onClick={() => {
                      // Just visual feedback, the context already saves automatically via useEffect
                      const btn = document.getElementById('save-key-btn');
                      btn.innerText = 'Đã Lưu';
                      btn.classList.add('bg-green-500/20', 'text-green-400');
                      setTimeout(() => {
                        btn.innerText = 'Cập Nhật';
                        btn.classList.remove('bg-green-500/20', 'text-green-400');
                      }, 2000);
                    }}
                    id="save-key-btn"
                    className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-medium text-sm transition-all border border-white/5"
                  >
                    Cập Nhật
                  </button>
                </div>
                <p className="text-white/40 text-xs mt-1">
                  Khóa API của bạn chỉ được lưu cục bộ trên trình duyệt (LocalStorage). Chúng tôi không lưu trên máy chủ! Đăng ký key miễn phí tại <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" className="text-indigo-400 hover:underline">Google AI Studio</a>.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="liquid-glass rounded-3xl p-8 border border-white/5">
          <div className="flex items-center gap-3 mb-6">
            <Bell className="w-5 h-5 text-white" />
            <h2 className="text-xl font-heading italic text-white">Thông báo</h2>
          </div>
          
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium text-sm">Email Leads</p>
                <p className="text-white/50 text-xs mt-1">Nhận email ngay khi có Yêu Cầu mới ngoài trang chủ.</p>
              </div>
              <div 
                onClick={() => setEmailNotifications(!emailNotifications)}
                className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${emailNotifications ? 'bg-primary' : 'bg-white/10'}`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${emailNotifications ? 'right-1 bg-black' : 'left-1'}`} />
              </div>
            </div>
            
            <div className="flex items-center justify-between pt-6 border-t border-white/5">
              <div>
                <p className="text-white font-medium text-sm">Tin nhắn SMS</p>
                <p className="text-white/50 text-xs mt-1">Cảnh báo khẩn quá tin nhắn văn bản.</p>
              </div>
              <div 
                onClick={() => setSmsNotifications(!smsNotifications)}
                className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${smsNotifications ? 'bg-primary' : 'bg-white/10'}`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${smsNotifications ? 'right-1 bg-black' : 'left-1'}`} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
