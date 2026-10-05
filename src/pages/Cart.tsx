import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useApp } from '../context/AppContext';
import EmptyState from '../components/EmptyState';
import BackButton from '../components/BackButton';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, cartTotal, navigate, canteenStatus } = useApp();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#F8F7F4] pb-24 md:pb-10">
        <div className="max-w-2xl mx-auto px-4 md:px-6 pt-8">
          <BackButton onClick={() => navigate('menu')} label="Menu" />
          <EmptyState
            title="Your cart is waiting."
            description="Add something delicious from today's menu."
            action={{ label: 'Browse menu', onClick: () => navigate('menu') }}
            icon={<ShoppingBag size={48} />}
          />
        </div>
      </div>
    );
  }

  const maxPrepTime = Math.max(...cart.map(i => i.food.prepTime)) + 4;

  return (
    <div className="min-h-screen bg-[#F8F7F4] pb-24 md:pb-10">
      <div className="max-w-2xl mx-auto px-4 md:px-6 pt-8">
        <BackButton onClick={() => navigate('menu')} label="Menu" />
        <h1 className="font-display text-4xl text-[#141412] mb-8">Your cart.</h1>

        <div className="space-y-3 mb-6">
          {cart.map(item => (
            <div key={item.food.id} className="bg-white rounded-xl border border-[#E2E0D8] p-4">
              <div className="flex gap-3">
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-[#F4F3EF] flex-shrink-0">
                  <img src={item.food.image} alt={item.food.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-medium text-[#141412] text-sm leading-snug">{item.food.name}</h3>
                    <button
                      onClick={() => removeFromCart(item.food.id)}
                      className="text-[#C8C6BC] hover:text-[#B04040] transition-colors flex-shrink-0"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                  <p className="font-mono text-sm font-medium text-[#141412] mt-1">
                    ₹{item.food.price * item.quantity}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQuantity(item.food.id, item.quantity - 1)}
                      className="w-6 h-6 rounded-md border border-[#E2E0D8] flex items-center justify-center text-[#7A7970] hover:border-[#141412] hover:text-[#141412] transition-colors"
                    >
                      <Minus size={11} />
                    </button>
                    <span className="font-mono text-sm w-4 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.food.id, item.quantity + 1)}
                      className="w-6 h-6 rounded-md bg-[#141412] flex items-center justify-center text-white hover:bg-[#2A6B43] transition-colors"
                    >
                      <Plus size={11} />
                    </button>
                    <span className="text-xs text-[#B8B7B0] ml-1">× ₹{item.food.price} each</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order summary */}
        <div className="bg-white rounded-xl border border-[#E2E0D8] p-5 mb-4">
          <h3 className="text-sm font-semibold text-[#141412] mb-4">Order summary</h3>
          <div className="space-y-2.5">
            {cart.map(item => (
              <div key={item.food.id} className="flex justify-between text-sm">
                <span className="text-[#7A7970]">{item.food.name} × {item.quantity}</span>
                <span className="font-mono text-[#141412]">₹{item.food.price * item.quantity}</span>
              </div>
            ))}
            <div className="border-t border-[#E2E0D8] pt-2.5 flex justify-between text-sm">
              <span className="text-[#7A7970]">Estimated preparation</span>
              <span className="font-mono text-[#141412]">{maxPrepTime} min</span>
            </div>
            <div className="border-t border-[#E2E0D8] pt-2.5 flex justify-between font-semibold">
              <span className="text-[#141412]">Total</span>
              <span className="font-mono text-[#141412]">₹{cartTotal}</span>
            </div>
          </div>
        </div>

        {canteenStatus.level !== 'LOW' && (
          <div className="bg-[#EBF5EF] rounded-xl px-4 py-3 mb-4">
            <p className="text-xs text-[#2A6B43]">
              Ordering now may save approximately {Math.round(canteenStatus.waitTime * 0.7)} minutes of queue time.
            </p>
          </div>
        )}

        <button
          onClick={() => navigate('checkout')}
          className="w-full bg-[#141412] text-white text-sm font-medium py-3.5 rounded-xl hover:bg-[#2A6B43] transition-colors"
        >
          Continue to checkout
        </button>
      </div>
    </div>
  );
}
