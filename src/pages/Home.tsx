import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ChevronRight, Shield, Truck, Clock, CreditCard } from 'lucide-react';
import axios from 'axios';

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

export function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Fetch products from our API
    axios.get('/api/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error("Error fetching products", err));
  }, []);

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="p-4 sm:p-6 lg:p-8">
        <div className="relative min-h-[400px] md:min-h-[500px] bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 rounded-3xl overflow-hidden flex items-center p-8 md:p-16 shadow-2xl">
          <div className="relative z-10 max-w-2xl">
            <span className="inline-block px-3 py-1 bg-green-500 text-white text-[10px] font-bold uppercase rounded-full mb-6">Enterprise Ready</span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
            >
              Empowering Your Business with <br /><span className="text-blue-300 font-light italic text-3xl md:text-5xl">Premium ICT Solutions.</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-slate-300 text-base md:text-lg mb-8 max-w-xl leading-relaxed"
            >
              From enterprise servers to the latest workstation laptops. PenWema Technologies provides top-tier hardware, software, and networking equipment.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <Link to="/shop" className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-blue-900/40 hover:bg-blue-500 transition-colors flex items-center">
                Shop Hardware <ChevronRight className="ml-2 w-4 h-4" />
              </Link>
              <Link to="/services" className="bg-white/10 border border-white/20 text-white px-8 py-3 rounded-full font-bold backdrop-blur-sm hover:bg-white/20 transition-colors">
                Explore IT Services
              </Link>
            </motion.div>
          </div>
          {/* Abstract Graphic Element */}
          <div className="absolute right-0 top-0 w-1/2 h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/20 to-transparent flex items-center justify-center opacity-50 pointer-events-none hidden md:flex">
            <div className="w-96 h-96 border-[32px] border-white/5 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Features/Trust Bar */}
      <section className="px-4 sm:px-6 lg:px-8 py-6 mb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-4">
            <div className="bg-blue-50 p-3 rounded-xl text-blue-600">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-800 text-sm">Genuine Products</h4>
              <p className="text-[11px] text-slate-500">100% authentic brands</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-4">
            <div className="bg-blue-50 p-3 rounded-xl text-blue-600">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-800 text-sm">Fast Delivery</h4>
              <p className="text-[11px] text-slate-500">Across all of Kenya</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-4">
            <div className="bg-blue-50 p-3 rounded-xl text-blue-600">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-800 text-sm">Secure Payments</h4>
              <p className="text-[11px] text-slate-500">M-Pesa, Card & Bank</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-4">
            <div className="bg-blue-50 p-3 rounded-xl text-blue-600">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-800 text-sm">24/7 Support</h4>
              <p className="text-[11px] text-slate-500">Dedicated ICT helpdesk</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="px-4 sm:px-6 lg:px-8 py-10 bg-slate-50">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            Shop by Category <span className="hidden sm:inline text-sm font-normal text-slate-400">— Find exactly what your business needs</span>
          </h2>
          <Link to="/categories" className="text-blue-600 text-xs font-bold uppercase tracking-wider flex items-center">
            View All <ChevronRight className="w-3 h-3 ml-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to="/shop?category=laptops" className="group relative rounded-2xl overflow-hidden shadow-sm border border-slate-200 h-56 bg-white flex flex-col items-center justify-center hover:shadow-xl transition-all hover:border-blue-100">
            <div className="text-5xl mb-4">💻</div>
            <h3 className="text-lg font-bold text-slate-900">Laptops & Computers</h3>
            <span className="text-blue-600 text-xs font-bold mt-2 opacity-0 group-hover:opacity-100 transition-opacity">Shop Now &rarr;</span>
          </Link>
          <Link to="/shop?category=networking" className="group relative rounded-2xl overflow-hidden shadow-sm border border-slate-200 h-56 bg-white flex flex-col items-center justify-center hover:shadow-xl transition-all hover:border-blue-100">
            <div className="text-5xl mb-4">☁️</div>
            <h3 className="text-lg font-bold text-slate-900">Networking & Servers</h3>
            <span className="text-blue-600 text-xs font-bold mt-2 opacity-0 group-hover:opacity-100 transition-opacity">Shop Now &rarr;</span>
          </Link>
          <Link to="/shop?category=cctv" className="group relative rounded-2xl overflow-hidden shadow-sm border border-slate-200 h-56 bg-white flex flex-col items-center justify-center hover:shadow-xl transition-all hover:border-blue-100">
            <div className="text-5xl mb-4">📹</div>
            <h3 className="text-lg font-bold text-slate-900">Security & CCTV</h3>
            <span className="text-blue-600 text-xs font-bold mt-2 opacity-0 group-hover:opacity-100 transition-opacity">Shop Now &rarr;</span>
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            Featured Arrivals <span className="hidden sm:inline text-sm font-normal text-slate-400">— Handpicked for Business</span>
          </h2>
          <Link to="/shop" className="text-blue-600 text-xs font-bold uppercase tracking-wider flex items-center">
            View All Products <ChevronRight className="w-3 h-3 ml-1" />
          </Link>
        </div>

        {products.length === 0 ? (
          <div className="flex justify-center items-center h-48">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product._id} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all flex flex-col">
                <Link to={`/product/${product._id}`} className="h-40 bg-slate-100 rounded-xl mb-4 flex items-center justify-center overflow-hidden p-4 relative group">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105 mix-blend-multiply" 
                  />
                  <div className="absolute top-2 right-2 bg-green-500 text-white text-[9px] font-bold px-2 py-1 rounded-full uppercase">In Stock</div>
                </Link>
                <div className="flex flex-col flex-grow">
                  <p className="text-[10px] text-blue-600 font-bold mb-1 uppercase tracking-wider">{product.category}</p>
                  <Link to={`/product/${product._id}`}>
                    <h3 className="text-sm font-bold text-slate-900 line-clamp-2 hover:text-blue-600 transition-colors">{product.name}</h3>
                  </Link>
                  <div className="flex items-center gap-2 mt-auto pt-4 mb-4">
                    <span className="text-orange-500 text-base font-extrabold font-mono">${product.price.toLocaleString()}</span>
                  </div>
                  <Link 
                    to={`/product/${product._id}`}
                    className="w-full text-center py-2.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-900 hover:text-white transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
