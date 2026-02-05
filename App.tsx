
import React, { useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import CartDrawer from './components/CartDrawer';
import AIAssistant from './components/AIAssistant';
import { PRODUCTS, CATEGORIES } from './constants';
import { Product, CartItem, Category } from './types';
// Fixed: Added missing Sparkles and MessageSquare to imports
import { ShoppingBag, Star, Shield, Truck, RotateCcw, X, ArrowRight, Sparkles, MessageSquare } from 'lucide-react';

const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAIOpen, setIsAIOpen] = useState(false);
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
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar cartCount={cartCount} onCartClick={() => setIsCartOpen(true)} />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-[#0a0a0c] py-24 md:py-32 overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=2000" 
              alt="Hero background" 
              className="w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-black via-black/80 to-indigo-900/20" />
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-500/10 backdrop-blur-md border border-indigo-500/30 text-indigo-400 rounded-full text-xs font-bold uppercase tracking-widest mb-8">
                <Sparkles className="w-3 h-3" />
                Next-Gen Retail Experience
              </div>
              <h1 className="text-5xl md:text-8xl font-black text-white mb-8 leading-[1.1] tracking-tight">
                Luxury Met <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400">
                  Intelligence.
                </span>
              </h1>
              <p className="text-xl text-gray-400 mb-10 max-w-xl leading-relaxed">
                Experience a curated selection of elite gadgets and lifestyle essentials, guided by Lumina—your private AI concierge.
              </p>
              <div className="flex flex-col sm:flex-row gap-5">
                <button 
                  onClick={() => setIsAIOpen(true)}
                  className="px-10 py-5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-2xl font-bold text-lg shadow-[0_0_40px_-10px_rgba(79,70,229,0.5)] hover:shadow-[0_0_50px_-5px_rgba(79,70,229,0.6)] hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-5 h-5" />
                  Chat with Lumina
                </button>
                <a 
                  href="#collection"
                  className="px-10 py-5 bg-white/5 backdrop-blur-lg border border-white/10 text-white rounded-2xl font-bold text-lg hover:bg-white/10 transition-all text-center flex items-center justify-center gap-2"
                >
                  Explore Catalog <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
          
          {/* Decorative element */}
          <div className="absolute bottom-0 right-0 w-1/3 h-1/2 bg-indigo-600/10 blur-[120px] rounded-full" />
        </section>

        {/* Features Bar */}
        <section className="bg-white border-b py-10">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
              {[
                { icon: <Truck />, label: "Express Global", sub: "Priority shipping standard", color: "indigo" },
                { icon: <Shield />, label: "Encrypted", sub: "Military-grade checkout", color: "green" },
                { icon: <RotateCcw />, label: "Seamless", sub: "30-day effortless returns", color: "orange" },
                { icon: <Star />, label: "Rewards", sub: "Exclusive member benefits", color: "purple" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 group cursor-default">
                  <div className={`w-14 h-14 bg-${item.color}-50 rounded-2xl flex items-center justify-center text-${item.color}-600 group-hover:scale-110 transition-transform`}>
                    {React.cloneElement(item.icon as React.ReactElement, { className: "w-7 h-7" })}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{item.label}</h4>
                    <p className="text-xs text-gray-500">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Product Grid */}
        <section id="collection" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-xl">
              <h2 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">The Lumina Edit</h2>
              <p className="text-gray-500 text-lg leading-relaxed">Our master-curated selection of the world's most innovative hardware and lifestyle design pieces.</p>
            </div>
            <div className="flex bg-gray-100 p-1.5 rounded-2xl">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat as Category)}
                  className={`px-6 py-3 rounded-xl text-sm font-bold transition-all ${
                    activeCategory === cat 
                    ? 'bg-white text-indigo-600 shadow-md scale-105' 
                    : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
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
        <section className="max-w-7xl mx-auto px-4 py-24">
          <div className="bg-[#0f1115] rounded-[3rem] overflow-hidden relative p-12 md:p-24 shadow-2xl">
            <div className="absolute top-0 right-0 w-1/2 h-full hidden lg:block overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&q=80&w=1000" 
                className="w-full h-full object-cover opacity-40 scale-110 hover:scale-100 transition-transform duration-1000"
                alt="Workspace"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0f1115] via-[#0f1115]/40 to-transparent" />
            </div>
            <div className="max-w-xl relative z-10">
              <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight tracking-tight">Still deciding?</h2>
              <p className="text-gray-400 text-xl mb-12 leading-relaxed font-medium">
                "Lumina is surprisingly intuitive. I described my desk setup and it recommended the Zen Lamp perfectly." — <span className="text-indigo-400 italic">Satisfied Client</span>
              </p>
              <button 
                onClick={() => setIsAIOpen(true)}
                className="px-10 py-5 bg-white text-gray-900 rounded-2xl font-black text-lg hover:bg-indigo-600 hover:text-white transition-all shadow-xl flex items-center gap-3"
              >
                Start AI Consultation <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </section>
      </main>

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
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setQuickViewProduct(null)} />
          <div className="relative bg-white w-full max-w-5xl rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col md:flex-row animate-in zoom-in-95 duration-200">
            <button 
              onClick={() => setQuickViewProduct(null)}
              className="absolute top-8 right-8 z-10 p-3 bg-white/90 backdrop-blur-md rounded-full text-gray-900 shadow-lg hover:text-indigo-600 transition-all border border-gray-100"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="md:w-1/2 bg-gray-100 aspect-square md:aspect-auto">
              <img src={quickViewProduct.image} alt={quickViewProduct.name} className="w-full h-full object-cover" />
            </div>
            
            <div className="md:w-1/2 p-10 md:p-16 flex flex-col">
              <div className="inline-block px-3 py-1 bg-indigo-50 text-indigo-600 font-bold uppercase tracking-widest text-[10px] rounded-lg mb-4 w-fit">
                {quickViewProduct.category}
              </div>
              <h2 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">{quickViewProduct.name}</h2>
              <div className="flex items-center gap-3 mb-8">
                <div className="flex text-yellow-400">
                   {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-5 h-5 ${i < Math.floor(quickViewProduct.rating) ? 'fill-current' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <span className="text-gray-500 font-bold tracking-tight">{quickViewProduct.rating} Rating</span>
              </div>
              <p className="text-4xl font-black text-gray-900 mb-8 tracking-tight">${quickViewProduct.price.toFixed(2)}</p>
              <p className="text-gray-500 leading-relaxed text-lg mb-12 flex-1">
                {quickViewProduct.description}
              </p>
              
              <div className="space-y-6">
                <button 
                  onClick={() => { addToCart(quickViewProduct); setQuickViewProduct(null); }}
                  className="w-full py-5 bg-gray-900 text-white rounded-2xl font-bold text-xl shadow-xl hover:bg-indigo-600 transition-all flex items-center justify-center gap-3"
                >
                  <ShoppingBag className="w-6 h-6" /> Confirm Selection
                </button>
                <div className="flex items-center justify-center gap-8 text-[11px] text-gray-400 font-bold uppercase tracking-widest">
                  <span className="flex items-center gap-2"><Shield className="w-3 h-3 text-indigo-500" /> 24M Warranty</span>
                  <span className="flex items-center gap-2"><Truck className="w-3 h-3 text-indigo-500" /> Express Air</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI Assistant */}
      <AIAssistant 
        isOpen={isAIOpen} 
        onOpen={() => setIsAIOpen(true)} 
        onClose={() => setIsAIOpen(false)} 
      />
    </div>
  );
};

export default App;