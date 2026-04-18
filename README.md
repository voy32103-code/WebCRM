# WebCRM — Enterprise Agency Management System

> Hệ thống quản lý khách hàng & dự án chuyên nghiệp cho agency thiết kế web, được xây dựng với React + Node.js + PostgreSQL + Gemini AI.

![Stack](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![Node](https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=node.js)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-4169E1?style=flat-square&logo=postgresql)
![Gemini](https://img.shields.io/badge/Gemini-2.0_Flash-4285F4?style=flat-square&logo=google)
![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-06B6D4?style=flat-square&logo=tailwindcss)

---

## ✨ Tính năng nổi bật

### 🎛️ Admin Dashboard
| Tính năng | Mô tả |
|---|---|
| **Kanban Board** | Quản lý lead theo trạng thái (MỚI → Đã Liên Hệ → Hoàn Thành) với drag-and-drop |
| **Table View** | Xem danh sách lead dạng bảng, hỗ trợ lọc, sắp xếp, multi-select |
| **SLA Monitoring** | Cảnh báo tự động khi lead quá hạn xử lý (> 48h) |
| **Bulk Actions** | Thực hiện hành động hàng loạt (đổi trạng thái, xoá, gán người phụ trách) |
| **AI Analytics** | Dashboard phân tích doanh thu, conversion rate, KPI bằng biểu đồ |

### 🤖 Gemini AI Integration
| Tính năng | Mô tả |
|---|---|
| **AI Analyze Lead** | Phân tích tiềm năng khách hàng và gợi ý chiến lược tiếp cận |
| **AI Draft Email** | Tự động soạn email cá nhân hoá dựa trên nội dung yêu cầu của lead |
| **Intent Detection** | Nhận diện nhu cầu (giá, timeline, dịch vụ cụ thể) để tối ưu phản hồi |

### 📧 Email System
- Gửi email thật qua **Gmail SMTP** (Nodemailer)
- 4 template có sẵn: Chào mừng, Báo giá, Follow-up, Hoàn thành
- Tích hợp **AI soạn nội dung** trực tiếp trong modal

### 👥 Role-Based Access Control
| Role | Quyền truy cập |
|---|---|
| **Admin** | Dashboard CRM, Analytics, Settings, Email, AI Agent |
| **User (Khách hàng)** | Client Portal — xem tiến độ dự án cá nhân |

### 🎨 UX Nâng cao
- **Dark / Light Mode** — lưu preference vào localStorage
- **Quick View Popover** — hover vào Kanban card để xem chi tiết nhanh
- **Onboarding Walkthrough** — hướng dẫn 6 bước cho người dùng mới
- **Toast Notifications** — thông báo realtime mọi hành động
- **Skeleton Loading** — shimmer effect khi fetch dữ liệu
- **Confirm Modal** — thay thế `window.confirm()` bằng modal chuyên nghiệp
- **Error Boundary** — bắt lỗi runtime, hiển thị fallback UI thân thiện

---

## 🗂️ Cấu trúc dự án

```
WebCRM/
├── src/                          # Frontend (React + Vite)
│   ├── components/               # UI Components
│   │   ├── SendEmailModal.jsx     # Modal gửi email với AI draft
│   │   ├── QuickViewPopover.jsx  # Hover popover trên Kanban
│   │   ├── OnboardingWalkthrough.jsx
│   │   ├── Toast.jsx             # Toast notification system
│   │   ├── ConfirmModal.jsx      # Custom confirm dialog
│   │   ├── ErrorBoundary.jsx
│   │   └── Skeleton.jsx
│   ├── context/
│   │   ├── AppContext.jsx        # Global state (leads, auth)
│   │   └── ThemeContext.jsx      # Dark/Light mode engine
│   ├── hooks/
│   │   └── useDashboard.js       # Dashboard business logic
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Analytics.jsx
│   │   ├── ClientPortal.jsx      # Giao diện cho Khách hàng
│   │   ├── Auth.jsx
│   │   └── dashboard/
│   │       ├── LeadKanbanView.jsx
│   │       ├── LeadTableView.jsx
│   │       ├── LeadSidePanel.jsx # Chi tiết lead + AI Agent + Email
│   │       ├── DashboardMetrics.jsx
│   │       ├── DashboardToolbar.jsx
│   │       └── BulkActionBar.jsx
│   ├── constants/index.js        # Single source of truth (SLA, KPI, Status)
│   └── utils/format.js           # Helper functions
│
└── server/                       # Backend (Node.js + Express)
    ├── index.js                  # API routes
    ├── .env                      # Biến môi trường (không commit)
    └── package.json
```

---

## 🚀 Cài đặt & Chạy

### Yêu cầu
- Node.js >= 18
- PostgreSQL (hoặc Neon.tech free tier)
- Gmail Account + App Password
- Google Gemini API Key

### 1. Clone & cài dependencies

```bash
git clone https://github.com/voy32103-code/WebCRM.git
cd WebCRM

# Frontend
npm install

# Backend
cd server
npm install
```

### 2. Cấu hình biến môi trường

Tạo file `server/.env`:

```env
PORT=5000
DATABASE_URL=postgresql://user:password@host/dbname?sslmode=require

# Gmail SMTP (dùng App Password, không phải mật khẩu thường)
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

# Gemini AI
GEMINI_API_KEY=your_gemini_api_key
```

> Lấy Gemini API Key miễn phí tại: https://aistudio.google.com/apikey

> Tạo Gmail App Password tại: Google Account → Security → 2-Step Verification → App Passwords

### 3. Khởi động

```bash
# Terminal 1 — Backend
cd server
npm run dev

# Terminal 2 — Frontend
cd ..
npm run dev
```

Truy cập: **http://localhost:5173**

### Tài khoản mặc định

| Role | Email | Password |
|---|---|---|
| Admin | `admin@studio.com` | `admin123` |

---

## 🔌 API Reference

### Auth
| Method | Endpoint | Mô tả |
|---|---|---|
| POST | `/api/auth/register` | Đăng ký tài khoản |
| POST | `/api/auth/login` | Đăng nhập |

### Leads
| Method | Endpoint | Mô tả |
|---|---|---|
| GET | `/api/leads` | Lấy tất cả leads |
| POST | `/api/leads` | Tạo lead mới |
| PUT | `/api/leads/:id` | Cập nhật lead |
| DELETE | `/api/leads/:id` | Xoá lead |
| GET | `/api/user-leads/:email` | Leads theo email khách hàng |

### Email
| Method | Endpoint | Mô tả |
|---|---|---|
| POST | `/api/send-email` | Gửi email qua SMTP |

### AI (Gemini)
| Method | Endpoint | Mô tả |
|---|---|---|
| POST | `/api/ai/draft-email` | AI soạn email cá nhân hoá |
| POST | `/api/ai/analyze-lead` | AI phân tích & gợi ý chiến lược |

---

## 🛠️ Tech Stack

**Frontend**
- React 18 + Vite
- TailwindCSS
- Framer Motion (motion/react)
- Lucide React Icons
- React Router DOM v6

**Backend**
- Node.js + Express
- PostgreSQL (Neon.tech)
- Nodemailer (Gmail SMTP)
- Google Generative AI SDK
- bcryptjs (password hashing)

---

## 📸 Screenshots

> Dashboard Admin — Kanban View với SLA monitoring, AI Agent, Quick View Popover

> Client Portal — Khách hàng theo dõi tiến độ dự án

---

## 📄 License

MIT © Antigravity Studio
