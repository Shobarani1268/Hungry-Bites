/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { InteractiveMenu } from './components/InteractiveMenu';
import { PreOrderTrayModal } from './components/PreOrderTrayModal';
import { ReservationSection } from './components/ReservationSection';
import { PartyCelebrationSection } from './components/PartyCelebrationSection';
import { AboutAndReviews } from './components/AboutAndReviews';
import { LocationAndContact } from './components/LocationAndContact';
import { Footer } from './components/Footer';
import { ReservationLookupModal } from './components/ReservationLookupModal';
import { MenuItem, CartItem } from './types';
import { getSavedCart, saveCartToStorage } from './utils/helpers';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>(() => getSavedCart());
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLookupOpen, setIsLookupOpen] = useState(false);

  // Sync cart to local storage
  useEffect(() => {
    saveCartToStorage(cart);
  }, [cart]);

  const handleAddToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.item.id === item.id);
      if (existing) {
        return prev.map(i =>
          i.item.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { item, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (itemId: string) => {
    setCart(prev => {
      const existing = prev.find(i => i.item.id === itemId);
      if (existing && existing.quantity > 1) {
        return prev.map(i =>
          i.item.id === itemId ? { ...i, quantity: i.quantity - 1 } : i
        );
      }
      return prev.filter(i => i.item.id !== itemId);
    });
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 flex flex-col">
      {/* Navigation */}
      <Navbar
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenBooking={() => scrollToSection('reservations')}
        onOpenLookup={() => setIsLookupOpen(true)}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onBookClick={() => scrollToSection('reservations')}
          onExploreMenu={() => scrollToSection('menu')}
        />

        {/* Digital Interactive Menu */}
        <InteractiveMenu
          cart={cart}
          onAddToCart={handleAddToCart}
          onRemoveFromCart={handleRemoveFromCart}
          onOpenCart={() => setIsCartOpen(true)}
        />

        {/* Online Table Booking */}
        <ReservationSection
          cart={cart}
          onOpenLookup={() => setIsLookupOpen(true)}
        />

        {/* Birthday Parties & Celebrations */}
        <PartyCelebrationSection
          onPlanPartyClick={() => scrollToSection('reservations')}
        />

        {/* Story, Ambiance & Verified Reviews */}
        <AboutAndReviews />

        {/* Location, Map & Timings */}
        <LocationAndContact />
      </main>

      {/* Footer */}
      <Footer
        onOpenBooking={() => scrollToSection('reservations')}
        onOpenLookup={() => setIsLookupOpen(true)}
      />

      {/* Table Tray Pre-Order Drawer */}
      <PreOrderTrayModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onAddToCart={handleAddToCart}
        onRemoveFromCart={handleRemoveFromCart}
        onClearCart={handleClearCart}
        onProceedToBooking={() => scrollToSection('reservations')}
      />

      {/* Reservation Lookup & Manage Modal */}
      <ReservationLookupModal
        isOpen={isLookupOpen}
        onClose={() => setIsLookupOpen(false)}
      />
    </div>
  );
}
