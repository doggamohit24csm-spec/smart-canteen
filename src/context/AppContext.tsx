import { createContext, useContext, useState, useCallback, useEffect, useRef, type ReactNode } from 'react';
import type { Page, FoodItem, CartItem, Order, CanteenStatus, AppNotification, User } from '../types';
import { foodItems as initialFoods, sampleOrders, initialNotifications, adminOrders } from '../data';

interface ToastState {
  message: string;
  type: 'success' | 'error' | 'info';
}

interface AppContextType {
  currentPage: Page;
  pageParams: Record<string, unknown>;
  navigate: (page: Page, params?: Record<string, unknown>) => void;

  user: User | null;
  isAdmin: boolean;
  login: (email: string, password: string, profile?: { name?: string; studentId?: string }) => boolean;
  logout: () => void;

  foods: FoodItem[];
  toggleFoodAvailability: (id: string) => void;

  cart: CartItem[];
  addToCart: (food: FoodItem, quantity?: number) => void;
  removeFromCart: (foodId: string) => void;
  updateQuantity: (foodId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;

  canteenStatus: CanteenStatus;

  orders: Order[];
  currentOrder: Order | null;
  placeOrder: () => Order;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;

  notifications: AppNotification[];
  unreadCount: number;
  markAllRead: () => void;

  toast: ToastState | null;
  showToast: (message: string, type?: ToastState['type']) => void;
}

const AppContext = createContext<AppContextType | null>(null);

let orderCounter = 1043;
let tokenLetters = ['A', 'B', 'C'];
let tokenNumber = 28;

function generateToken(): string {
  const letter = tokenLetters[Math.floor(Math.random() * tokenLetters.length)];
  return `${letter}-${tokenNumber++}`;
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [pageParams, setPageParams] = useState<Record<string, unknown>>({});
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [foods, setFoods] = useState<FoodItem[]>(initialFoods);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([...adminOrders.slice(1), ...sampleOrders]);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [notifications, setNotifications] = useState<AppNotification[]>(initialNotifications);
  const [toast, setToast] = useState<ToastState | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [canteenStatus, setCanteenStatus] = useState<CanteenStatus>({
    level: 'MODERATE',
    waitTime: 14,
    peopleWaiting: 12,
    activeOrders: 18,
  });

  useEffect(() => {
    const id = setInterval(() => {
      setCanteenStatus(prev => {
        const delta = Math.floor(Math.random() * 3) - 1;
        const newOrders = Math.max(5, Math.min(35, prev.activeOrders + delta));
        let level: CanteenStatus['level'] = 'LOW';
        let waitTime = 6;
        let peopleWaiting = Math.max(2, newOrders - 6);

        if (newOrders >= 25) { level = 'HIGH'; waitTime = 24; }
        else if (newOrders >= 15) { level = 'MODERATE'; waitTime = 14; }
        else { level = 'LOW'; waitTime = 7; }

        return { level, waitTime, peopleWaiting, activeOrders: newOrders };
      });
    }, 8000);
    return () => clearInterval(id);
  }, []);

  const navigate = useCallback((page: Page, params: Record<string, unknown> = {}) => {
    setCurrentPage(page);
    setPageParams(params);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const login = useCallback((email: string, password: string, profile?: { name?: string; studentId?: string }): boolean => {
    if (!email || !password) return false;

    const displayName = profile?.name?.trim() || (() => {
      const localPart = email.split('@')[0] || 'Student';
      return localPart
        .split(/[._-]/)
        .filter(Boolean)
        .map(part => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' ') || 'Student User';
    })();

    const studentId = profile?.studentId?.trim() || 'STUDENT';

    if (email === 'admin@canteen.edu' && password === 'admin123') {
      setUser({ name: profile?.name?.trim() || 'Admin User', email, studentId: profile?.studentId?.trim() || 'ADMIN-001' });
      setIsAdmin(true);
      navigate('admin-dashboard');
      return true;
    }

    setUser({ name: displayName, email, studentId });
    setIsAdmin(false);
    navigate('dashboard');
    return true;
  }, [navigate]);

  const logout = useCallback(() => {
    setUser(null);
    setIsAdmin(false);
    setCart([]);
    setCurrentOrder(null);
    navigate('landing');
  }, [navigate]);

  const toggleFoodAvailability = useCallback((id: string) => {
    setFoods(prev => prev.map(f => f.id === id ? { ...f, available: !f.available } : f));
  }, []);

  const addToCart = useCallback((food: FoodItem, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(i => i.food.id === food.id);
      if (existing) {
        return prev.map(i => i.food.id === food.id ? { ...i, quantity: i.quantity + quantity } : i);
      }
      return [...prev, { food, quantity }];
    });
  }, []);

  const removeFromCart = useCallback((foodId: string) => {
    setCart(prev => prev.filter(i => i.food.id !== foodId));
  }, []);

  const updateQuantity = useCallback((foodId: string, quantity: number) => {
    if (quantity <= 0) {
      setCart(prev => prev.filter(i => i.food.id !== foodId));
    } else {
      setCart(prev => prev.map(i => i.food.id === foodId ? { ...i, quantity } : i));
    }
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const cartTotal = cart.reduce((sum, i) => sum + i.food.price * i.quantity, 0);
  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);

  const placeOrder = useCallback((): Order => {
    const id = `SB${orderCounter++}`;
    const token = generateToken();
    const prepTime = Math.max(...cart.map(i => i.food.prepTime)) + 4;
    const order: Order = {
      id,
      token,
      items: [...cart],
      total: cartTotal,
      status: 'received',
      placedAt: new Date(),
      estimatedReady: new Date(Date.now() + prepTime * 60 * 1000),
      queuePosition: canteenStatus.peopleWaiting,
    };
    setOrders(prev => [order, ...prev]);
    setCurrentOrder(order);
    setCart([]);

    // Simulate status progression
    setTimeout(() => {
      setOrders(prev => prev.map(o => o.id === id ? { ...o, status: 'confirmed' } : o));
      setCurrentOrder(prev => prev?.id === id ? { ...prev, status: 'confirmed' } : prev);
    }, 3000);
    setTimeout(() => {
      setOrders(prev => prev.map(o => o.id === id ? { ...o, status: 'preparing', queuePosition: Math.max(0, (order.queuePosition || 4) - 1) } : o));
      setCurrentOrder(prev => prev?.id === id ? { ...prev, status: 'preparing' } : prev);
    }, 6000);
    setTimeout(() => {
      setOrders(prev => prev.map(o => o.id === id ? { ...o, status: 'ready', queuePosition: 0 } : o));
      setCurrentOrder(prev => prev?.id === id ? { ...prev, status: 'ready', queuePosition: 0 } : prev);
      setNotifications(prev => [{
        id: `ready-${id}`,
        message: `Order #${id} is ready for pickup.`,
        detail: `Head to the canteen counter and show your token ${token}.`,
        type: 'success',
        time: 'Just now',
        read: false,
      }, ...prev]);
      setToast({ message: `Order #${id} is ready for pickup! Token: ${token}`, type: 'success' });
      toastTimer.current = setTimeout(() => setToast(null), 5000);
    }, 16000);

    return order;
  }, [cart, cartTotal, canteenStatus.peopleWaiting]);

  const updateOrderStatus = useCallback((orderId: string, status: Order['status']) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
    setCurrentOrder(prev => prev?.id === orderId ? { ...prev, status } : prev);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  }, []);

  const showToast = useCallback((message: string, type: ToastState['type'] = 'info') => {
    setToast({ message, type });
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 3000);
  }, []);

  return (
    <AppContext.Provider value={{
      currentPage, pageParams, navigate,
      user, isAdmin, login, logout,
      foods, toggleFoodAvailability,
      cart, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, cartCount,
      canteenStatus,
      orders, currentOrder, placeOrder, updateOrderStatus,
      notifications, unreadCount, markAllRead,
      toast, showToast,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
