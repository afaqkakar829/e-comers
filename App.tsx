
import React, { useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import CartDrawer from './components/CartDrawer';
import AIAssistant from './components/AIAssistant';
import { PRODUCTS, CATEGORIES } from './constants';
import { Product, CartItem, Category } from './types';
import { ShoppingBag, Star, Shield, Truck, RotateCcw } from 'lucide-react';

const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'All') return PRODUCTS;
    return PRODUCTS.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    // Optional: Open cart drawer or show notification
    // setIsCartOpen(true);
  };

  const updateCartQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeCartItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar cartCount={cartCount} onCartClick={() => setIsCartOpen(true)} />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gray-900 py-24 overflow-hidden">
          <div className="absolute inset-0 opacity-40">
            <img 
              src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=2000" 
              alt="Hero background" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent" />
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-2xl">
              <span className="inline-block px-4 py-1.5 bg-indigo-600/20 backdrop-blur-md border border-indigo-500/30 text-indigo-400 rounded-full text-sm font-bold uppercase tracking-widest mb-6">
                Summer 2024 Collection
              </span>
              <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
                Elevate Your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">
                  Digital Lifestyle
                </span>
              </h1>
              <p className="text-xl text-gray-300 mb-10 max-w-lg leading-relaxed">
                Discover the perfect blend of minimalist design and high-performance technology. Handpicked luxury items for the modern enthusiast.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-8 py-4 bg-white text-gray-900 rounded-xl font-bold text-lg hover:bg-indigo-600 hover:text-white transition-all transform hover:-translate-y-1">
                  Shop All Products
                </button>
                <button className="px-8 py-4 bg-gray-800/50 backdrop-blur-md border border-gray-700 text-white rounded-xl font-bold text-lg hover:bg-gray-800 transition-all">
                  View Collections
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Bar */}
        <section className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                  <Truck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Global Shipping</h4>
                  <p className="text-xs text-gray-500">Fast delivery worldwide</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-green-600">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Secure Payment</h4>
                  <p className="text-xs text-gray-500">100% encrypted checkout</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-orange-600">
                  <RotateCcw className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Easy Returns</h4>
                  <p className="text-xs text-gray-500">30-day money back guarantee</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600">
                  <Star className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">VIP Rewards</h4>
                  <p className="text-xs text-gray-500">Points on every purchase</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Product Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Featured Collection</h2>
              <p className="text-gray-500">Explore our latest arrivals and tech essentials.</p>
            </div>
            <div className="flex bg-gray-100 p-1 rounded-xl">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat as Category)}
                  className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                    activeCategory === cat 
                    ? 'bg-white text-indigo-600 shadow-sm' 
                    : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={addToCart}
                onQuickView={setQuickViewProduct}
              />
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-7xl mx-auto px-4 py-20">
          <div className="bg-indigo-600 rounded-[2.5rem] overflow-hidden relative p-12 md:p-20">
            <div className="absolute top-0 right-0 w-1/2 h-full hidden lg:block">
              <img 
                src="https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&q=80&w=1000" 
                className="w-full h-full object-cover opacity-60 mix-blend-overlay"
                alt="Workspace"
              />
            </div>
            <div className="max-w-lg relative z-10 text-white">
              <h2 className="text-4xl font-extrabold mb-6">Need expert advice?</h2>
              <p className="text-indigo-100 text-lg mb-8 leading-relaxed">
                Our AI shopping assistant Lumina can help you compare products, understand technical specs, and find the perfect gift based on your budget.
              </p>
              <button className="px-8 py-4 bg-white text-indigo-600 rounded-xl font-bold text-lg hover:shadow-xl hover:scale-105 transition-all">
                Chat with Lumina Now
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white border-t border-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
             <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">L</span>
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
                Lumina Luxe
              </span>
            </div>
            <p className="text-gray-500 mb-8 leading-relaxed">
              Leading the future of digital commerce with elegance and intelligence.
            </p>
            <div className="flex gap-4">
              {['FB', 'TW', 'IG', 'LI'].map(social => (
                <div key={social} className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 hover:bg-indigo-600 hover:text-white transition-colors cursor-pointer text-xs font-bold">
                  {social}
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-6 uppercase tracking-wider text-sm">Shop</h4>
            <ul className="space-y-4 text-gray-500">
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Electronics</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Smart Home</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Wearables</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Lifestyle</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-6 uppercase tracking-wider text-sm">Support</h4>
            <ul className="space-y-4 text-gray-500">
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Order Tracking</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Shipping Policy</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Terms of Service</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-6 uppercase tracking-wider text-sm">Newsletter</h4>
            <p className="text-gray-500 mb-4 text-sm">Get the latest deals and AI-curated tips.</p>
            <div className="flex gap-2">
              <input type="email" placeholder="email@luxe.com" className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              <button className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-20 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm gap-4">
          <p>© 2024 Lumina Luxe Inc. All rights reserved.</p>
          <div className="flex gap-8">
            <span>Powered by Gemini AI</span>
            <span>Crafted with Lumina</span>
          </div>
        </div>
      </footer>

      {/* Cart Drawer */}
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateCartQuantity}
        onRemoveItem={removeCartItem}
      />

      {/* Quick View Modal */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setQuickViewProduct(null)} />
          <div className="relative bg-white w-full max-w-4xl rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col md:flex-row animate-in zoom-in-95 duration-200">
            <button 
              onClick={() => setQuickViewProduct(null)}
              className="absolute top-6 right-6 z-10 p-2 bg-white/80 backdrop-blur-md rounded-full text-gray-500 hover:text-indigo-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="md:w-1/2 bg-gray-100 aspect-square">
              <img src={quickViewProduct.image} alt={quickViewProduct.name} className="w-full h-full object-cover" />
            </div>
            
            <div className="md:w-1/2 p-8 md:p-12 flex flex-col">
              <span className="text-indigo-600 font-bold uppercase tracking-widest text-xs mb-2">
                {quickViewProduct.category}
              </span>
              <h2 className="text-3xl font-extrabold text-gray-900 mb-4">{quickViewProduct.name}</h2>
              <div className="flex items-center gap-3 mb-6">
                <div className="flex text-yellow-400">
                   {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-5 h-5 ${i < Math.floor(quickViewProduct.rating) ? 'fill-current' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <span className="text-gray-500 font-medium">{quickViewProduct.rating} / 5.0 Rating</span>
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-8">${quickViewProduct.price.toFixed(2)}</p>
              <p className="text-gray-500 leading-relaxed mb-10 flex-1">
                {quickViewProduct.description}
              </p>
              
              <div className="space-y-4">
                <button 
                  onClick={() => { addToCart(quickViewProduct); setQuickViewProduct(null); }}
                  className="w-full py-4 bg-gray-900 text-white rounded-2xl font-bold text-lg shadow-lg hover:bg-indigo-600 transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-5 h-5" /> Add to Cart
                </button>
                <div className="flex items-center justify-center gap-6 text-xs text-gray-400 font-medium">
                  <span className="flex items-center gap-1"><Shield className="w-3 h-3" /> 2-Year Warranty</span>
                  <span className="flex items-center gap-1"><Truck className="w-3 h-3" /> Express Shipping</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI Assistant */}
      <AIAssistant />
    </div>
  );
};

// Internal icon proxy because X wasn't imported in this scope correctly
const X = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
);

export default App;
