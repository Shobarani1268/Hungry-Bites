import React, { useState, useMemo } from 'react';
import { Search, Sparkles, Flame, Plus, Minus, Info, X, ShoppingBag, Check } from 'lucide-react';
import { MenuItem, DietaryType } from '../types';
import { MENU_ITEMS } from '../data/restaurantData';
import { formatPrice } from '../utils/helpers';
import { MenuItemModal } from './MenuItemModal';

interface InteractiveMenuProps {
  cart: { item: MenuItem; quantity: number }[];
  onAddToCart: (item: MenuItem) => void;
  onRemoveFromCart: (itemId: string) => void;
  onOpenCart: () => void;
}

type CategoryFilter = 'all' | 'specials' | 'biryani' | 'starters' | 'curries' | 'chinese' | 'veg' | 'desserts_beverages';

export const InteractiveMenu: React.FC<InteractiveMenuProps> = ({
  cart,
  onAddToCart,
  onRemoveFromCart,
  onOpenCart,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [dietaryFilter, setDietaryFilter] = useState<'all' | DietaryType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activePreset, setActivePreset] = useState<string | null>(null);
  const [selectedModalItem, setSelectedModalItem] = useState<MenuItem | null>(null);

  // Cart quantity lookup map
  const cartQuantityMap = useMemo(() => {
    const map = new Map<string, number>();
    cart.forEach(c => map.set(c.item.id, c.quantity));
    return map;
  }, [cart]);

  // Categories list
  const categories: { id: CategoryFilter; label: string }[] = [
    { id: 'all', label: 'All Dishes' },
    { id: 'specials', label: "Chef's Specials" },
    { id: 'biryani', label: 'Biryanis & Pulaos' },
    { id: 'starters', label: 'Starters' },
    { id: 'curries', label: 'Curries & Gravies' },
    { id: 'chinese', label: 'Chinese & Fried Rice' },
    { id: 'veg', label: 'Pure Veg Delights' },
    { id: 'desserts_beverages', label: 'Desserts & Coolers' },
  ];

  // Quick Preset tags
  const presets = [
    { id: 'chef_pick', label: '★ Chef Favourites' },
    { id: 'mild_family', label: 'Family Mild Spiced' },
    { id: 'spicy_andhra', label: 'Spicy Regional Andhra' },
    { id: 'budget_pick', label: 'Under ₹250' },
  ];

  const handlePresetClick = (presetId: string) => {
    if (activePreset === presetId) {
      setActivePreset(null);
    } else {
      setActivePreset(presetId);
    }
  };

  // Filtered Items logic
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter(item => {
      // Category filter
      if (selectedCategory !== 'all') {
        if (selectedCategory === 'specials' && !item.isChefSpecial) return false;
        if (selectedCategory !== 'specials' && item.category !== selectedCategory) return false;
      }

      // Dietary filter
      if (dietaryFilter !== 'all' && item.dietary !== dietaryFilter) {
        return false;
      }

      // Preset filter
      if (activePreset === 'chef_pick' && !item.isChefSpecial) return false;
      if (activePreset === 'mild_family' && item.spice !== 'Mild') return false;
      if (activePreset === 'spicy_andhra' && item.spice !== 'Fiery') return false;
      if (activePreset === 'budget_pick' && item.price > 250) return false;

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        const matchesIngredients = item.ingredients.some(ing => ing.toLowerCase().includes(q));
        const matchesCategory = item.categoryLabel.toLowerCase().includes(q);
        if (!matchesName && !matchesDesc && !matchesIngredients && !matchesCategory) {
          return false;
        }
      }

      return true;
    });
  }, [selectedCategory, dietaryFilter, activePreset, searchQuery]);

  const totalCartCount = cart.reduce((acc, curr) => acc + curr.quantity, 0);
  const cartSubtotal = cart.reduce((acc, curr) => acc + curr.item.price * curr.quantity, 0);

  return (
    <section id="menu" className="py-16 md:py-24 bg-stone-100/60 border-t border-stone-200 scroll-mt-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-800">
            <span>Explore Flavours</span>
            <span aria-hidden="true">·</span>
            <span>Budget-Friendly Multi Cuisine</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 tracking-tight">
            Digital Interactive Menu
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Freshly prepared dishes balancing aromatic regional Andhra spices with classic Indo-Chinese and North Indian delicacies. Filter by dietary choice, spice level, or explore our chef's hand-crafted specials.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="mt-10 space-y-4">
          
          {/* Row 1: Search + Dietary Switch */}
          <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search Heaven Chicken, Kodi Pulao, Paneer, Cashews..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-9 py-2.5 bg-white border border-stone-300 rounded-xl text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 transition-all shadow-2xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 cursor-pointer"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Dietary Preference Segmented Control (Interactive functional buttons) */}
            <div className="flex items-center p-1 bg-stone-200/80 rounded-xl self-start md:self-auto text-xs font-medium">
              <button
                onClick={() => setDietaryFilter('all')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  dietaryFilter === 'all'
                    ? 'bg-white text-stone-900 font-semibold shadow-2xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                All Diets
              </button>
              <button
                onClick={() => setDietaryFilter('non-veg')}
                className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
                  dietaryFilter === 'non-veg'
                    ? 'bg-white text-red-900 font-semibold shadow-2xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-red-600" />
                Non-Veg
              </button>
              <button
                onClick={() => setDietaryFilter('veg')}
                className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
                  dietaryFilter === 'veg'
                    ? 'bg-white text-emerald-900 font-semibold shadow-2xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-600" />
                Pure Veg
              </button>
            </div>
          </div>

          {/* Row 2: Category Tabs (Scrollable on mobile) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none no-scrollbar">
            {categories.map(cat => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-emerald-900 text-white font-semibold shadow-sm'
                      : 'bg-white text-stone-600 hover:text-stone-900 hover:bg-stone-50 border border-stone-200'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Row 3: Presets & Quick filter bar */}
          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
            <span className="text-stone-600 font-semibold shrink-0">Quick Filter:</span>
            {presets.map(p => {
              const isSelected = activePreset === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => handlePresetClick(p.id)}
                  className={`px-2.5 py-1 rounded-lg border text-xs transition-colors flex items-center gap-1 cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-100/90 text-emerald-950 border-emerald-500 font-semibold'
                      : 'bg-white text-stone-600 border-stone-200 hover:border-stone-300'
                  }`}
                >
                  {isSelected && <Check className="w-3 h-3 text-emerald-700" />}
                  <span>{p.label}</span>
                </button>
              );
            })}
            {(activePreset || searchQuery || dietaryFilter !== 'all' || selectedCategory !== 'all') && (
              <button
                onClick={() => {
                  setActivePreset(null);
                  setSearchQuery('');
                  setDietaryFilter('all');
                  setSelectedCategory('all');
                }}
                className="text-stone-500 hover:text-stone-900 underline underline-offset-2 ml-auto cursor-pointer"
              >
                Reset All Filters
              </button>
            )}
          </div>
        </div>

        {/* Results Counter */}
        <div className="mt-6 flex items-center justify-between text-xs text-stone-500">
          <span>
            Showing <strong className="font-semibold text-stone-800">{filteredItems.length}</strong> delicious items
          </span>
          <span className="text-[11px] text-stone-400">
            *Spice customization available for all curries & biryanis
          </span>
        </div>

        {/* Menu Cards Grid */}
        {filteredItems.length === 0 ? (
          <div className="mt-8 p-12 bg-white rounded-2xl border border-stone-200 text-center space-y-3">
            <p className="font-serif text-lg text-stone-800 font-medium">
              No dishes found matching your current filter.
            </p>
            <p className="text-xs text-stone-500">
              Try searching with another keyword or resetting the spice / dietary filters.
            </p>
            <button
              onClick={() => {
                setActivePreset(null);
                setSearchQuery('');
                setDietaryFilter('all');
                setSelectedCategory('all');
              }}
              className="mt-2 px-4 py-2 bg-emerald-900 text-white text-xs font-semibold rounded-xl cursor-pointer"
            >
              Show All Menu Items
            </button>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map(item => {
              const qty = cartQuantityMap.get(item.id) || 0;
              const isVeg = item.dietary === 'veg';

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-stone-200 hover:border-emerald-800/30 transition-all duration-200 overflow-hidden flex flex-col justify-between shadow-2xs hover:shadow-md group"
                >
                  {/* Card Image or Stylized Container */}
                  <div className="relative h-48 w-full bg-stone-100 overflow-hidden">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-stone-900 text-stone-400 p-4 text-center">
                        <span className="font-serif text-lg font-bold text-white mb-1">
                          {item.name}
                        </span>
                        <span className="text-[11px] text-stone-400">
                          {item.categoryLabel}
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent pointer-events-none" />

                    {/* Top corner indicators */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      {/* Veg / Non-Veg Icon */}
                      <span
                        className={`w-4 h-4 bg-white/95 rounded-xs p-0.5 border flex items-center justify-center shadow-xs ${
                          isVeg ? 'border-emerald-600' : 'border-red-600'
                        }`}
                        title={isVeg ? 'Pure Veg' : 'Non-Vegetarian'}
                      >
                        <span
                          className={`w-2 h-2 rounded-full ${
                            isVeg ? 'bg-emerald-600' : 'bg-red-600'
                          }`}
                        />
                      </span>

                      {item.isChefSpecial && (
                        <span className="bg-amber-500/90 text-stone-950 text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 backdrop-blur-xs shadow-xs">
                          <Sparkles className="w-2.5 h-2.5" />
                          Chef Special
                        </span>
                      )}
                    </div>

                    {/* Spice indicator on image bottom */}
                    <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white text-xs">
                      <span className="flex items-center gap-1 text-[11px] font-medium text-stone-200">
                        <Flame
                          className={`w-3 h-3 ${
                            item.spice === 'Fiery'
                              ? 'text-red-400'
                              : item.spice === 'Medium'
                              ? 'text-amber-400'
                              : 'text-emerald-400'
                          }`}
                        />
                        {item.spice} Spice
                      </span>
                      <span className="text-[11px] text-stone-300">
                        {item.portion}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-1.5">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-serif text-lg font-bold text-stone-900 group-hover:text-emerald-950 transition-colors">
                          {item.name}
                        </h3>
                        <span className="font-mono text-base font-bold text-emerald-900 tabular-nums shrink-0">
                          {formatPrice(item.price)}
                        </span>
                      </div>
                      <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {/* Card Actions */}
                    <div className="pt-2 border-t border-stone-100 flex items-center justify-between gap-2">
                      <button
                        onClick={() => setSelectedModalItem(item)}
                        className="text-xs text-stone-500 hover:text-emerald-900 font-medium flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <Info className="w-3.5 h-3.5 text-stone-400" />
                        <span>Details</span>
                      </button>

                      {qty === 0 ? (
                        <button
                          onClick={() => onAddToCart(item)}
                          className="px-3.5 py-1.5 bg-stone-900 hover:bg-emerald-900 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add to Tray</span>
                        </button>
                      ) : (
                        <div className="flex items-center gap-2 bg-emerald-50 px-2 py-1 rounded-xl border border-emerald-200">
                          <button
                            onClick={() => onRemoveFromCart(item.id)}
                            className="w-6 h-6 rounded-lg bg-white hover:bg-emerald-100 flex items-center justify-center text-stone-700 font-bold transition-colors cursor-pointer shadow-2xs"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold text-emerald-950 font-mono tabular-nums w-4 text-center">
                            {qty}
                          </span>
                          <button
                            onClick={() => onAddToCart(item)}
                            className="w-6 h-6 rounded-lg bg-emerald-900 hover:bg-emerald-800 flex items-center justify-center text-white font-bold transition-colors cursor-pointer shadow-2xs"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Persistent Floating Bottom Tray Summary (if items in cart) */}
        {totalCartCount > 0 && (
          <div className="fixed bottom-4 left-4 right-4 z-40 max-w-xl mx-auto">
            <div className="bg-emerald-950 text-white rounded-2xl p-3.5 sm:p-4 shadow-2xl border border-emerald-700/60 flex items-center justify-between backdrop-blur-md animate-in slide-in-from-bottom-5 duration-300">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-800 flex items-center justify-center text-emerald-200">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold">
                      {totalCartCount} {totalCartCount === 1 ? 'item' : 'items'} in Table Tray
                    </span>
                    <span className="text-xs text-emerald-300 font-mono tabular-nums">
                      ({formatPrice(cartSubtotal)})
                    </span>
                  </div>
                  <span className="text-[11px] text-emerald-300/80 block">
                    Attach directly to table reservation or pre-order
                  </span>
                </div>
              </div>

              <button
                onClick={onOpenCart}
                className="px-4 py-2 bg-emerald-400 hover:bg-emerald-300 text-stone-950 font-bold text-xs sm:text-sm rounded-xl transition-colors cursor-pointer shadow-sm whitespace-nowrap"
              >
                Review Tray →
              </button>
            </div>
          </div>
        )}

      </div>

      {/* Item Detail Modal */}
      {selectedModalItem && (
        <MenuItemModal
          item={selectedModalItem}
          quantityInCart={cartQuantityMap.get(selectedModalItem.id) || 0}
          onClose={() => setSelectedModalItem(null)}
          onAddToCart={onAddToCart}
          onRemoveFromCart={onRemoveFromCart}
        />
      )}
    </section>
  );
};
