import { Clock, Users, TrendingUp, Star } from 'lucide-react';
import { useApp } from '../context/AppContext';
import BackButton from '../components/BackButton';
import CrowdBadge from '../components/CrowdBadge';
import { hourlyForecast } from '../data';
import type { CrowdLevel } from '../types';

const levelColor: Record<CrowdLevel, string> = {
  LOW: '#2A6B43',
  MODERATE: '#B87A0A',
  HIGH: '#B04040',
  'VERY HIGH': '#8B2020',
};

export default function CrowdDetails() {
  const { canteenStatus, navigate } = useApp();
  const { level, waitTime, peopleWaiting, activeOrders } = canteenStatus;

  const maxVal = Math.max(...hourlyForecast.map(h => h.value));
  const now = new Date().getHours();
  const currentHourIdx = hourlyForecast.findIndex(h => {
    const hh = parseInt(h.time.split(' ')[0]);
    const isPM = h.time.includes('PM') && hh !== 12;
    const hour24 = isPM ? hh + 12 : hh;
    return Math.abs(hour24 - now) < 2;
  });

  return (
    <div className="min-h-screen bg-[#F8F7F4] pb-24 md:pb-10">
      <div className="max-w-2xl mx-auto px-4 md:px-6 pt-8">
        <BackButton onClick={() => navigate('dashboard')} />
        <h1 className="font-display text-4xl text-[#141412] mb-8">Canteen status.</h1>

        {/* Current status */}
        <div className="bg-white rounded-2xl border border-[#E2E0D8] p-6 mb-4">
          <div className="flex items-start justify-between mb-6">
            <div>
              <p className="text-xs font-mono font-medium text-[#7A7970] uppercase tracking-widest mb-2">Current crowd</p>
              <CrowdBadge level={level} size="lg" />
            </div>
            <p className="text-xs text-[#7A7970]">Updated live</p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {[
              { icon: Clock, label: 'Wait time', value: `${waitTime}`, unit: 'min' },
              { icon: Users, label: 'Waiting', value: `${peopleWaiting}`, unit: 'people' },
              { icon: TrendingUp, label: 'Active orders', value: `${activeOrders}`, unit: 'orders' },
            ].map(({ icon: Icon, label, value, unit }) => (
              <div key={label}>
                <div className="flex items-center gap-1 text-[#7A7970] mb-1">
                  <Icon size={11} />
                  <span className="text-xs">{label}</span>
                </div>
                <p className="font-mono text-2xl font-medium text-[#141412]">{value}</p>
                <p className="text-xs text-[#7A7970]">{unit}</p>
              </div>
            ))}
          </div>

          <p className="text-xs text-[#7A7970] mt-4">Based on current orders and queue activity.</p>
        </div>

        {/* Crowd guide */}
        <div className="bg-white rounded-xl border border-[#E2E0D8] p-5 mb-4">
          <p className="text-xs font-medium text-[#7A7970] uppercase tracking-widest mb-4">What the crowd level means</p>
          <div className="space-y-3">
            {[
              { l: 'LOW' as CrowdLevel, wait: '5–8 min', desc: 'A great time to visit or order.' },
              { l: 'MODERATE' as CrowdLevel, wait: '10–18 min', desc: 'Consider ordering ahead to save time.' },
              { l: 'HIGH' as CrowdLevel, wait: '20–30 min', desc: 'Order now and pick up when ready.' },
              { l: 'VERY HIGH' as CrowdLevel, wait: '30+ min', desc: 'Strong recommendation to order ahead.' },
            ].map(row => (
              <div key={row.l} className="flex items-center gap-3">
                <CrowdBadge level={row.l} size="sm" />
                <span className="font-mono text-xs text-[#141412]">{row.wait}</span>
                <span className="text-xs text-[#7A7970]">{row.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Hourly forecast */}
        <div className="bg-white rounded-xl border border-[#E2E0D8] p-5 mb-4">
          <p className="text-xs font-medium text-[#7A7970] uppercase tracking-widest mb-5">Today's forecast</p>
          <div className="space-y-3">
            {hourlyForecast.map((row, i) => (
              <div key={row.time} className={`flex items-center gap-3 ${i === currentHourIdx ? 'opacity-100' : 'opacity-70'}`}>
                <span className={`font-mono text-xs w-12 text-right ${i === currentHourIdx ? 'text-[#141412] font-medium' : 'text-[#7A7970]'}`}>
                  {row.time}
                </span>
                <div className="flex-1 bg-[#EAE9E3] rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${(row.value / maxVal) * 100}%`,
                      backgroundColor: levelColor[row.level],
                    }}
                  />
                </div>
                <div className="w-20 flex items-center justify-between">
                  <CrowdBadge level={row.level} size="sm" />
                </div>
                {i === currentHourIdx && (
                  <span className="text-[10px] font-mono font-medium text-[#2A6B43]">now</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Best time */}
        <div className="bg-[#EBF5EF] rounded-xl p-5">
          <div className="flex items-start gap-3">
            <Star size={16} className="text-[#2A6B43] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-[#141412] mb-1">Best time to visit</p>
              <p className="font-mono text-lg font-medium text-[#2A6B43] mb-1">2:30 PM – 3:00 PM</p>
              <p className="text-xs text-[#2A6B43]/80">Crowd drops to LOW with an estimated 5–6 minute wait.</p>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={() => navigate('menu')}
            className="w-full bg-[#141412] text-white text-sm font-medium py-3 rounded-xl hover:bg-[#2A6B43] transition-colors"
          >
            Browse today's menu
          </button>
        </div>
      </div>
    </div>
  );
}
