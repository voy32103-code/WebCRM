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

        {/* Integration Hub Settings */}
        <div className="liquid-glass rounded-3xl p-8 border border-white/5 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/5 to-blue-500/5 z-0" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-cyan-400" />
                <h2 className="text-xl font-heading italic text-white flex items-center gap-2">
                  Integration Hub <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-[0_0_10px_rgba(6,182,212,0.4)]">ENTERPRISE</span>
                </h2>
              </div>
              <p className="text-white/50 text-xs mt-1">Kết nối WebCRM với các hệ sinh thái khác.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Slack Integration */}
              <div className="bg-black/40 border border-white/10 rounded-2xl p-5 flex flex-col gap-4 hover:border-white/20 transition-colors">
                <div className="flex justify-between items-start">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center p-2">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg" alt="Slack" className="w-full h-full object-contain" />
                  </div>
                  <div className="w-10 h-5 bg-primary relative rounded-full opacity-80 cursor-not-allowed">
                    <div className="absolute right-1 top-1 w-3 h-3 bg-black rounded-full" />
                  </div>
                </div>
                <div>
                  <h3 className="text-white font-medium text-sm">Slack Workspace</h3>
                  <p className="text-white/40 text-xs mt-1">Đã kết nối. Tự động thông báo đơn hàng & yêu cầu thiết kế mới vào kênh #sales.</p>
                </div>
              </div>

              {/* Google Calendar Integration */}
              <div className="bg-black/40 border border-white/10 rounded-2xl p-5 flex flex-col gap-4 hover:border-white/20 transition-colors">
                <div className="flex justify-between items-start">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center p-2">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Google_Calendar_icon_%282020%29.svg" alt="Google Calendar" className="w-full h-full object-contain" />
                  </div>
                  <div className="w-10 h-5 bg-white/10 relative rounded-full cursor-pointer hover:bg-white/20 transition-colors">
                    <div className="absolute left-1 top-1 w-3 h-3 bg-white/50 rounded-full" />
                  </div>
                </div>
                <div>
                  <h3 className="text-white font-medium text-sm">Google Calendar</h3>
                  <p className="text-white/40 text-xs mt-1">Chưa kết nối. Đồng bộ lịch hẹn gặp khách hàng tự động.</p>
                </div>
                <button className="w-full py-2 bg-white/5 hover:bg-white/10 text-white/80 text-xs rounded-lg transition-colors border border-white/5 mt-auto">
                  Kết nối ngay
                </button>
              </div>

              {/* Zapier Integration */}
              <div className="bg-black/40 border border-white/10 rounded-2xl p-5 flex flex-col gap-4 hover:border-white/20 transition-colors">
                <div className="flex justify-between items-start">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center p-2">
                    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-[#FF4A00]"><path fill="currentColor" fillRule="evenodd" clipRule="evenodd" d="M14.935 3.018l6.044 10.472-8.98 10.473-6.044-10.472 8.98-10.473zM5.955 13.49l-2.935 3.424 6.044 10.472 2.935-3.424-6.044-10.473zM3 10.49l2.935-3.424 6.044 10.472L8.98 20.963 3 10.49z"></path></svg>
                  </div>
                  <div className="w-10 h-5 bg-white/10 relative rounded-full cursor-pointer hover:bg-white/20 transition-colors">
                    <div className="absolute left-1 top-1 w-3 h-3 bg-white/50 rounded-full" />
                  </div>
                </div>
                <div>
                  <h3 className="text-white font-medium text-sm">Zapier Webhooks</h3>
                  <p className="text-white/40 text-xs mt-1">Tạo kịch bản tự động hóa 5000+ ứng dụng bên ngoài.</p>
                </div>
                <button className="w-full py-2 bg-white/5 hover:bg-white/10 text-white/80 text-xs rounded-lg transition-colors border border-white/5 mt-auto">
                  Tạo Webhook
                </button>
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
