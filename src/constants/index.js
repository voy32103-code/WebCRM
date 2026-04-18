/**
 * @fileoverview Shared application constants — single source of truth.
 * Thay đổi giá trị tại đây sẽ áp dụng toàn bộ ứng dụng.
 */

/** Trạng thái của một Lead */
export const LEAD_STATUS = Object.freeze({
  NEW: 'MỚI',
  CONTACTED: 'Đã Liên Hệ',
  DONE: 'Hoàn Thành',
});

/** Danh sách các trạng thái theo thứ tự hiển thị */
export const LEAD_STATUS_LIST = [
  LEAD_STATUS.NEW,
  LEAD_STATUS.CONTACTED,
  LEAD_STATUS.DONE,
];

/** Danh sách nhân viên phụ trách */
export const TEAM_MEMBERS = [
  'Hải Designer',
  'Yến Sale',
  'Quản lý Trưởng',
];

/** Ngưỡng SLA tính bằng giờ — vượt quá sẽ kích hoạt cảnh báo */
export const SLA_HOURS = 24;

/** Mục tiêu doanh thu KPI */
export const TARGET_REVENUE = 100_000;

/** Doanh thu trên mỗi deal hoàn thành */
export const REVENUE_PER_DEAL = 5_000;

/** Template hợp đồng mặc định */
export const DEFAULT_CONTRACT_TEMPLATE = 'Hợp đồng Dịch vụ Thiết kế WebCRM - Mẫu Tiêu Chuẩn';

/** Các role trong hệ thống comment */
export const COMMENT_ROLE = Object.freeze({
  ADMIN: 'admin',
  CLIENT: 'client',
  SYSTEM: 'system',
});
