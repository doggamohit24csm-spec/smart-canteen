import { Plus } from 'lucide-react';
import type { FoodItem } from '../types';
import { useApp } from '../context/AppContext';

interface Props {
  food: FoodItem;
  onDetail?: () => void;
}

export default function FoodCard({ food, onDetail }: Props) {
  const { addToCart, navigate, showToast } = useApp();
  const fallbackImage = 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80';

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!food.available) return;
    addToCart(food);
    showToast(`${food.name} added to cart`, 'success');
  };

  const handleClick = () => {
    if (onDetail) onDetail();
    else navigate('food-detail', { food });
  };

  return (
    <div
      onClick={handleClick}
      className="group rounded-xl border border-[#E2E0D8] bg-white overflow-hidden cursor-pointer hover:border-[#C8C6BC] hover:shadow-sm transition-all duration-200"
    >
      <div className="relative overflow-hidden bg-[#F4F3EF] aspect-[4/3]">
        <img
          src={food.image}
          alt={food.name}
          className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
          loading="lazy"
          onError={(e) => {
            const target = e.currentTarget;
            target.onerror = null;
            target.src = fallbackImage;
          }}
        />
        {!food.available && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
            <span className="text-xs font-medium text-[#7A7970] bg-white px-3 py-1 rounded-full border border-[#E2E0D8]">
              Unavailable
            </span>
          </div>
        )}
        {food.popular && food.available && (
          <span className="absolute top-2.5 left-2.5 text-[10px] font-mono font-medium text-[#2A6B43] bg-[#EBF5EF] px-2 py-0.5 rounded-full">
            Popular
          </span>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="font-semibold text-[#141412] text-sm leading-snug mb-0.5 truncate">{food.name}</h3>
            <p className="text-xs text-[#7A7970] line-clamp-2 leading-relaxed">{food.description}</p>
          </div>
        </div>

        <div className="flex items-center justify-between mt-3">
          <span className="font-mono text-sm font-medium text-[#141412]">₹{food.price}</span>
          <button
            onClick={handleAdd}
            disabled={!food.available}
            className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-150
              ${food.available
                ? 'bg-[#141412] text-white hover:bg-[#2A6B43] active:scale-95'
                : 'bg-[#EAE9E3] text-[#B8B7B0] cursor-not-allowed'
              }`}
          >
            <Plus size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
