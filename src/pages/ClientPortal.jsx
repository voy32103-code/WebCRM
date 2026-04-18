import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { FolderGit2, Clock, CheckCircle2, Circle, HelpCircle, FileText, Download, PenTool, Send, AlertTriangle } from 'lucide-react';

export default function ClientPortal() {
  const { currentUser, leads, addLeadComment, signContract } = useApp();
  const [myProjects, setMyProjects] = useState([]);
  const [commentTexts, setCommentTexts] = useState({});

  useEffect(() => {
    // Nếu có Email, tự động tìm kiếm dự án tương ứng của tài khoản trong CSDL
    if (currentUser?.email) {
      // Vì đang ở chế độ Frontend Demo, ta xài leads array hiện tại
      // Thực tế có thể fetch lại từ '/api/user-leads/' + currentUser.email
      const foundLeads = leads.filter(l => l.email === currentUser.email);
      setMyProjects(foundLeads);
    }
  }, [currentUser, leads]);

  const getStepStatus = (currentStatus, stepIndex) => {
    const statuses = ['MỚI', 'Đã Liên Hệ', 'Hoàn Thành'];
    const currentIndex = statuses.indexOf(currentStatus);
    
    if (currentIndex > stepIndex) return 'completed';
    if (currentIndex === stepIndex) return 'current';
    return 'pending';
  };

  return (
    <div className="p-4 md:p-8 lg:p-12 h-full flex flex-col gap-6 lg:gap-10">
      <div className="flex flex-col lg:flex-row justify-between lg:items-end gap-6">
        <div>
          <h1 className="text-3xl lg:text-4xl font-heading italic text-white mb-2 flex items-center gap-3">
            <FolderGit2 className="w-8 h-8 text-indigo-400" /> Cổng Dự Án
          </h1>
          <p className="text-white/50 font-body text-sm lg:text-base">Theo dõi tiến độ những ý tưởng tuyệt vời của bạn tại đây.</p>
        </div>
      </div>

      <div className="flex-1 rounded-3xl overflow-hidden flex flex-col min-h-0">
        <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 flex flex-col gap-8">
          {myProjects.length === 0 ? (
            <div className="bg-black/20 border border-white/5 p-12 rounded-3xl flex flex-col items-center justify-center text-center">
              <HelpCircle className="w-12 h-12 text-white/20 mb-4" />
              <h3 className="text-xl text-white font-heading italic mb-2">Chưa Có Dự Án Nào</h3>
              <p className="text-white/50 text-sm max-w-md">Tiến trình làm việc sẽ hiện ở đây ngay khi bạn đặt chỗ với đội ngũ Studio.</p>
            </div>
          ) : (
            myProjects.map((project, idx) => (
              <motion.div 
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-black/40 border border-white/10 rounded-3xl p-6 lg:p-10 flex flex-col gap-8 relative overflow-hidden"
              >
                {project.notes?.includes('[VIP_PAID]') && (
                  <div className="absolute top-0 right-0 bg-yellow-400/20 text-yellow-400 text-xs font-bold px-4 py-2 rounded-bl-3xl border-b border-l border-yellow-400/20">
                    VIP / ĐÃ THANH TOÁN
                  </div>
                )}

                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <p className="text-white/40 text-xs tracking-wider uppercase">Dự án #{project.id.toString().substring(0,6)}</p>
                    <span className="bg-white/5 text-white/60 text-xs px-2 py-0.5 rounded-md flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {new Date(project.date).toLocaleDateString('vi-VN')}
                    </span>
                  </div>
                  <h3 className="text-2xl text-white font-medium line-clamp-1">{project.message || 'Yêu cầu không rõ'}</h3>
                </div>

                {/* Progress Bar */}
                <div className="relative pt-6">
                  {/* Đường line gốc */}
                  <div className="absolute top-9 left-0 w-full h-1 bg-white/10 rounded-full" />
                  
                  {/* Đường line kích hoạt - Tính toán dưa trên trạng thái */}
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ 
                      width: project.status === 'Hoàn Thành' ? '100%' : 
                             project.status === 'Đã Liên Hệ' ? '50%' : '0%' 
                    }}
                    className="absolute top-9 left-0 h-1 bg-indigo-500 rounded-full transition-all duration-1000 ease-out" 
                  />

                  <div className="flex justify-between relative z-10">
                    {[
                      { name: 'Xếp hàng chờ', desc: 'Đã nhận yêu cầu', st: 'MỚI' },
                      { name: 'Đang triển khai', desc: 'Lên bản vẽ & Coding', st: 'Đã Liên Hệ' },
                      { name: 'Bàn giao', desc: 'Đã hoàn tất', st: 'Hoàn Thành' }
                    ].map((step, i) => {
                      const status = getStepStatus(project.status, i);
                      return (
                        <div key={i} className="flex flex-col items-center text-center w-1/3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-4 transition-colors duration-500 ${
                            status === 'completed' ? 'bg-indigo-500 text-white' : 
                            status === 'current' ? 'bg-indigo-500/20 border-2 border-indigo-500 text-indigo-400' : 
                            'bg-black border-2 border-white/10 text-white/20'
                          }`}>
                            {status === 'completed' ? <CheckCircle2 className="w-5 h-5" /> : <Circle className="w-4 h-4 fill-current" />}
                          </div>
                          <p className={`text-sm font-medium mb-1 transition-colors ${
                            status === 'pending' ? 'text-white/40' : 'text-white'
                          }`}>{step.name}</p>
                          <p className="text-xs text-white/30">{step.desc}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* ENTERPRISE FEATURES SECTION */}
                <div className="pt-6 border-t border-white/5 mt-4">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    {/* 1. Kho Tài Nuyên (File Vault) */}
                    <div className="bg-black/30 rounded-2xl p-5 border border-white/5">
                      <h4 className="text-white font-medium mb-4 flex items-center gap-2">
                        <FileText className="w-4 h-4 text-indigo-400" /> Tài Nguyên Dự Án
                      </h4>
                      {(!project.files || project.files.length === 0) ? (
                        <p className="text-white/30 text-xs italic">Chưa có tài liệu nào.</p>
                      ) : (
                        <div className="flex flex-col gap-3">
                          {project.files.map((file, fIdx) => (
                            <div key={fIdx} className="flex items-center justify-between bg-white/5 p-3 rounded-xl border border-white/5">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                                  <FileText className="w-4 h-4" />
                                </div>
                                <div>
                                  <p className="text-white text-xs font-medium line-clamp-1">{file.name}</p>
                                  <p className="text-white/40 text-[10px]">{file.size}</p>
                                </div>
                              </div>
                              <button className="text-white/50 hover:text-white transition-colors p-1" title="Tải xuống">
                                <Download className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* 2. E-Signature */}
                    <div className="bg-black/30 rounded-2xl p-5 border border-white/5">
                      <h4 className="text-white font-medium mb-4 flex items-center gap-2">
                        <PenTool className="w-4 h-4 text-indigo-400" /> Ký Kết Hợp Đồng
                      </h4>
                      {project.status === 'MỚI' ? (
                        <div className="flex flex-col items-center justify-center text-center h-[100px] bg-white/5 rounded-xl border border-white/5 border-dashed">
                          <AlertTriangle className="w-5 h-5 text-yellow-400/50 mb-2" />
                          <p className="text-white/40 text-xs">Phạm vi công việc đang được lập.<br/>Hợp đồng sẽ khả dụng sớm.</p>
                        </div>
                      ) : project.contract?.signed ? (
                        <div className="flex flex-col items-center justify-center h-[100px] bg-green-500/10 rounded-xl border border-green-500/20">
                          <CheckCircle2 className="w-6 h-6 text-green-400 mb-2" />
                          <p className="text-green-400 text-sm font-medium">Hợp đồng đã ký</p>
                          <p className="text-green-500/50 text-[10px]">{new Date(project.contract.signedAt).toLocaleString('vi-VN')}</p>
                        </div>
                      ) : (
                        <div className="flex flex-col gap-3">
                          <div className="bg-white/5 p-3 rounded-xl border border-white/5 text-xs text-white/70">
                            <p className="font-medium text-white mb-1">{project.contract?.template}</p>
                            <span className="text-white/50 italic">Vui lòng đọc kỹ các điều khoản trước khi ký nhận bên dưới.</span>
                          </div>
                          <button 
                            onClick={() => signContract(project.id)}
                            className="w-full py-2.5 bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white font-medium text-xs transition-colors flex items-center justify-center gap-2"
                          >
                            <PenTool className="w-4 h-4" />
                            Xác Nhân Ký Tên (E-Sign)
                          </button>
                        </div>
                      )}
                    </div>

                    {/* 3. Trao đổi nội bộ */}
                    <div className="bg-black/30 rounded-2xl p-5 border border-white/5 flex flex-col">
                      <h4 className="text-white font-medium mb-4 flex items-center gap-2">
                        <Send className="w-4 h-4 text-indigo-400" /> Trao Đổi Dự Án
                      </h4>
                      <div className="flex-1 bg-white/[0.02] rounded-xl border border-white/5 p-3 flex flex-col gap-3 max-h-[150px] overflow-y-auto mb-3 custom-scrollbar">
                        {(!project.comments || project.comments.length === 0) ? (
                            <p className="text-white/30 text-[10px] text-center italic py-4">Chưa có bình luận nào.</p>
                        ) : (
                          project.comments.map((cmt, idx) => (
                            <div key={idx} className={`flex flex-col ${cmt.role === 'admin' ? 'items-start' : 'items-end'}`}>
                              <div className={`px-3 py-1.5 rounded-xl max-w-[85%] text-xs shadow-sm ${cmt.role === 'admin' ? 'bg-indigo-600 text-white rounded-tl-sm' : 'bg-white/10 text-white justify-end rounded-tr-sm'}`}>
                                {cmt.text}
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                      <div className="flex gap-2">
                        <input 
                          type="text" 
                          placeholder="Viết yêu cầu nhanh..." 
                          value={commentTexts[project.id] || ''}
                          onChange={e => setCommentTexts({...commentTexts, [project.id]: e.target.value})}
                          onKeyDown={e => {
                            if (e.key === 'Enter' && commentTexts[project.id]?.trim()) {
                              addLeadComment(project.id, { author: currentUser?.name || 'Khách Hàng', role: 'client', text: commentTexts[project.id] });
                              setCommentTexts({...commentTexts, [project.id]: ''});
                            }
                          }}
                          className="flex-1 bg-black border border-white/10 rounded-lg px-3 py-1.5 text-white placeholder-white/30 focus:outline-none focus:border-indigo-500 transition-colors text-xs"
                        />
                        <button 
                          onClick={() => {
                            if (commentTexts[project.id]?.trim()) {
                              addLeadComment(project.id, { author: currentUser?.name || 'Khách Hàng', role: 'client', text: commentTexts[project.id] });
                              setCommentTexts({...commentTexts, [project.id]: ''});
                            }
                          }}
                          className="bg-white/10 hover:bg-white/20 px-2.5 py-1.5 rounded-lg text-white transition-colors"
                        >
                          <Send className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                  </div>
                </div>

              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
