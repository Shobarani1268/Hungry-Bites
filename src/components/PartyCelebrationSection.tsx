import React from 'react';
import { Cake, Sparkles, Users, Music, Gift, HeartHandshake, Phone } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface PartyCelebrationProps {
  onPlanPartyClick: () => void;
}

export const PartyCelebrationSection: React.FC<PartyCelebrationProps> = ({
  onPlanPartyClick,
}) => {
  const celebrationPerks = [
    {
      icon: Cake,
      title: 'Cake Storing & Presentation',
      description: 'Bring your favourite cake; our team stores it in our chillers and coordinates the sparkler entrance.',
    },
    {
      icon: Sparkles,
      title: 'Complimentary Table Decor',
      description: 'Themed balloon table accents and modern green botanical photo-ready setup for the guest of honor.',
    },
    {
      icon: Users,
      title: 'Spacious Group Seating',
      description: 'Comfortably accommodate 8 to 30 guests in our central modern dining lounge or cozy family booths.',
    },
    {
      icon: Music,
      title: 'Atmospheric Ambiance & Tunes',
      description: 'Trendy playlist with sound control to make celebrations lively yet comfortable for family conversation.',
    },
    {
      icon: Gift,
      title: 'Custom Multi-Cuisine Feasts',
      description: 'Curated packages featuring Heaven Chicken, signature Pulaos, Naans, and mocktails at ₹250–₹350 per head.',
    },
    {
      icon: HeartHandshake,
      title: 'Attentive Serving Captain',
      description: 'Dedicated steward ensuring prompt courses, warm rotis, and personalized spice adjustments for young kids.',
    },
  ];

  return (
    <section id="celebrations" className="py-16 md:py-24 bg-stone-900 text-stone-100 relative overflow-hidden scroll-mt-14">
      {/* Decorative emerald gradient orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-700/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400">
            <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
            <span>Tekkali’s Trending Celebration Destination</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            Birthday Parties & Family Celebrations
          </h2>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            From 1st birthday milestones and family anniversaries to student farewells and reunion feasts. Our vibrant ambiance with lush emerald accents offers the perfect backdrop in Tekkali.
          </p>
        </div>

        {/* Perks Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {celebrationPerks.map((perk, idx) => {
            const IconComponent = perk.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-500/30 transition-all space-y-3 group"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-500/20 text-emerald-400 flex items-center justify-center transition-transform group-hover:scale-110">
                  <IconComponent className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg font-bold text-white">
                  {perk.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-normal">
                  {perk.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner with Actions */}
        <div className="mt-12 p-8 rounded-2xl bg-gradient-to-r from-emerald-950 via-stone-900 to-emerald-950 border border-emerald-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center md:text-left">
            <h4 className="font-serif text-xl sm:text-2xl font-bold text-white">
              Planning an upcoming celebration in Tekkali?
            </h4>
            <p className="text-xs sm:text-sm text-emerald-200/90">
              Let us know your date, guest count, and cake requests. We’ll handle the setup!
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={onPlanPartyClick}
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm rounded-xl transition-all shadow-md cursor-pointer active:scale-98"
            >
              Book Celebration Table
            </button>
            <a
              href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent(
                'Hello Hungry Bites! I would like to inquire about party / birthday booking availability in Tekkali.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-medium text-xs sm:text-sm rounded-xl transition-all flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp Party Desk</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
