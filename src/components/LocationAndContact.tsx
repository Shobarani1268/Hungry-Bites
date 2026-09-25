import React from 'react';
import { MapPin, Clock, Phone, Navigation, MessageSquare, Car, Shield, Compass } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { isRestaurantOpen } from '../utils/helpers';

export const LocationAndContact: React.FC = () => {
  const openStatus = isRestaurantOpen();

  return (
    <section id="location" className="py-16 md:py-24 bg-white border-t border-stone-200 scroll-mt-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-800">
            <Compass className="w-3.5 h-3.5 text-emerald-700" />
            <span>Find Us in Tekkali</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
            Location, Directions & Timings
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Conveniently situated right beside Bank of Baroda (BOB) on Old NH 16 in Borigipeta, Tekkali. Easy accessibility with street parking for two-wheelers and four-wheelers.
          </p>
        </div>

        {/* Content Grid */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left: Location & Details Cards */}
          <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
            
            {/* Address Box */}
            <div className="p-6 bg-stone-50 rounded-2xl border border-stone-200 space-y-3">
              <div className="flex items-center gap-2.5 text-emerald-800">
                <MapPin className="w-5 h-5" />
                <h3 className="font-serif text-lg font-bold text-stone-900">
                  Restaurant Address
                </h3>
              </div>
              <p className="text-stone-800 text-sm font-medium leading-relaxed">
                {RESTAURANT_INFO.address}
              </p>
              <div className="pt-2 border-t border-stone-200/80 flex items-center justify-between text-xs text-stone-500">
                <span>Landmark: Beside Bank of Baroda</span>
                <span className="font-semibold text-emerald-800">Pincode: 532201</span>
              </div>
            </div>

            {/* Operating Hours Box */}
            <div className="p-6 bg-stone-50 rounded-2xl border border-stone-200 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5 text-emerald-800">
                  <Clock className="w-5 h-5" />
                  <h3 className="font-serif text-lg font-bold text-stone-900">
                    Operating Hours
                  </h3>
                </div>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${openStatus.isOpen ? 'bg-emerald-100 text-emerald-900' : 'bg-amber-100 text-amber-900'}`}>
                  {openStatus.statusText}
                </span>
              </div>

              <div className="space-y-1.5 text-xs text-stone-700">
                <div className="flex justify-between py-1 border-b border-stone-200/60">
                  <span className="font-medium">Monday – Sunday</span>
                  <span className="font-semibold font-mono tabular-nums">11:30 AM – 10:30 PM</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-200/60">
                  <span className="font-medium">Lunch Service</span>
                  <span className="font-mono tabular-nums">11:30 AM – 03:30 PM</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="font-medium">Dinner Service</span>
                  <span className="font-mono tabular-nums">06:30 PM – 10:30 PM</span>
                </div>
              </div>
              <p className="text-[11px] text-stone-400">
                *Kitchen takes last dine-in orders at 10:00 PM.
              </p>
            </div>

            {/* Direct Contact & Route Actions */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href={`tel:${RESTAURANT_INFO.phone}`}
                className="p-3.5 rounded-xl bg-emerald-900 hover:bg-emerald-850 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors shadow-2xs"
              >
                <Phone className="w-4 h-4 text-emerald-300" />
                <span>Call Restaurant</span>
              </a>

              <a
                href={RESTAURANT_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-xl bg-white hover:bg-stone-100 text-stone-800 border border-stone-300 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors shadow-2xs"
              >
                <Navigation className="w-4 h-4 text-emerald-700" />
                <span>Get Directions</span>
              </a>
            </div>

          </div>

          {/* Right: Map & Landmark Visual Experience */}
          <div className="lg:col-span-7 bg-stone-100 rounded-2xl border border-stone-200 overflow-hidden flex flex-col justify-between">
            {/* Interactive Styled Map View */}
            <div className="relative w-full h-80 sm:h-96 bg-stone-900 overflow-hidden">
              <iframe
                title="Hungry Bites Multi Cuisine Tekkali Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15162.361598448882!2d84.220!3d18.618!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a3c5a6104bc17ef%3A0x9d4bfa85a498b04!2sTekkali%2C%20Andhra%20Pradesh%20532201!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                className="w-full h-full border-0 filter contrast-105"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              
              {/* Overlay location pin badge */}
              <div className="absolute top-4 left-4 z-10 bg-white/95 backdrop-blur-md p-3 rounded-xl border border-stone-200 shadow-md text-xs space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-stone-900">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-ping" />
                  <span>Hungry Bites Multi Cuisine</span>
                </div>
                <span className="text-stone-500 block">Old NH 16, beside Bank of Baroda, Tekkali</span>
                <span className="text-emerald-800 font-semibold block text-[11px]">
                  5.6 km vicinity · Srikakulam District
                </span>
              </div>
            </div>

            {/* Bottom features strip */}
            <div className="p-4 bg-white border-t border-stone-200 grid grid-cols-3 gap-3 text-center text-xs">
              <div className="flex flex-col items-center gap-1">
                <Car className="w-4 h-4 text-emerald-800" />
                <span className="font-semibold text-stone-800">Parking Space</span>
                <span className="text-[11px] text-stone-500">2-Wheeler & Cars</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Shield className="w-4 h-4 text-emerald-800" />
                <span className="font-semibold text-stone-800">Hygiene First</span>
                <span className="text-[11px] text-stone-500">Cleaned & Sanitized</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <MessageSquare className="w-4 h-4 text-emerald-800" />
                <span className="font-semibold text-stone-800">WhatsApp Help</span>
                <span className="text-[11px] text-stone-500">Quick Response</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
