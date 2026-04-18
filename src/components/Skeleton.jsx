import React from 'react';

/**
 * Base shimmer animation wrapper.
 */
function Shimmer({ className = '' }) {
  return (
    <div className={`animate-pulse bg-white/5 rounded-xl ${className}`} />
  );
}

/**
 * Skeleton card for Kanban view.
 */
export function SkeletonKanbanCard() {
  return (
    <div className="bg-black/50 border border-white/5 rounded-xl p-4 flex flex-col gap-3">
      <Shimmer className="h-4 w-3/4" />
      <Shimmer className="h-3 w-full" />
      <Shimmer className="h-3 w-2/3" />
      <div className="flex justify-between mt-2 pt-3 border-t border-white/5">
        <Shimmer className="h-3 w-16" />
        <Shimmer className="h-3 w-12" />
      </div>
    </div>
  );
}

/**
 * Skeleton row for Table view.
 */
export function SkeletonTableRow() {
  return (
    <tr className="border-b border-white/5">
      <td className="px-6 py-5 hidden md:table-cell"><Shimmer className="h-4 w-4 rounded" /></td>
      <td className="px-6 py-5"><Shimmer className="h-6 w-20 rounded-full" /></td>
      <td className="px-6 py-5">
        <Shimmer className="h-4 w-32 mb-2" />
        <Shimmer className="h-3 w-44" />
      </td>
      <td className="px-6 py-5 hidden lg:table-cell">
        <Shimmer className="h-3 w-full mb-1.5" />
        <Shimmer className="h-3 w-3/4" />
      </td>
      <td className="px-6 py-5 text-right"><Shimmer className="h-3 w-20 ml-auto" /></td>
    </tr>
  );
}

/**
 * Skeleton column for Kanban — renders N skeleton cards.
 */
export function SkeletonKanbanColumn({ count = 3 }) {
  return (
    <div className="flex-1 flex flex-col liquid-glass rounded-2xl border border-white/10 min-h-[500px] shrink-0 w-80 lg:w-auto">
      <div className="p-4 border-b border-white/10 flex items-center gap-2">
        <Shimmer className="h-5 w-20 rounded-full" />
        <Shimmer className="h-4 w-6" />
      </div>
      <div className="p-4 flex flex-col gap-3">
        {Array.from({ length: count }).map((_, i) => (
          <SkeletonKanbanCard key={i} />
        ))}
      </div>
    </div>
  );
}

/**
 * Full Kanban skeleton — 3 columns.
 */
export function SkeletonKanban() {
  return (
    <div className="flex gap-4 lg:gap-6 h-full items-start p-4">
      <SkeletonKanbanColumn count={3} />
      <SkeletonKanbanColumn count={2} />
      <SkeletonKanbanColumn count={4} />
    </div>
  );
}

/**
 * Full Table skeleton — N rows.
 */
export function SkeletonTable({ rows = 6 }) {
  return (
    <table className="w-full">
      <thead className="border-b border-white/5">
        <tr>
          {['', 'Trạng thái', 'Khách hàng', 'Nội dung', 'Ngày gửi'].map(h => (
            <th key={h} className="px-6 py-5 text-white/20 font-medium text-left text-sm">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-white/5">
        {Array.from({ length: rows }).map((_, i) => <SkeletonTableRow key={i} />)}
      </tbody>
    </table>
  );
}
