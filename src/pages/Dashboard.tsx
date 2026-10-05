import { ArrowRight, Clock, Package } from 'lucide-react';
import { useApp } from '../context/AppContext';
import CrowdStatus from '../components/CrowdStatus';
import FoodCard from '../components/FoodCard';
import StatusBadge from '../components/StatusBadge';

export default function Dashboard() {
  const { user, navigate, foods, orders, currentOrder, canteenStatus } = useApp();

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  const popularFoods = foods.filter(f => f.popular && f.available).slice(0, 4);
  const activeOrders = orders.filter(o => !['completed', 'cancelled'].includes(o.status)).slice(0, 2);

  return (
    <div className="min-h-screen bg-[#F8F7F4] pb-24 md:pb-10">
      <div className="max-w-6xl mx-auto px-4 md:px-6 pt-8">

        {/* Hero */}
        <div className="mb-8">
          <h1 className="font-display text-4xl md:text-5xl text-[#141412] mb-1">
            {greeting}{user?.name ? `, ${user.name.split(' ')[0]}` : ''}.
          </h1>
          <p className="font-display text-2xl md:text-3xl text-[#7A7970] mb-2">What's for lunch?</p>
          <p className="text-sm text-[#7A7970] mb-5">Order ahead and spend less time waiting.</p>
          <button
            onClick={() => navigate('menu')}
            className="inline-flex items-center gap-2 bg-[#141412] text-white text-sm font-medium px-5 py-2.5 rounded-xl hover:bg-[#2A6B43] transition-colors"
          >
            Browse menu <ArrowRight size={15} />
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-10">
          {/* Canteen status */}
          <div className="lg:col-span-1">
            <CrowdStatus />
          </div>

          {/* Active orders */}
          <div className="lg:col-span-2">
            {activeOrders.length > 0 ? (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-sm font-semibold text-[#141412]">Active orders</h2>
                  <button onClick={() => navigate('order-history')} className="text-xs text-[#7A7970] hover:text-[#141412]">
                    View all →
                  </button>
                </div>
                <div className="space-y-3">
                  {activeOrders.map(order => (
                    <div
                      key={order.id}
                      onClick={() => navigate('order-tracking', { orderId: order.id })}
                      className="bg-white rounded-xl border border-[#E2E0D8] p-4 cursor-pointer hover:border-[#C8C6BC] transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <span className="font-mono text-sm font-medium text-[#141412]">#{order.id}</span>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="font-mono text-xl font-medium text-[#141412]">{order.token}</span>
                            <span className="text-xs text-[#7A7970]">token</span>
                          </div>
                        </div>
                        <StatusBadge status={order.status} />
                      </div>
                      <p className="text-xs text-[#7A7970] mb-2">
                        {order.items.map(i => `${i.food.name}${i.quantity > 1 ? ` ×${i.quantity}` : ''}`).join(', ')}
                      </p>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1 text-xs text-[#7A7970]">
                          <Clock size={11} />
                          <span>
                            {order.status === 'ready'
                              ? 'Ready for pickup!'
                              : `~${Math.max(0, Math.round((order.estimatedReady.getTime() - Date.now()) / 60000))} min`}
                          </span>
                        </div>
                        {order.queuePosition > 0 && (
                          <div className="flex items-center gap-1 text-xs text-[#7A7970]">
                            <Package size={11} />
                            <span>Queue #{order.queuePosition}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-[#E2E0D8] p-6 h-full flex flex-col justify-center">
                <p className="text-sm font-medium text-[#141412] mb-1">No active orders</p>
                <p className="text-xs text-[#7A7970] mb-4">Order ahead and your active orders will appear here.</p>
                <button
                  onClick={() => navigate('menu')}
                  className="text-sm text-[#2A6B43] font-medium hover:underline self-start"
                >
                  Browse today's menu →
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Popular items */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-[#141412]">Popular right now</h2>
            <button onClick={() => navigate('menu')} className="text-xs text-[#7A7970] hover:text-[#141412] transition-colors">
              View full menu →
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {popularFoods.map(food => (
              <FoodCard key={food.id} food={food} />
            ))}
          </div>
        </div>

        {/* Quick tip */}
        <div className="mt-8 bg-[#EBF5EF] rounded-xl p-4 flex items-start gap-3">
          <div className="w-2 h-2 rounded-full bg-[#2A6B43] mt-1 flex-shrink-0 animate-pulse-gentle" />
          <p className="text-sm text-[#2A6B43]">
            Crowd is <strong>{canteenStatus.level.toLowerCase()}</strong> right now.{' '}
            {canteenStatus.level === 'LOW'
              ? "It's a great time to visit or order."
              : canteenStatus.level === 'MODERATE'
              ? 'Consider ordering ahead to save time.'
              : 'Order now and skip the queue entirely.'}
          </p>
        </div>
      </div>
    </div>
  );
}
