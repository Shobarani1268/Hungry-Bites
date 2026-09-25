import React from 'react';
import { Star, MapPin, Calendar, Utensils, Phone, Navigation, Clock, Sparkles } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { isRestaurantOpen } from '../utils/helpers';

interface HeroProps {
  onBookClick: () => void;
  onExploreMenu: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onBookClick, onExploreMenu }) => {
  const status = isRestaurantOpen();

  return (
    <section className="relative overflow-hidden bg-stone-900 text-stone-100">
      {/* Background Hero Image with Measured Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={RESTAURANT_INFO.heroImage}
          alt="Hungry Bites Multi Cuisine modern restaurant interior with green accents in Tekkali"
          className="w-full h-full object-cover object-center scale-102 transform duration-1000"
          referrerPolicy="no-referrer"
        />
        {/* Measured scrim according to constitution */}
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/95 via-stone-950/80 to-stone-950/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-stone-950/40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20 md:pt-20 md:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Brand & Hero Column */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Clean unboxed metadata separator bar (Zero-pill discipline) */}
            <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm text-emerald-300 font-medium tracking-wide">
              <span className="flex items-center gap-1.5 text-white">
                <span className={`w-2 h-2 rounded-full ${status.isOpen ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
                {status.statusText}
              </span>
              <span aria-hidden="true" className="text-emerald-500/60">·</span>
              <span>Tekkali, Srikakulam</span>
              <span aria-hidden="true" className="text-emerald-500/60">·</span>
              <span className="flex items-center gap-1 text-amber-300">
                <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                <span className="tabular-nums font-semibold">{RESTAURANT_INFO.rating}</span>
                <span className="text-stone-300 text-xs">({RESTAURANT_INFO.reviewCount}+ Google reviews)</span>
              </span>
              <span aria-hidden="true" className="text-emerald-500/60">·</span>
              <span className="text-stone-300 tabular-nums">{RESTAURANT_INFO.priceRange}</span>
            </div>

            {/* Headline with text-wrap: balance and no orphans */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight max-w-2xl">
              Where Flavours Meet Contemporary Elegance in Tekkali.
            </h1>

            {/* Narrative copy */}
            <p className="text-stone-200 text-base sm:text-lg leading-relaxed max-w-xl font-normal">
              Tekkali’s trending multi-cuisine dining destination. Renowned for our signature{' '}
              <strong className="text-emerald-300 font-semibold">Heaven Chicken</strong>, coastal{' '}
              <strong className="text-emerald-300 font-semibold">Raju Gari Kodi Pulao</strong>, slow-simmered{' '}
              <strong className="text-emerald-300 font-semibold">Matka Chicken Curry</strong>, and a lush, modern green ambiance tailored for memorable family meals and birthday celebrations.
            </p>

            {/* Primary Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3.5">
              <button
                onClick={onBookClick}
                className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm sm:text-base rounded-xl transition-all shadow-lg shadow-emerald-950/40 flex items-center gap-2 cursor-pointer active:scale-98"
              >
                <Calendar className="w-4 h-4" />
                <span>Reserve a Table Online</span>
              </button>

              <button
                onClick={onExploreMenu}
                className="px-5 py-3.5 bg-white/10 hover:bg-white/20 text-white font-medium text-sm sm:text-base rounded-xl backdrop-blur-md border border-white/20 transition-all flex items-center gap-2 cursor-pointer active:scale-98"
              >
                <Utensils className="w-4 h-4 text-emerald-300" />
                <span>Browse Digital Menu</span>
              </button>

              <a
                href={`tel:${RESTAURANT_INFO.phone}`}
                className="px-4 py-3.5 text-stone-300 hover:text-white font-medium text-sm flex items-center gap-2 transition-colors"
                aria-label="Call restaurant"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>Call Now</span>
              </a>
            </div>

            {/* Landmark and Key Trust Markers */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-stone-300">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Old NH 16, Beside Bank of Baroda (BOB), Tekkali</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Mon – Sun, 11:30 AM – 10:30 PM</span>
              </div>
            </div>
          </div>

          {/* Right Highlight Showcase Box */}
          <div className="lg:col-span-5">
            <div className="bg-stone-900/80 backdrop-blur-xl border border-emerald-500/20 rounded-2xl p-6 shadow-2xl text-stone-100 space-y-5">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div>
                  <span className="text-xs uppercase tracking-wider text-emerald-400 font-semibold">
                    Signature Guest Favourites
                  </span>
                  <h3 className="font-serif text-xl font-bold text-white mt-0.5">
                    Must-Try Dishes
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-xs text-stone-400 block">Average bill</span>
                  <span className="text-sm font-semibold text-emerald-300 tabular-nums">
                    ₹200 – ₹400 / head
                  </span>
                </div>
              </div>

              {/* 3 Featured item quick bites */}
              <div className="space-y-3.5">
                <div className="flex items-start gap-3.5 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5">
                  <img
                    src="/src/assets/images/food_heaven_chicken_starter_1790351651398.jpg"
                    alt="Heaven Chicken Starter"
                    className="w-16 h-16 rounded-lg object-cover shrink-0 border border-white/10"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-white text-sm truncate">
                        Heaven Chicken
                      </h4>
                      <span className="text-xs font-semibold text-emerald-300 tabular-nums">₹280</span>
                    </div>
                    <p className="text-xs text-stone-300 line-clamp-2 mt-0.5">
                      Signature crispy chicken bites tossed in rich sesame garlic glaze.
                    </p>
                    <span className="text-[11px] text-amber-300/90 font-medium">★ Most Ordered Starter</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5">
                  <img
                    src="/src/assets/images/food_raju_gari_kodi_pulao_1790351662788.jpg"
                    alt="Raju Gari Kodi Pulao"
                    className="w-16 h-16 rounded-lg object-cover shrink-0 border border-white/10"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-white text-sm truncate">
                        Raju Gari Kodi Pulao
                      </h4>
                      <span className="text-xs font-semibold text-emerald-300 tabular-nums">₹260</span>
                    </div>
                    <p className="text-xs text-stone-300 line-clamp-2 mt-0.5">
                      Authentic Andhra royal pulao with seeraga samba, ghee, cashews & chicken.
                    </p>
                    <span className="text-[11px] text-emerald-400 font-medium">Regional Masterpiece</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5">
                  <img
                    src="/src/assets/images/food_matka_chicken_curry_1790351674281.jpg"
                    alt="Matka Chicken Curry"
                    className="w-16 h-16 rounded-lg object-cover shrink-0 border border-white/10"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-white text-sm truncate">
                        Matka Chicken Curry
                      </h4>
                      <span className="text-xs font-semibold text-emerald-300 tabular-nums">₹290</span>
                    </div>
                    <p className="text-xs text-stone-300 line-clamp-2 mt-0.5">
                      Slow-cooked in an authentic clay pot with hand-ground spices & butter.
                    </p>
                    <span className="text-[11px] text-amber-300/90 font-medium">Earthen Pot Specialty</span>
                  </div>
                </div>
              </div>

              {/* Bottom quick reassurance */}
              <div className="pt-2 flex items-center justify-between text-xs text-stone-400">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  Family & Birthday party arrangements available
                </span>
                <a
                  href="#location"
                  className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-medium transition-colors"
                >
                  <Navigation className="w-3 h-3" />
                  <span>5.6 km radius</span>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
