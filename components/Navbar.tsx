
import React from 'react';
import { ShoppingBag, Search, Menu, User } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount, onCartClick }) => {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button className="p-2 -ml-2 lg:hidden">
              <Menu className="h-6 w-6 text-gray-500" />
            </button>
            <div className="flex-shrink-0 flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">L</span>
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
                Lumina Luxe
              </span>
            </div>
          </div>

          <div className="hidden lg:flex items-center space-x-8">
            <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors font-medium">New Arrivals</a>
            <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors font-medium">Collections</a>
            <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors font-medium">Gift Guide</a>
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-400 hover:text-indigo-600 transition-colors">
              <Search className="h-5 w-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-indigo-600 transition-colors">
              <User className="h-5 w-5" />
            </button>
            <button 
              onClick={onCartClick}
              className="p-2 text-gray-400 hover:text-indigo-600 transition-colors relative"
            >
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-indigo-600 rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
