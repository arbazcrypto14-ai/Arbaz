
import React from 'react';
import { motion } from 'framer-motion';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (p: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  // Workaround for framer-motion type mismatch in the environment
  const MotionDiv = motion.div as any;
  const MotionImg = motion.img as any;

  return (
    <MotionDiv 
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="group cursor-pointer"
    >
      <div className="relative overflow-hidden aspect-[3/4] bg-zinc-50 mb-6 rounded-sm">
        <MotionImg 
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
        />
        <div className="absolute inset-x-0 bottom-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out flex justify-center">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            className="w-full py-4 bg-zinc-900 text-white text-[10px] uppercase tracking-[0.25em] font-bold hover:bg-zinc-800 transition-colors shadow-2xl"
          >
            Quick Add
          </button>
        </div>
      </div>
      <div className="space-y-2 px-1">
        <div className="flex justify-between items-baseline">
          <h3 className="text-[13px] font-medium text-zinc-900 uppercase tracking-wider">{product.name}</h3>
          <span className="text-sm font-light text-zinc-500">${product.price}</span>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-[10px] text-zinc-400 uppercase tracking-widest">{product.category}</p>
          <div className="flex space-x-1">
            <div className="w-2 h-2 rounded-full bg-zinc-900"></div>
            <div className="w-2 h-2 rounded-full bg-zinc-200"></div>
          </div>
        </div>
      </div>
    </MotionDiv>
  );
};

export default ProductCard;
