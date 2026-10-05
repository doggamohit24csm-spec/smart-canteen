import { Bell, ShoppingCart, User } from 'lucide-react';
import { useApp } from '../context/AppContext';
import type { Page } from '../types';

const navLinks: { label: string; page: Page }[] = [
  { label: 'Home', page: 'dashboard' },
  { label: 'Menu', page: 'menu' },
  { label: 'Orders', page: 'order-history' },
];

const adminLinks: { label: string; page: Page }[] = [
  { label: 'Overview', page: 'admin-dashboard' },
  { label: 'Orders', page: 'admin-orders' },
  { label: 'Menu', page: 'admin-menu' },
  { label: 'Crowd', page: 'admin-crowd' },
];

export default function Navbar() {
  const { currentPage, navigate, cartCount, unreadCount, isAdmin, user, logout } = useApp();

  const links = isAdmin ? adminLinks : navLinks;
  const homePage: Page = isAdmin ? 'admin-dashboard' : 'dashboard';

  return (
    <nav className="sticky top-0 z-40 bg-[#F8F7F4]/90 backdrop-blur-md border-b border-[#E2E0D8]">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <button onClick={() => navigate(homePage)} className="flex items-center gap-2 group">
          <div className="w-7 h-7 rounded-lg bg-[#141412] flex items-center justify-center">
            <span className="font-mono text-[10px] font-medium text-white">SB</span>
          </div>
          <span className="font-semibold text-[#141412] text-sm tracking-tight">SmartBite</span>
          {isAdmin && (
            <span className="text-[10px] font-mono font-medium text-[#7A7970] bg-[#EAE9E3] px-1.5 py-0.5 rounded-full ml-1">
              Admin
            </span>
          )}
        </button>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-1">
          {links.map(link => (
            <button
              key={link.page}
              onClick={() => navigate(link.page)}
              className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                currentPage === link.page
                  ? 'text-[#141412] font-medium bg-[#EAE9E3]'
                  : 'text-[#7A7970] hover:text-[#141412] hover:bg-[#EAE9E3]/60'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {!isAdmin && (
            <button
              onClick={() => navigate('cart')}
              className="relative w-9 h-9 rounded-xl flex items-center justify-center text-[#7A7970] hover:text-[#141412] hover:bg-[#EAE9E3] transition-colors"
            >
              <ShoppingCart size={18} />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#141412] text-white text-[10px] font-mono font-medium rounded-full flex items-center justify-center">
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </button>
          )}

          {!isAdmin && (
            <button
              onClick={() => navigate('notifications')}
              className="relative w-9 h-9 rounded-xl flex items-center justify-center text-[#7A7970] hover:text-[#141412] hover:bg-[#EAE9E3] transition-colors"
            >
              <Bell size={18} />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#2A6B43] rounded-full" />
              )}
            </button>
          )}

          <button
            onClick={() => isAdmin ? logout() : navigate('profile')}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-[#7A7970] hover:text-[#141412] hover:bg-[#EAE9E3] transition-colors"
          >
            <User size={18} />
          </button>
        </div>
      </div>
    </nav>
  );
}
