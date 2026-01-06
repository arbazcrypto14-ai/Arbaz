
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import AIStylist from './components/AIStylist';
import GuideSection from './components/GuideSection';
import { Product } from './types';

const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Silk Linen Blouse',
    price: 245,
    category: 'Women',
    image: 'https://images.unsplash.com/photo-1539109132381-3151b8a77dd3?auto=format&fit=crop&w=800&q=80',
    description: 'Minimalist design, premium silk.'
  },
  {
    id: '2',
    name: 'Raw Denim Overshirt',
    price: 180,
    category: 'Men',
    image: 'https://images.unsplash.com/photo-1516251193007-45ef944ab0c6?auto=format&fit=crop&w=800&q=80',
    description: 'Japanese denim, boxy fit.'
  },
  {
    id: '3',
    name: 'Wool Tapered Trousers',
    price: 320,
    category: 'Men',
    image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=800&q=80',
    description: 'Italian wool, perfect drape.'
  },
  {
    id: '4',
    name: 'Cashmere Ribbed Knit',
    price: 390,
    category: 'Women',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80',
    description: 'Ethically sourced cashmere.'
  },
  {
    id: '5',
    name: 'Leather Minimal Tote',
    price: 550,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1584917033904-493bbd4baf20?auto=format&fit=crop&w=800&q=80',
    description: 'Vegetable tanned leather.'
  },
  {
    id: '6',
    name: 'Architectural Overcoat',
    price: 890,
    category: 'Women',
    image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=800&q=80',
    description: 'Structured silhouette.'
  },
];

