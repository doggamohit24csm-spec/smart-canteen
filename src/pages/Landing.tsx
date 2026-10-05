import { ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import CrowdBadge from '../components/CrowdBadge';

export default function Landing() {
  const { navigate, canteenStatus } = useApp();

  return (
    <div className="min-h-screen bg-[#F8F7F4]">
      {/* Minimal header */}
      <header className="border-b border-[#E2E0D8] bg-[#F8F7F4]/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#141412] flex items-center justify-center">
              <span className="font-mono text-[10px] font-medium text-white">SB</span>
            </div>
            <span className="font-semibold text-[#141412] text-sm tracking-tight">SmartBite</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('login')}
              className="text-sm text-[#7A7970] hover:text-[#141412] transition-colors"
            >
              Sign in
            </button>
            <button
              onClick={() => navigate('register')}
              className="text-sm bg-[#141412] text-white px-4 py-2 rounded-xl hover:bg-[#2A6B43] transition-colors"
            >
              Get started
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono font-medium text-[#2A6B43] bg-[#EBF5EF] px-3 py-1.5 rounded-full mb-6">
              <span className="w-1.5 h-1.5 bg-[#2A6B43] rounded-full animate-pulse-gentle" />
              Live canteen status available
            </div>
            <h1 className="font-display text-6xl lg:text-7xl text-[#141412] leading-[1.05] mb-6">
              Skip the<br />queue.
            </h1>
            <p className="text-lg text-[#7A7970] leading-relaxed mb-8 max-w-md">
              See how busy the canteen is, order before you arrive, and pick up your food when it's ready.
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('register')}
                className="bg-[#141412] text-white text-sm font-medium px-6 py-3 rounded-xl hover:bg-[#2A6B43] transition-colors flex items-center gap-2"
              >
                Order ahead <ArrowRight size={16} />
              </button>
              <button
                onClick={() => navigate('login')}
                className="text-sm text-[#7A7970] hover:text-[#141412] transition-colors px-4 py-3"
              >
                View canteen status →
              </button>
            </div>
          </div>

          {/* Product preview card */}
          <div className="lg:flex lg:justify-end">
            <div className="bg-white rounded-2xl border border-[#E2E0D8] p-6 max-w-sm shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-md bg-[#141412] flex items-center justify-center">
                    <span className="font-mono text-[8px] text-white font-medium">SB</span>
                  </div>
                  <span className="text-sm font-semibold text-[#141412]">Canteen Status</span>
                </div>
                <CrowdBadge level={canteenStatus.level} size="sm" />
              </div>

              <div className="grid grid-cols-3 gap-3 mb-5">
                {[
                  { label: 'Wait', value: `${canteenStatus.waitTime}`, unit: 'min' },
                  { label: 'Waiting', value: `${canteenStatus.peopleWaiting}`, unit: 'people' },
                  { label: 'Active', value: `${canteenStatus.activeOrders}`, unit: 'orders' },
                ].map(stat => (
                  <div key={stat.label} className="bg-[#F8F7F4] rounded-xl p-3">
                    <p className="text-[10px] text-[#7A7970] mb-1">{stat.label}</p>
                    <p className="font-mono text-lg font-medium text-[#141412]">{stat.value}</p>
                    <p className="text-[10px] text-[#7A7970]">{stat.unit}</p>
                  </div>
                ))}
              </div>

              <div className="border-t border-[#F0EFE9] pt-4">
                <p className="text-xs text-[#7A7970] mb-3">Popular right now</p>
                {['Veg Burger', 'Masala Dosa', 'French Fries'].map((item, i) => (
                  <div key={item} className="flex items-center justify-between py-2 border-b border-[#F8F7F4] last:border-0">
                    <span className="text-sm text-[#141412]">{item}</span>
                    <span className="font-mono text-xs text-[#7A7970]">₹{[60, 50, 45][i]}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => navigate('register')}
                className="w-full mt-4 bg-[#141412] text-white text-sm font-medium py-2.5 rounded-xl hover:bg-[#2A6B43] transition-colors"
              >
                Order ahead
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-[#E2E0D8]">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <p className="text-xs font-mono font-medium text-[#7A7970] uppercase tracking-widest mb-10">How it works</p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { num: '01', title: 'Check the crowd', desc: "See how busy the canteen is before you even leave your seat. Know your wait time instantly." },
              { num: '02', title: 'Order ahead', desc: "Browse today's menu and place your order from anywhere. Skip the counter completely." },
              { num: '03', title: 'Pick up when ready', desc: "Get your digital token and head to the canteen only when your order is prepared." },
            ].map(step => (
              <div key={step.num}>
                <p className="font-mono text-sm font-medium text-[#2A6B43] mb-3">{step.num}</p>
                <h3 className="font-display text-2xl text-[#141412] mb-2">{step.title}</h3>
                <p className="text-[#7A7970] text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Smart crowd section */}
      <section className="border-t border-[#E2E0D8] bg-white">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs font-mono font-medium text-[#7A7970] uppercase tracking-widest mb-4">Smart crowd</p>
              <h2 className="font-display text-4xl text-[#141412] mb-4">
                Don't guess when the canteen is busy.
              </h2>
              <p className="text-[#7A7970] leading-relaxed mb-6">
                SmartBite uses current order activity and queue information to estimate how long your order may take — updated continuously throughout the day.
              </p>
              <div className="space-y-3">
                {[
                  { level: 'LOW' as const, msg: '5–8 min. A great time to visit.' },
                  { level: 'MODERATE' as const, msg: '10–18 min. Order ahead to save time.' },
                  { level: 'HIGH' as const, msg: '20–30 min. Order early, pick up later.' },
                ].map(item => (
                  <div key={item.level} className="flex items-center gap-3">
                    <CrowdBadge level={item.level} size="sm" />
                    <span className="text-sm text-[#7A7970]">{item.msg}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              {[
                { time: '11 AM', label: 'Low', pct: 22 },
                { time: '12 PM', label: 'Moderate', pct: 58 },
                { time: '1 PM', label: 'High', pct: 92 },
                { time: '2 PM', label: 'Low', pct: 28 },
              ].map((row, i) => {
                const colors = ['#2A6B43', '#B87A0A', '#B04040', '#2A6B43'];
                return (
                  <div key={row.time} className="flex items-center gap-3">
                    <span className="font-mono text-xs text-[#7A7970] w-12 text-right">{row.time}</span>
                    <div className="flex-1 bg-[#EAE9E3] rounded-full h-2 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{ width: `${row.pct}%`, backgroundColor: colors[i] }}
                      />
                    </div>
                    <span className="text-xs text-[#7A7970] w-16">{row.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-[#E2E0D8]">
        <div className="max-w-6xl mx-auto px-6 py-20 text-center">
          <h2 className="font-display text-5xl text-[#141412] mb-4">Ready to skip the queue?</h2>
          <p className="text-[#7A7970] mb-8">Join thousands of students who order ahead every day.</p>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => navigate('register')}
              className="bg-[#141412] text-white text-sm font-medium px-8 py-3 rounded-xl hover:bg-[#2A6B43] transition-colors"
            >
              Create account
            </button>
            <button
              onClick={() => navigate('login')}
              className="text-sm text-[#7A7970] hover:text-[#141412] transition-colors"
            >
              Already have an account →
            </button>
          </div>
          <p className="text-xs text-[#B8B7B0] mt-6">
            Demo: <span className="font-mono">admin@canteen.edu / admin123</span> for admin view
          </p>
        </div>
      </section>
    </div>
  );
}
