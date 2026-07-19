import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store';
import { ShoppingCart, Check, Shield, Truck, Package } from 'lucide-react';
import axios from 'axios';

interface Product {
  _id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  image: string;
  description: string;
  inStock: boolean;
  stockQuantity: number;
}

export function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    axios.get(`/api/products/${id}`)
      .then(res => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart({
        _id: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: quantity
      }));
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-xl font-bold text-slate-900 mb-4">Product Not Found</h2>
        <button onClick={() => navigate('/shop')} className="text-blue-600 font-medium hover:underline">Return to Shop</button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          
          {/* Product Image */}
          <div className="p-8 md:p-16 bg-slate-50 flex items-center justify-center border-b md:border-b-0 md:border-r border-slate-200">
            <motion.img 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              src={product.image} 
              alt={product.name} 
              className="max-w-full h-auto object-contain max-h-[400px] md:max-h-[500px] mix-blend-multiply drop-shadow-2xl"
            />
          </div>

          {/* Product Info */}
          <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
            <div className="mb-3 text-[10px] text-blue-600 font-bold tracking-widest uppercase">
              {product.brand} • {product.category}
            </div>
            <h1 className="text-2xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">{product.name}</h1>
            
            <div className="flex items-center gap-4 mb-6">
              <span className="text-3xl font-extrabold text-orange-500 font-mono">${product.price.toLocaleString()}</span>
              {product.inStock ? (
                <span className="bg-green-100 text-green-700 border border-green-200 text-[10px] px-3 py-1 rounded-full font-bold uppercase flex items-center">
                  <Check className="w-3 h-3 mr-1" /> In Stock ({product.stockQuantity})
                </span>
              ) : (
                <span className="bg-red-100 text-red-700 border border-red-200 text-[10px] px-3 py-1 rounded-full font-bold uppercase">Out of Stock</span>
              )}
            </div>

            <p className="text-slate-500 text-sm md:text-base mb-8 leading-relaxed">
              {product.description}
            </p>

            <div className="border-y border-slate-100 py-6 mb-8 grid grid-cols-2 gap-4">
               <div className="flex items-center text-xs font-bold text-slate-600">
                 <Shield className="w-4 h-4 text-blue-500 mr-2" />
                 1 Year Warranty
               </div>
               <div className="flex items-center text-xs font-bold text-slate-600">
                 <Truck className="w-4 h-4 text-blue-500 mr-2" />
                 Nationwide Delivery
               </div>
               <div className="flex items-center text-xs font-bold text-slate-600">
                 <Package className="w-4 h-4 text-blue-500 mr-2" />
                 Original Packaging
               </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center border border-slate-200 rounded-full bg-slate-50 overflow-hidden">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-5 py-3 text-slate-600 hover:bg-slate-200 transition-colors focus:outline-none"
                >-</button>
                <span className="px-6 py-3 font-bold text-slate-900 border-x border-slate-200">{quantity}</span>
                <button 
                  onClick={() => setQuantity(Math.min(product.stockQuantity, quantity + 1))}
                  className="px-5 py-3 text-slate-600 hover:bg-slate-200 transition-colors focus:outline-none"
                >+</button>
              </div>
              <button 
                onClick={handleAddToCart}
                disabled={!product.inStock || added}
                className={`flex-1 flex items-center justify-center px-8 py-3 rounded-full font-bold text-white transition-all ${
                  !product.inStock ? 'bg-slate-400 cursor-not-allowed' : 
                  added ? 'bg-green-500 hover:bg-green-600' : 'bg-slate-900 hover:bg-slate-800 shadow-lg shadow-slate-900/20'
                }`}
              >
                {added ? (
                  <><Check className="w-4 h-4 mr-2" /> Added</>
                ) : (
                  <><ShoppingCart className="w-4 h-4 mr-2" /> Add to Cart</>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