const App: React.FC = () => {
  const [cart, setCart] = useState<Product[]>([]);
  const [filter, setFilter] = useState<'All' | 'Men' | 'Women' | 'Accessories'>('All');
  const [showToast, setShowToast] = useState(false);

  const MotionDiv = motion.div as any;
  const MotionP = motion.p as any;
  const MotionH2 = motion.h2 as any;
  const MotionSpan = motion.span as any;

  const addToCart = (product: Product) => {
    setCart(prev => [...prev, product]);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const filteredProducts = filter === 'All' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === filter);

  return (
    <div className="min-h-screen bg-white selection:bg-zinc-900 selection:text-white overflow-x-hidden">
      <Navbar cartCount={cart.length} />
      
      {/* Hero Section */}
      <section className="relative h-[100vh] flex items-center justify-center overflow-hidden">
        <MotionDiv 
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 z-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=2000&q=80" 
            alt="Arbaz Fashion Hero" 
            className="w-full h-full object-cover grayscale brightness-[0.6]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-white/10"></div>
        </MotionDiv>
        
        <div className="relative z-10 text-center space-y-10 max-w-4xl px-6">
          <MotionDiv
            initial={{ opacity: 0, letterSpacing: "1em" }}
            animate={{ opacity: 1, letterSpacing: "-0.05em" }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <h1 className="font-serif text-8xl md:text-[14rem] font-bold tracking-tighter italic text-white drop-shadow-2xl">
              Arbaz
            </h1>
          </MotionDiv>
          
          <MotionP 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
            className="text-[10px] md:text-xs uppercase tracking-[0.6em] font-medium text-white/80"
          >
            Luxury Reimagined • Minimalist Collective
          </MotionP>
          
          <MotionDiv 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 1 }}
            className="pt-12 flex flex-col md:flex-row items-center justify-center gap-6"
          >
            <button className="bg-white text-zinc-900 px-14 py-6 text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-zinc-900 hover:text-white transition-all duration-700 w-full md:w-auto shadow-2xl">
              Explore Collection
            </button>
            <a href="#guide" className="backdrop-blur-md border border-white/20 text-white px-14 py-6 text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-white hover:text-zinc-900 transition-all duration-700 w-full md:w-auto">
              How to Publish
            </a>
          </MotionDiv>
        </div>

        <MotionDiv 
          animate={{ y: [0, 15, 0] }}
          transition={{ repeat: Infinity, duration: 2.5 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/30"
        >
          <svg className="w-8 h-8 font-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </MotionDiv>
      </section>

      {/* Collections Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-40">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 space-y-10 md:space-y-0">
          <MotionDiv
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h2 className="font-serif text-6xl md:text-7xl italic mb-6">The Atelier</h2>
            <p className="text-zinc-400 text-[10px] uppercase tracking-[0.4em] font-bold">Volume 01 / Objects of Silent Luxury</p>
          </MotionDiv>
          
          <div className="flex space-x-12 border-b border-zinc-50 pb-4 overflow-x-auto no-scrollbar w-full md:w-auto">
            {(['All', 'Men', 'Women', 'Accessories'] as const).map((cat) => (
              <button 
                key={cat}
                onClick={() => setFilter(cat)}
                className={`text-[10px] uppercase tracking-[0.3em] font-bold transition-all relative whitespace-nowrap ${
                  filter === cat ? 'text-zinc-900' : 'text-zinc-300 hover:text-zinc-500'
                }`}
              >
                {cat}
                {filter === cat && (
                  <MotionSpan 
                    layoutId="activeFilter"
                    className="absolute -bottom-[17px] left-0 right-0 h-[3px] bg-zinc-900" 
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        <MotionDiv 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-32"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
            ))}
          </AnimatePresence>
        </MotionDiv>
      </section>

      {/* Manifesto Section */}
      <section id="about" className="bg-zinc-50 py-48 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
          <MotionDiv 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="relative aspect-[4/5] group overflow-hidden"
          >
            <img 
              src="https://images.unsplash.com/photo-1549062572-544a64fb0c56?auto=format&fit=crop&w=1000&q=80" 
              alt="Arbaz Craftsmanship" 
              className="w-full h-full object-cover grayscale rounded-sm shadow-2xl transition-all duration-1500 group-hover:scale-105" 
            />
            <div className="absolute top-10 left-10 bg-white/10 backdrop-blur-md p-8 border border-white/20">
              <span className="text-white text-[10px] uppercase tracking-[0.4em] font-bold">Pure Identity</span>
            </div>
          </MotionDiv>
          
          <div className="space-y-16">
            <MotionH2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-serif text-6xl md:text-8xl italic leading-[0.9] tracking-tighter"
            >
              Quiet style for those who listen.
            </MotionH2>
            <MotionP 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-zinc-500 text-xl leading-relaxed font-light max-w-lg"
            >
              Arbaz is a philosophy. We don't chase trends; we create legacy. 
              Our pieces are designed to be heirlooms, crafted with architectural 
              precision and the world's finest organic fibers.
            </MotionP>
            
            <div className="flex gap-16 pt-12 border-t border-zinc-200">
              <div>
                <h4 className="text-[10px] uppercase tracking-[0.4em] font-black mb-4 text-zinc-900">Maison</h4>
                <p className="text-sm text-zinc-400">Milan • Lahore</p>
              </div>
              <div>
                <h4 className="text-[10px] uppercase tracking-[0.4em] font-black mb-4 text-zinc-900">Founding</h4>
                <p className="text-sm text-zinc-400">Arbaz Collective</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Guide Section for the Beginner */}
      <GuideSection />

      {/* Simple Toast */}
      <AnimatePresence>
        {showToast && (
          <MotionDiv 
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[110] bg-zinc-900 text-white px-10 py-5 rounded-full text-[10px] uppercase tracking-[0.4em] font-bold shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex items-center"
          >
            <span className="w-2 h-2 bg-zinc-400 rounded-full mr-4 animate-ping"></span>
            Added to Collection
          </MotionDiv>
        )}
      </AnimatePresence>

      <footer className="bg-white py-40">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col items-center mb-32 space-y-12">
             <h4 className="font-serif text-9xl italic font-bold opacity-5 select-none pointer-events-none">ARBAZ</h4>
             <p className="text-zinc-400 text-[10px] uppercase tracking-[0.5em] text-center max-w-sm">
                Quiet luxury for the intentional lifestyle. Join the inner circle for Season 02 updates.
             </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-20 pt-20 border-t border-zinc-50">
            <div className="space-y-6">
              <h5 className="text-[10px] uppercase tracking-[0.4em] font-black">Identity</h5>
              <ul className="text-sm text-zinc-400 space-y-3 font-light">
                <li><a href="#" className="hover:text-zinc-900 transition-colors">Our Atelier</a></li>
                <li><a href="#" className="hover:text-zinc-900 transition-colors">The Manifesto</a></li>
                <li><a href="#" className="hover:text-zinc-900 transition-colors">Ethical Standards</a></li>
              </ul>
            </div>
            
            <div className="space-y-6">
              <h5 className="text-[10px] uppercase tracking-[0.4em] font-black">Concierge</h5>
              <ul className="text-sm text-zinc-400 space-y-3 font-light">
                <li><a href="#" className="hover:text-zinc-900 transition-colors">Global Delivery</a></li>
                <li><a href="#" className="hover:text-zinc-900 transition-colors">Private Styling</a></li>
                <li><a href="#" className="hover:text-zinc-900 transition-colors">Gifting Suite</a></li>
              </ul>
            </div>

            <div className="space-y-8">
              <h5 className="text-[10px] uppercase tracking-[0.4em] font-black">The Gazette</h5>
              <div className="flex border-b border-zinc-100 pb-2 group focus-within:border-zinc-900 transition-colors">
                <input 
                  type="email" 
                  placeholder="Email" 
                  className="flex-1 bg-transparent border-none py-2 text-sm focus:ring-0 outline-none font-light"
                />
                <button className="text-[10px] uppercase tracking-[0.4em] font-bold">Invite</button>
              </div>
            </div>
          </div>
          
          <div className="mt-40 pt-10 border-t border-zinc-50 flex flex-col md:flex-row justify-between items-center text-[9px] uppercase tracking-[0.5em] text-zinc-300 space-y-8 md:space-y-0">
            <p>© 2024 Arbaz Collective. All craftsmanship originates in Milan.</p>
            <div className="flex space-x-12">
              <a href="#" className="hover:text-zinc-900 transition-colors">Instagram</a>
              <a href="#" className="hover:text-zinc-900 transition-colors">X (Twitter)</a>
              <a href="#" className="hover:text-zinc-900 transition-colors">LVMH Index</a>
            </div>
          </div>
        </div>
      </footer>

      <AIStylist />
    </div>
  );
};

export default App;
