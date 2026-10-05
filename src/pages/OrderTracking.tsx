import { Clock, Users, CheckCircle, Circle, Loader } from 'lucide-react';
import { useApp } from '../context/AppContext';
import BackButton from '../components/BackButton';
import StatusBadge from '../components/StatusBadge';

const steps = [
  { key: 'received', label: 'Order received' },
  { key: 'confirmed', label: 'Payment & order confirmed' },
  { key: 'preparing', label: 'Preparing your food' },
  { key: 'ready', label: 'Ready for pickup' },
  { key: 'completed', label: 'Completed' },
] as const;

const statusOrder = ['received', 'confirmed', 'preparing', 'ready', 'completed'];

export default function OrderTracking() {
  const { pageParams, orders, navigate, currentOrder } = useApp();
  const orderId = pageParams.orderId as string | undefined;
  const order = orders.find(o => o.id === orderId) || currentOrder || orders[0];

  if (!order) { navigate('order-history'); return null; }

  const currentIdx = statusOrder.indexOf(order.status);
  const minLeft = Math.max(0, Math.round((order.estimatedReady.getTime() - Date.now()) / 60000));

  return (
    <div className="min-h-screen bg-[#F8F7F4] pb-24 md:pb-10">
      <div className="max-w-xl mx-auto px-4 md:px-6 pt-8">
        <BackButton onClick={() => navigate('order-history')} label="Orders" />

        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="font-display text-3xl text-[#141412] mb-1">Order #{order.id}</h1>
            <p className="text-sm text-[#7A7970]">
              Placed {order.placedAt.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
          <StatusBadge status={order.status} />
        </div>

        {/* Key metrics */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-white rounded-xl border border-[#E2E0D8] p-4 text-center">
            <div className="flex items-center justify-center gap-1 text-[#7A7970] mb-1">
              <Users size={13} />
              <span className="text-xs">Queue position</span>
            </div>
            <p className="font-mono text-3xl font-medium text-[#141412]">
              {order.queuePosition > 0 ? order.queuePosition : '—'}
            </p>
          </div>
          <div className="bg-white rounded-xl border border-[#E2E0D8] p-4 text-center">
            <div className="flex items-center justify-center gap-1 text-[#7A7970] mb-1">
              <Clock size={13} />
              <span className="text-xs">Estimated wait</span>
            </div>
            <p className="font-mono text-3xl font-medium text-[#141412]">
              {order.status === 'ready' ? '0' : minLeft}
            </p>
            <p className="text-xs text-[#7A7970]">min</p>
          </div>
        </div>

        {/* Token */}
        <div className="bg-[#141412] rounded-xl p-5 mb-6 flex items-center justify-between">
          <div>
            <p className="text-xs font-mono text-white/50 mb-1">Your token</p>
            <p className="font-mono text-3xl font-medium text-white">{order.token}</p>
          </div>
          <button
            onClick={() => navigate('digital-token', { order })}
            className="text-xs text-white/70 hover:text-white transition-colors"
          >
            View token →
          </button>
        </div>

        {/* Progress tracker */}
        <div className="bg-white rounded-xl border border-[#E2E0D8] p-5 mb-6">
          <h3 className="text-xs font-medium text-[#7A7970] uppercase tracking-widest mb-4">Status</h3>
          <div className="space-y-0">
            {steps.map((step, i) => {
              const done = i < currentIdx;
              const active = i === currentIdx;
              const upcoming = i > currentIdx;
              return (
                <div key={step.key} className="flex items-start gap-3">
                  <div className="flex flex-col items-center">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                      done ? 'bg-[#2A6B43]' : active ? 'bg-[#141412]' : 'bg-[#EAE9E3]'
                    }`}>
                      {done && <CheckCircle size={12} className="text-white" />}
                      {active && <Loader size={12} className="text-white animate-spin" />}
                      {upcoming && <Circle size={12} className="text-[#C8C6BC]" />}
                    </div>
                    {i < steps.length - 1 && (
                      <div className={`w-px h-6 mt-0.5 transition-colors ${done ? 'bg-[#2A6B43]' : 'bg-[#E2E0D8]'}`} />
                    )}
                  </div>
                  <p className={`text-sm pb-4 pt-0.5 ${
                    done ? 'text-[#7A7970] line-through' : active ? 'text-[#141412] font-medium' : 'text-[#C8C6BC]'
                  }`}>
                    {step.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Order items */}
        <div className="bg-white rounded-xl border border-[#E2E0D8] p-5">
          <h3 className="text-xs font-medium text-[#7A7970] uppercase tracking-widest mb-4">Items</h3>
          <div className="space-y-2">
            {order.items.map(item => (
              <div key={item.food.id} className="flex justify-between text-sm">
                <span className="text-[#7A7970]">{item.food.name} × {item.quantity}</span>
                <span className="font-mono text-[#141412]">₹{item.food.price * item.quantity}</span>
              </div>
            ))}
            <div className="border-t border-[#E2E0D8] pt-2 flex justify-between font-medium text-sm">
              <span className="text-[#141412]">Total</span>
              <span className="font-mono text-[#141412]">₹{order.total}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
