
import React from 'react';
import { motion } from 'framer-motion';

interface NavbarProps {
  cartCount: number;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount }) => {
  // Workaround for framer-motion type mismatch in the environment
  const MotionNav = motion.nav as any;

  return (
    <MotionNav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-xl border-b border-zinc-100"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
        <div className="hidden md:flex items-center space-x-10">
          <a href="#" className="text-[11px] uppercase tracking-[0.2em] font-medium hover:text-zinc-400 transition-colors">Collection</a>
          <a href="#about" className="text-[11px] uppercase tracking-[0.2em] font-medium hover:text-zinc-400 transition-colors">Our Story</a>
        </div>
        
        <div className="absolute left-1/2 -translate-x-1/2">
          <a href="#" className="font-serif text-3xl tracking-tighter font-bold italic group">
            ARBAZ
            <span className="block h-px w-0 group-hover:w-full bg-zinc-900 transition-all duration-500"></span>
          </a>
        </div>

        <div className="flex items-center space-x-8">
          <button className="hidden sm:block text-[11px] uppercase tracking-[0.2em] font-medium hover:text-zinc-400 transition-colors">Search</button>
          <button className="relative group">
            <span className="text-[11px] uppercase tracking-[0.2em] font-medium group-hover:text-zinc-400 transition-colors">
              Cart
            </span>
            <span className="ml-2 inline-flex items-center justify-center bg-zinc-900 text-white text-[9px] w-5 h-5 rounded-full font-bold">
              {cartCount}
            </span>
          </button>
        </div>
      </div>
    </MotionNav>
  );
};

export default Navbar;
