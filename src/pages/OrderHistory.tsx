import { useState } from 'react';
import { ClipboardList, RotateCcw } from 'lucide-react';
import { useApp } from '../context/AppContext';
import StatusBadge from '../components/StatusBadge';
import EmptyState from '../components/EmptyState';

type Tab = 'active' | 'completed';

export default function OrderHistory() {
  const { orders, navigate, addToCart, showToast } = useApp();
  const [tab, setTab] = useState<Tab>('active');

  const activeOrders = orders.filter(o => !['completed', 'cancelled'].includes(o.status));
  const completedOrders = orders.filter(o => ['completed', 'cancelled'].includes(o.status));
  const shown = tab === 'active' ? activeOrders : completedOrders;

  const reorder = (order: typeof orders[0]) => {
    order.items.forEach(item => addToCart(item.food, item.quantity));
    showToast('Items added to cart', 'success');
    navigate('cart');
  };

  return (
    <div className="min-h-screen bg-[#F8F7F4] pb-24 md:pb-10">
      <div className="max-w-xl mx-auto px-4 md:px-6 pt-8">
        <h1 className="font-display text-4xl text-[#141412] mb-6">Orders.</h1>

        {/* Tabs */}
        <div className="flex gap-1 bg-[#EAE9E3] rounded-xl p-1 mb-6">
          {(['active', 'completed'] as Tab[]).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors capitalize ${
                tab === t ? 'bg-white text-[#141412] shadow-sm' : 'text-[#7A7970] hover:text-[#141412]'
              }`}
            >
              {t}
              {t === 'active' && activeOrders.length > 0 && (
                <span className="ml-1.5 font-mono text-xs bg-[#141412] text-white px-1.5 rounded-full">
                  {activeOrders.length}
                </span>
              )}
            </button>
          ))}
        </div>

        {shown.length === 0 ? (
          <EmptyState
            title={tab === 'active' ? 'No active orders.' : 'No past orders.'}
            description={tab === 'active'
              ? "Place your first order and it'll appear here."
              : "Your completed orders will appear here."}
            action={tab === 'active' ? { label: 'Browse menu', onClick: () => navigate('menu') } : undefined}
            icon={<ClipboardList size={48} />}
          />
        ) : (
          <div className="space-y-3">
            {shown.map(order => (
              <div
                key={order.id}
                className="bg-white rounded-xl border border-[#E2E0D8] p-4"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className="font-mono text-sm font-medium text-[#141412]">#{order.id}</span>
                    <p className="text-xs text-[#7A7970] mt-0.5">
                      {order.placedAt.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}{' '}
                      at {order.placedAt.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  <StatusBadge status={order.status} />
                </div>

                <p className="text-xs text-[#7A7970] mb-2">
                  {order.items.map(i => `${i.food.name}${i.quantity > 1 ? ` ×${i.quantity}` : ''}`).join(', ')}
                </p>

                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm font-medium text-[#141412]">₹{order.total}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate('order-tracking', { orderId: order.id })}
                      className="text-xs text-[#7A7970] hover:text-[#141412] transition-colors"
                    >
                      View details
                    </button>
                    {order.status === 'completed' && (
                      <button
                        onClick={() => reorder(order)}
                        className="text-xs text-[#2A6B43] font-medium hover:underline flex items-center gap-1"
                      >
                        <RotateCcw size={11} /> Order again
                      </button>
                    )}
                  </div>
                </div>

                {tab === 'active' && (
                  <button
                    onClick={() => navigate('order-tracking', { orderId: order.id })}
                    className="w-full mt-3 border border-[#E2E0D8] text-[#141412] text-xs font-medium py-2 rounded-lg hover:bg-[#EAE9E3] transition-colors"
                  >
                    Track order →
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
