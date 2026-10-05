import { useState } from 'react';
import { Clock, Minus, Plus, ShoppingCart } from 'lucide-react';
import { useApp } from '../context/AppContext';
import BackButton from '../components/BackButton';
import type { FoodItem } from '../types';

export default function FoodDetail() {
  const { pageParams, navigate, addToCart, showToast } = useApp();
  const food = pageParams.food as FoodItem | undefined;
  const [qty, setQty] = useState(1);

  if (!food) {
    navigate('menu');
    return null;
  }

  const handleAdd = () => {
    addToCart(food, qty);
    showToast(`${food.name} added to cart`, 'success');
    navigate('menu');
  };

  return (
    <div className="min-h-screen bg-[#F8F7F4] pb-24 md:pb-10">
      <div className="max-w-4xl mx-auto px-4 md:px-6 pt-8">
        <BackButton onClick={() => navigate('menu')} label="Menu" />

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Image */}
          <div className="rounded-2xl overflow-hidden bg-[#F4F3EF] aspect-square">
            <img
              src={food.image}
              alt={food.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <div className="mb-auto">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-medium text-[#7A7970] capitalize bg-[#EAE9E3] px-2.5 py-1 rounded-full">
                  {food.category}
                </span>
                {food.popular && (
                  <span className="text-xs font-mono font-medium text-[#2A6B43] bg-[#EBF5EF] px-2.5 py-1 rounded-full">
                    Popular
                  </span>
                )}
                {!food.available && (
                  <span className="text-xs font-mono font-medium text-[#B04040] bg-[#FDF2F2] px-2.5 py-1 rounded-full">
                    Unavailable
                  </span>
                )}
              </div>

              <h1 className="font-display text-4xl text-[#141412] mb-1">{food.name}</h1>
              <p className="font-mono text-2xl font-medium text-[#141412] mb-4">₹{food.price}</p>

              <p className="text-[#7A7970] text-sm leading-relaxed mb-6">{food.description}</p>

              <div className="flex items-center gap-2 text-xs text-[#7A7970] mb-6">
                <Clock size={13} />
                <span>Estimated preparation: <strong className="text-[#141412]">{food.prepTime} min</strong></span>
              </div>

              <div className="mb-6">
                <p className="text-xs font-medium text-[#7A7970] uppercase tracking-widest mb-2">Ingredients</p>
                <div className="flex flex-wrap gap-2">
                  {food.ingredients.map(ing => (
                    <span key={ing} className="text-xs text-[#7A7970] bg-[#EAE9E3] px-2.5 py-1 rounded-full">
                      {ing}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {food.available && (
              <div className="pt-6 border-t border-[#E2E0D8]">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-[#141412]">Quantity</span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setQty(q => Math.max(1, q - 1))}
                      className="w-8 h-8 rounded-lg border border-[#E2E0D8] flex items-center justify-center text-[#7A7970] hover:border-[#141412] hover:text-[#141412] transition-colors"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="font-mono text-lg font-medium w-6 text-center">{qty}</span>
                    <button
                      onClick={() => setQty(q => q + 1)}
                      className="w-8 h-8 rounded-lg bg-[#141412] flex items-center justify-center text-white hover:bg-[#2A6B43] transition-colors"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleAdd}
                  className="w-full bg-[#141412] text-white text-sm font-medium py-3 rounded-xl hover:bg-[#2A6B43] transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={16} />
                  Add to cart — ₹{food.price * qty}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
