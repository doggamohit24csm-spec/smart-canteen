import { LayoutGrid, ClipboardList, UtensilsCrossed, Users, BarChart2, LogOut } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import type { Page } from '../../types';

const navItems: { icon: typeof LayoutGrid; label: string; page: Page }[] = [
  { icon: LayoutGrid, label: 'Overview', page: 'admin-dashboard' },
  { icon: ClipboardList, label: 'Orders', page: 'admin-orders' },
  { icon: UtensilsCrossed, label: 'Menu', page: 'admin-menu' },
  { icon: Users, label: 'Crowd', page: 'admin-crowd' },
  { icon: BarChart2, label: 'Analytics', page: 'admin-analytics' },
];

interface Props {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: Props) {
  const { currentPage, navigate, logout } = useApp();

  return (
    <div className="min-h-screen bg-[#F4F4F2] flex">
      {/* Sidebar */}
      <aside className="hidden md:flex w-52 flex-col border-r border-[#E2E0D8] bg-white">
        <div className="px-5 py-5 border-b border-[#E2E0D8]">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#141412] flex items-center justify-center">
              <span className="font-mono text-[10px] font-medium text-white">SB</span>
            </div>
            <div>
              <span className="font-semibold text-[#141412] text-sm tracking-tight">SmartBite</span>
              <p className="text-[10px] text-[#7A7970] font-mono">Admin</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-0.5">
          {navItems.map(item => {
            const active = currentPage === item.page;
            return (
              <button
                key={item.page}
                onClick={() => navigate(item.page)}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  active
                    ? 'bg-[#EAE9E3] text-[#141412]'
                    : 'text-[#7A7970] hover:text-[#141412] hover:bg-[#F4F4F2]'
                }`}
              >
                <item.icon size={15} strokeWidth={active ? 2.5 : 1.8} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="p-3 border-t border-[#E2E0D8]">
          <button
            onClick={logout}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-[#B04040] hover:bg-[#FDF2F2] transition-colors"
          >
            <LogOut size={15} />
            Sign out
          </button>
        </div>
      </aside>

      {/* Mobile tab bar */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t border-[#E2E0D8]">
        <div className="flex">
          {navItems.map(item => {
            const active = currentPage === item.page;
            return (
              <button
                key={item.page}
                onClick={() => navigate(item.page)}
                className="flex-1 flex flex-col items-center gap-1 py-2.5"
              >
                <item.icon
                  size={18}
                  className={active ? 'text-[#141412]' : 'text-[#7A7970]'}
                  strokeWidth={active ? 2.5 : 1.8}
                />
                <span className={`text-[10px] font-medium ${active ? 'text-[#141412]' : 'text-[#7A7970]'}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 min-w-0 pb-20 md:pb-0">
        {children}
      </main>
    </div>
  );
}
