import React, { useState, useEffect } from 'react';
import { X, Search, Calendar, Clock, Users, Download, MessageSquare, AlertCircle, CheckCircle2, Ban } from 'lucide-react';
import { Reservation } from '../types';
import { getSavedReservations, cancelReservationInStorage, downloadCalendarEvent, generateWhatsAppBookingUrl } from '../utils/helpers';

interface ReservationLookupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReservationLookupModal: React.FC<ReservationLookupModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<Reservation | null>(null);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      const saved = getSavedReservations();
      setReservations(saved);
      if (saved.length > 0) {
        setSelectedBooking(saved[0]);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filtered = reservations.filter(r => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    return (
      r.id.toLowerCase().includes(term) ||
      r.phone.includes(term) ||
      r.guestName.toLowerCase().includes(term)
    );
  });

  const handleCancelBooking = (bookingId: string) => {
    if (window.confirm('Are you sure you want to cancel this table reservation?')) {
      cancelReservationInStorage(bookingId);
      const updated = getSavedReservations();
      setReservations(updated);
      setSelectedBooking(updated.find(r => r.id === bookingId) || null);
      setActionNotice('Reservation has been cancelled.');
      setTimeout(() => setActionNotice(null), 4000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs">
      <div
        className="relative w-full max-w-2xl bg-white rounded-2xl overflow-hidden shadow-2xl border border-stone-200 flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 bg-stone-50 flex items-center justify-between">
          <div>
            <h3 className="font-serif text-xl font-bold text-stone-900">
              Find & Manage Your Table Reservation
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              Enter your booking ID (e.g. HB-TK-XXXX) or 10-digit mobile number
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-200/80 hover:bg-stone-300 text-stone-700 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-4 border-b border-stone-100 bg-white">
          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by Mobile Number or Booking Reference ID..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm text-stone-900 focus:outline-none focus:border-emerald-700 focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {actionNotice && (
            <div className="p-3 bg-amber-50 border border-amber-200 text-amber-800 text-xs rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{actionNotice}</span>
            </div>
          )}

          {reservations.length === 0 ? (
            <div className="text-center py-10 text-stone-500 space-y-2">
              <Calendar className="w-10 h-10 mx-auto text-stone-400 stroke-1" />
              <h4 className="font-serif text-lg font-bold text-stone-800">
                No local reservations found
              </h4>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                If you haven't reserved yet, you can book a table instantly with zero upfront charges.
              </p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-8 text-stone-500 text-xs">
              No reservation found matching "{searchTerm}". Please check your mobile number or ID.
            </div>
          ) : (
            <div className="space-y-4">
              {filtered.map(booking => {
                const isCancelled = booking.status === 'Cancelled';
                return (
                  <div
                    key={booking.id}
                    className={`p-4 sm:p-5 rounded-2xl border transition-all space-y-3 ${
                      isCancelled
                        ? 'bg-stone-100/70 border-stone-300 opacity-75'
                        : 'bg-white border-stone-200 shadow-2xs hover:border-emerald-700/40'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-xs sm:text-sm text-emerald-950 bg-emerald-100/80 px-2 py-0.5 rounded-md">
                          {booking.id}
                        </span>
                        <span
                          className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
                            isCancelled
                              ? 'bg-red-100 text-red-800'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}
                        >
                          {booking.status}
                        </span>
                      </div>
                      <span className="text-xs text-stone-500">
                        Booked: {new Date(booking.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-1">
                      <div>
                        <span className="text-stone-400 block text-[11px]">Guest Name</span>
                        <span className="font-semibold text-stone-800">{booking.guestName}</span>
                      </div>
                      <div>
                        <span className="text-stone-400 block text-[11px]">Contact</span>
                        <span className="font-semibold text-stone-800 font-mono">{booking.phone}</span>
                      </div>
                      <div>
                        <span className="text-stone-400 block text-[11px]">Date & Time</span>
                        <span className="font-semibold text-stone-800 font-mono">
                          {booking.date} · {booking.timeSlot}
                        </span>
                      </div>
                      <div>
                        <span className="text-stone-400 block text-[11px]">Party & Area</span>
                        <span className="font-semibold text-stone-800">
                          {booking.guestsCount} Guests ({booking.seatingArea.replace('_', ' ')})
                        </span>
                      </div>
                    </div>

                    {booking.specialRequests && (
                      <div className="p-2.5 bg-stone-50 rounded-xl text-xs text-stone-600">
                        <span className="font-semibold text-stone-700">Special Notes: </span>
                        <span>{booking.specialRequests}</span>
                      </div>
                    )}

                    {booking.preOrderedItems && booking.preOrderedItems.length > 0 && (
                      <div className="p-2.5 bg-emerald-50/70 rounded-xl text-xs text-emerald-950">
                        <span className="font-semibold">Attached Pre-order Dishes: </span>
                        <span>
                          {booking.preOrderedItems.map(i => `${i.quantity}x ${i.item.name}`).join(', ')}
                        </span>
                      </div>
                    )}

                    {/* Action buttons */}
                    <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-stone-100">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => downloadCalendarEvent(booking)}
                          className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Calendar (.ics)</span>
                        </button>
                        <a
                          href={generateWhatsAppBookingUrl(booking)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>WhatsApp Desk</span>
                        </a>
                      </div>

                      {!isCancelled && (
                        <button
                          onClick={() => handleCancelBooking(booking.id)}
                          className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ml-auto"
                        >
                          <Ban className="w-3.5 h-3.5" />
                          <span>Cancel Table</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-stone-200 bg-stone-50 flex items-center justify-between text-xs text-stone-500">
          <span>Need immediate assistance?</span>
          <a
            href="tel:+919491234567"
            className="font-semibold text-emerald-900 hover:underline"
          >
            Call Desk: +91 94912 34567
          </a>
        </div>
      </div>
    </div>
  );
};
