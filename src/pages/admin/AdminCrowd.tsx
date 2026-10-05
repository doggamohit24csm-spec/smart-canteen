import { Clock, Users, TrendingUp, Activity } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import AdminLayout from './AdminLayout';
import CrowdBadge from '../../components/CrowdBadge';
import { hourlyForecast } from '../../data';
import type { CrowdLevel } from '../../types';

const levelColor: Record<CrowdLevel, string> = {
  LOW: '#2A6B43',
  MODERATE: '#B87A0A',
  HIGH: '#B04040',
  'VERY HIGH': '#8B2020',
};

export default function AdminCrowd() {
  const { canteenStatus } = useApp();
  const { level, waitTime, peopleWaiting, activeOrders } = canteenStatus;

  const maxVal = Math.max(...hourlyForecast.map(h => h.value));

  const trendData = [
    { label: 'Previous hour', value: 52, level: 'MODERATE' as CrowdLevel },
    { label: 'Current hour', value: activeOrders * 2.5, level },
    { label: 'Next hour (forecast)', value: 85, level: 'HIGH' as CrowdLevel },
  ];

  return (
    <AdminLayout>
      <div className="px-4 md:px-8 py-8">
        <h1 className="font-display text-3xl text-[#141412] mb-6">Crowd monitoring</h1>

        {/* Current status */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            { icon: Activity, label: 'Current crowd', value: level, isLevel: true },
            { icon: Users, label: 'People waiting', value: String(peopleWaiting) },
            { icon: TrendingUp, label: 'Active orders', value: String(activeOrders) },
            { icon: Clock, label: 'Estimated wait', value: `${waitTime} min` },
          ].map(stat => (
            <div key={stat.label} className="bg-white rounded-xl border border-[#E2E0D8] p-4">
              <div className="flex items-center gap-1 text-[#7A7970] mb-2">
                <stat.icon size={12} />
                <span className="text-xs">{stat.label}</span>
              </div>
              {stat.isLevel ? (
                <CrowdBadge level={level} size="md" />
              ) : (
                <p className="font-mono text-2xl font-medium text-[#141412]">{stat.value}</p>
              )}
            </div>
          ))}
        </div>

        {/* Hourly trend */}
        <div className="bg-white rounded-xl border border-[#E2E0D8] p-5 mb-4">
          <h3 className="text-sm font-semibold text-[#141412] mb-1">Hourly crowd trend</h3>
          <p className="text-xs text-[#7A7970] mb-5">Today's predicted and actual crowd activity</p>

          {/* Bar chart */}
          <div className="flex items-end gap-2 h-28 mb-2">
            {hourlyForecast.map((row, i) => {
              const heightPct = (row.value / maxVal) * 100;
              const now = new Date().getHours();
              const hh = parseInt(row.time.split(' ')[0]);
              const isPM = row.time.includes('PM') && hh !== 12;
              const hour24 = isPM ? hh + 12 : hh;
              const isNow = Math.abs(hour24 - now) < 1;
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className="w-full rounded-t-md transition-all relative"
                    style={{
                      height: `${heightPct}%`,
                      backgroundColor: levelColor[row.level],
                      opacity: isNow ? 1 : 0.5,
                    }}
                  />
                </div>
              );
            })}
          </div>
          <div className="flex gap-2">
            {hourlyForecast.map(row => (
              <div key={row.time} className="flex-1 text-center">
                <span className="text-[10px] text-[#7A7970]">{row.time.replace(' AM', '').replace(' PM', '')}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-3 mt-3">
            {(['LOW', 'MODERATE', 'HIGH'] as CrowdLevel[]).map(l => (
              <div key={l} className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: levelColor[l] }} />
                <span className="text-[10px] text-[#7A7970] capitalize">{l.toLowerCase()}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Hour comparison */}
        <div className="bg-white rounded-xl border border-[#E2E0D8] p-5">
          <h3 className="text-sm font-semibold text-[#141412] mb-4">Hour comparison</h3>
          <div className="space-y-4">
            {trendData.map(row => (
              <div key={row.label}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs text-[#7A7970]">{row.label}</span>
                  <CrowdBadge level={row.level} size="sm" />
                </div>
                <div className="bg-[#EAE9E3] rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${Math.min(100, (row.value / 100) * 100)}%`,
                      backgroundColor: levelColor[row.level],
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 p-4 bg-[#EBF5EF] rounded-xl">
            <p className="text-xs font-medium text-[#2A6B43] mb-1">Recommendation</p>
            <p className="text-sm text-[#2A6B43]">
              {level === 'HIGH'
                ? 'Consider temporarily limiting new orders to reduce congestion.'
                : level === 'MODERATE'
                ? 'Current staffing should handle the load. Monitor closely.'
                : 'Low crowd. Good time to prepare for the upcoming lunch rush.'}
            </p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
