import React, { useState, useEffect } from 'react';
import { Product } from './data/matchaData';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProductCatalog } from './components/ProductCatalog';
import { DrinkMenu } from './components/DrinkMenu';
import { DrinkBuilderLab } from './components/DrinkBuilderLab';
import { BusinessModelSection } from './components/BusinessModelSection';
import { HeritageSection } from './components/HeritageSection';
import { Footer } from './components/Footer';
import { CartDrawer, CartItem } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { SommelierQuizModal } from './components/SommelierQuizModal';
import { SampleKitModal } from './components/SampleKitModal';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('midori_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isSampleModalOpen, setIsSampleModalOpen] = useState(false);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('midori_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Error saving cart:', e);
    }
  }, [cartItems]);

  const handleAddToCart = (product: Product, quantity = 1) => {
    setCartItems(prev => {
      const existingIndex = prev.findIndex(item => item.product.id === product.id);
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity
        };
        return next;
      }
      return [...prev, { product, quantity }];
    });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems(prev =>
      prev.map(item => item.product.id === productId ? { ...item, quantity } : item)
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const handleProceedCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderSuccess = () => {
    setCartItems([]);
  };

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#19201C]">
      {/* 1. Header Navigation adhering to 3-zone contract */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenQuiz={() => setIsQuizOpen(true)}
        onOpenSampleModal={() => setIsSampleModalOpen(true)}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection
          onExploreProducts={() => handleNavigate('products')}
          onOpenCalculator={() => handleNavigate('business')}
          onOpenQuiz={() => setIsQuizOpen(true)}
        />

        {/* Product Catalog (B2C & B2B Tins/Gear/Wholesale 1kg) */}
        <ProductCatalog
          onAddToCart={handleAddToCart}
        />

        {/* Drink Menu (Cafe Beverages & Cost/Margin Insights) */}
        <DrinkMenu
          onAddCustomDrinkToCart={handleAddToCart}
          onOpenCustomizer={() => handleNavigate('customizer')}
        />

        {/* Drink Builder Lab (Interactive Visual Customizer) */}
        <DrinkBuilderLab
          onAddToCart={(customProduct) => {
            handleAddToCart(customProduct, 1);
            setIsCartOpen(true);
          }}
        />

        {/* Matcha Business Model & Real Cash Flow ROI Calculator */}
        <BusinessModelSection
          onOpenSampleModal={() => setIsSampleModalOpen(true)}
        />

        {/* Heritage & Kyoto Craftsmanship */}
        <HeritageSection />
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenSampleModal={() => setIsSampleModalOpen(true)}
      />

      {/* Interactive Modals */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedCheckout={handleProceedCheckout}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        onOrderSuccess={handleOrderSuccess}
      />

      <SommelierQuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onAddToCart={(p) => {
          handleAddToCart(p, 1);
          setIsCartOpen(true);
        }}
      />

      <SampleKitModal
        isOpen={isSampleModalOpen}
        onClose={() => setIsSampleModalOpen(false)}
      />
    </div>
  );
}
