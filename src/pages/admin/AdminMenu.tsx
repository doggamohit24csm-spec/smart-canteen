import { useState } from 'react';
import { Plus, Edit3, Trash2, ToggleLeft, ToggleRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import AdminLayout from './AdminLayout';
import type { FoodCategory } from '../../types';

const categories: FoodCategory[] = ['breakfast', 'meals', 'snacks', 'beverages', 'desserts'];

export default function AdminMenu() {
  const { foods, toggleFoodAvailability, showToast } = useApp();
  const [catFilter, setCatFilter] = useState<FoodCategory | 'all'>('all');
  const [showAddModal, setShowAddModal] = useState(false);

  const filtered = catFilter === 'all' ? foods : foods.filter(f => f.category === catFilter);

  const handleToggle = (id: string, name: string, available: boolean) => {
    toggleFoodAvailability(id);
    showToast(`${name} marked as ${available ? 'unavailable' : 'available'}`, 'info');
  };

  return (
    <AdminLayout>
      <div className="px-4 md:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-display text-3xl text-[#141412]">Menu</h1>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-[#141412] text-white text-sm font-medium px-4 py-2.5 rounded-xl hover:bg-[#2A6B43] transition-colors"
          >
            <Plus size={15} /> Add item
          </button>
        </div>

        {/* Category filter */}
        <div className="flex gap-2 overflow-x-auto pb-1 mb-6">
          {(['all', ...categories] as const).map(c => (
            <button
              key={c}
              onClick={() => setCatFilter(c)}
              className={`flex-shrink-0 text-sm px-3 py-1.5 rounded-xl font-medium capitalize transition-colors ${
                catFilter === c
                  ? 'bg-[#141412] text-white'
                  : 'bg-white text-[#7A7970] border border-[#E2E0D8] hover:border-[#C8C6BC]'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Food list */}
        <div className="bg-white rounded-xl border border-[#E2E0D8] overflow-hidden">
          <div className="divide-y divide-[#F0EFE9]">
            {filtered.map(food => (
              <div key={food.id} className="flex items-center gap-4 p-4">
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-[#F4F3EF] flex-shrink-0">
                  <img src={food.image} alt={food.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-[#141412] text-sm">{food.name}</h3>
                    <span className="text-[10px] font-medium text-[#7A7970] capitalize bg-[#EAE9E3] px-1.5 py-0.5 rounded-full">
                      {food.category}
                    </span>
                  </div>
                  <p className="text-xs text-[#7A7970] mt-0.5 truncate">{food.description}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="font-mono text-xs font-medium text-[#141412]">₹{food.price}</span>
                    <span className="text-xs text-[#7A7970]">{food.prepTime} min prep</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => handleToggle(food.id, food.name, food.available)}
                    className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-colors ${
                      food.available
                        ? 'text-[#2A6B43] bg-[#EBF5EF] hover:bg-[#D4EDE0]'
                        : 'text-[#7A7970] bg-[#EAE9E3] hover:bg-[#E0DED6]'
                    }`}
                  >
                    {food.available
                      ? <><ToggleRight size={13} /> Available</>
                      : <><ToggleLeft size={13} /> Unavailable</>
                    }
                  </button>
                  <button className="w-7 h-7 rounded-lg border border-[#E2E0D8] flex items-center justify-center text-[#7A7970] hover:text-[#141412] hover:border-[#141412] transition-colors">
                    <Edit3 size={12} />
                  </button>
                  <button className="w-7 h-7 rounded-lg border border-[#E2E0D8] flex items-center justify-center text-[#7A7970] hover:text-[#B04040] hover:border-[#B04040] transition-colors">
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add item modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4" onClick={() => setShowAddModal(false)}>
            <div className="bg-white rounded-2xl border border-[#E2E0D8] p-6 w-full max-w-md" onClick={e => e.stopPropagation()}>
              <h3 className="font-display text-2xl text-[#141412] mb-5">Add food item</h3>
              <div className="space-y-4">
                {[
                  { label: 'Name', placeholder: 'e.g. Paneer Tikka' },
                  { label: 'Price (₹)', placeholder: 'e.g. 75' },
                  { label: 'Description', placeholder: 'Short description…' },
                  { label: 'Preparation time (min)', placeholder: 'e.g. 10' },
                ].map(f => (
                  <div key={f.label}>
                    <label className="block text-xs font-medium text-[#7A7970] mb-1.5">{f.label}</label>
                    <input
                      type="text"
                      placeholder={f.placeholder}
                      className="w-full border border-[#E2E0D8] bg-[#F8F7F4] rounded-xl px-4 py-2.5 text-sm text-[#141412] placeholder:text-[#C8C6BC] focus:border-[#141412] transition-colors"
                    />
                  </div>
                ))}
                <div>
                  <label className="block text-xs font-medium text-[#7A7970] mb-1.5">Category</label>
                  <select className="w-full border border-[#E2E0D8] bg-[#F8F7F4] rounded-xl px-4 py-2.5 text-sm text-[#141412] focus:border-[#141412] outline-none">
                    {categories.map(c => (
                      <option key={c} value={c} className="capitalize">{c}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 border border-[#E2E0D8] text-[#141412] text-sm font-medium py-2.5 rounded-xl hover:bg-[#EAE9E3] transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => { setShowAddModal(false); showToast('Item added (demo)', 'success'); }}
                  className="flex-1 bg-[#141412] text-white text-sm font-medium py-2.5 rounded-xl hover:bg-[#2A6B43] transition-colors"
                >
                  Add item
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
