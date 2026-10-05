import { TrendingUp, Clock, CheckCircle, ShoppingBag } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import AdminLayout from './AdminLayout';
import CrowdBadge from '../../components/CrowdBadge';
import StatusBadge from '../../components/StatusBadge';

const StatCard = ({ icon: Icon, label, value, sub, color }: {
  icon: typeof TrendingUp; label: string; value: string; sub?: string; color?: string;
}) => (
  <div className="bg-white rounded-xl border border-[#E2E0D8] p-5">
    <div className="flex items-center justify-between mb-3">
      <p className="text-xs font-medium text-[#7A7970] uppercase tracking-widest">{label}</p>
      <div className="w-7 h-7 rounded-lg bg-[#EAE9E3] flex items-center justify-center">
        <Icon size={13} className="text-[#7A7970]" />
      </div>
    </div>
    <p className="font-mono text-3xl font-medium" style={{ color: color ?? '#141412' }}>{value}</p>
    {sub && <p className="text-xs text-[#7A7970] mt-1">{sub}</p>}
  </div>
);

export default function AdminDashboard() {
  const { orders, canteenStatus, navigate } = useApp();

  const activeOrders = orders.filter(o => !['completed', 'cancelled'].includes(o.status));
  const revenue = orders.filter(o => o.status === 'completed').reduce((s, o) => s + o.total, 0);
  const avgPrepTime = 8;

  const recentOrders = orders.slice(0, 5);

  return (
    <AdminLayout>
      <div className="px-4 md:px-8 py-8">
        <div className="mb-8">
          <h1 className="font-display text-3xl text-[#141412] mb-1">Overview</h1>
          <p className="text-[#7A7970] text-sm">
            {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard icon={ShoppingBag} label="Today's orders" value={String(orders.length)} sub="total placed" />
          <StatCard icon={TrendingUp} label="Active orders" value={String(activeOrders.length)} sub="in queue" color="#B87A0A" />
          <StatCard icon={CheckCircle} label="Revenue" value={`₹${revenue}`} sub="from completed" color="#2A6B43" />
          <StatCard icon={Clock} label="Avg prep time" value={`${avgPrepTime}m`} sub="per order" />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent orders */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-[#E2E0D8] overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#E2E0D8]">
              <h3 className="text-sm font-semibold text-[#141412]">Recent orders</h3>
              <button onClick={() => navigate('admin-orders')} className="text-xs text-[#7A7970] hover:text-[#141412] transition-colors">
                View all →
              </button>
            </div>
            <div className="divide-y divide-[#F0EFE9]">
              {recentOrders.map(order => (
                <div key={order.id} className="flex items-center justify-between px-5 py-3.5">
                  <div>
                    <span className="font-mono text-sm font-medium text-[#141412]">#{order.id}</span>
                    <p className="text-xs text-[#7A7970] mt-0.5">
                      {order.items.map(i => i.food.name).join(', ')}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-[#141412]">{order.token}</span>
                    <StatusBadge status={order.status} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Crowd status */}
          <div className="bg-white rounded-xl border border-[#E2E0D8] p-5">
            <h3 className="text-sm font-semibold text-[#141412] mb-4">Current crowd</h3>
            <div className="text-center mb-4">
              <CrowdBadge level={canteenStatus.level} size="lg" />
            </div>
            <div className="space-y-3">
              {[
                { label: 'Wait time', value: `${canteenStatus.waitTime} min` },
                { label: 'People waiting', value: `${canteenStatus.peopleWaiting}` },
                { label: 'Active orders', value: `${canteenStatus.activeOrders}` },
              ].map(row => (
                <div key={row.label} className="flex justify-between text-sm">
                  <span className="text-[#7A7970]">{row.label}</span>
                  <span className="font-mono font-medium text-[#141412]">{row.value}</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => navigate('admin-crowd')}
              className="w-full mt-4 border border-[#E2E0D8] text-[#141412] text-xs font-medium py-2 rounded-lg hover:bg-[#EAE9E3] transition-colors"
            >
              View crowd details
            </button>
          </div>
        </div>

        {/* Analytics mini */}
        <div className="mt-6 bg-white rounded-xl border border-[#E2E0D8] p-5">
          <h3 className="text-sm font-semibold text-[#141412] mb-4">Popular items today</h3>
          <div className="space-y-3">
            {[
              { name: 'Veg Burger', orders: 18, pct: 90 },
              { name: 'Masala Dosa', orders: 15, pct: 75 },
              { name: 'French Fries', orders: 12, pct: 60 },
              { name: 'Veg Fried Rice', orders: 10, pct: 50 },
            ].map(item => (
              <div key={item.name} className="flex items-center gap-3">
                <span className="text-sm text-[#141412] w-36 truncate">{item.name}</span>
                <div className="flex-1 bg-[#EAE9E3] rounded-full h-1.5 overflow-hidden">
                  <div
                    className="h-full bg-[#141412] rounded-full"
                    style={{ width: `${item.pct}%` }}
                  />
                </div>
                <span className="font-mono text-xs text-[#7A7970] w-16 text-right">{item.orders} orders</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
