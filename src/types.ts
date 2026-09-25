export type DietaryType = 'veg' | 'non-veg';
export type SpiceLevel = 'Mild' | 'Medium' | 'Fiery';

export interface MenuItem {
  id: string;
  name: string;
  category: 'specials' | 'starters' | 'biryani' | 'curries' | 'chinese' | 'veg' | 'desserts_beverages';
  categoryLabel: string;
  price: number;
  description: string;
  dietary: DietaryType;
  spice: SpiceLevel;
  isChefSpecial?: boolean;
  image?: string;
  prepTimeMinutes?: number;
  portion: string;
  ingredients: string[];
  pairWith?: string;
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
  notes?: string;
}

export type SeatingArea = 'emerald_booth' | 'group_hangout' | 'birthday_celebration' | 'quiet_corner';

export interface Reservation {
  id: string;
  guestName: string;
  phone: string;
  email?: string;
  date: string;
  timeSlot: string;
  guestsCount: number;
  seatingArea: SeatingArea;
  occasion?: 'Regular Dining' | 'Birthday Celebration' | 'Family Reunion' | 'Anniversary' | 'Friends Hangout';
  spicePreference?: 'Mild (Kid-friendly)' | 'Balanced Medium' | 'Authentic Spicy';
  specialRequests?: string;
  preOrderedItems?: CartItem[];
  status: 'Confirmed' | 'Seated' | 'Cancelled';
  createdAt: string;
}
