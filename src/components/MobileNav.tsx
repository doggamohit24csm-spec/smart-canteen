import { Home, UtensilsCrossed, ClipboardList, Bell, User } from 'lucide-react';
import { useApp } from '../context/AppContext';
import type { Page } from '../types';

const items: { icon: typeof Home; label: string; page: Page }[] = [
  { icon: Home, label: 'Home', page: 'dashboard' },
  { icon: UtensilsCrossed, label: 'Menu', page: 'menu' },
  { icon: ClipboardList, label: 'Orders', page: 'order-history' },
  { icon: Bell, label: 'Alerts', page: 'notifications' },
  { icon: User, label: 'Profile', page: 'profile' },
];

export default function MobileNav() {
  const { currentPage, navigate, cartCount, unreadCount } = useApp();

  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E2E0D8] safe-area-bottom">
      <div className="flex items-center justify-around px-2 py-2">
        {items.map(({ icon: Icon, label, page }) => {
          const active = currentPage === page;
          const showDot = page === 'notifications' && unreadCount > 0;
          return (
            <button
              key={page}
              onClick={() => navigate(page)}
              className="flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-colors min-w-0"
            >
              <div className="relative">
                <Icon
                  size={20}
                  className={active ? 'text-[#141412]' : 'text-[#7A7970]'}
                  strokeWidth={active ? 2.5 : 1.8}
                />
                {showDot && (
                  <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[#2A6B43] rounded-full" />
                )}
              </div>
              <span className={`text-[10px] font-medium ${active ? 'text-[#141412]' : 'text-[#7A7970]'}`}>
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
