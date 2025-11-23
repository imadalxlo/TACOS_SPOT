import React, { useState, useEffect } from 'react';
import { ShoppingBag, MapPin, Phone, Clock, Menu as MenuIcon, X, Globe, Star, Truck } from 'lucide-react';
import { TRANSLATIONS, PRODUCTS, SAUCES, MEATS, LOGO_URL } from './constants';
import { Language, CartItem, Product, Order } from './types';
import { Button } from './components/Button';
import { SauceSommelier } from './components/SauceSommelier';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('en');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  
  // Customization Modal State
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [customMeats, setCustomMeats] = useState<string[]>([]);
  const [customSauces, setCustomSauces] = useState<string[]>([]);
  
  // Checkout State
  const [isCheckout, setIsCheckout] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [customerDetails, setCustomerDetails] = useState({ name: '', address: '', phone: '' });

  const t = TRANSLATIONS[lang];

  const addToCart = (product: Product, meats: string[] = [], sauces: string[] = []) => {
    const newItem: CartItem = {
      ...product,
      cartId: Math.random().toString(36).substr(2, 9),
      selectedMeats: meats,
      selectedSauces: sauces,
      quantity: 1
    };
    setCart([...cart, newItem]);
    setIsCartOpen(true);
    setSelectedProduct(null);
    setCustomMeats([]);
    setCustomSauces([]);
  };

  const removeFromCart = (cartId: string) => {
    setCart(cart.filter(item => item.cartId !== cartId));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setOrderSuccess(true);
      setCart([]);
      setIsCheckout(false);
    }, 1500);
  };

  const openCustomization = (product: Product) => {
    if (product.customizable) {
      setSelectedProduct(product);
      setCustomMeats([]);
      setCustomSauces([]);
    } else {
      addToCart(product);
    }
  };

  const toggleSelection = (list: string[], item: string, setList: (l: string[]) => void, max: number) => {
    if (list.includes(item)) {
      setList(list.filter(i => i !== item));
    } else {
      if (list.length < max) {
        setList([...list, item]);
      }
    }
  };

  const getMaxMeats = (id: string) => {
    if (id === 'tacos-m') return 1;
    if (id === 'tacos-l') return 2;
    if (id === 'tacos-xl') return 3;
    return 1;
  };

  return (
    <div className="min-h-screen bg-brand-dark text-white font-body selection:bg-brand-orange selection:text-white">
      
      {/* Navbar */}
      <nav className="fixed w-full z-50 bg-brand-dark/95 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-3">
              <img src={LOGO_URL} alt="Tacos Spot Logo" className="h-16 w-auto object-contain" />
              <div className="hidden md:block">
                 <h1 className="text-2xl font-display text-brand-yellow leading-none">TACOS SPOT</h1>
                 <span className="text-xs text-gray-400 tracking-widest">BIALYSTOK</span>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="hover:text-brand-yellow transition-colors">{t.nav.home}</a>
              <a href="#menu" className="hover:text-brand-yellow transition-colors">{t.nav.menu}</a>
              <a href="#contact" className="hover:text-brand-yellow transition-colors">{t.nav.contact}</a>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative group">
                <button className="flex items-center gap-1 text-sm text-gray-300 hover:text-white">
                  <Globe size={16} />
                  <span className="uppercase">{lang}</span>
                </button>
                <div className="absolute right-0 mt-2 w-24 bg-brand-gray rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <button onClick={() => setLang('en')} className="block w-full text-left px-4 py-2 hover:bg-white/10 text-sm">English</button>
                  <button onClick={() => setLang('fr')} className="block w-full text-left px-4 py-2 hover:bg-white/10 text-sm">Français</button>
                  <button onClick={() => setLang('pl')} className="block w-full text-left px-4 py-2 hover:bg-white/10 text-sm">Polski</button>
                </div>
              </div>

              <button onClick={() => setIsCartOpen(true)} className="relative p-2 hover:bg-white/10 rounded-full transition-colors">
                <ShoppingBag className="text-brand-yellow" />
                {cart.length > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                    {cart.length}
                  </span>
                )}
              </button>
              
              <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X /> : <MenuIcon />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-brand-dark pt-24 px-6 md:hidden">
          <div className="flex flex-col space-y-6 text-xl font-display">
            <a href="#home" onClick={() => setIsMenuOpen(false)}>{t.nav.home}</a>
            <a href="#menu" onClick={() => setIsMenuOpen(false)}>{t.nav.menu}</a>
            <a href="#contact" onClick={() => setIsMenuOpen(false)}>{t.nav.contact}</a>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-orange/20 to-transparent -z-10"></div>
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block px-4 py-1 bg-brand-yellow/20 text-brand-yellow rounded-full text-sm font-bold mb-6 border border-brand-yellow/50">
               DELIVERY AVAILABLE 
            </div>
            <h1 className="text-5xl md:text-7xl font-display leading-tight mb-6">
              {t.hero.title}
              <span className="block text-brand-yellow">IN BIALYSTOK</span>
            </h1>
            <p className="text-gray-400 text-lg mb-8 max-w-md">
              {t.hero.subtitle}
            </p>
            <div className="flex gap-4">
              <Button onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}>
                {t.hero.cta}
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-brand-yellow/20 blur-3xl rounded-full"></div>
            <img 
              src="https://images.unsplash.com/photo-1629814249584-bd4d53cf0e7d?auto=format&fit=crop&q=80&w=800" 
              alt="Delicious French Tacos" 
              className="relative z-10 w-full rounded-3xl shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500 border-4 border-white/5"
            />
          </div>
        </div>
      </section>

      {/* AI Sauce Sommelier */}
      <section className="bg-brand-gray/30 py-12 border-y border-white/5">
        <div className="max-w-3xl mx-auto px-4">
           <SauceSommelier t={t.ai} lang={lang} />
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-display text-center mb-16 text-brand-orange">{t.menu.title}</h2>
          
          {/* Tacos Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PRODUCTS.map((product) => (
              <div key={product.id} className="bg-brand-gray rounded-2xl overflow-hidden hover:translate-y-[-5px] transition-transform duration-300 border border-white/5 group">
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-gray to-transparent z-10"></div>
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute bottom-4 right-4 z-20 bg-brand-yellow text-black font-bold px-3 py-1 rounded-lg">
                    {product.price} PLN
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold">{product.name}</h3>
                    {product.customizable && <Star size={16} className="text-brand-yellow" />}
                  </div>
                  <p className="text-gray-400 text-sm mb-6 h-10">{product.description}</p>
                  <Button 
                    fullWidth 
                    variant="secondary" 
                    onClick={() => openCustomization(product)}
                  >
                    {product.customizable ? t.menu.custom : t.menu.addToCart}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customization Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-brand-dark border border-white/10 w-full max-w-lg rounded-3xl p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-display text-brand-yellow">{selectedProduct.name}</h3>
              <button onClick={() => setSelectedProduct(null)} className="p-2 hover:bg-white/10 rounded-full">
                <X />
              </button>
            </div>

            <div className="space-y-6">
              {/* Meats */}
              <div>
                <h4 className="font-bold mb-3 flex justify-between">
                  {t.menu.meats}
                  <span className="text-brand-orange text-sm">{customMeats.length} / {getMaxMeats(selectedProduct.id)}</span>
                </h4>
                <div className="grid grid-cols-1 gap-2">
                  {MEATS.map(meat => (
                    <button
                      key={meat}
                      onClick={() => toggleSelection(customMeats, meat, setCustomMeats, getMaxMeats(selectedProduct.id))}
                      className={`p-3 rounded-lg text-left text-sm transition-colors border ${customMeats.includes(meat) ? 'bg-brand-orange/20 border-brand-orange text-brand-orange' : 'bg-brand-gray border-transparent hover:bg-gray-700'}`}
                    >
                      {meat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sauces */}
              <div>
                <h4 className="font-bold mb-3 flex justify-between">
                  {t.menu.sauces}
                  <span className="text-brand-orange text-sm">{customSauces.length} / 2</span>
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {SAUCES.map(sauce => (
                    <button
                      key={sauce}
                      onClick={() => toggleSelection(customSauces, sauce, setCustomSauces, 2)}
                      className={`p-2 rounded-lg text-sm text-center transition-colors border ${customSauces.includes(sauce) ? 'bg-brand-yellow/20 border-brand-yellow text-brand-yellow' : 'bg-brand-gray border-transparent hover:bg-gray-700'}`}
                    >
                      {sauce}
                    </button>
                  ))}
                </div>
              </div>
              
              <Button 
                fullWidth 
                onClick={() => addToCart(selectedProduct, customMeats, customSauces)}
                disabled={customMeats.length === 0}
              >
                {t.menu.addToCart} - {(selectedProduct.price).toFixed(2)} PLN
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Cart Sidebar */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsCartOpen(false)}></div>
          <div className="relative w-full max-w-md bg-brand-dark border-l border-white/10 h-full flex flex-col shadow-2xl">
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-brand-gray/50">
              <h2 className="text-xl font-display">{t.cart.title}</h2>
              <button onClick={() => setIsCartOpen(false)}><X /></button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center text-gray-500 mt-20">
                  <ShoppingBag size={48} className="mx-auto mb-4 opacity-30" />
                  <p>{t.cart.empty}</p>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.cartId} className="bg-brand-gray p-4 rounded-xl flex gap-4 animate-fade-in">
                     <div className="w-16 h-16 rounded-lg bg-black/30 overflow-hidden flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                     </div>
                     <div className="flex-1">
                        <div className="flex justify-between items-start">
                           <h4 className="font-bold">{item.name}</h4>
                           <span className="text-brand-yellow font-bold">{item.price} PLN</span>
                        </div>
                        {item.selectedMeats && item.selectedMeats.length > 0 && (
                          <p className="text-xs text-gray-400 mt-1 line-clamp-2">{item.selectedMeats.join(', ')}</p>
                        )}
                        {item.selectedSauces && item.selectedSauces.length > 0 && (
                          <p className="text-xs text-brand-orange mt-1">Sauce: {item.selectedSauces.join(' + ')}</p>
                        )}
                        <button 
                          onClick={() => removeFromCart(item.cartId)} 
                          className="text-xs text-red-400 mt-2 hover:text-red-300 underline"
                        >
                          Remove
                        </button>
                     </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 bg-brand-gray/50 border-t border-white/10">
                <div className="flex justify-between text-xl font-bold mb-6">
                  <span>{t.cart.total}</span>
                  <span className="text-brand-yellow">{cartTotal.toFixed(2)} PLN</span>
                </div>
                {isCheckout ? (
                  <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                    <input required placeholder={t.cart.name} className="w-full bg-black/50 border border-gray-600 rounded p-3 text-sm" onChange={e => setCustomerDetails({...customerDetails, name: e.target.value})} />
                    <input required placeholder={t.cart.address} className="w-full bg-black/50 border border-gray-600 rounded p-3 text-sm" onChange={e => setCustomerDetails({...customerDetails, address: e.target.value})} />
                    <input required placeholder={t.cart.phone} className="w-full bg-black/50 border border-gray-600 rounded p-3 text-sm" onChange={e => setCustomerDetails({...customerDetails, phone: e.target.value})} />
                    <Button fullWidth type="submit">{t.cart.placeOrder}</Button>
                    <button type="button" onClick={() => setIsCheckout(false)} className="w-full text-center text-sm text-gray-400 mt-2 hover:text-white">Back</button>
                  </form>
                ) : (
                  <Button fullWidth onClick={() => setIsCheckout(true)}>{t.cart.checkout}</Button>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Success Modal */}
      {orderSuccess && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-black/90 backdrop-blur-xl">
           <div className="text-center animate-bounce-in">
              <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_50px_rgba(34,197,94,0.4)]">
                 <Truck size={48} className="text-white" />
              </div>
              <h2 className="text-3xl font-display text-white mb-2">MERCI!</h2>
              <p className="text-xl text-gray-300 mb-8">{t.cart.success}</p>
              <Button onClick={() => { setOrderSuccess(false); setIsCartOpen(false); }}>Close</Button>
           </div>
        </div>
      )}

      {/* Contact / Footer */}
      <footer id="contact" className="bg-black py-12 px-4 border-t border-white/10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <h3 className="text-2xl font-display text-brand-yellow mb-4">TACOS SPOT</h3>
            <p className="text-gray-400">French Tacos & Panini.</p>
            <p className="text-gray-500 text-sm mt-2">Bialystok, Poland</p>
          </div>
          <div className="flex flex-col items-center md:items-start gap-4">
             <div className="flex items-center gap-3">
                <MapPin className="text-brand-orange" />
                <span>Location Coming Soon</span>
             </div>
             <div className="flex items-center gap-3">
                <Phone className="text-brand-orange" />
                <span>+48 123 456 789</span>
             </div>
             <div className="flex items-center gap-3">
                <Clock className="text-brand-orange" />
                <span>12:00 - 22:00</span>
             </div>
          </div>
          <div>
             <div className="inline-block p-4 border border-brand-yellow/30 rounded-xl bg-brand-yellow/5">
                <p className="text-brand-yellow font-bold text-sm mb-1">APP COMING SOON</p>
                <p className="text-xs text-gray-400">We are building our mobile app for easier ordering.</p>
             </div>
          </div>
        </div>
        <div className="text-center mt-12 text-gray-600 text-sm">
           © {new Date().getFullYear()} TACOS SPOT. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default App;
