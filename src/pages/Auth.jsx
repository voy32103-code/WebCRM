import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import HlsVideo from '../components/HlsVideo';
import { useApp } from '../context/AppContext';

export default function Auth({ type }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorLine, setErrorLine] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useApp();
  const navigate = useNavigate();

  const isLogin = type === 'login';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorLine('');
    setLoading(true);

    const url = isLogin ? '/api/auth/login' : '/api/auth/register';
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      
      if (data.success) {
        login(data.user); // data.user chứa id, email, role
        if (data.user.role === 'admin') {
          navigate('/dashboard');
        } else {
          navigate('/');
        }
      } else {
        setErrorLine(data.error || 'Có lỗi xảy ra');
      }
    } catch (err) {
      setErrorLine('Lỗi mạng hoặc server không phản hồi');
    }
    
    setLoading(false);
  };

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-black text-foreground">
      {/* Background Video giống trang Hero để giữ tính đồng nhất */}
      <div className="absolute inset-0 z-0">
        <HlsVideo 
          src="https://stream.mux.com/8wrHPCX2dC3msyYU9ObwqNdm00u3ViXvOSHUMRYSEe5Q.m3u8"
          className="w-full h-full object-cover opacity-40 mix-blend-screen"
        />
        <div className="absolute inset-0 bg-black/60 pointer-events-none" />
      </div>

      <Link to="/" className="absolute top-8 left-8 md:top-12 md:left-12 z-20 liquid-glass rounded-full p-3 hover:bg-white/10 transition-colors">
        <ArrowLeft className="w-5 h-5 text-white" />
      </Link>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md px-6"
      >
        <div className="liquid-glass rounded-3xl p-8 md:p-10 border border-white/10 shadow-2xl backdrop-blur-2xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-heading italic text-white mb-2 tracking-tight">
              {isLogin ? 'Chào Mừng Trở Lại' : 'Tạo Tài Khoản'}
            </h1>
            <p className="text-white/60 font-body text-sm font-light">
              {isLogin ? 'Đăng nhập vào hệ thống Studio quản trị.' : 'Tham gia cùng hàng ngàn khách hàng của chúng tôi.'}
            </p>
          </div>
          
          {errorLine && (
            <div className="mb-6 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-medium text-center">
              {errorLine}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {!isLogin && (
              <div>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  placeholder="Họ và Tên"
                  className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/40 focus:outline-none focus:border-white/40 transition-colors font-body text-sm"
                />
              </div>
            )}
            <div>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email làm việc"
                className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/40 focus:outline-none focus:border-white/40 transition-colors font-body text-sm"
              />
            </div>
            <div>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mật khẩu"
                className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/40 focus:outline-none focus:border-white/40 transition-colors font-body text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-4 w-full bg-white text-black hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl py-3.5 font-medium text-sm transition-all flex justify-center items-center h-12 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
            >
              {loading ? 'Đang xử lý...' : isLogin ? 'Đăng Nhập' : 'Đăng Ký Ngay'}
            </button>
          </form>

          <div className="mt-8 text-center text-white/50 font-body text-sm">
            {isLogin ? 'Chưa có tài khoản? ' : 'Đã có tài khoản? '}
            <Link to={isLogin ? '/register' : '/login'} className="text-white font-medium hover:underline">
              {isLogin ? 'Đăng Ký' : 'Đăng Nhập'}
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
