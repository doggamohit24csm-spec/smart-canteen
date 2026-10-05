import { CheckCircle, MapPin } from 'lucide-react';
import { useApp } from '../context/AppContext';
import type { Order } from '../types';

export default function OrderConfirmation() {
  const { pageParams, navigate } = useApp();
  const order = pageParams.order as Order | undefined;

  if (!order) {
    navigate('dashboard');
    return null;
  }

  const pickupStr = order.estimatedReady.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="min-h-screen bg-[#F8F7F4] flex flex-col items-center justify-center px-6 py-16">
      <div className="w-full max-w-sm">
        {/* Success icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-[#EBF5EF] flex items-center justify-center">
            <CheckCircle size={32} className="text-[#2A6B43]" />
          </div>
        </div>

        <h1 className="font-display text-4xl text-[#141412] text-center mb-1">Order confirmed.</h1>
        <p className="text-[#7A7970] text-sm text-center mb-8">
          Your order is being received. Get ready to skip the queue.
        </p>

        {/* Token */}
        <div className="bg-white rounded-2xl border border-[#E2E0D8] p-6 mb-4 text-center">
          <p className="text-xs font-mono font-medium text-[#7A7970] uppercase tracking-widest mb-3">
            Your pickup token
          </p>
          <div className="font-mono text-6xl font-medium text-[#141412] mb-2">{order.token}</div>
          <p className="text-xs text-[#7A7970]">Show this when collecting your order</p>
        </div>

        {/* Details */}
        <div className="bg-white rounded-xl border border-[#E2E0D8] p-5 mb-6">
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-[#7A7970]">Order</span>
              <span className="font-mono font-medium text-[#141412]">#{order.id}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#7A7970]">Items</span>
              <span className="text-[#141412]">{order.items.reduce((s, i) => s + i.quantity, 0)} item{order.items.reduce((s, i) => s + i.quantity, 0) !== 1 ? 's' : ''}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#7A7970]">Total</span>
              <span className="font-mono font-medium text-[#141412]">₹{order.total}</span>
            </div>
            <div className="border-t border-[#E2E0D8] pt-3 flex justify-between text-sm">
              <span className="text-[#7A7970] flex items-center gap-1"><MapPin size={12} /> Pickup</span>
              <span className="text-[#141412]">Main College Canteen</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#7A7970]">Estimated ready</span>
              <span className="font-mono font-medium text-[#2A6B43]">{pickupStr}</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => navigate('order-tracking', { orderId: order.id })}
            className="w-full bg-[#141412] text-white text-sm font-medium py-3 rounded-xl hover:bg-[#2A6B43] transition-colors"
          >
            Track order
          </button>
          <button
            onClick={() => navigate('digital-token', { order })}
            className="w-full border border-[#E2E0D8] text-[#141412] text-sm font-medium py-3 rounded-xl hover:bg-[#EAE9E3] transition-colors"
          >
            View digital token
          </button>
          <button
            onClick={() => navigate('dashboard')}
            className="w-full text-[#7A7970] text-sm py-2 hover:text-[#141412] transition-colors"
          >
            Back to home
          </button>
        </div>
      </div>
    </div>
  );
}
