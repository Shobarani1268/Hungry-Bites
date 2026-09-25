import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, Share2, Users, Receipt, Sparkles } from 'lucide-react';
import { MenuItem, CartItem } from '../types';
import { formatPrice } from '../utils/helpers';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface PreOrderTrayModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onAddToCart: (item: MenuItem) => void;
  onRemoveFromCart: (itemId: string) => void;
  onClearCart: () => void;
  onProceedToBooking: () => void;
}

export const PreOrderTrayModal: React.FC<PreOrderTrayModalProps> = ({
  isOpen,
  onClose,
  cart,
  onAddToCart,
  onRemoveFromCart,
  onClearCart,
  onProceedToBooking,
}) => {
  const [splitGuests, setSplitGuests] = useState(2);

  if (!isOpen) return null;

  const subtotal = cart.reduce((acc, curr) => acc + curr.item.price * curr.quantity, 0);
  const gst = Math.round(subtotal * 0.05); // 5% GST
  const grandTotal = subtotal + gst;
  const perPersonCost = Math.round(grandTotal / (splitGuests || 1));

  // Direct WhatsApp Pre-Order message generator
  const handleSendWhatsAppPreOrder = () => {
    const itemsList = cart
      .map(
        i =>
          `• ${i.quantity}x ${i.item.name} (${formatPrice(
            i.item.price * i.quantity
          )})`
      )
      .join('\n');

    const msg = `*Pre-Order / Table Tray - Hungry Bites Tekkali*
━━━━━━━━━━━━━━━━━━━
🍽️ *Requested Dishes:*
${itemsList}

💰 *Subtotal:* ${formatPrice(subtotal)}
🧾 *Estimated GST (5%):* ${formatPrice(gst)}
🏷️ *Estimated Total:* ${formatPrice(grandTotal)}
👥 *Planned Guests:* ${splitGuests} (~${formatPrice(perPersonCost)}/head)
━━━━━━━━━━━━━━━━━━━
_I would like to place or confirm this order for my upcoming dine-in visit!_`;

    window.open(
      `https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent(msg)}`,
      '_blank'
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-stone-950/60 backdrop-blur-xs">
      <div
        className="w-full max-w-md bg-white h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-serif text-xl font-bold text-stone-900">
                Your Table Tray
              </h3>
              <span className="text-xs bg-emerald-100 text-emerald-900 font-semibold px-2 py-0.5 rounded-md font-mono tabular-nums">
                {cart.reduce((a, b) => a + b.quantity, 0)} items
              </span>
            </div>
            <p className="text-xs text-stone-500 mt-0.5">
              Pre-plan your meal for express service at your reserved table
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-200/80 hover:bg-stone-300 text-stone-700 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close tray"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 divide-y divide-stone-100 space-y-3">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-stone-400 space-y-3">
              <div className="w-16 h-16 rounded-2xl bg-stone-100 flex items-center justify-center text-stone-400">
                <Receipt className="w-8 h-8 stroke-1" />
              </div>
              <p className="font-serif text-lg font-medium text-stone-700">
                Your tray is empty
              </p>
              <p className="text-xs text-stone-500 max-w-xs">
                Explore our digital menu and add Heaven Chicken, Raju Gari Kodi Pulao, or your favourite curries!
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-4 py-2 bg-emerald-900 text-white text-xs font-semibold rounded-xl cursor-pointer"
              >
                Browse Menu Dishes
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between pb-2">
                <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                  Selected Dishes
                </span>
                <button
                  onClick={onClearCart}
                  className="text-xs text-red-600 hover:text-red-700 flex items-center gap-1 font-medium cursor-pointer"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>Clear All</span>
                </button>
              </div>

              {cart.map(({ item, quantity }) => {
                const isVeg = item.dietary === 'veg';
                return (
                  <div key={item.id} className="pt-3 flex items-start justify-between gap-3">
                    <div className="flex items-start gap-2.5 min-w-0">
                      <span
                        className={`w-3.5 h-3.5 mt-0.5 rounded-xs p-0.5 border flex items-center justify-center shrink-0 ${
                          isVeg ? 'border-emerald-600' : 'border-red-600'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            isVeg ? 'bg-emerald-600' : 'bg-red-600'
                          }`}
                        />
                      </span>
                      <div>
                        <h4 className="text-sm font-semibold text-stone-900 leading-tight">
                          {item.name}
                        </h4>
                        <div className="flex items-center gap-2 mt-0.5 text-xs text-stone-500">
                          <span className="font-mono tabular-nums">{formatPrice(item.price)} each</span>
                          <span aria-hidden="true">·</span>
                          <span>{item.portion}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-1.5 shrink-0">
                      <span className="font-mono font-bold text-sm text-stone-900 tabular-nums">
                        {formatPrice(item.price * quantity)}
                      </span>
                      {/* Stepper */}
                      <div className="flex items-center gap-1.5 bg-stone-100 px-2 py-0.5 rounded-lg border border-stone-200">
                        <button
                          onClick={() => onRemoveFromCart(item.id)}
                          className="w-5 h-5 flex items-center justify-center text-stone-600 hover:text-stone-900 cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-stone-900 font-mono tabular-nums w-4 text-center">
                          {quantity}
                        </span>
                        <button
                          onClick={() => onAddToCart(item)}
                          className="w-5 h-5 flex items-center justify-center text-stone-600 hover:text-stone-900 cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Per Person Cost Calculator */}
              <div className="pt-4 mt-4 bg-emerald-50/70 p-3.5 rounded-xl border border-emerald-900/10 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-emerald-950 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-emerald-700" />
                    Split estimate among guests:
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSplitGuests(Math.max(1, splitGuests - 1))}
                      className="w-5 h-5 rounded-md bg-white border border-stone-200 flex items-center justify-center text-xs font-bold text-stone-700 cursor-pointer"
                    >
                      -
                    </button>
                    <span className="font-bold text-emerald-950 font-mono tabular-nums text-xs">
                      {splitGuests} {splitGuests === 1 ? 'Guest' : 'Guests'}
                    </span>
                    <button
                      onClick={() => setSplitGuests(splitGuests + 1)}
                      className="w-5 h-5 rounded-md bg-white border border-stone-200 flex items-center justify-center text-xs font-bold text-stone-700 cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-emerald-900/10 text-xs">
                  <span className="text-emerald-800">Average bill per person:</span>
                  <span className="font-bold text-emerald-950 font-mono tabular-nums text-sm">
                    ~{formatPrice(perPersonCost)}
                  </span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer Billing & Actions */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-stone-200 bg-stone-50 space-y-3">
            {/* Bill Summary */}
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-stone-600">
                <span>Items Subtotal</span>
                <span className="font-mono tabular-nums">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Restaurant GST (5%)</span>
                <span className="font-mono tabular-nums">{formatPrice(gst)}</span>
              </div>
              <div className="flex justify-between font-bold text-sm text-stone-900 pt-1.5 border-t border-stone-200">
                <span>Estimated Bill</span>
                <span className="text-emerald-900 font-mono tabular-nums">{formatPrice(grandTotal)}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-2">
              <button
                onClick={() => {
                  onClose();
                  onProceedToBooking();
                }}
                className="w-full py-3 bg-emerald-900 hover:bg-emerald-850 text-white font-semibold text-xs sm:text-sm rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-emerald-300" />
                <span>Book Table with this Order</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleSendWhatsAppPreOrder}
                className="w-full py-2.5 bg-white hover:bg-stone-100 text-stone-800 border border-stone-300 font-medium text-xs sm:text-sm rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Share2 className="w-4 h-4 text-emerald-700" />
                <span>Send Order to Restaurant WhatsApp</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
