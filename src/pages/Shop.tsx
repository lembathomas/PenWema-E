import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Filter, ChevronDown } from 'lucide-react';
import axios from 'axios';

interface Product {
  _id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  image: string;
  inStock: boolean;
}

export function Shop() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const categoryQuery = searchParams.get('category');

  useEffect(() => {
    axios.get('/api/products')
      .then(res => {
        let data = res.data;
        if (categoryQuery) {
          data = data.filter((p: Product) => p.category.toLowerCase().includes(categoryQuery.toLowerCase()));
        }
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [categoryQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          {categoryQuery ? `Shop ${categoryQuery}` : 'All Products'}
        </h1>
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-2 border border-gray-300 rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
          <div className="relative">
            <button className="flex items-center space-x-2 border border-gray-300 rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
              <span>Sort by: Recommended</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 flex flex-col gap-6 shadow-sm">
            <div>
              <h3 className="text-[11px] uppercase tracking-widest text-slate-400 font-bold mb-4">Categories</h3>
              <ul className="space-y-2 text-sm text-slate-700">
                <li>
                  <Link to="/shop" className={`flex items-center gap-3 p-2 rounded-lg font-medium transition-colors ${!categoryQuery ? 'bg-blue-50 text-blue-700' : 'hover:bg-slate-50'}`}>
                    All Categories
                  </Link>
                </li>
                <li>
                  <Link to="/shop?category=laptops" className={`flex items-center gap-3 p-2 rounded-lg font-medium transition-colors ${categoryQuery === 'laptops' ? 'bg-blue-50 text-blue-700' : 'hover:bg-slate-50'}`}>
                    💻 Laptops & PCs
                  </Link>
                </li>
                <li>
                  <Link to="/shop?category=gaming" className={`flex items-center gap-3 p-2 rounded-lg font-medium transition-colors ${categoryQuery === 'gaming' ? 'bg-blue-50 text-blue-700' : 'hover:bg-slate-50'}`}>
                    🎮 Gaming PCs
                  </Link>
                </li>
                <li>
                  <Link to="/shop?category=networking" className={`flex items-center gap-3 p-2 rounded-lg font-medium transition-colors ${categoryQuery === 'networking' ? 'bg-blue-50 text-blue-700' : 'hover:bg-slate-50'}`}>
                    ☁️ Networking
                  </Link>
                </li>
                <li>
                  <Link to="/shop?category=accessories" className={`flex items-center gap-3 p-2 rounded-lg font-medium transition-colors ${categoryQuery === 'accessories' ? 'bg-blue-50 text-blue-700' : 'hover:bg-slate-50'}`}>
                    ⌨️ Accessories
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-[11px] uppercase tracking-widest text-slate-400 font-bold mb-4">Brands</h3>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg"><label className="flex items-center cursor-pointer"><input type="checkbox" className="mr-3 rounded border-slate-300 text-blue-600 focus:ring-blue-500" /> Apple</label></li>
                <li className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg"><label className="flex items-center cursor-pointer"><input type="checkbox" className="mr-3 rounded border-slate-300 text-blue-600 focus:ring-blue-500" /> Dell</label></li>
                <li className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg"><label className="flex items-center cursor-pointer"><input type="checkbox" className="mr-3 rounded border-slate-300 text-blue-600 focus:ring-blue-500" /> Lenovo</label></li>
                <li className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg"><label className="flex items-center cursor-pointer"><input type="checkbox" className="mr-3 rounded border-slate-300 text-blue-600 focus:ring-blue-500" /> HP</label></li>
              </ul>
            </div>
            
            <div className="mt-auto p-4 bg-orange-50 border border-orange-100 rounded-xl">
              <p className="text-xs font-bold text-orange-800 uppercase mb-1">Bulk Quote?</p>
              <p className="text-[11px] text-orange-600 mb-3">Corporate discount available for 10+ units.</p>
              <button className="w-full py-2 bg-orange-500 hover:bg-orange-600 transition-colors text-white text-xs font-bold rounded-lg shadow-md">Get Quote</button>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20 bg-gray-50 rounded-lg border border-gray-200 border-dashed">
              <h3 className="text-lg font-medium text-gray-900">No products found</h3>
              <p className="mt-1 text-gray-500">Try adjusting your filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div key={product._id} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all flex flex-col">
                  <Link to={`/product/${product._id}`} className="h-48 bg-slate-100 rounded-xl mb-4 flex items-center justify-center overflow-hidden p-4 relative group">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105 mix-blend-multiply" 
                    />
                    {product.inStock && <div className="absolute top-2 right-2 bg-green-500 text-white text-[9px] font-bold px-2 py-1 rounded-full uppercase">In Stock</div>}
                  </Link>
                  <div className="flex flex-col flex-grow">
                    <p className="text-[10px] text-blue-600 font-bold mb-1 uppercase tracking-wider">{product.brand}</p>
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
        </div>
      </div>
    </div>
  );
}
