import React from 'react';
import { X, Plus, Minus, Flame, Sparkles, Clock, Users, Utensils } from 'lucide-react';
import { MenuItem } from '../types';
import { formatPrice } from '../utils/helpers';

interface MenuItemModalProps {
  item: MenuItem | null;
  quantityInCart: number;
  onClose: () => void;
  onAddToCart: (item: MenuItem) => void;
  onRemoveFromCart: (itemId: string) => void;
}

export const MenuItemModal: React.FC<MenuItemModalProps> = ({
  item,
  quantityInCart,
  onClose,
  onAddToCart,
  onRemoveFromCart,
}) => {
  if (!item) return null;

  const isVeg = item.dietary === 'veg';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs">
      <div
        className="relative w-full max-w-lg bg-white rounded-2xl overflow-hidden shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 z-20 w-8 h-8 rounded-full bg-stone-900/60 hover:bg-stone-900 text-white flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Image Header */}
        <div className="relative h-56 sm:h-64 w-full bg-stone-900 overflow-hidden">
          {item.image ? (
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-emerald-950 to-stone-900 text-stone-300 p-6 text-center">
              <Utensils className="w-12 h-12 text-emerald-400 mb-2 opacity-80" />
              <span className="font-serif text-xl font-bold text-white">{item.name}</span>
              <span className="text-xs text-stone-400 mt-1">{item.categoryLabel}</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-black/20" />

          {/* Quick overlay badges */}
          <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between text-white">
            <div className="flex items-center gap-2">
              <span
                className={`w-3 h-3 rounded-xs border-2 flex items-center justify-center ${
                  isVeg ? 'border-emerald-500' : 'border-red-500'
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    isVeg ? 'bg-emerald-500' : 'bg-red-500'
                  }`}
                />
              </span>
              <span className="text-xs font-semibold tracking-wide uppercase">
                {isVeg ? 'Pure Veg' : 'Non-Vegetarian'}
              </span>
            </div>
            {item.isChefSpecial && (
              <span className="text-xs font-semibold text-amber-300 flex items-center gap-1 bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-md">
                <Sparkles className="w-3 h-3" />
                Chef Special
              </span>
            )}
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
          <div>
            <div className="flex items-start justify-between gap-4">
              <h3 className="font-serif text-2xl font-bold text-stone-900 leading-snug">
                {item.name}
              </h3>
              <span className="text-xl font-bold text-emerald-900 font-mono tabular-nums shrink-0">
                {formatPrice(item.price)}
              </span>
            </div>
            <p className="text-stone-600 text-sm mt-2 leading-relaxed">
              {item.description}
            </p>
          </div>

          {/* Specifications Grid */}
          <div className="grid grid-cols-3 gap-3 py-3 border-y border-stone-100 text-xs">
            <div className="flex flex-col">
              <span className="text-stone-400 flex items-center gap-1">
                <Flame className="w-3 h-3 text-amber-600" />
                Spice Level
              </span>
              <span className="font-semibold text-stone-800 mt-0.5">{item.spice}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-stone-400 flex items-center gap-1">
                <Users className="w-3 h-3 text-stone-500" />
                Portion
              </span>
              <span className="font-semibold text-stone-800 mt-0.5">{item.portion}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-stone-400 flex items-center gap-1">
                <Clock className="w-3 h-3 text-stone-500" />
                Prep Time
              </span>
              <span className="font-semibold text-stone-800 mt-0.5 font-mono tabular-nums">
                ~{item.prepTimeMinutes || 15} mins
              </span>
            </div>
          </div>

          {/* Key Ingredients */}
          {item.ingredients && item.ingredients.length > 0 && (
            <div>
              <h4 className="text-xs uppercase tracking-wider font-semibold text-stone-500 mb-1.5">
                Key Fresh Ingredients
              </h4>
              <p className="text-xs text-stone-700 leading-normal">
                {item.ingredients.join(' · ')}
              </p>
            </div>
          )}

          {/* Pairing Suggestion */}
          {item.pairWith && (
            <div className="bg-emerald-50/70 border border-emerald-900/10 p-3 rounded-xl">
              <span className="text-xs font-semibold text-emerald-950 block">
                Chef’s Pairing Recommendation:
              </span>
              <span className="text-xs text-emerald-800 mt-0.5 block">
                {item.pairWith}
              </span>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between">
          <div className="text-xs text-stone-500">
            <span>Price: </span>
            <span className="font-bold text-stone-900 text-sm font-mono tabular-nums">
              {formatPrice(item.price)}
            </span>
            <span className="text-[11px] block text-stone-400">Taxes calculated at billing</span>
          </div>

          {quantityInCart === 0 ? (
            <button
              onClick={() => onAddToCart(item)}
              className="px-5 py-2.5 bg-emerald-900 hover:bg-emerald-800 text-white text-xs sm:text-sm font-semibold rounded-xl flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add to Table Tray</span>
            </button>
          ) : (
            <div className="flex items-center gap-3 bg-white px-3 py-1.5 rounded-xl border border-stone-300 shadow-2xs">
              <button
                onClick={() => onRemoveFromCart(item.id)}
                className="w-7 h-7 rounded-lg bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-800 font-bold transition-colors cursor-pointer"
                aria-label="Decrease quantity"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="text-sm font-bold text-stone-900 font-mono tabular-nums w-4 text-center">
                {quantityInCart}
              </span>
              <button
                onClick={() => onAddToCart(item)}
                className="w-7 h-7 rounded-lg bg-emerald-900 hover:bg-emerald-800 flex items-center justify-center text-white font-bold transition-colors cursor-pointer"
                aria-label="Increase quantity"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
