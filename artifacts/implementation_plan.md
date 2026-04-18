# Triển Khai 5 Tính Năng Enterprise WebCRM

Kế hoạch này phác thảo cách chúng ta sẽ tích hợp 5 tính năng Enterprise cao cấp vào WebCRM Dashboard và Client Portal để làm nổi bật định vị hệ thống quản lý chuẩn Agency. Mọi thay đổi sẽ tập trung vào Frontend (UI/UX) và Mock State sử dụng Context để có thể demo ngay lập tức cho khách hàng.

## User Review Required

> [!IMPORTANT]
> Đây là các tính năng Mockup phục vụ mục đích Demo (Frontend Demo) trên giao diện. Các API gọi ngầm sẽ được comment lại hoặc giả lập để đảm bảo không lỗi khi chưa kết nối Database thật sự.
> Xác nhận giúp tôi nếu bạn muốn tôi sử dụng các thư viện ngoài (như `react-signature-canvas` để vẽ chữ ký) hay chỉ sử dụng UI tĩnh để mô phỏng. Kế hoạch hiện tại là **sử dụng UI tĩnh ấn tượng kết hợp logic mockup** để không làm nặng package.json.

## Proposed Changes

### 1. AppContext State Updates
Cập nhật model dữ liệu của 1 Lead trong `AppContext.jsx` để lưu trữ trạng thái cho tính năng bình luận, hợp đồng, tài liệu và nhật ký hoạt động (Audit log).
#### [MODIFY] [AppContext.jsx](file:///d:/Yen-Antigravity/LandingPage/src/context/AppContext.jsx)
- Cấu trúc mặc định của Lead sẽ thêm: 
  - `comments`: Mảng object `{ author, text, timestamp, role }` chứa tin nhắn nội bộ/khách hàng.
  - `files`: Mảng object `{ name, type, url, size }` (Kho tài nguyên).
  - `contract`: Object `{ signed: boolean, signedAt: string, template: string }`.
  - `auditLogs`: Mảng '{ action, user, timestamp }' để theo dõi nhật ký thay đổi trạng thái ticket.
- Các hàm update tương ứng: `addComment`, `signContract`, vân vân.

---

### 2. Integration Hub (Trung tâm tích hợp)
#### [MODIFY] [Settings.jsx](file:///d:/Yen-Antigravity/LandingPage/src/pages/Settings.jsx)
- Thêm section mới "Integrations Hub".
- Xây dựng giao diện thẻ (cards) kết nối cho: Slack (thông báo đơn hàng), Google Calendar (Lịch họp), và Zapier. Bọc hiệu ứng kính mờ (Liquid Glass).
- Các nút "Connect" sẽ có trạng thái "Connected" hoặc "Connect" kèm toggle tắt bật.

---

### 3. Activity Audit Log & In-app Messaging (Admin Side)
#### [MODIFY] [Dashboard.jsx](file:///d:/Yen-Antigravity/LandingPage/src/pages/Dashboard.jsx)
- Trong Side Panel (Chi tiết khách hàng), bổ sung thêm 2 tab hoặc section:
  1. **Nhật ký hoạt động (Audit Log):** Hiển thị dạng Timeline (Lịch sử khách đăng ký, Admin đổi trạng thái, Admin trả lời...).
  2. **Giao tiếp nội bộ/Khách (Comments):** Giao diện chat cơ bản. Admin gõ phản hồi tại đây, và khách hàng sẽ thấy nó bên Client Portal. Nếu gửi, audit log sẽ tiếp tục ghi nhận.
- Nâng cấp Side panel để scroll mượt và hiện rõ hơn.

---

### 4. Client Portal Upgrades (Resource Vault, E-Sign, Comments)
#### [MODIFY] [ClientPortal.jsx](file:///d:/Yen-Antigravity/LandingPage/src/pages/ClientPortal.jsx)
- Chỉnh sửa các thẻ (Cards) Dự án trong Client Portal thành dạng Grid/List có mở rộng (Accordion hoặc Modal).
- Khi mở chi tiết Dự án, hiển thị:
  - **Kho Tài nguyên (File Vault):** Liệt kê các tài liệu như Hợp đồng, Logo, Brand Guidelines. Có nút Download giả lập.
  - **Ký kết hợp đồng điện tử (E-Signature):** Nếu dự án ở trạng thái "Đã Liên Hệ" và có Hợp đồng, hiển thị khu vực "Duyệt & Ký E-Sign". Cho phép khách hàng nhập tên bằng font chữ viết tay (Cursive) để làm chữ ký điện tử.
  - **In-app Messaging:** Khung chat để trao đổi trực tiếp với Admin (đồng bộ dữ liệu với `comments` trong AppContext).

## Open Questions

> [!TIP]
> 1. Tính năng E-signature (Hợp đồng): Bạn có muốn hiển thị một khung xem trước nội dung Hợp đồng mẫu không (Khoảng 1 đoạn PDF giả lập nhỏ) trước khi họ bấm Ký nhận?
> 2. Tab "My Designs": Tôi sẽ chủ yếu chỉnh sửa `ClientPortal.jsx` vì đây là Portal trung tâm. Nếu bạn cũng muốn tính năng In-app messaging xuất hiện cả trong Modal nhỏ `MyDesignsModal.jsx`, hãy cho tôi biết. Kế hoạch hiện tại là đưa nó vào ClientPortal cho full-screen trải nghiệm tốt hơn.

## Verification Plan

### Manual Verification
- Truy cập vào Dashboard -> Settings: Trải nghiệm UI kết nối Slack / Calendar mượt mà.
- Trong Dashboard trang chủ: Mở 1 thẻ Kanban, chuyển trạng thái và gõ thử comment. Kiểm tra xem Timeline (Audit Log) có tự động push lịch sử mới không.
- Log in bằng User bình thường (hoặc dùng tài khoản khách hàng) -> Truy cập Cổng Dự Án (Client Portal): Mở thử dự án, gõ comment phản hồi admin, thực hiện thao tác xem file (Resource vault) và bấm vào khung E-signature để ký nhận Hợp đồng.
