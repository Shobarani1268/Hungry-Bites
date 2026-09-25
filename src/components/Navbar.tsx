import React, { useState } from 'react';
import { UtensilsCrossed, ShoppingBag, Menu as MenuIcon, X, CalendarCheck, Clock, Phone } from 'lucide-react';
import { isRestaurantOpen } from '../utils/helpers';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenBooking: () => void;
  onOpenLookup: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenBooking,
  onOpenLookup,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const openStatus = isRestaurantOpen();

  return (
    <>
      {/* Top micro announcement bar */}
      <div className="bg-emerald-950 text-emerald-100 text-xs py-1.5 px-4 border-b border-emerald-900/60 hidden sm:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 font-medium">
              <span className={`w-2 h-2 rounded-full ${openStatus.isOpen ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
              {openStatus.statusText}
            </span>
            <span className="text-emerald-300/60">·</span>
            <span className="text-emerald-300/80">Tekkali, Old NH 16 (Beside Bank of Baroda)</span>
            <span className="text-emerald-300/60">·</span>
            <span className="text-emerald-300/80">₹200–₹400 / person</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={onOpenLookup}
              className="text-emerald-200 hover:text-white transition-colors underline-offset-4 hover:underline cursor-pointer"
            >
              Check My Reservation
            </button>
            <a
              href={`tel:${RESTAURANT_INFO.phone}`}
              className="flex items-center gap-1 text-emerald-300 hover:text-white transition-colors"
            >
              <Phone className="w-3 h-3" />
              <span>{RESTAURANT_INFO.displayPhone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* 3-Zone Top Bar Contract */}
      <header className="sticky top-0 z-40 bg-stone-50/95 backdrop-blur-md border-b border-stone-200/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          
          {/* Zone 1: Single element Brand Wordmark */}
          <a
            href="#"
            className="flex items-center gap-2.5 group"
            aria-label="Hungry Bites Multi Cuisine Home"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-900 flex items-center justify-center text-emerald-100 shadow-sm transition-transform group-hover:scale-105">
              <UtensilsCrossed className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-bold tracking-tight text-stone-900 group-hover:text-emerald-900 transition-colors leading-none">
                Hungry Bites
              </span>
              <span className="text-[11px] font-medium tracking-widest uppercase text-emerald-800/80 mt-0.5">
                Multi Cuisine · Tekkali
              </span>
            </div>
          </a>

          {/* Zone 2: 4–6 Clean Nav links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-stone-600">
            <a href="#menu" className="hover:text-emerald-900 transition-colors">
              Digital Menu
            </a>
            <a href="#reservations" className="hover:text-emerald-900 transition-colors">
              Table Booking
            </a>
            <a href="#celebrations" className="hover:text-emerald-900 transition-colors">
              Birthday & Parties
            </a>
            <a href="#story" className="hover:text-emerald-900 transition-colors">
              About & Reviews
            </a>
            <a href="#location" className="hover:text-emerald-900 transition-colors">
              Location & Hours
            </a>
          </nav>

          {/* Zone 3: 1–2 Primary actions */}
          <div className="flex items-center gap-2.5">
            {/* Table order / pre-order cart drawer trigger */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 rounded-xl border border-stone-200 hover:border-emerald-800/30 bg-white text-stone-700 hover:text-emerald-950 transition-colors shadow-2xs flex items-center gap-2 cursor-pointer"
              title="View Table Tray / Pre-Order"
              aria-label="View pre-order tray"
            >
              <ShoppingBag className="w-4 h-4 text-emerald-800" />
              <span className="hidden sm:inline text-xs font-semibold text-stone-800">
                Table Tray
              </span>
              {cartCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-emerald-800 text-white text-[11px] font-bold flex items-center justify-center tabular-nums">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Direct Reservation CTA */}
            <button
              onClick={onOpenBooking}
              className="px-4 py-2.5 text-xs sm:text-sm font-semibold text-white bg-emerald-900 hover:bg-emerald-850 rounded-xl transition-colors shadow-sm flex items-center gap-2 whitespace-nowrap cursor-pointer active:scale-98"
            >
              <CalendarCheck className="w-4 h-4 text-emerald-300" />
              <span>Book Table</span>
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-stone-700 hover:bg-stone-100 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-stone-50 border-b border-stone-200 px-6 py-5 space-y-4 shadow-lg">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200 text-xs">
              <span className="text-stone-500 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-emerald-700" />
                11:30 AM – 10:30 PM Daily
              </span>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenLookup();
                }}
                className="text-emerald-800 font-semibold underline underline-offset-2"
              >
                Find My Booking
              </button>
            </div>
            <nav className="flex flex-col gap-3.5 text-base font-medium text-stone-800">
              <a
                href="#menu"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-emerald-900 transition-colors"
              >
                Digital Interactive Menu
              </a>
              <a
                href="#reservations"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-emerald-900 transition-colors"
              >
                Online Reservation Booking
              </a>
              <a
                href="#celebrations"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-emerald-900 transition-colors"
              >
                Birthday & Family Celebrations
              </a>
              <a
                href="#story"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-emerald-900 transition-colors"
              >
                What Diners Say
              </a>
              <a
                href="#location"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-emerald-900 transition-colors"
              >
                Directions & Location
              </a>
            </nav>
            <div className="pt-2">
              <a
                href={`tel:${RESTAURANT_INFO.phone}`}
                className="w-full py-2.5 rounded-xl border border-emerald-900/30 text-emerald-950 flex items-center justify-center gap-2 font-medium text-sm"
              >
                <Phone className="w-4 h-4 text-emerald-700" />
                <span>Call Restaurant: {RESTAURANT_INFO.displayPhone}</span>
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
