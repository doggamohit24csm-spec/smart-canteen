import { Clock, CheckCircle, Circle, Loader } from 'lucide-react';
import { useApp } from '../context/AppContext';
import BackButton from '../components/BackButton';
import type { Order } from '../types';

const steps = [
  { key: 'received', label: 'Order received' },
  { key: 'confirmed', label: 'Confirmed' },
  { key: 'preparing', label: 'Preparing' },
  { key: 'ready', label: 'Ready for pickup' },
  { key: 'completed', label: 'Completed' },
] as const;

const statusOrder = ['received', 'confirmed', 'preparing', 'ready', 'completed'];

export default function DigitalToken() {
  const { pageParams, orders, navigate, currentOrder } = useApp();
  const passedOrder = pageParams.order as Order | undefined;
  const order = passedOrder || currentOrder || orders[0];

  if (!order) { navigate('dashboard'); return null; }

  const currentIdx = statusOrder.indexOf(order.status);
  const minLeft = Math.max(0, Math.round((order.estimatedReady.getTime() - Date.now()) / 60000));

  return (
    <div className="min-h-screen bg-[#F8F7F4] pb-24 md:pb-10">
      <div className="max-w-sm mx-auto px-4 md:px-6 pt-8">
        <BackButton onClick={() => navigate('order-tracking', { orderId: order.id })} label="Track order" />

        {/* Token card — styled like a boarding pass */}
        <div className="bg-white rounded-2xl border border-[#E2E0D8] overflow-hidden mb-6">
          {/* Header */}
          <div className="bg-[#141412] px-6 py-5">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-md bg-white/10 flex items-center justify-center">
                  <span className="font-mono text-[8px] text-white font-medium">SB</span>
                </div>
                <span className="text-white text-sm font-semibold">SmartBite</span>
              </div>
              <span className="font-mono text-xs text-white/50">#{order.id}</span>
            </div>
            <p className="text-white/50 text-xs">Main College Canteen</p>
          </div>

          {/* Dashed separator */}
          <div className="flex items-center px-4">
            <div className="w-4 h-4 rounded-full bg-[#F8F7F4] border border-[#E2E0D8] -ml-6 flex-shrink-0" />
            <div className="flex-1 border-t border-dashed border-[#E2E0D8] mx-1" />
            <div className="w-4 h-4 rounded-full bg-[#F8F7F4] border border-[#E2E0D8] -mr-6 flex-shrink-0" />
          </div>

          {/* Token number */}
          <div className="px-6 py-8 text-center">
            <p className="text-xs font-mono font-medium text-[#7A7970] uppercase tracking-widest mb-3">
              Your pickup token
            </p>
            <div className="font-mono text-8xl font-medium text-[#141412] tracking-tight mb-2">
              {order.token}
            </div>
            <p className="text-xs text-[#7A7970]">Show this when collecting your order</p>
          </div>

          {/* Status row */}
          <div className="border-t border-[#E2E0D8] px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-[#7A7970]">Status</p>
                <p className="text-sm font-medium text-[#141412] capitalize">{order.status.replace('-', ' ')}</p>
              </div>
              {order.status !== 'ready' && order.status !== 'completed' && (
                <div className="flex items-center gap-1 text-[#7A7970]">
                  <Clock size={13} />
                  <span className="font-mono text-sm">{minLeft} min</span>
                </div>
              )}
              {order.status === 'ready' && (
                <span className="font-mono text-sm text-[#2A6B43] font-medium">Ready now!</span>
              )}
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="bg-white rounded-xl border border-[#E2E0D8] p-5">
          <h3 className="text-xs font-medium text-[#7A7970] uppercase tracking-widest mb-4">Order progress</h3>
          <div className="space-y-0">
            {steps.map((step, i) => {
              const done = i < currentIdx;
              const active = i === currentIdx;
              const upcoming = i > currentIdx;
              return (
                <div key={step.key} className="flex items-start gap-3">
                  <div className="flex flex-col items-center">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                      done ? 'bg-[#2A6B43]' : active ? 'bg-[#141412]' : 'bg-[#EAE9E3]'
                    }`}>
                      {done && <CheckCircle size={12} className="text-white" />}
                      {active && <Loader size={12} className="text-white animate-spin" />}
                      {upcoming && <Circle size={12} className="text-[#C8C6BC]" />}
                    </div>
                    {i < steps.length - 1 && (
                      <div className={`w-px h-6 mt-0.5 ${done ? 'bg-[#2A6B43]' : 'bg-[#E2E0D8]'}`} />
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
      </div>
    </div>
  );
}
