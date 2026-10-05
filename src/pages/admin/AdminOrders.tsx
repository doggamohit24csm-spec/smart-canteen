import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import AdminLayout from './AdminLayout';
import StatusBadge from '../../components/StatusBadge';
import type { OrderStatus } from '../../types';

const statusOptions: OrderStatus[] = ['received', 'confirmed', 'preparing', 'ready', 'completed', 'cancelled'];

export default function AdminOrders() {
  const { orders, updateOrderStatus, showToast } = useApp();
  const [filter, setFilter] = useState<OrderStatus | 'all'>('all');

  const filtered = filter === 'all' ? orders : orders.filter(o => o.status === filter);

  const handleStatusChange = (orderId: string, status: OrderStatus) => {
    updateOrderStatus(orderId, status);
    showToast(`Order #${orderId} marked as ${status}`, 'success');
  };

  return (
    <AdminLayout>
      <div className="px-4 md:px-8 py-8">
        <h1 className="font-display text-3xl text-[#141412] mb-6">Orders</h1>

        {/* Filter tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1 mb-6">
          {(['all', ...statusOptions] as const).map(s => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`flex-shrink-0 text-sm px-3 py-1.5 rounded-xl font-medium transition-colors capitalize ${
                filter === s
                  ? 'bg-[#141412] text-white'
                  : 'bg-white text-[#7A7970] border border-[#E2E0D8] hover:border-[#C8C6BC]'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-[#E2E0D8] overflow-hidden">
          {/* Header */}
          <div className="hidden md:grid grid-cols-[auto_1fr_auto_auto_auto_auto] gap-4 px-5 py-3 border-b border-[#E2E0D8]">
            {['Order', 'Items', 'Token', 'Total', 'Time', 'Status'].map(h => (
              <p key={h} className="text-xs font-medium text-[#7A7970] uppercase tracking-widest">{h}</p>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-sm text-[#7A7970]">No orders match this filter.</p>
            </div>
          ) : (
            <div className="divide-y divide-[#F0EFE9]">
              {filtered.map(order => (
                <div key={order.id} className="p-4 md:p-5">
                  {/* Mobile layout */}
                  <div className="md:hidden space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-sm font-medium text-[#141412]">#{order.id}</span>
                      <StatusBadge status={order.status} />
                    </div>
                    <p className="text-xs text-[#7A7970]">
                      {order.items.map(i => `${i.food.name} ×${i.quantity}`).join(', ')}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-sm font-medium text-[#141412]">{order.token}</span>
                        <span className="font-mono text-sm text-[#141412]">₹{order.total}</span>
                      </div>
                      <select
                        value={order.status}
                        onChange={e => handleStatusChange(order.id, e.target.value as OrderStatus)}
                        className="text-xs border border-[#E2E0D8] rounded-lg px-2 py-1.5 bg-white text-[#141412] focus:border-[#141412] outline-none"
                      >
                        {statusOptions.map(s => (
                          <option key={s} value={s} className="capitalize">{s}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Desktop layout */}
                  <div className="hidden md:grid grid-cols-[auto_1fr_auto_auto_auto_auto] gap-4 items-center">
                    <span className="font-mono text-sm font-medium text-[#141412]">#{order.id}</span>
                    <p className="text-xs text-[#7A7970] truncate">
                      {order.items.map(i => `${i.food.name} ×${i.quantity}`).join(', ')}
                    </p>
                    <span className="font-mono text-sm font-medium text-[#141412]">{order.token}</span>
                    <span className="font-mono text-sm text-[#141412]">₹{order.total}</span>
                    <span className="text-xs text-[#7A7970]">
                      {order.placedAt.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    <select
                      value={order.status}
                      onChange={e => handleStatusChange(order.id, e.target.value as OrderStatus)}
                      className="text-xs border border-[#E2E0D8] rounded-lg px-2 py-1.5 bg-white text-[#141412] focus:border-[#141412] outline-none"
                    >
                      {statusOptions.map(s => (
                        <option key={s} value={s} className="capitalize">{s}</option>
                      ))}
                    </select>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
