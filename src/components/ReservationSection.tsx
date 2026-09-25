import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Calendar, Clock, Users, Sparkles, CheckCircle2, Phone, Download, MessageSquare, AlertCircle, Bookmark } from 'lucide-react';
import { Reservation, SeatingArea, CartItem } from '../types';
import { TIME_SLOTS, SEATING_OPTIONS, RESTAURANT_INFO } from '../data/restaurantData';
import { generateBookingId, generateWhatsAppBookingUrl, downloadCalendarEvent, saveReservation } from '../utils/helpers';

interface ReservationSectionProps {
  cart: CartItem[];
  onOpenLookup: () => void;
}

export const ReservationSection: React.FC<ReservationSectionProps> = ({
  cart,
  onOpenLookup,
}) => {
  // Today's date YYYY-MM-DD
  const todayStr = new Date().toISOString().split('T')[0];

  // Form states
  const [guestName, setGuestName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState(todayStr);
  const [timeSlot, setTimeSlot] = useState('07:30 PM');
  const [guestsCount, setGuestsCount] = useState(4);
  const [seatingArea, setSeatingArea] = useState<SeatingArea>('emerald_booth');
  const [occasion, setOccasion] = useState<Reservation['occasion']>('Regular Dining');
  const [spicePreference, setSpicePreference] = useState<Reservation['spicePreference']>('Balanced Medium');
  const [specialRequests, setSpecialRequests] = useState('');
  const [includePreOrder, setIncludePreOrder] = useState(true);

  // Validation & Submission
  const [formError, setFormError] = useState<string | null>(null);
  const [confirmedReservation, setConfirmedReservation] = useState<Reservation | null>(null);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!guestName.trim()) {
      setFormError('Please enter your full name');
      return;
    }

    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setFormError('Please provide a valid 10-digit mobile number for confirmation');
      return;
    }

    const newReservation: Reservation = {
      id: generateBookingId(),
      guestName: guestName.trim(),
      phone: cleanPhone,
      email: email.trim() || undefined,
      date,
      timeSlot,
      guestsCount,
      seatingArea,
      occasion,
      spicePreference,
      specialRequests: specialRequests.trim() || undefined,
      preOrderedItems: includePreOrder && cart.length > 0 ? cart : undefined,
      status: 'Confirmed',
      createdAt: new Date().toISOString(),
    };

    saveReservation(newReservation);
    setConfirmedReservation(newReservation);

    // Launch celebratory confetti
    try {
      confetti({
        particleCount: 90,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#059669', '#10b981', '#34d399', '#f59e0b', '#fbbf24'],
      });
    } catch {
      // safe fallback
    }
  };

  return (
    <section id="reservations" className="py-16 md:py-24 bg-white border-t border-stone-200 scroll-mt-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-stone-200">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-800">
              <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
              <span>Instant Confirmation · Zero Booking Fee</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 tracking-tight">
              Reserve Your Table Online
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Skip the weekend queue in Tekkali. Book your table for family dining, youth hangouts, or birthday parties. We ensure tables are prepped and customized before your arrival.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onOpenLookup}
              className="px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs sm:text-sm font-semibold rounded-xl transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Bookmark className="w-4 h-4 text-emerald-800" />
              <span>Lookup Existing Booking</span>
            </button>
          </div>
        </div>

        {/* Main Booking Form Layout */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Interactive Form */}
          <div className="lg:col-span-8">
            <form onSubmit={handleBookingSubmit} className="space-y-8">
              
              {/* Step 1: Date, Period & Time Slot */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-emerald-900 text-white text-xs flex items-center justify-center font-mono">1</span>
                    Select Date & Time Slot
                  </h3>
                  <span className="text-xs text-stone-400">Hours: 11:30 AM – 10:30 PM</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Date Input */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                      Dining Date
                    </label>
                    <div className="relative">
                      <Calendar className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="date"
                        min={todayStr}
                        value={date}
                        onChange={e => setDate(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm font-medium text-stone-800 focus:bg-white focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 transition-all"
                        required
                      />
                    </div>
                  </div>

                  {/* Number of Guests */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                      Guest Count ({guestsCount} {guestsCount === 1 ? 'Person' : 'Persons'})
                    </label>
                    <div className="flex items-center gap-1.5">
                      {[2, 4, 6, 8, 12, 16].map(count => (
                        <button
                          key={count}
                          type="button"
                          onClick={() => setGuestsCount(count)}
                          className={`flex-1 py-2 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                            guestsCount === count
                              ? 'bg-emerald-900 text-white border-emerald-900 shadow-2xs'
                              : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                          }`}
                        >
                          {count}
                        </button>
                      ))}
                      <input
                        type="number"
                        min={1}
                        max={50}
                        value={guestsCount}
                        onChange={e => setGuestsCount(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-16 py-2 px-2 text-xs font-semibold text-center bg-stone-50 border border-stone-200 rounded-lg focus:bg-white focus:border-emerald-700"
                        title="Custom guest count"
                      />
                    </div>
                  </div>
                </div>

                {/* Time Slots Pills */}
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-2">
                    Available Slots
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                    {TIME_SLOTS.map(slot => {
                      const isSelected = timeSlot === slot.time;
                      return (
                        <button
                          key={slot.id}
                          type="button"
                          onClick={() => setTimeSlot(slot.time)}
                          className={`py-2 px-2.5 rounded-xl text-xs font-medium border text-center transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-emerald-900 text-white border-emerald-900 shadow-sm font-semibold'
                              : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200'
                          }`}
                        >
                          <span className="block font-mono tabular-nums">{slot.time}</span>
                          <span className={`text-[10px] block mt-0.5 ${isSelected ? 'text-emerald-200' : 'text-stone-400'}`}>
                            {slot.period}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Step 2: Seating & Dining Area */}
              <div className="space-y-4 pt-4 border-t border-stone-100">
                <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-emerald-900 text-white text-xs flex items-center justify-center font-mono">2</span>
                  Choose Seating Ambience
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {SEATING_OPTIONS.map(opt => {
                    const isSelected = seatingArea === opt.id;
                    return (
                      <div
                        key={opt.id}
                        onClick={() => setSeatingArea(opt.id)}
                        className={`p-4 rounded-xl border-2 transition-all cursor-pointer text-left flex flex-col justify-between ${
                          isSelected
                            ? 'bg-emerald-50/70 border-emerald-700 shadow-xs'
                            : 'bg-white border-stone-200 hover:border-stone-300'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider">
                              {opt.tag}
                            </span>
                            <span className="text-[11px] text-stone-500 font-medium">
                              {opt.capacity}
                            </span>
                          </div>
                          <h4 className="font-serif text-base font-bold text-stone-900 mt-1">
                            {opt.title}
                          </h4>
                          <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                            {opt.subtitle}
                          </p>
                        </div>
                        <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-emerald-800">
                          <span className={`w-3 h-3 rounded-full border flex items-center justify-center ${isSelected ? 'border-emerald-700 bg-emerald-700 text-white' : 'border-stone-300'}`}>
                            {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </span>
                          <span>{isSelected ? 'Selected' : 'Select this space'}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step 3: Occasion & Preferences */}
              <div className="space-y-4 pt-4 border-t border-stone-100">
                <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-emerald-900 text-white text-xs flex items-center justify-center font-mono">3</span>
                  Occasion & Flavor Preference
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Occasion */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                      Dining Occasion
                    </label>
                    <select
                      value={occasion}
                      onChange={e => setOccasion(e.target.value as Reservation['occasion'])}
                      className="w-full py-2.5 px-3 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm font-medium text-stone-800 focus:bg-white focus:border-emerald-700"
                    >
                      <option value="Regular Dining">Regular Dining / Casual Dinner</option>
                      <option value="Birthday Celebration">🎂 Birthday Celebration (Free cake arrangement)</option>
                      <option value="Family Reunion">👨‍👩‍👧‍👦 Family Get-Together</option>
                      <option value="Anniversary">🥂 Anniversary / Romantic Evening</option>
                      <option value="Friends Hangout">🍕 Friends & Youth Hangout</option>
                    </select>
                  </div>

                  {/* Spice Level */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                      Table Spice Level Preference
                    </label>
                    <select
                      value={spicePreference}
                      onChange={e => setSpicePreference(e.target.value as Reservation['spicePreference'])}
                      className="w-full py-2.5 px-3 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm font-medium text-stone-800 focus:bg-white focus:border-emerald-700"
                    >
                      <option value="Balanced Medium">Balanced Medium (Recommended for all)</option>
                      <option value="Mild (Kid-friendly)">Mild (Suits young kids & seniors)</option>
                      <option value="Authentic Spicy">Authentic Spicy Andhra (Fiery & robust)</option>
                    </select>
                  </div>
                </div>

                {/* Pre-Order Attachment Notice (if tray has items) */}
                {cart.length > 0 && (
                  <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200 flex items-start justify-between gap-3 text-xs">
                    <div>
                      <span className="font-bold text-emerald-950 block">
                        Include your Table Tray dishes ({cart.length} items)?
                      </span>
                      <p className="text-emerald-800 mt-0.5">
                        Attaches dishes like {cart.slice(0, 2).map(c => c.item.name).join(', ')} so the kitchen can prep upon your seating.
                      </p>
                    </div>
                    <label className="flex items-center gap-2 cursor-pointer font-semibold text-emerald-900 shrink-0">
                      <input
                        type="checkbox"
                        checked={includePreOrder}
                        onChange={e => setIncludePreOrder(e.target.checked)}
                        className="rounded-sm text-emerald-700 focus:ring-emerald-700 w-4 h-4 cursor-pointer"
                      />
                      <span>Attach Dishes</span>
                    </label>
                  </div>
                )}
              </div>

              {/* Step 4: Contact & Guest Details */}
              <div className="space-y-4 pt-4 border-t border-stone-100">
                <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-emerald-900 text-white text-xs flex items-center justify-center font-mono">4</span>
                  Contact Information
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                      Guest Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Ramesh Varma"
                      value={guestName}
                      onChange={e => setGuestName(e.target.value)}
                      className="w-full py-2.5 px-3.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm font-medium text-stone-800 focus:bg-white focus:border-emerald-700"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                      WhatsApp Mobile Number *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        placeholder="10-digit number (e.g. 94912 34567)"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        className="w-full pl-10 pr-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm font-medium text-stone-800 focus:bg-white focus:border-emerald-700"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Special Requests or Birthday Note (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g., Please arrange a birthday table decor, high chair for infant, extra crispy Heaven Chicken..."
                    value={specialRequests}
                    onChange={e => setSpecialRequests(e.target.value)}
                    className="w-full py-2.5 px-3.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm font-medium text-stone-800 focus:bg-white focus:border-emerald-700"
                  />
                </div>

                {formError && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{formError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-4 bg-emerald-900 hover:bg-emerald-850 text-white font-bold text-sm sm:text-base rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-99"
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-300" />
                  <span>Confirm Table Reservation Now</span>
                </button>
              </div>

            </form>
          </div>

          {/* Right Column: Live Booking Summary Card & Direct Desk Assistance */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-stone-50 border border-stone-200 rounded-2xl p-6 space-y-5 sticky top-24">
              <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                <h3 className="font-serif text-lg font-bold text-stone-900">
                  Reservation Summary
                </h3>
                <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                  Guaranteed Table
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between text-stone-600">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-emerald-800" />
                    Date:
                  </span>
                  <span className="font-semibold text-stone-800">{date}</span>
                </div>

                <div className="flex items-center justify-between text-stone-600">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-emerald-800" />
                    Time Slot:
                  </span>
                  <span className="font-semibold text-stone-800 font-mono tabular-nums">{timeSlot}</span>
                </div>

                <div className="flex items-center justify-between text-stone-600">
                  <span className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-emerald-800" />
                    Guests:
                  </span>
                  <span className="font-semibold text-stone-800">{guestsCount} Persons</span>
                </div>

                <div className="flex items-center justify-between text-stone-600">
                  <span>Seating:</span>
                  <span className="font-semibold text-stone-800 text-right capitalize">
                    {seatingArea.replace('_', ' ')}
                  </span>
                </div>

                <div className="flex items-center justify-between text-stone-600">
                  <span>Occasion:</span>
                  <span className="font-semibold text-stone-800 text-right">
                    {occasion}
                  </span>
                </div>

                <div className="flex items-center justify-between text-stone-600">
                  <span>Spice Level:</span>
                  <span className="font-semibold text-stone-800 text-right">
                    {spicePreference}
                  </span>
                </div>

                {includePreOrder && cart.length > 0 && (
                  <div className="pt-2 border-t border-stone-200">
                    <div className="flex items-center justify-between text-stone-600 font-medium">
                      <span>Attached Table Dishes:</span>
                      <span className="font-bold text-emerald-900 font-mono tabular-nums">
                        {cart.length} items
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Booking reassurance */}
              <div className="p-3.5 rounded-xl bg-white border border-stone-200 space-y-2 text-xs text-stone-600">
                <span className="font-semibold text-stone-900 block">
                  Why book online with Hungry Bites?
                </span>
                <ul className="space-y-1 list-disc list-inside text-stone-600 text-[11px]">
                  <li>Table held for 20 mins past scheduled time</li>
                  <li>No booking charges or upfront deposit</li>
                  <li>Complementary birthday celebration arrangement</li>
                  <li>Direct WhatsApp update and calendar reminder</li>
                </ul>
              </div>

              {/* Direct Call Desk */}
              <div className="pt-2 text-center text-xs text-stone-500">
                <span>Prefer to call directly?</span>
                <a
                  href={`tel:${RESTAURANT_INFO.phone}`}
                  className="block mt-1 font-semibold text-emerald-900 hover:underline"
                >
                  Call Reception: {RESTAURANT_INFO.displayPhone}
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Confirmation Modal */}
      {confirmedReservation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs">
          <div className="relative w-full max-w-lg bg-white rounded-2xl overflow-hidden shadow-2xl border border-stone-200 p-6 sm:p-8 animate-in zoom-in-95 duration-200 space-y-5">
            
            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-stone-900">
                Table Reserved Successfully!
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 max-w-sm mx-auto">
                We are excited to host you at Hungry Bites, Tekkali. Your table has been reserved.
              </p>
            </div>

            {/* Reference Badge Card */}
            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-2 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-stone-200">
                <span className="text-stone-500 uppercase tracking-wider font-semibold">
                  Booking Reference
                </span>
                <span className="font-mono font-bold text-sm text-emerald-900 bg-emerald-100/70 px-2 py-0.5 rounded-md">
                  {confirmedReservation.id}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-stone-700 pt-1">
                <div>
                  <span className="text-stone-400 block text-[11px]">Guest Name</span>
                  <span className="font-semibold">{confirmedReservation.guestName}</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[11px]">Date & Time</span>
                  <span className="font-semibold font-mono tabular-nums">
                    {confirmedReservation.date} · {confirmedReservation.timeSlot}
                  </span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[11px]">Guests & Area</span>
                  <span className="font-semibold">
                    {confirmedReservation.guestsCount} Guests ({confirmedReservation.seatingArea.replace('_', ' ')})
                  </span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[11px]">Occasion</span>
                  <span className="font-semibold">{confirmedReservation.occasion}</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-2.5">
              <a
                href={generateWhatsAppBookingUrl(confirmedReservation)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm rounded-xl transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Send Confirmation to Restaurant WhatsApp</span>
              </a>

              <button
                onClick={() => downloadCalendarEvent(confirmedReservation)}
                className="w-full py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 font-medium text-xs sm:text-sm rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4 text-stone-600" />
                <span>Download Calendar Reminder (.ics)</span>
              </button>
            </div>

            <div className="pt-2 text-center">
              <button
                onClick={() => setConfirmedReservation(null)}
                className="text-xs text-stone-500 hover:text-stone-900 underline underline-offset-4 cursor-pointer"
              >
                Done / Back to Website
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
