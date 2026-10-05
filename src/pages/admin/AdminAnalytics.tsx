import { useApp } from '../../context/AppContext';
import AdminLayout from './AdminLayout';
import { hourlyForecast } from '../../data';
import type { CrowdLevel } from '../../types';

const weeklyOrders = [
  { day: 'Mon', count: 42, revenue: 2940 },
  { day: 'Tue', count: 58, revenue: 4060 },
  { day: 'Wed', count: 51, revenue: 3570 },
  { day: 'Thu', count: 67, revenue: 4690 },
  { day: 'Fri', count: 89, revenue: 6230 },
  { day: 'Sat', count: 34, revenue: 2380 },
  { day: 'Sun', count: 21, revenue: 1470 },
];

const popularItems = [
  { name: 'Veg Burger', orders: 87, pct: 100 },
  { name: 'Masala Dosa', orders: 73, pct: 84 },
  { name: 'French Fries', orders: 65, pct: 75 },
  { name: 'Veg Fried Rice', orders: 58, pct: 67 },
  { name: 'Cold Coffee', orders: 52, pct: 60 },
  { name: 'Paneer Roll', orders: 44, pct: 51 },
];

const levelColor: Record<CrowdLevel, string> = {
  LOW: '#2A6B43',
  MODERATE: '#B87A0A',
  HIGH: '#B04040',
  'VERY HIGH': '#8B2020',
};

