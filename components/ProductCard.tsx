
import React from 'react';
import { Star, Plus, Eye } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onQuickView }) => {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
          <button 
            onClick={() => onQuickView(product)}
            className="p-3 bg-white rounded-full shadow-lg hover:bg-indigo-600 hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0"
          >
            <Eye className="w-5 h-5" />
          </button>
          <button 
            onClick={() => onAddToCart(product)}
            className="p-3 bg-white rounded-full shadow-lg hover:bg-indigo-600 hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 delay-75"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <div>
            <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-1">
              {product.category}
            </p>
            <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
              {product.name}
            </h3>
          </div>
          <p className="text-lg font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </p>
        </div>
        
        <div className="flex items-center gap-1 mt-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
              />
            ))}
          </div>
          <span className="text-sm text-gray-500 ml-1">({product.rating})</span>
        </div>

        <button 
          onClick={() => onAddToCart(product)}
          className="w-full mt-6 py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-indigo-600 transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
