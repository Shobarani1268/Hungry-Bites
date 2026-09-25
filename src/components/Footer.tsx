import React from 'react';
import { UtensilsCrossed, Phone, MapPin, Clock, Heart } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface FooterProps {
  onOpenBooking: () => void;
  onOpenLookup: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking, onOpenLookup }) => {
  return (
    <footer className="bg-stone-950 text-stone-300 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-900 flex items-center justify-center text-emerald-300">
                <UtensilsCrossed className="w-5 h-5" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                Hungry Bites
              </span>
            </div>
            <p className="text-stone-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              Tekkali’s trending multi-cuisine restaurant known for modern ambiance with lush green accents, signature Heaven Chicken, authentic Andhra Pulaos, and hospitable family dining.
            </p>
            <div className="pt-1 text-xs text-stone-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Average ₹200–₹400 / person · Budget-Friendly</span>
            </div>
          </div>

          {/* Quick Nav */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
              Explore
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <a href="#menu" className="hover:text-emerald-400 transition-colors">
                  Digital Menu
                </a>
              </li>
              <li>
                <a href="#reservations" className="hover:text-emerald-400 transition-colors">
                  Table Reservation
                </a>
              </li>
              <li>
                <a href="#celebrations" className="hover:text-emerald-400 transition-colors">
                  Birthday Parties
                </a>
              </li>
              <li>
                <a href="#story" className="hover:text-emerald-400 transition-colors">
                  Our Story & Reviews
                </a>
              </li>
              <li>
                <a href="#location" className="hover:text-emerald-400 transition-colors">
                  Directions & Map
                </a>
              </li>
            </ul>
          </div>

          {/* Diners & Management */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
              Guest Care
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={onOpenBooking}
                  className="hover:text-emerald-400 transition-colors cursor-pointer text-left"
                >
                  Book Table Online
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenLookup}
                  className="hover:text-emerald-400 transition-colors cursor-pointer text-left"
                >
                  Find My Reservation
                </button>
              </li>
              <li>
                <a
                  href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors"
                >
                  WhatsApp Support
                </a>
              </li>
              <li>
                <a href={`tel:${RESTAURANT_INFO.phone}`} className="hover:text-emerald-400 transition-colors">
                  Call Front Desk
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
              Visit Us in Tekkali
            </h4>
            <div className="space-y-2.5 text-xs text-stone-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  Old NH 16, Borigipeta, beside Bank of Baroda (BOB), Tekkali, Andhra Pradesh 532201
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Monday to Sunday: 11:30 AM – 10:30 PM</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={`tel:${RESTAURANT_INFO.phone}`} className="hover:text-white font-mono">
                  {RESTAURANT_INFO.displayPhone}
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} Hungry Bites Multi Cuisine · Tekkali. All rights reserved.</p>
          <div className="flex items-center gap-1 text-stone-400">
            <span>Crafted with passion for hospitality & rich Telugu flavours</span>
            <Heart className="w-3.5 h-3.5 text-emerald-500 fill-emerald-500" />
          </div>
        </div>

      </div>
    </footer>
  );
};
