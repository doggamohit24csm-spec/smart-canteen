import { useState, useMemo } from 'react';
import { Search, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import FoodCard from '../components/FoodCard';
import CrowdBadge from '../components/CrowdBadge';
import type { FoodCategory } from '../types';

const categories: { key: FoodCategory; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'breakfast', label: 'Breakfast' },
  { key: 'meals', label: 'Meals' },
  { key: 'snacks', label: 'Snacks' },
  { key: 'beverages', label: 'Beverages' },
  { key: 'desserts', label: 'Desserts' },
];

export default function Menu() {
  const { foods, navigate, canteenStatus } = useApp();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<FoodCategory>('all');

  const filtered = useMemo(() => {
    return foods.filter(f => {
      const matchesCat = category === 'all' || f.category === category;
      const matchesSearch = !search || f.name.toLowerCase().includes(search.toLowerCase()) ||
        f.description.toLowerCase().includes(search.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [foods, category, search]);

  return (
    <div className="min-h-screen bg-[#F8F7F4] pb-24 md:pb-10">
      <div className="max-w-6xl mx-auto px-4 md:px-6 pt-8">

        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="font-display text-4xl text-[#141412] mb-1">Today's menu.</h1>
            <p className="text-[#7A7970] text-sm">
              {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <CrowdBadge level={canteenStatus.level} size="sm" />
            <span className="text-xs text-[#7A7970]">{canteenStatus.waitTime} min wait</span>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#B8B7B0]" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search food…"
            className="w-full bg-white border border-[#E2E0D8] rounded-xl pl-10 pr-10 py-3 text-sm text-[#141412] placeholder:text-[#C8C6BC] focus:border-[#141412] transition-colors"
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#B8B7B0] hover:text-[#7A7970]">
              <X size={15} />
            </button>
          )}
        </div>

        {/* Category filters */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
          {categories.map(c => (
            <button
              key={c.key}
              onClick={() => setCategory(c.key)}
              className={`flex-shrink-0 text-sm px-4 py-2 rounded-xl font-medium transition-colors ${
                category === c.key
                  ? 'bg-[#141412] text-white'
                  : 'bg-white text-[#7A7970] border border-[#E2E0D8] hover:border-[#C8C6BC] hover:text-[#141412]'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Results */}
        {filtered.length === 0 ? (
          <div className="py-20 text-center">
            <p className="font-display text-2xl text-[#141412] mb-2">Nothing found.</p>
            <p className="text-[#7A7970] text-sm mb-4">
              {search ? `No results for "${search}"` : 'No items in this category.'}
            </p>
            <button
              onClick={() => { setSearch(''); setCategory('all'); }}
              className="text-sm text-[#2A6B43] font-medium hover:underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs text-[#7A7970]">{filtered.length} item{filtered.length !== 1 ? 's' : ''}</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filtered.map(food => (
                <FoodCard
                  key={food.id}
                  food={food}
                  onDetail={() => navigate('food-detail', { food })}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
