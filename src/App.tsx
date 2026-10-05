import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import MobileNav from './components/MobileNav';
import Toast from './components/Toast';

// Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Menu from './pages/Menu';
import FoodDetail from './pages/FoodDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import DigitalToken from './pages/DigitalToken';
import OrderTracking from './pages/OrderTracking';
import OrderHistory from './pages/OrderHistory';
import CrowdDetails from './pages/CrowdDetails';
import Profile from './pages/Profile';
import Notifications from './pages/Notifications';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminOrders from './pages/admin/AdminOrders';
import AdminMenu from './pages/admin/AdminMenu';
import AdminCrowd from './pages/admin/AdminCrowd';
import AdminAnalytics from './pages/admin/AdminAnalytics';

const publicPages = new Set(['landing', 'login', 'register']);

function AppRouter() {
  const { currentPage, isAdmin } = useApp();

  const isPublic = publicPages.has(currentPage);
  const isAdminPage = currentPage.startsWith('admin-');

  const pageMap: Record<string, React.ReactNode> = {
    landing: <Landing />,
    login: <Login />,
    register: <Register />,
    dashboard: <Dashboard />,
    menu: <Menu />,
    'food-detail': <FoodDetail />,
    cart: <Cart />,
    checkout: <Checkout />,
    'order-confirmation': <OrderConfirmation />,
    'digital-token': <DigitalToken />,
    'order-tracking': <OrderTracking />,
    'order-history': <OrderHistory />,
    'crowd-details': <CrowdDetails />,
    profile: <Profile />,
    notifications: <Notifications />,
    'admin-dashboard': <AdminDashboard />,
    'admin-orders': <AdminOrders />,
    'admin-menu': <AdminMenu />,
    'admin-crowd': <AdminCrowd />,
    'admin-analytics': <AdminAnalytics />,
  };

  const content = pageMap[currentPage] ?? <Landing />;

  // Admin pages have their own layout
  if (isAdminPage) {
    return (
      <>
        {content}
        <Toast />
      </>
    );
  }

  // Public pages — no navbar
  if (isPublic) {
    return (
      <>
        {content}
        <Toast />
      </>
    );
  }

  // Authenticated student pages
  return (
    <div className="min-h-screen bg-[#F8F7F4]">
      <Navbar />
      <main className="animate-fade-in">
        {content}
      </main>
      <MobileNav />
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
}
