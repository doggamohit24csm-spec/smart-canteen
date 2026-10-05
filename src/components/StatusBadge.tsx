import type { OrderStatus } from '../types';

const config: Record<OrderStatus, { label: string; color: string; bg: string }> = {
  received: { label: 'Received', color: '#7A7970', bg: '#EAE9E3' },
  confirmed: { label: 'Confirmed', color: '#2A6B43', bg: '#EBF5EF' },
  preparing: { label: 'Preparing', color: '#B87A0A', bg: '#FEF7E6' },
  ready: { label: 'Ready', color: '#2A6B43', bg: '#EBF5EF' },
  completed: { label: 'Completed', color: '#7A7970', bg: '#EAE9E3' },
  cancelled: { label: 'Cancelled', color: '#B04040', bg: '#FDF2F2' },
};

export default function StatusBadge({ status }: { status: OrderStatus }) {
  const c = config[status];
  return (
    <span
      className="text-xs font-mono font-medium px-2.5 py-1 rounded-full"
      style={{ color: c.color, backgroundColor: c.bg }}
    >
      {c.label}
    </span>
  );
}
