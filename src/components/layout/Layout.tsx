import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, Search } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

export function Layout() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const cartItemsCount = useSelector((state: RootState) => 
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      {/* Top Bar */}
      <div className="bg-slate-900 text-slate-100 text-[11px] py-1.5 px-4 text-center font-medium">
        Enterprise ICT Solutions & Premium Hardware | Free Shipping on Orders Over $500
      </div>

      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 z-50 sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-700 rounded-lg flex items-center justify-center text-white font-bold">P</div>
              <Link to="/" className="text-xl font-extrabold tracking-tight text-blue-900 italic">
                PenWema<span className="text-slate-500 font-normal">Tech</span>
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8 items-center text-sm font-medium text-slate-600">
              <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
              <Link to="/shop" className="hover:text-blue-600 transition-colors">Shop</Link>
              <Link to="/categories" className="hover:text-blue-600 transition-colors">Categories</Link>
              <Link to="/services" className="hover:text-blue-600 transition-colors">IT Services</Link>
              <Link to="/contact" className="hover:text-blue-600 transition-colors">Contact</Link>
            </div>

            {/* Search, User, Cart */}
            <div className="hidden md:flex items-center space-x-6">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search products..." 
                  className="w-64 bg-slate-100 border-none rounded-full pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 shadow-inner transition-all"
                />
                <Search className="absolute left-3 top-2.5 text-slate-400 w-4 h-4" />
              </div>
              <div className="h-4 w-px bg-slate-300"></div>
              <div className="flex gap-4 items-center">
                <Link to="/cart" className="relative p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors">
                  <ShoppingCart className="w-5 h-5 text-slate-700" />
                  {cartItemsCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full border-2 border-white">
                      {cartItemsCount}
                    </span>
                  )}
                </Link>
                <Link to="/login" className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-full text-sm hover:bg-slate-800 transition-colors">
                  Login
                </Link>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center md:hidden space-x-4">
              <Link to="/cart" className="relative p-2 bg-slate-100 rounded-full">
                <ShoppingCart className="w-5 h-5 text-slate-700" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full border-2 border-white">
                    {cartItemsCount}
                  </span>
                )}
              </Link>
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-slate-700 hover:text-blue-600 focus:outline-none"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-slate-100 px-4 pt-2 pb-6 space-y-3 shadow-lg">
            <input 
              type="text" 
              placeholder="Search products..." 
              className="w-full bg-slate-100 border-none rounded-full pl-4 pr-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 shadow-inner mb-4"
            />
            <Link to="/" className="block px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50">Home</Link>
            <Link to="/shop" className="block px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50">Shop</Link>
            <Link to="/services" className="block px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50">IT Services</Link>
            <Link to="/login" className="block px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50">Login / Register</Link>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-auto pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-blue-700 rounded-lg flex items-center justify-center text-white font-bold">P</div>
                <h3 className="text-xl font-extrabold tracking-tight text-blue-900 italic">PenWema<span className="text-slate-500 font-normal">Tech</span></h3>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed">
                Your trusted partner for enterprise hardware, network solutions, and corporate ICT services in Kenya.
              </p>
            </div>
            <div>
              <h4 className="text-[11px] uppercase tracking-widest text-slate-400 font-bold mb-4">Shop</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><Link to="/shop" className="hover:text-blue-600 transition">Laptops & PCs</Link></li>
                <li><Link to="/shop" className="hover:text-blue-600 transition">Networking Equipment</Link></li>
                <li><Link to="/shop" className="hover:text-blue-600 transition">Servers & Storage</Link></li>
                <li><Link to="/shop" className="hover:text-blue-600 transition">CCTV & Security</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[11px] uppercase tracking-widest text-slate-400 font-bold mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><Link to="/services" className="hover:text-blue-600 transition">IT Maintenance</Link></li>
                <li><Link to="/services" className="hover:text-blue-600 transition">Network Installation</Link></li>
                <li><Link to="/services" className="hover:text-blue-600 transition">Software Licensing</Link></li>
                <li><Link to="/services" className="hover:text-blue-600 transition">Corporate Supply</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[11px] uppercase tracking-widest text-slate-400 font-bold mb-4">Contact Us</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>Nairobi, Kenya</li>
                <li>info@penwematech.co.ke</li>
                <li>+254 700 000 000</li>
              </ul>
            </div>
          </div>
          
          {/* Sleek support & services bar integrated into footer */}
          <div className="border-t border-slate-200 pt-6 flex flex-col lg:flex-row items-center justify-between text-[11px] text-slate-500 font-medium gap-4">
            <div className="flex flex-wrap items-center justify-center gap-6">
              <div className="flex items-center gap-2">✅ Authorized Partner</div>
              <div className="flex items-center gap-2 text-green-600">🛡️ 1-Year Warranty Included</div>
              <div className="flex items-center gap-2">🚀 Nationwide Delivery</div>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <span>Support: +254 700 000 000</span>
              <div className="hidden sm:block w-1 h-1 bg-slate-300 rounded-full"></div>
              <span>support@penwema.com</span>
              <div className="hidden sm:block w-1 h-1 bg-slate-300 rounded-full"></div>
              <div className="flex gap-1">
                <span className="bg-slate-100 p-1 rounded px-2 border border-slate-200">VISA</span>
                <span className="bg-slate-100 p-1 rounded px-2 text-green-700 border border-slate-200">M-PESA</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
