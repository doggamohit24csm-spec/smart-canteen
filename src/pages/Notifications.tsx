import { Bell, CheckCircle, Info, AlertTriangle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import EmptyState from '../components/EmptyState';

export default function Notifications() {
  const { notifications, markAllRead, unreadCount } = useApp();

  const icons = {
    success: <CheckCircle size={15} className="text-[#2A6B43]" />,
    info: <Info size={15} className="text-[#7A7970]" />,
    warning: <AlertTriangle size={15} className="text-[#B87A0A]" />,
  };

  const bgColors = {
    success: '#EBF5EF',
    info: '#EAE9E3',
    warning: '#FEF7E6',
  };

  return (
    <div className="min-h-screen bg-[#F8F7F4] pb-24 md:pb-10">
      <div className="max-w-xl mx-auto px-4 md:px-6 pt-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-display text-4xl text-[#141412]">Notifications.</h1>
          {unreadCount > 0 && (
            <button
              onClick={markAllRead}
              className="text-xs text-[#7A7970] hover:text-[#141412] transition-colors"
            >
              Mark all read
            </button>
          )}
        </div>

        {notifications.length === 0 ? (
          <EmptyState
            title="All clear."
            description="You have no notifications right now."
            icon={<Bell size={48} />}
          />
        ) : (
          <div className="space-y-2">
            {notifications.map(n => (
              <div
                key={n.id}
                className={`bg-white rounded-xl border p-4 transition-colors ${
                  n.read ? 'border-[#E2E0D8]' : 'border-[#C8C6BC]'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ backgroundColor: bgColors[n.type] }}
                  >
                    {icons[n.type]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className={`text-sm leading-snug ${n.read ? 'text-[#7A7970]' : 'text-[#141412] font-medium'}`}>
                        {n.message}
                      </p>
                      {!n.read && (
                        <span className="w-2 h-2 rounded-full bg-[#2A6B43] flex-shrink-0 mt-1.5" />
                      )}
                    </div>
                    {n.detail && (
                      <p className="text-xs text-[#7A7970] mt-1 leading-relaxed">{n.detail}</p>
                    )}
                    <p className="text-xs text-[#B8B7B0] mt-1.5">{n.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
