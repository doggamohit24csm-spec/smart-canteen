import { User, Mail, Hash, ChevronRight, LogOut, Bell, HelpCircle, Settings, ClipboardList } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Profile() {
  const { user, logout, navigate } = useApp();

  const sections = [
    {
      title: 'Account',
      items: [
        { icon: ClipboardList, label: 'Order history', onClick: () => navigate('order-history') },
        { icon: Bell, label: 'Notifications', onClick: () => navigate('notifications') },
      ],
    },
    {
      title: 'Preferences',
      items: [
        { icon: Settings, label: 'Order preferences', onClick: () => {} },
        { icon: HelpCircle, label: 'Help & support', onClick: () => {} },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8F7F4] pb-24 md:pb-10">
      <div className="max-w-xl mx-auto px-4 md:px-6 pt-8">
        <h1 className="font-display text-4xl text-[#141412] mb-8">Profile.</h1>

        {/* Avatar + info */}
        <div className="bg-white rounded-2xl border border-[#E2E0D8] p-6 mb-4">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-[#141412] flex items-center justify-center flex-shrink-0">
              <span className="font-display text-2xl text-white">
                {user?.name.charAt(0) ?? 'S'}
              </span>
            </div>
            <div>
              <h2 className="font-semibold text-[#141412] text-lg">{user?.name ?? 'Student'}</h2>
              <p className="text-sm text-[#7A7970]">{user?.email ?? 'student@college.edu'}</p>
            </div>
          </div>

          <div className="space-y-3">
            {[
              { icon: User, label: 'Full name', value: user?.name ?? 'Arjun Sharma' },
              { icon: Mail, label: 'College email', value: user?.email ?? 'arjun@college.edu' },
              { icon: Hash, label: 'Student ID', value: user?.studentId ?? 'CS2021042' },
            ].map(row => (
              <div key={row.label} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#EAE9E3] flex items-center justify-center flex-shrink-0">
                  <row.icon size={14} className="text-[#7A7970]" />
                </div>
                <div>
                  <p className="text-xs text-[#7A7970]">{row.label}</p>
                  <p className="text-sm text-[#141412]">{row.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sections */}
        {sections.map(section => (
          <div key={section.title} className="bg-white rounded-xl border border-[#E2E0D8] mb-4 overflow-hidden">
            <div className="px-4 pt-4 pb-1">
              <p className="text-xs font-medium text-[#7A7970] uppercase tracking-widest">{section.title}</p>
            </div>
            {section.items.map((item, i) => (
              <button
                key={item.label}
                onClick={item.onClick}
                className={`w-full flex items-center justify-between px-4 py-3.5 hover:bg-[#F8F7F4] transition-colors ${
                  i < section.items.length - 1 ? 'border-b border-[#F0EFE9]' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon size={15} className="text-[#7A7970]" />
                  <span className="text-sm text-[#141412]">{item.label}</span>
                </div>
                <ChevronRight size={14} className="text-[#C8C6BC]" />
              </button>
            ))}
          </div>
        ))}

        {/* Sign out */}
        <button
          onClick={logout}
          className="w-full flex items-center justify-center gap-2 bg-white border border-[#E2E0D8] text-[#B04040] text-sm font-medium py-3.5 rounded-xl hover:bg-[#FDF2F2] transition-colors"
        >
          <LogOut size={15} />
          Sign out
        </button>
      </div>
    </div>
  );
}
