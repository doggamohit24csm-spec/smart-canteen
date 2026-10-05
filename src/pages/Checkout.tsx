import { MapPin, Clock, Users, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import BackButton from '../components/BackButton';
import CrowdBadge from '../components/CrowdBadge';

export default function Checkout() {
  const { cart, cartTotal, navigate, canteenStatus, placeOrder } = useApp();

  const maxPrepTime = cart.length ? Math.max(...cart.map(i => i.food.prepTime)) + 4 : 12;
  const pickupTime = new Date(Date.now() + maxPrepTime * 60 * 1000);
  const pickupStr = pickupTime.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
  const timeSaved = Math.round(canteenStatus.waitTime * 0.7);

  const handlePlaceOrder = () => {
    const order = placeOrder();
    navigate('order-confirmation', { order });
  };

  if (cart.length === 0) {
    navigate('menu');
    return null;
  }

  return (
    <div className="min-h-screen bg-[#F8F7F4] pb-24 md:pb-10">
      <div className="max-w-xl mx-auto px-4 md:px-6 pt-8">
        <BackButton onClick={() => navigate('cart')} label="Cart" />
        <h1 className="font-display text-4xl text-[#141412] mb-8">Checkout.</h1>

        {/* Order summary */}
        <div className="bg-white rounded-xl border border-[#E2E0D8] p-5 mb-4">
          <h3 className="text-xs font-medium text-[#7A7970] uppercase tracking-widest mb-4">Order summary</h3>
          <div className="space-y-2 mb-4">
            {cart.map(item => (
              <div key={item.food.id} className="flex justify-between text-sm">
                <span className="text-[#7A7970]">{item.food.name} × {item.quantity}</span>
                <span className="font-mono text-[#141412]">₹{item.food.price * item.quantity}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-[#E2E0D8] pt-3 flex justify-between font-semibold">
            <span className="text-[#141412]">Total</span>
            <span className="font-mono text-[#141412]">₹{cartTotal}</span>
          </div>
        </div>

        {/* Pickup info */}
        <div className="bg-white rounded-xl border border-[#E2E0D8] p-5 mb-4">
          <h3 className="text-xs font-medium text-[#7A7970] uppercase tracking-widest mb-4">Pickup details</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#EAE9E3] flex items-center justify-center flex-shrink-0">
                <MapPin size={14} className="text-[#7A7970]" />
              </div>
              <div>
                <p className="text-xs text-[#7A7970]">Pickup location</p>
                <p className="text-sm font-medium text-[#141412]">Main College Canteen</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#EAE9E3] flex items-center justify-center flex-shrink-0">
                <Clock size={14} className="text-[#7A7970]" />
              </div>
              <div>
                <p className="text-xs text-[#7A7970]">Estimated preparation</p>
                <p className="text-sm font-medium text-[#141412]">{maxPrepTime} min</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: canteenStatus.level === 'LOW' ? '#EBF5EF' : canteenStatus.level === 'HIGH' ? '#FDF2F2' : '#FEF7E6' }}>
                <Users size={14} className={canteenStatus.level === 'LOW' ? 'text-[#2A6B43]' : canteenStatus.level === 'HIGH' ? 'text-[#B04040]' : 'text-[#B87A0A]'} />
              </div>
              <div>
                <p className="text-xs text-[#7A7970]">Current crowd</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <CrowdBadge level={canteenStatus.level} size="sm" />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#EAE9E3] flex items-center justify-center flex-shrink-0">
                <ArrowRight size={14} className="text-[#7A7970]" />
              </div>
              <div>
                <p className="text-xs text-[#7A7970]">Estimated pickup</p>
                <p className="text-sm font-medium text-[#141412]">{pickupStr}</p>
              </div>
            </div>
          </div>
        </div>

        {timeSaved > 0 && (
          <div className="bg-[#EBF5EF] rounded-xl px-4 py-3 mb-6">
            <p className="text-sm text-[#2A6B43]">
              Ordering now may save approximately <strong>{timeSaved} minutes</strong> of queue time.
            </p>
          </div>
        )}

        <p className="text-xs text-[#7A7970] mb-4 text-center">
          Payment is collected at the counter when you pick up your order.
        </p>

        <button
          onClick={handlePlaceOrder}
          className="w-full bg-[#141412] text-white text-sm font-medium py-3.5 rounded-xl hover:bg-[#2A6B43] transition-colors"
        >
          Place pre-order
        </button>
      </div>
    </div>
  );
}