export default function AdminAnalytics() {
  const { orders } = useApp();

  const completedOrders = orders.filter(o => o.status === 'completed');
  const totalRevenue = completedOrders.reduce((s, o) => s + o.total, 0);
  const totalWeekOrders = weeklyOrders.reduce((s, d) => s + d.count, 0);
  const weekRevenue = weeklyOrders.reduce((s, d) => s + d.revenue, 0);
  const maxWeekCount = Math.max(...weeklyOrders.map(d => d.count));
  const maxHourVal = Math.max(...hourlyForecast.map(h => h.value));

  const todayIdx = new Date().getDay(); // 0=Sun
  const adjustedIdx = todayIdx === 0 ? 6 : todayIdx - 1;

  return (
    <AdminLayout>
      <div className="px-4 md:px-8 py-8">
        <div className="mb-8">
          <h1 className="font-display text-3xl text-[#141412] mb-1">Analytics</h1>
          <p className="text-[#7A7970] text-sm">
            Week of {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>

        {/* Summary stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Orders today", value: String(orders.length), sub: `${completedOrders.length} completed` },
            { label: "This week", value: String(totalWeekOrders), sub: "across 7 days" },
            { label: "Revenue today", value: `₹${totalRevenue || 475}`, sub: "from completed orders" },
            { label: "Avg wait time", value: "11 min", sub: "across all orders" },
          ].map(stat => (
            <div key={stat.label} className="bg-white rounded-xl border border-[#E2E0D8] p-5">
              <p className="text-xs font-medium text-[#7A7970] uppercase tracking-widest mb-2">{stat.label}</p>
              <p className="font-mono text-2xl font-medium text-[#141412]">{stat.value}</p>
              <p className="text-xs text-[#7A7970] mt-1">{stat.sub}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* Weekly orders bar chart */}
          <div className="bg-white rounded-xl border border-[#E2E0D8] p-5">
            <h3 className="text-sm font-semibold text-[#141412] mb-1">Orders this week</h3>
            <p className="text-xs text-[#7A7970] mb-5">Daily order volume</p>
            <div className="flex items-end gap-2 h-32 mb-2">
              {weeklyOrders.map((d, i) => {
                const heightPct = (d.count / maxWeekCount) * 100;
                const isToday = i === adjustedIdx;
                return (
                  <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                    <span className="text-[10px] font-mono text-[#7A7970]">{d.count}</span>
                    <div
                      className="w-full rounded-t-md transition-all"
                      style={{
                        height: `${heightPct}%`,
                        backgroundColor: isToday ? '#141412' : '#E2E0D8',
                      }}
                    />
                  </div>
                );
              })}
            </div>
            <div className="flex gap-2">
              {weeklyOrders.map((d, i) => (
                <div key={d.day} className="flex-1 text-center">
                  <span className={`text-[10px] font-medium ${i === adjustedIdx ? 'text-[#141412]' : 'text-[#7A7970]'}`}>
                    {d.day}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-[#F0EFE9] flex justify-between">
              <span className="text-xs text-[#7A7970]">Week total</span>
              <span className="font-mono text-xs font-medium text-[#141412]">₹{weekRevenue.toLocaleString()}</span>
            </div>
          </div>

          {/* Peak hours */}
          <div className="bg-white rounded-xl border border-[#E2E0D8] p-5">
            <h3 className="text-sm font-semibold text-[#141412] mb-1">Peak hours</h3>
            <p className="text-xs text-[#7A7970] mb-5">Crowd activity by time of day</p>
            <div className="space-y-2.5">
              {hourlyForecast.map(row => (
                <div key={row.time} className="flex items-center gap-3">
                  <span className="font-mono text-xs text-[#7A7970] w-12 text-right">{row.time}</span>
                  <div className="flex-1 bg-[#EAE9E3] rounded-full h-1.5 overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${(row.value / maxHourVal) * 100}%`,
                        backgroundColor: levelColor[row.level],
                        opacity: 0.75,
                      }}
                    />
                  </div>
                  <span className="text-[10px] text-[#7A7970] w-10">{row.wait}m wait</span>
                </div>
              ))}
            </div>
            <div className="flex gap-4 mt-4 pt-4 border-t border-[#F0EFE9]">
              {(['LOW', 'MODERATE', 'HIGH'] as CrowdLevel[]).map(l => (
                <div key={l} className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ backgroundColor: levelColor[l] }} />
                  <span className="text-[10px] text-[#7A7970] capitalize">{l.toLowerCase()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Popular food */}
          <div className="bg-white rounded-xl border border-[#E2E0D8] p-5">
            <h3 className="text-sm font-semibold text-[#141412] mb-1">Popular food</h3>
            <p className="text-xs text-[#7A7970] mb-5">Top items by order count this week</p>
            <div className="space-y-4">
              {popularItems.map((item, i) => (
                <div key={item.name}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-[#7A7970] w-4">{i + 1}</span>
                      <span className="text-sm text-[#141412]">{item.name}</span>
                    </div>
                    <span className="font-mono text-xs text-[#7A7970]">{item.orders} orders</span>
                  </div>
                  <div className="bg-[#EAE9E3] rounded-full h-1.5 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-[#141412]"
                      style={{ width: `${item.pct}%`, opacity: i === 0 ? 1 : 0.4 + (0.6 * item.pct / 100) }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Completed vs cancelled */}
          <div className="bg-white rounded-xl border border-[#E2E0D8] p-5">
            <h3 className="text-sm font-semibold text-[#141412] mb-1">Order outcomes</h3>
            <p className="text-xs text-[#7A7970] mb-6">Completion rate this week</p>

            {/* Simple donut-style ring */}
            <div className="flex items-center justify-center mb-6">
              <div className="relative w-28 h-28">
                <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="#EAE9E3" strokeWidth="3.2" />
                  <circle
                    cx="18" cy="18" r="15.9" fill="none"
                    stroke="#2A6B43" strokeWidth="3.2"
                    strokeDasharray="88 12"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-mono text-2xl font-medium text-[#141412]">88%</span>
                  <span className="text-[10px] text-[#7A7970]">completed</span>
                </div>
              </div>
            </div>

            <div className="space-y-2.5">
              {[
                { label: 'Completed', count: 362, color: '#2A6B43', bg: '#EBF5EF' },
                { label: 'Cancelled', count: 28, color: '#B04040', bg: '#FDF2F2' },
                { label: 'Active / pending', count: orders.filter(o => !['completed', 'cancelled'].includes(o.status)).length + 21, color: '#B87A0A', bg: '#FEF7E6' },
              ].map(row => (
                <div key={row.label} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: row.color }} />
                    <span className="text-[#7A7970]">{row.label}</span>
                  </div>
                  <span className="font-mono text-[#141412] font-medium">{row.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
