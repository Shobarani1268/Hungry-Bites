import { CartItem, Reservation } from '../types';
import { RESTAURANT_INFO } from '../data/restaurantData';

export function formatPrice(price: number): string {
  return `₹${price.toLocaleString('en-IN')}`;
}

export function isRestaurantOpen(): { isOpen: boolean; statusText: string; subText: string } {
  // Restaurant open daily 11:30 AM to 10:30 PM
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const openMinutes = RESTAURANT_INFO.openHour * 60 + RESTAURANT_INFO.openMinute; // 11:30 = 690
  const closeMinutes = RESTAURANT_INFO.closeHour * 60 + RESTAURANT_INFO.closeMinute; // 22:30 = 1350

  if (currentMinutes >= openMinutes && currentMinutes <= closeMinutes) {
    if (closeMinutes - currentMinutes <= 45) {
      return {
        isOpen: true,
        statusText: 'Open Now · Closing Soon',
        subText: 'Kitchen closes at 10:30 PM',
      };
    }
    return {
      isOpen: true,
      statusText: 'Open Now',
      subText: 'Closes at 10:30 PM today',
    };
  }

  return {
    isOpen: false,
    statusText: 'Closed Now',
    subText: 'Opens daily at 11:30 AM',
  };
}

export function generateBookingId(): string {
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `HB-TK-${randomNum}`;
}

export function generateWhatsAppBookingUrl(reservation: Reservation): string {
  const itemsText = reservation.preOrderedItems && reservation.preOrderedItems.length > 0
    ? `\n🍽️ *Pre-ordered Items:* \n` +
      reservation.preOrderedItems.map(i => `• ${i.quantity}x ${i.item.name} (${formatPrice(i.item.price * i.quantity)})`).join('\n')
    : '';

  const text = `*New Table Reservation - Hungry Bites Tekkali*
━━━━━━━━━━━━━━━━━━━
🔖 *Booking ID:* ${reservation.id}
👤 *Name:* ${reservation.guestName}
📞 *Phone:* ${reservation.phone}
👥 *Guests:* ${reservation.guestsCount} Persons
📅 *Date:* ${reservation.date}
⏰ *Time:* ${reservation.timeSlot}
🪑 *Seating Preference:* ${reservation.seatingArea.replace('_', ' ').toUpperCase()}
🎉 *Occasion:* ${reservation.occasion || 'Regular Dining'}
🌶️ *Spice Preference:* ${reservation.spicePreference || 'Balanced Medium'}
${reservation.specialRequests ? `📝 *Special Notes:* ${reservation.specialRequests}\n` : ''}${itemsText}
━━━━━━━━━━━━━━━━━━━
_Booked via Hungry Bites Online Portal_`;

  return `https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

export function downloadCalendarEvent(reservation: Reservation) {
  const [year, month, day] = reservation.date.split('-');
  const eventDateStr = `${year}${month}${day}`;

  // Time conversion
  let hour = 12;
  let minute = 30;
  if (reservation.timeSlot.includes('11:30 AM')) { hour = 11; minute = 30; }
  else if (reservation.timeSlot.includes('12:30 PM')) { hour = 12; minute = 30; }
  else if (reservation.timeSlot.includes('01:30 PM')) { hour = 13; minute = 30; }
  else if (reservation.timeSlot.includes('02:30 PM')) { hour = 14; minute = 30; }
  else if (reservation.timeSlot.includes('06:30 PM')) { hour = 18; minute = 30; }
  else if (reservation.timeSlot.includes('07:30 PM')) { hour = 19; minute = 30; }
  else if (reservation.timeSlot.includes('08:30 PM')) { hour = 20; minute = 30; }
  else if (reservation.timeSlot.includes('09:30 PM')) { hour = 21; minute = 30; }
  else if (reservation.timeSlot.includes('10:00 PM')) { hour = 22; minute = 0; }

  const startHourStr = String(hour).padStart(2, '0');
  const startMinStr = String(minute).padStart(2, '0');
  const endHourStr = String((hour + 2) % 24).padStart(2, '0');

  const dtStart = `${eventDateStr}T${startHourStr}${startMinStr}00`;
  const dtEnd = `${eventDateStr}T${endHourStr}${startMinStr}00`;

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Hungry Bites Multi Cuisine//Tekkali//EN',
    'BEGIN:VEVENT',
    `UID:${reservation.id}@hungrybites.tekkali`,
    `DTSTAMP:${eventDateStr}T000000Z`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SUMMARY:Table Reservation at Hungry Bites Multi Cuisine (${reservation.guestsCount} Guests)`,
    `DESCRIPTION:Reservation Reference: ${reservation.id}\\nGuests: ${reservation.guestsCount}\\nOccasion: ${reservation.occasion || 'Dining'}\\nPhone: ${RESTAURANT_INFO.phone}`,
    `LOCATION:${RESTAURANT_INFO.address}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `hungry-bites-reservation-${reservation.id}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// Local storage storage keys
const RESERVATIONS_KEY = 'hb_tekkali_reservations';
const CART_KEY = 'hb_tekkali_preorder_cart';

export function getSavedReservations(): Reservation[] {
  try {
    const raw = localStorage.getItem(RESERVATIONS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveReservation(reservation: Reservation): void {
  try {
    const existing = getSavedReservations();
    const updated = [reservation, ...existing.filter(r => r.id !== reservation.id)];
    localStorage.setItem(RESERVATIONS_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed saving reservation', e);
  }
}

export function cancelReservationInStorage(id: string): void {
  try {
    const existing = getSavedReservations();
    const updated = existing.map(r => r.id === id ? { ...r, status: 'Cancelled' as const } : r);
    localStorage.setItem(RESERVATIONS_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed cancelling reservation', e);
  }
}

export function getSavedCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveCartToStorage(cart: CartItem[]): void {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  } catch (e) {
    console.error('Failed saving cart', e);
  }
}
