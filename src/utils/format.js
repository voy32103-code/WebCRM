/**
 * @fileoverview Shared formatting utilities.
 */

/**
 * Format ISO date string to Vietnamese locale date.
 * @param {string} iso - ISO 8601 date string
 * @returns {string} e.g. "18/04/2026"
 */
export const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('vi-VN');

/**
 * Format ISO date string to Vietnamese locale datetime.
 * @param {string} iso - ISO 8601 date string
 * @returns {string} e.g. "18/04/2026, 09:30"
 */
export const formatDateTime = (iso) =>
  new Date(iso).toLocaleString('vi-VN');

/**
 * Format time only from ISO string.
 * @param {string} iso - ISO 8601 date string
 * @returns {string} e.g. "09:30"
 */
export const formatTime = (iso) =>
  new Date(iso).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });

/**
 * Format a number as USD currency string.
 * @param {number} amount
 * @returns {string} e.g. "$10,000"
 */
export const formatCurrency = (amount) =>
  `$${amount.toLocaleString('en-US')}`;

/**
 * Truncate a string to a max length, appending "..." if needed.
 * @param {string} str
 * @param {number} [maxLength=80]
 * @returns {string}
 */
export const truncate = (str, maxLength = 80) =>
  str && str.length > maxLength ? `${str.slice(0, maxLength)}...` : str;

/**
 * Check if a lead's SLA is breached.
 * @param {Object} lead - Lead object
 * @param {number} [slaHours=24]
 * @returns {boolean}
 */
export const isSlaBreached = (lead, slaHours = 24) => {
  if (lead.status !== 'MỚI') return false;
  const elapsed = Date.now() - new Date(lead.date).getTime();
  return elapsed > slaHours * 60 * 60 * 1000;
};
