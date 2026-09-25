import React from 'react';
import { Star, ShieldCheck, Heart, Sparkles, Quote, Award } from 'lucide-react';
import { TESTIMONIALS, RESTAURANT_INFO } from '../data/restaurantData';

export const AboutAndReviews: React.FC = () => {
  return (
    <section id="story" className="py-16 md:py-24 bg-stone-50 border-t border-stone-200 scroll-mt-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Story Section Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pb-16 border-b border-stone-200">
          
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-800">
              <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
              <span>Our Culinary Philosophy</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight leading-tight">
              Modern Ambiance & Family Dining in Tekkali
            </h2>

            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Hungry Bites Multi Cuisine was born with a mission to bring urban dining standards, sophisticated hospitality, and authentic multi-cuisine flavours to Tekkali. Located conveniently on Old NH 16 beside Bank of Baroda, we envisioned a space that feels fresh, welcoming, and relaxed.
            </p>

            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Our signature interior pairs calming botanical emerald accents with warm wooden dining booths. We pride ourselves on three core pillars: <strong className="text-stone-900">fresh ingredients</strong>, <strong className="text-stone-900">swift attentive service</strong>, and <strong className="text-stone-900">balanced spice craftsmanship</strong> that lets families, children, and elders enjoy together without overwhelming heat.
            </p>

            {/* Quality Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 bg-white rounded-xl border border-stone-200 shadow-2xs">
                <ShieldCheck className="w-5 h-5 text-emerald-700 mb-1.5" />
                <h4 className="font-semibold text-stone-900 text-xs">Fresh Daily Meat & Produce</h4>
                <p className="text-[11px] text-stone-500 mt-1 leading-normal">
                  No artificial colors or frozen shortcuts. Cooked to order.
                </p>
              </div>

              <div className="p-4 bg-white rounded-xl border border-stone-200 shadow-2xs">
                <Heart className="w-5 h-5 text-emerald-700 mb-1.5" />
                <h4 className="font-semibold text-stone-900 text-xs">Family Mild Spicing</h4>
                <p className="text-[11px] text-stone-500 mt-1 leading-normal">
                  Delicate aroma and mild spice profiling suited for all generations.
                </p>
              </div>

              <div className="p-4 bg-white rounded-xl border border-stone-200 shadow-2xs">
                <Award className="w-5 h-5 text-emerald-700 mb-1.5" />
                <h4 className="font-semibold text-stone-900 text-xs">Budget Friendly</h4>
                <p className="text-[11px] text-stone-500 mt-1 leading-normal">
                  Average ₹200–₹400 per person for generous multi-cuisine portions.
                </p>
              </div>
            </div>
          </div>

          {/* Visual Showcase collage */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden border border-stone-300 shadow-xl bg-stone-900 aspect-4/3">
              <img
                src={RESTAURANT_INFO.heroImage}
                alt="Hungry Bites Modern Interior with Emerald Accents"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-stone-950/20" />
              
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <span className="text-xs uppercase tracking-wider text-emerald-300 font-semibold block">
                  Borigipeta, Tekkali
                </span>
                <p className="font-serif text-lg sm:text-xl font-bold">
                  Contemporary decor, plush seating, and warm hospitality
                </p>
                <div className="flex items-center gap-3 text-xs text-stone-300 pt-1">
                  <span>Fully Air-Conditioned</span>
                  <span>·</span>
                  <span>Free Street Parking</span>
                  <span>·</span>
                  <span>Music & Party Setup</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Customer Reviews Section */}
        <div className="pt-16 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-800">
                <span>Verified Diners & Families</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                What Diners Say
              </h3>
            </div>

            <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-stone-200 shadow-2xs">
              <div className="flex items-center gap-1 text-amber-500">
                {[1, 2, 3, 4, 5].map(i => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <div className="text-xs">
                <strong className="text-stone-900 font-bold text-sm tabular-nums">4.3 / 5</strong>
                <span className="text-stone-500 ml-1">({RESTAURANT_INFO.reviewCount}+ Google reviews)</span>
              </div>
            </div>
          </div>

          {/* Testimonial Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TESTIMONIALS.map(rev => (
              <div
                key={rev.id}
                className="bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <Star
                          key={idx}
                          className={`w-3.5 h-3.5 ${
                            idx < Math.floor(rev.rating)
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-stone-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md">
                      {rev.verifiedVisit}
                    </span>
                  </div>

                  <p className="text-stone-700 text-sm leading-relaxed italic">
                    "{rev.review}"
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                  <div>
                    <h5 className="font-semibold text-stone-900">{rev.name}</h5>
                    <span className="text-stone-500 text-[11px]">{rev.role}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-stone-400 block text-[10px]">Loved Dish</span>
                    <span className="font-medium text-emerald-900 text-[11px]">{rev.favouriteItem}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
